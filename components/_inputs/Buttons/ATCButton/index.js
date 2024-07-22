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
            className={cx('w-full min-w-44 text-lg rounded-md py-1', {
                ['text-white bg-altRed ']: color === 'Red',
                ['text-white bg-altOrange']: color === 'Orange',
            })}
        >
            Add to cart
        </button>
    )
}

export default ATCButton