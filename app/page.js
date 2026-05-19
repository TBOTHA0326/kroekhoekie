'use client';

import { useState, useEffect, useRef } from 'react';

// ─── DATA ───────────────────────────────────────────────────────────────────
const subjectsData = {
  9: [
    { name: 'Mathematics',                   icon: 'fa-calculator',          color: '#3B82F6', desc: 'Numbers, patterns, algebra, geometry, and data handling at Senior Phase level.',   topics: ['Algebra', 'Geometry', 'Patterns', 'Data Handling'] },
    { name: 'Natural Sciences',              icon: 'fa-flask',               color: '#10B981', desc: 'Life and living, matter and materials, energy, and planet earth.',                topics: ['Life & Living', 'Matter', 'Energy', 'Planet Earth'] },
    { name: 'Social Sciences — History',     icon: 'fa-landmark',            color: '#F59E0B', desc: 'SA and world history: colonial conquest, industrialisation, and human rights.',    topics: ['Colonial Conquest', 'Industrialisation', 'Human Rights', 'SA History'] },
    { name: 'Social Sciences — Geography',   icon: 'fa-globe-africa',        color: '#EF4444', desc: 'Population, development, settlement, and natural resources.',                     topics: ['Population', 'Development', 'Settlement', 'Resources'] },
    { name: 'English Home Language',         icon: 'fa-pen-nib',             color: '#8B5CF6', desc: 'Reading, writing, listening, and speaking skills at Grade 9 level.',              topics: ['Reading', 'Writing', 'Listening', 'Speaking'] },
    { name: 'Afrikaans FAL',                 icon: 'fa-language',            color: '#F97316', desc: 'Afrikaans taal, letterkunde, skryfwerk, en kommunikasie.',                        topics: ['Taal', 'Letterkunde', 'Skryfwerk', 'Mondelinge'] },
    { name: 'Econ. & Management Sciences',   icon: 'fa-briefcase',           color: '#06B6D4', desc: 'The economy, financial literacy, and entrepreneurship basics.',                   topics: ['Economy', 'Financial Literacy', 'Entrepreneurship', 'Business'] },
    { name: 'Technology',                    icon: 'fa-cogs',                color: '#7C3AED', desc: 'Design, make, evaluate: structures, processing, and systems.',                    topics: ['Design Process', 'Structures', 'Systems', 'Processing'] },
    { name: 'Life Orientation',              icon: 'fa-heart',               color: '#EC4899', desc: 'Personal development, health, study skills, and citizenship.',                   topics: ['Health', 'Study Skills', 'Career Guidance', 'Citizenship'] },
  ],
  10: [
    { name: 'Mathematics',          icon: 'fa-calculator',          color: '#3B82F6', desc: 'Algebra, functions, geometry, and statistics foundations.',      topics: ['Algebra', 'Functions', 'Geometry', 'Statistics'] },
    { name: 'Mathematical Literacy',icon: 'fa-chart-bar',           color: '#06B6D4', desc: 'Real-world maths: finance, maps, and data handling.',           topics: ['Finance', 'Measurement', 'Data', 'Probability'] },
    { name: 'Physical Sciences',    icon: 'fa-atom',                color: '#10B981', desc: 'Mechanics, waves, matter, and introductory chemistry.',         topics: ['Mechanics', 'Waves', 'Chemistry', 'Energy'] },
    { name: 'Life Sciences',        icon: 'fa-dna',                 color: '#EC4899', desc: 'Cells, genetics, ecosystems, and life processes.',              topics: ['Cells', 'Genetics', 'Ecology', 'Human Body'] },
    { name: 'English Home Language',icon: 'fa-pen-nib',             color: '#8B5CF6', desc: 'Literature, comprehension, writing, and language skills.',      topics: ['Literature', 'Writing', 'Grammar', 'Comprehension'] },
    { name: 'Afrikaans FAL',        icon: 'fa-language',            color: '#F97316', desc: 'Afrikaans taal, letterkunde, en kommunikasievaardighede.',      topics: ['Taal', 'Letterkunde', 'Skryfwerk', 'Begrip'] },
    { name: 'History',              icon: 'fa-landmark',            color: '#F59E0B', desc: 'SA and world history — colonialism, apartheid, and more.',       topics: ['Apartheid', 'Colonialism', 'WWI & II', 'Cold War'] },
    { name: 'Geography',            icon: 'fa-globe-africa',        color: '#EF4444', desc: 'Physical and human geography, climate, and development.',        topics: ['Climate', 'Rivers', 'Settlement', 'Development'] },
  ],
  11: [
    { name: 'Mathematics',          icon: 'fa-calculator',          color: '#3B82F6', desc: 'Trigonometry, analytical geometry, functions, and finance.',    topics: ['Trigonometry', 'Anal. Geometry', 'Finance', 'Sequences'] },
    { name: 'Mathematical Literacy',icon: 'fa-chart-bar',           color: '#06B6D4', desc: 'Advanced finance, maps, and statistical analysis.',             topics: ['Loans', 'Tax', 'Maps & Plans', 'Statistics'] },
    { name: 'Physical Sciences',    icon: 'fa-atom',                color: '#10B981', desc: 'Electricity, magnetism, chemical bonding, stoichiometry.',      topics: ['Electricity', 'Magnetism', 'Bonding', 'Stoichiometry'] },
    { name: 'Life Sciences',        icon: 'fa-dna',                 color: '#EC4899', desc: 'Plant & animal responses, evolution, and biodiversity.',        topics: ['Plant Responses', 'Biodiversity', 'Evolution', 'Immune System'] },
    { name: 'English Home Language',icon: 'fa-pen-nib',             color: '#8B5CF6', desc: 'Advanced literature analysis, essays, and oral skills.',        topics: ['Novel Study', 'Poetry', 'Essay Writing', 'Oral'] },
    { name: 'Accounting',           icon: 'fa-file-invoice-dollar', color: '#F97316', desc: 'Financial statements, reconciliations, and company accounts.',  topics: ['Ledger', 'Income Statement', 'Balance Sheet', 'Reconciliation'] },
    { name: 'Business Studies',     icon: 'fa-briefcase',           color: '#F59E0B', desc: 'Business environments, functions, and entrepreneurship.',       topics: ['Forms of Ownership', 'HR', 'Marketing', 'Entrepreneurship'] },
    { name: 'Economics',            icon: 'fa-chart-line',          color: '#EF4444', desc: 'Micro & macroeconomics, markets, and SA economic issues.',      topics: ['Supply & Demand', 'Economic Systems', 'SA Economy', 'Inflation'] },
  ],
  12: [
    { name: 'Mathematics',          icon: 'fa-calculator',          color: '#3B82F6', desc: 'Calculus, sequences, probability, and full matric exam prep.',  topics: ['Calculus', 'Probability', 'Sequences', 'Exam Prep'] },
    { name: 'Mathematical Literacy',icon: 'fa-chart-bar',           color: '#06B6D4', desc: 'Full revision with exam strategies and practice questions.',    topics: ['Investment', 'Insurance', 'Exam Strategy', 'Practice Qs'] },
    { name: 'Physical Sciences',    icon: 'fa-atom',                color: '#10B981', desc: 'Organic chemistry, photoelectric effect, and Doppler.',         topics: ['Organic Chem', 'Photoelectric', 'Doppler', 'Electrochemistry'] },
    { name: 'Life Sciences',        icon: 'fa-dna',                 color: '#EC4899', desc: 'Endocrine system, DNA, RNA, and evolution evidence.',           topics: ['Endocrine System', 'DNA & RNA', 'Evolution', 'Exam Essays'] },
    { name: 'English Home Language',icon: 'fa-pen-nib',             color: '#8B5CF6', desc: 'Matric exam prep: essays, visual literacy, and language.',      topics: ['Exam Essays', 'Visual Literacy', 'Language', 'Prescribed Works'] },
    { name: 'Accounting',           icon: 'fa-file-invoice-dollar', color: '#F97316', desc: 'Companies, cash flow, and financial interpretation.',           topics: ['Companies', 'Cash Flow', 'Analysis', 'Audit Reports'] },
    { name: 'Business Studies',     icon: 'fa-briefcase',           color: '#F59E0B', desc: 'Ethics, operations, investment, and matric exam skills.',       topics: ['Ethics & Legislation', 'Investment', 'Operations', 'Exam Skills'] },
    { name: 'History',              icon: 'fa-landmark',            color: '#EF4444', desc: 'Civil rights, Cold War, Congo Crisis, and post-apartheid SA.',   topics: ['Civil Rights', 'Cold War', 'Congo Crisis', 'New SA'] },
  ],
};

