import { useEffect, useState } from 'react'
import { getForm } from '@/lib/api'
import Image from 'next/image'
import { LinkLookLikeButton } from '@/components/_inputs/Links'
import Form from '@/components/_page-sections/Form'

const HeroWithForm = ({
    heading,
    body,
    enableCtaButton,
    ctaButtonText,
    ctaButtonColor,
    image,
}) => {
    const [ form, setForm ] = useState(null)

    useEffect(() => {
        const setFormObj = async () => {
            let formObj = await getForm()
            setForm(formObj)
        }
        setFormObj()
    }, [])

    return(
        <section className="flex gap-5 items-center">
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
            <section className="px-5 md:px-10 py-5 md:py-10">
                <Form key={form?.name} form={form} />
            </section>
        </section>
    )
}

export default HeroWithForm