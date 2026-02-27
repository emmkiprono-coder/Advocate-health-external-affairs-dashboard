import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ── Types ──
type ResearchResult = {
  id: string;
  query: string;
  status: "running" | "done" | "error";
  answer: string;
  citations: { title: string; url: string }[];
  timestamp: string;
};

type QuickBrief = {
  id: string;
  topic: string;
  prompt: string;
  category: string;
};

// ── Pre-built Research Briefs ──
const quickBriefs: QuickBrief[] = [
  { id: "medicare", topic: "Medicare Payment & Reconciliation", prompt: "What are the latest developments in the 2026 congressional reconciliation bill affecting Medicare hospital payments, Medicaid restructuring, and site-neutral payment policies? What is the current status and what should large nonprofit health systems like Advocate Health be aware of?", category: "Government Relations" },
  { id: "340b", topic: "340B Drug Pricing Program Threats", prompt: "What are the latest developments with the 340B drug pricing program in 2026? Include pharmaceutical manufacturer restrictions on contract pharmacy, HRSA enforcement actions, and any pending legislation. How does this impact large nonprofit hospital systems?", category: "Policy & Advocacy" },
  { id: "telehealth", topic: "Telehealth Policy Extensions", prompt: "What is the current status of making COVID-era telehealth flexibilities permanent in 2026? Include the CONNECT for Health Act and any CMS or Congressional action. What are the implications for hospital-at-home programs?", category: "Policy & Advocacy" },
  { id: "workforce", topic: "Healthcare Workforce Legislation", prompt: "What are the latest federal and state legislative developments on healthcare workforce pipeline in 2026? Include GME slot expansion, visa pathways for international healthcare workers, nurse staffing ratio mandates, and loan forgiveness programs.", category: "Government Relations" },
  { id: "ai-reg", topic: "AI Healthcare Regulation", prompt: "What is the current regulatory landscape for AI in healthcare in 2026? Include ONC guidance, FDA oversight of clinical AI, and any Congressional activity on healthcare AI regulation. How are large health systems navigating this?", category: "Regulatory" },
  { id: "nonprofit-tax", topic: "Nonprofit Hospital Tax Exemption", prompt: "What is the latest Congressional and IRS scrutiny of nonprofit hospital tax exemptions in 2026? Include any proposals in the reconciliation bill, community benefit reporting requirements, and how large systems like Advocate Health are defending their tax-exempt status.", category: "Government Relations" },
  { id: "jcaho", topic: "Joint Commission Standards Updates", prompt: "What are the latest Joint Commission accreditation standards updates for 2026? Include any new requirements for hospital safety, quality reporting, and systemwide accreditation approaches.", category: "Regulatory" },
  { id: "medicaid", topic: "Medicaid Expansion & Managed Care", prompt: "What is the current status of Medicaid expansion, managed care transitions, and potential federal restructuring (per-capita caps, block grants) in 2026? Focus on developments in North Carolina, Georgia, Alabama, and Wisconsin.", category: "Government Relations" },
  { id: "surprise", topic: "No Surprises Act & IDR Updates", prompt: "What are the latest developments with the No Surprises Act independent dispute resolution (IDR) process in 2026? Include CMS guidance updates, backlog status, and impact on hospital systems.", category: "Regulatory" },
  { id: "media", topic: "Advocate Health Media Coverage", prompt: "What is the latest news coverage about Advocate Health in 2026? Include any stories from Becker's Hospital Review, Modern Healthcare, Fierce Healthcare, and local outlets in Chicago, Charlotte, and Wisconsin. What is the overall sentiment?", category: "Media & Comms" },
  { id: "cms-cop", topic: "CMS Conditions of Participation Updates", prompt: "What are the latest CMS hospital Conditions of Participation (CoP) proposed rule changes in 2026? What are the key provisions, comment period deadlines, and implications for large health systems?", category: "Regulatory" },
  { id: "aha-agenda", topic: "AHA 2026 Advocacy Agenda", prompt: "What are the key priorities in the American Hospital Association's 2026 advocacy agenda? How do they align with the interests of large nonprofit integrated health systems?", category: "Policy & Advocacy" },
];

