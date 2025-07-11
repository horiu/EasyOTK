import Calculator from "./components/Calculator";
import "./App.css";
import { Text, Title } from "@mantine/core";

function App() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-4">
        <header className="text-center">
          <p className="text-gray-600">
            {/* タイトル */}
            <Title order={1} ta="center" c="green">
              Easy OTK
            </Title>
            <Text ta="center" c="dimmed" size="lg">
              SVWBのリノセウス打点計算ツール
            </Text>
          </p>
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
