import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import ProdutoCard from '../components/ProdutoCard';

const todosProdutos = [
    { id: 1, nome: 'Glamour Rose', marca: 'O Boticário', descricao: 'Floral sofisticado com notas de rosa e baunilha.', linha: 'feminino', tipo: 'floral', foto: '' },
    { id: 2, nome: 'Malbec Gold', marca: 'O Boticário', descricao: 'Amadeirado marcante, masculino e sofisticado.', linha: 'masculino', tipo: 'amadeirado', foto: '' },
    { id: 3, nome: 'Kaiak Feminino', marca: 'Natura', descricao: 'Fresco e natural, inspirado na natureza brasileira.', linha: 'feminino', tipo: 'citrico', foto: '' },
    { id: 4, nome: 'Kaiak Masculino', marca: 'Natura', descricao: 'Aquático e fresco para o homem moderno.', linha: 'masculino', tipo: 'citrico', foto: '' },
    { id: 5, nome: 'Kit Presente Baby', marca: 'Natura', descricao: 'Kit completo para bebês com produtos suaves.', linha: 'baby', tipo: 'doce', foto: '' },
    { id: 6, nome: 'Floratta Rose', marca: 'O Boticário', descricao: 'Delicado e romântico, perfeito para o dia a dia.', linha: 'feminino', tipo: 'floral', foto: '' },
    { id: 7, nome: 'Homem Quasar', marca: 'O Boticário', descricao: 'Fresco e intenso, para o homem ativo.', linha: 'masculino', tipo: 'citrico', foto: '' },
    { id: 8, nome: 'Tododia Kids', marca: 'Natura', descricao: 'Linha infantil suave e hidratante.', linha: 'kids', tipo: 'doce', foto: '' },
    { id: 9, nome: 'Lily Avon', marca: 'Avon', descricao: 'Floral frutal leve e feminino.', linha: 'feminino', tipo: 'frutal', foto: '' },
    { id: 10, nome: 'Lucky You', marca: 'Avon', descricao: 'Amadeirado suave com toque cítrico.', linha: 'masculino', tipo: 'amadeirado', foto: '' },
    { id: 11, nome: 'Essencial Feminino', marca: 'Natura', descricao: 'Clássico e sofisticado, com notas florais e amadeiradas.', linha: 'feminino', tipo: 'amadeirado', foto: '' },
    { id: 12, nome: 'Mary Kay Thinking of You', marca: 'Mary Kay', descricao: 'Doce e envolvente, para momentos especiais.', linha: 'feminino', tipo: 'doce', foto: '' },
];

const linhas = ['Todos', 'feminino', 'masculino', 'kids', 'baby'];
const marcas = ['Todos', 'O Boticário', 'Natura', 'Eudora', 'Avon', 'Mary Kay'];
const tipos = ['Todos', 'floral', 'amadeirado', 'citrico', 'doce', 'frutal'];

