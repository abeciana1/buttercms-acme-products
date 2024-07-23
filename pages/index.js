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
                // canonical="" blank for now
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

export const getStaticProps = async () => {
    let { seo, body } = await getPageData('page','homepage')
    return {
        props: {
            seo,
            body
        }
    }
}


export default Home