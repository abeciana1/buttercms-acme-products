import { useEffect, useState } from 'react'
import parse from 'html-react-parser';
import { getFormCollection } from '@/lib/api'
import Form from '@/components/_page-sections/Form'

const PromoPopup = ({ data }) => {
    const { text_content, form } = data;
    const [ popupForm, setPopupForm ] = useState(null)

    
    useEffect(() => {
        if (form) {
            const collectFormFields = async () => {
                const formContent = await getFormCollection(form.form_name);
                setPopupForm(formContent)
            }
            collectFormFields()
        }
    }, [form])


    return (
        <section className='max-w-md space-y-5'>
            {parse(text_content)}
            {popupForm &&
                <Form key={form?.name} form={popupForm} />
            }
        </section>
    )
}

export default PromoPopup