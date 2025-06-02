import React, { useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";
import { createActor, canisterId } from "../../declarations/icp-domain-registry-backend";

import AuthButtons from "./components/AuthButtons";
import DomainForm from "./components/DomainForm";
import DomainList from "./components/DomainList";
import Layout from "./components/Layout";
import DomainExplorer from "./components/DomainExplorer";

import './index.scss';

const LOCAL_IDENTITY_CANISTER = "uzt4z-lp777-77774-qaabq-cai";

const identityProvider =
  process.env.DFX_NETWORK === "ic"
    ? "https://identity.ic0.app"
    : `http://${LOCAL_IDENTITY_CANISTER}.localhost:4943`;

function App() {
  const [authClient, setAuthClient] = useState(null);
  const [actor, setActor] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState(null);
  const [domains, setDomains] = useState([]);
  const [form, setForm] = useState({ name: "", canister_id: "" });
  const [toast, setToast] = useState(null);
  const [error, setError] = useState(null);



  useEffect(() => {
    const init = async () => {
      const client = await AuthClient.create();
      setAuthClient(client);

      const isLoggedIn = await client.isAuthenticated();
      setIsAuthenticated(isLoggedIn);

      let identity = null;
      if (isLoggedIn) {
        identity = client.getIdentity();
        const principal = identity.getPrincipal().toText();
        setPrincipal(principal);
      }

      const agent = new HttpAgent({ identity });
      if (process.env.DFX_NETWORK !== "ic") {
        await agent.fetchRootKey();
      }

      const actorInstance = createActor(canisterId, { agent });
      setActor(actorInstance);

      if (isLoggedIn) {
        const myDomains = await actorInstance.getMyDomains();
        setDomains(myDomains);
      }
    };

    init();
  }, []);

  const login = async () => {
    await authClient.login({
      identityProvider,
      onSuccess: () => window.location.reload(),
    });
  };

  const logout = async () => {
    await authClient.logout();
    setIsAuthenticated(false);
    setPrincipal(null);
    setActor(null);
    setDomains([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("INTENTANDO REGISTRAR:", form.name, form.canister_id);

    setError(null);
    setToast(null); // limpia cualquier toast anterior

    // Validación
    if (!form.name.trim() || !form.canister_id.trim()) {
      setError("Completa ambos campos.");
      return;
    }

    try {
      await actor.registerDomain(form.name, form.canister_id);
      const updated = await actor.getMyDomains();
      setDomains(updated);
      setForm({ name: "", canister_id: "" });

      setToast("✅ Dominio registrado con éxito.");
      setTimeout(() => setToast(null), 3000);
    } catch (e) {
      console.error(e);
      
      setToast("❌ Error al registrar dominio.");
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <Layout>
      <AuthButtons
        isAuthenticated={isAuthenticated}
        onLogin={login}
        onLogout={logout}
        principal={principal}
      />


      {actor && <DomainExplorer actor={actor} />}


      {isAuthenticated && (
        <div className="section-block user-panel">
          <DomainForm
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit}
            error={error}
          />
          <DomainList domains={domains} />
        </div>
      )}
      {toast && <div className="toast">{toast}</div>}

    </Layout>
  );
}

export default App;
