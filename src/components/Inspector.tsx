import type { ApiRequest } from "../api/client";

interface Props {
  request: ApiRequest | null;
}

const methodColors: Record<string, string> = {
  GET: "#00ff9d",
  POST: "#00d9ff",
  PUT: "#ffb800",
  DELETE: "#ff4560",
  PATCH: "#b87fff",
};

export default function Inspector({ request }: Props) {
  if (!request) {
    return (
      <div className="flex items-center justify-center h-full text-[#4a6070] text-xs">
        Select a request to inspect
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#1e2d3d]">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-xs font-bold"
            style={{ color: methodColors[request.method] || "#c8dde8" }}
          >
            {request.method}
          </span>
          <span
            className={`text-xs font-bold ${request.status_code >= 400 ? "text-[#ff4560]" : "text-[#00ff9d]"}`}
          >
            {request.status_code}
          </span>
          <span className="text-[10px] text-[#4a6070]">
            {request.latency_ms}ms
          </span>
        </div>
        <div className="text-[10px] text-[#4a6070] break-all">
          {request.url}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-2 border-b border-[#1e2d3d]">
          <div className="text-[9px] tracking-widest text-[#4a6070] uppercase mb-2">
            Headers
          </div>
          {request.headers && Object.keys(request.headers).length > 0 ? (
            Object.entries(request.headers).map(([k, v]) => (
              <div key={k} className="flex gap-2 mb-1">
                <span className="text-[10px] text-[#00d9ff] shrink-0">
                  {k}:
                </span>
                <span className="text-[10px] text-[#c8dde8] break-all">
                  {v}
                </span>
              </div>
            ))
          ) : (
            <div className="text-[10px] text-[#4a6070]">No headers</div>
          )}
        </div>

        {/* Body */}
        {request.body && (
          <div className="px-4 py-2 border-b border-[#1e2d3d]">
            <div className="text-[9px] tracking-widest text-[#4a6070] uppercase mb-2">
              Request Body
            </div>
            <pre className="text-[10px] text-[#c8dde8] whitespace-pre-wrap break-all bg-[#0d1318] p-2 rounded">
              {request.body}
            </pre>
          </div>
        )}

        {/* Response */}
        <div className="px-4 py-2">
          <div className="text-[9px] tracking-widest text-[#4a6070] uppercase mb-2">
            Response
          </div>
          <pre className="text-[10px] text-[#c8dde8] whitespace-pre-wrap break-all bg-[#0d1318] p-2 rounded">
            {request.response || "No response body"}
          </pre>
        </div>
      </div>
    </div>
  );
}
