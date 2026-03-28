import { useState } from 'react';
import Navbar from '../components/Navbar';
import ProdutoCard from '../components/ProdutoCard';
import Link from 'next/link';

const produtosDestaque = [
  { id: 1, nome: 'Glamour Rose', marca: 'O Boticário', descricao: 'Floral sofisticado com notas de rosa e baunilha.', linha: 'feminino', foto: '' },
  { id: 2, nome: 'Malbec Gold', marca: 'O Boticário', descricao: 'Amadeirado marcante, masculino e sofisticado.', linha: 'masculino', foto: '' },
  { id: 3, nome: 'Kaiak Feminino', marca: 'Natura', descricao: 'Fresco e natural, inspirado na natureza brasileira.', linha: 'feminino', foto: '' },
  { id: 4, nome: 'Kit Presente Baby', marca: 'Natura', descricao: 'Kit completo para bebês com produtos suaves.', linha: 'baby', foto: '' },
];

export default function Home() {
  const [sacola, setSacola] = useState([]);

  const addSacola = (produto) => {
    setSacola(prev => [...prev, produto]);
  };

  return (
    <div>
      <Navbar sacolaCount={sacola.length} />

      {/* Banner */}
      <section style={styles.banner}>
        <div style={styles.bannerContent}>
          <p style={styles.bannerSub}>✨ Encontre o presente perfeito</p>
          <h1 style={styles.bannerTitulo}>Kits para Presentear</h1>
          <p style={styles.bannerDesc}>Perfumes, cosméticos e kits especiais para toda ocasião</p>
          <div style={styles.bannerBotoes}>
            <Link href="/catalogo" style={styles.btnPrimario}>Ver Catálogo</Link>
            <Link href="/kits" style={styles.btnSecundario}>Montar Kit 🎁</Link>
          </div>
        </div>
      </section>

      {/* Atalhos rápidos */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitulo}>O que você procura?</h2>
        <div style={styles.atalhos}>
          {[
            { label: '👩 Feminino', href: '/catalogo?linha=feminino' },
            { label: '👨 Masculino', href: '/catalogo?linha=masculino' },
            { label: '👶 Baby', href: '/catalogo?linha=baby' },
            { label: '🎁 Kits', href: '/kits' },
          ].map(a => (
            <Link key={a.label} href={a.href} style={styles.atalho}>{a.label}</Link>
          ))}
        </div>
      </section>

      {/* Vitrine */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitulo}>Destaques da semana</h2>
        <div style={styles.grid}>
          {produtosDestaque.map(p => (
            <ProdutoCard key={p.id} produto={p} onAddSacola={addSacola} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>🌸 Lu Perfumes & Presentes</p>
        <p style={{ fontSize: 13, marginTop: 4, opacity: 0.7 }}>Feito com carinho 💛</p>
      </footer>
    </div>
  );
}

const styles = {
  banner: { background: 'linear-gradient(135deg, var(--verde) 0%, #9aab7a 100%)', color: '#fff', padding: '80px 24px', textAlign: 'center' },
  bannerContent: { maxWidth: 600, margin: '0 auto' },
  bannerSub: { fontSize: 14, opacity: 0.9, marginBottom: 12 },
  bannerTitulo: { fontSize: 42, fontWeight: 800, marginBottom: 12 },
  bannerDesc: { fontSize: 16, opacity: 0.85, marginBottom: 32 },
  bannerBotoes: { display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' },
  btnPrimario: { background: 'var(--rosa)', color: '#fff', padding: '14px 32px', borderRadius: 50, fontWeight: 700, fontSize: 15 },
  btnSecundario: { background: 'transparent', color: '#fff', padding: '14px 32px', borderRadius: 50, fontWeight: 700, fontSize: 15, border: '2px solid #fff' },
  section: { maxWidth: 1200, margin: '60px auto', padding: '0 24px' },
  sectionTitulo: { fontSize: 24, fontWeight: 700, marginBottom: 24, color: 'var(--texto)' },
  atalhos: { display: 'flex', gap: 16, flexWrap: 'wrap' },
  atalho: { background: '#fff', padding: '14px 28px', borderRadius: 50, fontWeight: 600, fontSize: 15, boxShadow: 'var(--sombra)', color: 'var(--texto)', transition: 'transform 0.2s' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 },
  footer: { background: 'var(--verde)', color: '#fff', textAlign: 'center', padding: '32px 24px', marginTop: 80 },
};