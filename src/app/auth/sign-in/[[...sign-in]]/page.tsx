import AuthHeader from '@/components/pages/auth';
import { SignIn } from '@clerk/nextjs';
import { Fragment, Suspense } from 'react';

export default function Page() {
  return (
    <Fragment>
      <AuthHeader />
      <main>
        <section>
          <div className='py-14 flex items-center justify-center'>
            <Suspense fallback={<p>loading...</p>}>
              <SignIn />
            </Suspense>
          </div>
        </section>
      </main>
    </Fragment>
  );
}
