import HubspotForm from 'react-hubspot-form'

const HubspotFormComponent = ({ portalId, formId, region }) => {

    const submitHandler = () => {
        console.log('Submitting')
    }

    const readyLoadHandler = () => {
        console.log('Form is ready')
    }

    const loadingState =  () => {
        return (
            <div>Loading the form ....</div>
        )
    }

    return (
        <HubspotForm
            portalId={portalId}
            formId={formId}
            region={region}
            onReady={readyLoadHandler}
            loading={loadingState}
            onSubmit={submitHandler}
        />
    )
};

export default HubspotFormComponent;