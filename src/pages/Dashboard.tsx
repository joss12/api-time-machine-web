import { useState } from "react";
import SessionManager from "../components/SessionManager";
import Timeline from "../components/Timeline";
import Inspector from "../components/Inspector";
import type { Session, ApiRequest } from "../api/client";

type Tab = "sessions" | "timeline" | "inspector";

export default function Dashboard() {
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<ApiRequest | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<Tab>("sessions");

  const handleSessionSelect = (s: Session) => {
    setActiveSession(s);
    setActiveTab("timeline");
  };

  const handleRequestSelect = (r: ApiRequest) => {
    setSelectedRequest(r);
    setActiveTab("inspector");
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#080c0f] text-[#c8dde8] font-mono overflow-hidden">
      {/* Mobile tab bar */}
      <div className="flex md:hidden border-b border-[#1e2d3d] bg-[#0d1318]">
        {(["sessions", "timeline", "inspector"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-[10px] uppercase tracking-widest transition-colors ${
              activeTab === tab
                ? "text-[#00d9ff] border-b-2 border-[#00d9ff]"
                : "text-[#4a6070]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        <div className="w-72 border-r border-[#1e2d3d] flex flex-col">
          <SessionManager
            activeSession={activeSession}
            onSessionStart={handleSessionSelect}
            onSessionSelect={handleSessionSelect}
          />
        </div>
        <div className="flex-1 flex flex-col border-r border-[#1e2d3d]">
          <Timeline
            session={activeSession}
            onRequestSelect={handleRequestSelect}
            selectedRequest={selectedRequest}
          />
        </div>
        <div className="w-80 flex flex-col">
          <Inspector request={selectedRequest} />
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex md:hidden flex-1 overflow-hidden">
        {activeTab === "sessions" && (
          <div className="flex-1 flex flex-col">
            <SessionManager
              activeSession={activeSession}
              onSessionStart={handleSessionSelect}
              onSessionSelect={handleSessionSelect}
            />
          </div>
        )}
        {activeTab === "timeline" && (
          <div className="flex-1 flex flex-col">
            <Timeline
              session={activeSession}
              onRequestSelect={handleRequestSelect}
              selectedRequest={selectedRequest}
            />
          </div>
        )}
        {activeTab === "inspector" && (
          <div className="flex-1 flex flex-col">
            <Inspector request={selectedRequest} />
          </div>
        )}
      </div>
    </div>
  );
}
