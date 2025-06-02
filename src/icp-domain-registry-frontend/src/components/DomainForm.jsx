const DomainForm = ({ form, setForm, onSubmit, error }) => (
  <form onSubmit={onSubmit}>
    <input
      type="text"
      placeholder="Nombre del dominio (ej: blocksio)"
      value={form.name}
      onChange={(e) => setForm({ ...form, name: e.target.value })}
      required
    />
    <input
      type="text"
      placeholder="Canister ID (ej: abcde-...)"
      value={form.canister_id}
      onChange={(e) => setForm({ ...form, canister_id: e.target.value })}
      required
    />
    <button type="submit">Registrar dominio</button>
    {error && <p className="error-message">{error}</p>}
  </form>
);

export default DomainForm;