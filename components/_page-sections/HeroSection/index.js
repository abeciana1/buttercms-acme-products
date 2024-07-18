import { PageLayoutWrapper } from '@/components/_layouts'
import Image from 'next/image'
import { LinkLookLikeButton } from '@/components/_inputs/Links'

// {
//     "headline": "ACME: Unleash the Fun!",
//     "body_text": "Dive into a world of quirky and innovative products designed to make you smile. Shop ACME for your next big laugh and brilliant solution!",
//     "button_color": {
//         "meta": {
//             "id": 763563
//         },
//         "brand_color": "Red",
//         "brand_colors_dd": "red"
//     },
//     "cta_label": "Shop our categories!",
//     "cta_href": "c/all",
//     "image": "https://cdn.buttercms.com/UcRd3hxSSEWPed6VCnoC",
//     "image_alt_text": "ACME - This might hurt seal",
//     "image_width": 150,
//     "image_height": 150
// }

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