import { createContext, useContext } from "react";
import type { Pokemon, PokemonEntry } from "../types";
import type { FormState } from "./PokedexProvider";

export interface PokedexState {
  entries: PokemonEntry[];
  formState: FormState;
  isPending: boolean;
  queryResult?: Pokemon;
  setQueryResult: (pokemon: Pokemon) => void;
  submitEntry: (data: FormData) => void;
  deleteEntry: (id: string) => void;
}

export const PokedexContext = createContext<PokedexState | null>(null);

export function usePokedex() {
  const pokedex = useContext(PokedexContext);

  if (pokedex === null) {
    throw new Error("usePokedex must be used within a PokedexProvider");
  }

  return pokedex;
}
