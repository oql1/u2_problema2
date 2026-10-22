export type Pokemon = {
  id: number;
  name: string;
  image: string;
  type: string;
};

export type PokemonEntryRole = "titular" | "reserva";

export type PokemonEntry = Pokemon & {
  entryId: string;
  nickname: string;
  role: PokemonEntryRole;
  query: string;
};
