# Cidade Verde

Jogo web de gestão de cidade focado em **energia renovável**: você escolhe um líder, uma região brasileira e constrói usinas para acompanhar o crescimento da demanda enquanto lida com eventos climáticos.

## Requisitos

- [Node.js](https://nodejs.org/) (recomendado: versão LTS atual)

## Como rodar

### Interface no navegador (recomendado)

Na raiz do repositório:

```bash
npm install
npm run dev
```

O comando sobe um servidor estático apontando para a pasta `src`. Abra no navegador o endereço que o terminal mostrar (em geral `http://localhost:3000` ou similar) e use `index.html` se necessário.

Alternativa equivalente:

```bash
npm run serve
```

O jogo é **HTML + CSS + JavaScript (ES modules)**, sem build obrigatório: qualquer servidor estático que sirva `src/` com os caminhos corretos funciona.

### Demo em linha de comando (opcional)

Há um script que monta um estado mínimo e avança um turno para inspeção no terminal:

```bash
npm start
```

Isso executa `node src/demo/cli.js` e imprime um resumo no console. Útil para depuração, não substitui a experiência completa no navegador.

## Estrutura rápida

| Caminho | Conteúdo |
|---------|----------|
| `src/index.html` | Página principal e telas do fluxo |
| `src/app.js` | Entrada da UI (módulos dos componentes) |
| `src/components/` | Telas, mapa, loja, eventos, feedback |
| `src/useCases/` | Regras: compra, avanço de turno, fim de jogo, energia |
| `src/game/` | Estado inicial (`createGameState`) |
| `src/data/` | Regiões, prédios, eventos, avatares |

Documentação de regras e objetivos do jogo: [docs/jogo.md](docs/jogo.md).
