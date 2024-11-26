'use client';

import React, { useState } from 'react'
import { MdDelete } from 'react-icons/md';
import { addBundle, deleteBundle, editBundle } from '@/api/bundle';
import { toast } from 'sonner';
import { layananProps } from '@/types/types';

interface uiProps{
    layanandata: layananProps[] | undefined
    
}

export default function Ui({layanandata}:uiProps) {

    const [judul, setJudul] = useState<string>('')
    const [harga, setHarga] = useState<string>('')
    const [services, setServices] = useState<string[]>([])
    const [addServices, setAddServices] = useState<string>('')

    const handleAddService = () => {
        if (addServices.trim() !== '') {  // Prevent adding empty services
            setServices((prevServices) => [...prevServices, addServices]);
            setAddServices('');  // Clear the input after adding
        }
    };

    const handleDeleteService = (serviceToDelete: string) => {
        setServices((prevServices) => prevServices.filter(service => service !== serviceToDelete));
    };

    const submitLayanan = async () => {
        const formdata = new FormData()
        if (judul) formdata.append('judul', judul)
        if (harga) formdata.append('harga', String(harga))
        if (services && services.length > 0) {
            services.forEach(service => {
                formdata.append('services', service); // Append each service as a separate entry
            });

        }

        const result = await addBundle(formdata)
        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success(result.success)
        }

    }
    
    const submitEditLayanan = async (layananID: string) => {
        const formdata = new FormData()
        if (layananID) formdata.append('layananID', layananID)
        if (judul) formdata.append('judul', judul)
        if (harga) formdata.append('harga', String(harga))
        if (services && services.length > 0) {
            services.forEach(service => {
                formdata.append('services', service); // Append each service as a separate entry
            });

        }

        const result = await editBundle(formdata)
        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success(result.success)
        }

    }
    
    const submitDeleteLayanan = async (layananID: string) => {
        const formdata = new FormData()
        if (layananID) formdata.append('layananID', layananID)

        const result = await deleteBundle(formdata)
        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success(result.success)
        }

    }

    return (
        <div className='flex justify-between items-center h-screen'>
            <div className='bg-green-500 p-5 rounded-lg'>
                <div className='flex-col space-y-2'>
                    <p>Judul</p>
                    <input type='text' value={judul} onChange={(e) => setJudul(e.target.value)} required />
                </div>
                <div className='flex-col space-y-2'>
                    <p>harga</p>
                    <input type='number' value={harga} onChange={(e) => setHarga(e.target.value)} required />
                </div>
                <div className='flex-col space-y-2'>
                    <p>services</p>
                    <ul className='list-decimal pl-5'>
                        {services.map((item, index) => (
                            <li className='group hover:bg-gray-300 flex justify-between' key={index}>
                                {item}
                                <button onClick={() => handleDeleteService(item)} className='group-hover:block hidden'>
                                    <MdDelete />
                                </button>
                            </li>
                        ))}
                    </ul>
                    <input type='text' value={addServices} onChange={(e) => setAddServices(e.target.value)} placeholder='add services' />
                    <button onClick={handleAddService} className='p-2 rounded-md bg-blue-300'>tambah services</button>
                </div>
                <button onClick={submitLayanan} className='bg-yellow-500 p-5 rounded-xl'>
                    <p>submit</p>
                </button>
            </div>
           
           
            {Array.isArray(layanandata)  && layanandata.map((data, index) => (
                <div key={index} className='bg-green-500 p-5 rounded-lg'>
                <div className='flex-col space-y-2'>
                    <p>Judul for edit</p>
                    <p>{data.judul}</p>
                    <button onClick={() =>setJudul(data.judul)} className='bg-blue-300 p-1'>
                        edit
                    </button>
                    <input type='text' value={judul} onChange={(e) => setJudul(e.target.value)} required />
                </div>
                <div className='flex-col space-y-2'>
                    <p>harga</p>
                    <p>{data.harga}</p>
                    <button onClick={() => setHarga(String(data.harga))} className='bg-blue-300 p-1'>
                        edit
                    </button>
                    <input type='number' value={harga} onChange={(e) => setHarga(e.target.value)} required />
                </div>
                <div className='flex-col space-y-2'>
                    <p>services</p>
                    <ul className='list-decimal pl-5'>
                        {data.services.map((item: string, index: number) => (
                            <li className='group hover:bg-gray-300 flex justify-between' key={index}>
                                {item}
                                <button onClick={() => handleDeleteService(item)} className='group-hover:block hidden'>
                                    <MdDelete />
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => {
                        data.services.forEach((item: string) => {
                            setServices((prevServices) => [...prevServices, item]);
                        });
                    }} className='bg-blue-300 p-1'>
                        edit
                    </button>
                    <p>services edit</p>
                    <ul className='list-decimal pl-5'>
                        {services.map((item, index) => (
                            <li className='group hover:bg-gray-300 flex justify-between' key={index}>
                                {item}
                                <button onClick={() => handleDeleteService(item)} className='group-hover:block hidden'>
                                    <MdDelete />
                                </button>
                            </li>
                        ))}
                    </ul>
                    <input type='text' value={addServices} onChange={(e) => setAddServices(e.target.value)} placeholder='add services' />
                    <button onClick={handleAddService} className='p-2 rounded-md bg-blue-300'>tambah services</button>
                </div>
                <button onClick={() => submitEditLayanan(data.layananID)} className='bg-yellow-500 p-5 rounded-xl'>
                    <p>submit</p>
                </button>
                <button onClick={() => submitDeleteLayanan(data.layananID)} className='bg-red-500 p-5 rounded-xl'>
                    <p>delete</p>
                </button>
            </div>
            ))}
        </div>
    )
}
