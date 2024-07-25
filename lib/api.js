import Butter from 'buttercms';

let butter;

const previewSetting = process.env.PREVIEW
// make preview mode by default
const preview = previewSetting === "true" || previewSetting === undefined ? 1 : 0

try {
  butter = Butter(process.env.NEXT_PUBLIC_BUTTER_CMS_API_KEY, preview);
}
catch (e) {
  console.log(e)
}

const defaultPageSize = 100
const defaultPostCount = 10

export const getPageData = async (pageType, pageName) => {
  try {
    const page = await butter?.page?.retrieve(pageType, pageName);
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
