import MobileNav from '@/components/mobile-nav';
import SideBar from '@/components/side-bar';
import React from 'react'

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='flex min-h-screen w-full flex-col lg:flex-row'>
    <SideBar/>
    <MobileNav/>
    <div className='mt-16 flex-1 overflow-auto py-8 lg:mt-0 lg:max-h-screen lg:py-10'>
      <div className='max-w-5xl mx-auto px-5 md:px-10 w-full text-slate-400 p-16-regular'>
        {children}
      </div>
    </div>
    
    </main>
  )
}

export default layout