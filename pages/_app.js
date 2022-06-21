import '../styles/globals.css'
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ToastContainer, Slide } from 'react-toastify';

const darkTheme = createTheme({
  type: "dark",
});

function MyApp({ Component, pageProps }) {
  return (
    <NextThemesProvider
      defaultTheme='dark'
      attribute='class'
      value={{dark: darkTheme.className}}
    >
      <NextUIProvider>
        <ToastContainer
            position="top-center"
            autoClose={500}
            hideProgressBar
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            transition={Slide}
          />
        <Component {...pageProps} />
      </NextUIProvider>
    </NextThemesProvider>

  )
}

export default MyApp
