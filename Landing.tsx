import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#080c0f] text-[#c8dde8] font-mono flex flex-col">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-[#1e2d3d]">
        <span className="text-sm font-bold text-[#00d9ff] uppercase tracking-widest">API Time Machine</span>
        <button onClick={() => navigate('/app')} className="bg-[#00d9ff] text-[#080c0f] text-xs font-bold px-4 py-2 rounded">
          Launch App
        </button>
      </nav>
      <div className="flex flex-col items-center justify-center flex-1 px-8 py-24 text-center">
        <h1 className="text-5xl font-bold mb-6">A DVR for your <span className="text-[#00d9ff]">API traffic.</span></h1>
        <p className="text-[#4a6070] text-sm max-w-xl mb-10">Record every request your app makes. Replay them in order. Inspect headers, bodies, and responses. Debug faster.</p>
        <div className="flex gap-4">
          <button onClick={() => navigate('/app')} className="bg-[#00d9ff] text-[#080c0f] text-sm font-bold px-6 py-3 rounded">Start Recording</button>
          <a href="https://github.com/joss12/api-time-machine" target="_blank" rel="noreferrer" className="text-sm text-[#4a6070] border border-[#1e2d3d] px-6 py-3 rounded">View on GitHub</a>
        </div>
      </div>
      <div className="px-8 py-16 border-t border-[#1e2d3d]">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8">
          <div className="bg-[#0d1318] border border-[#1e2d3d] rounded-lg p-6">
            <div className="text-xs font-bold text-[#00d9ff] mb-3">[REC]</div>
            <div className="text-sm font-bold mb-2">Record</div>
            <div className="text-xs text-[#4a6070]">Every request gets captured automatically. Method, headers, body, response.</div>
          </div>
          <div className="bg-[#0d1318] border border-[#1e2d3d] rounded-lg p-6">
            <div className="text-xs font-bold text-[#00d9ff] mb-3">[PLAY]</div>
            <div className="text-sm font-bold mb-2">Replay</div>
            <div className="text-xs text-[#4a6070]">Re-fire a session at 0.5x, 1x, 2x, or 5x speed. Reproduce bugs exactly.</div>
          </div>
          <div className="bg-[#0d1318] border border-[#1e2d3d] rounded-lg p-6">
            <div className="text-xs font-bold text-[#00d9ff] mb-3">[INSPECT]</div>
            <div className="text-sm font-bold mb-2">Inspect</div>
            <div className="text-xs text-[#4a6070]">Full headers, body, and response. Export as curl commands in one click.</div>
          </div>
        </div>
      </div>
      <footer className="px-8 py-6 border-t border-[#1e2d3d] flex items-center justify-between">
        <span className="text-[10px] text-[#4a6070]">API Time Machine - Open Source</span>
        <a href="https://github.com/joss12/api-time-machine" target="_blank" rel="noreferrer" className="text-[10px] text-[#4a6070]">GitHub</a>
      </footer>
    </div>
  )
}
