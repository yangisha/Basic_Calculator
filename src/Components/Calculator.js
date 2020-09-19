import React, { useState, useEffect } from "react";
import CalculatorKey from "./CalculatorKey";
import "./Calculator.css";

function Calculator() {
  const [histValue, setHistValue] = useState("0");
  const [prevValue, setPrevValue] = useState(null);
  const [nextValue, setNextValue] = useState("0");
  const [op, setOp] = useState(null);

  useEffect(() => {}, [op, nextValue, prevValue, histValue]);

  const CalculatorOperations = {
    "/": (firstValue, secondValue) => firstValue / secondValue,
    "*": (firstValue, secondValue) => firstValue * secondValue,
    "+": (firstValue, secondValue) => firstValue + secondValue,
    "-": (firstValue, secondValue) => firstValue - secondValue,
    "=": (firstValue, secondValue) => secondValue,
  };

  const performOperation = () => {
    let temp = CalculatorOperations[op](
      parseFloat(prevValue),
      parseFloat(nextValue)
    );
    setOp(null);
    setNextValue(String(temp));
    setPrevValue(null);
    if (histValue !== "0") {
      setHistValue(
        String(histValue) +
          String(prevValue) +
          "," +
          String(prevValue) +
          String(op) +
          String(nextValue) +
          "="
      );
    } else {
      setHistValue(String(prevValue) + String(op) + String(nextValue) + "=");
    }
  };

  const handleNum = (number) => {
    setNextValue(nextValue === "0" ? String(number) : nextValue + number);
  };

  const insertDot = () => {
    if (!/\./.test(nextValue)) {
      setNextValue(nextValue + ".");
    }
  };

  const percentage = () => {
    setNextValue(parseFloat(nextValue) / 100);
    if (prevValue && nextValue === "") {
      setPrevValue(parseFloat(prevValue) / 100);
    }
  };

  const changeSign = () => {
    setNextValue(parseFloat(nextValue) * -1);
  };

  const squareValue = () => {
    setNextValue(parseFloat(nextValue) ** 2);
    if (prevValue && nextValue === "") {
      setPrevValue(parseFloat(prevValue) ** 2);
    }
  };

  const squareRootValue = () => {
    setNextValue(parseFloat(nextValue) ** (1 / 2));
    if (prevValue && nextValue === "") {
      setPrevValue(parseFloat(prevValue) ** (1 / 2));
    }
  };

  const inverseValue = () => {
    setNextValue(1 / parseFloat(nextValue));
    if (prevValue && nextValue === "") {
      setPrevValue(1 / parseFloat(prevValue));
    }
  };

  const clearData = () => {
    setNextValue("0");
    setPrevValue(0);
    setHistValue("0");
  };

  const handleOperation = (value) => {
    if (Number.isInteger(value)) {
      handleNum(parseInt(value, 10));
    } else if (value in CalculatorOperations) {
      if (op === null) {
        setOp(value);
        setPrevValue(nextValue);
        setNextValue("");
      }
      if (op) {
        setOp(value);
      }
      if (prevValue && op && nextValue) {
        performOperation();
      }
    } else if (value === "C" || "CE") {
      clearData();
    } else if (value === "\xB1") {
      changeSign();
    } else if (value === ".") {
      insertDot();
    } else if (value === "+/-") {
    }
  };

  return (
    <div className="wrapper">
      <div className="hist">{histValue} </div>
      <div className="calculator-input">
        <div className="result">{nextValue} </div>
      </div>

      <div className="grid-container">
        <CalculatorKey
          className="grid-item key-op"
          keyValue={"%"}
          onClick={percentage}
        />
        <CalculatorKey
          className="grid-item key-op"
          keyValue={"CE"}
          onClick={handleOperation}
        />
        <CalculatorKey
          className="grid-item key-op"
          keyValue={"C"}
          onClick={handleOperation}
        />
        <CalculatorKey
          className="grid-item key-op"
          keyValue={"--"}
          onClick={handleOperation}
        />
        <CalculatorKey
          className="grid-item key-op"
          keyValue={"1/x"}
          onClick={inverseValue}
        />
        <CalculatorKey
          className="grid-item key-op"
          keyValue={"x^2"}
          onClick={squareValue}
        />
        <CalculatorKey
          className="grid-item key-op"
          keyValue={"x^(1/2)"}
          onClick={squareRootValue}
        />
        <CalculatorKey
          className="grid-item key-op"
          keyValue={"/"}
          onClick={handleOperation}
        />
        <CalculatorKey
          className="grid-item"
          keyValue={7}
          onClick={handleOperation}
        />
        <CalculatorKey
          className="grid-item"
          keyValue={8}
          onClick={handleOperation}
        />
        <CalculatorKey
          className="grid-item"
          keyValue={9}
          onClick={handleOperation}
        />
        <CalculatorKey
          className="grid-item key-op"
          keyValue={"*"}
          onClick={handleOperation}
        />
        <CalculatorKey
          className="grid-item"
          keyValue={4}
          onClick={handleOperation}
        />
        <CalculatorKey
          className="grid-item"
          keyValue={5}
          onClick={handleOperation}
        />
        <CalculatorKey
          className="grid-item"
          keyValue={6}
          onClick={handleOperation}
        />
        <CalculatorKey
          className="grid-item key-op"
          keyValue={"-"}
          onClick={handleOperation}
        />
        <CalculatorKey
          className="grid-item"
          keyValue={1}
          onClick={handleOperation}
        />
        <CalculatorKey
          className="grid-item"
          keyValue={2}
          onClick={handleOperation}
        />
        <CalculatorKey
          className="grid-item"
          keyValue={3}
          onClick={handleOperation}
        />
        <CalculatorKey
          className="grid-item key-op"
          keyValue={"+"}
          onClick={handleOperation}
        />
        <CalculatorKey
          className="grid-item"
          keyValue={"±"}
          onClick={handleOperation}
        />
        <CalculatorKey
          className="grid-item"
          keyValue={0}
          onClick={handleOperation}
        />
        <CalculatorKey
          className="grid-item"
          keyValue={"."}
          onClick={handleOperation}
        />
        <CalculatorKey
          className="grid-item key-op"
          keyValue={"="}
          onClick={handleOperation}
        />
      </div>
    </div>
  );
}

export default Calculator;
