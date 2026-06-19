'use strict';

/* ── CUSTOM CURSOR ──────────────────────────────────────────── */
const cur = document.createElement('div');
cur.id = 'cursor';
document.body.appendChild(cur);
document.addEventListener('mousemove', e => {
  cur.style.left = e.clientX + 'px';
  cur.style.top  = e.clientY + 'px';
});

/* ── BOOT SEQUENCE ──────────────────────────────────────────── */
const bootLines = [
  '$ init darshan_portfolio ...',
  '  [OK] cockroachdb · rls · opentelemetry',
  '  [OK] platform_and_data_engineer :: CONNECTED',
  '  [OK] nepali_nlp_research :: ICAIL_2026 ACCEPTED',
  '  [OK] aws · terraform · argocd :: PROVISIONED',
  '$ ready.',
  '',
  '  >> darshan@dataeng:~$',
];

const bootLinesEl = document.getElementById('boot-lines');
const overlay     = document.getElementById('boot-overlay');
let lineIdx = 0;
let charIdx = 0;
let currentEl = null;

function bootType() {
  if (lineIdx >= bootLines.length) {
    setTimeout(() => {
      overlay.classList.add('hidden');
      startMainAnimations();
    }, 250);
    return;
  }

  const line = bootLines[lineIdx];

  if (charIdx === 0) {
    currentEl = document.createElement('div');
    currentEl.className = 'bl';
    bootLinesEl.appendChild(currentEl);
    if (line.startsWith('$'))          currentEl.style.color = '#39ff6e';
    else if (line.includes('[OK]'))    currentEl.style.color = '#39ff6e';
    else if (line.includes('>>'))      currentEl.style.color = '#fff';
    else if (line === '')              { lineIdx++; setTimeout(bootType, 60); return; }
    else                               currentEl.style.color = '#5a7a5a';
  }

  currentEl.textContent = line.slice(0, charIdx + 1);
  charIdx++;

  if (charIdx >= line.length) {
    lineIdx++;
    charIdx = 0;
    const delay = line.startsWith('$') ? 60 : 25;
    setTimeout(bootType, delay);
  } else {
    const speed = line.startsWith('$') ? 14 : 6;
    setTimeout(bootType, speed);
  }
}

overlay.addEventListener('click', skipBoot);
document.addEventListener('keydown', skipBoot);
function skipBoot() {
  overlay.classList.add('hidden');
  startMainAnimations();
}

bootType();

/* ── MAIN ANIMATIONS (after boot) ──────────────────────────── */
function startMainAnimations() {
  initNav();
  initReveal();
  initTypewriter();
  initProjectCards();
  initMobileMenu();
}

/* ── NAV ────────────────────────────────────────────────────── */
function initNav() {
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── MOBILE MENU ────────────────────────────────────────────── */
function initMobileMenu() {
  const btn  = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }));
}

/* ── SCROLL REVEAL ──────────────────────────────────────────── */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ── TYPEWRITER ─────────────────────────────────────────────── */
function initTypewriter() {
  const el = document.getElementById('hero-role');
  if (!el) return;

  const phrases = [
    'Platform & Data Engineer',
    'Database Architect',
    'Observability Nerd',
    'NLP Researcher',
    'Cinephile',
    'Terminal Dweller',
    'Perpetual Learner',
  ];

  let pi = 0, ci = 0, deleting = false;

  function tick() {
    const phrase = phrases[pi];

    if (deleting) {
      ci--;
    } else {
      ci++;
    }

    el.textContent = phrase.slice(0, ci);

    let next;
    if (!deleting && ci === phrase.length) {
      next = pi === phrases.length - 1 ? 2200 : 1600;
      deleting = true;
      setTimeout(tick, next);
      return;
    }
    if (deleting && ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
      setTimeout(tick, 350);
      return;
    }

    next = deleting ? 35 : 75;
    setTimeout(tick, next);
  }

  setTimeout(tick, 200);
}

/* ── PROJECT MODAL ──────────────────────────────────────────── */
const projects = {
  1: {
    file: 'flight_delay_pipeline.sh',
    title: 'Real-Time Flight Delay Analytics Pipeline',
    tags: ['Python', 'Apache Airflow', 'PostgreSQL', 'Pandas', 'Streamlit'],
    bullets: [
      'Architected an end-to-end ETL pipeline ingesting live flight delay data from multiple upstream sources — handles schema drift and late-arriving records.',
      'Orchestrated scheduled DAGs in Apache Airflow with automatic retries, task-level logging, and SLA breach alerts.',
      'Stored processed records in a normalised PostgreSQL schema optimised for analytical queries and range scans.',
      'Delivered an interactive Streamlit dashboard visualising delay trends, airline performance metrics, and route heatmaps in near real-time.',
    ],
    stack: 'Python · Apache Airflow · PostgreSQL · Pandas · Streamlit',
  },
  2: {
    file: 'energy_forecasting.py',
    title: 'Global Energy Consumption Forecasting',
    tags: ['Pandas', 'Scikit-learn', 'Plotly', 'Jupyter'],
    bullets: [
      'Collected and cleaned multi-decade energy datasets across geographies — handled missing values, outliers, and feature scaling.',
      'Engineered domain-specific features: GDP per capita, renewable energy share, industrial index, population normalisation.',
      'Trained and compared Ridge, Lasso, and Gradient Boosting regression models; final RMSE 23% lower than naive baseline.',
      'Published interactive Plotly dashboards for country-level trend exploration and per-capita energy benchmarking.',
    ],
    stack: 'Pandas · NumPy · Scikit-learn · Plotly · Jupyter',
  },
  3: {
    file: 'legal_rag_pipeline.sh',
    title: 'Legal Document Intelligence System (RAG + Agentic QA)',
    tags: ['LangChain', 'FAISS', 'HuggingFace', 'FastAPI', 'Docker'],
    bullets: [
      'Built a multi-step retrieval-augmented pipeline over legal corpora combining dense vector retrieval (FAISS) with a fine-tuned transformer reader.',
      'Designed a LangChain agentic workflow: query decomposition → retrieval → evidence ranking → synthesis, with source attribution and confidence scoring.',
      'Served predictions via FastAPI, containerised with Docker Compose for reproducible deployment.',
      'Directly informed by NLP research on Nepali legal texts — same domain, different stack.',
    ],
    stack: 'LangChain · FAISS · HuggingFace · FastAPI · Docker',
  },
};

const modal     = document.getElementById('proj-modal');
const modalBox  = document.getElementById('proj-modal-box');
const modalBody = document.getElementById('modal-body');
const modalFname= document.getElementById('modal-fname');
const closeBtn  = document.getElementById('modal-close-btn');

function initProjectCards() {
  document.querySelectorAll('.pcard').forEach(card => {
    card.addEventListener('click', () => openModal(+card.dataset.proj));
    card.addEventListener('keydown', e => { if (e.key === 'Enter') openModal(+card.dataset.proj); });
  });
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

function openModal(id) {
  const p = projects[id];
  if (!p) return;
  modalFname.textContent = p.file;
  modalBody.innerHTML = `
    <p class="mb-title">${p.title}</p>
    <div class="mb-tags">${p.tags.map(t => `<span class="stag">${t}</span>`).join('')}</div>
    <ul class="mb-blist">${p.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
    <p class="mb-stack"><span>stack:</span> ${p.stack}</p>
  `;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

console.log('%c◈ darshan@dataeng:~$ portfolio loaded', 'color:#39ff6e;font-family:monospace;font-size:12px');