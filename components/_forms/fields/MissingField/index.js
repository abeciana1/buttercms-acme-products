export default function MissingField({ type, ...sectionData }) {
    console.log(`Missing form field ${type} data ${sectionData}`)
    return (
        <div>
            <p>Missing a template for {type} form field</p>
            <p>Check console for component details</p>
        </div>
    )
}