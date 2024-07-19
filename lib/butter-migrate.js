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

const getProductPages = async () => {
    let params = {
        page: 2,
        levels: 1
    }
    let allPages = await butter.page.retrieve('product_detail', 'test-123')
    console.log('PAGES', allPages.data)
}

const mapProductsToPages = () => {
    products?.map(async (product) => {
        let slugifiedProdName = slugify(product.name)
        console.log('slugifiedProdName', slugifiedProdName)
        let page = await butter.page.retrieve('product_detail', slugifiedProdName)
        if (page?.data?.detail === 'Not found.') {
            const payload = {
                "slug": slugifiedProdName,
                "name": product.name,
                "page_type": "product_detail",
                "fields": {
                    "product_name": product.name,
                    "product_sku": product.sku,
                    "seo": {
                        "title": `ACME | ${product.name}`,
                        "description": product.seoDesc
                    }
                }
            }
            const headers = {
                "Authorization": process.env.NEXT_PUBLIC_BUTTER_CMS_API_KEY,
                "Content-Type": "application/json",
            }
            axios.post('https://api.buttercms.com/v2/pages', payload, headers)
            .then(res => console.log('BUTTERRESPONSE', res))
            .catch(err => console.log("Request Failed", err));
        }
    })
}

const main = async () => {
    await getProductPages()
    await getProductDBData()
    mapProductsToPages()
}

(async () => {
    try {
        await main();
    } catch (error) {
        console.error('Error running helper function:', error);
    }
})();