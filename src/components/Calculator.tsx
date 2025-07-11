import React, { useState } from "react";

interface CalculatorProps {}

const Calculator: React.FC<CalculatorProps> = () => {
  const [display, setDisplay] = useState<string>("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState<boolean>(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      case "=":
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    if (operation && previousValue !== null) {
      const inputValue = parseFloat(display);
      const newValue = calculate(previousValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const buttons = [
    { label: "C", onClick: clear, className: "calc-button-operator col-span-2" },
    { label: "÷", onClick: () => inputOperation("÷"), className: "calc-button-operator" },
    { label: "×", onClick: () => inputOperation("×"), className: "calc-button-operator" },

    { label: "7", onClick: () => inputNumber("7"), className: "calc-button" },
    { label: "8", onClick: () => inputNumber("8"), className: "calc-button" },
    { label: "9", onClick: () => inputNumber("9"), className: "calc-button" },
    { label: "-", onClick: () => inputOperation("-"), className: "calc-button-operator" },

    { label: "4", onClick: () => inputNumber("4"), className: "calc-button" },
    { label: "5", onClick: () => inputNumber("5"), className: "calc-button" },
    { label: "6", onClick: () => inputNumber("6"), className: "calc-button" },
    { label: "+", onClick: () => inputOperation("+"), className: "calc-button-operator" },

    { label: "1", onClick: () => inputNumber("1"), className: "calc-button" },
    { label: "2", onClick: () => inputNumber("2"), className: "calc-button" },
    { label: "3", onClick: () => inputNumber("3"), className: "calc-button" },
    { label: "=", onClick: performCalculation, className: "calc-button-equals row-span-2" },

    { label: "0", onClick: () => inputNumber("0"), className: "calc-button col-span-2" },
    { label: ".", onClick: inputDecimal, className: "calc-button" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm mx-auto">
      {/* ディスプレイ */}
      <div className="bg-gray-900 text-white p-4 rounded-lg mb-4">
        <div className="text-right text-3xl font-mono overflow-hidden">{display}</div>
      </div>

      {/* ボタングリッド */}
      <div className="grid grid-cols-4 gap-3">
        {buttons.map((button, index) => (
          <button key={index} onClick={button.onClick} className={button.className}>
            {button.label}
          </button>
        ))}
      </div>

      {/* 追加機能エリア */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">便利機能</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              const result = Math.sqrt(parseFloat(display));
              setDisplay(String(result));
              setWaitingForNewValue(true);
            }}
            className="btn-secondary text-sm"
          >
            √
          </button>
          <button
            onClick={() => {
              const result = Math.pow(parseFloat(display), 2);
              setDisplay(String(result));
              setWaitingForNewValue(true);
            }}
            className="btn-secondary text-sm"
          >
            x²
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
