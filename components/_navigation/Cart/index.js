import Link from 'next/link'
import { FaCartShopping } from "react-icons/fa6";
import { useAppSelector } from '@/redux/hooks'

const Cart = ({
    size
}) => {
    const cartItemsCount = useAppSelector((state) => state.cart.cartItemsCount)
    return(
        <div className='relative'>
            <Link title='Cart page' href='/cart'>
                <FaCartShopping size={size} />
            </Link>
            {cartItemsCount > 0 &&
                <div
                    className='absolute -top-2 -right-2 bg-altRed text-white text-md rounded-full leading-none py-0.5 px-1'
                >{cartItemsCount}</div>
            }
        </div>
    )
}

export default Cart