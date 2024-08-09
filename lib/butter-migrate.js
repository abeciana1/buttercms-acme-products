require('dotenv').config();
const butter = require('buttercms')(process.env.NEXT_PUBLIC_BUTTER_CMS_API_KEY)
const { PrismaClient } = require('@prisma/client');
const axios = require('axios');

const prisma = new PrismaClient();

const slugify = (text) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
};

let products;
const getProductDBData = async () => {
    let prods = await prisma.product.findMany()
    products = prods
}

const mapProductsToPages = async () => {
    await products?.map(async (product) => {
        let slugifiedProdName = slugify(product.name)
        let page = await fetch(`https://api.buttercms.com/v2/pages/product_detail/${slugifiedProdName}/?auth_token=${process.env.NEXT_PUBLIC_BUTTER_CMS_API_KEY}`)
        if (page.status === 404) {
            const payload = {
                "name": product.name,
                "slug": slugifiedProdName,
                "page_type": "product_detail",
                "fields": {
                    "product_name": product.name,
                    "product_sku": product.sku,
                    "seo": {
                        "title": `ACME | ${product.name}`,
                        "description": product.seoDesc,
                        "json_ld_schema": "product"
                    },
                    "headline": product.headline,
                    "description": product.description,
                    "additional_description": product.additionalDescription,
                    "warning": product.warning
                }
            }
            const headers = {
                "Authorization": `Token ${process.env.NEXT_PUBLIC_BUTTER_WRITE_API_KEY}`,
                "Content-Type": "application/json",
            }
            fetch('https://api.buttercms.com/v2/pages', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload),
            })
            .catch(err => console.log("Request Failed", err.data));

        }
    })
}

const main = async () => {
    // await getProductPages()
    await getProductDBData()
    await mapProductsToPages()
}

main()