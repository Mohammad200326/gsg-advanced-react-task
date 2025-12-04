import { Link } from '@tanstack/react-router'
import type { Character } from '@/types/character.type'
import { Route } from '@/routes/characters/$id'

export default function CharacterCard({ char }: { char: Character }) {
  const id = char.id.toString()
  return (
    <Link
      to={Route.to}
      params={{ id }}
      className="group block p-6 bg-white border border-gray-200 rounded-xl transition-all duration-300 hover:border-blue-300"
    >
      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
        <img
          src={char.image}
          alt={char.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-bold text-gray-900 text-center mb-2 group-hover:text-blue-600 transition-colors">
        {char.name}
      </h3>
    </Link>
  )
}
