import { getPageData } from '@/lib/api'
import { NextSeo } from 'next-seo'
import ComponentRenderer from '@/components/ComponentRenderer'
import { PageLayoutWrapper } from '@/components/_layouts'

const DynamicPage = (props) => {
    return (
        <>
            <NextSeo
                title={props?.seo?.title}
                description={props?.seo?.description}
                noindex={props?.seo?.noindex}
                canonical={typeof window!== 'undefined'? window.location.href : ''}
            />
            <PageLayoutWrapper>
                {props?.body?.body?.map(({ type, fields: sectionData}, index) => {
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

export default DynamicPage

export const getServerSideProps = async (context) => {
    const params = {
        'preview': context?.query?.preview === '1' ? 1 : 0,
        'levels': 3
    }
    try {
        let path = context?.query?.slug
        const page = await getPageData('page', path, params)
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