'use server';

import prisma from "../../lib/prisma";
import md5 from "md5";
import { revalidatePath } from "next/cache";


  export async function getUser() {
    try {
      const data = await prisma.user.findMany()

      await prisma.$disconnect()
      return data
    } catch (err) {
      console.log('error in: ' + err)
      await prisma.$disconnect()
    }
  }

export async function login(formdata: FormData) {
    try {
      const email = String(formdata.get('email'))
      const password = String(formdata.get('password'))
  
      const check = await prisma.user.findUnique({
        where: {
          email: email
        }
      })
      if (check) {
        if (check.password !== md5(password)) {
          return {
            error: 'password salah'
          }
        }
        return {
          success: 'welcome back'
        }
      } else {
  
        await prisma.user.create({
          data: {
            email: email,
            password: md5(password),
  
          }
        })
      }
  
      await prisma.$disconnect()
      revalidatePath('/')
      return {
        success: 'succes login'
      }
    } catch (err) {
      console.log('error in: ' + err)
      await prisma.$disconnect()
      return {
        error: 'something wrong'
      };
  
    }
  }
  
  export async function addUser(formdata: FormData) {
    try {
      const email = String(formdata.get('email'))
      const password = String(formdata.get('password'))
      const namaDepan = formdata.get('namaDepan')
      const namaBelakang = formdata.get('namaBelakang')
      const telp = formdata.get('telp')
      const provinsi = formdata.get('provinsi')
      const alamat = formdata.get('alamat')
      const kodePos = formdata.get('kodePos')
  
  
      // Check if `services` is an array and contains valid items
  
      await prisma.user.create({
        data: {
          email: email  as string,
          password:  md5(password),
          namaDepan: namaDepan as string || undefined,
          namaBelakang: namaBelakang as string || undefined,
          telp: telp as string || undefined,
          provinsi: provinsi as string || undefined,
          alamat: alamat as string || undefined,
          kodePos: kodePos as string || undefined,
  
        }
      })
      await prisma.$disconnect()
      revalidatePath('/')
      return {
        success: 'succes add user'
      }
    } catch (err) {
      console.log('error in: ' + err)
      await prisma.$disconnect()
      return {
        error: 'something wrong'
      };
  
    }
  }
  
  export async function editUser(formdata: FormData) {
    try {
      const userID = String(formdata.get('userID'))
      const email = String(formdata.get('email'))
      const password = String(formdata.get('password'))
      const namaDepan = formdata.get('namaDepan')
      const namaBelakang = formdata.get('namaBelakang') 
      const telp = formdata.get('telp') 
      const kota = formdata.get('kota') 
      const provinsi = formdata.get('provinsi') 
      const alamat = formdata.get('alamat') 
      const kodePos = formdata.get('kodePos') 
  
      // Check if `services` is an array and contains valid items
  
      await prisma.user.update({
        where: {
          userID: userID
        },
        data: {
          email: email,
          password: password,
          namaDepan: namaDepan as string || undefined,
          namaBelakang: namaBelakang as string || undefined,
          telp: telp as string || undefined,
          provinsi: provinsi as string || undefined,
          kota: kota as string || undefined,
          alamat: alamat as string || undefined,
          kodePos: kodePos as string || undefined,
        }
      })
      await prisma.$disconnect()
      revalidatePath('/')
      return {
        success: 'succes edit user'
      }
    } catch (err) {
      console.log('error in: ' + err)
      await prisma.$disconnect()
      return {
        error: 'something wrong'
      };
  
    }
  }
  
  export async function deleteUser(formdata: FormData) {
  
    try {
      const userID = String(formdata.get('userID'))
  
       await prisma.user.delete({
        where: {
          userID: userID
        }
      })
      await prisma.$disconnect()
      revalidatePath('/')
      return {
        success: 'succes delete user'
      }
    } catch (err) {
      console.log('error in: ' + err)
      await prisma.$disconnect()
      return {
        error: 'something wrong'
      };
  
    }
  }