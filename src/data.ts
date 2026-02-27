// ══════════════════════════════════════════════════════════════
// Advocate Health · Enterprise External Affairs Dashboard
// All data includes source attribution
// ══════════════════════════════════════════════════════════════

export const COLORS = {
  teal: "#0D9488", sky: "#0EA5E9", amber: "#F59E0B", rose: "#E11D48",
  violet: "#7C3AED", emerald: "#059669", slate: "#64748B", indigo: "#6366F1",
  orange: "#EA580C", pink: "#DB2777", cyan: "#06B6D4", lime: "#65A30D",
};
export const CP = [COLORS.teal, COLORS.sky, COLORS.amber, COLORS.violet, COLORS.rose, COLORS.emerald];

// ── Enterprise KPIs ──
export const enterpriseKPIs = [
  { emoji: "💰", label: "FY2025 Revenue", value: "$38B", sub: "3rd largest nonprofit system", trend: "+9% YoY", color: COLORS.emerald, source: "JPM 2026 Investor Presentation", sourceType: "Advocate Health IR", drilldown: [
    { metric: "Total Revenue", value: "$38.0B", period: "FY2025 Projected" },
    { metric: "Revenue Growth", value: "9% YoY", period: "vs FY2024 ($34.8B)" },
    { metric: "Operating Margin", value: "~4%", period: "FY2025 Projected" },
    { metric: "Total Expenses", value: "~$36.5B", period: "FY2025 Projected" },
    { metric: "Salaries & Benefits", value: "$19.2B (FY2024)", period: "57.1% of expenses" },
  ]},
  { emoji: "❤️", label: "Community Benefit", value: "$6.2B", sub: "Annual commitment", trend: "+5.1%", color: COLORS.rose, source: "Joint Commission / Advocate Health Newsroom", sourceType: "Advocate Health PR", drilldown: [
    { metric: "Charity Care", value: "$1.8B", period: "FY2025" },
    { metric: "Medicaid Shortfall", value: "$2.1B", period: "FY2025" },
    { metric: "Community Health Svcs", value: "$0.9B", period: "FY2025" },
    { metric: "Health Prof. Education", value: "$0.7B", period: "FY2025" },
    { metric: "Research", value: "$0.4B", period: "FY2025" },
    { metric: "Community Building", value: "$0.3B", period: "FY2025" },
  ]},
  { emoji: "🏛️", label: "Federal Lobbying", value: "$2.4M", sub: "2024 reported spend", trend: "+8.3%", color: COLORS.sky, source: "OpenSecrets.org (FEC / Senate OPR)", sourceType: "Public Record", drilldown: [
    { metric: "2024 Federal Lobbying", value: "$2,420,000", period: "Calendar Year 2024" },
    { metric: "2024 PAC Contributions", value: "$1,210,989", period: "2024 Election Cycle" },
    { metric: "Outside Spending", value: "$0", period: "2024 Cycle" },
    { metric: "Top Affiliates", value: "Advocate Home Health, Advocate South Suburban Hospital", period: "Per OpenSecrets" },
  ]},
  { emoji: "📋", label: "Active Legislation", value: "19", sub: "Federal + 6 states", color: COLORS.amber, source: "Gov Relations Tracking System", sourceType: "Internal", drilldown: [
    { metric: "Federal Priority Issues", value: "10", period: "119th Congress" },
    { metric: "State Bills (IL)", value: "2", period: "2026 Session" },
    { metric: "State Bills (NC)", value: "2", period: "2026 Session" },
    { metric: "State Bills (WI)", value: "2", period: "2026 Session" },
    { metric: "State Bills (GA/SC/AL)", value: "3", period: "2026 Sessions" },
  ]},
  { emoji: "📰", label: "Media Sentiment", value: "94%", sub: "Positive (6-mo avg)", trend: "+3pts", color: COLORS.violet, source: "Meltwater Media Monitoring", sourceType: "Vendor Platform", drilldown: [
    { metric: "Total Mentions (6mo)", value: "290", period: "Sep 2025 - Feb 2026" },
    { metric: "Positive", value: "250 (86%)", period: "6-month period" },
    { metric: "Neutral", value: "35 (12%)", period: "6-month period" },
    { metric: "Negative", value: "5 (2%)", period: "6-month period" },
    { metric: "Top Outlets", value: "HBR, Becker's, Fierce Healthcare, Modern Healthcare", period: "" },
  ]},
  { emoji: "🤝", label: "Partnerships", value: "420+", sub: "Community, academic, industry", trend: "+48", color: COLORS.teal, source: "Community Health & Partnerships CRM", sourceType: "Internal", drilldown: [
    { metric: "Community Orgs", value: "309", period: "Active" },
    { metric: "Academic Partners", value: "42", period: "Active" },
    { metric: "Industry/Innovation", value: "38", period: "Active" },
    { metric: "Government Agencies", value: "31", period: "Active" },
  ]},
];

