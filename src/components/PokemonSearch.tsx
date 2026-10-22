import { useActionState } from "react";
import { searchPokemon } from "../services/pokeapi";
import { usePokedex } from "../contexts/PokedexContext";

interface formState {
  error?: string;
}

export default function PokemonSearch() {
  const { setQueryResult } = usePokedex();

  const action = async (_: formState, formData: FormData) => {
    const query = formData.get("query")?.toString()?.trim() ?? "";
    if (query.length < 3) {
      return { error: "Ingrese una busqueda de minimo 3 caracteres" };
    }

    try {
      const pokemon = await searchPokemon(query);
      setQueryResult(pokemon);
    } catch (e) {
      if (e instanceof Error) return { error: e.message };
      else return { error: "Error desconocido" };
    }

    return {};
  };

  const [formState, submit, isPending] = useActionState(action, {
    error: "",
  });

  return (
    <section className="panel" aria-labelledby="search-title">
      <div className="section-heading">
        <span className="step">01</span>
        <div>
          <h2 id="search-title">Buscar pokémon</h2>
          <p>Escribe el nombre exacto para cargarlo en el formulario.</p>
        </div>
      </div>
      <form className="ticket-form" noValidate action={submit}>
        <div className="field">
          <label htmlFor="query">Nombre</label>
          <input
            id="query"
            name="query"
            placeholder="Ej. pikachu"
            autoComplete="off"
          />
          <small>Mínimo 3 caracteres.</small>
        </div>
        <div className="feedback" aria-live="polite"></div>
        <p>{formState.error}</p>
        <button className="button primary" type="submit" disabled={isPending}>
          Buscar
        </button>
      </form>
    </section>
  );
}
