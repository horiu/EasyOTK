import Calculator from "./components/Calculator";
import { ActionIcon, Text, Title, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

function App() {
  // ダークモード切替用のhook
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto flex max-w-4xl flex-grow flex-col py-1 sm:px-4 md:px-6">
        <header className="mb-2 grid grid-cols-[10fr_1fr] items-center px-2 sm:px-4 md:px-6">
          <div className="ml-2 flex items-center justify-start gap-2">
            <img src="/EasyOTK_Logo.png" alt="Easy OTK Logo" className="h-8 w-8" />
            <Title order={1} ta="center" c="green" className="m-0">
              Easy OTK
            </Title>
          </div>
          <div className="flex justify-end">
            <ActionIcon
              onClick={toggleColorScheme}
              size="lg"
              variant="outline"
              color={dark ? "gray" : "gray"}
              aria-label="ダークモード切替"
            >
              {dark ? <IconSun size={18} /> : <IconMoon size={18} />}
            </ActionIcon>
          </div>
          <div className="ml-2">
            <Text ta="center" c="dimmed" className="flex justify-start text-xs sm:text-sm">
              SVWBのリノセウス打点計算ツール
            </Text>
          </div>
        </header>

        <main className="flex flex-grow flex-col justify-start">
          <Calculator />
        </main>
      </div>

      <footer className="mt-auto py-4 text-center text-gray-500">
        <div className="container mx-auto max-w-4xl px-2 sm:px-4 md:px-6">
          <p>
            &copy; 2025 Easy OTK. | Contact:{" "}
            <a
              href="https://x.com/dragthyp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-600"
            >
              @dragthyp
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