export default function Catalogo() {
    const router = useRouter();
    const [sacola, setSacola] = useState([]);
    const [filtroLinha, setFiltroLinha] = useState('Todos');
    const [filtroMarca, setFiltroMarca] = useState('Todos');
    const [filtroTipo, setFiltroTipo] = useState('Todos');
    const [busca, setBusca] = useState('');

    useEffect(() => {
        const salva = localStorage.getItem('sacola');
        if (salva) setSacola(JSON.parse(salva));
    }, []);

    // Pega filtros da URL (quando vem da navbar)
    useEffect(() => {
        if (router.query.linha) setFiltroLinha(router.query.linha);
        if (router.query.marca) setFiltroMarca(router.query.marca);
        if (router.query.tipo) setFiltroTipo(router.query.tipo);
    }, [router.query]);

    const addSacola = (produto) => {
        setSacola(prev => {
            const nova = [...prev, produto];
            localStorage.setItem('sacola', JSON.stringify(nova));
            return nova;
        });
    };

    const produtos = todosProdutos.filter(p => {
        const matchLinha = filtroLinha === 'Todos' || p.linha === filtroLinha;
        const matchMarca = filtroMarca === 'Todos' || p.marca === filtroMarca;
        const matchTipo = filtroTipo === 'Todos' || p.tipo === filtroTipo;
        const matchBusca = p.nome.toLowerCase().includes(busca.toLowerCase()) ||
            p.marca.toLowerCase().includes(busca.toLowerCase());
        return matchLinha && matchMarca && matchTipo && matchBusca;
    });

    const limparFiltros = () => {
        setFiltroLinha('Todos');
        setFiltroMarca('Todos');
        setFiltroTipo('Todos');
        setBusca('');
    };

    return (
        <div>
            <Navbar sacolaCount={sacola.length} />

            <main style={styles.main}>
                <div style={styles.topo}>
                    <h1 style={styles.titulo}>Catálogo 🌸</h1>
                    <input
                        style={styles.busca}
                        placeholder="🔍 Buscar produto ou marca..."
                        value={busca}
                        onChange={e => setBusca(e.target.value)}
                    />
                </div>

                <div style={styles.layout}>
                    {/* Sidebar de filtros */}
                    <aside style={styles.sidebar}>
                        <div style={styles.filtroGrupo}>
                            <h3 style={styles.filtroTitulo}>Por Linha</h3>
                            {linhas.map(l => (
                                <button
                                    key={l}
                                    style={{ ...styles.filtroBtn, background: filtroLinha === l ? 'var(--verde)' : 'transparent', color: filtroLinha === l ? '#fff' : 'var(--texto)' }}
                                    onClick={() => setFiltroLinha(l)}
                                >
                                    {l.charAt(0).toUpperCase() + l.slice(1)}
                                </button>
                            ))}
                        </div>

                        <div style={styles.filtroGrupo}>
                            <h3 style={styles.filtroTitulo}>Por Marca</h3>
                            {marcas.map(m => (
                                <button
                                    key={m}
                                    style={{ ...styles.filtroBtn, background: filtroMarca === m ? 'var(--verde)' : 'transparent', color: filtroMarca === m ? '#fff' : 'var(--texto)' }}
                                    onClick={() => setFiltroMarca(m)}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>

                        <div style={styles.filtroGrupo}>
                            <h3 style={styles.filtroTitulo}>Por Tipo</h3>
                            {tipos.map(t => (
                                <button
                                    key={t}
                                    style={{ ...styles.filtroBtn, background: filtroTipo === t ? 'var(--verde)' : 'transparent', color: filtroTipo === t ? '#fff' : 'var(--texto)' }}
                                    onClick={() => setFiltroTipo(t)}
                                >
                                    {t.charAt(0).toUpperCase() + t.slice(1)}
                                </button>
                            ))}
                        </div>

                        <button style={styles.limpar} onClick={limparFiltros}>
                            ✕ Limpar filtros
                        </button>
                    </aside>

                    {/* Grid de produtos */}
                    <div style={styles.conteudo}>
                        <p style={styles.resultado}>
                            {produtos.length} {produtos.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
                        </p>
                        {produtos.length === 0 ? (
                            <div style={styles.vazio}>
                                <p>Nenhum produto encontrado 😕</p>
                                <button style={styles.limpar} onClick={limparFiltros}>Limpar filtros</button>
                            </div>
                        ) : (
                            <div style={styles.grid}>
                                {produtos.map(p => (
                                    <ProdutoCard key={p.id} produto={p} onAddSacola={addSacola} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

const styles = {
    main: { maxWidth: 1200, margin: '40px auto', padding: '0 24px' },
    topo: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 },
    titulo: { fontSize: 28, fontWeight: 700, color: 'var(--texto)' },
    busca: { padding: '12px 20px', borderRadius: 50, border: '2px solid #eee', fontSize: 14, width: 300, outline: 'none', background: '#fff' },
    layout: { display: 'grid', gridTemplateColumns: '220px 1fr', gap: 40 },
    sidebar: { display: 'flex', flexDirection: 'column', gap: 8 },
    filtroGrupo: { marginBottom: 24 },
    filtroTitulo: { fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--verde)', marginBottom: 10 },
    filtroBtn: { display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: 8, border: 'none', fontSize: 14, cursor: 'pointer', marginBottom: 4, transition: 'all 0.2s' },
    limpar: { background: 'none', border: '1px solid #ddd', borderRadius: 8, padding: '8px 16px', fontSize: 13, color: '#999', cursor: 'pointer', marginTop: 8 },
    conteudo: { flex: 1 },
    resultado: { fontSize: 13, color: '#aaa', marginBottom: 20 },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 },
    vazio: { textAlign: 'center', padding: '60px 0', color: '#aaa' },
};