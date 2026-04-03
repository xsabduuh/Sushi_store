import { createRoot } from "react-dom/client";
// لا تستورد أي CSS أو أي شيء آخر حاليًا

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("No root");

createRoot(rootElement).render(<h1 style={{color: 'white', backgroundColor: 'black', padding: '20px'}}>React يعمل!</h1>);