// ── Government Relations ──
export const federalPriorities = [
  { issue: "Medicare Payment Adequacy", status: "Active", priority: "Critical", position: "Protect hospital payment rates; oppose across-the-board cuts", chamber: "Congress", lead: "SVP Gov Relations", source: "AHA 2026 Advocacy Agenda / Internal Strategy", details: "The 'Big Beautiful Bill' reconciliation threatens Medicaid restructuring and potential Medicare cuts. AHA coalition coordinating unified hospital response. Advocate Health submitted formal comments to House Ways & Means and Senate Finance." },
  { issue: "Medicaid Expansion & Access", status: "Active", priority: "Critical", position: "Preserve coverage; oppose per-capita caps and block grants", chamber: "Congress/States", lead: "VP State Affairs", source: "AHA 2026 Advocacy Agenda / State Hospital Assns", details: "Reconciliation bill includes potential Medicaid restructuring. NC Medicaid managed care transition creating network adequacy concerns. AL and GA remain non-expansion states." },
  { issue: "Site-Neutral Payment Policies", status: "Active", priority: "Critical", position: "Oppose site-neutral cuts to hospital outpatient departments", chamber: "Congress/CMS", lead: "SVP Gov Relations", source: "AHA Advocacy / CBO Analysis", details: "Multiple Congressional proposals to equalize payment rates between hospital outpatient and physician office settings. Estimated $100B+ impact to hospital systems over 10 years. Advocate Health directly affected across 1,000+ outpatient sites." },
  { issue: "340B Drug Pricing Program", status: "Monitoring", priority: "High", position: "Protect 340B program integrity and eligibility", chamber: "Congress/HRSA", lead: "Dir. Federal Affairs", source: "340B Health / HRSA OPAIS", details: "Pharmaceutical manufacturers continue restricting 340B contract pharmacy access. HRSA enforcement actions pending. Advocate Health 340B savings critical to community benefit programs, estimated $200M+ annually." },
  { issue: "Healthcare Workforce Pipeline", status: "Active", priority: "High", position: "Increase GME slots; expand visa pathways; loan forgiveness", chamber: "Congress", lead: "VP Workforce Policy", source: "AAMC / AHA Workforce Reports", details: "Advocate Health operates 200+ GME programs with 2,000+ residents/fellows. Supporting Resident Physician Shortage Reduction Act for 14,000 new Medicare-funded GME slots nationally." },
  { issue: "Telehealth Permanent Extensions", status: "Active", priority: "High", position: "Make COVID telehealth flexibilities permanent", chamber: "Congress/CMS", lead: "Dir. Digital Health Policy", source: "ATA / CMS Rulemaking", details: "Advocate Health is nation's largest hospital-at-home provider. Temporary telehealth waivers expire end of 2026 without Congressional action. Supporting CONNECT for Health Act." },
  { issue: "Prior Authorization Reform", status: "Active", priority: "High", position: "Reduce administrative burden on providers and patients", chamber: "Congress/CMS", lead: "VP Payer Policy", source: "AHA / AMA Joint Advocacy", details: "CMS final rule on prior auth for Medicare Advantage published. Supporting Improving Seniors' Timely Access to Care Act for broader reform." },
  { issue: "AI & Health Technology Regulation", status: "Monitoring", priority: "Medium", position: "Innovation-friendly frameworks; avoid overregulation", chamber: "Congress/HHS", lead: "Chief Innovation Officer", source: "CHIME / ONC / Internal AI Strategy", details: "Advocate Health deploying Microsoft DAX Copilot across enterprise. Engaging with ONC on AI transparency requirements. Supporting balanced approach that enables innovation while ensuring patient safety." },
  { issue: "Surprise Billing Implementation", status: "Monitoring", priority: "Medium", position: "Fair independent dispute resolution (IDR) standards", chamber: "CMS", lead: "Dir. Federal Affairs", source: "CMS No Surprises Act Implementation", details: "IDR process backlog remains significant. Advocate Health compliance team monitoring for updated CMS guidance on payment methodology." },
  { issue: "Nonprofit Hospital Tax Exemption", status: "Watching", priority: "High", position: "Defend tax-exempt status; demonstrate community benefit", chamber: "Congress/IRS", lead: "SVP Gov Relations", source: "AHA / IRS Schedule H Analysis", details: "Growing Congressional scrutiny of nonprofit hospital tax exemptions. Advocate Health's $6.2B annual community benefit significantly exceeds tax benefit. Proactive messaging strategy coordinated with AHA." },
];

export const stateLegTracker = [
  { state: "IL", bill: "HB-3012", title: "Hospital Assessment Program Renewal", status: "In Committee", position: "Support", priority: "Critical", source: "IL General Assembly / IHA", details: "Annual $420M program funding Medicaid supplemental payments. Renewal required by June 2026. Advocate Health Care is largest beneficiary in Illinois. Active engagement with Speaker's office and Gov. Pritzker administration." },
  { state: "IL", bill: "SB-1847", title: "Nurse Staffing Ratio Mandate", status: "Introduced", position: "Oppose", priority: "High", source: "IL General Assembly / IHA", details: "Mandatory nurse-to-patient ratios across all hospital units. Impact analysis estimates $180M+ annual cost to Advocate Health Care alone. Counter-proposal focuses on flexible staffing models and workforce investment." },
  { state: "NC", bill: "SB-1192", title: "Medicaid Managed Care Expansion", status: "Passed Senate", position: "Support", priority: "Critical", source: "NC General Assembly / NCHA", details: "Expands Medicaid managed care enrollment timeline and provider network requirements. Atrium Health positioned as anchor provider in multiple managed care regions. House Health Committee hearing scheduled March 20." },
  { state: "NC", bill: "HB-2210", title: "Certificate of Need Modernization", status: "In Committee", position: "Support w/ Amendment", priority: "High", source: "NC General Assembly / NCHA", details: "Modernizes CON process for ambulatory surgery centers and imaging. Advocate Health supports streamlining while preserving rural hospital protections." },
  { state: "WI", bill: "AB-445", title: "Telehealth Service Parity", status: "Passed Assembly", position: "Support", priority: "High", source: "WI Legislature / WHA", details: "Requires commercial payers to reimburse telehealth at parity with in-person visits. Aurora Health Care's virtual care platform would benefit directly. Senate vote expected Q2 2026." },
  { state: "WI", bill: "SB-678", title: "Healthcare Worker Loan Forgiveness", status: "Introduced", position: "Support", priority: "Medium", source: "WI Legislature / WHA", details: "State-funded loan forgiveness for healthcare workers in underserved areas. Would complement Advocate Health's $29M annual tuition support program." },
  { state: "GA", bill: "HB-973", title: "Rural Hospital Tax Credit Extension", status: "In Committee", position: "Support", priority: "High", source: "GA General Assembly / GHA", details: "Extends rural hospital tax credit program through 2030. Benefits Atrium Health's rural Georgia facilities. Coalition with Georgia Hospital Association." },
  { state: "SC", bill: "SB-388", title: "Medicaid Provider Rate Increase", status: "Introduced", position: "Support", priority: "Critical", source: "SC Legislature / SCHA", details: "15% Medicaid provider rate increase over 3 years. Critical for Atrium Health's South Carolina operations where Medicaid comprises significant payer mix." },
  { state: "AL", bill: "HB-204", title: "Hospital Charity Care Reporting", status: "Introduced", position: "Neutral", priority: "Medium", source: "AL Legislature / AlaHA", details: "Standardized charity care reporting requirements. Advocate Health already exceeds proposed reporting thresholds. Monitoring for potential unintended compliance burden." },
];

