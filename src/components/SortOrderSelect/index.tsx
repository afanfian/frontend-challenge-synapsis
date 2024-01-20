import React from 'react'

interface SortOrderSelectProps {
  value: 'asc' | 'desc'
  onChange: (value: 'asc' | 'desc') => void
}

const SortOrderSelect: React.FC<SortOrderSelectProps> = ({
  value,
  onChange
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as 'asc' | 'desc')}
      className="border border-gray-500 px-1 py-3 rounded-lg"
    >
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  )
}

export default SortOrderSelect
