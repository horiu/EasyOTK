import { Card, Group, Text } from "@mantine/core";
import { CalculatorStats } from "../types/calculator";

interface StatsDisplayProps {
  stats: CalculatorStats;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats }) => {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Group justify="space-between" align="center" wrap="nowrap" className="gap-2 sm:gap-4">
        <div className="flex-1 text-center">
          <Text size="sm" c="dimmed" className="text-xs sm:text-sm">
            総ダメージ
          </Text>
          <Text size="xl" fw={700} c="green.7" className="text-lg sm:text-xl md:text-2xl">
            {stats.totalDamage}
          </Text>
        </div>
        <div className="flex-1 text-center">
          <Text size="sm" c="dimmed" className="text-xs sm:text-sm">
            必要PP
          </Text>
          <Text size="xl" fw={700} c="green.7" className="text-lg sm:text-xl md:text-2xl">
            {stats.requiredPP}
          </Text>
        </div>
        <div className="flex-1 text-center">
          <Text size="sm" c="dimmed" className="text-xs sm:text-sm">
            コンボ数
          </Text>
          <Text size="xl" fw={700} c="green.7" className="text-lg sm:text-xl md:text-2xl">
            {stats.currentCombo}
          </Text>
        </div>
      </Group>
    </Card>
  );
};