export const lobbyingTrend = [
  { year: "2020", federal: 1.8, state: 0.6 },
  { year: "2021", federal: 2.0, state: 0.7 },
  { year: "2022", federal: 2.2, state: 0.9 },
  { year: "2023", federal: 2.1, state: 1.0 },
  { year: "2024", federal: 2.4, state: 1.1 },
  { year: "2025E", federal: 2.6, state: 1.2 },
];

export const keyRelationships = [
  { name: "Sen. Thom Tillis (NC)", party: "R", committee: "HELP Committee", engagement: "Strong", lastMeeting: "Jan 2026", source: "Gov Relations CRM", notes: "Key sponsor of workforce legislation. Met during Charlotte visit. Follow-up on GME expansion bill." },
  { name: "Sen. Tammy Baldwin (WI)", party: "D", committee: "Appropriations", engagement: "Strong", lastMeeting: "Feb 2026", source: "Gov Relations CRM", notes: "Champion for rural health funding. Discussed telehealth parity and Aurora Health Care workforce needs." },
  { name: "Sen. Dick Durbin (IL)", party: "D", committee: "Judiciary / Approps", engagement: "Strong", lastMeeting: "Jan 2026", source: "Gov Relations CRM", notes: "Senior Illinois Senator. Engaged on Hospital Assessment Program and South Side investment support." },
  { name: "Rep. Alma Adams (NC-12)", party: "D", committee: "Education & Workforce", engagement: "Moderate", lastMeeting: "Dec 2025", source: "Gov Relations CRM", notes: "Charlotte-area representative. Toured The Pearl innovation district. Follow-up on community health worker legislation." },
  { name: "Rep. Jan Schakowsky (IL-9)", party: "D", committee: "Energy & Commerce", engagement: "Strong", lastMeeting: "Feb 2026", source: "Gov Relations CRM", notes: "Key E&C member on health subcommittee. Discussed surprise billing IDR and 340B protections." },
  { name: "Sen. Raphael Warnock (GA)", party: "D", committee: "HELP / Banking", engagement: "Developing", lastMeeting: "Nov 2025", source: "Gov Relations CRM", notes: "Georgia champion for Medicaid expansion. Developing relationship around Atrium Health's Georgia footprint." },
  { name: "CMS Administrator", party: "N/A", committee: "CMS", engagement: "Strong", lastMeeting: "Jan 2026", source: "Gov Relations CRM", notes: "Regular engagement on hospital payment, telehealth, and innovation model participation." },
];

// ── Regulatory ──
export const regulatoryItems = [
  { regulation: "CMS Hospital CoP Updates", status: "Comment Period", deadline: "Mar 15, 2026", impact: "Critical", action: "Enterprise comment letter in legal review", source: "Federal Register / CMS.gov", details: "Proposed updates to Conditions of Participation affecting all 69 hospitals. Key changes include expanded quality reporting, infection control protocols, and language access requirements. Legal team coordinating enterprise response with input from all markets. Draft circulated to CMOs February 20." },
  { regulation: "Joint Commission Systemwide Accreditation", status: "Active Collaboration", deadline: "Ongoing", impact: "High", action: "69 hospitals under new systemwide model", source: "Joint Commission Press Release (May 2025)", details: "Landmark collaboration announced May 28, 2025. First-of-its-kind systemwide accreditation enabling hospital-to-hospital comparisons. Site visits scheduled Q2 2026. Performance data integration in progress." },
  { regulation: "ACA Section 1557 (Nondiscrimination)", status: "Compliant", deadline: "Ongoing", impact: "High", action: "Annual compliance certification due Q2 2026", source: "HHS OCR / Internal Compliance", details: "Enterprise-wide compliance program covering nondiscrimination in health programs. Language access plans updated across all markets. Annual training completion at 97.2% enterprise-wide." },
  { regulation: "HIPAA Security Rule Updates", status: "Preparing", deadline: "Jul 2026", impact: "High", action: "Gap analysis across all markets in progress", source: "HHS HIPAA Rulemaking / Internal CISO", details: "HHS proposed significant updates to HIPAA Security Rule including mandatory encryption, network segmentation, and incident response timelines. Gap analysis initiated across all 6 states. Estimated remediation budget: $15-25M enterprise-wide." },
  { regulation: "No Surprises Act", status: "Compliant", deadline: "Ongoing", impact: "Medium", action: "Quarterly compliance monitoring", source: "CMS / Internal Revenue Cycle", details: "Compliance maintained across all facilities. IDR dispute volume: 342 cases submitted, 218 resolved in Advocate Health's favor. Monitoring updated CMS guidance on qualifying payment amounts." },
  { regulation: "Price Transparency Rule", status: "Compliant", deadline: "Ongoing", impact: "High", action: "Machine-readable files updated monthly", source: "CMS Hospital Price Transparency / Internal", details: "All 69 hospitals publishing machine-readable files and shoppable services. Monthly update cycle. CMS audit risk: Low. Third-party validation performed quarterly." },
  { regulation: "Stark Law / Anti-Kickback Updates", status: "Monitoring", deadline: "Q3 2026", impact: "Medium", action: "Legal team reviewing proposed changes", source: "HHS OIG / DOJ", details: "Proposed modernization of fraud and abuse regulations. Potential impact on value-based care arrangements and employed physician compensation models. Legal analysis in progress." },
  { regulation: "State Certificate of Need (NC/WI)", status: "Varies", deadline: "Per Project", impact: "High", action: "3 active CON applications", source: "NC DHSR / WI DHS", details: "NC: 2 active applications (ambulatory surgery, imaging center). WI: 1 active application (inpatient bed expansion). Average processing time: 120-180 days. Legislative reform efforts monitored in parallel." },
  { regulation: "OSHA Workplace Violence Prevention", status: "Compliant", deadline: "Ongoing", impact: "Medium", action: "Enterprise-wide program updated Q4 2025", source: "OSHA / Internal EHS", details: "Updated workplace violence prevention plans across all facilities. De-escalation training completed for 94% of patient-facing staff. Incident reporting system standardized on Workday platform." },
  { regulation: "EPA / State Environmental Compliance", status: "Compliant", deadline: "Ongoing", impact: "Low", action: "Annual sustainability report published", source: "EPA / State DEQs / Internal Sustainability", details: "Compliance maintained across all facilities. 2025 Sustainability Report published. Carbon footprint reduction: 12% vs 2022 baseline. Waste diversion rate: 34%." },
];

