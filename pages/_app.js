import App from "next/app"
import { getMainMenu } from "@/lib/api"

import '@/css/main.css'

function MyApp({ Component, pageProps, mainMenu }) {
  return(
    <>
      <Component {...pageProps} />
    </>
  )

}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const authToken = process.env.NEXT_PUBLIC_BUTTER_CMS_API_KEY
  let mainMenu = []

  if (authToken) {
    try {
      mainMenu = await getMainMenu()
    }
    catch (e) {
      console.error("Couldn't load main menu links.", e)
    }
  }

  return { ...appProps, mainMenu };
};

export default MyApp
