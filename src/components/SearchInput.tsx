import { useState } from 'react'

export default function SearchInput({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) {
  const [inputValue, setInputValue] = useState(value)

  const handleSearchClick = () => {
    onChange(inputValue)
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search characters..."
        className="border p-2 grow"
      />
      <button
        onClick={handleSearchClick}
        className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  )
}
