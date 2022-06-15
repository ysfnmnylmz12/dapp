import Head from "next/head";
import Store from "../store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Store>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        ></meta>
      </Head>
      <Component {...pageProps} />
    </Store>
  );
}

export default MyApp;
