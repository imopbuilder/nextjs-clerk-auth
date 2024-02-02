import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { genetateUserName } from '@/lib/utils/generate-user-name';
import { UserProfile, currentUser } from '@clerk/nextjs';
import { Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, Suspense } from 'react';
import { ThemeToggle } from '../theme-toggle';
import { SignoutBtn, UserButtonDialogContent } from './client';

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
      {/* <UserButton /> */}
      <Suspense fallback={<Skeleton className='size-10 rounded-full' />}>
        <CustomUserButton />
      </Suspense>
    </Fragment>
  );
}

async function CustomUserButton() {
  const user = await currentUser();
  const email = user?.emailAddresses.find((val) => val.id === user.primaryEmailAddressId);

  if (!user)
    return (
      <Fragment>
        <Button variant='outline' size='lg' asChild>
          <Link href={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}>Sign in</Link>
        </Button>
        <Button size='lg' asChild>
          <Link href={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}>Sign up</Link>
        </Button>
      </Fragment>
    );

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type='button'
            className='ring-primary/50 data-[state=closed]:ring-0 data-[state=open]:ring-4 duration-200 rounded-full focus:outline-0 border-primary-foreground border'
          >
            <Avatar className='scale-100 shadow-lg'>
              <AvatarImage src={user.imageUrl} alt='profile-pic' />
              <AvatarFallback>{genetateUserName(`${user.firstName} ${user.lastName}`)}</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-96 rounded-[1rem] py-6 px-0 border-2 border-transparent shadow-spread' align='end' sideOffset={10}>
          <DropdownMenuLabel className='font-normal px-6 py-0 mb-2'>
            <div className='flex justify-start items-center gap-4'>
              <div className='w-11 aspect-square'>
                <Image src={user.imageUrl} className='rounded-full' alt='profile-pic' width={100} height={100} unoptimized loading='lazy' />
              </div>
              <div>
                <p className='font-medium text-sm'>{`${user.firstName} ${user.lastName}`}</p>
                <p className='text-muted-foreground text-[13px]'>{email ? email.emailAddress : '-'}</p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            {/* User Profile */}
            <UserProfileItem />
            {/* Signout Button */}
            <SignoutBtn />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <UserButtonDialogContent>
        <div className='h-[min(44rem,_100%_-_3rem)] flex items-stretch justify-start'>
          <UserProfile />
        </div>
      </UserButtonDialogContent>
    </Dialog>
  );
}

function UserProfileItem() {
  return (
    <DialogTrigger asChild>
      <DropdownMenuItem className='text-muted-foreground w-full hover:cursor-pointer px-6 py-3.5 rounded-xl group font-medium' asChild>
        <button type='button' className='gap-4'>
          <span className='flex items-stretch justify-center basis-11'>
            <Settings size={16} strokeWidth={2} />
          </span>
          <span>Manage account</span>
        </button>
      </DropdownMenuItem>
    </DialogTrigger>
  );
}
