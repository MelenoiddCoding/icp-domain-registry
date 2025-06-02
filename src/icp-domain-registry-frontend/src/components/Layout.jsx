import logo from "/assets/logo2.svg";


const Layout = ({ children }) => (
    <div className="container">
        <img src={logo} alt="ICP Logo" className="landing-logo" />
        <h1 className="main-title">Registro de Dominios en ICP</h1>
        {children}
        <footer className="footer">
            <p>
                Desarrollado por <strong>NoChain NoGain</strong> · Proyecto sobre ICP ·
                <a href="https://github.com/MelenoiddCoding/icp-domain-registry" target="_blank" rel="noreferrer">
                    GitHub
                </a>
            </p>
        </footer>

    </div>
);

export default Layout;
