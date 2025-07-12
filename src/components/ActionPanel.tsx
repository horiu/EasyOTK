import { Button, Card, Checkbox, Flex, Grid, Group, Stack, Text } from "@mantine/core";
import { CARD_TYPES } from "../constants/calculator";

interface ActionPanelProps {
  hasAnySpecialCard: boolean;
  superEvolutionHitChecked: boolean;
  onCardClick: (cardType: string, cardName: string, evolutionType?: "normal" | "evolution" | "super-evolution") => void;
  onReset: () => void;
  onSuperEvolutionHitChange: (checked: boolean) => void;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({
  hasAnySpecialCard,
  superEvolutionHitChecked,
  onCardClick,
  onReset,
  onSuperEvolutionHitChange,
}) => {
  const costButtons = [0, 1, 2, 3, 4, 5].map((cost) => (
    <Button
      key={cost}
      size="compact-sm"
      color={cost === 0 ? "blue" : undefined}
      variant="outline"
      onClick={() => onCardClick(CARD_TYPES.cost, `${cost}コスト`)}
      className="min-h-9 text-xs sm:min-h-10 sm:text-sm"
    >
      {cost}
    </Button>
  ));

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Group justify="space-between" align="center" mb="md">
        <Text size="lg" fw={600} c="green.9" className="text-base sm:text-lg">
          アクション
        </Text>
        <Button
          size="sm"
          color="red"
          variant="outline"
          onClick={onReset}
          className="min-h-8 min-w-[80px] text-xs sm:min-h-10 sm:min-w-[100px] sm:text-sm"
        >
          リセット
        </Button>
      </Group>

      <Grid gutter="md" className="gap-3 md:gap-4">
        {/* リノセウスボタン */}
        <Grid.Col span={12} className="flex flex-col">
          <Card shadow="xs" padding="sm" radius="md" withBorder className="flex h-full flex-col">
            <Flex gap="xs" justify="flex-start" align="center" direction="row">
              <Button
                size="lg"
                color="green"
                variant="outline"
                onClick={() => onCardClick(CARD_TYPES.rinoseus, "リノセウス", "normal")}
                fullWidth
                className="min-h-12 p-1 text-sm sm:min-h-14 sm:text-base"
              >
                リノセウス
              </Button>
              <Button
                size="sm"
                color="yellow"
                variant="outline"
                onClick={() => onCardClick(CARD_TYPES.rinoseus, "リノセウス(進化)", "evolution")}
                disabled={hasAnySpecialCard}
                className="min-h-10 min-w-[70px] text-xs sm:min-h-12 sm:min-w-[70px] sm:text-sm"
              >
                進化
              </Button>
              <Button
                size="sm"
                color="purple"
                variant="outline"
                onClick={() => onCardClick(CARD_TYPES.rinoseus, "リノセウス(超進化)", "super-evolution")}
                disabled={hasAnySpecialCard}
                className="min-h-10 min-w-[80px] text-xs sm:min-h-12 sm:min-w-[80px] sm:text-sm"
              >
                超進化
              </Button>
            </Flex>
          </Card>
        </Grid.Col>

        {/* コストカードボタン */}
        <Grid.Col span={12} className="flex flex-col">
          <Card shadow="xs" padding="sm" radius="md" withBorder className="flex h-full flex-col">
            <Stack gap="sm" className="h-full">
              <div className="space-y-2">
                <Text size="sm" fw={500} mb="xs" c="gray.7" className="text-xs sm:text-sm">
                  カードコスト
                </Text>
                <Group gap="xs" grow className="grid grid-cols-4 gap-1 sm:gap-2">
                  {costButtons}
                </Group>
              </div>

              {/* 特殊カード */}
              <div className="space-y-2">
                <Text size="sm" fw={500} mb="xs" c="gray.7" className="text-xs sm:text-sm">
                  特殊
                </Text>
                <div className="space-y-2">
                  <Group gap="xs" grow className="grid grid-cols-2 gap-1 sm:gap-2">
                    <Button
                      size="sm"
                      color="blue"
                      variant="outline"
                      onClick={() => onCardClick(CARD_TYPES.cost, "ベビーカーバンクル")}
                      className="min-h-9 px-1 text-xs sm:min-h-10 sm:text-sm"
                    >
                      カーバンクル
                    </Button>
                    <Button
                      size="sm"
                      color="blue"
                      variant="outline"
                      onClick={() => onCardClick(CARD_TYPES.cost, "虫の知らせ")}
                      className="min-h-9 px-1 text-xs sm:min-h-10 sm:text-sm"
                    >
                      虫の知らせ
                    </Button>
                  </Group>
                  <Button
                    size="sm"
                    color="purple"
                    variant="outline"
                    onClick={() => onCardClick(CARD_TYPES.cost, "ベビーカーバンクル超進化")}
                    disabled={hasAnySpecialCard}
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
          <Flex justify="start" align="center">
            <Checkbox
              label="超進化当て +1"
              checked={superEvolutionHitChecked}
              onChange={(event) => onSuperEvolutionHitChange(event.currentTarget.checked)}
              className="text-sm sm:text-base"
            />
          </Flex>
        </Grid.Col>
      </Grid>
    </Card>
  );
};
