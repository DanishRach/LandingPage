'use client';

import React, { useEffect, useState } from 'react'
import { userProps } from '../../../../types/types';
import { getSession } from '@/lib/auth';
import { editUser, findUser } from '@/api/user';
import { toast } from 'sonner';

export default function page() {

  const [user, setUser] = useState<userProps>()

  const [formData, setFormData] = useState<userProps>({
    userID: "",
    email: "",
    password: "",
    telp: "",
    namaDepan: "",
    namaBelakang: "",
    provinsi: "",
    kota: "",
    alamat: "",
    kodePos: "",
    role: user?.role!,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function submit() {
    try {
      alert('success')
      const form = new FormData()
      if (formData.userID) form.append('userID', formData.userID)
      if (formData.email) form.append('email', formData.email)
      if (formData.telp) form.append('telp', formData.telp)
      if (formData.namaDepan) form.append('namaDepan', formData.namaDepan)
      if (formData.namaBelakang) form.append('namaBelakang', formData.namaBelakang)
      if (formData.provinsi) form.append('provinsi', formData.provinsi)
      if (formData.kota) form.append('kota', formData.kota)
      if (formData.alamat) form.append('alamat', formData.alamat)
      if (formData.kodePos) form.append('kodePos', formData.kodePos)

      const result = await editUser(form)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(result.success)
      }
    } catch (err) {
      console.log(err)
      toast.error('something wrong')
    }
  }

  useEffect(() => {
    async function fetchUser() {
      const data = await getSession()
      const userID = data?.data.userID
      const userData = await findUser(userID !== undefined ? userID : '')
      if(userData !== undefined && userData !== null) setFormData(userData)
    }
    fetchUser()

  }, [])

  return (
    <div>
      <p>Edit Profile</p>

      <input type='hidden' value={formData.userID} />
      <input type='text' name='namaDepan' value={formData.namaDepan || user?.namaDepan!} onChange={handleChange} placeholder='namaDepan' />
      <input type='text' name='namaBelakang' value={formData.namaBelakang || user?.namaBelakang!} onChange={handleChange} placeholder='namaBelakang' />
      <p>account</p>
      <input type='email' name='email' value={formData.email || user?.email!} onChange={handleChange} placeholder='email' />
      <button>change password</button>
      <input type='password' name='password' value={formData.password || user?.password!} onChange={handleChange} placeholder='password' />
      <input type='tel' name='telp' value={formData.telp || user?.telp!} onChange={handleChange} placeholder='telp' />
      <p>address</p>
      <input type='text' name='provinsi' value={formData.provinsi || user?.provinsi!} onChange={handleChange} placeholder='provinsi' />
      <input type='text' name='kota' value={formData.kota || user?.kota!} onChange={handleChange} placeholder='kota' />
      <input type='text' name='alamat' value={formData.alamat || user?.alamat!} onChange={handleChange} placeholder='alamat' />
      <input type='text' name='kodePos' value={formData.kodePos || user?.kodePos!} onChange={handleChange} placeholder='kodePos' />
      <button onClick={submit}>
        edit
      </button>
    </div>
  )
}
