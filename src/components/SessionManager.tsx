import { useState, useEffect } from "react";
import {
  createSession,
  endSession,
  listSessions,
  deleteSession,
} from "../api/client";
import type { Session } from "../api/client";
import { getSessionRequests } from "../api/client";

interface Props {
  activeSession: Session | null;
  onSessionStart: (s: Session) => void;
  onSessionSelect: (s: Session) => void;
}

export default function SessionManager({
  activeSession,
  onSessionStart,
  onSessionSelect,
}: Props) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestCounts, setRequestCounts] = useState<Record<string, number>>(
    {},
  );

  const [apiUrl, setApiUrl] = useState(
    localStorage.getItem("api_url") ||
      import.meta.env.VITE_API_URL ||
      "http://localhost:8088",
  );
  const [editingUrl, setEditingUrl] = useState(false);

  const saveApiUrl = (url: string) => {
    localStorage.setItem("api_url", url);
    setApiUrl(url);
    setEditingUrl(false);
    window.location.reload(); // reload so axios picks up new base URL
  };

  const fetchCounts = async (sessions: Session[]) => {
    const counts: Record<string, number> = {};
    await Promise.all(
      sessions.map(async (s) => {
        const res = await getSessionRequests(s.id);
        counts[s.id] = (res.data || []).length;
      }),
    );
    setRequestCounts(counts);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    const res = await listSessions();
    setSessions(res.data);
    fetchCounts(res.data);
  };

  const handleStart = async () => {
    if (!name || !target) return;
    setLoading(true);
    const res = await createSession(name, target);
    onSessionStart(res.data);
    await fetchSessions();
    setName("");
    setTarget("");
    setLoading(false);
  };

  const handleEnd = async (id: string) => {
    await endSession(id);
    await fetchSessions();
  };

  const handleDelete = async (id: string) => {
    await deleteSession(id);
    await fetchSessions();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#1e2d3d]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-[#00d9ff] animate-pulse" />
          <span className="text-[10px] tracking-widest text-[#4a6070] uppercase">
            API Time Machine
          </span>
        </div>

        {/* Backend URL config */}
        {editingUrl ? (
          <div className="flex gap-2 mb-3">
            <input
              className="flex-1 bg-[#0d1318] border border-[#00d9ff] rounded px-3 py-1.5 text-xs focus:outline-none placeholder-[#4a6070]"
              defaultValue={apiUrl}
              placeholder="http://localhost:8088"
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  saveApiUrl((e.target as HTMLInputElement).value);
              }}
              autoFocus
            />
            <button
              onClick={() => setEditingUrl(false)}
              className="text-[10px] text-[#4a6070] px-2 hover:text-[#ff4560] transition-colors"
            >
              ✕
            </button>
          </div>
        ) : (
          <div
            onClick={() => setEditingUrl(true)}
            className="text-[9px] text-[#4a6070] mb-3 cursor-pointer hover:text-[#00d9ff] truncate transition-colors"
            title="Click to change backend URL"
          >
            🔌 {apiUrl}
          </div>
        )}

        <input
          className="w-full bg-[#0d1318] border border-[#1e2d3d] rounded px-3 py-2 text-xs mb-2 focus:outline-none focus:border-[#00d9ff] placeholder-[#4a6070]"
          placeholder="Session name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full bg-[#0d1318] border border-[#1e2d3d] rounded px-3 py-2 text-xs mb-3 focus:outline-none focus:border-[#00d9ff] placeholder-[#4a6070]"
          placeholder="Target URL (https://...)"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <button
          onClick={handleStart}
          disabled={loading || !name || !target}
          className="w-full bg-[#00d9ff] text-[#080c0f] text-xs font-bold py-2 rounded hover:bg-[#00b8d9] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Starting..." : "⏺ Start Recording"}
        </button>
      </div>

      {/* Session List */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-2 text-[9px] tracking-widest text-[#4a6070] uppercase border-b border-[#1e2d3d]">
          Sessions
        </div>
        {sessions.length === 0 && (
          <div className="px-4 py-6 text-xs text-[#4a6070] text-center">
            No sessions yet
          </div>
        )}
        {sessions.map((s) => (
          <div
            key={s.id}
            onClick={() => onSessionSelect(s)}
            className={`px-4 py-3 border-b border-[#1e2d3d] cursor-pointer hover:bg-[#0d1318] transition-colors ${activeSession?.id === s.id ? "bg-[#0d1318] border-l-2 border-l-[#00d9ff]" : ""}`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium truncate">{s.name}</span>
              <div className="flex items-center gap-2">
                {requestCounts[s.id] !== undefined && (
                  <span className="text-[9px] bg-[#1e2d3d] text-[#4a6070] px-1.5 py-0.5 rounded-full">
                    {requestCounts[s.id]}
                  </span>
                )}
                <div
                  className={`w-2 h-2 rounded-full ${s.ended_at ? "bg-[#4a6070]" : "bg-[#00ff9d] animate-pulse"}`}
                />
              </div>
            </div>
            <div className="text-[10px] text-[#4a6070] mb-2">
              {new Date(s.created_at).toLocaleString()}
            </div>
            <div className="flex items-center gap-3">
              {!s.ended_at && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEnd(s.id);
                  }}
                  className="text-[10px] text-[#ff4560] hover:text-red-400 transition-colors"
                >
                  ⏹ Stop
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(s.id);
                }}
                className="text-[10px] text-[#4a6070] hover:text-[#ff4560] transition-colors"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
