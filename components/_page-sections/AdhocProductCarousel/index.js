import { useEffect, useState } from 'react'
import axios from 'axios'
import Preloader from '@/components/Preloader'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ProductCard from '@/components/_products/ProductCard'

const AdhocProductCarousel = () => {
    const getSlidesPerPage = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth >= 1050) {
                return 3; // 3 slides per page on larger screens
            } else if (window.innerWidth >= 640) {
                return 2; // 2 slides per page on medium screens
            } else {
                return 1; // 1 slide per page on small screens
            }
        }
        return 1;
    }

    const [ products, setProducts ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const [ slidesPerPage, setSlidesPerPage ] = useState(getSlidesPerPage())
    const [ startIdx , setStartIdx ] = useState(0)
    const [ paginationEnabled, setPaginationEnabled ] = useState(enablePaginationControls())

    const enablePaginationControls = () => {
        if (products.length < 2) {
            return false;
        } else if ((products.length === 2) && (window.innerWidth >= 640)) {
            return false
        } else if ((products.length === 2) && (window.innerWidth < 639)) {
            return true
        } else if ((products.length === 3) && (window.innerWidth >= 1050)) {
            return false
        } else if ((products.length === 3) && (window.innerWidth < 1050)) {
            return true
        } else {
            return true
        }
    }

    useEffect(() => {
        setSlidesPerPage(getSlidesPerPage());
        setStartIdx(0);
        setPaginationEnabled(enablePaginationControls())
    }, [])

    useEffect(() => {
        const fetchProductData = async () => {
            setIsLoading(true)
            try{
                const { data: response } = await axios.get('/api/' + dataEndpoint)
                setProducts(response)
            } catch (error) {
                console.error('Error fetching products:', error)
            }
            setIsLoading(false)
        }
        fetchProductData()
    }, [])

    useEffect(() => {
        const adjustSlidesPerPage = () => {
            setSlidesPerPage(getSlidesPerPage());
            setPaginationEnabled(enablePaginationControls())
        }

        if (window) {
            window.addEventListener('resize', adjustSlidesPerPage)
            window.addEventListener('orientationchange', adjustSlidesPerPage)
        }
        return () => {
            window.removeEventListener('resize', adjustSlidesPerPage)
            window.removeEventListener('orientationchange', adjustSlidesPerPage)
        }
    }, [])

    const nextSlide = () => {
        setStartIdx((prevStartIdx) => {
            const newStartIdx = prevStartIdx + 1;
            return newStartIdx >= products.length ? 0 : newStartIdx;
        });
    }

    const prevSlide = () => {
        setStartIdx((prevStartIdx) => {
            const newStartIdx = prevStartIdx - 1;
            return newStartIdx < 0 ? products.length - 1 : newStartIdx;
        });
    }

    return (
        <section className='relative pt-10 md:pt-20'>
            <div className='sr-only'>{carouselTitle}</div>
            <h2
                className='font-optiscript'
            >{carouselTitle}</h2>
            <div className='pt-5 flex gap-10'>
                <button onClick={prevSlide} className="z-10 bg-gray-700 text-white p-2 rounded-full">
                    <FaArrowLeft size={30} />
                </button>
                <button onClick={nextSlide} className="z-10 bg-gray-700 text-white p-2 rounded-full">
                    <FaArrowRight size={30} />
                </button>
            </div>
            <section className='pt-5'>
                {isLoading && <Preloader />}
                {((products && !isLoading) && products.length > 0) &&
                    <section className='flex gap-5 justify-center'>
                        {Array(slidesPerPage).fill().map((_, i) => {
                            const productIdx = (startIdx + i) % products.length;
                            return <ProductCard key={products[productIdx].sku + productIdx} product={products[productIdx]} />;
                        })}
                    </section>
                }
            </section>
        </section>
    )
}

export default AdhocProductCarousel