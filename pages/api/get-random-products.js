import prisma from '@/lib/prisma'

const handler = async (req, res) => {
    if (req.method === 'GET') {
        const products = await prisma.product.findMany({
            take: 9,
        })
        res.status(200).json(products)
    }
}

export default handler