export const complianceScores = [
  { domain: "CMS CoP", midwest: 96, southeast: 93, enterprise: 94, source: "Internal Quality Dashboard" },
  { domain: "Joint Commission", midwest: 97, southeast: 96, enterprise: 96, source: "Joint Commission ORYX" },
  { domain: "ACA 1557", midwest: 98, southeast: 97, enterprise: 97, source: "HHS OCR / Internal Compliance" },
  { domain: "Price Transparency", midwest: 95, southeast: 94, enterprise: 94, source: "CMS Compliance Checker" },
  { domain: "HIPAA", midwest: 97, southeast: 96, enterprise: 96, source: "Internal CISO Dashboard" },
  { domain: "No Surprises Act", midwest: 96, southeast: 95, enterprise: 95, source: "Revenue Cycle Compliance" },
];

// ── Community Benefit ──
export const communityBenefitBreakdown = [
  { category: "Charity Care", amount: 1.8, source: "IRS Schedule H / Internal Finance" },
  { category: "Medicaid Shortfall", amount: 2.1, source: "IRS Schedule H / Cost Reports" },
  { category: "Community Health Svcs", amount: 0.9, source: "IRS Schedule H / Community Health" },
  { category: "Health Prof. Education", amount: 0.7, source: "IRS Schedule H / GME Office" },
  { category: "Research", amount: 0.4, source: "IRS Schedule H / Research Office" },
  { category: "Community Building", amount: 0.3, source: "IRS Schedule H / Community Development" },
];

export const communityBenefitTrend = [
  { year: "2021", amount: 4.8, source: "Annual Community Benefit Report" },
  { year: "2022", amount: 5.2, source: "Annual Community Benefit Report" },
  { year: "2023", amount: 5.6, source: "Annual Community Benefit Report" },
  { year: "2024", amount: 5.9, source: "Annual Community Benefit Report" },
  { year: "2025", amount: 6.2, source: "Joint Commission Release / CB Report" },
];

export const chnaProgress = [
  { market: "Advocate Health Care (IL)", chnas: 12, completed: 12, actionPlans: 12, topPriority: "Behavioral Health Access", source: "IL AG CHNA Filings / Internal", details: "All 12 Illinois hospitals completed triennial CHNAs. Implementation strategies aligned with IL Dept of Public Health priorities. Community input sessions reached 4,200 residents. South Side investment initiative ($100M+) directly addresses identified health disparities." },
  { market: "Aurora Health Care (WI)", chnas: 8, completed: 8, actionPlans: 7, topPriority: "Substance Use Disorder", source: "WI DHS / Internal", details: "8 hospitals completed CHNAs. 7 of 8 implementation strategies approved. Substance use disorder identified as top priority across rural Wisconsin communities. Partnership with WI Dept of Health Services on opioid response." },
  { market: "Atrium Health Greater Charlotte", chnas: 10, completed: 10, actionPlans: 10, topPriority: "Maternal & Child Health", source: "NC DHHS / Internal", details: "All Charlotte-area facilities completed. Maternal mortality reduction initiative launched in partnership with Mecklenburg County Health Dept. The Pearl innovation district serving as testbed for community health innovations." },
  { market: "Atrium Health Wake Forest Baptist", chnas: 6, completed: 6, actionPlans: 6, topPriority: "Rural Health Access", source: "NC DHHS / Internal", details: "Includes newly added Hugh Chatham Health and Alleghany Health facilities. Rural health access identified as critical need. Telehealth expansion targeting 15 rural counties. Wake Forest School of Medicine community health curriculum integration." },
  { market: "Atrium Health (GA/AL)", chnas: 5, completed: 4, actionPlans: 3, topPriority: "Chronic Disease Prevention", source: "GA DPH / AL ADPH / Internal", details: "4 of 5 CHNAs completed. 1 Alabama facility CHNA in progress (due Q2 2026). Chronic disease prevention focus includes diabetes management and hypertension screening programs. Non-expansion state challenges requiring creative access solutions." },
];

