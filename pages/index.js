import { getPageData } from '@/lib/api'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import ComponentRenderer from '@/components/ComponentRenderer'
import { PageLayoutWrapper } from '@/components/_layouts'

const Home = ({ seo, body }) => {
    const router = useRouter()
    console.log(router)
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
    let { seo, body } = await getPageData('homepage')
    return {
        props: {
            seo,
            body
        }
    }
}


export default Home