const faqs = [
  { q: 'How do I receive my summaries after payment?',          a: "Immediately after your payment is confirmed, you'll receive an email with download links for your PDF summaries. The process is fully automated — no waiting, no manual sending." },
  { q: 'Are the summaries aligned with the SA CAPS curriculum?', a: "Yes! All summaries are 100% aligned with the CAPS syllabus set by the Department of Basic Education. We cover exactly what you need for your school tests and matric NSC exams." },
  { q: 'What payment methods do you accept?',                   a: "We accept all major credit/debit cards, instant EFT, and SnapScan through our secure PayFast gateway. Prefer direct EFT? WhatsApp us and we'll help you sort it out." },
  { q: 'Can I get a refund if I\'m not happy?',                 a: "Absolutely. We offer a 30-day money-back guarantee. If you're not satisfied for any reason, contact us via WhatsApp or email and we'll process your full refund — no questions asked." },
  { q: 'Do these summaries replace my textbooks?',              a: "Our summaries are designed to complement your textbooks and classroom notes — not replace them. They're perfect for quick revision, exam prep, and understanding key concepts fast." },
];

const pricingPlans = [
  {
    name: 'Single Subject', sub: 'Perfect if you need help with just one specific subject this term.',
    price: '79', period: 'once-off · per subject, per grade',
    feats: [['check','1 Subject Summary PDF'],['check','Your chosen grade'],['check','Instant download'],['check','Exam tips included'],['times','Bundle discount'],['times','Other grades access']],
  },
  {
    name: 'Full Grade Bundle', badge: '⭐ Most Popular', featured: true,
    sub: 'All subjects for one grade. Best value per subject — save over 60%.',
    price: '299', period: 'once-off · all subjects, one grade',
    feats: [['check','All 8 Subject PDFs'],['check','Your chosen grade'],['check','Instant download'],['check','Exam tips included'],['check','Save over 60%'],['times','Other grades access']],
  },
  {
    name: 'Ultimate Pack', sub: 'All grades, all subjects. Perfect prep for matric from Grade 10 to 12.',
    price: '699', period: 'once-off · all subjects, all 3 grades',
    feats: [['check','All 24 Subject PDFs'],['check','Grades 10, 11 & 12'],['check','Instant download'],['check','Exam tips included'],['check','Save over 70%'],['check','Free future updates']],
  },
];

