# Motel Dallas — Landing Page (v2)

Segunda versão da landing page do **Motel Dallas** (Cascavel, PR · desde 1985).
Estética cinematográfica dark-luxury: fundo preto profundo, tipografia serifada
(Bodoni Moda / Cormorant Garamond / Jost) e dourado como cor de destaque.

## Stack

Site estático — sem build. Apenas HTML, CSS e JavaScript puro.

```
index.html      → página única (PT-BR)
css/dallas.css  → estilo dark-luxury + grading das fotos
js/dallas.js    → nav, parallax do hero, reveals no scroll, modal das suítes
```

## Rodar localmente

Basta abrir o `index.html` no navegador, ou servir a pasta:

```bash
npx serve .
```

## Deploy

Projeto 100% estático — a Vercel detecta e publica direto, sem configuração de build.
O diretório raiz já contém o `index.html`.

## Seções

Hero · História (desde 1985) · Diferenciais · Suítes (4 categorias com modal e
preços) · Gastronomia 24h · Contato / WhatsApp.

> As fotos são placeholders de luxo (stock). Substituir pelas fotos reais das
> suítes, fachada e pratos quando disponíveis.
