import React, { useEffect } from "react";

const HubspotForm = ({ portalId, formId, region, targetElementId }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://js.hsforms.net/forms/v2.js';
        document.body.appendChild(script);

        script.addEventListener('load', () => {
            if (window.hbspt) {
                window.hbspt.forms.create({
                    region: region,
                    portalId: portalId,
                    formId: formId,
                    target: `#${targetElementId}`
                });
            }
        });

        return () => {
            document.body.removeChild(script); // Clean up the script on component unmount
        };
    }, [portalId, formId]);

    return <div id={targetElementId} />
};

export default HubspotForm;