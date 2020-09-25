import React from 'react';
import { Modal } from 'react-bootstrap';

import CancelButton from '../CancelButton/CancelButton';
import PrimaryButton from '../ConfirmButton/PrimaryButton';

import './DeleteInventoryModal.scss';

// Unfortunately causes findDOMNode errors running in Strict Mode at no fault of the developer
const DeleteInventoryModal = ({ show, itemName, handleDelete, handleClose }) => {
  return (
    <Modal className='del-inv' show={show} onHide={handleClose}>
      <Modal.Header closeButton />
      <h2 className='del-inv__title'>{`Delete ${itemName} inventory item?`}</h2>
      <p className='del-inv__text'>{`Please confirm that youd like to delete ${itemName}
      from the inventory list. You won't be able to undo this action`}</p>
      <div className='del-inv__buttons'>
        <CancelButton onClick={handleClose}/>
        <PrimaryButton colour='red' onClick={handleDelete}>Delete</PrimaryButton>
      </div>
    </Modal>
  )
}

export default DeleteInventoryModal