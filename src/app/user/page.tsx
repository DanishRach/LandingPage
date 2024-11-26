'use server';

import Ui from "./ui";
import { getUser } from "@/api/user";


export default async function Home() {

  const userdata = await getUser()


  return (
    <Ui userdata={userdata} />
  );
}
