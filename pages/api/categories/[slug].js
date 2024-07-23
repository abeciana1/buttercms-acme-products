import prisma from '@/lib/prisma'

const handler = async (req, res) => {
    if (req.method === 'GET') {
        let category = req.query.slug
        console.log('!!category', category)
        if (category === 'all') {
            const products = await prisma.product.findMany()
            res.status(200).json(products)
        } else {
            const products = await prisma.category.findFirst({
                where: {
                    slug: {
                        equals: category,
                        mode: 'insensitive',
                    }
                },
                include: {
                    products: {
                        select: {
                            name: true,
                            discount: true,
                            price: true,
                            mainImage: true,
                            discountPrice: true,
                            sku: true
                        }
                    }
                }
            })
            console.log('products', products)
            res.status(200).json(products?.products)
        }
    }
}

export default handler