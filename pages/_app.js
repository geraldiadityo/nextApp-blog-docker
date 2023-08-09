import 'styles/theme.scss';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import DefaultDashboardLayout from '@/components/admin/DefaultDashboardLayout';
import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/reducer/store';
import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';


export default function App({ Component, pageProps }) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  
  const pageUrl = process.env.baseUrl + router.pathname;
  const title = 'geraldi blog artikel';
  const description = 'geraldi dashboard UI template';
  const keyword = "dash ui, template, dashboard, nextjs, geraldi, blog";

  const DefaultLayout = Component.Layout || (router.pathname.includes('admin') ? 
  (router.pathname.includes('auth') ? DefaultDashboardLayout : DefaultDashboardLayout) : DefaultDashboardLayout)

  function authCheck(url){
    const cookie = getCookie('token');
    const publicPath = ["/","/auth","/categorie"];
    const adminPath = "/admin" || "/api";
    const path = url.split("?")[0];
    if (!cookie && path.startsWith(adminPath)) {
      console.log(cookie);
      router.push({
        pathname: '/auth',
        query: { returnUrl: router.asPath }
      });
    } else {
      setAuthorized(true);
    }
  }

  useEffect(() => {
    authCheck(router.asPath);
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart",hideContent);
    router.events.on("routeChangeComplete",authCheck);

    return () => {
      router.events.off("routeChangeStart",hideContent);
      router.events.off("routeChangeComplete",authCheck);
    }
  },[]);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1'/>
          <meta name='keywords' content={keyword} />
          <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
        </Head>
        <NextSeo
          title={title}
          description={description}
          canonical={pageUrl}
          openGraph={{
            url:pageUrl,
            title:title,
            description:description,
            siteName: process.env.siteName
          }}
        />
        <DefaultLayout>
          {authorized &&
            <Component {...pageProps} />
          }
        </DefaultLayout>
      </PersistGate>
    </Provider>
    
  )
}
