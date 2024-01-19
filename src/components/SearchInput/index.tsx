import React from 'react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 mr-4 rounded-lg border border-gray-500 text-gray-500"
    />
  )
}

export default SearchInput
