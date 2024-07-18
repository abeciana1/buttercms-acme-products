import { useEffect, useState } from 'react'
import axios from 'axios'
import Preloader from '@/components/Preloader'
import { Carousel } from 'react-responsive-carousel';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const getSlidePercentage = () => {
    if (window.innerWidth >= 1024) {
      return 33.33; // 3 slides per page on larger screens
    } else if (window.innerWidth >= 768) {
      return 50; // 2 slides per page on medium screens
    } else {
      return 100; // 1 slide per page on small screens
    }
};

const ProductCarousel = ({
    carouselTitle,
    children
}) => {
    const [ products, setProducts ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)

    useEffect(() => {
        const fetchProductData = async () => {
            setIsLoading(true)
            try{
                const { data: response } = await axios.get('/api/get-random-products')
                setProducts(response)
                console.log('Response:', response)
            } catch (error) {
                console.error('Error fetching products:', error)
            }
            setIsLoading(false)
        }
        fetchProductData()
    }, [])
    
    return (
        <section className="">
            <div className='sr-only'>{carouselTitle}</div>
            <div
                className='font-optiscript text-3xl'
            >{carouselTitle}</div>
            <section className='relative'>
                <Carousel
                showArrows
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                    <button type="button" onClick={onClickHandler} title={label} style={arrowStyles}>
                        <FaArrowLeft color='#000' size={30} />
                    </button>
                    )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && (
                    <button type="button" onClick={onClickHandler} title={label} style={arrowStyles}>
                        <FaArrowRight color='#000' size={30} />
                    </button>
                    )
                }
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                centerMode
                centerSlidePercentage={getSlidePercentage()}
                >
                    {products.length < 1 && <Preloader />}
                </Carousel>
            </section>
        </section>
    )
}

const arrowStyles = {
    position: 'absolute',
    zIndex: 2,
    top: 'calc(50% - 15px)',
    width: 30,
    height: 30,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
};

export default ProductCarousel