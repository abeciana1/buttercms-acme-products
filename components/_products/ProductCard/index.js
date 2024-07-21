import Image from 'next/image'
import ATCButton from '@/components/_inputs/Buttons/ATCButton'

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white flex items-center gap-5 p-5 rounded-lg shadow-md max-w-96">
            <div className="relative h-20 w-20 md:h-32 md:w-32">
                <Image
                    src={product.mainImage}
                    alt={product.name}
                    fill
                    objectFit="contain"
                />
            </div>
            <div >
                <div className="text-lg font-bold text-gray-900">{product.name}</div>
                <div className="text-gray-600 text-sm">{product.price}</div>
                <ATCButton product={product} />
            </div>
        </div>
    )
}

export default ProductCard