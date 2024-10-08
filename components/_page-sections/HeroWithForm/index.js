import Image from 'next/image'
import { LinkLookLikeButton } from '@/components/_inputs/Links'
import Form from '@/components/_page-sections/Form'
import cx from 'classnames'

const HeroWithForm = ({
    heading,
    body,
    enableCtaButton,
    ctaButtonText,
    ctaButtonColor,
    image,
    form
}) => {
    return(
        <section className="flex flex-col md:flex-row items-center md:gap-10 justify-center">
            <section className="px-5 md:px-10 py-5 md:py-10">
                {image &&
                    <div className="relative h-44 w-56 sm:h-44 md:w-56">
                        <Image
                            src={image}
                            fill
                            objectFit="contain"
                            alt={heading}
                            className='w-auto'
                        />
                    </div>
                }
                <h1>{heading}</h1>
                <div className='py-5'>{body}</div>
                {enableCtaButton &&
                    <div>
                        <LinkLookLikeButton
                            linkText={ctaButtonText}
                            color={ctaButtonColor?.brand_color}
                            linkHref='/'
                        />
                    </div>
                }
            </section>
            <section
                className={cx("px-5 md:px-10 py-5 md:py-10 rounded-lg", {
                    ['bg-skyBlue']: form?.backgroundColor?.brand_color === 'Sky Blue',
                    ['bg-white']: form?.backgroundColor?.brand_color === 'White'
                })}
            >
                <Form key={form?.name} form={form} />
            </section>
        </section>
    )
}

export default HeroWithForm