// ── Agentic Research Function ──
async function runResearch(query: string): Promise<{ answer: string; citations: { title: string; url: string }[] }> {
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        system: `You are a healthcare policy research analyst supporting the External Affairs team at Advocate Health, the third-largest nonprofit health system in the United States (69 hospitals, 6 states, 160,000+ employees, $38B revenue). Provide concise, actionable intelligence briefs. Focus on: legislative/regulatory developments, policy implications for large nonprofit health systems, timeline urgency, and recommended actions. Be specific with dates, bill numbers, and sources. Format with clear sections using ** for bold headers. Keep responses focused and under 800 words.`,
        messages: [{ role: "user", content: query }],
        tools: [{ type: "web_search_20250305", name: "web_search" }],
      }),
    });

    const data = await response.json();
    
    // Extract text and citations from the response
    let answer = "";
    const citations: { title: string; url: string }[] = [];
    
    if (data.content) {
      for (const block of data.content) {
        if (block.type === "text") {
          answer += block.text;
        }
      }
    }

    // Extract citation URLs from the response if present
    if (data.content) {
      for (const block of data.content) {
        if (block.type === "text" && block.citations) {
          for (const cite of block.citations) {
            if (cite.url && !citations.find(c => c.url === cite.url)) {
              citations.push({ title: cite.title || cite.url, url: cite.url });
            }
          }
        }
      }
    }

    if (!answer) {
      answer = "Research completed but no text content was returned. The API may have returned tool-use blocks only. Try refining your query.";
    }

    return { answer, citations };
  } catch (error: any) {
    throw new Error(`Research failed: ${error.message}`);
  }
}

// ── Custom Research Input ──
function CustomResearchInput({ onSubmit }: { onSubmit: (query: string) => void }) {
  const [input, setInput] = useState("");
  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" && input.trim()) { onSubmit(input.trim()); setInput(""); } }}
        placeholder="Ask a custom research question about healthcare policy, regulation, or legislation..."
        className="flex-1 rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-2.5 text-[12px] text-white placeholder-slate-600 focus:outline-none focus:border-teal-500/40 focus:ring-1 focus:ring-teal-500/20"
      />
      <button
        onClick={() => { if (input.trim()) { onSubmit(input.trim()); setInput(""); } }}
        className="px-4 py-2.5 rounded-lg bg-teal-500/20 border border-teal-500/30 text-teal-400 text-[11px] font-bold hover:bg-teal-500/30 transition-colors whitespace-nowrap"
      >
        🔍 Research
      </button>
    </div>
  );
}

