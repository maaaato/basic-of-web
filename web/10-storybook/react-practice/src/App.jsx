import { useState } from "react";
import { ColoredMessage } from "./components/ColoredMessage";

export const App = () => {
  const [ num, setNum ] = useState(0);
  const onClickButton = () => {
    // この例だとnumが2回インクリメントされるはずがされない。参照したnumの値を保持しているため。
    // setNum(num + 1); 
    // setNum(num + 1);  
    // prevを参照することで加算されたnumが参照できるようになる。こちらの書き方が良い。
    setNum((prev) => prev + 1);

  }

  const contentStyle = {
    color: "blue",
    fontSize: "20px"
  };

  return (
    <>
    <h1 style={contentStyle}>こんにちは</h1>
    <ColoredMessage color="pink" message="how are you" />
    <ColoredMessage color="blue">hi</ColoredMessage>
    <button onClick={onClickButton}>button</button>
    <p>{num}</p>
  </>
  );
};
