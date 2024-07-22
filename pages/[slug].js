
const CatchAllPage = () => {

    return (
        <div>catch all</div>
    )
}

export const getServerSideProps = async (context) => {
    console.log('getServerSideProps', context)
    return {
        props: {}
    }
}

export default CatchAllPage