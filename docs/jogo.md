# Como funciona o Cidade Verde

Visão geral das regras e do fluxo para quem vai jogar ou manter o código.

## Objetivo

Você administra uma cidade por **12 turnos**. No fim do tempo (ou antes, se ficar sem dinheiro), o jogo avalia o resultado:

- **Vitória**: saldo não negativo e **cobertura de energia ≥ 70%** (energia gerada em relação à demanda).
- **Derrota por falência**: saldo abaixo de zero.
- **Derrota por cobertura**: tempo esgotado com cobertura abaixo de 70% e saldo ok.

A barra de progresso na tela do mapa acompanha a meta de 70%.

## Fluxo da partida

1. **Início** — Tela inicial; é possível ver histórico de partidas salvas no navegador.
2. **Personagem** — Nome do gestor e um dos líderes (cada um altera o **saldo inicial** com um bônus de verba, exceto o engenheiro, que é neutro).
3. **Região** — Nordeste, Sul, Sudeste ou Norte. Cada região define:
   - cidade inicial (nome, saldo base ~R$ 800, renda por turno);
   - **multiplicadores** de geração para solar, eólica e biomassa (o mesmo tipo de usina rende mais ou menos conforme o mapa);
   - **conjunto de eventos** possíveis naquela região.
4. **Mapa** — Aqui você compra usinas, vê estatísticas e **avança o turno**.

## Economia e construção

- **Saldo** cai ao comprar usinas na loja; **sobe** a cada turno avançado com a renda fixa da cidade (`turnIncome`), e alguns eventos concedem **bônus em dinheiro**.
- **Usinas** (solar, eólica, biomassa) são **produtoras**: cada uma tem capacidade base e custo; a energia efetiva depende da capacidade × multiplicador regional × efeitos do **evento do turno** (sol, vento, biomassa).
- No começo já existem **consumidores** (bairros, fábricas, etc.) que somam a **demanda**. Conforme os turnos passam, **novos consumidores entram automaticamente** na cidade, aumentando a demanda — é preciso ir ampliando a geração para não ficar para trás.

## Cobertura

A **cobertura** é, em termos simples, quanto da demanda está sendo atendida pela geração instalada (em %). Eventos podem aumentar temporariamente a demanda (bônus de demanda), o que puxa a cobertura para baixo até você compensar com mais usinas ou com sorte no clima.

## Turnos e eventos

Ao **avançar o turno**:

1. O número do turno aumenta (até o máximo).
2. Entra a **renda do turno** no saldo.
3. Um **evento** é sorteado (pesos diferentes por região): seca, onda de calor, ventania, temporada nublada, investimento, etc. Cada evento pode alterar multiplicadores de geração, demanda e, em alguns casos, o saldo.
4. Novos consumidores podem ser adicionados conforme a tabela de crescimento do jogo.
5. As estatísticas (energia, demanda, cobertura) são recalculadas.

Se o saldo ficar negativo em qualquer momento após uma compra, a partida pode encerrar na hora com derrota por falência.

## Onde isso está no código

- Estado e constantes globais do jogo: `src/game/createGameState.js` (12 turnos, meta 70%).
- Montagem da partida: `src/useCases/buildGame.js`.
- Compra: `src/useCases/buyBuilding.js`; avanço: `src/useCases/advanceTurn.js`; fim: `src/useCases/gameEnd.js`.
- Fórmula de energia e cobertura: `src/useCases/calcEnergy.js`.
- Crescimento da demanda por turno: `src/useCases/growConsumerDemand.js` e `src/data/demandGrowth.js`.
