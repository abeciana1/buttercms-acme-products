import { PageLayoutWrapper } from '@/components/_layouts'
import { getPageData }  from '@/lib/api'
import axios from 'axios'
import { useEffect } from 'react'

const CatchAllPage = (props) => {
    console.log('CatchAllPage', props)

    // useEffect(() => {
    //     const fetchProds = async () => {
    //         await axios.get('/api/categories/transportation')
    //         .then(res => console.log('response', res))
    //     }
    //     fetchProds()
    // }, [])
    return (
        <PageLayoutWrapper>
            <div>catch all</div>
        </PageLayoutWrapper>
    )
}

export const getServerSideProps = async (context) => {
    let page = await getPageData('category_page', context?.query?.category);
    const response = await axios.get('http://localhost:3000/api/categories/' + context?.query?.category)
    return {
        props: {
            seo: {
                title: page?.body?.seo?.title || '',
                description: page?.body?.seo?.description || '',
                jsonLDSchema: page?.body?.seo?.json_ld_schema || '',
            },
            body: {
                body: page?.body?.body,
                categoryName: page?.body?.category?.category_name,
                products: response.data
            }
        }
    };
};

export default CatchAllPage