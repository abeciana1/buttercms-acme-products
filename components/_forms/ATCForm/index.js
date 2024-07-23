import { useState } from 'react'
import {
    FaMinus,
    FaPlus
} from "react-icons/fa";
import cx from 'classnames'
import ATCButton from '@/components/_inputs/Buttons/ATCButton';

const ATCForm = ({
    productSku
}) => {
    const [quantity, setQuantity] = useState(1)

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value))
    }

    const handleDecreaseQuantity = (e) => {
        e.preventDefault()
        setQuantity(quantity - 1)
    }

    const handleIncreaseQuantity = (e) => {
        e.preventDefault()
        setQuantity(quantity + 1)
    }

    return (
        <>
            <form className="flex flex-col gap-1 py-3">
                <label>Quantity:</label>
                <div className="flex flex-row gap-5">
                    <button
                        disabled={quantity === 1}
                        onClick={handleDecreaseQuantity}
                        className={cx("", {
                            ['cursor-not-allowed']: quantity === 1,
                            ['cursor-pointer']: quantity > 1
                        })}
                    >
                        <FaMinus size={25} />
                    </button>
                        <input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="text-lg text-center w-14 border-2 border-black rounded-md"
                        />
                    <button
                        onClick={handleIncreaseQuantity}
                        className="cursor-pointer"
                    >
                        <FaPlus size={25} />
                    </button>
                </div>
            </form>
            <div className="max-w-72">
                <ATCButton
                    quantity={quantity}
                    productSku={productSku}
                />
            </div>
        </>
    )
}

export default ATCForm