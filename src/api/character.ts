export const getCharacters = async (name: string) => {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character?name=${name}`,
  )
  if (!res.ok) throw new Error('Failed to fetch characters')

  return res.json()
}

export const getCharacterById = async (id: string) => {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
  if (!res.ok) throw new Error('Failed to fetch character')
  return res.json()
}
