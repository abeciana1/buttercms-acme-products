import prisma from '@/lib/prisma'

const handler = async (req, res) => {
    if (req.method === 'GET') {
        const productsCount = await prisma.product.count();
        const skip = Math.floor(Math.random() * productsCount);
        const products = await prisma.product.findMany({
            take: 3,
            skip: skip
        })
        res.status(200).json(products)
    }
}

export default handler