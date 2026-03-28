import { useState } from 'react';
import Link from 'next/link';

export default function Navbar({ sacolaCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link href="/" style={styles.logo}>
          🌸 Lu Perfumes & Presentes
        </Link>

        <div style={styles.links}>
          <div style={styles.dropdown}>
            <span style={styles.link}>Por Linha ▾</span>
            <div style={styles.dropMenu}>
              <Link href="/catalogo?linha=feminino">Feminino</Link>
              <Link href="/catalogo?linha=masculino">Masculino</Link>
              <Link href="/catalogo?linha=kids">Kids</Link>
              <Link href="/catalogo?linha=baby">Baby</Link>
            </div>
          </div>

          <div style={styles.dropdown}>
            <span style={styles.link}>Por Marca ▾</span>
            <div style={styles.dropMenu}>
              {['O Boticário','Natura','Eudora','Avon','Mary Kay'].map(m => (
                <Link key={m} href={`/catalogo?marca=${m}`}>{m}</Link>
              ))}
            </div>
          </div>

          <div style={styles.dropdown}>
            <span style={styles.link}>Por Tipo ▾</span>
            <div style={styles.dropMenu}>
              {['Amadeirado','Doce','Cítrico','Floral','Frutal'].map(t => (
                <Link key={t} href={`/catalogo?tipo=${t}`}>{t}</Link>
              ))}
            </div>
          </div>

          <Link href="/kits" style={styles.link}>Kits 🎁</Link>
        </div>

        <div style={styles.acoes}>
          <Link href="/favoritos" style={styles.icone}>♡</Link>
          <Link href="/sacola" style={styles.sacolaBtn}>
            🛍 {sacolaCount > 0 && <span style={styles.badge}>{sacolaCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: { background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 100 },
  container: { maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  logo: { fontWeight: 700, fontSize: 18, color: 'var(--verde)' },
  links: { display: 'flex', gap: 32, alignItems: 'center' },
  link: { fontSize: 14, fontWeight: 500, color: 'var(--texto)', cursor: 'pointer', transition: 'color 0.2s' },
  dropdown: { position: 'relative', ':hover > div': { display: 'block' } },
  dropMenu: { display: 'none', position: 'absolute', top: '100%', left: 0, background: '#fff', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', borderRadius: 8, padding: '8px 0', minWidth: 160, flexDirection: 'column' },
  acoes: { display: 'flex', gap: 16, alignItems: 'center' },
  icone: { fontSize: 20, color: 'var(--rosa)' },
  sacolaBtn: { position: 'relative', fontSize: 20 },
  badge: { position: 'absolute', top: -6, right: -8, background: 'var(--rosa)', color: '#fff', borderRadius: '50%', width: 18, height: 18, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' },
};