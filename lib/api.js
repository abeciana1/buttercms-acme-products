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

export const getForm = async () => {
  try {
    let forms = await butter.content.retrieve(
      ['form']
    )
    const form = forms?.data?.data?.form[0]
    let formObj = {
      backgroundColor: form?.background_color,
      submitText: form?.submit_button_text,
      fields: form?.fields,
      buttonColor: form?.submit_button_color,
      text: form?.form_text
    }
    return formObj ? formObj : []
  } catch (e) {
    throw e.response.data.detail
  }
}