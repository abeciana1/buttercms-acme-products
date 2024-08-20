import { ErrorMessage } from "@hookform/error-message"
import { createPattern, createPatternMessage } from '@/lib/helper-functions'

const TextField = ({
    id,
    label,
    name,
    required,
    validationError,
    register,
    errors,
    allowNumbers = false,
    allowSpecialChars = false
}) => {
    const pattern = createPattern(allowNumbers, allowSpecialChars);
    const patternMessage = createPatternMessage(allowNumbers, allowSpecialChars);

    return (
        <>
            <label htmlFor={`${name}-${id}`}>{label}{(validationError || required) ? '*' : ''}</label>
            <input
                id={`${name}-${id}`}
                type='text'
                name={name}
                aria-label={label}
                className='border-2 border-altBlack rounded-lg py-0.5 px-1'
                {...register(name, {
                    required: required ? { value: true, message: validationError || "This field is required" } : { value: false },
                    pattern: {
                        value: pattern,
                        message: patternMessage
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

export default TextField;