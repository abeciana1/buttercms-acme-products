import prisma from '@/lib/prisma'

const handler = async (req, res) => {
    if (req.method === 'GET') {
        const products = await prisma.product.findMany({
            where: {
                category: {
                    slug: {
                        equals: 'home-goods'
                    }
                }
            },
            select: {
                name: true,
                discount: true,
                price: true,
                mainImage: true,
                discountPrice: true,
                sku: true
            }
        })
        res.status(200).json(products)
    }
}

export default handler