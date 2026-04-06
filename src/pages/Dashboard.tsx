import { useState } from "react";
import SessionManager from "../components/SessionManager";
import Timeline from "../components/Timeline";
import Inspector from "../components/Inspector";
import type { Session, ApiRequest } from "../api/client";

export default function Dashboard() {
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<ApiRequest | null>(
    null,
  );

  return (
    <div className="flex h-screen w-screen bg-[#080c0f] text-[#c8dde8] font-mono overflow-hidden">
      <div className="w-72 border-r border-[#1e2d3d] flex flex-col">
        <SessionManager
          activeSession={activeSession}
          onSessionStart={setActiveSession}
          onSessionSelect={setActiveSession}
        />
      </div>
      <div className="flex-1 flex flex-col border-r border-[#1e2d3d]">
        <Timeline
          session={activeSession}
          onRequestSelect={(r) => setSelectedRequest(r)}
          selectedRequest={selectedRequest}
        />
      </div>
      <div className="w-80 flex flex-col">
        <Inspector request={selectedRequest} />
      </div>
    </div>
  );
}
