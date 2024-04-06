'use client';
import { useEffect, useLayoutEffect } from 'react';
import { redirect } from 'next/navigation';

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    let auth: unknown;
    if (typeof window !== 'undefined') {
      auth = localStorage.getItem('auth');
    }
    useLayoutEffect(() => {
      if (!auth) {
        redirect('/login');
      }
    }, [auth]);

    return <Component {...props} />;
  };
}
