// services/layananService.ts
'use server';

import React from "react";
import Ui from "./ui";
import { getLayanan } from "@/api/bundle";

export default async function  Page () {
  
  const layananData = await getLayanan()

  return (
    <Ui layananData={layananData}/>
  );
};
