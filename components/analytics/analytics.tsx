/* eslint-disable react-hooks/exhaustive-deps */
"use client";
 
import { useEffect } from "react";
import Router from 'next/router';
 
export default function Analytics({}) {
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      if (url) {
        // (global as any)?.analytics?.page('Loaded Another Website Page', {
        //   page: url,
        // });
        console.log('Loaded Another Website Page', url)
      }
    };

    Router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);
 
  return <></>;
}