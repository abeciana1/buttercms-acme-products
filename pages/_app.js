import App from "next/app"
import { getMainMenu } from "@/lib/api"
import { Provider } from'react-redux'
import store from '@/lib/store'

import '@/css/main.css'

// * components
import Header from '@/components/Header'

function MyApp({ Component, pageProps, mainMenu }) {
  return(
    <Provider store={store}>
      <Header key={mainMenu?.meta?.id} mainMenu={mainMenu} />
      <Component {...pageProps} />
    </Provider>
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
