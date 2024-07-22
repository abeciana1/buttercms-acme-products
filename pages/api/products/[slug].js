import prisma from '@/lib/prisma'

const handler = async (req, res) => {
    if (req.method === 'GET') {
        const product = await prisma.product.findUnique({
            where: {
                sku: req.query.slug,
            },
            select: {
                name: true,
                price: true,
                discount: true,
                discountPrice: true,
                headline: true,
                mainImage: true
            }
        })
        res.status(200).json(product)
    }
}

export default handler