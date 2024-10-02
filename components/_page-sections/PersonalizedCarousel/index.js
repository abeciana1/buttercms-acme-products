import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getPersonalizedProducts } from '@/lib/api';
import Preloader from '@/components/Preloader';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ProductCard from '@/components/_products/ProductCard';

const PersonalizedCarousel = ({ heading, persona }) => {
    const [mappedProducts, setMappedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { cookie_target } = persona;

    useEffect(() => {
        if (cookie_target) {
            const fetchPersonalizedProducts = async () => {
                try {
                    const response = await getPersonalizedProducts(cookie_target);
                    setMappedProducts(response); 
                } catch (error) {
                    console.error('Error fetching personalized products:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchPersonalizedProducts();
        }
    }, [cookie_target]);

    const getSlidesPerPage = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth >= 1050) {
                return 3 // 3 slides per page on larger screens
            } else if (window.innerWidth >= 640) {
                return 2; // 2 slides per page on medium screens
            } else {
                return 1; // 1 slide per page on small screens
            }
        }
        return 1;
    };

    const [slidesPerPage, setSlidesPerPage] = useState(getSlidesPerPage());
    const [startIdx, setStartIdx] = useState(0);

    useEffect(() => {
        const adjustSlidesPerPage = () => {
            setSlidesPerPage(getSlidesPerPage());
            setStartIdx(0);
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', adjustSlidesPerPage);
            window.addEventListener('orientationchange', adjustSlidesPerPage);
        }

        return () => {
            window.removeEventListener('resize', adjustSlidesPerPage);
            window.removeEventListener('orientationchange', adjustSlidesPerPage);
        };
    }, [mappedProducts]);

    const nextSlide = () => {
        setStartIdx((prevStartIdx) => {
            const newStartIdx = prevStartIdx + 1;
            return newStartIdx >= mappedProducts.length ? 0 : newStartIdx;
        });
    };

    const prevSlide = () => {
        setStartIdx((prevStartIdx) => {
            const newStartIdx = prevStartIdx - 1;
            return newStartIdx < 0 ? mappedProducts.length - 1 : newStartIdx;
        });
    };

    return (
        <>
            {(Cookies.get(cookie_target) === 'true') && (
                <section className='relative pt-10 md:pt-20'>
                    <div className='sr-only'>{heading}</div>
                    <h2 className='font-optiscript'>{heading}</h2>

                    {loading ? (
                        <Preloader />
                    ) : (
                        <>
                            {mappedProducts?.length > slidesPerPage && (
                                <div className='pt-5 flex gap-10'>
                                    <button
                                        onClick={prevSlide}
                                        className='z-10 bg-gray-700 text-white p-2 rounded-full'
                                    >
                                        <FaArrowLeft size={30} />
                                    </button>
                                    <button
                                        onClick={nextSlide}
                                        className='z-10 bg-gray-700 text-white p-2 rounded-full'
                                    >
                                        <FaArrowRight size={30} />
                                    </button>
                                </div>
                            )}
                        
                            <section className='pt-5'>
                                {mappedProducts?.length > 0 && (
                                    <section className='flex gap-5 justify-center'>
                                        {Array(slidesPerPage)
                                            .fill()
                                            .map((_, i) => {
                                                const productIdx =
                                                    (startIdx + i) % mappedProducts?.length;
                                                return (
                                                    <ProductCard
                                                        key={mappedProducts[productIdx].sku + productIdx}
                                                        product={mappedProducts[productIdx]}
                                                    />
                                                );
                                            })}
                                    </section>
                                )}
                            </section>
                        </>
                    )}
                </section>
            )}
        </>
    );
};

export default PersonalizedCarousel;