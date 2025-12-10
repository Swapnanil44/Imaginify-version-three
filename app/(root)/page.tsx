import { Collection } from "@/components/collection";
import { navLinks } from "@/constants";
import { getAllImages } from "@/lib/actions/image.actions";

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Home({params}:any) {
  const {searchParams} = await params; 
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || "";

  const images = await getAllImages({ page, searchQuery });
  return (
    <Suspense>
      <section className="sm:flex justify-center items-center hidden h-72 flex-col gap-4 rounded-[20px] border bg-banner bg-cover bg-no-repeat p-10 shadow-inner">
        <h1 className="text-[36px] font-semibold sm:text-[44px] leading-[120%] sm:leading-14 max-w-[500px] flex-wrap text-center text-white ">
          Unleash Your Creative Vision with Imaginify
        </h1>
        <ul className="flex justify-center items-center w-full gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex justify-center items-center flex-col gap-2"
            >
              <li className="flex justify-center items-center w-fit rounded-full bg-white p-4">
                <Image src={link.icon} alt="image" width={24} height={24} />
              </li>
              <p className="font-medium text-[14px] leading-[120%] text-center text-white">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>
      <section className="sm:mt-12">
        <Collection
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </Suspense>
  );
}
