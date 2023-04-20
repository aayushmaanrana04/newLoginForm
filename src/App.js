import { useRef, useState } from "react";
import "./App.css";
import Form from "./Form";
import Users from "./users";

function App() {
  return (
    <div className={"App"}>
      <Form />
      <Users/>
    </div>
  );
}

export default App;
