import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowDown, ArrowRight, BarChart3, BookOpen, Check, ChevronLeft, ChevronRight,
  ExternalLink, Instagram, Menu, MessageCircle, Play, Send, ShieldCheck, Sparkles,
  Star, Target, X, Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const links = {
  youtube: "https://youtube.com/@dhan.one3?si=oPNc0pH48cFnx8yV",
  instagram: "https://www.instagram.com/dhanone.3?stkn=amdvMHdzZm44MThv",
  telegram: "https://t.me/DhanOne3",
  discord: "https://discord.gg/2pXAbQbnP/",
  trustpilot: "https://www.trustpilot.com/review/dhanone3.com",
  mentorship: "https://t.me/Dhanone3_Admin",
  playlist: "https://youtube.com/playlist?list=PLEKwHoU5fUvo&si=-9HmCU2Wcxw3qdbh",
};

const videos = [
  ["zMHUqfMu5dA", "FOUNDATIONS", "What is Trading? Learn the complete basics of Trading with Supply & Demand Zones ( PART 01 )", "https://youtu.be/zMHUqfMu5dA?si=n52WhnCQAW3LaL1W"],
  ["mXgcGf9pj-w", "PRICE ACTION", "Read Candlestick Patterns Like a Pro | Part 1 (Beginner to Advanced)", "https://youtu.be/mXgcGf9pj-w?si=nZSLnKTqf20mSSmU"],
  ["T_ux8RrAuSI", "TECHNICAL ANALYSIS", "How to Use Fibonacci Retracement Like a Pro | Complete Guide Part-01", "https://youtu.be/T_ux8RrAuSI?si=m7YS5laK235R190W"],
  ["iX67H0kj85g", "SMART MONEY", "SMC Structure Mapping Explained | BOS, MSS, Liquidity & Inducement | Smart Money Concept Part 02", "https://youtu.be/iX67H0kj85g?si=ZV_sWvaWbR6jyDsa"],
  ["5YGQ5waY8X0", "MARKET BIAS", "Bias in Trading Explained | Daily Bias Trading Strategy | in Hindi – Part 01", "https://youtu.be/5YGQ5waY8X0?si=GqmFdOBzs3zCCJVT"],
] as const;

