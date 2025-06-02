import React, { useEffect, useState } from "react";

const DomainExplorer = ({ actor }) => {
  const [search, setSearch] = useState("");
  const [allDomains, setAllDomains] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDomains = async () => {
      if (actor) {
        const result = await actor.getAllDomains();
        setAllDomains(result);
        setLoading(false);
      }
    };
    fetchDomains();
  }, [actor]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setNotFound(false);
    const name = search.trim().toLowerCase().replace(/\.icp$/, "");
    const match = allDomains.find((d) => d.name === name);

    if (match) {
      const domainUrl =
        process.env.DFX_NETWORK === "ic"
          ? `https://${match.canister_id}.icp0.io`
          : `http://${match.canister_id}.localhost:4943`;
      window.open(domainUrl, "_blank");
    } else {
      setNotFound(true);
    }
  };

  const filteredSuggestions = allDomains.filter((d) =>
    d.name.includes(search.trim().toLowerCase())
  );

  return (
    <div className="section-block public-section">
      <h2>Explorador de Dominios</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar dominio (ej: casino.icp)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {notFound && (
        <>
          <p>❌ Dominio no encontrado</p>
          {filteredSuggestions.length > 0 && (
            <>
              <p>¿Quisiste decir?</p>
              <ul>
                {filteredSuggestions.map((d, i) => {
                  const url =
                    process.env.DFX_NETWORK === "ic"
                      ? `https://${d.canister_id}.icp0.io`
                      : `http://${d.canister_id}.localhost:4943`;

                  return (
                    <li key={i}>
                      <a href={url} target="_blank" rel="noreferrer">
                        <strong>{d.name}.icp</strong>
                      </a>{" "}
                      → {d.canister_id}
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </>
      )}

      <h3>Dominios Registrados</h3>
      {loading ? (
         <p className="loading">🛰️ Escaneando el espacio...</p>
      ) : (
        <ul>
          {allDomains.map((d, i) => {
            const url =
              process.env.DFX_NETWORK === "ic"
                ? `https://${d.canister_id}.icp0.io`
                : `http://${d.canister_id}.localhost:4943`;

            return (
              <li key={i}>
                <a href={url} target="_blank" rel="noreferrer">
                  <strong>{d.name}.icp</strong>
                </a>{" "}
                → {d.canister_id}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DomainExplorer;
