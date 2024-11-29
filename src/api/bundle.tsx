'use server'

import prisma from "../lib/prisma";
import { revalidatePath } from "next/cache";

export async function getLayanan() {
    try{
      const data = await prisma.layanan.findMany()

      await prisma.$disconnect()
      return data
    } catch (err) {
      console.log('error in: '+err)
      await prisma.$disconnect()

    }
  }

  export async function findLayanan(layananID:string) {
    try{
      const data = await prisma.layanan.findUnique({
        where:{
          layananID: layananID
        }
      })

      await prisma.$disconnect()
      return data
    } catch (err) {
      console.log('error in: '+err)
      await prisma.$disconnect()

    }
  }

export async function addBundle(formdata: FormData) {
    try{
      const judul = String(formdata.get('judul'))
    const harga = Number(formdata.get('harga'))
    const services = formdata.getAll('services')
  
    if (services.length === 0) {
      console.log('Error: services is empty');
      return {
        error: 'services is empty'
      };
    }
  
    // Check if `services` is an array and contains valid items
  
    await prisma.layanan.create({
      data: {
        judul: judul,
        harga: harga,
        services: services as string[]
      }
    })
    await prisma.$disconnect()
    revalidatePath('/')
    return {
      success: 'succes add bundle'
    }
    } catch(err) {
      console.log('error in: '+err)
      await prisma.$disconnect()
      return {
        error: 'something wrong'
      };
  
    }
  }
  
  export async function editBundle(formdata: FormData) {
    try{
      const layananID = String(formdata.get('layananID'))
      const judul = String(formdata.get('judul'))
    const harga = Number(formdata.get('harga'))
    const services = formdata.getAll('services')
  
    if (!Array.isArray(services)) {
      console.log('Error: services is not an array');
      return {
        error: 'services is not an array'
      };
    }
    if (services.length === 0) {
      console.log('Error: services is empty');
      return {
        error: 'services is empty'
      };
    }
  
    // Check if `services` is an array and contains valid items
  
    await prisma.layanan.update({
      where: {
        layananID: layananID
      },
      data: {
        judul: judul,
        harga: harga,
        services: services as string[]
      }
    })
    await prisma.$disconnect()
    revalidatePath('/')
    return {
      success: 'succes edit bundle'
    }
    } catch(err) {
      console.log('error in: '+err)
      await prisma.$disconnect()
      return {
        error: 'something wrong'
      };
  
    }
  }
  
  export async function deleteBundle(formdata:FormData) {
    
    try{
      const layananID = String(formdata.get('layananID'))
      
      await prisma.layanan.delete({
        where:{
          layananID: layananID
        }
      })
    await prisma.$disconnect()
    revalidatePath('/')
    return {
      success: 'succes delete bundle'
    }
    } catch(err) {
      console.log('error in: '+err)
      await prisma.$disconnect()
      return {
        error: 'something wrong'
      };
  
    }
  }