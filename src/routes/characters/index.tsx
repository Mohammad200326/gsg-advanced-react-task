import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import CharacterCard from '../../components/CharacterCard'
import SearchInput from '../../components/SearchInput'
import type { Character } from '@/types/character.type'
import { getCharacters } from '@/api/character'

export const Route = createFileRoute('/characters/')({
  component: CharactersPage,
})

function CharactersPage() {
  const [search, setSearch] = useState('')

  const { data, isLoading, error } = useQuery({
    queryKey: ['characters', search],
    queryFn: () => getCharacters(search),
  })

  if (isLoading) return <div className="text-center py-12">Loading...</div>
  if (error) {
    const isSearching = search.trim().length > 0

    return (
      <div className="text-center py-12 text-red-500">
        <p className="mb-4">
          {isSearching
            ? `No characters found for "${search}"`
            : 'Error loading characters'}
        </p>

        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 mb-8"
        >
          ← Back to Previous Page
        </button>
      </div>
    )
  }

  return (
    <div className="p-10">
      <div className="mb-8">
        <SearchInput value={search} onChange={setSearch} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.results.map((char: Character) => (
          <CharacterCard key={char.id} char={char} />
        ))}
      </div>
    </div>
  )
}

export default CharactersPage
