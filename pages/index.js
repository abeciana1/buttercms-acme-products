import { getPost } from '@/lib/api'
import { NextSeo } from 'next-seo'
import ComponentRenderer from '@/components/ComponentRenderer'
import { PageLayoutWrapper } from '@/components/_layouts'
import axios from 'axios'

const Home = ({ seo, body }) => {
    const testFunc = async () => {
        // let post = await getPost('pages-vs-pages-types')
        let post = await getPost('a-note-from-datafy-on-googles-third-party-cookies-pivot')
        // const post = await axios.get('https://api.buttercms.com/v2/posts/a-note-from-datafy-on-googles-third-party-cookies-pivot/?auth_token=896560ce488b619dee0a216bb08f951e287d7138')
        console.log('post', post)
        return post
    }
    testFunc()
    // useEffect(() => {
    //     const post = axios.get('https://api.buttercms.com/v2/posts/a-note-from-datafy-on-googles-third-party-cookies-pivot/?auth_token=896560ce488b619dee0a216bb08f951e287d7138')
    //     console.log('post', post)
    //     // getPost('a-note-from-datafy-on-googles-third-party-cookies-pivot')
    // }, [])
    return (
        <>
            <NextSeo
                title={seo?.title}
                description={seo?.description}
                noindex={seo?.noindex}
                canonical={typeof window!== 'undefined'? window.location.href : ''}
            />
            <PageLayoutWrapper>
                {body?.body?.map(({ type, fields: sectionData}, index) => {
                    return <ComponentRenderer
                        key={type + index}
                        type={type}
                        sectionData={sectionData}
                    />
                })}
            </PageLayoutWrapper>
        </>
    )
}

export const getServerSideProps = async (context) => {
    const params = {
        'preview': context?.query?.preview === '1' ? 1 : 0
    }
    // try {
    //     let { seo, body } = await getPageData('page','homepage', params)
    //     return {
    //         props: {
    //             // seo,
    //             // body
    //         }
    //     }
    // } catch (error) {
    //     const page = await getPageData('page', '404', params)
    //     return {
    //         props: {
    //             seo: {
    //                 title: page?.body?.seo?.title,
    //                 description: page?.body?.seo?.description,
    //                 noIndex: page?.body?.seo?.no_index
    //             },
    //             body: page?.body,
    //         }
    //     }
    // }
    return {
        props: {}
    }
}


export default Home