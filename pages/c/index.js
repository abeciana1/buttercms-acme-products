import { PageLayoutWrapper } from '@/components/_layouts'
import { getPageData }  from '@/lib/api'
import axios from 'axios'
import { NextSeo } from 'next-seo'
import ComponentRenderer from '@/components/ComponentRenderer'

const CatchAllCategoryPage = ({
    seo,
    body
}) => {
    return (
        <>
            <NextSeo
                title={seo?.title}
                description={seo?.description}
                // canonical="" blank for now
            />
            <PageLayoutWrapper>
                <section className="py-10">
                    <h1 className="font-optiscript text-center">{seo?.title}</h1>
                    <div className="text-2xl text-center">{seo?.description}</div>
                </section>
                {body?.body?.map(({ type, fields: sectionData}, index) => {
                    return <ComponentRenderer
                        key={type + index}
                        type={type}
                        sectionData={sectionData}
                        products={body?.products}
                    />
                })}
            </PageLayoutWrapper>
        </>
    )
}

export const getServerSideProps = async (context) => {
    let page = await getPageData('category_page', context?.query?.category);
    const response = await axios.get('https://buttercms-acme-products-uevi.vercel.app/api/categories/' + context?.query?.category)
    return {
        props: {
            seo: {
                title: page?.body?.seo?.title || '',
                description: page?.body?.seo?.description || '',
                jsonLDSchema: page?.body?.seo?.json_ld_schema || '',
            },
            body: {
                body: page?.body?.body,
                products: response.data
            }
        }
    };
};

export default CatchAllCategoryPage