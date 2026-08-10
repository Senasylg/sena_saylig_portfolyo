/**
 * Kategori → renk değişkeni eşlemesi.
 *
 * Kullanım: elemana `style={categoryStyle(project.category)}` ver, sonra
 * `cat-chip` / `cat-text` / `card-hover` sınıfları bu rengi otomatik kullanır.
 * Renklerin kendisi src/styles/index.css içinde (--cat-*) tanımlıdır.
 */
const VARS = {
    design: 'var(--cat-design)',
    simulation: 'var(--cat-simulation)',
    software: 'var(--cat-software)',
    web: 'var(--cat-web)',
    research: 'var(--cat-research)',
}

export function categoryStyle(category) {
    return { '--cat': VARS[category] || 'var(--c-accent)' }
}

export default categoryStyle
