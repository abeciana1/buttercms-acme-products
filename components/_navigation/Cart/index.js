import Link from 'next/link'
import { FaCartShopping } from "react-icons/fa6";

const Cart = ({
    cartItems = 0,
    cartTotal = 0
}) => {
    return(
        <div className='relative'>
            <Link title='Cart page' href='/cart'>
                <FaCartShopping size={35} />
            </Link>
            <div
                className='absolute -top-2 -right-2 bg-altRed text-white text-md rounded-full leading-none py-0.5 px-1'
            >{cartItems}</div>
        </div>
    )
}

export default Cart