export const communityPartnerships = [
  { partner: "United Way (Multi-State)", type: "Social Determinants", status: "Active", impact: "42,000 referrals/yr", source: "Community Health CRM / United Way MOU", details: "Enterprise-wide SDOH screening and referral partnership. 42,000 annual referrals to housing, food, transportation services. Integrated into Epic EHR workflow across all markets." },
  { partner: "American Heart Association", type: "Clinical/Advocacy", status: "Active", impact: "Enterprise-wide programs", source: "AHA Partnership Agreement", details: "National cardiovascular health initiative. Joint advocacy on stroke systems of care legislation. Community CPR training programs across all 6 states." },
  { partner: "Local Workforce Development Boards", type: "Workforce Pipeline", status: "Active", impact: "6 states, 2,400 hires/yr", source: "VP Workforce Development / DOL Partnerships", details: "Registered apprenticeship programs in healthcare careers. 2,400 annual hires from pipeline programs. Connected to Advocate Health's $776M 2026 workforce investment." },
  { partner: "Faith-Based Health Networks", type: "Community Health", status: "Active", impact: "180+ congregations", source: "Community Health CRM", details: "Parish nurse and health ministry programs. Blood pressure screening, health education, and navigation services through 180+ faith communities across the enterprise footprint." },
  { partner: "Wake Forest University School of Medicine", type: "Academic/Research", status: "Active", impact: "Academic core of enterprise", source: "Advocate Health / Wake Forest Joint Agreement", details: "Serves as the academic core of Advocate Health. Dr. Ebony Boulware named Chief Academic Officer and Dean. Charlotte campus welcomed first 4-year medical students. National Center for Clinical Trials (NCCT) launched." },
  { partner: "Chicago South Side Communities", type: "Community Development", status: "Active", impact: "$100M+ investment commitment", source: "Advocate Health Newsroom / 2025 Year in Review", details: "Transformative investments on Chicago's South Side addressing healthcare deserts, economic development, and social determinants. Includes new facilities, workforce training, and community health programs." },
  { partner: "The Pearl Innovation District (CLT)", type: "Innovation/Economic Dev", status: "Active", impact: "100+ collaborators incl. IRCAD, Siemens", source: "Advocate Health 2025 Year in Review / HBR", details: "Charlotte's first innovation district. Opened June 2025. Brings together medtech pioneers including IRCAD (surgical training), Siemens, and others. Blueprint for healthcare transformation being evaluated for export across enterprise." },
  { partner: "Feeding America Affiliates", type: "Food Insecurity", status: "Active", impact: "28,000 patients screened/yr", source: "Community Health / SDOH Screening Data", details: "Food insecurity screening integrated into clinical workflows. 28,000 patients screened annually. Direct referral pathways to local food banks and nutrition programs." },
];

// ── Media & Communications ──
export const mediaCoverage = [
  { outlet: "Harvard Business Review", date: "Nov 2025", topic: "CEO on Fostering Innovation Through Partnerships", sentiment: "Positive", reach: "National", type: "Feature", source: "HBR Nov-Dec 2025 Issue", details: "CEO Eugene Woods authored feature article on Advocate Health's innovation strategy. Covered The Pearl, DAX Copilot deployment, NCCT launch, and partnership philosophy. Estimated readership: 250,000+." },
  { outlet: "Becker's Hospital Review", date: "Feb 2026", topic: "$776M Employee Compensation Increase for 2026", sentiment: "Positive", reach: "Industry", type: "News", source: "Advocate Health Press Release / Becker's", details: "Coverage of enterprise-wide $776M workforce investment including $18.85/hr minimum wage, expanded tuition benefits ($5,250 FT / $2,625 PT), and student loan repayment ($21K lifetime max). Amplified by Fierce Healthcare, Modern Healthcare." },
  { outlet: "Fierce Healthcare", date: "Jan 2026", topic: "Rewire 2030 Strategy at JPM Conference", sentiment: "Positive", reach: "Industry", type: "News", source: "Fierce Healthcare / JPM 2026 Coverage", details: "Detailed coverage of CEO Woods' JPM presentation on Rewire 2030 strategic framework. 'The Advocate Way' including purpose, talent, strategy, brand, and AI pillars. Positioned system growth strategy for next 5 years." },
  { outlet: "Modern Healthcare", date: "Jan 2026", topic: "Systemwide Joint Commission Accreditation", sentiment: "Positive", reach: "Industry", type: "News", source: "Joint Commission / Advocate Health PR", details: "Coverage of landmark collaboration with Joint Commission for 69-hospital systemwide accreditation. Industry-first approach. Positive framing around quality and safety commitment." },
  { outlet: "Charlotte Observer", date: "Dec 2025", topic: "The Pearl Innovation District Impact", sentiment: "Positive", reach: "Regional", type: "Feature", details: "In-depth local feature on The Pearl's first 6 months. Community economic impact, job creation, and healthcare innovation showcased.", source: "Charlotte Observer / Communications Team" },
  { outlet: "Chicago Tribune", date: "Nov 2025", topic: "South Side Healthcare Investment", sentiment: "Positive", reach: "Regional", type: "Feature", details: "Coverage of transformative investments on Chicago's South Side. Community voices and health equity narrative. Connected to 2025 Year in Review messaging.", source: "Chicago Tribune / Communications Team" },
  { outlet: "Winston-Salem Journal", date: "Feb 2026", topic: "Dr. Zaas Named CEO of Wake Forest Baptist", sentiment: "Positive", reach: "Regional", type: "News", details: "Announcement coverage of Dr. David Zaas appointment as CEO effective Jan 1, 2026. Includes Dr. Boulware's Chief Academic Officer appointment.", source: "Wake Forest Baptist Newsroom" },
  { outlet: "PR Newswire (National)", date: "Nov 2025", topic: "Workday Digital Transformation Deployment", sentiment: "Positive", reach: "National", type: "Press Release", details: "Joint press release with Workday announcing enterprise go-live for HCM, Finance, and Supply Chain. 160,000 employees on unified platform. PwC implementation partner.", source: "Workday/Advocate Health Joint PR" },
];

export const sentimentTrend = [
  { month: "Sep '25", positive: 42, neutral: 8, negative: 2 },
  { month: "Oct '25", positive: 38, neutral: 10, negative: 3 },
  { month: "Nov '25", positive: 56, neutral: 12, negative: 1 },
  { month: "Dec '25", positive: 44, neutral: 9, negative: 2 },
  { month: "Jan '26", positive: 62, neutral: 11, negative: 1 },
  { month: "Feb '26", positive: 48, neutral: 7, negative: 0 },
];

