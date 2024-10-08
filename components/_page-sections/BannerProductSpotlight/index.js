import { useEffect, useState } from 'react'
import cx from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import ATCButton from '@/components/_inputs/Buttons/ATCButton'
import { LinkLookLikeButtonOutline } from '@/components/_inputs/Links'
import { slugify } from '@/lib/helper-functions'

const ProductSpotlight = ({
    product,
    imageInfo,
    productAtcButtonColor,
    secondCtaText,
    secondCtaColor,
    showSecondCta,
    secondCtaHref
}) => {
    const productLink = `/p/${slugify(product.name)}`
    return (
        <div>
            <div className='flex gap-10 items-center'>
                <Link href={productLink} title={product.name}>
                    <div className="relative w-60 h-60">
                        <Image
                            src={imageInfo.productImage}
                            alt={`${product.name} product image`}
                            fill
                            objectFit="contain"
                        />
                    </div>
                </Link>
                <div className='text-center'>
                    {product.discount > 0 &&
                        <div className='text-lg text-altRed font-bold'>{product?.discount * 100}% off</div>
                    }
                    <Link href={productLink} title={product.name} className="text-2xl font-bold text-gray-700">{product.name}</Link>
                    <div 
                        className={cx("text-gray-700", {
                            ['line-through decoration-2 text-xl font-medium']: product.discount > 0,
                            ['text-3xl font-bold']: product.discount === 0
                        })}
                    >${product.price.toFixed(2)}</div>
                    {product.discount > 0 &&
                        <div className='text-3xl text-altOrange font-bold'>{product.discountPrice.toFixed(2)}</div>
                    }
                </div>
            </div>
            <div className={cx('pt-5', {
                ['flex flex-col md:flex-row gap-5 md:gap-10']: showSecondCta,
            })}
            >
                {showSecondCta &&
                    <LinkLookLikeButtonOutline
                        linkHref={secondCtaHref}
                        linkText={secondCtaText}
                        color={secondCtaColor?.brand_color}
                    />
                }
                <ATCButton color={productAtcButtonColor?.brand_color} productSku={product?.sku} product={product?.name} />
            </div>
        </div>
    )
}

const BannerProductSpotlight = ({
    spotlightProductSku,
    productImage,
    productImageWidth,
    productImageHeight,
    bannerImage,
    bannerImageAltText,
    bannerImageWidth,
    bannerImageHeight,
    bannerImagePriorityLoading,
    productAtcButtonColor,
    secondCtaText,
    secondCtaColor,
    showSecondCta,
    secondCtaHref
}) => {
    const [ isLoading, setIsLoading ] = useState(false)
    const [ product, setProduct] = useState(null)

    useEffect(() => {
        const fetchProductData = async () => {
            setIsLoading(true)
            try {
                const { data: response } = await axios.get(`/api/products/${spotlightProductSku.product_sku}`)
                setProduct(response)
            } catch (error) {
                console.error('Error fetching product:', error)
            }
            setIsLoading(false)
        }
        fetchProductData()
    }, [])

    return (
        <section className='py-20 flex flex-col items-center mx-auto gap-5'>
            {!isLoading &&
                <h2 className='font-optiscript'>{product?.name} — {product?.headline}</h2>
            }
            <section className='flex flex-col md:flex-row items-center gap-10'>
                {product && 
                    <ProductSpotlight
                        product={product}
                        imageInfo={{
                            productImage,
                            productImageWidth,
                            productImageHeight
                        }}
                        {...{productAtcButtonColor,
                            secondCtaText,
                            secondCtaColor,
                            showSecondCta,
                            secondCtaHref
                        }}
                    />
                }
                <div>
                    <Image
                        src={bannerImage}
                        alt={bannerImageAltText}
                        width={bannerImageWidth}
                        height={bannerImageHeight}
                        priority={bannerImagePriorityLoading}
                    />
                </div>
            </section>
        </section>
    )
}

export default BannerProductSpotlight