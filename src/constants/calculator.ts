export const PP_COSTS: { [key: string]: number } = {
  "0コスト": 0,
  "1コスト": 1,
  "2コスト": 2,
  "3コスト": 3,
  "4コスト": 4,
  "5コスト": 5,
  リノセウス: 3,
  "リノセウス(進化)": 3,
  "リノセウス(超進化)": 3,
  ベビーカーバンクル: 2,
  虫の知らせ: 1,
  ベビーカーバンクル超進化: -1,
};

export const EVOLUTION_BONUSES = {
  evolution: 2,
  superEvolution: 3,
  superEvolutionHit: 1,
} as const;

export const CARD_TYPES = {
  rinoseus: "rinoseus",
  cost: "cost",
} as const;

export const EVOLUTION_TYPES = {
  normal: "normal" as const,
  evolution: "evolution" as const,
  superEvolution: "super-evolution" as const,
};
