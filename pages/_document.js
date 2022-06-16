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
                    <meta name='application-name' content='Z2mDashboard' />
                    <meta name='apple-mobile-web-app-capable' content='yes' />
                    <meta name='apple-mobile-web-app-status-bar-style' content='default' />
                    <meta name='apple-mobile-web-app-title' content='Z2mDashboard' />
                    <meta name='description' content='Z2mDasboard' />
                    <meta name='format-detection' content='telephone=no' />
                    <meta name='mobile-web-app-capable' content='yes' />
                    <meta name='msapplication-config' content='/icons/browserconfig.xml' />
                    <meta name='msapplication-TileColor' content='#f8cd86' />
                    <meta name='msapplication-tap-highlight' content='no' />
                    <meta name='theme-color' content='#f8cd86' />

                    <link rel='apple-touch-icon' href='/icons/touch-icon-iphone.png' />
                    <link rel='apple-touch-icon' sizes='152x152' href='/icons/touch-icon-ipad.png' />
                    <link rel='apple-touch-icon' sizes='180x180' href='/icons/touch-icon-iphone-retina.png' />
                    <link rel='apple-touch-icon' sizes='167x167' href='/icons/touch-icon-ipad-retina.png' />

                    <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
                    <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />
                    <link rel='manifest' href='/manifest.json' />
                    <link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#f8cd86' />
                    <link rel='shortcut icon' href='/favicon.ico' />
                        
                    <meta name='twitter:card' content='summary' />
                    <meta name='twitter:url' content='https://close-up-blog.vercel.app/' />
                    <meta name='twitter:title' content='Z2mDashboard' />
                    <meta name='twitter:description' content='Z2mDasboard' />
                    <meta name='twitter:image' content='https://close-up-blog.vercel.app/icons/android-chrome-192x192.png' />
                    <meta name='twitter:creator' content='@Cr4yfish' />
                    <meta property='og:type' content='website' />
                    <meta property='og:title' content='Z2mDashboard' />
                    <meta property='og:description' content='Z2mDasboard' />
                    <meta property='og:site_name' content='Z2mDashboard' />
                    <meta property='og:url' content='https://close-up-blog.vercel.app' />
                    <meta property='og:image' content='https://close-up-blog.vercel.app/icons/apple-touch-icon.png' />

                    <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />

                    <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    />

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