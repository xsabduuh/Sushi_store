import { createRoot } from "react-dom/client";
import App from "./app";
import "./index.css";

const root = document.getElementById("root")!;

window.onerror = (msg, src, line) => {
  root.innerHTML = `<div style="color:red;padding:20px;font-size:18px">
    ERROR: ${msg}<br/>Line: ${line}
  </div>`;
};

createRoot(root).render(<App />);
