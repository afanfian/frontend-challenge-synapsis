import React from 'react'

interface SortBySelectProps {
  value: 'title' | 'userName' | 'commentName'
  onChange: (value: 'title' | 'userName' | 'commentName') => void
}

const SortBySelect: React.FC<SortBySelectProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value as 'title' | 'userName' | 'commentName')
      }
      className=" px-1 py-3 rounded-lg border border-gray-500"
    >
      <option value="title">Title</option>
      <option value="userName">User Name</option>
      <option value="commentName">Comment Name</option>
    </select>
  )
}

export default SortBySelect