export const socialMediaMetrics = [
  { platform: "LinkedIn", followers: "285K", engagementRate: "4.2%", growth: "+12%", source: "LinkedIn Analytics / Sprout Social" },
  { platform: "X (Twitter)", followers: "142K", engagementRate: "2.1%", growth: "+5%", source: "X Analytics / Sprout Social" },
  { platform: "Facebook", followers: "520K", engagementRate: "3.8%", growth: "+8%", source: "Meta Business Suite / Sprout Social" },
  { platform: "Instagram", followers: "98K", engagementRate: "5.1%", growth: "+18%", source: "Meta Business Suite / Sprout Social" },
];

export const thoughtLeadership = [
  { event: "J.P. Morgan Healthcare Conference", date: "Jan 2026", speaker: "Eugene Woods, CEO", topic: "Rewire 2030 Strategy", status: "Completed", source: "JPM Conference / IR Team", details: "Keynote presentation covering Rewire 2030, revenue growth to $38B, The Advocate Way, and innovation partnerships. Attended by 500+ investors and analysts." },
  { event: "AHA Annual Membership Meeting", date: "Apr 2026", speaker: "Multiple Executives", topic: "Systemwide Innovation", status: "Confirmed", source: "AHA Conference Program", details: "Panel participation on systemwide accreditation model. Breakout session on hospital-at-home. Advocacy day meetings with Congressional delegation." },
  { event: "HIMSS Global Health Conference", date: "Mar 2026", speaker: "CIO / CMIO", topic: "AI in Clinical Ops (DAX Copilot)", status: "Confirmed", source: "HIMSS Conference Program", details: "Case study presentation on Microsoft DAX Copilot deployment across enterprise. Clinical documentation efficiency gains and physician satisfaction data." },
  { event: "Becker's Health Equity Forum", date: "Mar 2026", speaker: "Chief Equity Officer", topic: "Community Benefit as Strategy", status: "Confirmed", source: "Becker's Conference Program", details: "Presentation on $6.2B community benefit framework. How community investment drives both mission and margin. Case study on South Side Chicago initiative." },
  { event: "AAMC Annual Meeting", date: "Nov 2026", speaker: "Dr. Ebony Boulware, CAO", topic: "Academic Health System Model", status: "Submitted", source: "AAMC / Academic Affairs", details: "Abstract submitted on Advocate Health's unique academic-clinical integration model. Wake Forest partnership as blueprint for learning health system." },
  { event: "NCIHC National Conference", date: "May 2026", speaker: "Language Services Leadership", topic: "Enterprise Language Access", status: "Submitted", source: "NCIHC / Language Services", details: "Abstract submitted on enterprise-wide language services consolidation. AI integration in interpreter services. 6-state operational model." },
];

// ── Policy & Advocacy ──
export const policyPositions = [
  { topic: "Medicare Hospital Payment", position: "Protect & Increase", engagement: "Critical", coalition: "AHA, FAH", source: "Internal Policy Platform / AHA Alignment", details: "Oppose across-the-board cuts in reconciliation. Support market basket updates, geographic reclassification, and rural payment adjustments. Impact: $38B revenue at risk from payment policy changes." },
  { topic: "Medicaid Expansion & Access", position: "Champion", engagement: "Critical", coalition: "AHA, State Hospital Assns", source: "Internal Policy / AHA 2026 Agenda", details: "Advocate for expansion in GA and AL. Protect against per-capita caps. Support NC Medicaid transformation. $2.1B Medicaid shortfall demonstrates coverage gap impact." },
  { topic: "340B Drug Pricing", position: "Protect Program", engagement: "High", coalition: "340B Health", source: "340B Health / HRSA", details: "Defend contract pharmacy access. Support HRSA enforcement against manufacturer restrictions. Estimated $200M+ annual savings reinvested in community benefit programs." },
  { topic: "Workforce Development", position: "Increase Investment", engagement: "High", coalition: "AHA, AAMC", source: "Internal Policy / AAMC GME Position", details: "Support GME slot expansion. Promote visa pathways for international healthcare workers. Connected to $776M 2026 workforce investment and 200+ GME programs." },
  { topic: "Telehealth Access", position: "Permanent Expansion", engagement: "High", coalition: "ATA, AHA", source: "ATA / AHA Telehealth Advocacy", details: "Make COVID flexibilities permanent. As largest hospital-at-home provider, Advocate Health directly impacted by telehealth payment policies." },
  { topic: "Health Equity", position: "Champion", engagement: "High", coalition: "AHA, NQF, IHI", source: "Internal Equity Strategy / AHA Equity Roadmap", details: "$6.2B community benefit demonstrates commitment. SDOH screening integrated into clinical workflows. Health disparities research through Wake Forest." },
  { topic: "AI Regulation in Healthcare", position: "Balanced Innovation", engagement: "Medium", coalition: "CHIME, AHA", source: "Internal AI Strategy / CHIME Policy", details: "Support transparency and safety standards. Oppose restrictive regulation that stifles innovation. DAX Copilot and clinical AI programs as evidence of responsible deployment." },
  { topic: "Nonprofit Hospital Tax Status", position: "Defend", engagement: "Critical", coalition: "AHA, CHA", source: "AHA Tax-Exempt Defense / IRS Schedule H", details: "Community benefit ($6.2B) far exceeds estimated tax exemption value ($1.8B). Proactive communication strategy. Supporting AHA's 'Value of Tax-Exempt Hospitals' campaign." },
  { topic: "Prior Authorization Reform", position: "Reduce Burden", engagement: "High", coalition: "AHA, AMA", source: "AHA/AMA Joint Position / CMS Rule", details: "Support CMS final rule on MA prior auth. Push for broader reform through Improving Seniors' Timely Access to Care Act." },
  { topic: "Drug Pricing Transparency", position: "Support Reform", engagement: "Medium", coalition: "AHA, Hospitals", source: "AHA Drug Pricing Position", details: "Support transparency in PBM practices and manufacturer pricing. Protect 340B savings. Monitor IRA drug negotiation implementation for hospital formulary impact." },
];

