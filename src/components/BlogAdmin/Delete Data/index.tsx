import React from 'react'
import Modal from 'react-modal'
import Button from '@/components/Button'
import { FaTrash } from 'react-icons/fa'
import { RiCloseFill } from 'react-icons/ri'

interface DeleteUserModalProps {
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  isOpen,
  onClose,
  onDelete
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete User Confirmation Modal"
      style={{
        content: {
          width: '50%',
          height: '20%',
          margin: 'auto',
          position: 'absolute',
          zIndex: 9999
        }
      }}
    >
      <div className="">
        <div className="flex justify-end">
          <Button onClick={onClose} className="bg-black text-xl cursor-pointer">
            <RiCloseFill />
          </Button>
        </div>
        <div className="text-center">
          <p className="font-bold text-2xl text-black">
            Delete User Synapsis Blog
          </p>
          <p>Are you sure you want to delete this user?</p>
        </div>
        <div className="flex justify-center gap-5 mt-10">
          <Button variant="danger" onClick={onDelete}>
            Delete
          </Button>
          <Button onClick={onClose} className="bg-white text-red-500">
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteUserModal
