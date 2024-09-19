import Butter from 'buttercms';

let butter;

try {
  butter = Butter(process.env.NEXT_PUBLIC_BUTTER_CMS_API_KEY)
}
catch (e) {
  console.log(e)
}

export const getPageData = async (pageType, pageName, params) => {
  try {
    const page = await butter?.page?.retrieve(pageType, pageName, params);
    return {
      seo: {
        title: page?.data?.data?.fields?.seo?.title,
        description: page?.data?.data?.fields?.seo?.description,
        // ogImage: page?.data?.data?.fields?.seo?.og_image?.url,
      },
      body: page?.data?.data?.fields
    }
  } catch (e) {
    throw e.response.data.detail
  }
}

export async function getMainMenu() {
  try {
    const response = await butter.content.retrieve(
      ["navigation_menu"]
    )

    const mainMenu = response?.data?.data?.navigation_menu.find(
      menu => menu.name == "Main menu"
    )
    return mainMenu ? mainMenu : []
  }
  catch (e) {
    throw e.response.data.detail
  }
}

export const getPersonalizedProducts = async (cookieTarget) => {
  try {
    const response = await butter?.content?.retrieve(['personalization'], {
      "fields.cookie_target": cookieTarget
    })
    const products = response?.data?.data?.personalization[0]?.product_recommendations
    return products
  } catch (e) {
    throw e.response.data.detail
  }
}

export const getModalContent = async (cookieTarget) => {
  try {
    const response = await butter?.content?.retrieve(['promotional_popup'], {
      'fields.cookie_name': cookieTarget,
      'fields.is_active': true
    })
    const modalContent = response?.data?.data?.promotional_popup[0]
    return modalContent
  } catch (e) {
    throw e.response.data.detail
  }
}
