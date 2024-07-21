import cx from 'classnames'

const ATCButton = ({
    color = 'Red'
}) => {

    const atcClickHandler = () => {
        console.log('Add to cart clicked')
    }

    return (
        <button
            onClick={atcClickHandler}
            className={cx('w-full', {
                ['text-white text-lg bg-altRed rounded-md py-1 w-32']: color === 'Red', 
            })}
        >
            Add to cart
        </button>
    )
}

export default ATCButton