// ── Research Result Card ──
function ResultCard({ result, onRerun }: { result: ResearchResult; onRerun: () => void }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <Card className="bg-white/[0.02] border-white/[0.06]">
      <CardHeader className="pb-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {result.status === "running" && <span className="animate-pulse text-teal-400">⏳</span>}
            {result.status === "done" && <span className="text-emerald-400">✅</span>}
            {result.status === "error" && <span className="text-rose-400">❌</span>}
            <CardTitle className="text-[12px] font-bold text-slate-200 truncate cursor-pointer" onClick={() => setExpanded(!expanded)}>
              {result.query.length > 100 ? result.query.substring(0, 100) + "..." : result.query}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[9px] text-slate-600">{result.timestamp}</span>
            <button onClick={onRerun} className="text-[9px] text-teal-400/60 hover:text-teal-400 font-bold">↻ Rerun</button>
            <button onClick={() => setExpanded(!expanded)} className="text-[9px] text-slate-500 hover:text-slate-300">
              {expanded ? "▾" : "▸"}
            </button>
          </div>
        </div>
      </CardHeader>
      {expanded && (
        <CardContent>
          {result.status === "running" && (
            <div className="flex items-center gap-3 py-6 justify-center">
              <div className="flex gap-1">
                <div className="h-2 w-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="h-2 w-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="h-2 w-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <span className="text-[11px] text-slate-500">Searching the web and analyzing sources...</span>
            </div>
          )}
          {result.status === "done" && (
            <div>
              <div className="text-[11px] text-slate-300 leading-relaxed whitespace-pre-wrap research-content"
                dangerouslySetInnerHTML={{
                  __html: result.answer
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
                    .replace(/\n/g, '<br/>')
                }} />
              {result.citations.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/[0.04]">
                  <p className="text-[9px] text-slate-600 uppercase tracking-wider font-bold mb-1.5">📎 Sources</p>
                  <div className="flex flex-wrap gap-1.5">
                    {result.citations.map((c, i) => (
                      <a key={i} href={c.url} target="_blank" rel="noopener noreferrer"
                        className="text-[9px] text-teal-400/70 hover:text-teal-400 bg-teal-500/5 border border-teal-500/10 px-2 py-0.5 rounded transition-colors">
                        {c.title.length > 50 ? c.title.substring(0, 50) + "..." : c.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {result.status === "error" && (
            <p className="text-[11px] text-rose-400">{result.answer}</p>
          )}
        </CardContent>
      )}
    </Card>
  );
}

// ── Main Research Hub ──
export default function ResearchHub() {
  const [results, setResults] = useState<ResearchResult[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(quickBriefs.map(b => b.category)))];

  const filteredBriefs = selectedCategory === "all" 
    ? quickBriefs 
    : quickBriefs.filter(b => b.category === selectedCategory);

  const executeResearch = useCallback(async (query: string, id?: string) => {
    const resultId = id || `res-${Date.now()}`;
    const newResult: ResearchResult = {
      id: resultId,
      query,
      status: "running",
      answer: "",
      citations: [],
      timestamp: new Date().toLocaleTimeString(),
    };

    setResults(prev => {
      const existing = prev.findIndex(r => r.id === resultId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = newResult;
        return updated;
      }
      return [newResult, ...prev];
    });

    try {
      const { answer, citations } = await runResearch(query);
      setResults(prev => prev.map(r => r.id === resultId ? { ...r, status: "done", answer, citations } : r));
    } catch (error: any) {
      setResults(prev => prev.map(r => r.id === resultId ? { ...r, status: "error", answer: error.message } : r));
    }
  }, []);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/20 text-lg">🤖</div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight">Agentic Research Hub</h2>
            <p className="text-[11px] text-slate-500">AI-powered live web research with Claude Sonnet + web search. Click any topic or ask a custom question.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[8px] border-violet-500/20 text-violet-400 py-0.5">⚡ Live Web Search</Badge>
          <Badge variant="outline" className="text-[8px] border-teal-500/20 text-teal-400 py-0.5">🧠 Claude Sonnet</Badge>
        </div>
      </div>

      {/* Custom Research */}
      <Card className="bg-white/[0.02] border-white/[0.06]">
        <CardContent className="pt-4 pb-4">
          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-2">🔍 Custom Research Query</p>
          <CustomResearchInput onSubmit={(q) => executeResearch(q)} />
        </CardContent>
      </Card>

      {/* Quick Research Briefs */}
      <Card className="bg-white/[0.02] border-white/[0.06]">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-[11px] font-black text-slate-300">📋 Quick Research Briefs</CardTitle>
            <div className="flex gap-1">
              {categories.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded text-[9px] font-bold transition-colors ${selectedCategory === cat ? "bg-teal-500/20 text-teal-400 border border-teal-500/30" : "text-slate-600 hover:text-slate-400"}`}>
                  {cat === "all" ? "All" : cat}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {filteredBriefs.map((brief) => {
              const isRunning = results.some(r => r.id === brief.id && r.status === "running");
              return (
                <button
                  key={brief.id}
                  onClick={() => !isRunning && executeResearch(brief.prompt, brief.id)}
                  disabled={isRunning}
                  className={`text-left rounded-lg border p-3 transition-all ${
                    isRunning
                      ? "border-teal-500/30 bg-teal-500/[0.05] cursor-wait"
                      : "border-white/[0.06] bg-white/[0.015] hover:bg-teal-500/[0.04] hover:border-teal-500/20 cursor-pointer"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-bold text-slate-200">{brief.topic}</p>
                      <p className="text-[9px] text-slate-600 mt-0.5 uppercase tracking-wider">{brief.category}</p>
                    </div>
                    {isRunning ? (
                      <span className="animate-pulse text-teal-400 text-sm">⏳</span>
                    ) : (
                      <span className="text-slate-600 group-hover:text-teal-400 text-sm">→</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">📄 Research Results ({results.length})</p>
            <button onClick={() => setResults([])} className="text-[9px] text-slate-600 hover:text-rose-400 transition-colors font-bold">Clear All</button>
          </div>
          {results.map((result) => (
            <ResultCard key={result.id} result={result} onRerun={() => executeResearch(result.query, result.id)} />
          ))}
        </div>
      )}

      {/* Info Footer */}
      {results.length === 0 && (
        <div className="text-center py-8">
          <p className="text-[12px] text-slate-600 mb-1">Click any Quick Brief above or type a custom query to start live research.</p>
          <p className="text-[10px] text-slate-700">Results are generated in real-time using Claude with web search and are specific to healthcare policy and Advocate Health's context.</p>
        </div>
      )}
    </div>
  );
}
