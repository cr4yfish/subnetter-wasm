import Document, { Html, Head, Main, NextScript } from "next/document";
import { CssBaseline } from '@nextui-org/react';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return {
          ...initialProps,
          styles: [<>{initialProps.styles}</>]
        };
    }

    render() {
        return(
            <Html>
                <Head>
                    {CssBaseline.flush()}
                    <meta name='application-name' content='DNIS Tabellen Rechner' />
                    <meta name='apple-mobile-web-app-capable' content='yes' />
                    <meta name='apple-mobile-web-app-status-bar-style' content='default' />
                    <meta name='apple-mobile-web-app-title' content='DNIS Tabellen Rechner' />
                    <meta name='description' content='Z2mDasboard' />
                    <meta name='format-detection' content='telephone=no' />
                    <meta name='mobile-web-app-capable' content='yes' />
                    <meta name='msapplication-TileColor' content='#f8cd86' />
                    <meta name='msapplication-tap-highlight' content='no' />
                    <meta name='theme-color' content='#f8cd86' />

                    <link rel='manifest' href='/manifest.json' />
                    <link rel='shortcut icon' href='/favicon.ico' />
                        
                    <meta name='twitter:card' content='summary' />
                    <meta name='twitter:url' content='https://dnis-tabellen-rechner.vercel.app/' />
                    <meta name='twitter:title' content='DNIS Tabellen Rechner' />
                    <meta name='twitter:description' content='Z2mDasboard' />
                    <meta name='twitter:creator' content='@Cr4yfish' />
                    <meta property='og:type' content='website' />
                    <meta property='og:title' content='DNIS Tabellen Rechner' />
                    <meta property='og:description' content='Z2mDasboard' />
                    <meta property='og:site_name' content='DNIS Tabellen Rechner' />
                    <meta property='og:url' content='https://close-up-blog.vercel.app' />

                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;