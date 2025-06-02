# 🌐 ICP Domain Registry

ICP Domain Registry es un MVP para registrar y explorar dominios `.icp` sobre el ecosistema de Internet Computer, utilizando autenticación descentralizada con Internet Identity y un canister escrito en Motoko.

> Desarrollado durante el Bootcamp ICP por el equipo **NoChain NoGain**.

![Logo](./src/assets/logo2.svg)

---

## 🚀 Funcionalidades del MVP

- 🔐 Inicio de sesión con Internet Identity
- 🔎 Explorador público de dominios (sin login)
- ➕ Registro de dominios `.icp` únicos (requiere login)
- 📜 Visualización de tus propios dominios registrados
- ✨ Estética galáctica con animaciones (glassmorphism + sci-fi vibes)

---

## 🧠 ¿Cómo funciona?

Este proyecto tiene dos partes:

1. **Frontend** en React + Vite
2. **Backend canister** en Motoko

El canister almacena:
- Dominios por usuario (clave: `Principal`)
- Todos los dominios existentes
- Lógica de validación (nombre, duplicados, formato)

---
## 📁 Estructura del archivo `.env`

Este proyecto requiere un archivo `.env` en la raíz del monorepo para inyectar las variables necesarias en tiempo de desarrollo. A continuación se muestra un ejemplo de cómo debe verse:

```env
# DFX CANISTER ENVIRONMENT VARIABLES
DFX_VERSION='0.26.1'
DFX_NETWORK='local'
CANISTER_ID_ICP_DOMAIN_REGISTRY_BACKEND='uxrrr-q7777-77774-qaaaq-cai'
CANISTER_ID='uxrrr-q7777-77774-qaaaq-cai'
CANISTER_CANDID_PATH='/ruta/absoluta/a/icp-domain-registry/.dfx/local/canisters/icp-domain-registry-backend/icp-domain-registry-backend.did'
# END DFX CANISTER ENVIRONMENT VARIABLES
```

## 📦 Estructura del Proyecto


```

icp-domain-registry/
├── src/
│   ├── assets/                 # Logo y recursos
│   ├── components/             # Componentes de UI (Explorer, Form, etc.)
│   ├── index.scss              # Estilo global con tema galáctico
│   ├── App.jsx                 # Componente principal
│   └── Layout.jsx              # Contenedor visual principal
├── src/icp-domain-registry-backend/
│   └── main.mo                 # Canister Motoko
└── README.md


```

---

## 🧪 Uso local (Desarrollo)

### Requisitos:

- Node.js
- [DFX SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install)

### Comandos útiles:

```bash
# Instala las dependencias
npm install

# Inicia el entorno local de IC
dfx start --clean --background

# Despliega el canister localmente
dfx deploy

# (Opcional) Regenera interfaces candid
npm run generate

# Levanta el frontend
npm run dev
````

Una vez desplegado, visita:

* Frontend: [`http://localhost:5173`](http://localhost:5173)
* Replica local: [`http://localhost:4943`](http://localhost:4943)

---

## 🔐 Sobre la autenticación

Este proyecto utiliza Internet Identity:

* Si estás en local: configurado con `identity.ic0.app` o un canister local.
* En producción: automáticamente detecta `process.env.DFX_NETWORK === 'ic'`.

---

## 🧱 Smart Contract (`main.mo`)

```motoko
public shared ({ caller }) func registerDomain(name : Text, canister_id : Text) { ... }
public shared query ({ caller }) func getMyDomains() : [DomainRecord]
public query func getAllDomains() : [DomainRecord]
```

Valida:

* Longitud del nombre
* Que no incluya `.`
* Que no esté duplicado
* Que el `canister_id` sea válido

---

## 💡 Próximas mejoras

- 💸 **Cobro por registro de dominio**  
  Integrar un sistema de tarifas usando ICP tokens para reservar un dominio. Puede incluir precios diferenciados por longitud, rareza o temporalidad.

- 🔁 **Transferencia de dominios entre usuarios**  
  Permitir que los usuarios transfieran dominios registrados a otro `Principal` mediante una interfaz segura y validada.

- ⏳ **Caducidad y renovación de dominios**  
  Asignar un tiempo de expiración a cada dominio (por ejemplo, 1 año) y permitir la renovación antes de que expire. Dominio caducado = vuelve a estar disponible.

- 🧩 **Extensión de navegador para resolver `.icp` directamente**  
  Crear una extensión tipo resolver DNS que permita ingresar `nombre.icp` en el navegador y redirigir automáticamente al canister asociado en `https://<canister_id>.icp0.io`.

- 📊 **Dashboard de dominios y analíticas**  
  Panel que muestre número total de dominios, dominios más visitados, usuarios más activos, etc.

- 🛡️ **Moderación y gobernanza para dominios especiales**  
  Reservar ciertos nombres (como `admin.icp`, `gov.icp`, `bitcoin.icp`) bajo votación comunitaria o revisión especial para evitar abuso.


---

## 🤘 Autor

Desarrollado por el equipo **@NoChainNoGain** @MelenoiddCoding
Participante del Bootcamp ICP 2024 🚀

---

## 📎 Recursos útiles

* [Documentación oficial de ICP](https://internetcomputer.org/docs)
* [Guía de Motoko](https://internetcomputer.org/docs/current/motoko/main/motoko)
* [Autenticación con Internet Identity](https://identity.ic0.app)
