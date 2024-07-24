import { useState, useRef } from 'react';

const Accordion = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="mb-4 border-b-2 border-gray-700">
            <button
                onClick={toggleAccordion}
                className="w-full py-4 text-left focus:outline-none focus-visible:ring focus-visible:ring-opacity-75"
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${title}`}
            >
                <div className="flex justify-between items-center">
                <span className="text-xl font-medium">{title}</span>
                <span className="text-3xl">{isOpen ? '-' : '+'}</span>
                </div>
            </button>
            <div
                id={`accordion-content-${title}`}
                ref={contentRef}
                className={`overflow-hidden transition-all duration-300 ${
                isOpen ? 'max-h-screen' : 'max-h-0'
                }`}
                aria-hidden={!isOpen}
            >
                <div className="py-4">{content}</div>
            </div>
        </div>
    );
};

export default Accordion;
