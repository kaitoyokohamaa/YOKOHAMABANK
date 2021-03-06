import Document, { Html, Head, Main, NextScript } from "next/document";

type Props = {};

export default class MyDocument extends Document<Props> {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta charSet="utf-8" />

          <meta
            name="Description"
            property="og:description"
            content="グラフで自分が使ったお金を見える化します。"
          />
          <meta property="og:site_name" content="kaibank" />
          <meta property="og:type" content="website" />
          {/* twitterで拡散 */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@mj3PBy4ayqxfy14" />
          {/* fabicon */}
          <link rel="shortcut icon" href="/img/favicon.png" />
          <link rel="apple-touch-icon" href="/img/favicon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
