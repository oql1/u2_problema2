import { usePokedex } from "../contexts/PokedexContext.ts";
import EmptyState from "./EmptyState.tsx";
import RegistryItem from "./RegistryItem.tsx";

export default function RegistryList() {
  const { entries } = usePokedex();
  return (
    <section className="panel list-panel" aria-labelledby="list-title">
      <div className="section-heading">
        <span className="step">03</span>
        <div>
          <h2 id="list-title">Registros</h2>
          <p>Cada envío simulado agrega una tarjeta al final.</p>
        </div>
      </div>
      <div className="ticket-list">
        {entries.length > 0 ? (
          entries.map((entry) => (
            <RegistryItem key={entry.id} entry={entry}></RegistryItem>
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}
