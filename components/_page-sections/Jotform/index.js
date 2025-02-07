import Iframe from 'react-iframe'

const Jotform = ({ form }) => {
    return(
        <div>
            <Iframe
                url={form?.url}
                id={form?.id}
                display='block'
                width='100%'
                height='700'
                position='relative'
                scrolling='no'
            />
        </div>
    )
}

export default Jotform