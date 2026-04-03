import { createRoot } from "react-dom/client";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

createRoot(rootElement).render(<div style={{color: 'white', fontSize: '2rem', padding: '2rem'}}>✅ التطبيق يعمل</div>);