import Header from "@/components/header";
import { transformationTypes } from "@/constants";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

async function AddTransformationPage({ params }: { params: { type: string } }) {
  const { type } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if(!session?.user) redirect('/auth/signin')

  const user = session.user;
  console.log(user)
  console.log(type);
  const transformation = transformationTypes[type as keyof typeof transformationTypes];
  return <>
    <Header title={transformation.title} subtitle={transformation.subTitle} />
  </>;
}

export default AddTransformationPage;
