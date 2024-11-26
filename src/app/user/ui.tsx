'use client';

import React, { useState } from 'react'
import { toast } from 'sonner';
import { login, deleteUser, editUser } from '@/api/user';
import { userProps } from '@/types/types';

interface uiProps {
    userdata: userProps[] | undefined

}

export default function Ui({ userdata }: uiProps) {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [telp, setTelp] = useState<string>('')
    const [provinsi, setProvinsi] = useState<string>('')
    const [kota, setKota] = useState<string>('')
    const [alamat, setAlamat] = useState<string>('')
    const [kodePos, setKodePos] = useState<string>('')
    const [namadepan, setNamadepan] = useState<string>('')
    const [namaBelakang, setNamaBelakang] = useState<string>('')


    const submitLayanan = async () => {
        const formdata = new FormData()
        if (email) formdata.append('email', email)
        if (password) formdata.append('password', password)

        const result = await login(formdata)
        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success(result.success)
        }

    }

    const submitEditLayanan = async (userID: string) => {
        const formdata = new FormData()
        if (userID) formdata.append('userID', userID)
        if (email) formdata.append('email', email)
        if (password) formdata.append('password', password)
        if (telp) formdata.append('telp', telp)
        if (provinsi) formdata.append('provinsi', provinsi)
        if (kota) formdata.append('kota', kota)
        if (alamat) formdata.append('alamat', alamat)
        if (kodePos) formdata.append('kodePos', kodePos)
        if (namadepan) formdata.append('namadepan', namadepan)
        if (namaBelakang) formdata.append('namaBelakang', namaBelakang)

        const result = await editUser(formdata)
        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success(result.success)
        }

    }

    const submitDeleteLayanan = async (userID: string) => {
        const formdata = new FormData()
        if (userID) formdata.append('userID', userID)

        const result = await deleteUser(formdata)
        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success(result.success)
        }

    }

    return (
        <div className='flex justify-between items-center h-screen'>
            <div className='bg-green-500 p-5 rounded-lg'>
                {/* <div className='flex space-x-5'>
                    <div className='flex-col space-y-2'>
                        <p>nama depan</p>
                        <input type='text' value={namadepan} onChange={(e) => setNamadepan(e.target.value)} required />
                    </div>
                    <div className='flex-col space-y-2'>
                        <p>nama belakang</p>
                        <input type='text' value={namaBelakang} onChange={(e) => setNamaBelakang(e.target.value)} required />
                    </div>
                </div> */}
                <div className='flex-col space-y-2'>
                    <p>email</p>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='flex-col space-y-2'>
                    <p>password</p>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button onClick={submitLayanan} className='bg-yellow-500 p-5 rounded-xl'>
                    <p>submit</p>
                </button>
            </div>



            {Array.isArray(userdata) && userdata.map((data, index) => (
                <div key={index} className='bg-green-500 p-5 rounded-lg'>
                    <div className='flex space-x-5'>
                        <div className='flex-col space-y-2'>
                            <p>nama depan</p>
                            <p>{data.namaDepan}</p>
                            <button onClick={() => setNamadepan(data.namaDepan ? data.namaDepan : '')} className='bg-blue-300 p-2'>edit</button>
                            <input type='text' value={namadepan} onChange={(e) => setNamadepan(e.target.value)} required />
                        </div>
                        <div className='flex-col space-y-2'>
                            <p>nama belakang</p>
                            <p>{data.namaBelakang}</p>
                            <button onClick={() => setNamaBelakang(data.namaBelakang ? data.namaBelakang : '')} className='bg-blue-300 p-2'>edit</button>
                            <input type='text' value={namaBelakang} onChange={(e) => setNamaBelakang(e.target.value)} required />
                        </div>
                    </div>
                    <div className='flex-col space-y-2'>
                        <p>email</p>
                        <p>{data.email}</p>
                        <button onClick={() => setEmail(data.email)} className='bg-blue-300 p-2'>edit</button>
                        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='flex-col space-y-2'>
                        <p>password</p>
                        <p>{data.password}</p>
                        <button onClick={() => setPassword(data.password)} className='bg-blue-300 p-2'>edit</button>
                        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className='flex-col space-y-2'>
                        <p>telp</p>
                        <p>{data.telp}</p>
                        <button onClick={() => setTelp(data.telp ? data.telp : '')} className='bg-blue-300 p-2'>edit</button>
                        <input type='number' value={telp} onChange={(e) => setTelp(e.target.value)} required />
                    </div>
                    <div className='flex-col space-y-2'>
                        <p>provinsi</p>
                        <p>{data.provinsi}</p>
                        <button onClick={() => setProvinsi(data.provinsi ? data.provinsi : '')} className='bg-blue-300 p-2'>edit</button>
                        <input type='text' value={provinsi} onChange={(e) => setProvinsi(e.target.value)} required />
                    </div>
                    <div className='flex-col space-y-2'>
                        <p>kota</p>
                        <p>{data.kota}</p>
                        <button onClick={() => setKota(data.kota ? data.kota : '')} className='bg-blue-300 p-2'>edit</button>
                        <input type='text' value={kota} onChange={(e) => setKota(e.target.value)} required />
                    </div>
                    <div className='flex-col space-y-2'>
                        <p>alamat</p>
                        <p>{data.alamat}</p>
                        <button onClick={() => setAlamat(data.alamat ? data.alamat : '')} className='bg-blue-300 p-2'>edit</button>
                        <input type='text' value={alamat} onChange={(e) => setAlamat(e.target.value)} required />
                    </div>
                    <div className='flex-col space-y-2'>
                        <p>kodePos</p>
                        <p>{data.kodePos}</p>
                        <button onClick={() => setKodePos(data.kodePos ? data.kodePos : '')} className='bg-blue-300 p-2'>edit</button>
                        <input type='number' value={kodePos} onChange={(e) => setKodePos(e.target.value)} required />
                    </div>

                    <button onClick={() => submitEditLayanan(data.userID)} className='bg-yellow-500 p-5 rounded-xl'>
                        <p>submit</p>
                    </button>
                    <button onClick={() => submitDeleteLayanan(data.userID)} className='bg-red-500 p-5 rounded-xl'>
                        <p>delete</p>
                    </button>
                </div>
            ))}
        </div>
    )
}
