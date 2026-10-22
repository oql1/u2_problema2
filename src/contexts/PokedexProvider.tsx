import { useActionState, useReducer, useState, type ReactNode } from "react";
import type { Pokemon, PokemonEntry } from "../types";
import { PokedexContext } from "./PokedexContext";

export type EntriesAction =
  | { type: "add"; entry: PokemonEntry }
  | { type: "delete"; id: string };

export function EntriesReducer(entries: PokemonEntry[], action: EntriesAction) {
  switch (action.type) {
    case "add":
      return [...entries, action.entry];
    case "delete":
      return entries.filter((e) => e.entryId !== action.id);
  }
}

export interface FormState {
  error?: string;
}

export function PokedexProvider({ children }: { children: ReactNode }) {
  const [entries, dispatch] = useReducer(EntriesReducer, []);
  const [queryResult, setQueryResult] = useState<Pokemon>();

  const addEntry = async (_: FormState, formData: FormData) => {
    const nickname = formData.get("nickname")?.toString()?.trim() ?? "";
    const role = formData.get("role")?.toString() ?? "";

    if (nickname.length < 3) {
      return { error: "Ingrese minimo 3 caracteres en el nickname" };
    }

    if (role !== "titular" && role !== "reserva") {
      return { error: "Seleccione un rol valido" };
    }

    const entry: PokemonEntry = {
      entryId: crypto.randomUUID(),
      id: Number(formData.get("pokemonId")),
      name: formData.get("pokemonName")?.toString() ?? "",
      image: formData.get("image")?.toString() ?? "",
      type: formData.get("type")?.toString() ?? "",
      nickname: nickname,
      role: role,
      query: formData.get("query")?.toString() ?? "",
    };

    await new Promise((r) => setTimeout(r, 1000));

    dispatch({ type: "add", entry });

    return {};
  };

  const [formState, submitEntry, isPending] = useActionState(addEntry, {
    error: "",
  });

  const deleteEntry = (id: string) => {
    dispatch({ type: "delete", id });
  };

  return (
    <PokedexContext.Provider
      value={{
        entries,
        queryResult,
        setQueryResult,
        formState,
        isPending,
        submitEntry,
        deleteEntry,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
}
