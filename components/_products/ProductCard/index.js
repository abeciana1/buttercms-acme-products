import Image from 'next/image'
import ATCButton from '@/components/_inputs/Buttons/ATCButton'
import cx from 'classnames'
import Link from 'next/link'
import { slugify } from '@/lib/helper-functions'

const ProductCard = ({ product }) => {
    const productLink = `p/${slugify(product.name)}`
    return (
        <div className='bg-white rounded-lg shadow-md max-w-72 w-full sm:max-w-96 text-center p-5 flex items-end h-44 sm:h-48 relative'>
            <div className="flex items-center sm:items-end gap-2.5">
                <Link href={productLink} title={product.name}>
                    <div className="relative h-32 w-24 sm:h-36 md:w-36">
                        <Image
                            src={product?.mainImage}
                            alt={product.name + " product image"}
                            fill
                            objectFit="contain"
                            className='w-auto'
                        />
                    </div>
                </Link>
                <div className='flex flex-col justify-between items-center flex-grow'>
                    {product.discount > 0 &&
                        <div className='text-lg text-altRed font-bold'>{(product?.discount * 100).toFixed(0)}% off</div>
                    }
                    <Link href={productLink} title={product.name} className="product-name text-md sm:text-lg text-black font-bold">
                        {product.name}
                    </Link>
                    <div className='flex items-center justify-center gap-3'>
                        <div 
                            className={cx("text-black", {
                                ['line-through decoration-2 text-lg sm:text-xl']: product.discount > 0,
                                ['text-3xl font-bold']: product.discount === 0
                            })}
                        >${product.price.toFixed(2)}</div>
                        {product.discount > 0 &&
                            <div className='text-lg sm:text-3xl text-altOrange font-bold'>${product.discountPrice.toFixed(2)}</div>
                        }
                    </div>
                    <ATCButton product={product} />
                </div>
            </div>
        </div>
    )
}

export default ProductCard