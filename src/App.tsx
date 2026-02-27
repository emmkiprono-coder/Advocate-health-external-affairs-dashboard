import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import * as D from "./data";
import ResearchHub from "./ResearchHub";

// ── Drill-down state type ──
type DrillItem = { title: string; content: any; source?: string; sourceType?: string };

// ── Helpers ──
function StatusBadge({ status }: { status: string }) {
  const m: Record<string, string> = {
    "Compliant": "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    "Active": "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    "Awarded": "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    "Participating": "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    "Active Collaboration": "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    "Confirmed": "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    "Completed": "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    "Passed Senate": "bg-teal-500/15 text-teal-300 border-teal-500/30",
    "Passed Assembly": "bg-teal-500/15 text-teal-300 border-teal-500/30",
    "Comment Period": "bg-rose-500/15 text-rose-300 border-rose-500/30",
    "Monitoring": "bg-amber-500/15 text-amber-300 border-amber-500/30",
    "Watching": "bg-amber-500/15 text-amber-300 border-amber-500/30",
    "Preparing": "bg-amber-500/15 text-amber-300 border-amber-500/30",
    "Varies": "bg-amber-500/15 text-amber-300 border-amber-500/30",
    "In Committee": "bg-sky-500/15 text-sky-300 border-sky-500/30",
    "Introduced": "bg-sky-500/15 text-sky-300 border-sky-500/30",
    "Applied": "bg-sky-500/15 text-sky-300 border-sky-500/30",
    "Submitted": "bg-violet-500/15 text-violet-300 border-violet-500/30",
    "Developing": "bg-violet-500/15 text-violet-300 border-violet-500/30",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap ${m[status] || "bg-slate-500/15 text-slate-300 border-slate-500/30"}`}>{status}</span>;
}
function PriorityDot({ p }: { p: string }) {
  const c: Record<string, string> = { "Critical": "bg-rose-400", "High": "bg-amber-400", "Medium": "bg-sky-400", "Low": "bg-slate-400" };
  return <span className="flex items-center gap-1.5 text-[10px] font-bold"><span className={`h-2 w-2 rounded-full ${c[p] || "bg-slate-400"}`} /><span className="text-slate-300">{p}</span></span>;
}
function SourceTag({ source, className = "" }: { source: string; className?: string }) {
  return <span className={`inline-flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider text-slate-600 ${className}`} title={`Data source: ${source}`}><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="opacity-50"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>{source}</span>;
}
function ClickableRow({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return <tr onClick={onClick} className="border-b border-white/[0.03] hover:bg-teal-500/[0.04] transition-colors cursor-pointer group">{children}</tr>;
}
function DrillIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-600 group-hover:text-teal-400 transition-colors shrink-0"><path d="M9 18l6-6-6-6"/></svg>;
}
function KPI({ emoji, label, value, sub, trend, color, onClick }: { emoji: string; label: string; value: string; sub?: string; trend?: string; color: string; onClick?: () => void; }) {
  return (
    <div onClick={onClick} className={`relative overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-4 ${onClick ? "cursor-pointer hover:border-teal-500/30 transition-colors" : ""}`}>
      <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full opacity-[0.06]" style={{ background: color }} />
      <div className="flex items-start justify-between"><div className="min-w-0"><p className="text-[9px] uppercase tracking-[0.18em] text-slate-500 font-extrabold">{label}</p><p className="mt-1 text-2xl font-black text-white tracking-tight">{value}</p>{sub && <p className="mt-0.5 text-[11px] text-slate-400">{sub}</p>}</div><span className="text-lg shrink-0">{emoji}</span></div>
      {trend && <p className="mt-2 text-[10px]"><span className={trend.startsWith("+") ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>{trend}</span><span className="text-slate-600 ml-1">vs prior year</span></p>}
      {onClick && <div className="absolute bottom-1.5 right-2 text-[7px] text-slate-700 font-bold uppercase tracking-wider">Click to drill down</div>}
    </div>
  );
}
function Section({ emoji, title, sub, source }: { emoji: string; title: string; sub: string; source?: string }) {
  return <div className="flex items-center justify-between mb-5"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/10 border border-teal-500/20 text-lg">{emoji}</div><div><h2 className="text-lg font-black text-white tracking-tight">{title}</h2><p className="text-[11px] text-slate-500">{sub}</p></div></div>{source && <SourceTag source={source} className="hidden md:flex" />}</div>;
}
function Tip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return <div className="rounded-lg border border-white/10 bg-[#0c1322] px-3 py-2 shadow-2xl z-50"><p className="text-[10px] font-bold text-slate-400 mb-1">{label}</p>{payload.map((p: any, i: number) => <p key={i} className="text-[10px] font-bold" style={{ color: p.color }}>{p.name}: {typeof p.value === "number" ? p.value.toLocaleString() : p.value}</p>)}</div>;
}
function TH({ children }: { children: React.ReactNode }) { return <th className="text-left py-2 px-2.5 text-slate-500 font-extrabold uppercase tracking-wider text-[8px]">{children}</th>; }
function TD({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <td className={`py-2 px-2.5 text-[11px] ${className}`}>{children}</td>; }

const C = D.COLORS; const CP = D.CP;
const tabs = [
  { id: "overview", label: "Executive Overview" },
  { id: "govrel", label: "Gov Relations" },
  { id: "regulatory", label: "Regulatory" },
  { id: "community", label: "Community" },
  { id: "media", label: "Media" },
  { id: "policy", label: "Policy" },
  { id: "stakeholders", label: "Stakeholders" },
  { id: "research", label: "🤖 Research Hub" },
];

export default function App() {
  const [tab, setTab] = useState("overview");
  const [drill, setDrill] = useState<DrillItem | null>(null);
  const openDrill = (d: DrillItem) => setDrill(d);
  const closeDrill = () => setDrill(null);

  return (
    <div className="min-h-screen bg-[#060b18] text-white" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* Drill-down Dialog */}
      <Dialog open={!!drill} onOpenChange={() => closeDrill()}>
        <DialogContent className="bg-[#0c1424] border-white/10 text-white max-w-2xl max-h-[85vh] overflow-y-auto">
          {drill && (<>
            <DialogHeader>
              <DialogTitle className="text-lg font-black text-white">{drill.title}</DialogTitle>
              {drill.source && <div className="flex items-center gap-2 mt-1.5"><span className="text-[9px] font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">📎 Data Source</span><span className="text-[11px] text-slate-400">{drill.source}</span>{drill.sourceType && <Badge variant="outline" className="text-[8px] border-white/10 text-slate-500 py-0 h-4">{drill.sourceType}</Badge>}</div>}
            </DialogHeader>
            <Separator className="bg-white/[0.06] my-2" />
            <div className="space-y-3">
              {typeof drill.content === "string" ? <p className="text-[12px] text-slate-300 leading-relaxed">{drill.content}</p>
              : Array.isArray(drill.content) ? drill.content.map((item: any, i: number) => (
                <div key={i} className="flex items-start justify-between rounded-lg bg-white/[0.03] border border-white/[0.04] p-3">
                  <div><p className="text-[11px] font-bold text-slate-200">{item.metric || item.label || item.name || item.field}</p>{item.detail && <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{item.detail}</p>}{item.period && <p className="text-[9px] text-slate-600 mt-0.5 uppercase tracking-wider">{item.period}</p>}</div>
                  {item.value && <span className="text-[13px] font-black text-white shrink-0 ml-3">{item.value}</span>}
                </div>
              )) : <div className="text-[12px] text-slate-300 leading-relaxed">{drill.content}</div>}
            </div>
          </>)}
        </DialogContent>
      </Dialog>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#060b18]/95 backdrop-blur-xl">
        <div className="mx-auto max-w-[1440px] px-5 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg shadow-teal-500/20 flex items-center justify-center text-lg font-black text-white">A</div>
              <div><h1 className="text-lg font-black tracking-tight">External Affairs Dashboard</h1><p className="text-[9px] uppercase tracking-[0.25em] text-teal-400/60 font-bold">Advocate Health · Enterprise · Rewire 2030</p></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-4 text-[10px] text-slate-500 font-bold"><span>🏥 69 Hospitals</span><span className="text-white/[0.08]">|</span><span>📍 6 States</span><span className="text-white/[0.08]">|</span><span>👥 160K+</span></div>
              <div className="rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 text-[10px] text-slate-400 font-semibold">Feb 26, 2026</div>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-white/[0.06] bg-white/[0.01] overflow-x-auto">
        <div className="mx-auto max-w-[1440px] px-5 flex gap-0">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`whitespace-nowrap px-3.5 py-2.5 text-[11px] font-bold border-b-2 transition-all ${
                t.id === "research"
                  ? tab === t.id ? "border-violet-400 text-violet-400 bg-violet-400/[0.04]" : "border-transparent text-violet-400/50 hover:text-violet-300"
                  : tab === t.id ? "border-teal-400 text-teal-400 bg-teal-400/[0.04]" : "border-transparent text-slate-500 hover:text-slate-300"
              }`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <main className="mx-auto max-w-[1440px] px-5 py-5">

        {/* ═══════════ EXECUTIVE OVERVIEW ═══════════ */}
        {tab === "overview" && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {D.enterpriseKPIs.map((k, i) => (
                <KPI key={i} {...k} onClick={() => openDrill({ title: k.label, content: k.drilldown, source: k.source, sourceType: k.sourceType })} />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <Card className="bg-white/[0.02] border-white/[0.06]">
                <CardHeader className="pb-0"><div className="flex items-center justify-between"><CardTitle className="text-[11px] font-black text-slate-300">🎯 External Affairs Maturity</CardTitle><SourceTag source="Internal Assessment" /></div></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={260}>
                    <RadarChart data={[{ axis: "Gov Rel", v: 92 },{ axis: "Regulatory", v: 95 },{ axis: "Community", v: 88 },{ axis: "Media", v: 90 },{ axis: "Policy", v: 85 },{ axis: "Stakeholders", v: 87 }]} cx="50%" cy="50%" outerRadius="66%">
                      <PolarGrid stroke="#ffffff08" /><PolarAngleAxis dataKey="axis" tick={{ fill: "#94a3b8", fontSize: 9, fontWeight: 700 }} /><PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} /><Radar dataKey="v" stroke={C.teal} fill={C.teal} fillOpacity={0.12} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="col-span-1 lg:col-span-2 bg-white/[0.02] border-white/[0.06]">
                <CardHeader className="pb-0"><div className="flex items-center justify-between"><CardTitle className="text-[11px] font-black text-slate-300">⚠️ Priority Alerts</CardTitle><SourceTag source="Multi-source" /></div></CardHeader>
                <CardContent><ScrollArea className="h-[240px]"><div className="space-y-2 pt-1">
                  {D.alerts.map((a, i) => (
                    <div key={i} onClick={() => openDrill({ title: `Alert: ${a.domain}`, content: a.msg, source: a.source })} className="flex items-start gap-2.5 rounded-lg bg-white/[0.015] border border-white/[0.04] p-2.5 cursor-pointer hover:bg-teal-500/[0.03] transition-colors group">
                      <PriorityDot p={a.severity} />
                      <div className="flex-1 min-w-0"><p className="text-[11px] text-slate-300 leading-relaxed">{a.msg}</p><div className="flex items-center gap-3 mt-1"><span className="text-[9px] text-slate-600 uppercase tracking-wider font-bold">{a.domain}</span><span className="text-[9px] text-amber-400/70 font-bold">Due: {a.due}</span><SourceTag source={a.source} /></div></div>
                      <DrillIcon />
                    </div>
                  ))}
                </div></ScrollArea></CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <Card className="bg-white/[0.02] border-white/[0.06]"><CardHeader className="pb-0"><div className="flex items-center justify-between"><CardTitle className="text-[11px] font-black text-slate-300">📈 Community Benefit ($B)</CardTitle><SourceTag source="IRS Schedule H / CB Report" /></div></CardHeader><CardContent><ResponsiveContainer width="100%" height={210}><AreaChart data={D.communityBenefitTrend}><CartesianGrid stroke="#ffffff06" /><XAxis dataKey="year" tick={{ fill: "#64748b", fontSize: 10 }} /><YAxis tick={{ fill: "#64748b", fontSize: 10 }} tickFormatter={v => `$${v}B`} domain={[4, 7]} /><ReTooltip content={<Tip />} /><Area type="monotone" dataKey="amount" stroke={C.teal} fill={C.teal} fillOpacity={0.15} strokeWidth={2} name="Amount ($B)" /></AreaChart></ResponsiveContainer></CardContent></Card>
              <Card className="bg-white/[0.02] border-white/[0.06]"><CardHeader className="pb-0"><div className="flex items-center justify-between"><CardTitle className="text-[11px] font-black text-slate-300">🏛️ Lobbying Trend ($M)</CardTitle><SourceTag source="OpenSecrets / Senate OPR" /></div></CardHeader><CardContent><ResponsiveContainer width="100%" height={210}><BarChart data={D.lobbyingTrend}><CartesianGrid stroke="#ffffff06" /><XAxis dataKey="year" tick={{ fill: "#64748b", fontSize: 10 }} /><YAxis tick={{ fill: "#64748b", fontSize: 10 }} tickFormatter={v => `$${v}M`} /><ReTooltip content={<Tip />} /><Bar dataKey="federal" stackId="a" fill={C.sky} name="Federal" /><Bar dataKey="state" stackId="a" fill={C.violet} name="State" radius={[3, 3, 0, 0]} /><Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 10 }} /></BarChart></ResponsiveContainer></CardContent></Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <Card className="bg-white/[0.02] border-white/[0.06]"><CardHeader className="pb-0"><div className="flex items-center justify-between"><CardTitle className="text-[11px] font-black text-slate-300">📢 Media Sentiment</CardTitle><SourceTag source="Meltwater" /></div></CardHeader><CardContent><ResponsiveContainer width="100%" height={200}><BarChart data={D.sentimentTrend}><CartesianGrid stroke="#ffffff06" /><XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 9 }} /><YAxis tick={{ fill: "#64748b", fontSize: 10 }} /><ReTooltip content={<Tip />} /><Bar dataKey="positive" stackId="a" fill={C.emerald} name="Positive" /><Bar dataKey="neutral" stackId="a" fill={C.slate} name="Neutral" /><Bar dataKey="negative" stackId="a" fill={C.rose} name="Negative" radius={[2, 2, 0, 0]} /><Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 10 }} /></BarChart></ResponsiveContainer></CardContent></Card>
              <Card className="bg-white/[0.02] border-white/[0.06]"><CardHeader className="pb-0"><div className="flex items-center justify-between"><CardTitle className="text-[11px] font-black text-slate-300">❤️ CB Breakdown ($B)</CardTitle><SourceTag source="IRS Schedule H" /></div></CardHeader><CardContent><ResponsiveContainer width="100%" height={200}><PieChart><Pie data={D.communityBenefitBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={78} paddingAngle={2} dataKey="amount">{D.communityBenefitBreakdown.map((_, i) => <Cell key={i} fill={CP[i % CP.length]} />)}</Pie><ReTooltip content={<Tip />} /><Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 9 }} formatter={(v: string) => <span className="text-slate-400">{v}</span>} /></PieChart></ResponsiveContainer></CardContent></Card>
            </div>
          </div>
        )}

        {/* ═══════════ GOVERNMENT RELATIONS ═══════════ */}
        {tab === "govrel" && (
          <div className="space-y-5">
            <Section emoji="🏛️" title="Government Relations" sub="Federal/state legislative tracking, lobbying, key relationships" source="Gov Relations CRM / OpenSecrets / State Legislatures" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <KPI emoji="🇺🇸" label="Federal Priorities" value="10" sub="3 Critical, 4 High" color={C.sky} onClick={() => openDrill({ title: "Federal Priority Breakdown", source: "AHA 2026 Agenda / Internal", content: [{ metric: "Critical", value: "3", detail: "Medicare Payment, Medicaid, Site-Neutral" }, { metric: "High", value: "4", detail: "340B, Workforce, Telehealth, Prior Auth" }, { metric: "Medium", value: "2", detail: "AI Regulation, Surprise Billing" }, { metric: "Watching", value: "1", detail: "Nonprofit Tax Exemption" }] })} />
              <KPI emoji="🏛️" label="State Bills" value="9" sub="Across 5 states" color={C.violet} onClick={() => openDrill({ title: "State Bills by State", source: "State Legislature Systems", content: [{ metric: "Illinois", value: "2" }, { metric: "North Carolina", value: "2" }, { metric: "Wisconsin", value: "2" }, { metric: "Georgia", value: "1" }, { metric: "South Carolina", value: "1" }, { metric: "Alabama", value: "1" }] })} />
              <KPI emoji="💵" label="Lobbying (2025)" value="$3.8M" sub="Federal + State" trend="+$0.4M" color={C.amber} onClick={() => openDrill({ title: "Lobbying Detail", source: "OpenSecrets.org / State Disclosures", sourceType: "Public Record", content: [{ metric: "Federal (2024 actual)", value: "$2.42M" }, { metric: "Federal (2025 est.)", value: "$2.6M" }, { metric: "State (2025 est.)", value: "$1.2M" }, { metric: "PAC (2024 cycle)", value: "$1.21M" }] })} />
              <KPI emoji="🤝" label="Key Relationships" value="32" sub="Federal + State" color={C.teal} />
            </div>
            <Card className="bg-white/[0.02] border-white/[0.06]">
              <CardHeader className="pb-2"><div className="flex items-center justify-between"><CardTitle className="text-[11px] font-black text-slate-300">Federal Priority Issues</CardTitle><SourceTag source="AHA 2026 Agenda / Internal Policy" /></div></CardHeader>
              <CardContent><div className="overflow-x-auto"><table className="w-full text-[11px]"><thead><tr className="border-b border-white/[0.06]"><TH>Issue</TH><TH>Status</TH><TH>Priority</TH><TH>Position</TH><TH>{""}</TH></tr></thead><tbody>{D.federalPriorities.map((r, i) => (
                <ClickableRow key={i} onClick={() => openDrill({ title: r.issue, content: r.details, source: r.source })}><TD className="font-semibold text-slate-200 max-w-[180px]">{r.issue}</TD><TD><StatusBadge status={r.status} /></TD><TD><PriorityDot p={r.priority} /></TD><TD className="text-slate-400 max-w-[200px]">{r.position}</TD><TD><DrillIcon /></TD></ClickableRow>
              ))}</tbody></table></div></CardContent>
            </Card>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <Card className="bg-white/[0.02] border-white/[0.06]">
                <CardHeader className="pb-2"><div className="flex items-center justify-between"><CardTitle className="text-[11px] font-black text-slate-300">State Legislative Tracker</CardTitle><SourceTag source="State Legislature / Hospital Assn" /></div></CardHeader>
                <CardContent><div className="overflow-x-auto"><table className="w-full text-[11px]"><thead><tr className="border-b border-white/[0.06]"><TH>St</TH><TH>Bill</TH><TH>Title</TH><TH>Status</TH><TH>{""}</TH></tr></thead><tbody>{D.stateLegTracker.map((r, i) => (
                  <ClickableRow key={i} onClick={() => openDrill({ title: `${r.bill}: ${r.title}`, content: r.details, source: r.source })}><TD className="font-bold text-teal-400">{r.state}</TD><TD className="font-mono text-slate-300">{r.bill}</TD><TD className="text-slate-300 max-w-[140px]">{r.title}</TD><TD><StatusBadge status={r.status} /></TD><TD><DrillIcon /></TD></ClickableRow>
                ))}</tbody></table></div></CardContent>
              </Card>
              <Card className="bg-white/[0.02] border-white/[0.06]">
                <CardHeader className="pb-2"><div className="flex items-center justify-between"><CardTitle className="text-[11px] font-black text-slate-300">Key Relationships</CardTitle><SourceTag source="Gov Relations CRM" /></div></CardHeader>
                <CardContent><div className="overflow-x-auto"><table className="w-full text-[11px]"><thead><tr className="border-b border-white/[0.06]"><TH>Official</TH><TH>Committee</TH><TH>{""}</TH></tr></thead><tbody>{D.keyRelationships.map((r, i) => (
                  <ClickableRow key={i} onClick={() => openDrill({ title: r.name, content: r.notes, source: r.source })}><TD className="font-semibold text-slate-200">{r.name}{r.party !== "N/A" && <span className={`ml-1 text-[9px] font-bold px-1 py-0.5 rounded ${r.party === "R" ? "bg-rose-500/15 text-rose-300" : "bg-sky-500/15 text-sky-300"}`}>{r.party}</span>}</TD><TD className="text-slate-400">{r.committee}</TD><TD><DrillIcon /></TD></ClickableRow>
                ))}</tbody></table></div></CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* ═══════════ REGULATORY ═══════════ */}
        {tab === "regulatory" && (
          <div className="space-y-5">
            <Section emoji="🛡️" title="Regulatory & Compliance" sub="Federal/state regulatory tracking, accreditation, compliance monitoring" source="Federal Register / Joint Commission / State Agencies" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <KPI emoji="✅" label="Compliance" value="95.4%" sub="Enterprise avg" trend="+1.4%" color={C.emerald} onClick={() => openDrill({ title: "Compliance Scores", source: "Internal Quality Dashboard", content: D.complianceScores.map(c => ({ metric: c.domain, value: `${c.enterprise}%`, detail: `MW: ${c.midwest}% | SE: ${c.southeast}%` })) })} />
              <KPI emoji="📋" label="Regs Tracked" value="10" sub="Federal + State" color={C.sky} />
              <KPI emoji="🏆" label="Joint Commission" value="Systemwide" sub="69 hospitals" color={C.teal} onClick={() => openDrill({ title: "Joint Commission Systemwide Accreditation", source: "Joint Commission Press Release (May 28, 2025)", content: "Landmark collaboration for industry-first systemwide accreditation covering all 69 hospitals. Enables hospital-to-hospital performance comparisons. Site visits Q2 2026. Dr. Jonathan Perlin leading engagement." })} />
              <KPI emoji="⏰" label="Next Deadline" value="Mar 15" sub="CMS CoP Comment" color={C.rose} />
            </div>
            <Card className="bg-white/[0.02] border-white/[0.06]">
              <CardHeader className="pb-2"><div className="flex items-center justify-between"><CardTitle className="text-[11px] font-black text-slate-300">Regulatory Tracking</CardTitle><SourceTag source="Federal Register / CMS / Joint Commission" /></div></CardHeader>
              <CardContent><div className="overflow-x-auto"><table className="w-full text-[11px]"><thead><tr className="border-b border-white/[0.06]"><TH>Regulation</TH><TH>Status</TH><TH>Impact</TH><TH>Deadline</TH><TH>{""}</TH></tr></thead><tbody>{D.regulatoryItems.map((r, i) => (
                <ClickableRow key={i} onClick={() => openDrill({ title: r.regulation, content: r.details, source: r.source })}><TD className="font-semibold text-slate-200">{r.regulation}</TD><TD><StatusBadge status={r.status} /></TD><TD><PriorityDot p={r.impact} /></TD><TD className="text-slate-400">{r.deadline}</TD><TD><DrillIcon /></TD></ClickableRow>
              ))}</tbody></table></div></CardContent>
            </Card>
            <Card className="bg-white/[0.02] border-white/[0.06]"><CardHeader className="pb-2"><div className="flex items-center justify-between"><CardTitle className="text-[11px] font-black text-slate-300">Compliance Scores by Domain</CardTitle><SourceTag source="Internal Quality / ORYX" /></div></CardHeader><CardContent><ResponsiveContainer width="100%" height={240}><BarChart data={D.complianceScores}><CartesianGrid stroke="#ffffff06" /><XAxis dataKey="domain" tick={{ fill: "#64748b", fontSize: 9 }} /><YAxis tick={{ fill: "#64748b", fontSize: 10 }} domain={[85, 100]} /><ReTooltip content={<Tip />} /><Bar dataKey="midwest" fill={C.sky} name="Midwest" radius={[2, 2, 0, 0]} /><Bar dataKey="southeast" fill={C.violet} name="Southeast" radius={[2, 2, 0, 0]} /><Bar dataKey="enterprise" fill={C.teal} name="Enterprise" radius={[2, 2, 0, 0]} /><Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 10 }} /></BarChart></ResponsiveContainer></CardContent></Card>
          </div>
        )}

        {/* ═══════════ COMMUNITY ═══════════ */}
        {tab === "community" && (
          <div className="space-y-5">
            <Section emoji="❤️" title="Community Benefit & Impact" sub="$6.2B annual: charity care, health services, education, research" source="IRS Schedule H / Joint Commission / Internal" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <KPI emoji="💰" label="Total Benefit" value="$6.2B" sub="FY2025" trend="+5.1%" color={C.rose} onClick={() => openDrill({ title: "Community Benefit Detail", source: "IRS Schedule H", content: D.communityBenefitBreakdown.map(c => ({ metric: c.category, value: `$${c.amount}B` })) })} />
              <KPI emoji="🏥" label="Charity Care" value="$1.8B" color={C.emerald} />
              <KPI emoji="📊" label="CHNAs" value="40/41" sub="97.6%" color={C.teal} onClick={() => openDrill({ title: "CHNA Detail", source: "State Filings / Internal", content: D.chnaProgress.map(c => ({ metric: c.market, value: `${c.completed}/${c.chnas}`, detail: c.topPriority })) })} />
              <KPI emoji="🤝" label="Partners" value="420+" trend="+48" color={C.violet} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <Card className="bg-white/[0.02] border-white/[0.06]"><CardHeader className="pb-0"><div className="flex items-center justify-between"><CardTitle className="text-[11px] font-black text-slate-300">By Category ($B)</CardTitle><SourceTag source="IRS Schedule H" /></div></CardHeader><CardContent><ResponsiveContainer width="100%" height={240}><BarChart data={D.communityBenefitBreakdown} layout="vertical"><CartesianGrid stroke="#ffffff06" /><XAxis type="number" tick={{ fill: "#64748b", fontSize: 10 }} tickFormatter={v => `$${v}B`} /><YAxis type="category" dataKey="category" tick={{ fill: "#94a3b8", fontSize: 9 }} width={130} /><ReTooltip content={<Tip />} /><Bar dataKey="amount" fill={C.teal} name="Amount ($B)" radius={[0, 4, 4, 0]} /></BarChart></ResponsiveContainer></CardContent></Card>
              <Card className="bg-white/[0.02] border-white/[0.06]"><CardHeader className="pb-0"><div className="flex items-center justify-between"><CardTitle className="text-[11px] font-black text-slate-300">Growth ($B)</CardTitle><SourceTag source="Annual CB Reports" /></div></CardHeader><CardContent><ResponsiveContainer width="100%" height={240}><AreaChart data={D.communityBenefitTrend}><CartesianGrid stroke="#ffffff06" /><XAxis dataKey="year" tick={{ fill: "#64748b", fontSize: 10 }} /><YAxis tick={{ fill: "#64748b", fontSize: 10 }} tickFormatter={v => `$${v}B`} domain={[4, 7]} /><ReTooltip content={<Tip />} /><Area type="monotone" dataKey="amount" stroke={C.rose} fill={C.rose} fillOpacity={0.12} strokeWidth={2} name="Amount" /></AreaChart></ResponsiveContainer></CardContent></Card>
            </div>
            <Card className="bg-white/[0.02] border-white/[0.06]"><CardHeader className="pb-2"><div className="flex items-center justify-between"><CardTitle className="text-[11px] font-black text-slate-300">CHNA Progress</CardTitle><SourceTag source="State Filings / Internal" /></div></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full text-[11px]"><thead><tr className="border-b border-white/[0.06]"><TH>Market</TH><TH>Progress</TH><TH>Top Priority</TH><TH>{""}</TH></tr></thead><tbody>{D.chnaProgress.map((r, i) => (
              <ClickableRow key={i} onClick={() => openDrill({ title: r.market, content: r.details, source: r.source })}><TD className="font-semibold text-slate-200">{r.market}</TD><TD><div className="flex items-center gap-2"><div className="w-10"><Progress value={(r.completed / r.chnas) * 100} className="h-1.5 bg-white/[0.06]" /></div><span className="text-slate-300">{r.completed}/{r.chnas}</span></div></TD><TD className="text-teal-400">{r.topPriority}</TD><TD><DrillIcon /></TD></ClickableRow>
            ))}</tbody></table></div></CardContent></Card>
            <Card className="bg-white/[0.02] border-white/[0.06]"><CardHeader className="pb-2"><div className="flex items-center justify-between"><CardTitle className="text-[11px] font-black text-slate-300">Key Partnerships</CardTitle><SourceTag source="Community Health CRM" /></div></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full text-[11px]"><thead><tr className="border-b border-white/[0.06]"><TH>Partner</TH><TH>Focus</TH><TH>Impact</TH><TH>{""}</TH></tr></thead><tbody>{D.communityPartnerships.map((r, i) => (
              <ClickableRow key={i} onClick={() => openDrill({ title: r.partner, content: r.details, source: r.source })}><TD className="font-semibold text-slate-200">{r.partner}</TD><TD className="text-slate-400">{r.type}</TD><TD className="text-slate-300">{r.impact}</TD><TD><DrillIcon /></TD></ClickableRow>
            ))}</tbody></table></div></CardContent></Card>
          </div>
        )}

        {/* ═══════════ MEDIA ═══════════ */}
        {tab === "media" && (
          <div className="space-y-5">
            <Section emoji="📢" title="Media, Communications & Thought Leadership" sub="Coverage, social presence, brand reputation, speaking engagements" source="Meltwater / Sprout Social / Comms Team" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <KPI emoji="📰" label="Mentions" value="290" sub="6 months" trend="+22%" color={C.rose} onClick={() => openDrill({ title: "Media Mentions", source: "Meltwater", content: [{ metric: "Positive", value: "250 (86%)" }, { metric: "Neutral", value: "35 (12%)" }, { metric: "Negative", value: "5 (2%)" }] })} />
              <KPI emoji="😀" label="Sentiment" value="94%" sub="Positive avg" color={C.emerald} />
              <KPI emoji="🎤" label="Speaking" value="6" sub="Confirmed 2026" color={C.violet} onClick={() => openDrill({ title: "Speaking Engagements", source: "Conference Programs", content: D.thoughtLeadership.map(e => ({ metric: e.event, value: e.status, detail: `${e.speaker} | ${e.topic}`, period: e.date })) })} />
              <KPI emoji="📱" label="Social" value="1.05M" sub="All platforms" trend="+10%" color={C.sky} onClick={() => openDrill({ title: "Social Media", source: "Sprout Social", content: D.socialMediaMetrics.map(s => ({ metric: s.platform, value: s.followers, detail: `Engagement: ${s.engagementRate} | Growth: ${s.growth}` })) })} />
            </div>
            <Card className="bg-white/[0.02] border-white/[0.06]"><CardHeader className="pb-2"><div className="flex items-center justify-between"><CardTitle className="text-[11px] font-black text-slate-300">Recent Coverage</CardTitle><SourceTag source="Meltwater / Comms" /></div></CardHeader><CardContent><div className="space-y-2">{D.mediaCoverage.map((m, i) => (
              <div key={i} onClick={() => openDrill({ title: `${m.outlet}: ${m.topic}`, content: m.details, source: m.source })} className="flex items-center gap-3 rounded-lg bg-white/[0.015] border border-white/[0.04] p-3 cursor-pointer hover:bg-teal-500/[0.03] transition-colors group">
                <div className={`h-2 w-2 rounded-full shrink-0 ${m.sentiment === "Positive" ? "bg-emerald-400" : "bg-slate-400"}`} />
                <div className="flex-1 min-w-0"><div className="flex items-center gap-2 flex-wrap"><span className="text-[11px] font-bold text-slate-200">{m.outlet}</span><Badge variant="outline" className="text-[8px] border-white/10 text-slate-500 py-0 h-4">{m.reach}</Badge></div><p className="text-[11px] text-slate-400 mt-0.5">{m.topic}</p></div>
                <span className="text-[10px] text-slate-600 shrink-0">{m.date}</span><DrillIcon />
              </div>
            ))}</div></CardContent></Card>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <Card className="bg-white/[0.02] border-white/[0.06]"><CardHeader className="pb-0"><div className="flex items-center justify-between"><CardTitle className="text-[11px] font-black text-slate-300">Sentiment Trend</CardTitle><SourceTag source="Meltwater" /></div></CardHeader><CardContent><ResponsiveContainer width="100%" height={210}><BarChart data={D.sentimentTrend}><CartesianGrid stroke="#ffffff06" /><XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 9 }} /><YAxis tick={{ fill: "#64748b", fontSize: 10 }} /><ReTooltip content={<Tip />} /><Bar dataKey="positive" stackId="a" fill={C.emerald} name="Positive" /><Bar dataKey="neutral" stackId="a" fill={C.slate} name="Neutral" /><Bar dataKey="negative" stackId="a" fill={C.rose} name="Negative" radius={[2, 2, 0, 0]} /><Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 10 }} /></BarChart></ResponsiveContainer></CardContent></Card>
              <Card className="bg-white/[0.02] border-white/[0.06]"><CardHeader className="pb-2"><div className="flex items-center justify-between"><CardTitle className="text-[11px] font-black text-slate-300">Social Performance</CardTitle><SourceTag source="Sprout Social" /></div></CardHeader><CardContent><div className="space-y-3">{D.socialMediaMetrics.map((s, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg bg-white/[0.015] border border-white/[0.04] p-3"><div className="w-20"><span className="text-[11px] font-bold text-slate-200">{s.platform}</span></div><div className="flex-1 grid grid-cols-3 gap-2 text-center"><div><p className="text-[9px] text-slate-600 font-bold">Followers</p><p className="text-[11px] text-white font-bold">{s.followers}</p></div><div><p className="text-[9px] text-slate-600 font-bold">Engage</p><p className="text-[11px] text-teal-400 font-bold">{s.engagementRate}</p></div><div><p className="text-[9px] text-slate-600 font-bold">Growth</p><p className="text-[11px] text-emerald-400 font-bold">{s.growth}</p></div></div></div>
              ))}</div></CardContent></Card>
            </div>
            <Card className="bg-white/[0.02] border-white/[0.06]"><CardHeader className="pb-2"><div className="flex items-center justify-between"><CardTitle className="text-[11px] font-black text-slate-300">Thought Leadership & Speaking</CardTitle><SourceTag source="Conference Programs" /></div></CardHeader><CardContent><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">{D.thoughtLeadership.map((e, i) => (
              <div key={i} onClick={() => openDrill({ title: e.event, content: e.details, source: e.source })} className="rounded-lg border border-white/[0.06] bg-white/[0.015] p-3 cursor-pointer hover:bg-teal-500/[0.03] transition-colors group"><div className="flex items-start justify-between mb-1"><span className="text-[11px] font-bold text-slate-200">{e.event}</span><StatusBadge status={e.status} /></div><p className="text-[10px] text-teal-400 font-semibold">{e.topic}</p><div className="flex items-center justify-between mt-1.5"><span className="text-[10px] text-slate-500">{e.speaker} · {e.date}</span><DrillIcon /></div></div>
            ))}</div></CardContent></Card>
          </div>
        )}

        {/* ═══════════ POLICY ═══════════ */}
        {tab === "policy" && (
          <div className="space-y-5">
            <Section emoji="⚖️" title="Public Policy & Advocacy" sub="Policy positions, coalitions, grants, advocacy infrastructure" source="Internal Policy / AHA / Coalition Partners" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <KPI emoji="📋" label="Positions" value="10" sub="Enterprise stances" color={C.amber} onClick={() => openDrill({ title: "Policy Positions", source: "Internal Policy Platform", content: D.policyPositions.map(p => ({ metric: p.topic, value: p.position, detail: `Coalition: ${p.coalition}` })) })} />
              <KPI emoji="🤝" label="Coalitions" value="8" sub="National" color={C.teal} onClick={() => openDrill({ title: "Coalitions", source: "Membership Records", content: D.coalitionMemberships.map(c => ({ metric: c.coalition, value: c.role })) })} />
              <KPI emoji="💰" label="Grants" value="$460M+" sub="Pipeline" color={C.emerald} onClick={() => openDrill({ title: "Grant Pipeline", source: "Grant Management Office", content: D.grantActivity.map(g => ({ metric: g.name, value: g.amount > 0 ? `$${g.amount}M` : "Model", detail: `${g.status} | ${g.period}` })) })} />
              <KPI emoji="🗳️" label="PAC" value="$1.2M" sub="2024 cycle" color={C.violet} onClick={() => openDrill({ title: "PAC Detail", source: "FEC via OpenSecrets.org", sourceType: "Public Record", content: [{ metric: "Total PAC", value: "$1,210,989" }, { metric: "Outside Spending", value: "$0" }] })} />
            </div>
            <Card className="bg-white/[0.02] border-white/[0.06]"><CardHeader className="pb-2"><div className="flex items-center justify-between"><CardTitle className="text-[11px] font-black text-slate-300">Policy Positions</CardTitle><SourceTag source="Internal Policy / AHA" /></div></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full text-[11px]"><thead><tr className="border-b border-white/[0.06]"><TH>Topic</TH><TH>Position</TH><TH>Engagement</TH><TH>Coalition</TH><TH>{""}</TH></tr></thead><tbody>{D.policyPositions.map((r, i) => (
              <ClickableRow key={i} onClick={() => openDrill({ title: r.topic, content: r.details, source: r.source })}><TD className="font-semibold text-slate-200">{r.topic}</TD><TD className="text-teal-400 font-bold">{r.position}</TD><TD><PriorityDot p={r.engagement} /></TD><TD className="text-slate-400">{r.coalition}</TD><TD><DrillIcon /></TD></ClickableRow>
            ))}</tbody></table></div></CardContent></Card>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <Card className="bg-white/[0.02] border-white/[0.06]"><CardHeader className="pb-2"><div className="flex items-center justify-between"><CardTitle className="text-[11px] font-black text-slate-300">Coalitions</CardTitle><SourceTag source="Membership Records" /></div></CardHeader><CardContent><div className="space-y-2">{D.coalitionMemberships.map((c, i) => (
                <div key={i} onClick={() => openDrill({ title: c.coalition, content: c.details, source: c.source })} className="flex items-center justify-between rounded-lg bg-white/[0.015] border border-white/[0.04] p-3 cursor-pointer hover:bg-teal-500/[0.03] transition-colors group"><div><span className="text-[11px] font-bold text-slate-200">{c.coalition}</span><p className="text-[10px] text-slate-500 mt-0.5">{c.role}</p></div><DrillIcon /></div>
              ))}</div></CardContent></Card>
              <Card className="bg-white/[0.02] border-white/[0.06]"><CardHeader className="pb-2"><div className="flex items-center justify-between"><CardTitle className="text-[11px] font-black text-slate-300">Grants & Funding</CardTitle><SourceTag source="Grant Mgmt / Federal DBs" /></div></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full text-[11px]"><thead><tr className="border-b border-white/[0.06]"><TH>Grant</TH><TH>Amount</TH><TH>Status</TH><TH>{""}</TH></tr></thead><tbody>{D.grantActivity.map((g, i) => (
                <ClickableRow key={i} onClick={() => openDrill({ title: g.name, content: g.details, source: g.source })}><TD className="font-semibold text-slate-200 max-w-[180px]">{g.name}</TD><TD className="text-slate-300">{g.amount > 0 ? `$${g.amount}M` : "Model"}</TD><TD><StatusBadge status={g.status} /></TD><TD><DrillIcon /></TD></ClickableRow>
              ))}</tbody></table></div></CardContent></Card>
            </div>
          </div>
        )}

        {/* ═══════════ STAKEHOLDERS ═══════════ */}
        {tab === "stakeholders" && (
          <div className="space-y-5">
            <Section emoji="🤝" title="Stakeholder Engagement" sub="Relationship mapping, influence, frequency, regional distribution" source="Gov Relations CRM / Community Health CRM" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <KPI emoji="👥" label="Groups" value="12" sub="Relationship streams" color={C.teal} onClick={() => openDrill({ title: "Stakeholder Groups", source: "External Affairs CRM", content: D.stakeholderMap.map(s => ({ metric: s.group, value: s.influence, detail: `${s.relationship} | ${s.frequency} | ${s.owner}` })) })} />
              <KPI emoji="🏛️" label="Legislators" value="88" sub="Federal + State" color={C.sky} />
              <KPI emoji="🏘️" label="Community Orgs" value="309" color={C.violet} />
              <KPI emoji="📅" label="Events YTD" value="244" color={C.amber} onClick={() => openDrill({ title: "Events by Region", source: "Regional Affairs Dashboard", content: D.engagementByRegion.map(r => ({ metric: r.region, value: `${r.events} events`, detail: `${r.legislators} legislators | ${r.communityOrgs} orgs | ${r.mediaContacts} media` })) })} />
            </div>
            <Card className="bg-white/[0.02] border-white/[0.06]"><CardHeader className="pb-2"><div className="flex items-center justify-between"><CardTitle className="text-[11px] font-black text-slate-300">Stakeholder Map</CardTitle><SourceTag source="External Affairs CRM" /></div></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full text-[11px]"><thead><tr className="border-b border-white/[0.06]"><TH>Group</TH><TH>Influence</TH><TH>Relationship</TH><TH>Frequency</TH><TH>{""}</TH></tr></thead><tbody>{D.stakeholderMap.map((s, i) => (
              <ClickableRow key={i} onClick={() => openDrill({ title: s.group, content: s.details, source: s.source })}><TD className="font-semibold text-slate-200">{s.group}</TD><TD><PriorityDot p={s.influence} /></TD><TD className="text-slate-300">{s.relationship}</TD><TD className="text-slate-400">{s.frequency}</TD><TD><DrillIcon /></TD></ClickableRow>
            ))}</tbody></table></div></CardContent></Card>
            <Card className="bg-white/[0.02] border-white/[0.06]"><CardHeader className="pb-0"><div className="flex items-center justify-between"><CardTitle className="text-[11px] font-black text-slate-300">Engagement by Region</CardTitle><SourceTag source="Regional Affairs Dashboard" /></div></CardHeader><CardContent><ResponsiveContainer width="100%" height={260}><BarChart data={D.engagementByRegion}><CartesianGrid stroke="#ffffff06" /><XAxis dataKey="region" tick={{ fill: "#64748b", fontSize: 9 }} /><YAxis tick={{ fill: "#64748b", fontSize: 10 }} /><ReTooltip content={<Tip />} /><Bar dataKey="legislators" fill={C.sky} name="Legislators" radius={[2, 2, 0, 0]} /><Bar dataKey="communityOrgs" fill={C.teal} name="Community" radius={[2, 2, 0, 0]} /><Bar dataKey="mediaContacts" fill={C.violet} name="Media" radius={[2, 2, 0, 0]} /><Bar dataKey="events" fill={C.amber} name="Events" radius={[2, 2, 0, 0]} /><Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 10 }} /></BarChart></ResponsiveContainer></CardContent></Card>
          </div>
        )}

        {/* ═══════════ RESEARCH HUB ═══════════ */}
        {tab === "research" && <ResearchHub />}

      </main>

      <footer className="border-t border-white/[0.04] mt-6 py-3">
        <div className="mx-auto max-w-[1440px] px-5 flex flex-col md:flex-row items-center justify-between gap-2 text-[9px] text-slate-700 uppercase tracking-wider font-bold">
          <span>Advocate Health · Enterprise External Affairs · Rewire 2030</span>
          <span>Click rows/KPIs for drill-down · 🤖 Research Hub for live AI analysis · Feb 26, 2026</span>
        </div>
      </footer>
    </div>
  );
}