const nav = [["HOME", "home"], ["ABOUT", "about"], ["TRADE PROOFS", "proofs"], ["LEARN", "learn"], ["REVIEWS", "reviews"], ["CONTACT", "contact"]] as const;
const socials = [
  { Icon: Youtube, name: "YOUTUBE", description: "Free trading education and market content.", url: links.youtube },
  { Icon: Instagram, name: "INSTAGRAM", description: "Follow the latest content and updates.", url: links.instagram },
  { Icon: Send, name: "TELEGRAM", description: "Join the DhanOne3 trading community.", url: links.telegram },
  { Icon: MessageCircle, name: "DISCORD", description: "Join the community and discussions.", url: links.discord },
];
const tradeImages = [
  "/Images/trade-chart-gold-plan.jpg",
  "/Images/trade-chart-gold-setup.jpg",
  "/Images/trade-chart-nifty.jpg",
  "/Images/trade-chart-reversal.jpg",
  "/Images/trade-chart-liquidity.jpg",
];
const tradeLabels = ["MARKET STRUCTURE", "LIQUIDITY MAP", "PRICE ACTION", "TRADE JOURNAL", "TRADING SETUP"];
const reviewImages = [
  "/Images/review-praveen.jpg",
  "/Images/review-takdir.jpg",
  "/Images/review-sarthak.jpg",
  "/Images/review-khemraj.jpg",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DhanOne3 — Trade With Discipline. Learn With Purpose." },
      { name: "description", content: "DhanOne3 provides trading education, market concepts, free learning resources and mentorship focused on disciplined trading and practical market understanding." },
      { property: "og:title", content: "DhanOne3 — Trade With Discipline. Learn With Purpose." },
      { property: "og:description", content: "Trading education, free learning resources and mentorship focused on disciplined trading." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [review, setReview] = useState(0);
  const [formState, setFormState] = useState<"idle" | "loading" | "ready">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal-item").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const contact = String(fd.get("contact") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const next: Record<string, string> = {};
    if (!name) next["name"] = "Please enter your name.";
    if (!contact) next["contact"] = "Please enter an email address or phone number.";
    else if (contact.includes("@") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) next["contact"] = "Please enter a valid email address.";
    if (!message) next["message"] = "Please enter your message.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setFormState("loading");
    window.setTimeout(() => setFormState("ready"), 450);
  };

  return <main className="bg-background text-foreground">
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/75 backdrop-blur-xl">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto] items-center px-5 lg:grid-cols-[auto_1fr_auto] lg:px-8">
        <button onClick={() => scrollTo("home")} className="font-display text-xl font-bold tracking-normal text-foreground" aria-label="DhanOne3 home">DhanOne<span className="text-primary">3</span></button>
        <nav className="hidden justify-center gap-7 lg:flex" aria-label="Primary navigation">{nav.map(([label,id]) => <button key={id} onClick={() => scrollTo(id)} className="text-[11px] font-semibold text-muted-foreground transition-colors hover:text-foreground">{label}</button>)}</nav>
        <Button asChild size="sm" className="hidden lg:inline-flex"><a href={links.mentorship} target="_blank" rel="noreferrer">JOIN MENTORSHIP <ArrowRight /></a></Button>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</Button>
      </div>
      {menuOpen && <nav className="border-t border-border bg-background px-5 py-5 lg:hidden">{nav.map(([label,id]) => <button key={id} onClick={() => scrollTo(id)} className="block w-full border-b border-border py-4 text-left text-sm font-semibold">{label}</button>)}<Button asChild className="mt-5 w-full"><a href={links.mentorship} target="_blank" rel="noreferrer">JOIN MENTORSHIP <ArrowRight /></a></Button></nav>}
    </header>

    <section id="home" className="relative flex min-h-[92svh] items-center overflow-hidden pt-16">
      <div className="absolute inset-0 grid-field opacity-60" />
      <div className="absolute inset-0 market-glow" />
      <MarketVisual />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 lg:px-8">
        <div className="max-w-4xl">
          <div className="mb-8 inline-flex items-center gap-2 border border-border bg-glass px-3 py-2 text-[10px] font-bold text-muted-foreground backdrop-blur"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> TRADING EDUCATION · MARKET UNDERSTANDING</div>
          <h1 className="text-balance font-display text-5xl font-bold leading-[0.96] tracking-normal sm:text-7xl lg:text-[6.7rem]">TRADE WITH DISCIPLINE.<br/><span className="text-muted-foreground">LEARN WITH PURPOSE.</span></h1>
          <p className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Learn trading through structured concepts, practical market analysis and a disciplined approach to the financial markets.</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row"><Button size="lg" onClick={() => scrollTo("learn")} className="h-13 px-7">START LEARNING FREE <ArrowDown /></Button><Button variant="outline" size="lg" asChild className="h-13 px-7"><a href={links.mentorship} target="_blank" rel="noreferrer">JOIN MENTORSHIP <ArrowRight /></a></Button></div>
        </div>
      </div>
      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] font-semibold text-muted-foreground md:flex">SCROLL TO EXPLORE <ArrowDown className="size-3" /></div>
    </section>

    <section id="about" className="section-pad border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8">
        <div className="reveal-item">
          <div className="glass-panel relative flex aspect-[4/5] items-center justify-center overflow-hidden">
            <div className="absolute inset-0 grid-field opacity-50"/><div className="absolute inset-x-[12%] bottom-0 top-[10%] rounded-full bg-primary/10 blur-3xl"/><img src="/Images/dhanone3-portrait.png" alt="Gaurav Vaishnav, trader, mentor and market educator behind DhanOne3" className="relative z-10 size-full object-contain object-bottom drop-shadow-2xl"/>
            <div className="absolute inset-x-5 bottom-5 z-20 flex items-center justify-between gap-3 rounded-xl border border-border bg-background/70 px-4 py-3 backdrop-blur-xl">
              <div><p className="font-display text-sm font-bold text-foreground">Gaurav Vaishnav</p><p className="mt-1 text-[9px] font-bold text-muted-foreground">TRADER • MENTOR • MARKET EDUCATOR</p></div>
              <span className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[9px] font-bold text-primary">SINCE 2019</span>
            </div>
          </div>
        </div>
        <div className="reveal-item lg:pl-12">
          <Eyebrow>ABOUT DHANONE3</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-6xl">THE PERSON BEHIND<br/>THE CHARTS.</h2>
          <p className="mt-8 font-display text-3xl font-bold leading-none text-foreground sm:text-4xl">Gaurav Vaishnav</p>
          <p className="mt-3 text-[10px] font-bold tracking-[0.22em] text-primary">TRADER • MENTOR • MARKET EDUCATOR</p>
          <div className="mt-7 max-w-2xl space-y-5 text-base leading-8 text-muted-foreground">
            <p>Trading since 2019, Gaurav Vaishnav is the person behind DhanOne3, focused on making complex market concepts simple, practical, and actionable.</p>
            <p>His approach revolves around Smart Money Concepts, Price Action, Liquidity, Market Structure, Bias, and disciplined chart analysis — helping traders understand why the market moves instead of simply following signals.</p>
            <p>Through DhanOne3, Gaurav shares his knowledge through free educational content, real-chart analysis, and structured mentorship, with a strong emphasis on learning, practice, risk awareness, and discipline.</p>
          </div>
          <div className="mt-9 grid gap-3 sm:grid-cols-3">{[["01","TRADING SINCE","2019"],["02","CORE APPROACH","SMC • PRICE ACTION"],["03","FOCUS","EDUCATION • DISCIPLINE"]].map(([num,label,value])=><div key={num} className="glass-panel group relative overflow-hidden p-4 transition-transform duration-500 hover:-translate-y-1"><span className="absolute right-3 top-2 font-display text-2xl font-bold text-primary/15 transition-colors duration-500 group-hover:text-primary/35">{num}</span><p className="text-[9px] font-bold text-muted-foreground">{label}</p><p className="mt-2 font-display text-sm font-bold leading-5 text-foreground">{value}</p><span className="absolute inset-x-4 bottom-0 h-px bg-primary/0 transition-colors duration-500 group-hover:bg-primary/50"/></div>)}</div>
          <div className="mt-8 flex flex-wrap gap-2">{["Market Structure","Liquidity","Trading Bias","Price Action","Smart Money Concepts","Risk Awareness","Trading Psychology"].map((x)=><span key={x} className="rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-[10px] font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground">{x}</span>)}</div>
        </div>
      </div>
    </section>

    <section id="proofs" className="section-pad bg-secondary/35">
      <div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="reveal-item max-w-3xl"><Eyebrow>SHARED TRADE EXAMPLES</Eyebrow><h2 className="mt-5 font-display text-4xl font-bold leading-[1.02] sm:text-6xl">REAL TRADES.<br/>REAL CHARTS.<br/><span className="text-muted-foreground">REAL JOURNEY.</span></h2><p className="mt-6 text-muted-foreground">A selection of shared trade examples, market setups and chart analysis.</p></div>
        <div className="mt-12 grid gap-4 md:grid-cols-12">{tradeImages.map((asset,i)=><button key={asset} onClick={()=>setLightbox(i)} className={`group reveal-item relative min-h-64 overflow-hidden border border-border bg-card text-left ${i===0||i===3 ? "md:col-span-7" : "md:col-span-5"} ${i===4 ? "md:col-span-12" : ""}`}><img src={asset} alt={`${tradeLabels[i]} chart shared by DhanOne3`} loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"/><span className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"/><span className="absolute bottom-5 left-5 text-xs font-semibold text-foreground">{tradeLabels[i]}</span><span className="absolute right-5 top-5 flex size-9 items-center justify-center border border-border bg-background/70 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100"><ExternalLink className="size-4" /></span></button>)}</div>
        <Button variant="link" asChild className="mt-8 px-0"><a href={links.telegram} target="_blank" rel="noreferrer">VIEW MORE TRADE PROOFS <ArrowRight /></a></Button>
      </div>
    </section>

    <section className="section-pad relative overflow-hidden"><div className="absolute inset-0 grid-field edge-fade opacity-60"/><div className="relative mx-auto max-w-7xl px-5 lg:px-8"><Eyebrow>THE PROCESS</Eyebrow><h2 className="mt-5 font-display text-4xl font-bold sm:text-7xl">CONTINUOUS<br/><span className="text-primary">IMPROVEMENT.</span></h2><div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-6">{["LEARN.","ANALYZE.","PRACTICE.","REVIEW.","IMPROVE.","STAY DISCIPLINED."].map((x,i)=><div key={x} className="reveal-item bg-background p-6 md:min-h-40"><span className="text-xs text-primary">0{i+1}</span><p className="mt-14 font-display text-sm font-bold">{x}</p></div>)}</div></div></section>

    <section id="learn" className="section-pad border-y border-border bg-secondary/35"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="reveal-item"><Eyebrow>FREE EDUCATION</Eyebrow><h2 className="mt-5 font-display text-4xl font-bold sm:text-6xl">LEARN TRADING FOR FREE.</h2><p className="mt-5 text-muted-foreground">Start from the fundamentals and build your understanding step by step.</p></div><div className="video-scroller -mx-5 mt-12 flex snap-x gap-4 overflow-x-auto px-5 pb-5 md:mx-0 md:grid md:grid-cols-2 md:px-0 lg:grid-cols-3">{videos.map(([id,cat,title,url],i)=><a key={id} href={url} target="_blank" rel="noreferrer" className={`group reveal-item min-w-[84vw] snap-center overflow-hidden border border-border bg-card transition-transform duration-300 hover:-translate-y-1 md:min-w-0 ${i===3||i===4 ? "lg:col-span-1" : ""}`}><div className="relative aspect-video overflow-hidden"><img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt={`YouTube thumbnail for ${title}`} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105"/><div className="absolute inset-0 bg-background/15"/><span className="absolute left-1/2 top-1/2 flex size-13 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground"><Play className="ml-0.5 fill-current" /></span></div><div className="p-5"><span className="text-[10px] font-bold text-primary">{cat}</span><h3 className="mt-3 line-clamp-3 min-h-16 font-display text-base font-semibold leading-6">{title}</h3><div className="mt-5 flex items-center text-xs font-semibold text-muted-foreground">WATCH ON YOUTUBE <ArrowRight className="ml-auto size-4 transition-transform group-hover:translate-x-1" /></div></div></a>)}</div><Button variant="link" asChild className="mt-7 px-0"><a href={links.playlist} target="_blank" rel="noreferrer">EXPLORE THE COMPLETE ZERO → HERO SERIES <ArrowRight /></a></Button></div></section>

    <section id="reviews" className="section-pad"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div className="reveal-item"><Eyebrow>TRUSTPILOT</Eyebrow><h2 className="mt-5 font-display text-4xl font-bold sm:text-6xl">WHAT THE<br/>COMMUNITY SAYS.</h2><div className="mt-8 flex items-end gap-4"><span className="font-display text-5xl font-bold">4.8 / 5</span><span className="mb-1 text-xs text-muted-foreground">46 Reviews</span></div><div className="mt-3 flex gap-1 text-primary" aria-label="5 stars"><Star className="fill-current"/><Star className="fill-current"/><Star className="fill-current"/><Star className="fill-current"/><Star className="fill-current"/></div><p className="mt-3 text-sm text-muted-foreground">46 Reviews on Trustpilot</p></div><div className="glass-panel reveal-item p-6 sm:p-10"><div className="flex items-center justify-between"><span className="text-xs font-bold text-primary">AUTHENTIC REVIEWS</span><div className="flex gap-2"><Button variant="outline" size="icon" onClick={()=>setReview((review+reviewImages.length-1)%reviewImages.length)} aria-label="Previous review"><ChevronLeft/></Button><Button variant="outline" size="icon" onClick={()=>setReview((review+1)%reviewImages.length)} aria-label="Next review"><ChevronRight/></Button></div></div><div className="mt-8 flex max-h-[30rem] items-start justify-center overflow-hidden bg-foreground"><img src={reviewImages[review]} alt={`Trustpilot review ${review+1} of ${reviewImages.length} for DhanOne3`} loading="lazy" className="max-h-[30rem] w-auto max-w-full object-contain"/></div><div className="mt-4 flex justify-center gap-2">{reviewImages.map((asset,i)=><button key={asset} onClick={()=>setReview(i)} className={`h-1.5 transition-all ${i===review ? "w-8 bg-primary" : "w-3 bg-muted"}`} aria-label={`Show review ${i+1}`}/>)}</div></div></div><Button variant="link" asChild className="mt-8 px-0"><a href={links.trustpilot} target="_blank" rel="noreferrer">VIEW ALL REVIEWS ON TRUSTPILOT <ArrowRight /></a></Button></div></section>

    <section className="section-pad border-y border-border bg-secondary/35"><div className="mx-auto max-w-7xl px-5 lg:px-8"><Eyebrow>COMMUNITY</Eyebrow><h2 className="mt-5 font-display text-4xl font-bold sm:text-6xl">FOLLOW THE JOURNEY.</h2><div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{socials.map(({Icon,name,description,url})=><a key={name} href={url} target="_blank" rel="noreferrer" className="group reveal-item bg-background p-7 transition-colors hover:bg-card"><Icon className="size-6 text-primary"/><h3 className="mt-14 font-display text-lg font-bold">{name}</h3><p className="mt-3 min-h-12 text-sm leading-6 text-muted-foreground">{description}</p><ArrowRight className="mt-7 size-4 transition-transform group-hover:translate-x-1"/></a>)}</div></div></section>

    <section className="section-pad"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="glass-panel grid-field reveal-item relative overflow-hidden p-7 sm:p-12 lg:p-16"><div className="absolute inset-0 market-glow"/><div className="relative max-w-3xl"><Eyebrow>PAID MENTORSHIP</Eyebrow><h2 className="mt-5 font-display text-4xl font-bold sm:text-6xl">READY TO TAKE YOUR<br/>LEARNING FURTHER?</h2><p className="mt-6 max-w-xl leading-7 text-muted-foreground">For structured guidance and paid mentorship enquiries, connect directly with DhanOne3.</p><Button asChild size="lg" className="mt-8 h-13"><a href={links.mentorship} target="_blank" rel="noreferrer">JOIN MENTORSHIP <ArrowRight/></a></Button></div></div></div></section>

    <section id="contact" className="section-pad border-t border-border bg-secondary/35"><div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:px-8"><div className="reveal-item"><Eyebrow>CONTACT</Eyebrow><h2 className="mt-5 font-display text-5xl font-bold sm:text-7xl">LET'S CONNECT.</h2><p className="mt-6 max-w-md leading-7 text-muted-foreground">Have a question about learning or mentorship? Share the details below, then continue securely through Telegram.</p><div className="mt-10 flex items-center gap-3 text-sm text-muted-foreground"><Target className="text-primary"/> Education-focused guidance</div><div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground"><BookOpen className="text-primary"/> Structured learning enquiries</div></div><form onSubmit={submit} noValidate className="glass-panel reveal-item p-6 sm:p-8">{formState === "ready" ? <div className="flex min-h-96 flex-col items-center justify-center text-center"><span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check/></span><h3 className="mt-6 font-display text-2xl font-bold">YOUR ENQUIRY IS READY.</h3><p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">No information was submitted here. Continue on Telegram to send your enquiry directly to DhanOne3.</p><Button asChild className="mt-7"><a href={links.mentorship} target="_blank" rel="noreferrer">CONNECT ON TELEGRAM <ArrowRight/></a></Button><Button type="button" variant="ghost" className="mt-2" onClick={()=>setFormState("idle")}>EDIT ENQUIRY</Button></div> : <><Field label="NAME" error={errors["name"]}><Input name="name" maxLength={100} aria-invalid={!!errors["name"]} className="h-12" placeholder="Your name"/></Field><Field label="EMAIL / PHONE" error={errors["contact"]}><Input name="contact" maxLength={255} aria-invalid={!!errors["contact"]} className="h-12" placeholder="Email address or phone number"/></Field><Field label="YOUR MESSAGE" error={errors["message"]}><Textarea name="message" maxLength={1000} aria-invalid={!!errors["message"]} className="min-h-36 resize-none" placeholder="How can DhanOne3 help?"/></Field><Button disabled={formState === "loading"} className="mt-2 h-12 w-full">{formState === "loading" ? "CHECKING…" : "SEND ENQUIRY"} <ArrowRight/></Button><p className="mt-5 text-center text-xs text-muted-foreground">Prefer to discuss mentorship directly? <a href={links.mentorship} target="_blank" rel="noreferrer" className="font-semibold text-primary">CONNECT ON TELEGRAM →</a></p></>}</form></div></section>

    <footer className="border-t border-border px-5 pb-8 pt-14 lg:px-8"><div className="mx-auto max-w-7xl"><div className="grid gap-10 border-b border-border pb-12 md:grid-cols-4"><div><p className="font-display text-2xl font-bold">DhanOne<span className="text-primary">3</span></p><p className="mt-4 text-xs font-semibold text-muted-foreground">BUILD YOUR DISCIPLINE.</p></div><FooterLinks title="EXPLORE" items={nav.map(([x,id])=>[x,`#${id}`])}/><FooterLinks title="SOCIAL" items={[["YouTube",links.youtube],["Instagram",links.instagram],["Telegram",links.telegram],["Discord",links.discord],["Trustpilot",links.trustpilot]]}/><div><p className="text-[10px] font-bold text-muted-foreground">MENTORSHIP</p><Button variant="link" asChild className="mt-4 px-0"><a href={links.mentorship} target="_blank" rel="noreferrer">JOIN MENTORSHIP <ArrowRight/></a></Button></div></div><div className="mt-8 grid gap-6 text-xs leading-6 text-muted-foreground md:grid-cols-[1fr_auto] md:items-end"><p className="max-w-3xl">Educational content only. Trading and investing involve risk. Past results and shared trade examples do not guarantee future performance. DhanOne3 does not guarantee profits or returns.</p><p>© {new Date().getFullYear()} DhanOne3</p></div></div></footer>

    {lightbox !== null && <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur" role="dialog" aria-modal="true" aria-label="Trade chart preview"><Button variant="outline" size="icon" className="absolute right-5 top-5" onClick={()=>setLightbox(null)}><X/></Button><div className="relative flex max-h-[84vh] w-full max-w-6xl items-center justify-center overflow-hidden border border-border bg-card"><img src={tradeImages[lightbox]} alt={`${tradeLabels[lightbox]} chart enlarged`} className="max-h-[84vh] w-full object-contain"/></div></div>}
  </main>;
}

function Eyebrow({children}:{children: React.ReactNode}) { return <p className="flex items-center gap-3 text-[10px] font-bold text-primary"><span className="h-px w-8 bg-primary"/>{children}</p>; }
function Field({label,error,children}:{label:string,error:string | undefined,children:React.ReactNode}) { return <label className="mb-5 block"><span className="mb-2 block text-[10px] font-bold text-muted-foreground">{label}</span>{children}{error && <span className="mt-2 block text-xs text-destructive">{error}</span>}</label>; }
function FooterLinks({title,items}:{title:string,items:readonly (readonly [string,string])[]}) { return <div><p className="text-[10px] font-bold text-muted-foreground">{title}</p><ul className="mt-4 space-y-2">{items.map(([label,url])=><li key={label}><a href={url} className="text-sm text-muted-foreground transition-colors hover:text-foreground" target={url.startsWith("http") ? "_blank" : undefined} rel={url.startsWith("http") ? "noreferrer" : undefined}>{label}</a></li>)}</ul></div>; }
function MarketVisual() { const candles = [[100,430,60],[180,470,78],[290,370,55],[365,400,90],[475,300,76],[560,330,110],[670,220,65],[755,255,95]] as const; return <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] lg:block"><svg className="size-full opacity-70" viewBox="0 0 900 700" fill="none" aria-hidden="true"><path d="M30 535 C135 500 155 540 250 455 S365 450 440 342 S580 350 640 250 S780 238 880 112" stroke="var(--primary)" strokeWidth="2" strokeDasharray="8 10" className="chart-dash"/><path d="M30 535 C135 500 155 540 250 455 S365 450 440 342 S580 350 640 250 S780 238 880 112 V700 H30Z" fill="url(#area)" opacity=".15"/><defs><linearGradient id="area" x1="450" y1="100" x2="450" y2="700"><stop stopColor="var(--primary)"/><stop offset="1" stopColor="var(--primary)" stopOpacity="0"/></linearGradient></defs>{candles.map(([x,y,h],i)=><g key={i}><line x1={x} y1={y-h/2} x2={x} y2={y+h/2} stroke="var(--muted-foreground)"/><rect x={x-7} y={y-h/4} width="14" height={h/2} fill={i%2 ? "var(--muted-foreground)" : "var(--primary)"}/></g>)}</svg></div>; }
function ChartPlaceholder({variant}:{variant:number}) { const paths=["M0 160 C80 145 100 180 180 120 S280 135 350 65 S470 100 560 30","M0 90 C90 150 130 20 220 100 S330 170 410 70 S520 120 600 40","M0 180 L80 140 L140 155 L220 70 L300 110 L390 40 L470 80 L600 20","M0 130 C100 60 170 180 250 90 S390 70 460 120 S540 60 620 35"]; return <div className="absolute inset-0 grid-field"><svg viewBox="0 0 600 220" className="absolute inset-0 size-full opacity-60" preserveAspectRatio="none"><path d={paths[variant%paths.length]} stroke="var(--primary)" strokeWidth="2" fill="none"/><path d="M0 190 H600 M0 145 H600 M0 100 H600 M0 55 H600" stroke="var(--grid)"/></svg><div className="absolute right-[18%] top-[22%] h-20 w-px bg-primary/40"/><div className="absolute right-[18%] top-[30%] h-px w-20 bg-primary/40"/></div>; }
