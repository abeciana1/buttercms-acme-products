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
    try {
        let path = context?.query?.slug
        const page = await getPageData('page', path)
        return {
            props: {
                seo: {
                    title: page?.body?.seo?.title,
                    description: page?.body?.seo?.description,
                },
                body: page?.body,
            }
        }
    } catch (error) {
        const page = await getPageData('page', '404')
        return {
            props: {
                seo: {
                    title: page?.body?.seo?.title,
                    description: page?.body?.seo?.description,
                },
                body: page?.body,
            }
        }
    }
}