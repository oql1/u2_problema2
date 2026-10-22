import { usePokedex } from "../contexts/PokedexContext";
import type { PokemonEntry } from "../types";

export interface RegistryItemProps {
  entry: PokemonEntry;
}

export default function RegistryItem({ entry }: RegistryItemProps) {
  const { deleteEntry } = usePokedex();
  return (
    <article className="ticket">
      <div className="ticket-top">
        <span className="ticket-id">{entry.entryId}</span>
        <div className="badges">
          <span className={`badge type-${entry.type}`}>{entry.type}</span>
          <span className={`badge role-${entry.role}`}>{entry.role}</span>
        </div>
      </div>
      <div className="preview">
        <img src={entry.image} alt="" width={72} height={72} />
        <div>
          <h3>{entry.nickname}</h3>
          <p className="requester">
            #{entry.id} {entry.name}
          </p>
        </div>
      </div>
      <div className="ticket-actions">
        <button
          className="button danger"
          type="button"
          onClick={() => deleteEntry(entry.entryId)}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}
