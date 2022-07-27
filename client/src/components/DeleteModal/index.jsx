import React, { useContext } from 'react';
import Modal from 'react-modal';
import { deleteRepository } from '../../services/api';
import { AuthContext } from '../../contexts/auth'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};



Modal.setAppElement('#root');

function DeleteModal() {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const { user } = useContext(AuthContext)

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.background = '#da0000';
        subtitle.style.color = '#fff';
        subtitle.style.padding = '1rem';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <button onClick={openModal}>Open Modal</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Tem certeza que gostaria de deletar o repositório?</h2>
                <button onClick={closeModal}>Cancelar</button>
                <button onClick={() => handleDeleteRepo(repo)}>Confirmar</button>
            </Modal>
        </div>
    );
}

export default DeleteModal;