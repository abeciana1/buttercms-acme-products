import Image from 'next/image'
import { LinkLookLikeButton } from '@/components/_inputs/Links'
import useResponsiveness from '@/lib/hooks/useResponsiveness'

const HeroSection = ({
    headline,
    bodyText,
    image,
    imageAltText,
    imageWidth,
    imageHeight,
    ctaLabel,
    ctaHref,
    buttonColor
}) => {
    const { isDesktop, isTablet, isMobile } = useResponsiveness() || {}
    return (
        <section className='flex flex-col md:flex-row items-center gap-10 justify-center'>
            <div className='w-full lg:w-1/2'>
                <h1 className='text-center md:text-left'>{headline}</h1>
                {(isMobile || isTablet) &&
                    <div className='py-5'>
                        <Image
                            src={image}
                            alt={imageAltText}
                            width={imageWidth}
                            height={imageHeight}
                            className='mx-auto'
                        />
                    </div>
                }
                <div className='text-xl'>{bodyText}</div>
                <div className='pt-5'>
                    <LinkLookLikeButton
                        linkText={ctaLabel}
                        linkHref={ctaHref}
                        color={buttonColor.brand_color}
                    />
                </div>
            </div>
            {isDesktop &&
                <div>
                    <Image
                        src={image}
                        alt={imageAltText}
                        width={imageWidth}
                        height={imageHeight}
                    />
                </div>
            }
        </section>
    )
}

export default HeroSection