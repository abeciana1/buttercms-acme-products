import { useForm } from "react-hook-form";
import dynamic from "next/dynamic"
import { toPascalCase } from "@/lib/helper-functions"
import MissingField from '@/components/_forms/fields/MissingField'
import camelcaseKeys from 'camelcase-keys';
import Preloader from '@/components/Preloader'
import { slugify } from '@/lib/helper-functions'
import cx from 'classnames'
import SubmitButton from '@/components/_inputs/Buttons/SubmitButton'
import parse from 'html-react-parser';
import { useMemo } from 'react'
import { useDispatch } from "react-redux";
import { clearInstance } from '@/redux/slices/instanceSlice'

const FormFieldRenderer = ({type, fieldData, register, errors}) => {
    const fieldComponentPaths = useMemo(() => ({
		[type]: dynamic(
			() => import(`@/components/_forms/fields/${type}Field`)
				.catch(() => () => MissingField), {
			loading: Preloader,
            ssr: true
		})
	}), [type]);
	const FieldComponent = fieldComponentPaths[type] || MissingField;
	return <FieldComponent
        key={fieldData?.id}
        type={type}
        {...camelcaseKeys(fieldData)}
        register={register}
        errors={errors}
        />
}

const Form = ({ form, onModal = false }) => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = (data) => {
        console.log('submitting form')
        console.log('data', data)
        if (onModal) {
            dispatch(clearInstance())
        }
        reset()
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={cx('', {
                ['bg-skyBlue']: form?.backgroundColor === 'Sky Blue',
                ['bg-yellow-50']: form?.backgroundColor === 'Yellow',
                ['bg-white']: form?.backgroundColor === 'White'
            })}
        >
            <div className='mb-3'>{form?.form_text && parse(form?.form_text)}</div>
            {form?.fields?.map((field, index) => {
                return (
                    <div
                        key={field?.input_type + index}
                        className='pb-3 flex flex-col'>
                        <FormFieldRenderer
                            id={field?.meta?.id}
                            type={toPascalCase(field?.input_type)}
                            fieldData={{
                                id: field?.meta?.id,
                                label: field?.field_label,
                                name: slugify(field?.field_name),
                                required: field?.required,
                                validationError: field?.validation_error_message,
                                minNumber: field?.min_number_value,
                                maxNumber: field?.max_number_value,
                                allowNumbers: field?.allow_numbers,
                                allowSpecialChars: field?.allow_special_symbols
                            }}
                            errors={errors}
                            register={register}
                        />
                    </div>
                )
            })}
            <SubmitButton
                color={form?.submit_button_color?.brand_color}
                submitText={form?.submit_button_text}
            />
        </form>
    )
}

export default Form;