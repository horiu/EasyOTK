import { useState } from "react";
import { CardPlayHistory, CalculatorStats } from "../types/calculator";
import {
  calculateCardDamage,
  calculateCurrentCombo,
  calculateRequiredPP,
  calculateRinoDamage,
  checkSpecialCardUsage,
} from "../utils/calculatorUtils";
import { CARD_TYPES } from "../constants/calculator";

export const useCalculator = () => {
  const [superEvolutionHitChecked, setSuperEvolutionHitChecked] = useState(false);
  const [cardHistory, setCardHistory] = useState<CardPlayHistory[]>([]);
  const [nextId, setNextId] = useState<number>(1);

  // 計算された値
  const rinoCount = cardHistory.filter((card) => card.cardType === CARD_TYPES.rinoseus).length;
  const totalDamage = calculateCardDamage(cardHistory, superEvolutionHitChecked);
  const currentCombo = calculateCurrentCombo(cardHistory);
  const requiredPP = calculateRequiredPP(cardHistory);

  // 特殊カード使用状況
  const specialCardUsage = checkSpecialCardUsage(cardHistory);

  // 統計情報
  const stats: CalculatorStats = {
    totalDamage,
    currentCombo: currentCombo + rinoCount,
    requiredPP,
    rinoCount,
  };

  // カードを追加する関数
  const addCard = (cardType: string, cardName: string, evolutionType?: "normal" | "evolution" | "super-evolution") => {
    const currentCombo = calculateCurrentCombo(cardHistory);
    let damage = 0;

    if (cardType === CARD_TYPES.rinoseus) {
      const nextRinoCount = rinoCount + 1;
      damage = calculateRinoDamage(currentCombo, nextRinoCount, evolutionType);
    }

    const newCard: CardPlayHistory = {
      id: nextId,
      cardType,
      cardName,
      comboCount: currentCombo,
      damage,
      evolutionType: evolutionType || "normal",
    };

    setCardHistory([...cardHistory, newCard]);
    setNextId(nextId + 1);
  };

  // リセット関数
  const reset = () => {
    setSuperEvolutionHitChecked(false);
    setCardHistory([]);
    setNextId(1);
  };

  return {
    // 状態
    superEvolutionHitChecked,
    cardHistory,
    stats,
    specialCardUsage,

    // アクション
    setSuperEvolutionHitChecked,
    addCard,
    reset,
  };
};
