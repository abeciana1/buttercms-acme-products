import { useState, useEffect, Suspense, lazy } from 'react'
import Cookies from 'js-cookie'
import { getPersonalizedProducts } from '@/lib/api'

const AdhocProductCarousel = lazy(() => import('@/components/_page-sections/AdhocProductCarousel'))

const PersonalizedCarousel = ({ heading, persona }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const { cookie_target } = persona

    useEffect(() => {
        const fetchPersonalizedProducts = async () => {
            try {
                const response = await getPersonalizedProducts(cookie_target)
                console.log('Fetched products:', response) // Debug log
                setProducts(response)
            } catch (error) {
                console.error('Error fetching personalized products:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchPersonalizedProducts()
    }, [cookie_target])

    console.log('11 Products state:', products) // Debug log
    console.log('11 Loading state:', loading) // Debug log

    return (
        <>
            {!!Cookies.get(cookie_target) ? (
                <Suspense fallback={<div>Loading carousel...</div>}>
                    <AdhocProductCarousel
                        productCarouseTitle={heading}
                        productList={products}
                    />
                </Suspense>
            ) : (
                <></>
            )}
        </>
    )
}

export default PersonalizedCarousel