import cx from 'classnames'

const SubmitButton = ({
    submitText,
    color
}) => {
    return (
        <button
            className={cx('text-lg font-bold py-1 px-2.5 rounded-lg', {
                ['bg-altRed text-white']: color === 'Red'
            })}
        >
            {submitText}
        </button>
    )
}

export default SubmitButton