const testimonials = [
  { initials:'TM', gradient:'linear-gradient(135deg,#F97316,#EF4444)', name:'Thandeka M.', loc:'Grade 11 · Johannesburg', text:"I was failing Maths and bought the Grade 11 bundle two weeks before exams. Managed to pass with 62%! The way it breaks down functions and quadratics is so clear. Every learner needs this." },
  { initials:'KN', gradient:'linear-gradient(135deg,#8B5CF6,#EC4899)', name:'Kagiso N.',   loc:'Grade 12 · Pretoria',     text:"The Physical Sciences notes for Grade 12 are incredible. Electricity and magnetism finally makes sense! I got my best mark of the year after using these. Worth every single rand.", delay:'.15s' },
  { initials:'LS', gradient:'linear-gradient(135deg,#10B981,#3B82F6)', name:'Lerato S.',   loc:'Grade 10 · Cape Town',    text:"My mom bought me the Ultimate Pack as a birthday gift. Used all three years of History notes — my essays have improved so much. The exam tips section is a total goldmine!", delay:'.3s' },
];

const floatingCards = [
  { cls:'fc-maths', color:'#3B82F6', icon:'fa-calculator', name:'Mathematics',       gr:'Grade 12 · 8 Topics',  fd:'4.5s', fdelay:'0s' },
  { cls:'fc-sci',   color:'#10B981', icon:'fa-atom',        name:'Physical Sciences', gr:'Grade 11 · 10 Topics', fd:'3.9s', fdelay:'0.6s' },
  { cls:'fc-eng',   color:'#8B5CF6', icon:'fa-pen-nib',     name:'English HL',        gr:'Grade 10 · 6 Topics',  fd:'5.1s', fdelay:'1.1s' },
  { cls:'fc-hist',  color:'#F59E0B', icon:'fa-landmark',    name:'History',           gr:'Grade 11 · 7 Topics',  fd:'4.2s', fdelay:'0.3s' },
  { cls:'fc-geo',   color:'#EC4899', icon:'fa-globe-africa', name:'Geography',        gr:'Grade 12 · 9 Topics',  fd:'3.6s', fdelay:'0.9s' },
];

