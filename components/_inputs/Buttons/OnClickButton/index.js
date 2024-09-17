
const OnClickButton = ({
    buttonText,
    onClick,
}) => {
    return (
        <button
            onClick={onClick}
            className={cx('w-full h-10 min-w-32 sm:min-w-44 text-lg rounded-md py-1', {
                ['text-white bg-altRed ']: color === 'Red',
                ['text-white bg-utilityGreen ']: color === 'Green',
            })}
        >
            { buttonText }
        </button>
    )
}

export default OnClickButton