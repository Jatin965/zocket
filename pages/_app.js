import { DndProvider } from "react-dnd";
import "../styles/globals.css";

import { HTML5Backend } from "react-dnd-html5-backend";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Head>
        <title>Zocket - Run digital ads in 30 seconds</title>
        <link
          rel="icon"
          type="image/png"
          href="https://d273i1jagfl543.cloudfront.net/assets/animationFiles/zocket.svg"
        ></link>
      </Head>
      <Component {...pageProps} />
    </DndProvider>
  );
}

export default MyApp;
