'use server';

import { Domain, Status } from "@prisma/client";
import prisma from "../lib/prisma";
import { revalidatePath } from "next/cache";
import { mailAdmin, mailChangeFinish, mailChangeOnProgress, mailChangeOnWaiting, mailCustomer, mailCustomerPay, notif5Hari, notifTenggat } from "./mailer";


export async function getProject() {
    try {

        const today = new Date(Date.now())

        const projectData = await prisma.project.findMany()

         for (const data of projectData) {
            const userData = await prisma.user.findUnique({
                where: {
                    userID: data.userID
                }
            })

            //menambahkan tagihan bila tanggal 1
            if(today.getDate() == 1) {
                    const harga = await prisma.layanan.findUnique({
                        where: {
                            layananID: data.layananID
                        }
                    })
                    const newTagihan = data.tagihan + (harga?.harga || 0);
        
                    await prisma.project.update({
                        where: {
                            projectID: data.projectID,
                        },
                        data: {
                            tagihan: newTagihan,
                        },
                    });
            }

            //memberikan notif tenggat 5 hari atau peringatan teggat berdasarkan data tenggat project
            const tenggat = data.tenggat;
            tenggat.setDate(tenggat.getDate() - 5);

            if (data.tenggat <= tenggat) {
                const mail = await notif5Hari(userData?.namaDepan!, userData?.email!, data.namaDomain!, data.domain!, data.tenggat!)
                if (mail.error) {
                    return {
                        error: mail.error
                    }
                }
            }
            if (data.tenggat  == today) {
                const mail = await notifTenggat(userData?.namaDepan!, userData?.email!, data.namaDomain!, data.domain!, data.tenggat!, data.tagihan!)
                if (mail.error) {
                    return {
                        error: mail.error
                    }
                }
            }
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
export async function findProjectByUser(userID: string) {
    try {
        // Efficiently retrieve overdue projects and their associated services
       
        const data = await prisma.project.findMany({
            where:{
                userID: userID
            }
        })

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

        const user = await prisma.user.findUnique({
            where:{
                userID: userID
            }
        })
        
        const layanan = await prisma.layanan.findUnique({
            where:{
                layananID: layananID
            }
        })

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
        const message = await mailAdmin('penambahan data', "pertamayus@gmail.com",user?.namaDepan! ,  user?.email!,layanan?.judul!, JSON.stringify(namaDomain) , JSON.stringify(domain))
        const message2 = await mailCustomer(user?.namaDepan!,user?.email!,layanan?.judul!,namaDomain as string, domain as Domain)
        if (message.error || message2.error){
            return{
                error: message.error
            }
        }
        revalidatePath('/')
        return {
            success: 'success buy bundle'
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


        const dataProject = await prisma.project.findUnique({
            where: {
                projectID: projectID
            }
        })
        
        const dataUser = await prisma.user.findUnique({
            where: {
                userID: dataProject?.userID
            }
        })
        
        const dataLayanan = await prisma.layanan.findUnique({
            where: {
                layananID: dataProject?.layananID
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
            console.log('kesalahan pengurangna tagihan di api => project.tsx')
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

        const mail = await mailCustomerPay(dataUser?.namaDepan!, dataUser?.email!, dataLayanan?.judul!, dataProject?.namaDomain!, dataProject?.domain!)
        if (mail.error) {
            return {
                error: mail.error
            }
        }

        await prisma.$disconnect()
        revalidatePath('/', 'layout')
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

export async function changeStatus(projectID: string, userID: string, formdata: FormData) {
    try{
        const sdhDeplo = formdata.get('sdhDeplo')

        const project = await prisma.project.findUnique({
            where:{
                projectID: projectID
            }
        })

        const user = await prisma.user.findUnique({
            where:{
                userID: project?.userID
            }
        })
        

        await prisma.project.update({
            where: {projectID: projectID},
            data:{
                sdhDeplo: sdhDeplo as Status
            }
        })
        if (sdhDeplo as Status  === 'ONWAITING') {
            const mail = await mailChangeOnWaiting(user?.namaDepan!, user?.email!, project?.namaDomain!, project?.domain!)
            if(mail.error) {
                return {
                    error: mail.error
                }
            }
        } else if (sdhDeplo as Status  === 'ONPROGRESS') {
            const mail = await mailChangeOnProgress(user?.namaDepan!, user?.email!, project?.namaDomain!, project?.domain!)
            if(mail.error) {
                return {
                    error: mail.error
                }
            }
        } else if (sdhDeplo as Status  === 'FINISH') {
            const mail = await mailChangeFinish(user?.namaDepan!, user?.email!, project?.namaDomain!, project?.domain!, project?.linkDeploy!)
            if(mail.error) {
                return {
                    error: mail.error
                }
            }
        }
        revalidatePath('/','layout')
        return {
            success: 'succes edit status'
        }
    } catch(err) {
        console.log("this is error: "+ err)
        return {
            error: 'something wrong'
        }
    } finally{
        await prisma.$disconnect()
    }
}

export async function handleDeploy(projectID: string, formdata: FormData) {
    try{
        const linkDeploy = formdata.get('linkDeploy')

        await prisma.project.update({
            where: {projectID: projectID},
            data:{
                linkDeploy: linkDeploy as string
            }
        })

        revalidatePath('/','layout')
        return {
            success: 'succes edit link deploy'
        }
    } catch(err) {
        console.log("this is error: "+ err)
        return {
            error: 'something wrong'
        }
    } finally{
        await prisma.$disconnect()
    }
}

export async function editProject(formData: FormData) {
    try {
        const projectID = String(formData.get('projectID'))
        const userID = formData.get('userID')
        const namaDomain = formData.get('namaDomain')
        const domain = formData.get('domain')
        const project = formData.get('project')
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
                    userID: userID as string || undefined,
                    layananID: layananID as string,
                    tagihan: dataLayanan?.harga as number || undefined
                }
            })
        } else {
            await prisma.project.update({
                where: {
                    projectID: projectID
                },
                data: {
                    project: project as string || undefined,
                    namaDomain: namaDomain as string || undefined,
                    domain: domain as Domain || undefined,
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