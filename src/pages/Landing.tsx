import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#080c0f] text-[#c8dde8] font-mono flex flex-col">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-[#1e2d3d]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00d9ff] animate-pulse" />
          <span className="text-sm font-bold tracking-widest text-[#00d9ff] uppercase">
            API Time Machine
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/joss12/api-time-machin-web"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[#4a6070] hover:text-[#c8dde8] transition-colors"
          >
            GitHub
          </a>
          <button
            onClick={() => navigate("/app")}
            className="bg-[#00d9ff] text-[#080c0f] text-xs font-bold px-4 py-2 rounded hover:bg-[#00b8d9] transition-colors"
          >
            Launch App
          </button>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center flex-1 px-8 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-[#0d1318] border border-[#1e2d3d] rounded-full px-4 py-1.5 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse" />
          <span className="text-[10px] tracking-widest text-[#4a6070] uppercase">
            Open Source Devtool
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          A DVR for your <span className="text-[#00d9ff]">API traffic.</span>
        </h1>
        <p className="text-[#4a6070] text-sm max-w-xl mb-10 leading-relaxed">
          Record every request your app makes. Replay them in order. Inspect
          headers, bodies, and responses. Debug faster.
        </p>

        <div className="bg-[#0d1318] border border-[#1e2d3d] rounded-lg px-6 py-4 mb-10 text-left w-full max-w-xl">
          <div className="text-[9px] tracking-widest text-[#4a6070] uppercase mb-3">
            Quick start
          </div>
          <div className="text-xs text-[#4a6070] mb-1">
            1. Send requests through the proxy
          </div>
          <div className="text-xs text-[#00ff9d] mb-3 break-all">
            curl
            "YOUR_BACKEND/proxy/posts/1?session_id=YOUR_SESSION_ID&target=https://your-api.com"\
          </div>
          <div className="text-xs text-[#4a6070] mb-1">
            2. Watch them appear in the timeline
          </div>
          <div className="text-xs text-[#00d9ff] mb-3">
            GET /posts/1 --- 200 --- 43ms
          </div>
          <div className="text-xs text-[#4a6070] mb-1">
            3. Replay the entire session
          </div>
          <div className="text-xs text-[#00ff9d]">
            curl -X POST ".../api/sessions/YOUR_ID/replay?speed=2"
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/app")}
            className="bg-[#00d9ff] text-[#080c0f] text-sm font-bold px-6 py-3 rounded hover:bg-[#00b8d9] transition-colors"
          >
            Start Recording
          </button>
          <a
            href="https://github.com/joss12/api-time-machine-web"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-[#4a6070] hover:text-[#c8dde8] transition-colors border border-[#1e2d3d] px-6 py-3 rounded hover:border-[#243344]"
          >
            View on GitHub
          </a>
        </div>
      </div>

      <div className="px-8 py-16 border-t border-[#1e2d3d]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#0d1318] border border-[#1e2d3d] rounded-lg p-6 hover:border-[#243344] transition-colors">
            <div className="text-[10px] font-bold text-[#00d9ff] mb-3">
              [REC]
            </div>
            <div className="text-sm font-bold mb-2">Record</div>
            <div className="text-xs text-[#4a6070] leading-relaxed">
              Every request gets captured automatically. Method, headers, body,
              response.
            </div>
          </div>
          <div className="bg-[#0d1318] border border-[#1e2d3d] rounded-lg p-6 hover:border-[#243344] transition-colors">
            <div className="text-[10px] font-bold text-[#00d9ff] mb-3">
              [PLAY]
            </div>
            <div className="text-sm font-bold mb-2">Replay</div>
            <div className="text-xs text-[#4a6070] leading-relaxed">
              Re-fire a session at 0.5x, 1x, 2x, or 5x speed. Reproduce bugs
              exactly.
            </div>
          </div>
          <div className="bg-[#0d1318] border border-[#1e2d3d] rounded-lg p-6 hover:border-[#243344] transition-colors">
            <div className="text-[10px] font-bold text-[#00d9ff] mb-3">
              [INSPECT]
            </div>
            <div className="text-sm font-bold mb-2">Inspect</div>
            <div className="text-xs text-[#4a6070] leading-relaxed">
              Full headers, body, and response. Export as curl commands in one
              click.
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-16 border-t border-[#1e2d3d]">
        <div className="max-w-2xl mx-auto">
          <div className="text-[9px] tracking-widest text-[#4a6070] uppercase mb-8 text-center">
            How it works
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-[#0d1318] border border-[#1e2d3d] rounded-lg px-5 py-4">
              <span className="text-[10px] font-bold text-[#00d9ff] w-6 shrink-0">
                01
              </span>
              <span className="text-xs text-[#c8dde8]">
                Create a session with a name and your API base URL
              </span>
            </div>
            <div className="flex items-center gap-4 bg-[#0d1318] border border-[#1e2d3d] rounded-lg px-5 py-4">
              <span className="text-[10px] font-bold text-[#00d9ff] w-6 shrink-0">
                02
              </span>
              <span className="text-xs text-[#c8dde8]">
                Copy the proxy URL and send your requests through it
              </span>
            </div>
            <div className="flex items-center gap-4 bg-[#0d1318] border border-[#1e2d3d] rounded-lg px-5 py-4">
              <span className="text-[10px] font-bold text-[#00d9ff] w-6 shrink-0">
                03
              </span>
              <span className="text-xs text-[#c8dde8]">
                Watch requests appear in the timeline in real time
              </span>
            </div>
            <div className="flex items-center gap-4 bg-[#0d1318] border border-[#1e2d3d] rounded-lg px-5 py-4">
              <span className="text-[10px] font-bold text-[#00d9ff] w-6 shrink-0">
                04
              </span>
              <span className="text-xs text-[#c8dde8]">
                Replay, inspect, export — debug with full context
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-16 border-t border-[#1e2d3d] text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to debug smarter?</h2>
        <p className="text-xs text-[#4a6070] mb-8">
          Free and open source. No signup required.
        </p>
        <button
          onClick={() => navigate("/app")}
          className="bg-[#00ff9d] text-[#080c0f] text-sm font-bold px-8 py-3 rounded hover:bg-[#00d98a] transition-colors"
        >
          Launch App
        </button>
      </div>

      <footer className="px-8 py-6 border-t border-[#1e2d3d] flex items-center justify-between">
        <span className="text-[10px] text-[#4a6070]">
          API Time Machine - Open Source
        </span>
        <a
          href="https://github.com/joss12/api-time-machine-web"
          target="_blank"
          rel="noreferrer"
          className="text-[10px] text-[#4a6070] hover:text-[#c8dde8] transition-colors"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}
