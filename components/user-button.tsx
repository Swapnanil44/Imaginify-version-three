'use client';
import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useRouter } from 'next/navigation';

function UserButton({url}:{url: string | null | undefined}) {
    const router = useRouter();
  return (
    <Button onClick={() => router.push('/profile')} className='p-1 rounded-full bg-transparent hover:bg-transparent'>
        <Avatar>
        <AvatarImage src={url!} alt="@shadcn" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    </Button>
  )
}

export default UserButton