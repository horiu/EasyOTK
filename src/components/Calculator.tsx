import { Card, Button, Group, Stack, Text, Container, Flex, Checkbox } from "@mantine/core";
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
    <Container size="md" p="md" className="max-w-2xl mx-auto">
      <Stack gap="lg">
        {/* 合計ダメージ表示 */}
        <Card shadow="sm" padding="xl" radius="md" withBorder bg="green.0" className="bg-green-50 border-green-200">
          <Stack gap="sm">
            <Text size="xl" fw={600} ta="center" className="text-green-800">
              総ダメージ: {totalDamage}
            </Text>
            <Group gap="lg" justify="center">
              <Text size="md" fw={500} className="text-green-700">
                必要PP: {requiredPP}
              </Text>
              <Text size="md" fw={500} className="text-green-700">
                現在のコンボ数: {currentCombo + rinoCount}
              </Text>
            </Group>
          </Stack>
        </Card>
        {/* アクションボタン */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Text size="lg" fw={600}>
              アクション
            </Text>{" "}
            {/* リノセウスボタン */}
            <Card shadow="xs" padding="sm" radius="md" withBorder>
              <Group gap="sm">
                <Button
                  size="lg"
                  color="green"
                  onClick={() => handleCardClick("rinoseus", "リノセウス", "normal")}
                  style={{ flex: 3 }}
                >
                  リノセウス
                </Button>{" "}
                <Button
                  size="md"
                  color="yellow"
                  variant="light"
                  onClick={() => handleCardClick("riノセウス(進化)", "evolution")}
                  style={{ flex: 1 }}
                >
                  進化
                </Button>
                <Button
                  size="md"
                  color="purple"
                  variant="light"
                  onClick={() => handleCardClick("rinoseus", "リノセウス(超進化)", "super-evolution")}
                  style={{ flex: 1 }}
                >
                  超進化
                </Button>
              </Group>
            </Card>
            {/* コストカードボタン */}
            <Group gap="sm">
              <Button size="md" color="blue" variant="outline" onClick={() => handleCardClick("cost", "0コスト")}>
                0コスト
              </Button>
              <Button size="md" color="blue" variant="outline" onClick={() => handleCardClick("cost", "1コスト")}>
                1コスト
              </Button>
              <Button size="md" color="blue" variant="outline" onClick={() => handleCardClick("cost", "2コスト")}>
                2コスト
              </Button>
              <Button size="md" color="blue" variant="outline" onClick={() => handleCardClick("cost", "3コスト")}>
                3コスト
              </Button>
            </Group>
            {/* 追加カードボタン */}
            <Group gap="sm">
              <Button size="md" color="orange" variant="outline" onClick={() => handleCardClick("cost", "4コスト")}>
                4コスト
              </Button>
              <Button size="md" color="orange" variant="outline" onClick={() => handleCardClick("cost", "5コスト")}>
                5コスト
              </Button>
              <Button
                size="md"
                color="purple"
                variant="outline"
                onClick={() => handleCardClick("cost", "ベビーカーバンクル")}
              >
                ベビーカーバンクル
              </Button>
              <Button size="md" color="purple" variant="outline" onClick={() => handleCardClick("cost", "虫の知らせ")}>
                虫の知らせ
              </Button>
            </Group>
            {/* 特殊カードボタン */}
            <Group gap="sm">
              <Button
                size="md"
                color="pink"
                variant="outline"
                onClick={() => handleCardClick("cost", "ベビーカーバンクル超進化")}
              >
                ベビーカーバンクル超進化
              </Button>
            </Group>
            {/* リセットボタン */}
            <Button size="lg" color="red" variant="outline" onClick={handleReset} mt="md">
              リセット
            </Button>
          </Stack>
        </Card>{" "}
        {/* 詳細設定 */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Text size="lg" fw={600}>
              詳細設定
            </Text>

            <Text size="md" fw={500}>
              加点ダメージ
            </Text>
            <Group gap="md">
              <Checkbox
                label="超進化当て +1"
                checked={superEvolutionHitChecked}
                onChange={(event) => setSuperEvolutionHitChecked(event.currentTarget.checked)}
              />
            </Group>
          </Stack>
        </Card>
        {/* 履歴表示 */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text size="lg" fw={600} mb="sm">
            履歴
          </Text>
          {cardHistory.length === 0 ? (
            <Text c="dimmed" ta="center" py="md">
              履歴なし
            </Text>
          ) : (
            <Flex gap="xs" wrap="wrap">
              {cardHistory.map((item, index) => (
                <Text key={item.id} size="sm" c="blue.6" fw={600} px="xs">
                  {item.cardName}
                  {item.cardType === "rinoseus" && ` (${item.damage})`}
                  {index < cardHistory.length - 1 && " → "}
                </Text>
              ))}
            </Flex>
          )}
        </Card>
      </Stack>
    </Container>
  );
};

export default Calculator;
