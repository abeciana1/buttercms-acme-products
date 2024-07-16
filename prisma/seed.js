const seedData = require('./product-seed-data.json')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const main = async () => {
    // console.log('creating prod categories');
    // const gadgetCat = await prisma.category.create({
    //     data: { name: "Gadget", slug: "gadget" }
    // })
    // const healthCat = await prisma.category.create({
    //     data: { name: "Health & Wellness", slug: "health-wellness" }
    // })
    // const transportationCat = await prisma.category.create({
    //     data: { name: "Transportation", slug: "transportation" }
    // })
    // const homeCat = await prisma.category.create({
    //     data: { name: "Home Goods", slug: "home-goods" }
    // })

    // console.log('creating mock user')
    // const mockUser = await prisma.user.create({
    //     data: {
    //         email: "acme@looney.com",
    //         firstName: "Wile",
    //         lastName: "Coyote"
    //     }
    // })

    // console.log('creating products')
    // seedData.map(async (product) => {
    //     let prod = await prisma.product.create({
    //         data: {
    //             sku: product.sku,
    //             name: product.name,
    //             headline: product.headline,
    //             description: product.description,
    //             additionalDescription: product.additionalDescription,
    //             warning: product.warning,
    //             price: parseFloat(product.price.split('$')[1]),
    //             shippingPrice: parseFloat(product.shippingPrice.split('$')[1]),
    //             discount: parseFloat(product.discount),
    //             discountPrice: parseFloat(product.discountPrice.split('$')[1]),
    //             category: {
    //                 connectOrCreate: {
    //                     where: {
    //                         id: product.categoryId
    //                     },
    //                     create: {
    //                         name: 'unknown_category',
    //                         slug: 'unknown_category'
    //                     }
    //                 }
    //             }
    //         }
    //     })
    //     console.log('prod', prod)
    // })
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })