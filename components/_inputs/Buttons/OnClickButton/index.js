import cx from 'classnames'

const OnClickButton = ({
    buttonText,
    onClick,
    color
}) => {
    return (
        <button
            onClick={onClick}
            className={cx('w-full h-10 min-w-32 sm:min-w-44 text-lg rounded-md py-1 px-2', {
                ['text-white bg-altRed ']: color === 'Red',
                ['text-white bg-utilityGreen ']: color === 'Green',
            })}
        >
            { buttonText }
        </button>
    )
}

export default OnClickButton