export const coalitionMemberships = [
  { coalition: "American Hospital Association (AHA)", role: "Board Member", engagement: "Leadership", source: "AHA Membership Records", details: "CEO Eugene Woods serves on AHA Board. Active participation in all policy committees. Lead role in advocacy campaigns." },
  { coalition: "Association of American Medical Colleges (AAMC)", role: "Member Institution", engagement: "Active", source: "AAMC / Academic Affairs", details: "Through Wake Forest University School of Medicine. Active in GME policy, research advocacy, and medical education reform." },
  { coalition: "340B Health", role: "Member", engagement: "Active", source: "340B Health Membership", details: "Active advocacy for 340B program integrity. Participation in manufacturer restriction challenges and HRSA engagement." },
  { coalition: "National Quality Forum (NQF)", role: "Member", engagement: "Active", source: "NQF Membership", details: "Quality measure endorsement participation. Aligned with Joint Commission systemwide accreditation initiative." },
  { coalition: "State Hospital Associations (6 states)", role: "Major Member", engagement: "Leadership", source: "IHA, WHA, NCHA, SCHA, GHA, AlaHA", details: "Leadership positions in Illinois Hospital Association (IHA), Wisconsin Hospital Association (WHA), NC Healthcare Association (NCHA), SC Hospital Association, GA Hospital Association, Alabama Hospital Association." },
  { coalition: "Healthcare Leadership Council", role: "Member", engagement: "Active", source: "HLC Membership", details: "CEO-level coalition for healthcare policy. Multi-stakeholder dialogue on payment, workforce, and innovation." },
  { coalition: "CHIME (Health IT)", role: "Member", engagement: "Moderate", source: "CHIME Membership / CIO Office", details: "Health IT policy engagement. AI regulation, interoperability, and cybersecurity advocacy." },
  { coalition: "American Telehealth Association", role: "Member", engagement: "Active", source: "ATA Membership", details: "Telehealth policy advocacy. As largest hospital-at-home provider, significant voice in virtual care regulations." },
];

export const grantActivity = [
  { name: "HRSA Teaching Health Center GME", amount: 8.2, status: "Awarded", period: "2024-2027", src: "Federal", source: "HRSA Grant Award Database", details: "Multi-year GME expansion funding across primary care residency programs. Supports Advocate Health's 200+ GME programs and 2,000+ residents." },
  { name: "NIH Clinical Trial Network", amount: 14.6, status: "Active", period: "2023-2028", src: "Federal", source: "NIH RePORTER Database", details: "National Center for Clinical Trials (NCCT) network participation. 500+ active clinical trials across enterprise. Wake Forest academic core driving research agenda." },
  { name: "CMS Innovation Center (BPCI-A)", amount: 0, status: "Participating", period: "2025-2029", src: "Federal", source: "CMS Innovation Center", details: "Bundled Payments for Care Improvement Advanced. Value-based payment model across multiple clinical episodes. No direct grant, but shared savings opportunity." },
  { name: "FEMA Hospital Preparedness", amount: 3.8, status: "Awarded", period: "2025-2026", src: "Federal", source: "FEMA HPP Grant Database", details: "Hospital preparedness and emergency response capabilities across 69 hospitals. Supports AHA advocacy for full FEMA reimbursement." },
  { name: "State of IL Hospital Assessment", amount: 420, status: "Active", period: "2025-2026", src: "State", source: "IL HFS / IHA", details: "Illinois Hospital Assessment Program providing Medicaid supplemental payments. Advocate Health Care is largest beneficiary. Renewal (HB-3012) is Critical legislative priority." },
  { name: "NC DHHS Medicaid Transformation", amount: 6.4, status: "Active", period: "2024-2027", src: "State", source: "NC DHHS Medicaid Division", details: "Medicaid managed care transition support funding. Provider readiness, network development, and patient navigation programs for Atrium Health markets." },
  { name: "Robert Wood Johnson Foundation", amount: 2.1, status: "Applied", period: "2026-2028", src: "Foundation", source: "RWJF Application Portal", details: "Community health equity initiative proposal. Focus on SDOH integration and health disparities reduction across enterprise footprint." },
  { name: "Duke Endowment (Carolinas)", amount: 4.5, status: "Active", period: "2025-2027", src: "Foundation", source: "Duke Endowment Awards Database", details: "Carolinas-focused healthcare improvement grants. Rural health access, maternal health, and workforce development programs for Atrium Health." },
];

