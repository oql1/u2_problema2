import { usePokedex } from "../contexts/PokedexContext";
import type { PokemonEntryRole } from "../types";

export default function RegistrySummary() {
  const { entries } = usePokedex();

  const count = entries.reduce(
    (c, entry) => {
      if (!c[entry.role]) c[entry.role] = 0;
      c[entry.role]++;
      return c;
    },
    {} as Record<PokemonEntryRole, number>,
  );

  return (
    <section className="summary" aria-label="Resumen de registros">
      <article className="stat">
        <span>Total</span>
        <strong>{entries.length}</strong>
      </article>
      <article className="stat">
        <span>Titulares</span>
        <strong className="text-amber">{count.titular ?? 0}</strong>
      </article>
      <article className="stat">
        <span>Reservas</span>
        <strong className="text-green">{count.reserva ?? 0}</strong>
      </article>
    </section>
  );
}
