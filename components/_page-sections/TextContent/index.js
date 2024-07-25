const TextContent = ({
    text
}) => {
    return (
        <section>
            <div
                dangerouslySetInnerHTML={{
                    __html: text
                }}
            />
        </section>
    )
}

export default TextContent