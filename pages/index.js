import { getPageData } from '@/lib/api'
import { NextSeo } from 'next-seo'
import ComponentRenderer from '@/components/ComponentRenderer'
import { PageLayoutWrapper } from '@/components/_layouts'

const Home = ({ seo, body }) => {
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
    try {
        let { seo, body } = await getPageData('page','homepage', params)
        return {
            props: {
                seo,
                body
            }
        }
    } catch (error) {
        const page = await getPageData('page', '404', params)
        return {
            props: {
                seo: {
                    title: page?.body?.seo?.title,
                    description: page?.body?.seo?.description,
                    noIndex: page?.body?.seo?.no_index
                },
                body: page?.body,
            }
        }
    }
}


export default Home