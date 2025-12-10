import Checkout from "@/components/checkout";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { plans } from "@/constants";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if(!session?.user) redirect('/auth/signin');

  const user = session.user;
  return <>
    <Header
        title="Buy Credits"
        subtitle="Choose a credit package that suits your needs!"
      />
    
    <section>
        <ul className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-9 xl:grid-cols-3">
          {plans.map((plan) => (
            <li key={plan.name} className="w-full rounded-2xl border-2 border-slate-400 dark:border-slate-400 text-black dark:text-slate-400 p-8 shadow-xl  lg:max-w-none">
              <div className="flex justify-center items-center flex-col gap-3">
                <Image src={plan.icon} alt="check" width={50} height={50} />
                <p className="font-semibold text-[20px] leading-[140%] mt-2 text-purple-500">
                  {plan.name}
                </p>
                <p className="text-[36px] font-semibold sm:text-[44px] leading-[120%] sm:leading-[56px] text-dark-600">${plan.price}</p>
                <p className="font-normal text-[16px] leading-[140%]">{plan.credits} Credits</p>
              </div>

              {/* Inclusions */}
              <ul className="flex flex-col gap-5 py-9">
                {plan.inclusions.map((inclusion) => (
                  <li
                    key={plan.name + inclusion.label}
                    className="flex items-center gap-4"
                  >
                    <Image
                      src={`/assets/icons/${
                        inclusion.isIncluded ? "check.svg" : "cross.svg"
                      }`}
                      alt="check"
                      width={24}
                      height={24}
                    />
                    <p className="font-normal text-[16px] leading-[140%]">{inclusion.label}</p>
                  </li>
                ))}
              </ul>

              {plan.name === "Free" ? (
                <Button variant="outline" className="w-full rounded-full bg-purple-100 bg-cover text-purple-500 hover:text-purple-500">
                  Free Consumable
                </Button>
              ) : (
                  <Checkout
                    plan={plan.name}
                    amount={plan.price}
                    credits={plan.credits}
                    buyerId={user.id}
                  />
                
              )}
            </li>
          ))}
        </ul>
      </section>
  </>;
}

export default page;
