import { useMemo } from 'react'
import { PageLayoutWrapper } from '@/components/_layouts'
import { getPageData }  from '@/lib/api'
import { NextSeo, ProductJsonLd } from 'next-seo'
import axios from 'axios'

// {
//     "product_name": "Mini-Rocket",
//     "product_sku": "AMR2200",
//     "seo": {
//         "title": "ACME | Mini-Rocket",
//         "description": "Launch into fun with the ACME Mini-Rocket. Compact, powerful, and perfect for hobbies and pranks. ACME: Innovating excitement and joy.",
//         "json_ld_schema": "product"
//     },
//     "product_image": [
//         {
//             "image": "https://cdn.buttercms.com/xnOsGBTxQYm74xb7PySW",
//             "image_width": 1200,
//             "image_height": 534
//         }
//     ],
//     "category": {
//         "meta": {
//             "id": 763121
//         },
//         "category_name": "Transportation",
//         "category_slug": "c?category=transportation"
//     },
//     "headline": "This is the future of Transportation",
//     "description": "This single-seat transport (SST) will get you there in record time, wherever there happens to be. Hop on, find a sturdy leather belt to hold you in place, and \"assume the position\"! Shear years off your travel time and let everyone know you've arrived with the signature \"BOOM\" as you cross the sound barrier!",
//     "additional_description": "",
//     "warning": "Safety harness sold separately."
// }

const CatchAll = ({
    seo,
    body,
    product
}) => {
    console.log('body', body?.body)
    console.log('product', product);
    const productImages = useMemo(() => {
        body?.product_images?.map((prodImage) => {
            return prodImage.image
        })
    }, [])

    return (
        <>
            <NextSeo
                title={seo?.title}
                description={seo?.description}
            />
            <ProductJsonLd
                productName={body?.product_name}
                images={productImages}
                description={seo?.description}
                brand="ACME"
                manufacturerName="ACME"
                manufacturerLogo="https://cdn.buttercms.com/2QarXXoQ8eIiLEYOD2z3"
                disambiguatingDescription={body?.headline}
                mpn={body?.product_sku}
                offers={[
                    {
                        price: (product?.discount > 0) ? product?.discountPrice : product?.price,
                        availability: 'https://schema.org/InStock',
                        priceCurrency: 'USD',
                        itemCondition: 'https://schema.org/NewCondition',
                        // url: 'https://www.example.com/executive-anvil',
                    }
                ]}
            />
            <PageLayoutWrapper>

            </PageLayoutWrapper>
        </>
    )
}

export default CatchAll

export const getServerSideProps = async (context) => {
    let page = await getPageData('product_detail', context?.query?.slug);
    let product = await axios.get('http://localhost:3000/api/products/' + page?.body?.product_sku)
    return {
        props: {
            seo: {
                title: page?.body?.seo?.title || '',
                description: page?.body?.seo?.description || '',
                jsonLDSchema: page?.body?.seo?.json_ld_schema || '',
            },
            body: {
                body: page?.body
            },
            product: product.data
        }
    };
};