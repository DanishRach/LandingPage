'use server';

import React from 'react'
import Ui from './ui'
import { getUser } from '@/api/user';
import { getLayanan } from '@/api/bundle';
import { getProject } from '@/api/project';





export default async function page() {


    const userData = await getUser()
    const layananData = await getLayanan()
    const projectData = await getProject()
    return (
        <Ui userData={userData} layananData={layananData} projectData={projectData} />
    )
}
