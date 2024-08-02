import parse from 'html-react-parser';

const TextContent = ({
    text
}) => {
    return (
        <section>
            {parse(text)}
        </section>
    )
}

export default TextContent