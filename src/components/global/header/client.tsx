'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useClerk } from '@clerk/nextjs';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CircularLoader from '../loader/circular-loader';

export function SignoutBtn() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signOut } = useClerk();

  function handleSignout() {
    setLoading(true);
    signOut(() => {
      setLoading(false);
      router.replace('/');
    });
  }

  return (
    <DropdownMenuItem
      className='focus:text-destructive-foreground focus:bg-destructive text-muted-foreground w-full hover:cursor-pointer px-6 py-3.5 rounded-lg group font-medium'
      onClick={(e) => e.preventDefault()}
      asChild
    >
      <button type='button' className='gap-4' onClick={handleSignout} disabled={loading}>
        <span className='flex items-stretch justify-center basis-11'>
          {loading ? <CircularLoader className='h-5 border-t-foreground/70' /> : <LogOut size={16} strokeWidth={2.25} />}
        </span>
        <span>Sign out</span>
      </button>
    </DropdownMenuItem>
  );
}
