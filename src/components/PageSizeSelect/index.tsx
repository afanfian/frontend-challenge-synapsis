import React from 'react'

interface PageSizeSelectProps {
  value: number
  onChange: (value: number) => void
}

const PageSizeSelect: React.FC<PageSizeSelectProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="border border-gray-500 px-1 py-3 rounded-lg"
    >
      <option value={5}>5</option>
      <option value={25}>25</option>
      <option value={50}>50</option>
    </select>
  )
}

export default PageSizeSelect