function hex2rgba(hex, a) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}

// ─── COMPONENT ──────────────────────────────────────────────────────────────
export default function Home() {
  const [scrolled,     setScrolled]     = useState(false);
  const [navOpen,      setNavOpen]      = useState(false);
  const [grade,        setGrade]        = useState(9);
  const [gradeKey,     setGradeKey]     = useState(0);
  const [modalOpen,    setModalOpen]    = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [openFaqIdx,   setOpenFaqIdx]   = useState(null);
  const [progress,     setProgress]     = useState(0);
  const [counts,       setCounts]       = useState({ s500: 0, s12: 0, s3: 0 });
  const statsRef = useRef(null);

  // Nav scroll + progress bar
  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 60);
      const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress(h > 0 ? (document.documentElement.scrollTop / h) * 100 : 0);
    };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Counter animation for hero stats
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      const animate = (key, target) => {
        const start = performance.now();
        const duration = 1600;
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          setCounts(prev => ({ ...prev, [key]: Math.floor(ease * target) }));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      };
      animate('s500', 500);
      animate('s12', 12);
      animate('s3', 3);
      obs.disconnect();
    }, { threshold: 0.6 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  // Mouse parallax on hero blobs
  useEffect(() => {
    const move = (e) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 32;
      const y = (e.clientY / window.innerHeight - 0.5) * 32;
      document.querySelector('.blob-1')?.style.setProperty('transform', `translate(${x}px,${y}px)`);
      document.querySelector('.blob-2')?.style.setProperty('transform', `translate(${-x * 0.7}px,${-y * 0.7}px)`);
      document.querySelector('.blob-3')?.style.setProperty('transform', `translate(${x * 0.4}px,${y * 0.4}px)`);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
  }, [modalOpen]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible), .reveal-scale:not(.visible)').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [grade]);

  const openModal   = (plan = '') => { setSelectedPlan(plan); setModalOpen(true); };
  const closeModal  = ()          => setModalOpen(false);
  const toggleFaq   = (i)         => setOpenFaqIdx(openFaqIdx === i ? null : i);
  const switchGrade = (g)         => { setGrade(g); setGradeKey(k => k + 1); };

  return (
    <>
      {/* Scroll progress bar */}
      <div className="progress-bar" style={{width:`${progress}%`}} />

      {/* WhatsApp Float */}
      <a href="https://wa.me/27000000000" className="wa-float" target="_blank" rel="noreferrer">
        <i className="fab fa-whatsapp"></i>
      </a>

      {/* ── NAV ── */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <a href="#" className="nav-logo">Pass<span>Smart</span></a>
        <ul className={`nav-links${navOpen ? ' open' : ''}`}>
          <li><a href="#subjects"     onClick={() => setNavOpen(false)}>Subjects</a></li>
          <li><a href="#how"          onClick={() => setNavOpen(false)}>How It Works</a></li>
          <li><a href="#pricing"      onClick={() => setNavOpen(false)}>Pricing</a></li>
          <li><a href="#testimonials" onClick={() => setNavOpen(false)}>Reviews</a></li>
          <li>
            <a href="#" className="nav-cta"
               onClick={e => { e.preventDefault(); openModal(); setNavOpen(false); }}>
              Get Started
            </a>
          </li>
        </ul>
        <div className={`hamburger${navOpen ? ' open' : ''}`} onClick={() => setNavOpen(v => !v)}>
          <span /><span /><span />
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg">
          <div className="blob blob-1" /><div className="blob blob-2" /><div className="blob blob-3" />
          <div className="hero-grid" />
        </div>
        <div className="hero-content">
          <div>
            <div className="hero-badge"><i className="fas fa-fire" /> Trusted by 500+ SA Students</div>
            <h1 className="hero-title">
              STUDY LESS,<br />
              <span className="hl-orange">SCORE</span><br />
              <span className="hl-green">HIGHER.</span>
            </h1>
            <p className="hero-desc">
              Crystal-clear summaries for every major subject in Grade 10, 11 &amp; 12.
              Written by top SA educators. Designed to help you ace your exams.
            </p>
            <div className="hero-btns">
              <a href="#subjects" className="btn-primary"><i className="fas fa-book-open" /> Browse Subjects</a>
              <a href="#pricing"  className="btn-outline"><i className="fas fa-tag" /> See Pricing</a>
            </div>
            <div className="hero-stats" ref={statsRef}>
              <div><span className="stat-num">{counts.s500}<span style={{fontSize:'1.2rem'}}>+</span></span><span className="stat-lbl">Students</span></div>
              <div><span className="stat-num">{counts.s12}</span><span className="stat-lbl">Subjects</span></div>
              <div><span className="stat-num">{counts.s3}</span><span className="stat-lbl">Grades</span></div>
              <div>
                <span className="stat-num">
                  4.9<span style={{fontSize:'1.3rem',color:'var(--yellow)'}}>★</span>
                </span>
                <span className="stat-lbl">Rating</span>
              </div>
            </div>
          </div>

          {/* Floating Cards */}
          <div className="hero-visual">
            {floatingCards.map((c, i) => (
              <div key={i} className={`float-card ${c.cls}`} style={{'--fd':c.fd,'--fdelay':c.fdelay}}>
                <div className="fi" style={{background:hex2rgba(c.color,0.2),color:c.color}}>
                  <i className={`fas ${c.icon}`} />
                </div>
                <div><span className="fn">{c.name}</span><span className="fg">{c.gr}</span></div>
              </div>
            ))}
            <div className="hero-center">
              <i className="fas fa-graduation-cap" />
              <span>PASS SMART</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="trust-bar">
        {[
          ['fa-check-circle', '100% CAPS Aligned'],
          ['fa-file-pdf',     'Instant PDF Download'],
          ['fa-shield-alt',   'Secure PayFast Payment'],
          ['fa-headset',      'WhatsApp Support'],
          ['fa-undo',         '30-Day Money-Back'],
        ].map(([icon, label], i) => (
          <div key={i} className="trust-item"><i className={`fas ${icon}`} /> {label}</div>
        ))}
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="how" id="how">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">Simple Process</span>
            <h2 className="section-title">How It Works</h2>
            <p className="section-desc">Get your summaries in 3 quick steps. No fuss, no waiting.</p>
          </div>
          <div className="steps">
            {[
              { grad:'linear-gradient(135deg,#F97316,#EF4444)', icon:'fa-mouse-pointer', n:1, title:'Choose Your Subjects', desc:'Pick your grade and the subjects you need. Buy a single subject or save big with a bundle.' },
              { grad:'linear-gradient(135deg,#8B5CF6,#EC4899)', icon:'fa-credit-card',   n:2, title:'Pay Securely',         desc:'Pay safely via PayFast, EFT, or card. Your download link is sent to your email instantly after payment.' },
              { grad:'linear-gradient(135deg,#10B981,#3B82F6)', icon:'fa-rocket',         n:3, title:'Study & Ace It',       desc:'Download your PDF, use the clear summaries and exam tips, and walk into your next test with confidence.' },
            ].map((s, i) => (
              <div key={i} className="step reveal" style={{transitionDelay:`${i*0.15}s`}}>
                <div className="step-icon-wrap" style={{background:s.grad}}>
                  <i className={`fas ${s.icon}`} />
                  <div className="step-num">{s.n}</div>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBJECTS ── */}
      <section className="subjects-section" id="subjects">
        <div className="container">
          <div className="reveal">
            <span className="section-label">All Subjects</span>
            <h2 className="section-title">What&apos;s Covered</h2>
            <p className="section-desc">
              All major CAPS subjects across Grade 10, 11 &amp; 12 — each summary is thorough, clear, and exam-focused.
            </p>
          </div>
          <div style={{marginTop:'2.5rem'}} className="reveal">
            <div className="grade-tabs">
              {[9, 10, 11, 12].map(g => (
                <button key={g} className={`grade-tab${grade === g ? ' active' : ''}`} onClick={() => switchGrade(g)}>
                  Grade {g}
                </button>
              ))}
            </div>
          </div>
          <div key={gradeKey} className="subjects-grid">
            {subjectsData[grade].map((s, i) => (
              <div key={`${grade}-${i}`} className="subject-card" style={{'--sc':s.color, animationDelay:`${i * 0.06}s`}}>
                <div className="subject-ico" style={{background:hex2rgba(s.color,0.1),color:s.color}}>
                  <i className={`fas ${s.icon}`} />
                </div>
                <div className="subject-name">{s.name}</div>
                <p className="subject-desc">{s.desc}</p>
                <div className="topic-tags">
                  {s.topics.map((t, j) => (
                    <span key={j} className="tag" style={{background:hex2rgba(s.color,0.1),color:s.color}}>{t}</span>
                  ))}
                </div>
                <a className="sub-link" href="#pricing" style={{color:s.color}}>
                  Get Summary <i className="fas fa-arrow-right" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section className="included">
        <div className="container">
          <div className="included-grid">
            <div className="reveal-left">
              <span className="section-label">What You Get</span>
              <h2 className="section-title">Everything You Need<br />To Pass.</h2>
              <p className="section-desc" style={{marginBottom:'2rem'}}>
                Our summaries aren&apos;t just notes — they&apos;re strategically written to cover exactly what examiners look for.
              </p>
              {[
                { bg:'rgba(249,115,22,0.12)',  c:'var(--orange)', title:'Concise Chapter Summaries',  desc:'All the key points, none of the fluff. Perfect for quick revision before a test.' },
                { bg:'rgba(139,92,246,0.12)',  c:'var(--purple)', title:'Key Definitions & Terms',     desc:'Highlight-ready definitions that examiners love to test — all in one place.' },
                { bg:'rgba(16,185,129,0.12)',  c:'var(--green)',  title:'Diagrams & Visual Aids',       desc:'Labelled diagrams for Sciences, Life Sciences, and Geography chapters.' },
                { bg:'rgba(59,130,246,0.12)',  c:'var(--blue)',   title:'Exam Tips & Common Questions', desc:'Insights into frequently tested topics and exactly how to structure your answers.' },
                { bg:'rgba(245,158,11,0.12)',  c:'var(--yellow)', title:'Printable PDF Format',         desc:'Clean, beautifully formatted PDFs you can print, annotate, and use anywhere.' },
              ].map((f, i) => (
                <div key={i} className="feature-row">
                  <div className="feature-dot" style={{background:f.bg,color:f.c}}>
                    <i className="fas fa-check" style={{fontSize:'.8rem'}} />
                  </div>
                  <div><h4>{f.title}</h4><p>{f.desc}</p></div>
                </div>
              ))}
            </div>
            <div className="reveal-right" style={{transitionDelay:'.1s'}}>
              <div className="preview-card">
                <div style={{position:'absolute',top:'-40px',right:'-40px',width:'180px',height:'180px',background:'var(--orange)',borderRadius:'50%',opacity:0.08,pointerEvents:'none'}} />
                <div className="preview-label">SAMPLE PREVIEW</div>
                <div className="preview-block" style={{borderLeft:'3px solid #3B82F6'}}>
                  <div className="preview-sub">Mathematics Grade 12</div>
                  <div className="preview-title">Chapter 3: Functions &amp; Graphs</div>
                  <div className="preview-text">A function f(x) maps each input x to exactly one output y. Key types: Linear, Quadratic, Exponential, Trigonometric, Hyperbola, Logarithmic...</div>
                </div>
                <div className="preview-block" style={{borderLeft:'3px solid #10B981'}}>
                  <div className="preview-sub">Key Definition</div>
                  <div className="preview-title">Domain &amp; Range</div>
                  <div className="preview-text">
                    <span style={{color:'var(--orange)'}}>Domain:</span> All valid x-values. &nbsp;
                    <span style={{color:'#34D399'}}>Range:</span> All resulting y-values.
                  </div>
                </div>
                <div className="preview-tip">
                  <div className="preview-tip-label"><i className="fas fa-lightbulb" /> EXAM TIP</div>
                  <div className="preview-tip-text">
                    Always state domain restrictions. Forgetting that √ requires x ≥ 0 is one of the most common matric mistakes.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="pricing-section" id="pricing">
        <div className="blob" style={{width:'500px',height:'500px',background:'var(--orange)',top:'-100px',right:'-100px',position:'absolute'}} />
        <div className="blob" style={{width:'420px',height:'420px',background:'var(--purple)',bottom:'-100px',left:'-100px',position:'absolute'}} />
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">Transparent Pricing</span>
            <h2 className="section-title light">Pick Your Plan</h2>
            <p className="section-desc" style={{color:'rgba(255,255,255,0.55)',margin:'0 auto'}}>
              One-time payment, lifetime access. No subscriptions, no hidden fees.
            </p>
          </div>
          <div className="pricing-grid">
            {pricingPlans.map((p, i) => (
              <div key={i} className={`pricing-card reveal${p.featured ? ' feat' : ''}`} style={{transitionDelay:`${i*0.15}s`}}>
                {p.badge && <div className="pricing-badge">{p.badge}</div>}
                <div className="pricing-name">{p.name}</div>
                <div className="pricing-sub">{p.sub}</div>
                <div><span className="pricing-amt"><span className="pricing-cur">R</span>{p.price}</span></div>
                <div className="pricing-period">{p.period}</div>
                <ul className="pricing-feats">
                  {p.feats.map(([ic, label], j) => (
                    <li key={j}><i className={`fas fa-${ic} ic${ic==='times'?' no':''}`} /> {label}</li>
                  ))}
                </ul>
                <button className="btn-plan" onClick={() => openModal(`${p.name} — R${p.price}`)}>
                  Get This Plan
                </button>
              </div>
            ))}
          </div>
          <div className="pricing-note reveal">
            <i className="fas fa-lock" style={{marginRight:'.5rem'}} />
            Secure payment via PayFast &nbsp;·&nbsp; EFT available &nbsp;·&nbsp; 30-day money-back guarantee
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials" id="testimonials">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">Student Reviews</span>
            <h2 className="section-title">What Students Say</h2>
            <p className="section-desc">Real SA students, real results.</p>
          </div>
          <div className="testi-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testi-card reveal" style={{transitionDelay:t.delay||'0s'}}>
                <div className="testi-quote">&ldquo;</div>
                <div className="testi-stars">{[...Array(5)].map((_,j) => <i key={j} className="fas fa-star" />)}</div>
                <p className="testi-text">{t.text}</p>
                <div className="testi-author">
                  <div className="avatar" style={{background:t.gradient}}>{t.initials}</div>
                  <div><div className="author-name">{t.name}</div><div className="author-loc">{t.loc}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">Got Questions?</span>
            <h2 className="section-title">Frequently Asked</h2>
          </div>
          <div className="faq-wrap">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item reveal${openFaqIdx === i ? ' open' : ''}`} onClick={() => toggleFaq(i)}>
                <div className="faq-q">{faq.q} <i className="fas fa-chevron-down" /></div>
                <div className="faq-a">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="cta-band">
        <div className="container">
          <h2 className="reveal">READY TO PASS WITH FLYING COLOURS?</h2>
          <p className="reveal">Join 500+ students who are already studying smarter across South Africa.</p>
          <a href="#pricing" className="btn-white reveal"><i className="fas fa-rocket" /> Get Started Today</a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-grid">
          <div>
            <a href="#" className="nav-logo">Pass<span>Smart</span></a>
            <p className="footer-desc">
              Crystal-clear study summaries for Grade 10, 11 &amp; 12 students across South Africa.
              Study smarter, not harder.
            </p>
            <div className="social-row">
              {[['fab fa-instagram','#'],['fab fa-tiktok','#'],['fab fa-facebook','#'],['fab fa-whatsapp','https://wa.me/27000000000']].map(([icon,href],i)=>(
                <a key={i} href={href} className="social-a" target="_blank" rel="noreferrer"><i className={icon} /></a>
              ))}
            </div>
          </div>
          <div>
            <div className="footer-heading">Subjects</div>
            <ul className="footer-links">
              {['Mathematics','Physical Sciences','Life Sciences','English HL','History','Geography','Accounting'].map((s,i)=>(
                <li key={i}><a href="#">{s}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-heading">Quick Links</div>
            <ul className="footer-links">
              {[['Browse Subjects','#subjects'],['Pricing','#pricing'],['How It Works','#how'],['Reviews','#testimonials'],['Privacy Policy','#'],['Terms & Conditions','#']].map(([label,href],i)=>(
                <li key={i}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-heading">Contact Us</div>
            {[['fab fa-whatsapp','+27 000 000 0000'],['fas fa-envelope','hello@passsmart.co.za'],['fas fa-clock','Mon–Sat, 8am–8pm'],['fas fa-map-marker-alt','South Africa']].map(([icon,text],i)=>(
              <div key={i} className="contact-row"><i className={icon} /> {text}</div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2025 PassSmart. All rights reserved.</div>
          <div className="footer-bottom-links"><a href="#">Privacy</a><a href="#">Terms</a></div>
        </div>
      </footer>

      {/* ── MODAL ── */}
      {modalOpen && (
        <div className="modal-overlay open" onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="modal">
            <button className="modal-close" onClick={closeModal}><i className="fas fa-times" /></button>
            <h3>GET INSTANT ACCESS</h3>
            <p>Fill in your details and we&apos;ll send your download link right after payment. 🎉</p>
            {selectedPlan && <div className="selected-plan">Selected: {selectedPlan}</div>}
            <div className="fg"><label>Full Name</label><input type="text" placeholder="e.g. Thabo Nkosi" /></div>
            <div className="fg"><label>Email Address</label><input type="email" placeholder="your@email.com" /></div>
            <div className="fg"><label>WhatsApp Number</label><input type="tel" placeholder="+27 000 000 0000" /></div>
            <div className="fg">
              <label>Your Grade</label>
              <select defaultValue="Grade 12">
                <option>Grade 10</option><option>Grade 11</option><option>Grade 12</option>
              </select>
            </div>
            <button className="btn-submit"><i className="fas fa-lock" /> Proceed to Secure Payment</button>
          </div>
        </div>
      )}
    </>
  );
}