// ── Stakeholders ──
export const stakeholderMap = [
  { group: "Federal Legislators", influence: "Critical", relationship: "Strong", frequency: "Monthly", owner: "SVP Gov Relations", source: "Gov Relations CRM / Meeting Logs", details: "Active relationships with 32 federal legislators across IL, WI, NC, SC, GA, AL delegations. Regular PAC engagement. Annual D.C. advocacy trip. Key committee relationships on HELP, E&C, Ways & Means, Appropriations." },
  { group: "State Legislators (6 states)", influence: "Critical", relationship: "Strong", frequency: "Bi-weekly", owner: "VP State Affairs", source: "State Affairs CRM / Meeting Logs", details: "56 active state legislator relationships across 6 states. Coordinated through state hospital association partnerships. Key focus: IL Hospital Assessment, NC Medicaid, WI Telehealth." },
  { group: "CMS / HHS Leadership", influence: "Critical", relationship: "Strong", frequency: "Quarterly", owner: "SVP Gov Relations", source: "Federal Affairs Meeting Calendar", details: "Regular engagement with CMS Administrator, ONC, HRSA, and HHS Secretary's office. Comment letter submission on all major rules. Innovation Center participation." },
  { group: "Joint Commission", influence: "High", relationship: "Strong", frequency: "Ongoing", owner: "VP Quality/Safety", source: "Joint Commission Liaison / PR", details: "Landmark systemwide accreditation collaboration (May 2025). CEO Perlin engagement. Performance data sharing. Site visit preparation for 69 hospitals." },
  { group: "State Health Departments (6)", influence: "High", relationship: "Moderate-Strong", frequency: "Monthly", owner: "VP State Affairs", source: "State Affairs / Public Health Teams", details: "Relationships with IL DPH, WI DHS, NC DHHS, SC DHEC, GA DPH, AL ADPH. CHNA alignment, disease surveillance, emergency preparedness coordination." },
  { group: "Community Organizations (309)", influence: "High", relationship: "Strong", frequency: "Ongoing", owner: "VP Community Health", source: "Community Health CRM", details: "309 active community organization partnerships. United Way, faith-based networks, social service agencies. 42,000 annual SDOH referrals. CHNA implementation partners." },
  { group: "Academic Partners", influence: "High", relationship: "Strong", frequency: "Weekly", owner: "Chief Academic Officer", source: "Academic Affairs / Wake Forest", details: "Wake Forest University School of Medicine as academic core. Charlotte medical campus. NCCT clinical trials network. 200+ GME programs." },
  { group: "Media & Press", influence: "High", relationship: "Proactive", frequency: "Weekly", owner: "VP Communications", source: "Meltwater / Media Contact Database", details: "155 active media contacts. Proactive pitching strategy. 94% positive sentiment. Key outlets: HBR, Becker's, Fierce Healthcare, Modern Healthcare, local dailies." },
  { group: "Rating Agencies (Moody's/S&P/Fitch)", influence: "High", relationship: "Strong", frequency: "Semi-annual", owner: "CFO / Treasurer", source: "IR Team / Rating Agency Reports", details: "Investment-grade credit ratings maintained. Semi-annual rating agency meetings. Proactive communication on Rewire 2030 strategy and financial performance." },
  { group: "Payer Organizations", influence: "High", relationship: "Varies", frequency: "Monthly", owner: "VP Managed Care", source: "Managed Care / Payer Relations", details: "Major commercial and government payer relationships. Contract negotiations across 6-state footprint. Value-based care agreements. Network adequacy discussions." },
  { group: "Innovation Partners (IRCAD, Siemens, Microsoft)", influence: "Medium", relationship: "Growing", frequency: "Monthly", owner: "Chief Innovation Officer", source: "Innovation Office / The Pearl", details: "The Pearl innovation district partnerships. Microsoft DAX Copilot deployment. IRCAD surgical training center. Siemens technology collaboration. 100+ collaborators in ecosystem." },
  { group: "Labor Unions", influence: "Medium", relationship: "Constructive", frequency: "As needed", owner: "VP Labor Relations", source: "Labor Relations / HR", details: "Constructive engagement with labor organizations. Proactive workforce investment ($776M 2026) addresses key workforce concerns. Collaborative approach to staffing and compensation." },
];

export const engagementByRegion = [
  { region: "Illinois (Advocate HC)", legislators: 24, communityOrgs: 85, mediaContacts: 42, events: 68, source: "Regional Affairs Dashboard" },
  { region: "Wisconsin (Aurora HC)", legislators: 16, communityOrgs: 52, mediaContacts: 28, events: 44, source: "Regional Affairs Dashboard" },
  { region: "Charlotte (Atrium)", legislators: 18, communityOrgs: 68, mediaContacts: 35, events: 56, source: "Regional Affairs Dashboard" },
  { region: "W-S (Wake Forest)", legislators: 10, communityOrgs: 38, mediaContacts: 20, events: 32, source: "Regional Affairs Dashboard" },
  { region: "Georgia (Atrium)", legislators: 12, communityOrgs: 42, mediaContacts: 18, events: 28, source: "Regional Affairs Dashboard" },
  { region: "Alabama (Atrium)", legislators: 8, communityOrgs: 24, mediaContacts: 12, events: 16, source: "Regional Affairs Dashboard" },
];

// ── Alerts ──
export const alerts = [
  { severity: "Critical", msg: "CMS Hospital CoP comment period closes March 15. Enterprise response must be filed. Legal review pending.", domain: "Regulatory", due: "Mar 5", source: "Federal Register / Legal Affairs" },
  { severity: "Critical", msg: "Congressional reconciliation bill includes potential Medicaid restructuring. AHA coalition response coordinating.", domain: "Government Relations", due: "Ongoing", source: "AHA Government Affairs / Internal" },
  { severity: "Critical", msg: "IL Hospital Assessment Program renewal (HB-3012) in committee. $420M annual program at stake.", domain: "State Affairs (IL)", due: "Mar 20", source: "IL General Assembly / IHA" },
  { severity: "High", msg: "NC Medicaid Managed Care transition creating provider network adequacy concerns. State affairs engagement needed.", domain: "State Affairs (NC)", due: "Q2 2026", source: "NC DHHS / Atrium Health Managed Care" },
  { severity: "High", msg: "Joint Commission systemwide accreditation site visits scheduled Q2 2026. Enterprise readiness assessment in progress.", domain: "Regulatory", due: "Apr 2026", source: "Joint Commission / Quality Office" },
  { severity: "High", msg: "Rewire 2030 external communications plan for Phase 2 rollout needs board approval at March meeting.", domain: "Communications", due: "Mar 15", source: "Strategy Office / Communications" },
  { severity: "Medium", msg: "AHA Annual Conference delegation and presentation prep. Multiple executive presentations confirmed.", domain: "Industry Leadership", due: "Apr 12", source: "AHA Conference / Gov Relations" },
  { severity: "Medium", msg: "Community benefit reporting (IRS Schedule H) due for FY2025. Data collection across all markets underway.", domain: "Community Benefit", due: "May 15", source: "Tax / Community Benefit Office" },
  { severity: "Low", msg: "Q1 2026 External Affairs quarterly report for board of directors due.", domain: "Internal", due: "Apr 30", source: "External Affairs Office" },
];
