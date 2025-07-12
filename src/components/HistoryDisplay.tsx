import { Card, Flex, Text } from "@mantine/core";
import { CardPlayHistory } from "../types/calculator";
import { CARD_TYPES } from "../constants/calculator";

interface HistoryDisplayProps {
  cardHistory: CardPlayHistory[];
}

export const HistoryDisplay: React.FC<HistoryDisplayProps> = ({ cardHistory }) => {
  const renderCardItem = (item: CardPlayHistory, index: number) => {
    let displayName = item.cardName;
    let textColor = "blue";

    // リノセウスの場合、進化段階に応じて色と表示名を設定
    if (item.cardType === CARD_TYPES.rinoseus) {
      displayName = "リノセウス";
      if (item.evolutionType === "normal") {
        textColor = "green";
      } else if (item.evolutionType === "evolution") {
        textColor = "yellow";
      } else if (item.evolutionType === "super-evolution") {
        textColor = "grape";
      }
    }

    // ベビーカーバンクル超進化の場合の特別な表示処理
    if (item.cardName === "ベビーカーバンクル超進化") {
      return (
        <Text key={item.id} size="sm" fw={600} px="xs" className="text-xs sm:text-sm">
          <Text component="span" c="grape.8" fw={600}>
            ベビーカーバンクル
          </Text>
          {index < cardHistory.length - 1 && " → "}
        </Text>
      );
    }

    return (
      <Text key={item.id} size="sm" c={textColor} fw={600} px="xs" className="text-xs sm:text-sm">
        {displayName}
        {item.cardType === CARD_TYPES.rinoseus && ` (${item.damage})`}
        {index < cardHistory.length - 1 && " → "}
      </Text>
    );
  };

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder classNames={{ root: "h-24" }}>
      {cardHistory.length === 0 ? (
        <Text c="dimmed" ta="center" py="md" className="text-sm">
          アクション履歴なし
        </Text>
      ) : (
        <Flex wrap="wrap" className="w-full overflow-x-auto text-center">
          {cardHistory.map(renderCardItem)}
        </Flex>
      )}
    </Card>
  );
};
