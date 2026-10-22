import type { Pokemon } from "../types";

export async function searchPokemon(query: string): Promise<Pokemon> {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + query);
  if (response.status === 404) {
    throw new Error("Sin resultados");
  } else if (!response.ok) {
    throw new Error("No se pudo consultar PokeAPI");
  }
  const data = await response.json();
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
    type: data.types[0].type.name,
  };
}
