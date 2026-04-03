import { createRoot } from "react-dom/client";
import App from "./app";
import "./index.css";

const rootElement = document.getElementById("root")!;

try {
  const { createRoot: cr } = await import("react-dom/client");
  createRoot(rootElement).render(<App />);
} catch (e) {
  rootElement.innerHTML = `<h1 style="color:red;padding:20px">${e}</h1>`;
}
