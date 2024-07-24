import cx from 'classnames'
import { useAppDispatch } from '@/redux/hooks'
import { addProductToCart } from '@/redux/actions/cartAction'

const ATCButton = ({
    color = 'Red',
    quantity = 1,
    productSku,
    productName
}) => {
    const dispatch = useAppDispatch()

    const atcClickHandler = (e) => {
        e.preventDefault();
        dispatch(addProductToCart(quantity, productSku))
    }

    return (
        <button
            onClick={atcClickHandler}
            className={cx('w-full h-10 min-w-32 sm:min-w-44 text-lg rounded-md py-1', {
                ['text-white bg-altRed ']: color === 'Red',
                ['text-white bg-altOrange']: color === 'Orange',
            })}
        >
            Add to cart
        </button>
    )
}

export default ATCButton