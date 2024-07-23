import { useEffect, useState } from 'react'
import axios from 'axios'
import Preloader from '@/components/Preloader'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ProductCard from '@/components/_products/ProductCard'

const ProductCarousel = ({
    carouselTitle,
    dataEndpoint
}) => {
    const [ products, setProducts ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const [ slidesPerPage, setSlidesPerPage ] = useState(getSlidesPerPage())
    const [ startIdx , setStartIdx ] = useState(0)
    const [ endIdx, setEndIdx ] = useState(slidesPerPage)

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

    useEffect(() => {
        setSlidesPerPage(getSlidesPerPage());
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
            setStartIdx(0);
            setEndIdx(getSlidesPerPage());
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
            const newStartIdx = prevStartIdx + slidesPerPage;
            return newStartIdx >= products.length ? 0 : newStartIdx;
        });
        setEndIdx((prevEndIdx) => {
            const newEndIdx = prevEndIdx + slidesPerPage;
            return newEndIdx > products.length ? slidesPerPage : newEndIdx;
        });
    }

    const prevSlide = () => {
        setStartIdx((prevStartIdx) => {
            const newStartIdx = prevStartIdx - slidesPerPage;
            return newStartIdx < 0 ? Math.max(0, products.length - slidesPerPage) : newStartIdx;
        });
        setEndIdx((prevEndIdx) => {
            const newEndIdx = prevEndIdx - slidesPerPage;
            return newEndIdx < slidesPerPage ? products.length : newEndIdx;
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
            {(!isLoading && products.length > 0) &&
                <section className='flex gap-5 justify-center'>
                    {products.slice(startIdx, endIdx).map((product, index) => {
                    return (
                        <ProductCard key={product.sku + index} product={product} />
                    )})}
                </section>
            }
        </section>
    </section>
    );
}


export default ProductCarousel