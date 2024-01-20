import Button from '@/components/Button'
import React, { useState, useEffect } from 'react'
import { RiCloseFill } from 'react-icons/ri'
import Modal from 'react-modal'

interface UpdateUserModalProps {
  isOpen: boolean
  onClose: () => void
  onUpdate: (updatedData: any) => void
  userData: any
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  userData
}) => {
  const [updatedUser, setUpdatedUser] = useState(userData || {})

  useEffect(() => {
    setUpdatedUser(userData || {})
  }, [userData])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (updatedUser !== null) {
      setUpdatedUser({ ...updatedUser, [name]: value })
    }
  }

  const handleUpdate = () => {
    onUpdate(updatedUser)
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Update User Modal"
      style={{
        content: {
          width: '50%',
          height: '60%',
          margin: 'auto',
          position: 'absolute',
          zIndex: 9999
        }
      }}
    >
      <div>
        <div className="flex justify-end">
          <Button onClick={onClose} className="bg-black text-xl cursor-pointer">
            <RiCloseFill />
          </Button>
        </div>
        <p className="text-center font-bold text-2xl text-black">
          Update User Synapsis Blog
        </p>
        <form className="flex flex-col space-y-5">
          <label className="font-semibold text-xl text-gray-900">Name:</label>
          <input
            type="text"
            name="name"
            value={updatedUser?.name || ''}
            onChange={handleInputChange}
            className="pl-3 border rounded-md border-gray-200 h-10"
          />

          <label className="font-semibold text-xl text-gray-900">Email:</label>
          <input
            type="text"
            name="email"
            value={updatedUser?.email || ''}
            onChange={handleInputChange}
            className="pl-3 border rounded-md border-gray-200 h-10"
          />

          <label className="font-semibold text-xl text-gray-900">Gender:</label>
          <select
            name="gender"
            value={updatedUser?.gender || ''}
            onChange={handleInputChange}
            className="pl-3 border rounded-md border-gray-200 h-10"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label className="font-semibold text-xl text-gray-900">Status:</label>
          <select
            name="status"
            value={updatedUser?.status || ''}
            onChange={handleInputChange}
            className="pl-3 border rounded-md border-gray-200 h-10"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <Button variant="primary" type="button" onClick={handleUpdate}>
            Update User
          </Button>
        </form>
      </div>
    </Modal>
  )
}

export default UpdateUserModal
