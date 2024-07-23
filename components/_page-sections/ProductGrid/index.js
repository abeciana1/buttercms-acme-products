import ProductCard from '@/components/_products/ProductCard'

const ProductGrid = ({
    products
}) => {
    return (
        <section className="flex flex-wrap gap-5 justify-center">
            {products.map(product => (
                <ProductCard key={product.sku} product={product} />
            ))}
        </section>
    )
}

export default ProductGrid