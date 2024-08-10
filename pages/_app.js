import { DndProvider } from "react-dnd";
import "../styles/globals.css";

import { HTML5Backend } from "react-dnd-html5-backend";

function MyApp({ Component, pageProps }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Component {...pageProps} />
    </DndProvider>
  );
}

export default MyApp;
