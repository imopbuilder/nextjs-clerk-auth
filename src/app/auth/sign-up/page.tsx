import AuthHeader from '@/components/pages/auth';
import { Fragment } from 'react';

export default function Page() {
  return (
    <Fragment>
      <AuthHeader />
      <main>
        <div>
          <p>Auth - Sign up</p>
        </div>
      </main>
    </Fragment>
  );
}
