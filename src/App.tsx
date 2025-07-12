import Calculator from "./components/Calculator";
import { ActionIcon, Text, Title, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

function App() {
  // ダークモード切替用のhook
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <div className="min-h-screen">
      <div className="container mx-auto min-h-screen max-w-4xl py-2 sm:px-4 md:px-6">
        <header className="grid grid-cols-[1fr_10fr_1fr] items-center px-2 sm:px-4 md:px-6">
          <div></div>
          <div className="text-center">
            {/* タイトル */}
            <Title order={1} ta="center" c="green">
              Easy OTK
            </Title>
            <Text ta="center" c="dimmed" size="lg">
              SVWBのリノセウス打点計算ツール
            </Text>
          </div>
          <div className="flex justify-end">
            <ActionIcon
              onClick={toggleColorScheme}
              size="lg"
              variant="outline"
              color={dark ? "yellow" : "blue"}
              aria-label="ダークモード切替"
            >
              {dark ? <IconSun size={18} /> : <IconMoon size={18} />}
            </ActionIcon>
          </div>
        </header>

        <main className="flex justify-center">
          <Calculator />
        </main>

        <footer className="mt-12 text-center text-gray-500">
          <p>&copy; 2025 SVWBrinocalc. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
