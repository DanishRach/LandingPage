'use client'
import React, { useState } from 'react'
import { addProject, deleteProject, editProject, payProject } from '@/api/project'
import { toast } from 'sonner'
import { layananProps, projectProps, userProps } from '@/types/types'
import Script from 'next/script'
import { transaction } from '@/api/transaction'




declare global {
    interface Window {
      snap: {
        pay: (transactionToken: string, options?: SnapPayOptions) => void;
      };
    }
  }
  interface SnapPayOptions {
    onSuccess?: (result: unknown) => void;
    onPending?: (result: unknown) => void;
    onError?: (result: unknown) => void;
    onClose?: () => void;
  }
  


interface uiProps {
    userData: userProps[] | undefined,
    layananData: layananProps[] | undefined,
    projectData: projectProps[] | undefined
}
export default function Ui({ userData, layananData, projectData }: uiProps) {

    const [userID, setUserID] = useState<string>('')

    const[domain, setDomain] = useState<string>('')
    const[project, setProject] = useState<string>('')
    const[layananID, setLayananID] = useState<string>('')

    

    async function submitProject() {
        const formData = new FormData()

        if(userID) formData.append('userID', userID)
        if(domain) formData.append('domain', domain)
        if(project) formData.append('project', project)
        if(layananID) formData.append('layananID', layananID)

        const pay = await transaction(formData)
        if (typeof pay === 'string') {
            window.snap.pay(pay, {
                onSuccess: async function (){ 
                    const data = await addProject(formData)
                    if (data.error) {
                        toast.error(data.error)
                    } else{
                        toast.success(data.success)
                    }
                },
                onPending: function(){ console.log('pending')},
                onError: function(){toast.error('something wrong')},
                onClose: function(){toast.info('customer closed the popup without finishing the payment')}
            })
        }
    }
    
    async function bayar(dataProject: projectProps) {
        const formData = new FormData()

        if(dataProject.userID) formData.append('userID', dataProject.userID)
        if(dataProject.projectID) formData.append('projectID', dataProject.projectID)
        if(dataProject.layananID) formData.append('layananID', dataProject.layananID)

        const pay = await transaction(formData)
        if (typeof pay === 'string') {
            window.snap.pay(pay, {
                onSuccess: async function (){ 
                    const data = await payProject(formData)
                    if (data.error) {
                        toast.error(data.error)
                    } else{
                        toast.success(data.success)
                    }
                },
                onPending: function(){ console.log('pending')},
                onError: function(){toast.error('something wrong')},
                onClose: function(){toast.info('customer closed the popup without finishing the payment')}
            })
        }
    }

    
    async function submitEditProject(projectID: string) {
        const formData = new FormData()

        if(projectID) formData.append('projectID', projectID)
        if(userID) formData.append('userID', userID)
        if(domain) formData.append('domain', domain)
        if(project) formData.append('project', project)
        if(layananID) formData.append('layananID', layananID)

        const result = await editProject(formData)
        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success(result.success)
        }
    }
    
    async function submitDeleteProject(projectID: string) {
        const formData = new FormData()

        if(projectID) formData.append('projectID', projectID)


        const result = await deleteProject(formData)
        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success(result.success)
        }
    }
    return (
        <>
        <Script
            src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_SRC}
            data-client-key={process.env.NEXT_PUBLIC_CLIENT}
            strategy='lazyOnload'
        />
        <div className='flex justify-center items-center h-screen'>
            <div id='snap-container'></div>
            <div className='flex-col space-y-5 bg-green-500 p-5'>
                <div className='bg-slate-500'>
                    <p>using project as</p>
                    <select value={userID} onChange={(e) => setUserID(e.target.value)}>
                        <option></option>
                        {userData !== undefined && userData.map((item, index) => (
                            <option key={index} value={item.userID}>{item.email}</option>
                        ))}
                    </select>
                </div>
                <div className='flex justify-evenly'>
                    <div className='flex-col space-x-5'>
                        <p>tambah project</p>
                        <div>
                            <p>domain</p>
                            <input type='url' value={domain} onChange={(e) => setDomain(e.target.value)} required />
                        </div>
                        <div>
                            <p>project</p>
                            <input type='url' value={project} onChange={(e) => setProject(e.target.value)} required />
                        </div>
                        <div>
                            <p>layanan</p>
                            <select value={layananID} onChange={(e) => setLayananID(e.target.value)} required>
                                <option></option>
                                {layananData !== undefined && layananData.map((item, index) => (
                                <option key={index} value={item.layananID}>{item.judul}</option>
                            ))}
                            </select>
                        </div>
                        <button onClick={submitProject} className='bg-slate-500'>
                            <p>pesan</p>
                        </button>
                    </div>
                    <p>ijijij</p>
                </div>
            </div>

            {projectData !== undefined && projectData.map((data, index) =>(
                <div key={index} className='p-2 bg-slate-400 '>
                    <div>
                        <p>domain</p>
                        <p>{data.domain}</p>
                        <button onClick={() => setDomain(data.domain)} className='bg-blue-300 p-2'>edit</button>
                    <input type='text' value={domain} onChange={(e) => setDomain(e.target.value)} required />
                    </div>
                    <div>
                        <p>project</p>
                        <p>{data.project}</p>
                        <button onClick={() => setProject(data.project)} className='bg-blue-300 p-2'>edit</button>
                    <input type='text' value={project} onChange={(e) => setProject(e.target.value)} required />
                    </div>
                    <div>
                    <p>Rp. {data.tagihan}</p>
                    <button onClick={() => bayar(data)} className={`${data.tagihan > 0? 'block':'hidden'} p-2 bg-green-500`}>bayar</button>
                    </div>
                    <div>
                        <p>userID</p>
                        <p>{data.userID}</p>
                        <button onClick={() => setUserID(data.userID)} className='bg-blue-300 p-2'>edit</button>
                        <select value={userID} onChange={(e)=>setUserID(e.target.value)}>
                        <option></option>
                            {userData !== undefined && userData.map((item, index) => (
                                <option key={index} value={item.userID}>{item.email}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <p>layananID</p>
                        <p>{data.layananID}</p>
                        <button onClick={() => setLayananID(data.layananID)} className='bg-blue-300 p-2'>edit</button>
                        <select value={layananID} onChange={(e)=>setLayananID(e.target.value)}>
                            <option></option>
                            {layananData !== undefined && layananData.map((item, index) => (
                                <option key={index} value={item.layananID}>{item.judul}</option>
                            ))}
                        </select>
                    </div>
                    <button onClick={() => submitEditProject(data.projectID)} className='p-2 bg-blue-500'>
                        edit
                    </button>
                    <button onClick={() => submitDeleteProject(data.projectID)} className='p-2 bg-red-500'>
                        delete
                    </button>
                </div>
            ))}

        </div>
        </>
    )
}
