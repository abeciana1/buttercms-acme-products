import { ErrorMessage } from "@hookform/error-message"

const EmailField = ({
    id,
    label,
    name,
    required,
    validationError,
    minNumber,
    maxNumber,
    register,
    errors
}) => {
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
                    required: required ? { value: true, message: validationError || "This field is required" } : { value: false }
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