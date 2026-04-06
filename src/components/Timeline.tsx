import { useEffect, useState, useRef } from "react";
import { getSessionRequests, replaySession } from "../api/client";
import type { Session, ApiRequest } from "../api/client";

interface Props {
  session: Session | null;
  onRequestSelect: (r: ApiRequest) => void;
  selectedRequest: ApiRequest | null;
}

const methodColors: Record<string, string> = {
  GET: "#00ff9d",
  POST: "#00d9ff",
  PUT: "#ffb800",
  DELETE: "#ff4560",
  PATCH: "#b87fff",
};

export default function Timeline({
  session,
  onRequestSelect,
  selectedRequest,
}: Props) {
  const [requests, setRequests] = useState<ApiRequest[]>([]);
  const [replaying, setReplaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);
  const replayingRef = useRef(false);

  const proxyBase = import.meta.env.VITE_API_URL || "http://localhost:8088";

  const filtered = requests.filter(
    (r) =>
      r.url.toLowerCase().includes(search.toLowerCase()) ||
      r.method.toLowerCase().includes(search.toLowerCase()) ||
      r.status_code.toString().includes(search),
  );

  // Status code summary
  const summary = {
    ok: requests.filter((r) => r.status_code >= 200 && r.status_code < 300)
      .length,
    redirect: requests.filter(
      (r) => r.status_code >= 300 && r.status_code < 400,
    ).length,
    error: requests.filter((r) => r.status_code >= 400).length,
  };

  // Max latency for bar visualization
  const maxLatency = Math.max(...requests.map((r) => r.latency_ms), 1);

  useEffect(() => {
    if (!session) return;
    setRequests([]);
    fetchRequests();
    const interval = setInterval(fetchRequests, 3000);
    return () => clearInterval(interval);
  }, [session]);

  const fetchRequests = async () => {
    if (!session) return;
    const res = await getSessionRequests(session.id);
    setRequests(res.data || []);
  };

  const copyProxyURL = () => {
    if (!session) return;
    const text = `Base proxy URL:\n${proxyBase}/proxy\n\nUsage:\ncurl "${proxyBase}/proxy/YOUR_PATH?session_id=${session.id}&target=YOUR_BASE_URL"\n\nExample:\ncurl "${proxyBase}/proxy/users/1?session_id=${session.id}&target=https://api.example.com"`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReplay = () => {
    if (!session || replayingRef.current) return;
    replayingRef.current = true;
    setReplaying(true);

    replaySession(session.id, speed)
      .then(() => {
        // Wait 2 seconds for backend to finish then refresh
        setTimeout(() => fetchRequests(), 2000);
      })
      .finally(() => {
        replayingRef.current = false;
        setReplaying(false);
      });
  };

  const exportAsCurl = () => {
    if (requests.length === 0) return;
    if (!session || requests.length === 0) return;
    const commands = requests
      .map((r) => {
        let cmd = `curl -X ${r.method} '${r.url}'`;
        if (r.headers) {
          Object.entries(r.headers).forEach(([k, v]) => {
            cmd += ` \\\n  -H '${k}: ${v}'`;
          });
        }
        if (r.body) {
          cmd += ` \\\n  -d '${r.body}'`;
        }
        return cmd;
      })
      .join("\n\n");

    const blob = new Blob([commands], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${session.name}-curl-commands.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center h-full text-[#4a6070] text-xs">
        Select a session to view requests
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e2d3d]">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold">{session.name}</span>
            <button
              onClick={copyProxyURL}
              className="text-[10px] px-2 py-1 rounded border border-[#1e2d3d] text-[#4a6070] hover:text-[#00d9ff] hover:border-[#00d9ff] transition-colors"
            >
              {copied ? "✅ Copied!" : "📋 Copy proxy URL"}
            </button>
          </div>
          <div className="text-[10px] text-[#4a6070] mt-0.5">
            {filtered.length} / {requests.length} requests
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="bg-[#0d1318] border border-[#1e2d3d] text-xs px-2 py-1 rounded text-[#c8dde8] focus:outline-none"
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={5}>5x</option>
          </select>
          <button
            onClick={exportAsCurl}
            disabled={requests.length === 0}
            className="bg-[#1e2d3d] text-[#c8dde8] text-xs font-bold px-3 py-1 rounded hover:bg-[#243344] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ↓ Export curl
          </button>
          <button
            onClick={handleReplay}
            disabled={replaying || requests.length === 0}
            className="bg-[#00ff9d] text-[#080c0f] text-xs font-bold px-3 py-1 rounded hover:bg-[#00d98a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {replaying ? "⏳ Replaying..." : "▶ Replay"}
          </button>
        </div>
      </div>

      {requests.length > 0 && (
        <div className="flex items-center gap-4 px-4 py-2 border-b border-[#1e2d3d] bg-[#0d1318]">
          <span className="text-[9px] tracking-widest text-[#4a6070] uppercase">
            Summary
          </span>
          {summary.ok > 0 && (
            <span className="text-[10px] text-[#00ff9d]">
              ✅ 2xx: {summary.ok}
            </span>
          )}
          {summary.redirect > 0 && (
            <span className="text-[10px] text-[#ffb800]">
              ↩ 3xx: {summary.redirect}
            </span>
          )}
          {summary.error > 0 && (
            <span className="text-[10px] text-[#ff4560]">
              ❌ 4xx/5xx: {summary.error}
            </span>
          )}
        </div>
      )}

      {/* Search bar */}
      <div className="px-4 py-2 border-b border-[#1e2d3d]">
        <input
          className="w-full bg-[#0d1318] border border-[#1e2d3d] rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#00d9ff] placeholder-[#4a6070]"
          placeholder="Filter by URL, method, status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Request list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 && (
          <div className="flex items-center justify-center h-full text-[#4a6070] text-xs">
            {requests.length === 0
              ? "No requests yet — send some traffic through the proxy"
              : "No requests match your filter"}
          </div>
        )}
        {filtered.map((r, i) => {
          const latencyPct = Math.round((r.latency_ms / maxLatency) * 100);
          const latencyColor =
            r.latency_ms > 1000
              ? "#ff4560"
              : r.latency_ms > 500
                ? "#ffb800"
                : "#00ff9d";

          return (
            <div
              key={r.id}
              onClick={() => onRequestSelect(r)}
              className={`flex items-center gap-3 px-4 py-3 border-b border-[#1e2d3d] cursor-pointer hover:bg-[#0d1318] transition-colors ${
                selectedRequest?.id === r.id
                  ? "bg-[#0d1318] border-l-2 border-l-[#00d9ff]"
                  : ""
              }`}
            >
              {/* Index */}
              <span className="text-[10px] text-[#4a6070] w-5 shrink-0">
                {i + 1}
              </span>

              {/* Method */}
              <span
                className="text-[10px] font-bold w-12 shrink-0"
                style={{ color: methodColors[r.method] || "#c8dde8" }}
              >
                {r.method}
              </span>

              {/* URL */}
              <span className="text-xs text-[#c8dde8] truncate flex-1">
                {r.url}
              </span>

              {/*Timestamp */}
              <span className="text-[10px] text-[#4a6070] w-16 text-right shrink-0">
                {new Date(r.timestamp).toLocaleTimeString()}
              </span>

              {/* Status */}
              <span
                className={`text-[10px] font-bold w-8 text-right shrink-0 ${
                  r.status_code >= 400
                    ? "text-[#ff4560]"
                    : r.status_code >= 300
                      ? "text-[#ffb800]"
                      : "text-[#00ff9d]"
                }`}
              >
                {r.status_code}
              </span>

              {/*Latency bar */}
              <div className="flex items-center gap-1 w-20 shrink-0">
                <div className="flex-1 h-1 bg-[#1e2d3d] rounded overflow-hidden">
                  <div
                    className="h-full rounded transition-all"
                    style={{
                      width: `${latencyPct}%`,
                      backgroundColor: latencyColor,
                    }}
                  />
                </div>
                <span className="text-[10px] text-[#4a6070] w-10 text-right">
                  {r.latency_ms}ms
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
