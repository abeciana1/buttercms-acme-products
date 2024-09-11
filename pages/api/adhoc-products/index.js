import prisma from '@/lib/prisma'
import { runMiddleware } from '@/middleware/corsMiddleware'

const handler = async (req, res) => {
    await runMiddleware(req, res)
    if (req.method === 'POST') {
        let cleanedProductList = req.body.data?.map(product => product.product_sku)
        const products = await prisma.product.findMany({
            where: {
                sku: {
                    in: cleanedProductList
                }
            },
            select: {
                sku:true,
                name: true,
                price: true,
                discount: true,
                discountPrice: true,
                headline: true,
                mainImage: true,
                shippingPrice: true
            }
        })
        res.status(200).json(products)
    }
}

export default handler