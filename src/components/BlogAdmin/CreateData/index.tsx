import React, { useState } from 'react'
import Modal from 'react-modal'
import Button from '@/components/Button'
import { RiCloseFill } from 'react-icons/ri'

interface AddUserModalProps {
  isOpen: boolean
  onClose: () => void
  onAddUser: (userData: any) => void
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onAddUser
}) => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    gender: 'male',
    status: 'active'
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setNewUser({ ...newUser, [name]: value })
  }

  const handleAddUser = () => {
    onAddUser(newUser)
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add User Modal"
      style={{
        content: {
          width: '50%',
          height: '80%',
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
          Add User Synapsis Blog
        </p>
        <form className="flex flex-col space-y-5">
          <label className="font-semibold text-xl text-gray-900">Name:</label>
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            className="pl-3 border rounded-md border-gray-200 h-10"
          />
          <label className="font-semibold text-xl text-gray-900">Email:</label>
          <input
            type="text"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            className="pl-3 border rounded-md border-gray-200 h-10"
          />
          <label className="font-semibold text-xl text-gray-900">Gender:</label>
          <select
            name="gender"
            value={newUser.gender}
            onChange={handleInputChange}
            className="pl-3 border rounded-md border-gray-200 h-10"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <label className="font-semibold text-xl text-gray-900">Status:</label>
          <select
            name="status"
            value={newUser.status}
            onChange={handleInputChange}
            className="pl-3 border rounded-md border-gray-200 h-10"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <Button variant="primary" type="button" onClick={handleAddUser}>
            Add User
          </Button>
        </form>
      </div>
    </Modal>
  )
}

export default AddUserModal
