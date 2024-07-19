import Image from 'next/image'

const ProductCard = ({ product }) => {
    return (
        <div className='max-w-sm rounded overflow-hidden shadow-lg'>
            <div className='relative h-48'>
                <Image
                    src={product.mainImage}
                    alt={product.sku + " - " + product.name}
                    layout="fill"
                    objectFit="contain"
                    className="bg-white"
                />
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.name}</div>
                <p className="text-gray-700 text-base">{product.description}</p>
                <p className="text-gray-900 font-bold text-lg mt-2">${product.price.toFixed(2)}</p>
            </div>
        </div>
    )
}

export default ProductCard