import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.cdnfonts.com/css/noto-sans-batak"
            rel="stylesheet"
          />
          <link
            href="https://fonts.cdnfonts.com/css/qumpellkano12"
            rel="stylesheet"
          />
          <link
            href="https://fonts.cdnfonts.com/css/g-gelembung"
            rel="stylesheet"
          />
          <link
            href="https://fonts.cdnfonts.com/css/cutest-things"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Rubik+Bubbles&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.cdnfonts.com/css/montserrat"
            rel="stylesheet"
          />
          <link
            href="https://fonts.cdnfonts.com/css/montserrat-alternates"
            rel="stylesheet"
          />
          {/* <link rel="icon" href="%PUBLIC_URL%/favicon.svg" /> */}
          {/* <link rel="shortcut icon" href="/public/favicon.svg"></link> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
