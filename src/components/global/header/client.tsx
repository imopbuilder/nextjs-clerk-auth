'use client';

import { DialogContent } from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useClerk } from '@clerk/nextjs';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
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
      className='focus:text-destructive dark:focus:text-red-500 text-muted-foreground w-full hover:cursor-pointer px-6 py-3.5 rounded-xl group font-medium'
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

export function UserButtonDialogContent({ children }: { children: ReactNode }) {
  return (
    <DialogContent
      className='p-0 bg-transparent border-none h-[min(44rem,_100%_-_3rem)] max-w-none w-max shadow-none'
      onOpenAutoFocus={(e) => e.preventDefault()}
    >
      {children}
    </DialogContent>
  );
}
