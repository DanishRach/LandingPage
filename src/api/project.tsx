'use server';

import { Domain } from "@prisma/client";
import prisma from "../lib/prisma";
import { revalidatePath } from "next/cache";


export async function getProject() {
    try {
        // Efficiently retrieve overdue projects and their associated services
        const overdueProjects = await prisma.project.findMany({
            where: {
                tenggat: { lte: new Date().toISOString() },
            },
            include: {
                layanan: true,
            },
        });

        for (const project of overdueProjects) {
            const harga = await prisma.layanan.findUnique({
                where: {
                    layananID: project.layananID
                }
            })
            const newTagihan = project.tagihan + (harga?.harga || 0);

            await prisma.project.update({
                where: {
                    projectID: project.projectID,
                },
                data: {
                    tagihan: newTagihan,
                },
            });
        }
        const data = await prisma.project.findMany()

        await prisma.$disconnect();
        return data;
    } catch (err) {
        console.error('Error fetching and updating projects:', err);
        await prisma.$disconnect(); // Disconnect even on error
        throw err; // Re-throw the error for handling at a higher level
    }
}






export async function addProject(formData: FormData) {
    try {
        const userID = String(formData.get('userID'))
        const domain = formData.get('domain')
        const namaDomain = formData.get('namaDomain')
        const project = formData.get('project')
        const layananID = String(formData.get('layananID'))

        const date = new Date(Date.now()).toISOString()
        const today = new Date(Date.now());
        today.setMonth(today.getMonth() + 1); // Add one month

        const due = today.toISOString()

        await prisma.project.create({
            data: {
                project: project as string,
                namaDomain: namaDomain as string,
                domain: domain as Domain,
                userID: userID,
                layananID: layananID,
                tagihan: 0,
                createdAt: date,
                tenggat: due,
            }
        })

        await prisma.$disconnect()
        revalidatePath('/')
        return {
            success: 'success add project'
        }
    } catch (err) {
        console.log('error in: ' + err)
        await prisma.$disconnect()
        return {
            error: 'something wrong'
        }
    }
}

export async function payProject(formData: FormData) {
    try {
        const projectID = String(formData.get('projectID'))
        const layananID = String(formData.get('layananID'))


        const dataProject = await prisma.project.findUnique({
            where: {
                projectID: projectID
            }
        })
        
        const dataLayanan = await prisma.layanan.findUnique({
            where: {
                layananID: layananID
            }
        })

        const tenggatLama = dataProject?.tenggat !== undefined? new Date(dataProject?.tenggat) : new Date()
        tenggatLama.setMonth(tenggatLama.getMonth() + 1); // Add one month
        const tenggatBaru = tenggatLama.toISOString()

        let tagihanSisa = 0

        if (dataProject?.tagihan && dataLayanan?.harga) {
            tagihanSisa = (dataProject?.tagihan - dataLayanan?.harga)
        }

        if(tagihanSisa < 0){
            console.log('kesalahan pengurangna tagihan di payProject => project.tsx')
            return{
                error: 'something wrong'
            }
        }

        await prisma.project.update({
            where:{
                projectID: projectID
            },
            data: {
                tagihan: tagihanSisa,
                tenggat: tenggatBaru,
            }
        })

        await prisma.$disconnect()
        revalidatePath('/')
        return {
            success: 'success pay project'
        }
    } catch (err) {
        console.log('error in: ' + err)
        await prisma.$disconnect()
        return {
            error: 'something wrong'
        }
    }
}

export async function editProject(formData: FormData) {
    try {
        const projectID = String(formData.get('projectID'))
        const userID = formData.get('userID')
        const namaDomain = formData.get('namaDomain')
        const domain = formData.get('domain')
        const project = formData.get('project')
        const sdhDeplo = Boolean(formData.get('sdhDeplo'))
        const layananID = formData.get('layananID')

        if (layananID) {
    
            const dataLayanan = await prisma.layanan.findUnique({
                where: {
                    layananID: layananID as string
                }
            })

            await prisma.project.update({
                where: {
                    projectID: projectID
                },
                data: {
                    project: project as string || undefined,
                    namaDomain: namaDomain as string || undefined,
                    domain: domain as Domain || undefined,
                    sdhDeplo: sdhDeplo,
                    userID: userID as string || undefined,
                    layananID: layananID as string,
                    tagihan: dataLayanan?.harga as number || undefined
                }
            })
        } else {
            console.log(sdhDeplo)
            await prisma.project.update({
                where: {
                    projectID: projectID
                },
                data: {
                    project: project as string || undefined,
                    namaDomain: namaDomain as string || undefined,
                    domain: domain as Domain || undefined,
                    sdhDeplo: sdhDeplo,
                    userID: userID as string || undefined,
                }
            })
        }

        await prisma.$disconnect()
        revalidatePath('/','layout')
        return {
            success: 'success edit project'
        }
    } catch (err) {
        console.log('error in: ' + err)
        await prisma.$disconnect()
        return {
            error: 'something wrong'
        }
    }
}

export async function deleteProject(formData: FormData) {
    try {
        const projectID = String(formData.get('projectID'))

        await prisma.project.delete({
            where: {
                projectID: projectID
            }
        })

        await prisma.$disconnect()
        revalidatePath('/')
        return {
            success: 'success delete project'
        }
    } catch (err) {
        console.log('error in: ' + err)
        await prisma.$disconnect()
        return {
            error: 'something wrong'
        }
    }
}