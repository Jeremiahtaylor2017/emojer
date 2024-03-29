import type { AppType } from "next/app";
import Head from "next/head";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
export { reportWebVitals } from 'next-axiom';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Emojer</title>
        <meta name="description" content="💭" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="bottom-center" />
      <Component {...pageProps} />
    </ClerkProvider>
  )
};

export default api.withTRPC(MyApp);
