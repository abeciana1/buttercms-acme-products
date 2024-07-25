import { useMemo, useState } from 'react'
import { PageLayoutWrapper } from '@/components/_layouts'
import { getPageData }  from '@/lib/api'
import { NextSeo, ProductJsonLd } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import useResponsiveness from '@/lib/hooks/useResponsiveness'
import Breadcrumbs from '@/components/_products/Breadcrumbs'
import cx from 'classnames'
import { GoAlertFill } from "react-icons/go";
import ATCForm from '@/components/_forms/ATCForm'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Accordion from '@/components/_page-sections/Accordion'
import ProductCarousel from '@/components/_page-sections/ProductCarousel'
import { slugify } from '@/lib/helper-functions'

const CatchAllProductPage = ({
    seo,
    body,
    product
}) => {
    const { isDesktop, isTablet, isMobile } = useResponsiveness() || {}
    const [ startIdx , setStartIdx ] = useState(0)
    const [ endIdx, setEndIdx ] = useState(1)
    const imageLength = body?.body?.product_image?.length
    const slugifiedCategoryName = slugify(body?.body?.category?.category_name)
    const productImages = useMemo(() => {
        body?.product_images?.map((prodImage) => {
            return prodImage.image
        })
    }, [body?.product_images])

    const nextSlide = () => {
        setStartIdx((prevStartIdx) => {
            const newStartIdx = prevStartIdx + 1;
            return newStartIdx >= imageLength ? 0 : newStartIdx;
        });
        setEndIdx((prevEndIdx) => {
            const newEndIdx = prevEndIdx + 1;
            return newEndIdx > imageLength ? 1 : newEndIdx;
        });
    }

    const prevSlide = () => {
        setStartIdx((prevStartIdx) => {
            const newStartIdx = prevStartIdx - 1;
            return newStartIdx < 0 ? Math.max(0, imageLength - 1) : newStartIdx;
        });
        setEndIdx((prevEndIdx) => {
            const newEndIdx = prevEndIdx - 1;
            return newEndIdx < 1 ? imageLength : newEndIdx;
        });
    }

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
                        price: `$${(product?.discount > 0) ? product?.discountPrice : product?.price}`,
                        availability: 'https://schema.org/InStock',
                        priceCurrency: 'USD',
                        itemCondition: 'https://schema.org/NewCondition',
                        // url: 'https://www.example.com/executive-anvil',
                    }
                ]}
            />
            <PageLayoutWrapper>
                <Breadcrumbs
                    categoryName={body?.body?.category?.category_name}
                    categorySlug={body?.body?.category?.category_slug}
                    productName={body?.body?.product_name}
                />
                <section className="pt-10 flex flex-col lg:flex-row justify-center relative lg:divide-x-2 lg:divide-gray-700">
                    <section className="md:pr-16 lg:pr-20">
                        {isDesktop &&
                            body?.body?.product_image?.slice(startIdx, endIdx)?.map((image, index) => {
                                return (
                                    <div key={body?.body?.product_name + index + 'key'} className="relative w-96 h-96">
                                        <Image
                                            key={body?.body?.product_name + index}
                                            src={image.image}
                                            fill
                                            objectFit="contain"
                                            alt={`${body?.body?.product_name} product image ${index + 1}`}
                                            className="w-auto"
                                            priority
                                        />
                                    </div>
                                )
                            })}
                        {isDesktop && imageLength > 1 &&
                            <div className='pt-5 flex gap-10 justify-center'>
                                <button onClick={prevSlide} className="z-10 bg-gray-700 text-white p-2 rounded-full">
                                    <FaArrowLeft size={30} />
                                </button>
                                <button onClick={nextSlide} className="z-10 bg-gray-700 text-white p-2 rounded-full">
                                    <FaArrowRight size={30} />
                                </button>
                            </div>
                        }
                    </section>
                    <section className=" lg:pl-20">
                        <Link
                            href={'/' + body?.body?.category?.category_slug}
                            title={`Shop all ${body?.body?.category?.category_name} products`}
                            className="underline underline-offset-2 decoration-2"
                        >Shop all {body?.body?.category?.category_name}s</Link>
                        <h1>{body?.body?.product_name}</h1>
                        {(isTablet || isMobile) &&
                            body?.body?.product_image?.slice(startIdx, endIdx)?.map((image, index) => {
                                return (
                                    <div key={body?.body?.product_name + index + 'key'} className="relative w-64 h-64 md:w-80 md:h-80 mx-auto my-5">
                                        <Image
                                            key={body?.body?.product_name + index}
                                            src={image.image}
                                            fill
                                            objectFit="contain"
                                            alt={`${body?.body?.product_name} product image ${index + 1}`}
                                            className="w-auto"
                                            priority
                                        />
                                    </div>
                                )
                            })
                        }
                        {(isTablet || isMobile) && imageLength > 1 &&
                            <div className='pt-5 flex gap-10 justify-center'>
                                <button onClick={prevSlide} className="z-10 bg-gray-700 text-white p-2 rounded-full">
                                    <FaArrowLeft size={30} />
                                </button>
                                <button onClick={nextSlide} className="z-10 bg-gray-700 text-white p-2 rounded-full">
                                    <FaArrowRight size={30} />
                                </button>
                            </div>
                        }
                        <div className={cx("relative flex", {
                            ['flex-col']: (isMobile || isDesktop),
                            ['flex-row gap-5 pr10']: (isTablet),
                        })}>
                            <div>
                                <div
                                    className={cx("flex", {
                                        ['items-baseline']: product.discount > 0,
                                    })}
                                >
                                    {product.discount > 0 &&
                                        <>
                                            <div className='text-2xl sm:text-3xl text-altRed font-bold'>${product.discountPrice.toFixed(2)}</div>
                                            <div>
                                                reg. <span className='line-through'>${product?.price.toFixed(2)}</span>
                                            </div>
                                        </>
                                    }
                                    {product.discount === 0 &&
                                        <div className='text-2xl sm:text-3xl text-bg-gray-700 font-bold'>${product?.price.toFixed(2)}</div>
                                    }
                                </div>
                                {product?.discount > 0 &&
                                    <div className="text-md py-1">
                                        <span className="text-altRed font-bold pr-1.5">Sale</span>
                                        save ${(product?.price - product?.discountPrice).toFixed(2)} ({(product?.discount * 100).toFixed(0)}% off)
                                    </div>
                                }
                                <div className="text-lg">Estimated shipping cost: ${product?.shippingPrice.toFixed(2)}</div>
                                <div className="font-bold text-lg">Ship to 00000</div>
                                {body?.body?.warning &&
                                    <div className="flex items-center py-3">
                                        <div className="text-altRed pr-1">
                                            <GoAlertFill size={20} />
                                        </div>
                                        <div>
                                            <span className="font-bold">Warning: </span>
                                            {body?.body?.warning}
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="">
                                <ATCForm productSku={body?.body?.product_sku} productName={product?.name} />
                            </div>
                        </div>
                    </section>
                </section>
                <section className="md:py-10 lg:py-20">
                    <h2 className="font-optiscript text-center">{body?.body?.headline}</h2>
                    <h2 className="sr-only">{body?.body?.headline}</h2>
                    <Accordion
                        title="Description"
                        content={body?.body?.description}
                    />
                    {body?.body?.additional_description &&
                        <Accordion
                            title="Additional Information"
                            content={body?.body?.additional_description}
                        />
                    }
                    {body?.body?.warning &&
                        <div className="flex items-center justify-center py-3 text-2xl">
                            <div className="text-altRed pr-1">
                                <GoAlertFill size={30} />
                            </div>
                            <div>
                                <span className="font-bold">Warning: </span>
                                {body?.body?.warning}
                            </div>
                        </div>
                    }
                    <ProductCarousel
                        carouselTitle={body?.body?.product_carousel_title}
                        dataEndpoint={`${slugifiedCategoryName}-products`}
                    />
                </section>
            </PageLayoutWrapper>
        </>
    )
}

export default CatchAllProductPage

export const getServerSideProps = async (context) => {
    let page = await getPageData('product_detail', context?.query?.slug);
    let product = await axios.get('https://buttercms-acme-products-uevi.vercel.app/api/products/' + page?.body?.product_sku)
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