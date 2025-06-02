const AuthButtons = ({ isAuthenticated, onLogin, onLogout, principal }) => {
  return (
    <div className="auth-buttons">
      {!isAuthenticated ? (
        <button onClick={onLogin}>Iniciar sesión</button>
      ) : (
        <>
          <p>Autenticado como: {principal}</p>
          <button onClick={onLogout}>Cerrar sesión</button>
        </>
      )}
    </div>
  );
};

export default AuthButtons;