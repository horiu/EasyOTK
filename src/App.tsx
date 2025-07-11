import Calculator from "./components/Calculator";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">SVW Brinocalc</h1>
          <p className="text-gray-600">シンプルで使いやすい計算アプリ</p>
        </header>

        <main className="flex justify-center">
          <Calculator />
        </main>

        <footer className="text-center mt-12 text-gray-500">
          <p>&copy; 2025 SVW Brinocalc. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
