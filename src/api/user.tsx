'use server';

import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";
import md5 from "md5";
import bcrypt from "bcrypt"
import { createSession } from "../lib/auth";

const saltRounds = 10;


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

export async function findUser(userID: string) {
  try {
    const data = await prisma.user.findUnique({
      where: {userID: userID}
    })

    await prisma.$disconnect()
    return data
  } catch (err) {
    console.log('error in: ' + err)
    await prisma.$disconnect()
  }
}

export async function login(formdata: FormData) {
  try {
    // Extract and validate input
    const email = formdata.get('email');
    const password = formdata.get('password');

    if (!email || !password) {
      return { error: 'Email and password are required.' };
    }

    const emailStr = String(email);
    const passwordStr = String(password);

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email: emailStr },
    });
    if (user) {
      // Validate the password
      const isPasswordCorrect = await bcrypt.compare(passwordStr, user.password);
      if (isPasswordCorrect) {
        await createSession(user)
        return { success: 'Welcome back!' };
      } else {
        return { error: 'Incorrect password.' };
      }
    }
  } catch (err) {
    console.error('Error during login/registration:', err);
    return { error: 'An unexpected error occurred. Please try again.' };
  } finally {
    // Always disconnect Prisma in the finally block
    await prisma.$disconnect();
  }
}

export async function regis(formdata: FormData) {
  try {
    // Extract and validate input
    const email = formdata.get('email');
    const password = formdata.get('password');

    if (!email || !password) {
      return { error: 'Email and password are required.' };
    }

    const emailStr = String(email);
    const passwordStr = String(password);

    // Check if the user exists
      // Hash the password and register the user
      const hashedPassword = await bcrypt.hash(passwordStr, saltRounds);

      const newUser= await prisma.user.create({
        data: {
          email: emailStr,
          password: hashedPassword,
        },
      });

      await createSession(newUser)
      return { success: 'Registration successful. Welcome!' }
  } catch (err) {
    console.error('Error during login/registration:', err);
    return { error: 'An unexpected error occurred. Please try again.' };
  } finally {
    // Always disconnect Prisma in the finally block
    await prisma.$disconnect();
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
        email: email as string,
        password: md5(password),
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
    const email = formdata.get('email')
    const password = formdata.get('password')
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
        email: email as string || undefined,
        password: password as string || undefined,
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