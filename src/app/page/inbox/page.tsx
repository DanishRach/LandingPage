'use server';

import Ui from "./ui";
import { getLayanan } from "@/api/bundle";



export default async function Home() {

  const layanandata = await getLayanan()


  return (
    <Ui layanandata={layanandata} />
  );
}