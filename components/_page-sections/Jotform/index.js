import JotformEmbed from 'react-jotform-embed';

const Jotform = ({ form }) => {
    return(
        <div>
            <JotformEmbed src={form?.url} />
        </div>
    )
}

export default Jotform