import Image from 'next/image'
import Link from 'next/link'
import { slugify } from '@/lib/helper-functions';
import cx from 'classnames'
import { IoCloseOutline } from "react-icons/io5";

const CartProduct = ({ 
    cartItem
}) => {
    const { product } = cartItem;
    const slugifiedProductName = slugify(product?.name);

    const handleRemoveFromCart = () => {
        // dispatch remove from cart action
    }

    return (
        <div className="bg-white p-5 rounded-lg mb-5 relative">
            <div className="flex items-center gap-5">
                <div className="relative w-32 h-32">
                    <Link
                        href={`/p/${slugifiedProductName}`}
                        title={`${product?.name} product page`}
                    >
                        <Image
                            src={product?.mainImage}
                            alt={product?.name + " product image"}
                            fill
                            objectFit="contain"
                        />
                    </Link>
                </div>
                <div>
                    <Link
                        href={`/p/${slugifiedProductName}`}
                        title={`${product?.name} product page`} 
                        className="font-bold text-xl">{product?.name}</Link>
                    <div className="text-lg text-gray-700">Quantity: {cartItem?.quantity}</div>
                    <div
                        className={cx("flex flex-wrap", {
                            ['flex-col item-baseline']: product.discount === 0,
                            ['items-baseline']: product.discount > 0,
                            ['flex-col']: (product.discount > 0 && cartItem?.quantity > 1),
                        })}
                    >
                        {product.discount > 0 &&
                            <>
                                <div className='text-2xl sm:text-3xl text-altRed font-bold'>${cartItem?.quantity > 1 ? (product.discountPrice.toFixed(2) * cartItem?.quantity) : product.discountPrice.toFixed(2)}</div>
                                <div className="sm:ml-2">
                                    reg. <span className='line-through'>${product?.price.toFixed(2)}</span>
                                </div>
                                {cartItem?.quantity > 1 &&
                                    <div className='text-md sm:text-lg text-gray-700 font-bold'>${product?.discountPrice.toFixed(2)} ea.</div>
                                }
                            </>
                        }
                        {product.discount === 0 &&
                            <>
                                <div className='text-2xl sm:text-3xl text-gray-700 font-bold'>${cartItem?.quantity > 1 ? (product?.price.toFixed(2) * cartItem?.quantity).toFixed(2) : product?.price.toFixed(2)}</div>
                                {cartItem?.quantity > 1 &&
                                    <div className='text-md sm:text-lg text-gray-700 font-bold'>${product?.price.toFixed(2)} ea.</div>
                                }
                            </>
                        }
                    </div>
                    {product?.discount > 0 &&
                        <div className="text-md py-1">
                            <span className="text-altRed font-bold pr-1.5">Sale</span>
                            save ${(product?.price - product?.discountPrice).toFixed(2)} ({(product?.discount * 100).toFixed(0)}% off)
                        </div>
                    }
                </div>
                <div></div>
            </div>
            <button
                className="absolute top-2 right-2 text-gray-700"
                onClick={handleRemoveFromCart}
            >
                <IoCloseOutline size={30} className="stroke-[5]" />
            </button>
        </div>
    )
}

export default CartProduct