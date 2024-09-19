import { useEffect, useState } from 'react'
import parse from 'html-react-parser';
import { getFormCollection } from '@/lib/api'
import Form from '@/components/_page-sections/Form'
import { LinkLookLikeButton } from '@/components/_inputs/Links'
import { useDispatch } from 'react-redux';
import { clearInstance } from '@/redux/slices/instanceSlice';

const PromoPopup = ({ data }) => {
    const dispatch = useDispatch()
    const {
        text_content,
        form,
        promo_link_href,
        promo_button_text,
        promo_button_color
    } = data;
    const [ popupForm, setPopupForm ] = useState(null)
    
    useEffect(() => {
        if (Object.hasOwn(form, 'form_name')) {
            const collectFormFields = async () => {
                const formContent = await getFormCollection(form.form_name);
                setPopupForm(formContent)
            }
            collectFormFields()
        }
    }, [form])

    const closeInstance = () => {
        dispatch(clearInstance())
    }

    return (
        <section className='max-w-md space-y-5'>
            {parse(text_content)}
            {popupForm &&
                <Form key={form?.name} form={popupForm} onModal />
            }
            {(promo_link_href && promo_button_color && promo_button_text) &&
                <div className='flex justify-center' onClick={closeInstance}>
                    <LinkLookLikeButton
                        linkText={promo_button_text}
                        linkHref={promo_link_href}
                        color={promo_button_color.brand_color}
                    />
                </div>
            }
        </section>
    )
}

export default PromoPopup