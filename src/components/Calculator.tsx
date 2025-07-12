import { Container, Stack } from "@mantine/core";
import React from "react";
import { useCalculator } from "../hooks/useCalculator";
import { StatsDisplay } from "./StatsDisplay";
import { HistoryDisplay } from "./HistoryDisplay";
import { ActionPanel } from "./ActionPanel";

interface CalculatorProps {}

const Calculator: React.FC<CalculatorProps> = () => {
  const {
    superEvolutionHitChecked,
    cardHistory,
    stats,
    specialCardUsage,
    setSuperEvolutionHitChecked,
    addCard,
    reset,
  } = useCalculator();

  return (
    <Container size="md" px="sm" py="sm" className="mx-auto max-w-4xl px-2 sm:px-4 md:px-6">
      <Stack gap="md" className="md:space-y-2">
        {/* 合計ダメージ表示 */}
        <StatsDisplay stats={stats} />

        {/* 履歴表示 */}
        <HistoryDisplay cardHistory={cardHistory} />

        {/* アクション */}
        <ActionPanel
          hasAnySpecialCard={specialCardUsage.hasAnySpecialCard}
          superEvolutionHitChecked={superEvolutionHitChecked}
          onCardClick={addCard}
          onReset={reset}
          onSuperEvolutionHitChange={setSuperEvolutionHitChecked}
        />
      </Stack>
    </Container>
  );
};

export default Calculator;
