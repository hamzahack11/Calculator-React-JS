import React, {useState} from "react";
import Header from "./Components/Header.js"
import Keypad from "./Components/Keypad"
import "./App.css";
import dark from "./images/dark.png";
import sun from "./images/sun.png"


// Array for Allowed keys press by user
const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109];

const numbers=["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0" ];

const operators = ["-", "+", "*", "/"];

// Main Function
const App = () => {


  // State use for manipulating expression, result & history
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [history,setHistory]=useState([]);

    const handleKeyPress=(keyCode, key) =>{
      if(!keyCode)return;
      if(!usedKeyCodes.includes(keyCode))return;
     
      if(numbers.includes(key)){
        if(key ==="0"){
          if(expression.length===0)return;
        }calculateResult(expression + key);
        setExpression(expression+key)
        console.log("Number");
      }else if (operators.includes(key)){
        if(!expression)return;
        const lastChar=expression.slice(-1);
        if(operators.includes(lastChar))return;
        if(lastChar ===".")return;
        setExpression(expression+key);
        console.log("operator");
      }
      else if(key==="."){
        if(!expression)return
        const lastChar=expression.slice(-1);
        if(!numbers.includes(lastChar))return;
        setExpression(expression + key);
      }
      else if(keyCode===8){
        if(!expression)return;
        calculateResult(expression.slice(0,-1))
        setExpression(expression.slice(0,-1))
      }else if(keyCode===13){
        if(!expression)return;
       calculateResult(expression);

       let tempHistory=[...history];
       if(tempHistory.length>20) tempHistory = tempHistory.splice(0,1);
       tempHistory.push(expression);
       setHistory(tempHistory);
      }
    };

    // It calculate the result and set the output into Answer
    const calculateResult = (exp) =>{
      if(!exp){
        setResult("")
        return};
      const lastChar=exp.slice(-1);
      if(!numbers.includes(lastChar))exp=exp.slice(0,-1)
      const answer=  eval(exp).toFixed(2)+"";
      setResult(answer);
    };

  return (
    <div className="app" tabIndex="0" onKeyDown={(e)=>handleKeyPress(e.keyCode, e.key)}  data-theme={isDarkMode?"light":""}>
      <div className="app_calculator">
        <div className="app_calculator_navbar">
          <div className="app_calculator_navbar_toggle" onClick={()=>setIsDarkMode(!isDarkMode)}>
            <div className={`app_calculator_navbar_toggle_circle ${isDarkMode ? "app_calculator_navbar_toggle_circle_active" :""}`}/>
          </div>
          <img src={isDarkMode ?    sun : dark} className={isDarkMode?"img_move_left" : "img_move_right"} onClick={()=>setIsDarkMode(!isDarkMode)} alt="mode"/>
          
            <h2 className="heading">Calculator</h2>
        </div>
        <Header expression = {expression} result={result} history={history}/>
        <Keypad handleKeyPress={handleKeyPress}/>
      </div>
    </div>
  );
};

export default App;
