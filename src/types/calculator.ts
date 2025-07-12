export interface CardPlayHistory {
  id: number;
  cardType: string;
  cardName: string;
  comboCount: number;
  damage: number;
  evolutionType?: "normal" | "evolution" | "super-evolution";
}

export interface CalculatorState {
  cardHistory: CardPlayHistory[];
  superEvolutionHitChecked: boolean;
  nextId: number;
}

export interface CalculatorStats {
  totalDamage: number;
  currentCombo: number;
  requiredPP: number;
  rinoCount: number;
}
