import JotformEmbed from 'react-jotform-embed';

const Jotform = ({ form }) => {
    console.log('props', form)
    return(
        <div>
            <JotformEmbed src={form?.url} />
        </div>
    )
}

export default Jotform