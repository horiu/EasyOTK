import { Card, Button, Group, Stack, Text, Container, Flex, Checkbox, Grid } from "@mantine/core";
import React, { useState } from "react";

interface CalculatorProps {}

interface CardPlayHistory {
  id: number;
  cardType: string;
  cardName: string;
  comboCount: number;
  damage: number;
  evolutionType?: "normal" | "evolution" | "super-evolution";
}

/**
 * カードプレイからダメージを計算する関数（進化ボーナス含む）
 */
const calculateCardDamage = (cardHistory: CardPlayHistory[], superEvolutionHitChecked: boolean = false): number => {
  let totalDamage = 0;
  let rinoCount = 0;

  cardHistory.forEach((card) => {
    if (card.cardType === "rinoseus") {
      rinoCount++;
      let cardDamage = card.comboCount + rinoCount;

      // 個別の進化ボーナスを適用
      if (card.evolutionType === "evolution") {
        cardDamage += 2;
      } else if (card.evolutionType === "super-evolution") {
        cardDamage += 3;
      }

      totalDamage += cardDamage;
    }
  });

  // 超進化当てボーナス（全体適用）
  if (superEvolutionHitChecked) totalDamage += 1;

  return totalDamage;
};

/**
 * 現在のコンボ数を計算する関数
 */
const calculateCurrentCombo = (cardHistory: CardPlayHistory[]): number => {
  return cardHistory.filter((card) => card.cardType !== "rinoseus").length;
};

/**
 * カード名からPPコストを取得する関数
 */
const getCardPPCost = (cardName: string): number => {
  const ppCosts: { [key: string]: number } = {
    "0コスト": 0,
    "1コスト": 1,
    "2コスト": 2,
    "3コスト": 3,
    "4コスト": 4,
    "5コスト": 5,
    リノセウス: 3,
    ベビーカーバンクル: 2,
    虫の知らせ: 1,
    ベビーカーバンクル超進化: -1,
  };
  return ppCosts[cardName] || 0;
};

/**
 * 履歴から必要PPを計算する関数
 */
const calculateRequiredPP = (cardHistory: CardPlayHistory[]): number => {
  return cardHistory.reduce((total, card) => total + getCardPPCost(card.cardName), 0);
};

