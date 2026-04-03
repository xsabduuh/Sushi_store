import { createContext, useContext, useEffect, useState } from "react";

interface SessionContextType { sessionId: string; }
const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    let id = localStorage.getItem("sushi_session_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("sushi_session_id", id);
    }
    setSessionId(id);
  }, []);

  if (!sessionId) return null;

  return (
    <SessionContext.Provider value={{ sessionId }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error("useSession must be used within SessionProvider");
  return context;
}