import { CardPlayHistory } from "../types/calculator";
import { PP_COSTS, EVOLUTION_BONUSES, CARD_TYPES } from "../constants/calculator";

/**
 * カードプレイからダメージを計算する関数（進化ボーナス含む）
 */
export const calculateCardDamage = (
  cardHistory: CardPlayHistory[],
  superEvolutionHitChecked: boolean = false
): number => {
  let totalDamage = 0;
  let rinoCount = 0;

  cardHistory.forEach((card) => {
    if (card.cardType === CARD_TYPES.rinoseus) {
      rinoCount++;
      let cardDamage = card.comboCount + rinoCount;

      // 個別の進化ボーナスを適用
      if (card.evolutionType === "evolution") {
        cardDamage += EVOLUTION_BONUSES.evolution;
      } else if (card.evolutionType === "super-evolution") {
        cardDamage += EVOLUTION_BONUSES.superEvolution;
      }

      totalDamage += cardDamage;
    }
  });

  // 超進化当てボーナス（全体適用）
  if (superEvolutionHitChecked) {
    totalDamage += EVOLUTION_BONUSES.superEvolutionHit;
  }

  return totalDamage;
};

/**
 * 現在のコンボ数を計算する関数
 */
export const calculateCurrentCombo = (cardHistory: CardPlayHistory[]): number => {
  return cardHistory.filter((card) => card.cardType !== CARD_TYPES.rinoseus).length;
};

/**
 * カード名からPPコストを取得する関数
 */
export const getCardPPCost = (cardName: string): number => {
  return PP_COSTS[cardName] || 0;
};

/**
 * 履歴から必要PPを計算する関数
 */
export const calculateRequiredPP = (cardHistory: CardPlayHistory[]): number => {
  return cardHistory.reduce((total, card) => total + getCardPPCost(card.cardName), 0);
};

/**
 * リノセウスのダメージを計算する関数
 */
export const calculateRinoDamage = (
  currentCombo: number,
  rinoCount: number,
  evolutionType?: "normal" | "evolution" | "super-evolution"
): number => {
  let damage = currentCombo + rinoCount;

  if (evolutionType === "evolution") {
    damage += EVOLUTION_BONUSES.evolution;
  } else if (evolutionType === "super-evolution") {
    damage += EVOLUTION_BONUSES.superEvolution;
  }

  return damage;
};

/**
 * 特殊カードの使用状況をチェックする関数
 */
export const checkSpecialCardUsage = (cardHistory: CardPlayHistory[]) => {
  const hasEvolutionRino = cardHistory.some(
    (card) => card.cardType === CARD_TYPES.rinoseus && card.evolutionType === "evolution"
  );
  const hasSuperEvolutionRino = cardHistory.some(
    (card) => card.cardType === CARD_TYPES.rinoseus && card.evolutionType === "super-evolution"
  );
  const hasSuperEvolutionCarbuncle = cardHistory.some((card) => card.cardName === "ベビーカーバンクル超進化");

  return {
    hasEvolutionRino,
    hasSuperEvolutionRino,
    hasSuperEvolutionCarbuncle,
    hasAnySpecialCard: hasEvolutionRino || hasSuperEvolutionRino || hasSuperEvolutionCarbuncle,
  };
};
