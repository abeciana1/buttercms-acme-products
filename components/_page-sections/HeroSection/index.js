import { PageLayoutWrapper } from '@/components/_layouts'
import Image from 'next/image'
import { LinkLookLikeButton } from '@/components/_inputs/Links'

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
    return (
        <PageLayoutWrapper>
            <section className='flex items-center gap-10 justify-center'>
                <div className='w-1/2'>
                    <h1>{headline}</h1>
                    <div className='text-xl'>{bodyText}</div>
                    <div className='pt-5'>
                        <LinkLookLikeButton
                            linkText={ctaLabel}
                            linkHref={ctaHref}
                            color={buttonColor.brand_color}
                        />
                    </div>
                </div>
                <div>
                    <Image
                        src={image}
                        alt={imageAltText}
                        width={imageWidth}
                        height={imageHeight}
                    />
                </div>
            </section>
        </PageLayoutWrapper>
    )
}

export default HeroSection