const Calculator: React.FC<CalculatorProps> = () => {
  // 基本状態管理（Calculator_origin.tsxから）
  const [superEvolutionHitChecked, setSuperEvolutionHitChecked] = useState(false);

  // 新しいUI用の状態管理
  const [cardHistory, setCardHistory] = useState<CardPlayHistory[]>([]);
  const [nextId, setNextId] = useState<number>(1); // 計算
  const rinoCount = cardHistory.filter((card) => card.cardType === "rinoseus").length;

  // 履歴からの総ダメージ（進化ボーナス含む）
  const totalDamage = calculateCardDamage(cardHistory, superEvolutionHitChecked);
  const currentCombo = calculateCurrentCombo(cardHistory);
  const requiredPP = calculateRequiredPP(cardHistory); // カードボタンを押したときの処理
  const handleCardClick = (
    cardType: string,
    cardName: string,
    evolutionType?: "normal" | "evolution" | "super-evolution"
  ) => {
    const currentCombo = calculateCurrentCombo(cardHistory);
    let damage = 0;

    if (cardType === "rinoseus") {
      const rinoCount = cardHistory.filter((card) => card.cardType === "rinoseus").length + 1;
      damage = currentCombo + rinoCount;

      // 進化ボーナスを適用
      if (evolutionType === "evolution") {
        damage += 2;
      } else if (evolutionType === "super-evolution") {
        damage += 3;
      }
    }

    const newCard: CardPlayHistory = {
      id: nextId,
      cardType: cardType,
      cardName: cardName,
      comboCount: currentCombo,
      damage: damage,
      evolutionType: evolutionType || "normal",
    };

    setCardHistory([...cardHistory, newCard]);
    setNextId(nextId + 1);
  }; // リセット処理
  const handleReset = () => {
    setSuperEvolutionHitChecked(false);
    setCardHistory([]);
    setNextId(1);
  };
  return (
    <Container size="md" px="sm" py="sm" className="mx-auto min-h-screen max-w-4xl px-2 sm:px-4 md:px-6">
      <Stack gap="md" className="md:space-y-2">
        {/* 合計ダメージ表示 */}
        <Card shadow="sm" padding="md" radius="md" withBorder>
          <Group justify="space-between" align="center" wrap="nowrap" className="gap-2 sm:gap-4">
            <div className="flex-1 text-center">
              <Text size="sm" c="dimmed" className="text-xs sm:text-sm">
                総ダメージ
              </Text>
              <Text size="xl" fw={700} c="green.7" className="text-lg sm:text-xl md:text-2xl">
                {totalDamage}
              </Text>
            </div>
            <div className="flex-1 text-center">
              <Text size="sm" c="dimmed" className="text-xs sm:text-sm">
                必要PP
              </Text>
              <Text size="xl" fw={700} c="green.7" className="text-lg sm:text-xl md:text-2xl">
                {requiredPP}
              </Text>
            </div>
            <div className="flex-1 text-center">
              <Text size="sm" c="dimmed" className="text-xs sm:text-sm">
                コンボ数
              </Text>
              <Text size="xl" fw={700} c="green.7" className="text-lg sm:text-xl md:text-2xl">
                {currentCombo + rinoCount}
              </Text>
            </div>
          </Group>
        </Card>
        {/* 履歴表示 */}
        <Card shadow="sm" padding="md" radius="md" withBorder>
          {cardHistory.length === 0 ? (
            <Text c="dimmed" ta="center" py="md" className="text-sm">
              アクション履歴なし
            </Text>
          ) : (
            <Flex gap="xs" wrap="wrap" justify="center" className="text-center">
              {cardHistory.map((item, index) => (
                <Text key={item.id} size="sm" c="blue.6" fw={600} px="xs" className="text-xs sm:text-sm">
                  {item.cardName}
                  {item.cardType === "rinoseus" && ` (${item.damage})`}
                  {index < cardHistory.length - 1 && " → "}
                </Text>
              ))}
            </Flex>
          )}
        </Card>
        {/* アクション */}
        <Card shadow="sm" padding="md" radius="md" withBorder>
          <Group justify="space-between" align="center" mb="md">
            <Text size="lg" fw={600} c="green.9" className="text-base sm:text-lg">
              アクション
            </Text>
            <Button
              size="sm"
              color="red"
              variant="outline"
              onClick={handleReset}
              className="min-h-8 min-w-[80px] text-xs sm:min-h-10 sm:min-w-[100px] sm:text-sm"
            >
              リセット
            </Button>
          </Group>
          <Grid gutter="md" className="gap-3 md:gap-4">
            <Grid.Col span={12} className="flex flex-col">
              <Card shadow="xs" padding="sm" radius="md" withBorder className="flex h-full flex-col bg-gray-50">
                <Flex gap="xs" justify="flex-start" align="center" direction="row">
                  <Button
                    size="lg"
                    color="green"
                    onClick={() => handleCardClick("rinoseus", "リノセウス", "normal")}
                    fullWidth
                    className="min-h-12 p-1 text-sm sm:min-h-14 sm:text-base"
                  >
                    リノセウス
                  </Button>
                  <Button
                    size="sm"
                    color="yellow"
                    variant="light"
                    onClick={() => handleCardClick("rinoseus", "リノセウス(進化)", "evolution")}
                    className="min-h-10 min-w-[70px] text-xs sm:min-h-12 sm:min-w-[70px] sm:text-sm"
                  >
                    進化
                  </Button>
                  <Button
                    size="sm"
                    color="purple"
                    variant="light"
                    onClick={() => handleCardClick("rinoseus", "リノセウス(超進化)", "super-evolution")}
                    className="min-h-10 min-w-[80px] text-xs sm:min-h-12 sm:min-w-[80px] sm:text-sm"
                  >
                    超進化
                  </Button>
                </Flex>
              </Card>
            </Grid.Col>

            {/* コストカードボタン */}
            <Grid.Col span={12} className="flex flex-col">
              <Card shadow="xs" padding="sm" radius="md" withBorder className="flex h-full flex-col bg-gray-50">
                <Stack gap="sm" className="h-full">
                  <div className="space-y-2">
                    <Text size="sm" fw={500} mb="xs" c="gray.7" className="text-xs sm:text-sm">
                      カードコスト
                    </Text>
                    <Group gap="xs" grow className="grid grid-cols-4 gap-1 sm:gap-2">
                      <Button
                        size="compact-sm"
                        color="blue"
                        variant="outline"
                        onClick={() => handleCardClick("cost", "0コスト")}
                        className="min-h-9 text-xs sm:min-h-10 sm:text-sm"
                      >
                        0
                      </Button>
                      <Button
                        size="compact-sm"
                        variant="outline"
                        onClick={() => handleCardClick("cost", "1コスト")}
                        className="min-h-9 text-xs sm:min-h-10 sm:text-sm"
                      >
                        1
                      </Button>
                      <Button
                        size="compact-sm"
                        variant="outline"
                        onClick={() => handleCardClick("cost", "2コスト")}
                        className="min-h-9 text-xs sm:min-h-10 sm:text-sm"
                      >
                        2
                      </Button>
                      <Button
                        size="compact-sm"
                        variant="outline"
                        onClick={() => handleCardClick("cost", "3コスト")}
                        className="min-h-9 text-xs sm:min-h-10 sm:text-sm"
                      >
                        3
                      </Button>
                      <Button
                        size="compact-sm"
                        variant="outline"
                        onClick={() => handleCardClick("cost", "4コスト")}
                        className="min-h-9 text-xs sm:min-h-10 sm:text-sm"
                      >
                        4
                      </Button>
                      <Button
                        size="compact-sm"
                        variant="outline"
                        onClick={() => handleCardClick("cost", "5コスト")}
                        className="min-h-9 text-xs sm:min-h-10 sm:text-sm"
                      >
                        5
                      </Button>
                    </Group>
                  </div>{" "}
                  {/* 高コスト・特殊 */}
                  <div className="space-y-2">
                    <Text size="sm" fw={500} mb="xs" c="gray.7" className="text-xs sm:text-sm">
                      特殊
                    </Text>
                    <div className="space-y-2">
                      {" "}
                      <Group gap="xs" grow className="grid grid-cols-2 gap-1 sm:gap-2">
                        <Button
                          size="sm"
                          color="blue"
                          variant="outline"
                          onClick={() => handleCardClick("cost", "ベビーカーバンクル")}
                          className="min-h-9 px-1 text-xs sm:min-h-10 sm:text-sm"
                        >
                          カーバンクル
                        </Button>
                        <Button
                          size="sm"
                          color="blue"
                          variant="outline"
                          onClick={() => handleCardClick("cost", "虫の知らせ")}
                          className="min-h-9 px-1 text-xs sm:min-h-10 sm:text-sm"
                        >
                          虫の知らせ
                        </Button>
                      </Group>
                      <Button
                        size="sm"
                        color="purple"
                        variant="outline"
                        onClick={() => handleCardClick("cost", "ベビーカーバンクル超進化")}
                        fullWidth
                        className="min-h-9 px-1 text-xs sm:min-h-10 sm:text-sm"
                      >
                        カーバンクル超進化
                      </Button>
                    </div>
                  </div>
                </Stack>
              </Card>
            </Grid.Col>

            {/* 超進化当て設定 */}
            <Grid.Col span={12}>
              <Flex justify="start" align="center" py="sm">
                <Checkbox
                  label="超進化当て +1"
                  checked={superEvolutionHitChecked}
                  onChange={(event) => setSuperEvolutionHitChecked(event.currentTarget.checked)}
                  className="text-sm sm:text-base"
                />
              </Flex>
            </Grid.Col>
          </Grid>
        </Card>
      </Stack>
    </Container>
  );
};

export default Calculator;
