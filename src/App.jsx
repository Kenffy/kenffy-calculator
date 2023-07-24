import { useState } from "react";
import "./App.css";

function App() {
  const [calculator, setCalculator] = useState({
    firstOperand: null,
    secondOperand: null,
    operator: "=",
  });

  const handleNumber = (number) => {
    if (
      calculator.secondOperand !== null &&
      calculator.secondOperand.length === 15
    )
      return;
    if (calculator.secondOperand === "0" && number === "0") return;
    if (calculator.secondOperand?.includes(",") && number === ",") return;

    let calc = {};
    if (calculator.secondOperand === null && number === ",") {
      calc = {
        ...calculator,
        secondOperand: "0,",
      };
    } else {
      calc = {
        ...calculator,
        secondOperand:
          calculator.secondOperand !== null
            ? calculator.secondOperand + number
            : number,
      };
    }
    setCalculator(calc);
  };

  const handleOperator = (operator) => {
    if (calculator.firstOperand === null && calculator.secondOperand === null) {
      return;
    }

    if (calculator.firstOperand === null) {
      const calc = {
        ...calculator,
        operator: operator,
        firstOperand: calculator.secondOperand,
        secondOperand: null,
      };
      setCalculator(calc);
    } else {
      const calc = {
        ...calculator,
        operator: operator,
      };
      setCalculator(calc);
    }

    if (calculator.secondOperand === null) {
      const calc = {
        ...calculator,
        operator: operator,
      };
      setCalculator(calc);
    }

    if (calculator.firstOperand !== null && calculator.secondOperand !== null) {
      const calc = {
        ...calculator,
        firstOperand: compute(),
        operator: operator,
        secondOperand: null,
      };
      setCalculator(calc);
    }
  };

  const handlePercent = () => {
    if (calculator.secondOperand !== null) {
      let secondOperand = parseFloat(calculator.secondOperand) * 0.01;
      if (secondOperand.toString().length > 7) {
        secondOperand = secondOperand.toFixed(7);
      }
      setCalculator({
        ...calculator,
        secondOperand: secondOperand.toString(),
      });
    }
  };

  const handlePlusMinus = () => {
    if (calculator.secondOperand !== null) {
      const secondOperand = -1 * parseFloat(calculator.secondOperand);
      setCalculator({ ...calculator, secondOperand: secondOperand.toString() });
    }
  };

  const handleDelete = () => {
    if (calculator.secondOperand === null) return;
    let secondOperand = calculator.secondOperand;
    if (secondOperand.length === 1) {
      secondOperand = null;
    } else {
      secondOperand = secondOperand.slice(0, secondOperand.length - 1);
    }
    setCalculator({
      ...calculator,
      secondOperand: secondOperand,
    });
  };

  const handleClear = () => {
    setCalculator({
      firstOperand: null,
      secondOperand: null,
      operator: "=",
    });
  };

  const handleCompute = () => {
    setCalculator({
      ...calculator,
      firstOperand: null,
      secondOperand: compute(),
    });
  };

  const format = (value) => {
    if (value === null) return;
    const sub = value.split(",");
    let formated = "";
    if (sub.length > 1) {
      formated = sub[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + sub[1];
    } else {
      formated = sub[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return formated;
  };

  const compute = () => {
    if (
      calculator.firstOperand !== null &&
      calculator.operator !== null &&
      calculator.secondOperand !== null
    ) {
      let result = "";
      const firstOperand = parseFloat(calculator.firstOperand);
      const secondOperand = parseFloat(calculator.secondOperand);

      if (isNaN(firstOperand) || isNaN(secondOperand)) {
        return result;
      }

      switch (calculator.operator) {
        case "+":
          result = firstOperand + secondOperand;
          break;
        case "-":
          result = firstOperand - secondOperand;
          break;
        case "x":
          result = firstOperand * secondOperand;
          break;
        case "÷":
          result =
            secondOperand > 0 ? firstOperand / secondOperand : "NOT ALLOW";
          break;
      }

      if (result.toString().length > 7) {
        result = result.toFixed(7);
      }

      return result.toString().replace(".", ",");
    }
  };

  return (
    <div className="container">
      <div className="calculator">
        <div className="screens">
          <span className="first-screen">
            {calculator.firstOperand !== null &&
              `${format(calculator.firstOperand)} ${calculator.operator}`}
          </span>
          <span
            className={`second-screen ${
              calculator.secondOperand !== null &&
              calculator.secondOperand.length > 9
                ? "small"
                : "normal"
            }`}
          >
            {calculator.secondOperand !== null &&
              format(calculator.secondOperand)}
          </span>
        </div>
        <div className="inputs">
          <button className="feature" onClick={() => handleClear()}>
            {"C"}
          </button>
          <button className="feature" onClick={() => handlePlusMinus()}>
            {"+/-"}
          </button>
          <button className="feature" onClick={() => handlePercent()}>
            {"%"}
          </button>
          <button className="feature" onClick={() => handleOperator("÷")}>
            {"÷"}
          </button>
          <button onClick={() => handleNumber("7")}>{"7"}</button>
          <button onClick={() => handleNumber("8")}>{"8"}</button>
          <button onClick={() => handleNumber("9")}>{"9"}</button>
          <button className="feature" onClick={() => handleOperator("x")}>
            {"x"}
          </button>
          <button onClick={() => handleNumber("4")}>{"4"}</button>
          <button onClick={() => handleNumber("5")}>{"5"}</button>
          <button onClick={() => handleNumber("6")}>{"6"}</button>
          <button className="feature" onClick={() => handleOperator("-")}>
            {"-"}
          </button>
          <button onClick={() => handleNumber("1")}>{"1"}</button>
          <button onClick={() => handleNumber("2")}>{"2"}</button>
          <button onClick={() => handleNumber("3")}>{"3"}</button>
          <button className="feature" onClick={() => handleOperator("+")}>
            {"+"}
          </button>
          <button onClick={() => handleNumber(",")}>{","}</button>
          <button onClick={() => handleNumber("0")}>{"0"}</button>
          <button onClick={() => handleDelete()}>{"⌫"}</button>
          <button className="feature" onClick={() => handleCompute()}>
            {"="}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
