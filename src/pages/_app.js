import { store } from "@/redux/store";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Toaster
        position="top-right"
        toastOptions={{
          className: "",
          style: {
            margin: "10px",
            padding: "10px",
            display: "inline-flex",
            fontSize: "14px",
            zIndex: 999999,
          },
          duration: 4000,
          error: {
            style: {
              background: "#ff6363",
              color: "white",
            },
            iconTheme: {
              primary: "white",
              secondary: "red",
            },
          },
          success: {
            style: {
              background: "green",
              color: "white",
            },
            iconTheme: {
              primary: "white",
              secondary: "green",
            },
          },
        }}
      />
    </Provider>
  );
}
