import { useEffect } from 'react'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import { clearInstance, setInstance } from '@/redux/slices/instanceSlice'
import PromoPopup from '@/components/_modals/PromoPopup'
import Cookies from 'js-cookie'
import { getModalContent } from '@/lib/api'

const Instance = () => {
    Modal.setAppElement('#modals')
    const instanceState = useSelector(state => state.instance)
    const dispatch = useDispatch()

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 9999
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '0.5rem',
            border: '2px solid #343434',
            width: 'auto',
            maxHeight: '100vh'
        }
    }

    const closeModal = () => {
        if (Cookies.get('on-first-entry') === 'true') {
            Cookies.remove('on-first-entry', 'false')
        }
        dispatch(clearInstance())
    }

    useEffect(() => {
        // if (document.referrer !== window?.location?.origin && !Cookies.get('on-first-entry')) {
            // }
            Cookies.set('on-first-entry', 'true')
        if (Cookies.get('on-first-entry') === 'true') {
            const getOnFirstEntryModal = async () => {
                const modalContent = await getModalContent('on-first-entry')
                const today = new Date();
                const startDate = new Date(modalContent.start_date)
                const endDate = new Date(modalContent.end_date)
                if (today >= startDate && today <= endDate) {
                    dispatch(setInstance({
                        name: 'promo-popup',
                        data: modalContent,
                    }))
                }
            }
    
            getOnFirstEntryModal()
        }
    }, [])

    return (
        <>
            {(instanceState.display && instanceState.data) &&
                <Modal
                    isOpen={instanceState.display}
                    onRequestClose={closeModal}
                    style={customStyles}
                    shouldCloseOnEsc
                    shouldCloseOnOverlayClick
                >
                    <div className='flex justify-end'>
                        <button onClick={closeModal}>
                            <AiOutlineClose size={30} className='stroke-current text-altRed' />
                        </button>
                    </div>
                    {instanceState.name === 'promo-popup' &&
                        <PromoPopup data={instanceState.data} />
                    }
                </Modal>
            }
        </>
    )
}

export default Instance