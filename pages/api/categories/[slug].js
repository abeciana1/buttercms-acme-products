import prisma from '@/lib/prisma'

const handler = async (req, res) => {
    if (req.method === 'GET') {
        let category = req.query.slug
        const products = await prisma.category.findFirst({
            where: {
                name: {
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
        res.status(200).json(products)
    }
}

export default handler