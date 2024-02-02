import Header from '@/components/global/header';
import { Fragment } from 'react';

export default function Page() {
  return (
    <Fragment>
      <Header />
      <main>
        <div className='h-[200vh]'>
          <p>Hello world</p>
        </div>
      </main>
    </Fragment>
  );
}
