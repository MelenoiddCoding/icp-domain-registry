const DomainList = ({ domains }) => {
  return (
    <div>
      <h2>Mis dominios</h2>
      <ul>
        {domains.map((d, i) => {
          const domainUrl =
            process.env.DFX_NETWORK === "ic"
              ? `https://${d.canister_id}.icp0.io`
              : `http://${d.canister_id}.localhost:4943`;

          return (
            <li key={i}>
              <a
                href={domainUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Abrir ${d.name}.icp en una nueva pestaña`}
              >
                <strong>{d.name}.icp</strong>
              </a>{" "}
              → {d.canister_id}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DomainList;
