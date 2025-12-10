import { Collection } from "@/components/collection";
import Header from "@/components/header";
import { getUserImages } from "@/lib/actions/image.actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function ProfilePage({ params }:any) {
  const { searchParams } = await params;
  const page = Number(searchParams?.page) || 1;
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if(!session?.user) redirect('/auth/signin');

  const user = session.user;
  const images = await getUserImages({ page, userId: user.id });
  // console.log(user)
  // console.log(images)
  return (
    <>
      <Header title="Profile" />
      <section className="mt-5 flex flex-col gap-5 sm:flex-row md:mt-8 md:gap-10">
        <div className="w-full rounded-2xl border-2 border-purple-200/20  p-5 shadow-lg shadow-purple-200/10 md:px-6 md:py-8">
          <p className="font-medium text-[14px] leading-[120%] md:font-medium md:text-[16px] md:leading-[140%]">CREDITS AVAILABLE</p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/coins.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="h2-bold text-dark-600">{user.creditBalance}</h2>
          </div>
        </div>

        <div className="w-full rounded-2xl border-2 border-purple-200/20  p-5 shadow-lg shadow-purple-200/10 md:px-6 md:py-8">
          <p className="font-medium text-[14px] leading-[120%] md:font-medium md:text-[16px] md:leading-[140%]">IMAGE MANIPULATION DONE</p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/photo.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="h2-bold text-dark-600">{images?.data.length}</h2>
          </div>
        </div>
      </section>

      <section className="mt-8 md:mt-14">
        <Collection
          images={images?.data}
          totalPages={images?.totalPages}
          page={page}
        />
      </section>
    </>
  );
}

export default ProfilePage;
