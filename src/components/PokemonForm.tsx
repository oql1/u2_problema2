import { usePokedex } from "../contexts/PokedexContext";

export default function PokemonForm() {
  const { queryResult, formState, submitEntry, isPending } = usePokedex();

  return (
    <section className="panel" aria-labelledby="form-title">
      <div className="section-heading">
        <span className="step">02</span>
        <div>
          <h2 id="form-title">Datos del pokémon</h2>
          <p>La búsqueda llena estos campos. Después simula el registro.</p>
        </div>
      </div>
      <form className="ticket-form" noValidate action={submitEntry}>
        {!queryResult ? (
          <div className="preview">
            <div>
              <p className="ticket-id">Sin selección</p>
              <strong>Ningún pokémon cargado</strong>
            </div>
          </div>
        ) : null}
        <div className="field">
          <label htmlFor="pokemonId">Número</label>
          <input
            id="pokemonId"
            name="pokemonId"
            value={queryResult?.id}
            readOnly
          />
        </div>
        <div className="field">
          <label htmlFor="pokemonName">Nombre</label>
          <input
            id="pokemonName"
            name="pokemonName"
            value={queryResult?.name}
            readOnly
          />
        </div>
        <div className="field">
          <label htmlFor="type">Tipo</label>
          <input id="type" name="type" value={queryResult?.type} readOnly />
        </div>
        <div className="field">
          <label htmlFor="image">Imagen</label>
          <input id="image" name="image" value={queryResult?.image} readOnly />
        </div>
        <div className="field">
          <label htmlFor="nickname">Apodo</label>
          <input id="nickname" name="nickname" placeholder="Ej. Chispa" />
          <small>Mínimo 3 caracteres.</small>
        </div>
        <div className="field">
          <label htmlFor="role">Rol</label>
          <select id="role" name="role">
            <option value="">Selecciona un rol</option>
            <option value="titular">Titular</option>
            <option value="reserva">Reserva</option>
          </select>
        </div>
        <div className="feedback" aria-live="polite"></div>
        <p>{formState.error}</p>
        <button className="button primary" type="submit" disabled={isPending}>
          Registrar pokémon
        </button>
      </form>
    </section>
  );
}
