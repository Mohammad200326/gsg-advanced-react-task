import { useQuery } from '@tanstack/react-query'
import { Link, createFileRoute, useParams } from '@tanstack/react-router'
import { getCharacterById } from '@/api/character'

export const Route = createFileRoute('/characters/$id')({
  component: CharacterDetailsPage,
})

function CharacterDetailsPage() {
  const { id } = useParams({ from: '/characters/$id' })

  const { data, isLoading, error } = useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacterById(id),
  })

  if (isLoading) return <div className="text-center py-12">Loading...</div>
  if (error || !data)
    return (
      <div className="text-center py-12 text-red-500">Character not found</div>
    )

  return (
    <div className="mx-auto">
      <Link
        to="/characters"
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 mb-8"
      >
        ← Back to characters
      </Link>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <img
            src={data.image}
            alt={data.name}
            className="w-48 h-48 rounded-full object-cover shadow-lg shrink-0"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {data.name}
            </h1>
            <div className="space-y-2 mb-6">
              <p>
                <span className="font-semibold">Status:</span> {data.status}
              </p>
              <p>
                <span className="font-semibold">Species:</span> {data.species}
              </p>
              <p>
                <span className="font-semibold">Gender:</span> {data.gender}
              </p>
              <p>
                <span className="font-semibold">Origin:</span>{' '}
                {data.origin.name}
              </p>
              <p>
                <span className="font-semibold">Location:</span>{' '}
                {data.location.name}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Episodes ({data.episode.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
                {data.episode.map((episodeUrl: string, index: number) => {
                  const episodeId = episodeUrl.split('/').pop()
                  return (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 rounded-lg border"
                    >
                      <span className="font-mono text-sm text-gray-500">
                        Episode {episodeId}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
