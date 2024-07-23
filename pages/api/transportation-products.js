import prisma from '@/lib/prisma'

const handler = async (req, res) => {
    if (req.method === 'GET') {
        const products = await prisma.category.findFirst({
            where: {
                slug: {
                    equals: 'transportation'
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

export default handler