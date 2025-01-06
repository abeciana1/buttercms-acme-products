import { ErrorMessage } from "@hookform/error-message"
import { checkValidEmailPattern, createPattern, createPatternMessage } from '@/lib/helper-functions'

const EmailField = ({
    id,
    label,
    name,
    required,
    validationError,
    register,
    errors
}) => {
    const isEmail = checkValidEmailPattern()
    
    return (
        <>
            <label htmlFor={`${name}-${id}`}>{label}{(validationError || required) ? '*' : ''}</label>
            <input
                id={`${name}-${id}`}
                type='email'
                name={name}
                aria-label={label}
                className='border-2 border-altBlack rounded-lg py-0.5 px-1'
                {...register(name, {
                    required: required ? { value: true, message: validationError || "A valid email is required" } : { value: false },
                    pattern: {
                        value: isEmail,
                        message: "Please enter a valid email address"
                    }
                })}
            />
            <ErrorMessage
                errors={errors}
                name={name}
                render={({ message }) => <p className='text-altRed'>{message}</p>}
            />
        </>
    )
}

export default EmailField;