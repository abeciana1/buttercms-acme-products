import prisma from '@/lib/prisma'
import { runMiddleware } from '@/middleware/corsMiddleware'

const handler = async (req, res) => {
    await runMiddleware(req, res)
    if (req.method === 'GET') {
        let category = req.query.slug
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
            res.status(200).json(products?.products)
        }
    }
}

export default handler