/** Cena lofi do topo da página inicial: janela com chuva, luminária, xícara e gatinho. */
export function CenaLofi() {
  return (
    <div className="cena-lofi" aria-hidden="true">
      <div className="cena-janela">
        <span className="cena-chuva" />
        <span className="cena-lua" />
      </div>
      <span className="cena-luz" />
      <div className="cena-mesa">
        <span className="cena-livros">
          <i />
          <i />
          <i />
        </span>
        <span className="cena-caneca">
          <span className="cena-vapor" />
          <span className="cena-vapor" />
        </span>
        <span className="cena-gato">
          <span className="cena-zzz">z</span>
          <span className="cena-zzz">z</span>
        </span>
      </div>
    </div>
  );
}
