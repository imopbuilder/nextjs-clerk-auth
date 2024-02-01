import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import { Fragment } from 'react';
import { ThemeToggle } from '../theme-toggle';

export default function Header() {
  return (
    <header className='border-b'>
      <div className='max-w-maxi mx-auto px-[4%] h-16 flex items-center justify-between'>
        <div className='flex items-center justify-center'>
          <Link href={'/'} className='font-semibold'>
            Op Clerk
          </Link>
        </div>
        <nav className='flex items-center justify-center sm:gap-4 gap-3'>
          <ThemeToggle />
          <AuthButtons />
        </nav>
      </div>
    </header>
  );
}

function AuthButtons() {
  return (
    <Fragment>
      <ClerkLoading>
        <Skeleton className='size-10 rounded-full' />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <p>UB</p>
        </SignedIn>
        <SignedOut>
          <Button variant='outline' size='lg' asChild>
            <Link href={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}>Sign in</Link>
          </Button>
          <Button size='lg' asChild>
            <Link href={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}>Sign up</Link>
          </Button>
        </SignedOut>
      </ClerkLoaded>
    </Fragment>
  );
}
