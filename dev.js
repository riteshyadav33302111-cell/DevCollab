
// ═══════════════════════════════════════════════════
//  DATA STORE
// ═══════════════════════════════════════════════════
const COLORS = ['#6c63ff','#06b6d4','#22c55e','#f59e0b','#ef4444','#ec4899','#f97316','#a855f7'];

const state = {
  currentView: 'dashboard',
  currentProject: 'athena',
  tasks: [
    { id: 't1', title: 'Set up authentication service', desc: 'Implement JWT + OAuth2. Use Passport.js for middleware.', col: 'inprogress', priority: 'P0', assignee: 'AK', assigneeName: 'Ankush', color: '#6c63ff', due: '2026-04-20', labels: ['auth','backend'], comments: [{user:'RS',text:'Should we use Auth0 instead?',time:'2h ago'},{user:'AK',text:'No, rolling our own for more control. @DP can you review?',time:'1h ago'}] },
    { id: 't2', title: 'Design system setup — tokens & components', desc: 'Set up design tokens, Storybook, and base component library.', col: 'inprogress', priority: 'P1', assignee: 'RS', assigneeName: 'Riya', color: '#ec4899', due: '2026-04-22', labels: ['frontend','design'], comments: [] },
    { id: 't3', title: 'Database schema v2 migration', desc: 'Migrate users, projects tables to new schema with JSONB fields.', col: 'review', priority: 'P0', assignee: 'DP', assigneeName: 'Dev', color: '#f59e0b', due: '2026-04-19', labels: ['database','migration'], comments: [{user:'AK',text:'Looks good! Minor: add index on project_id',time:'30m ago'}] },
    { id: 't4', title: 'API rate limiting middleware', desc: 'Add Redis-based rate limiting to all public endpoints.', col: 'todo', priority: 'P1', assignee: 'AK', assigneeName: 'Ankush', color: '#6c63ff', due: '2026-04-26', labels: ['api','security'], comments: [] },
    { id: 't5', title: 'Fix mobile viewport overflow bug', desc: 'Navigation breaks on screens < 360px. Reproduces on Samsung A-series.', col: 'todo', priority: 'P2', assignee: 'RS', assigneeName: 'Riya', color: '#ec4899', due: '2026-04-28', labels: ['bug','mobile'], comments: [] },
    { id: 't6', title: 'Integrate Stripe webhooks', desc: 'Handle subscription created, updated, deleted events.', col: 'review', priority: 'P1', assignee: 'AK', assigneeName: 'Ankush', color: '#6c63ff', due: '2026-04-21', labels: ['payments'], comments: [] },
    { id: 't7', title: 'Write E2E tests for auth flow', desc: 'Playwright tests covering login, signup, password reset.', col: 'todo', priority: 'P2', assignee: 'PN', assigneeName: 'Priya', color: '#22c55e', due: '2026-04-30', labels: ['testing'], comments: [] },
    { id: 't8', title: 'Performance audit — Core Web Vitals', desc: 'LCP > 2.5s on dashboard. Profile and fix render blocking resources.', col: 'done', priority: 'P1', assignee: 'RS', assigneeName: 'Riya', color: '#ec4899', due: '2026-04-15', labels: ['perf','frontend'], comments: [] },
    { id: 't9', title: 'Set up CI/CD pipeline', desc: 'GitHub Actions: test → build → deploy to Vercel/Fly.io', col: 'done', priority: 'P1', assignee: 'DP', assigneeName: 'Dev', color: '#f59e0b', due: '2026-04-12', labels: ['devops'], comments: [] },
    { id: 't10', title: 'AI assistant context injection', desc: 'Feed project context to AI on each session init.', col: 'inprogress', priority: 'P1', assignee: 'AK', assigneeName: 'Ankush', color: '#6c63ff', due: '2026-04-24', labels: ['ai','backend'], comments: [] },
  ],
  snippets: [
    { id: 's1', title: 'JWT Token Generator', lang: 'javascript', code: `const jwt = require('jsonwebtoken');\n\nfunction generateToken(userId, role) {\n  return jwt.sign(\n    { userId, role, iat: Date.now() },\n    process.env.JWT_SECRET,\n    { expiresIn: '7d' }\n  );\n}\n\nmodule.exports = { generateToken };`, tags: ['auth','jwt','utils'], desc: 'Generates signed JWT tokens with role-based claims' },
    { id: 's2', title: 'useDebounce Hook', lang: 'javascript', code: `import { useState, useEffect } from 'react';\n\nexport function useDebounce(value, delay = 300) {\n  const [debouncedValue, setDebouncedValue] = useState(value);\n  \n  useEffect(() => {\n    const timer = setTimeout(() => {\n      setDebouncedValue(value);\n    }, delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n  \n  return debouncedValue;\n}`, tags: ['hooks','react','utils'], desc: 'Debounce any rapidly changing value' },
    { id: 's3', title: 'Postgres Connection Pool', lang: 'go', code: `package db\n\nimport (\n  "database/sql"\n  _ "github.com/lib/pq"\n)\n\nfunc NewPool(dsn string) (*sql.DB, error) {\n  db, err := sql.Open("postgres", dsn)\n  if err != nil {\n    return nil, err\n  }\n  db.SetMaxOpenConns(25)\n  db.SetMaxIdleConns(5)\n  return db, db.Ping()\n}`, tags: ['db','go','postgres'], desc: 'Configures a PostgreSQL connection pool' },
    { id: 's4', title: 'Rate Limiter Middleware', lang: 'javascript', code: `const rateLimit = require('express-rate-limit');\n\nconst apiLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000,\n  max: 100,\n  message: { error: 'Too many requests' },\n  standardHeaders: true,\n  legacyHeaders: false,\n});\n\nmodule.exports = apiLimiter;`, tags: ['api','security','middleware'], desc: 'Express rate limiting — 100 req per 15 min' },
    { id: 's5', title: 'Redis Cache Wrapper', lang: 'python', code: `import redis\nimport json\nfrom functools import wraps\n\nr = redis.Redis(host='localhost', port=6379)\n\ndef cache(ttl=300):\n    def decorator(fn):\n        @wraps(fn)\n        def wrapper(*args, **kwargs):\n            key = f"{fn.__name__}:{args}:{kwargs}"\n            if cached := r.get(key):\n                return json.loads(cached)\n            result = fn(*args, **kwargs)\n            r.setex(key, ttl, json.dumps(result))\n            return result\n        return wrapper\n    return decorator`, tags: ['cache','redis','python','utils'], desc: 'Decorator-based Redis caching for Python functions' },
    { id: 's6', title: 'Stripe Webhook Handler', lang: 'javascript', code: `const stripe = require('stripe')(process.env.STRIPE_KEY);\n\napp.post('/webhooks/stripe',\n  express.raw({type: 'application/json'}),\n  (req, res) => {\n    const sig = req.headers['stripe-signature'];\n    let event;\n    try {\n      event = stripe.webhooks.constructEvent(\n        req.body, sig, process.env.STRIPE_WEBHOOK_SECRET\n      );\n    } catch (err) { return res.status(400).send(); }\n    \n    if (event.type === 'customer.subscription.created') {\n      // handle new subscription\n    }\n    res.json({received: true});\n  }\n);`, tags: ['payments','stripe','api'], desc: 'Verifies and handles Stripe webhook events' },
  ],
  wikiPages: [
    { id: 'w1', title: 'Getting Started', icon: '🚀', active: true },
    { id: 'w2', title: 'Architecture Overview', icon: '🏗️' },
    { id: 'w3', title: 'API Reference', icon: '📡' },
    { id: 'w4', title: 'Authentication Flow', icon: '🔐' },
    { id: 'w5', title: 'Deployment Guide', icon: '☁️' },
    { id: 'w6', title: 'Contributing Guidelines', icon: '🤝' },
  ],
  members: [
    { name: 'Ankush Kumar', handle: '@ankushk', role: 'Owner', skills: ['TypeScript','React','Go','PostgreSQL'], color: '#6c63ff', initials: 'AK', online: true, bio: 'Full-stack · loves databases' },
    { name: 'Riya Sharma', handle: '@riyas', role: 'Admin', skills: ['React','CSS','Figma','Testing'], color: '#ec4899', initials: 'RS', online: true, bio: 'Frontend wizard · design systems' },
    { name: 'Dev Patel', handle: '@devp', role: 'Member', skills: ['Node.js','DevOps','Docker','Redis'], color: '#f59e0b', initials: 'DP', online: true, bio: 'Backend · CI/CD obsessed' },
    { name: 'Priya Nair', handle: '@priyan', role: 'Member', skills: ['Python','ML','Testing','FastAPI'], color: '#22c55e', initials: 'PN', online: false, bio: 'AI/ML · quality advocate' },
    { name: 'Sam Lee', handle: '@saml', role: 'Viewer', skills: ['Product','Notion','Analytics'], color: '#06b6d4', initials: 'SL', online: false, bio: 'PM · stakeholder comms' },
  ],
  activity: [
    { icon: '📋', bg: 'rgba(108,99,255,0.15)', color: '#6c63ff', text: '<strong>Riya Sharma</strong> moved <em>Database schema migration</em> to In Review', time: '2 min ago', project: 'Athena AI', type: 'tasks' },
    { icon: '💬', bg: 'rgba(6,182,212,0.15)', color: '#06b6d4', text: '<strong>Dev Patel</strong> commented on <em>Auth service setup</em>: "Should we add 2FA?"', time: '15 min ago', project: 'Athena AI', type: 'tasks' },
    { icon: '✅', bg: 'rgba(34,197,94,0.15)', color: '#22c55e', text: '<strong>Riya Sharma</strong> completed <em>Performance audit — Core Web Vitals</em>', time: '1h ago', project: 'Athena AI', type: 'tasks' },
    { icon: '📝', bg: 'rgba(245,158,11,0.15)', color: '#f59e0b', text: '<strong>Ankush Kumar</strong> updated <em>Architecture Overview</em> wiki page', time: '2h ago', project: 'Athena AI', type: 'docs' },
    { icon: '👤', bg: 'rgba(168,85,247,0.15)', color: '#a855f7', text: '<strong>Sam Lee</strong> joined the workspace as Viewer', time: '3h ago', project: 'NovaSpark Inc.', type: 'members' },
    { icon: '⌨️', bg: 'rgba(236,72,153,0.15)', color: '#ec4899', text: '<strong>Dev Patel</strong> added snippet <em>Postgres Connection Pool</em>', time: '4h ago', project: 'Athena AI', type: 'docs' },
    { icon: '➕', bg: 'rgba(108,99,255,0.15)', color: '#6c63ff', text: '<strong>Ankush Kumar</strong> created task <em>AI assistant context injection</em>', time: '5h ago', project: 'Athena AI', type: 'tasks' },
    { icon: '🔀', bg: 'rgba(6,182,212,0.15)', color: '#06b6d4', text: '<strong>Dev Patel</strong> moved <em>CI/CD pipeline</em> to Done', time: '6h ago', project: 'DevOps Dashboard', type: 'tasks' },
    { icon: '💰', bg: 'rgba(34,197,94,0.15)', color: '#22c55e', text: '<strong>Ankush Kumar</strong> upgraded workspace to <em>Pro Plan</em>', time: '1d ago', project: 'NovaSpark Inc.', type: 'members' },
  ],
  notifications: [
    { user: 'RS', color: '#ec4899', text: '<strong>Riya Sharma</strong> mentioned you in Auth service: "cc <strong>@ankushk</strong> for review"', time: '2m ago', unread: true },
    { user: 'DP', color: '#f59e0b', text: '<strong>Dev Patel</strong> moved your task <em>DB schema migration</em> to In Review', time: '15m ago', unread: true },
    { user: 'AK', color: '#6c63ff', text: 'Task <em>API rate limiting</em> is overdue by 2 days', time: '1h ago', unread: true },
    { user: '🤖', color: '#6c63ff', text: 'AI detected: <em>Auth service</em> has been In Progress for 8 days — may be blocked', time: '2h ago', unread: true },
    { user: 'PN', color: '#22c55e', text: '<strong>Priya Nair</strong> joined the project as Member', time: '3h ago', unread: false },
    { user: 'RS', color: '#ec4899', text: '<strong>Riya Sharma</strong> completed <em>Performance audit</em>', time: '1d ago', unread: false },
  ],
  dragTask: null,
  calYear: 2026,
  calMonth: 3, // April (0-indexed)
  aiMessages: [],
};

// ═══════════════════════════════════════════════════
//  NAVIGATION
// ═══════════════════════════════════════════════════
function navigate(view, el) {
  document.querySelectorAll('.view, .ai-view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const viewEl = document.getElementById('view-' + view);
  if (viewEl) viewEl.classList.add('active');
  if (el) el.classList.add('active');

  const titles = {
    dashboard: 'Dashboard', kanban: '📋 Kanban Board', snippets: '⌨️ Code Snippets',
    wiki: '📖 Wiki / Docs', ai: '🤖 AI Assistant', review: '🔍 Code Review',
    activity: '📡 Activity Feed', members: '👥 Members', notifications: '🔔 Notifications',
    pricing: '💎 Upgrade Plan', profile: '⚙️ Settings'
  };

  document.getElementById('topbar-title').textContent = titles[view] || view;
  state.currentView = view;

  // Lazy init views
  if (view === 'dashboard') initDashboard();
  if (view === 'kanban') initKanban();
  if (view === 'snippets') renderSnippets();
  if (view === 'wiki') initWiki();
  if (view === 'activity') renderActivity(state.activity);
  if (view === 'members') renderMembers();
  if (view === 'notifications') renderFullNotifications();
  if (view === 'profile') renderProfile();
}

// ═══════════════════════════════════════════════════
//  DASHBOARD
// ═══════════════════════════════════════════════════
function initDashboard() {
  // Sparklines
  const spark1 = document.getElementById('spark1');
  if (spark1 && !spark1.children.length) {
    [4,7,5,9,6,11,8,12,9,14,10,15].forEach(h => {
      const bar = document.createElement('div');
      bar.className = 'spark-bar';
      bar.style.height = (h/15*100) + '%';
      spark1.appendChild(bar);
    });
  }

  // Project health
  const projects = [
    { name: 'Athena AI Platform', color: '#6c63ff', tasks: 10, done: 2, emoji: '🧠' },
    { name: 'DevOps Dashboard', color: '#06b6d4', tasks: 8, done: 6, emoji: '⚙️' },
    { name: 'Mobile App v2', color: '#22c55e', tasks: 12, done: 9, emoji: '📱' },
    { name: 'REST API Gateway', color: '#f59e0b', tasks: 7, done: 4, emoji: '🔌' },
  ];

  const phList = document.getElementById('project-health-list');
  if (!phList.children.length) {
    phList.innerHTML = projects.map(p => {
      const pct = Math.round(p.done/p.tasks*100);
      return `<div style="margin-bottom:14px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px">
          <div style="display:flex;align-items:center;gap:6px;font-size:13px;font-weight:500">
            <span>${p.emoji}</span> ${p.name}
          </div>
          <div style="font-family:'DM Mono',monospace;font-size:11px;color:var(--text3)">${p.done}/${p.tasks} · ${pct}%</div>
        </div>
        <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%;background:${p.color}"></div></div>
      </div>`;
    }).join('');
  }

  // Mini activity
  const ma = document.getElementById('mini-activity');
  if (!ma.children.length) {
    ma.innerHTML = state.activity.slice(0,5).map(a =>
      `<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border);cursor:pointer" onclick="navigate('activity',document.querySelector('[onclick*=activity]'))">
        <div style="width:28px;height:28px;border-radius:6px;background:${a.bg};display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0">${a.icon}</div>
        <div style="flex:1;font-size:11.5px;color:var(--text2);line-height:1.4">${a.text}</div>
        <div style="font-size:10px;color:var(--text3);white-space:nowrap;font-family:'DM Mono',monospace">${a.time}</div>
      </div>`
    ).join('');
  }

  // My tasks today
  const mtt = document.getElementById('my-tasks-today');
  if (!mtt.children.length) {
    const myTasks = state.tasks.filter(t => t.assignee === 'AK').slice(0,4);
    mtt.innerHTML = myTasks.map(t =>
      `<div class="task-list-item" onclick="openTaskDetail('${t.id}')">
        <div class="task-list-status" style="background:${t.col==='done'?'var(--green)':t.col==='review'?'var(--yellow)':t.col==='inprogress'?'var(--accent)':'var(--border2)'}"></div>
        <span class="task-list-title">${t.title}</span>
        <span class="priority-badge ${t.priority.toLowerCase()}">${t.priority}</span>
      </div>`
    ).join('');
  }
}

// ═══════════════════════════════════════════════════
//  KANBAN
// ═══════════════════════════════════════════════════
const COLS = [
  { id: 'todo', label: 'To Do', color: '#5c6278' },
  { id: 'inprogress', label: 'In Progress', color: '#6c63ff' },
  { id: 'review', label: 'In Review', color: '#f59e0b' },
  { id: 'done', label: 'Done', color: '#22c55e' },
];

function initKanban() {
  renderKanban();
  renderTaskList();
  renderCalendar();
}

function renderKanban() {
  const board = document.getElementById('kanban-board');
  board.innerHTML = COLS.map(col => {
    const tasks = state.tasks.filter(t => t.col === col.id);
    return `<div class="kanban-col">
      <div class="kanban-col-header">
        <div class="col-dot" style="background:${col.color}"></div>
        <div class="col-label">${col.label}</div>
        <div class="col-count">${tasks.length}</div>
      </div>
      <div class="kanban-cards" id="col-${col.id}"
        ondragover="dragOver(event,'${col.id}')"
        ondrop="drop(event,'${col.id}')"
        ondragleave="dragLeave(event)">
        ${tasks.map(t => renderTaskCard(t)).join('')}
      </div>
      <button class="add-task-btn" onclick="openModal('new-task-modal');document.getElementById('new-task-col').value='${col.id}'">+ Add Task</button>
    </div>`;
  }).join('');
}

function renderTaskCard(t) {
  const labelsHtml = t.labels.map(l =>
    `<span class="label-tag" style="background:${labelColor(l)}22;color:${labelColor(l)};border:1px solid ${labelColor(l)}44">${l}</span>`
  ).join('');

  const isOverdue = t.col !== 'done' && new Date(t.due) < new Date();
  return `<div class="task-card" draggable="true" id="task-${t.id}"
    ondragstart="dragStart(event,'${t.id}')"
    ondragend="dragEnd(event)"
    onclick="openTaskDetail('${t.id}')">
    <div class="task-card-top">
      <div class="task-title">${t.title}</div>
      <span class="priority-badge ${t.priority.toLowerCase()}">${t.priority}</span>
    </div>
    ${t.labels.length ? `<div class="task-labels">${labelsHtml}</div>` : ''}
    <div class="task-meta">
      <div class="task-assignee" style="background:${t.color}" title="${t.assigneeName}">${t.assignee}</div>
      <div class="task-due ${isOverdue?'overdue':''}">📅 ${formatDate(t.due)}</div>
      ${t.comments.length ? `<div class="task-comments">💬 ${t.comments.length}</div>` : ''}
    </div>
  </div>`;
}

function labelColor(l) {
  const map = { auth: '#6c63ff', backend: '#06b6d4', frontend: '#ec4899', database: '#f59e0b', api: '#3b82f6', security: '#ef4444', bug: '#ef4444', design: '#ec4899', mobile: '#22c55e', devops: '#06b6d4', payments: '#22c55e', testing: '#f97316', ai: '#a855f7', perf: '#f59e0b', migration: '#06b6d4', middleware: '#3b82f6' };
  return map[l] || '#9da3b8';
}

function formatDate(d) {
  const date = new Date(d);
  return date.toLocaleDateString('en-US', {month:'short',day:'numeric'});
}

// Drag & Drop
function dragStart(e, id) {
  state.dragTask = id;
  e.dataTransfer.effectAllowed = 'move';
  setTimeout(() => document.getElementById('task-' + id)?.classList.add('dragging'), 0);
}
function dragEnd(e) {
  document.querySelectorAll('.task-card').forEach(c => c.classList.remove('dragging'));
  document.querySelectorAll('.kanban-cards').forEach(c => c.classList.remove('drag-over'));
}
function dragOver(e, col) {
  e.preventDefault();
  document.getElementById('col-' + col)?.classList.add('drag-over');
}
function dragLeave(e) {
  e.target.classList?.remove('drag-over');
}
function drop(e, col) {
  e.preventDefault();
  document.querySelectorAll('.kanban-cards').forEach(c => c.classList.remove('drag-over'));
  if (!state.dragTask) return;
  const task = state.tasks.find(t => t.id === state.dragTask);
  if (task && task.col !== col) {
    const colName = COLS.find(c=>c.id===col)?.label;
    showToast(`Moved "${task.title.substring(0,30)}..." to ${colName}`, 'success');
    task.col = col;
    renderKanban();
    renderTaskList();
  }
  state.dragTask = null;
}

function filterPriority(el, p) {
  document.querySelectorAll('.chip').forEach(c => { if(c.closest('.kanban-toolbar')) c.classList.remove('active'); });
  el.classList.add('active');
  document.querySelectorAll('.task-card').forEach(card => {
    if (p === 'all') { card.style.display = ''; return; }
    card.style.display = card.innerHTML.includes(p.toLowerCase()) ? '' : 'none';
  });
}

// List View
function renderTaskList() {
  const list = document.getElementById('task-list-view');
  if (!list) return;
  list.innerHTML = state.tasks.map(t => {
    const col = COLS.find(c=>c.id===t.col);
    return `<div class="task-list-item" onclick="openTaskDetail('${t.id}')">
      <div class="task-list-status" style="background:${col?.color||'var(--border2)'}"></div>
      <span class="task-list-title">${t.title}</span>
      <div class="task-list-meta">
        <span class="priority-badge ${t.priority.toLowerCase()}">${t.priority}</span>
        <div class="task-assignee" style="background:${t.color};width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:white;font-family:'Syne',sans-serif">${t.assignee}</div>
        <span style="font-family:'DM Mono',monospace;font-size:10px;color:var(--text3)">${formatDate(t.due)}</span>
        <span style="font-size:11px;padding:2px 8px;border-radius:20px;background:${col?.color||'var(--border)'}22;color:${col?.color||'var(--text3)'};border:1px solid ${col?.color||'var(--border)'}44">${col?.label}</span>
      </div>
    </div>`;
  }).join('');
}

function switchKanbanView(v) {
  ['board','list','calendar'].forEach(n => {
    const el = document.getElementById(n+'-view');
    if(el) el.style.display = n===v ? (n==='board'?'flex':'block') : 'none';
    const btn = document.getElementById('kb-'+n+'-btn');
    if(btn) btn.classList.toggle('active', n===v);
  });
}

// Calendar
function renderCalendar() {
  const body = document.getElementById('cal-body');
  if (!body) return;
  const year = state.calYear, month = state.calMonth;
  const title = document.getElementById('cal-title');
  if (title) title.textContent = new Date(year, month, 1).toLocaleString('en-US',{month:'long',year:'numeric'});
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month+1, 0).getDate();
  let html = '';
  for (let i = 0; i < first; i++) {
    const d = new Date(year, month, -first+i+1);
    html += `<div class="cal-day other-month"><div class="cal-day-num">${d.getDate()}</div></div>`;
  }
  for (let d = 1; d <= days; d++) {
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const isToday = year===2026 && month===3 && d===19;
    const dayTasks = state.tasks.filter(t => t.due === dateStr);
    html += `<div class="cal-day ${isToday?'today':''}">
      <div class="cal-day-num">${d}</div>
      ${dayTasks.slice(0,3).map(t =>
        `<div class="cal-task-dot" style="background:${t.color}22;color:${t.color};border:1px solid ${t.color}44" onclick="openTaskDetail('${t.id}')">${t.title.substring(0,20)}…</div>`
      ).join('')}
    </div>`;
  }
  body.innerHTML = html;
}

function calNav(dir) {
  state.calMonth += dir;
  if (state.calMonth < 0) { state.calMonth = 11; state.calYear--; }
  if (state.calMonth > 11) { state.calMonth = 0; state.calYear++; }
  renderCalendar();
}

// ═══════════════════════════════════════════════════
//  TASK DETAIL
// ═══════════════════════════════════════════════════
function openTaskDetail(id) {
  const t = state.tasks.find(t=>t.id===id);
  if (!t) return;
  state.activeTaskId = id;
  document.getElementById('td-title').textContent = t.title;
  const col = COLS.find(c=>c.id===t.col);
  document.getElementById('td-body').innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:16px">
      <div>
        <div class="form-label">Status</div>
        <span style="font-size:12px;padding:4px 10px;border-radius:20px;background:${col?.color}22;color:${col?.color};border:1px solid ${col?.color}44">${col?.label}</span>
      </div>
      <div>
        <div class="form-label">Priority</div>
        <span class="priority-badge ${t.priority.toLowerCase()}">${t.priority}</span>
      </div>
      <div>
        <div class="form-label">Assignee</div>
        <div style="display:flex;align-items:center;gap:6px;font-size:13px">
          <div style="width:22px;height:22px;border-radius:50%;background:${t.color};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:white;font-family:'Syne',sans-serif">${t.assignee}</div>
          ${t.assigneeName}
        </div>
      </div>
    </div>
    <div style="margin-bottom:12px">
      <div class="form-label">Description</div>
      <div style="font-size:13.5px;color:var(--text2);line-height:1.6">${t.desc}</div>
    </div>
    <div style="display:flex;gap:6px;align-items:center;margin-bottom:4px">
      <span class="form-label" style="margin-bottom:0">Labels</span>
      ${t.labels.map(l=>`<span class="label-tag" style="background:${labelColor(l)}22;color:${labelColor(l)};border:1px solid ${labelColor(l)}44">${l}</span>`).join('')}
    </div>
    <div style="margin-top:8px">
      <div class="form-label">Due Date</div>
      <div style="font-size:13px;color:var(--text2);font-family:'DM Mono',monospace">${t.due}</div>
    </div>
    <div style="margin-top:12px">
      <label class="form-label">Move to</label>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        ${COLS.map(c=>`<button class="btn btn-ghost" style="font-size:11px;padding:4px 10px;${c.id===t.col?'background:'+c.color+'22;border-color:'+c.color:''}" onclick="moveTask('${id}','${c.id}')">${c.label}</button>`).join('')}
      </div>
    </div>
  `;
  document.getElementById('td-comments').innerHTML = t.comments.length ?
    t.comments.map(c=>`<div style="display:flex;gap:8px;margin-bottom:8px">
      <div style="width:24px;height:24px;border-radius:50%;background:${state.members.find(m=>m.initials===c.user)?.color||'var(--accent)'};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:white;font-family:'Syne',sans-serif;flex-shrink:0">${c.user}</div>
      <div><div style="font-size:12px;line-height:1.5">${c.text}</div><div style="font-size:10px;color:var(--text3);font-family:'DM Mono',monospace">${c.time}</div></div>
    </div>`).join('') : `<div style="font-size:12px;color:var(--text3)">No comments yet</div>`;

  openModal('task-detail-modal');
}

function moveTask(id, col) {
  const task = state.tasks.find(t=>t.id===id);
  if (task) {
    const colName = COLS.find(c=>c.id===col)?.label;
    task.col = col;
    showToast(`Moved to ${colName}`, 'success');
    document.getElementById('td-body').innerHTML += '';
    openTaskDetail(id);
    if (state.currentView === 'kanban') { renderKanban(); renderTaskList(); }
  }
}

function addComment() {
  const input = document.getElementById('td-comment-input');
  const text = input.value.trim();
  if (!text || !state.activeTaskId) return;
  const task = state.tasks.find(t=>t.id===state.activeTaskId);
  if (task) {
    task.comments.push({ user: 'AK', text, time: 'just now' });
    input.value = '';
    openTaskDetail(state.activeTaskId);
    showToast('Comment posted', 'success');
  }
}

function createTask() {
  const title = document.getElementById('new-task-title').value.trim();
  if (!title) { showToast('Title is required', 'error'); return; }
  const id = 't' + Date.now();
  const assigneeMap = { 'Ankush Kumar':'AK','Riya Sharma':'RS','Dev Patel':'DP','Priya Nair':'PN' };
  const colorMap = { 'AK':'#6c63ff','RS':'#ec4899','DP':'#f59e0b','PN':'#22c55e' };
  const assigneeName = document.getElementById('new-task-assignee').value;
  const assignee = assigneeMap[assigneeName] || 'AK';
  const labels = document.getElementById('new-task-labels').value.split(',').map(l=>l.trim()).filter(Boolean);
  state.tasks.push({
    id, title,
    desc: document.getElementById('new-task-desc').value,
    col: document.getElementById('new-task-col').value,
    priority: document.getElementById('new-task-priority').value,
    assignee, assigneeName, color: colorMap[assignee],
    due: document.getElementById('new-task-due').value,
    labels, comments: []
  });
  closeModal('new-task-modal');
  showToast('Task created!', 'success');
  if (state.currentView === 'kanban') { renderKanban(); renderTaskList(); }
  // clear
  ['new-task-title','new-task-desc','new-task-labels'].forEach(id => { const el = document.getElementById(id); if(el) el.value=''; });
}

// ═══════════════════════════════════════════════════
//  SNIPPETS
// ═══════════════════════════════════════════════════
function renderSnippets(filter='') {
  const grid = document.getElementById('snippets-grid');
  const snips = state.snippets.filter(s =>
    filter ? (s.title.toLowerCase().includes(filter) || s.tags.some(t=>t.includes(filter))) : true
  );
  grid.innerHTML = snips.map(s => `
    <div class="snippet-card">
      <div class="snippet-header">
        <div class="snippet-title">${s.title}</div>
        <span class="lang-badge ${s.lang==='javascript'?'js':s.lang==='python'?'py':s.lang==='go'?'go':s.lang==='java'?'java':'cpp'}">${s.lang}</span>
      </div>
      <div style="padding:12px 16px;font-size:12px;color:var(--text2)">${s.desc}</div>
      <div class="snippet-code">
        <pre><code class="language-${s.lang}">${escHtml(s.code)}</code></pre>
      </div>
      <div class="snippet-footer">
        <div class="snippet-tags">${s.tags.map(t=>`<span class="snippet-tag">${t}</span>`).join('')}</div>
        <button class="btn-icon" style="font-size:12px;padding:5px 8px" onclick="copySnippet('${s.id}')">📋 Copy</button>
      </div>
    </div>
  `).join('');
  grid.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el));
}

function escHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function filterSnippets(v) { renderSnippets(v.toLowerCase()); }

function filterSnippetTag(el, tag) {
  document.querySelectorAll('#snippet-tags-filter .chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  renderSnippets(tag === 'all' ? '' : tag);
}

function copySnippet(id) {
  const s = state.snippets.find(s=>s.id===id);
  if (s) { navigator.clipboard?.writeText(s.code).catch(()=>{}); showToast('Copied to clipboard!', 'success'); }
}

function saveSnippet() {
  const title = document.getElementById('snip-title').value.trim();
  if (!title) { showToast('Title required', 'error'); return; }
  state.snippets.unshift({
    id: 's' + Date.now(),
    title,
    lang: document.getElementById('snip-lang').value,
    code: document.getElementById('snip-code').value,
    tags: document.getElementById('snip-tags').value.split(',').map(t=>t.trim()).filter(Boolean),
    desc: document.getElementById('snip-desc').value,
  });
  closeModal('new-snippet-modal');
  renderSnippets();
  showToast('Snippet saved!', 'success');
}

// ═══════════════════════════════════════════════════
//  WIKI
// ═══════════════════════════════════════════════════
function initWiki() {
  renderWikiPages();
  loadWikiContent();
}

function renderWikiPages() {
  const list = document.getElementById('wiki-pages-list');
  list.innerHTML = state.wikiPages.map(p =>
    `<div class="wiki-page-item ${p.active?'active':''}" onclick="loadWikiPage('${p.id}')">
      <span>${p.icon}</span> ${p.title}
    </div>`
  ).join('');
}

function loadWikiPage(id) {
  state.wikiPages.forEach(p => p.active = p.id === id);
  renderWikiPages();
  const page = state.wikiPages.find(p=>p.id===id);
  document.getElementById('wiki-title').value = page?.title || '';
  loadWikiContent(id);
}

function loadWikiContent(id = 'w1') {
  const content = {
    w1: `<h1>Getting Started with Athena AI</h1>
<p>Welcome to the <strong>Athena AI Platform</strong> — a unified workspace for building, shipping, and scaling AI-powered products. This guide walks you through setup and first steps.</p>
<h2>Prerequisites</h2>
<ul>
  <li>Node.js v20+ and npm v10+</li>
  <li>PostgreSQL 15 with pgvector extension</li>
  <li>Redis 7.x for caching and rate limiting</li>
  <li>An Anthropic API key (set in <code>.env</code>)</li>
</ul>
<h2>Quick Start</h2>
<pre><code>git clone https://github.com/novaspark/athena
cd athena && npm install
cp .env.example .env
npm run db:migrate
npm run dev</code></pre>
<p>The dev server runs at <code>http://localhost:3000</code>. The first user to sign up becomes the workspace owner.</p>
<h2>Project Structure</h2>
<pre><code>athena/
├── app/          # Next.js 14 app router
├── server/       # Express API + WebSocket server
├── db/           # Prisma schema + migrations
├── ai/           # AI prompt templates + context builders
└── packages/     # Shared types & utilities</code></pre>
<blockquote>💡 Pro tip: Run <code>npm run ai:seed</code> to populate the vector DB with your project's domain context for better AI suggestions.</blockquote>`,
    w2: `<h1>Architecture Overview</h1><p>Athena uses a <strong>layered microservice-lite</strong> architecture with a monorepo structure. The frontend communicates with a unified BFF (Backend for Frontend) that orchestrates calls to specialized services.</p><h2>Service Map</h2><ul><li><strong>Auth Service</strong> — JWT + OAuth2, session management</li><li><strong>Project Service</strong> — workspace, projects, members, permissions</li><li><strong>Task Service</strong> — kanban, assignments, comments, attachments</li><li><strong>AI Service</strong> — Claude integration, context injection, vector search</li><li><strong>Realtime Service</strong> — WebSocket / Socket.IO, presence, notifications</li></ul>`,
    w3: `<h1>API Reference</h1><p>Base URL: <code>https://api.athena.io/v1</code></p><h2>Authentication</h2><p>All requests require <code>Authorization: Bearer {token}</code>. Obtain tokens via <code>POST /auth/login</code>.</p><h2>Endpoints</h2><pre><code>POST /auth/login\nPOST /auth/register\nGET  /workspaces\nPOST /workspaces/{id}/projects\nGET  /projects/{id}/tasks\nPOST /tasks\nPUT  /tasks/{id}\nDEL  /tasks/{id}\nPOST /ai/chat\nPOST /ai/review</code></pre>`,
  };
  const el = document.getElementById('wiki-content');
  if (el) el.innerHTML = content[id] || `<p>Start writing your documentation here...</p>`;
}

function execCmd(cmd) { document.getElementById('wiki-content').focus(); document.execCommand(cmd, false, null); }
function insertHeading(level) {
  document.getElementById('wiki-content').focus();
  document.execCommand('formatBlock', false, 'h' + level);
}
function insertCodeBlock() {
  document.getElementById('wiki-content').focus();
  document.execCommand('insertHTML', false, '<pre><code>// your code here</code></pre><p><br></p>');
}
function insertTable() {
  document.getElementById('wiki-content').focus();
  document.execCommand('insertHTML', false, '<table style="border-collapse:collapse;width:100%;margin:12px 0"><tr><th style="border:1px solid var(--border);padding:8px;background:var(--bg3)">Column 1</th><th style="border:1px solid var(--border);padding:8px;background:var(--bg3)">Column 2</th><th style="border:1px solid var(--border);padding:8px;background:var(--bg3)">Column 3</th></tr><tr><td style="border:1px solid var(--border);padding:8px">Data</td><td style="border:1px solid var(--border);padding:8px">Data</td><td style="border:1px solid var(--border);padding:8px">Data</td></tr></table><p><br></p>');
}

function createWikiPage() {
  const title = document.getElementById('new-page-title').value.trim();
  if (!title) { showToast('Title required','error'); return; }
  const id = 'w' + Date.now();
  state.wikiPages.forEach(p=>p.active=false);
  state.wikiPages.push({ id, title, icon: '📄', active: true });
  renderWikiPages();
  document.getElementById('wiki-title').value = title;
  document.getElementById('wiki-content').innerHTML = '<p>Start writing...</p>';
  closeModal('new-page-modal');
  showToast('Page created!', 'success');
}

// ═══════════════════════════════════════════════════
//  AI ASSISTANT
// ═══════════════════════════════════════════════════
function handleAIKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendAIFromInput(); }
}

function sendAIFromInput() {
  const input = document.getElementById('ai-input');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  sendAIMessage(msg);
}

async function sendAIMessage(msg) {
  if (state.currentView !== 'ai') {
    navigate('ai', document.querySelector('[onclick*="ai"]'));
    await new Promise(r => setTimeout(r, 100));
  }

  const chat = document.getElementById('ai-chat-area');

  // User bubble
  chat.insertAdjacentHTML('beforeend', `
    <div class="ai-message user-message">
      <div class="user-bubble">${escHtml(msg)}</div>
      <div class="user-avatar" style="width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,var(--accent),var(--pink));display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:white;font-family:'Syne',sans-serif;flex-shrink:0">AK</div>
    </div>`);
  chat.scrollTop = chat.scrollHeight;

  // Thinking indicator
  const thinkId = 'think-' + Date.now();
  chat.insertAdjacentHTML('beforeend', `
    <div class="ai-message" id="${thinkId}">
      <div class="ai-avatar">🤖</div>
      <div class="ai-bubble"><div class="thinking"><div class="thinking-dot"></div><div class="thinking-dot"></div><div class="thinking-dot"></div></div></div>
    </div>`);
  chat.scrollTop = chat.scrollHeight;

  // Build context
  const taskSummary = state.tasks.map(t=>`[${t.col}] ${t.title} (${t.priority}, assigned:${t.assigneeName}, due:${t.due})`).join('\n');
  const systemPrompt = `You are an AI project assistant for DevCollab, a developer collaboration platform. You have full context about the team's workspace.

CURRENT PROJECT: Athena AI Platform
TEAM: Ankush Kumar (Owner, Full-stack), Riya Sharma (Admin, Frontend), Dev Patel (Member, Backend/DevOps), Priya Nair (Member, ML/Python), Sam Lee (Viewer, PM)

CURRENT TASKS:
${taskSummary}

SNIPPETS: ${state.snippets.length} saved snippets (JWT, debounce, Postgres pool, rate limiter, Redis cache, Stripe webhook)

You help with: project summaries, identifying blockers, generating standups, breaking features into tasks, suggesting assignees, sprint planning.

When breaking down features, format subtasks as a numbered list with priority (P0/P1/P2) and suggested assignee.
When generating standups, use the format: ✅ Done | 🔄 In Progress | ⏳ Blocked.
Be concise but insightful. Use markdown formatting (bold, bullets, headers).`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: msg }]
      })
    });
    const data = await res.json();
    const reply = data.content?.[0]?.text || 'Sorry, I had trouble processing that.';
    document.getElementById(thinkId)?.remove();
    chat.insertAdjacentHTML('beforeend', `
      <div class="ai-message">
        <div class="ai-avatar">🤖</div>
        <div class="ai-bubble">${mdToHtml(reply)}</div>
      </div>`);

    // If feature breakdown, auto-generate tasks
    if (msg.toLowerCase().includes('build') || msg.toLowerCase().includes('login') || msg.toLowerCase().includes('feature') || msg.toLowerCase().includes('break down')) {
      const matches = reply.match(/\d+\.\s+(.+)/g);
      if (matches && matches.length >= 3) {
        chat.insertAdjacentHTML('beforeend', `
          <div class="ai-message">
            <div class="ai-avatar">🤖</div>
            <div class="ai-bubble" style="display:flex;flex-direction:column;gap:8px">
              <strong>Would you like me to create these as tasks on the Kanban board?</strong>
              <div><button class="btn btn-primary" onclick="createAITasks(${JSON.stringify(matches.slice(0,6).map(m=>m.replace(/^\d+\.\s*/,'').trim())).replace(/"/g,'&quot;')})">✅ Create ${Math.min(matches.length,6)} Tasks</button></div>
            </div>
          </div>`);
      }
    }
  } catch (err) {
    document.getElementById(thinkId)?.remove();
    chat.insertAdjacentHTML('beforeend', `
      <div class="ai-message">
        <div class="ai-avatar">🤖</div>
        <div class="ai-bubble" style="color:var(--red)">⚠️ Could not connect to AI. Please check your API access.</div>
      </div>`);
  }
  chat.scrollTop = chat.scrollHeight;
}

function createAITasks(titles) {
  titles.forEach((title, i) => {
    state.tasks.push({
      id: 't' + Date.now() + i,
      title: title.substring(0,80),
      desc: 'Generated by AI Assistant',
      col: 'todo',
      priority: i < 2 ? 'P0' : i < 4 ? 'P1' : 'P2',
      assignee: 'AK', assigneeName: 'Ankush', color: '#6c63ff',
      due: '2026-05-10',
      labels: ['ai-generated'],
      comments: []
    });
  });
  showToast(`Created ${titles.length} tasks on the board!`, 'success');
  if (state.currentView === 'kanban') { renderKanban(); renderTaskList(); }
  const chat = document.getElementById('ai-chat-area');
  chat.insertAdjacentHTML('beforeend', `
    <div class="ai-message">
      <div class="ai-avatar">🤖</div>
      <div class="ai-bubble">✅ Created <strong>${titles.length} tasks</strong> on your Kanban board. <a href="#" onclick="navigate('kanban',document.querySelector('[onclick*=kanban]'));return false" style="color:var(--accent2)">View board →</a></div>
    </div>`);
  chat.scrollTop = chat.scrollHeight;
}

function mdToHtml(md) {
  return md
    .replace(/^### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^## (.+)$/gm, '<h4>$1</h4>')
    .replace(/^# (.+)$/gm, '<h4>$1</h4>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code style="font-family:var(--mono,\'DM Mono\',monospace);background:var(--bg3);padding:1px 5px;border-radius:3px;color:var(--cyan);font-size:12px">$1</code>')
    .replace(/^✅ (.+)$/gm, '<div style="color:var(--green);margin:3px 0">✅ $1</div>')
    .replace(/^🔄 (.+)$/gm, '<div style="color:var(--accent2);margin:3px 0">🔄 $1</div>')
    .replace(/^⏳ (.+)$/gm, '<div style="color:var(--yellow);margin:3px 0">⏳ $1</div>')
    .replace(/^🚧 (.+)$/gm, '<div style="color:var(--red);margin:3px 0">🚧 $1</div>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li><strong>$1.</strong> $2</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul style="margin-left:16px;margin-top:6px;margin-bottom:6px">$1</ul>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}

// ═══════════════════════════════════════════════════
//  CODE REVIEW
// ═══════════════════════════════════════════════════
function loadSampleCode() {
  document.getElementById('code-editor').value = `function getUserData(userId) {
  // TODO: add input validation
  var query = "SELECT * FROM users WHERE id = " + userId;
  
  try {
    var result = db.execute(query);
    var user = result[0];
    console.log("User fetched:", user);
    return user;
  } catch(e) {
    console.log(e);
  }
}

function processPayment(amount, cardNumber) {
  // Store card for later
  localStorage.setItem('card_' + Date.now(), cardNumber);
  
  for(var i = 0; i < 1000; i++) {
    calculateDiscount(amount, i);
  }
}

function calculateDiscount(amount, pct) {
  return amount - (amount * pct / 100);
}`;
}

async function runCodeReview() {
  const code = document.getElementById('code-editor').value.trim();
  if (!code) { showToast('Please paste some code first', 'error'); return; }
  const lang = document.getElementById('code-lang').value;

  const reviewItems = document.getElementById('review-items');
  const scoreVal = document.getElementById('score-val');
  const scoreTitle = document.getElementById('score-title');
  const scoreSub = document.getElementById('score-sub');

  reviewItems.innerHTML = `<div style="text-align:center;padding:30px"><div class="thinking" style="justify-content:center"><div class="thinking-dot"></div><div class="thinking-dot"></div><div class="thinking-dot"></div></div><div style="margin-top:10px;font-size:13px;color:var(--text3)">Analyzing your code...</div></div>`;

  const systemPrompt = `You are an expert code reviewer. Analyze the provided ${lang} code and respond ONLY with a JSON object in this exact format:
{
  "score": <number 1-10>,
  "verdict": "<short verdict like 'Needs Work' or 'Good Code' or 'Critical Issues'>",
  "summary": "<one sentence summary>",
  "issues": [
    {"type": "bug|perf|style|security", "title": "<issue title>", "detail": "<explanation>", "line": "<line ref or null>"},
    ...
  ]
}
Provide 3-7 specific, actionable issues. Be concise and technical. Respond ONLY with the JSON, no other text.`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: `Review this ${lang} code:\n\n${code}` }]
      })
    });
    const data = await res.json();
    let text = data.content?.[0]?.text || '{}';
    text = text.replace(/```json|```/g, '').trim();
    const review = JSON.parse(text);

    const score = review.score || 5;
    const deg = Math.round(score / 10 * 360);
    const color = score >= 8 ? 'var(--green)' : score >= 5 ? 'var(--yellow)' : 'var(--red)';

    document.getElementById('score-ring').style.background =
      `conic-gradient(${color} 0deg ${deg}deg, var(--bg3) ${deg}deg 360deg)`;
    scoreVal.textContent = score;
    scoreVal.style.color = color;
    scoreTitle.textContent = review.verdict || 'Code Quality Score';
    scoreSub.textContent = review.summary || '';

    reviewItems.innerHTML = (review.issues || []).map(issue =>
      `<div class="review-item ${issue.type}">
        <div class="review-item-type">${{bug:'🐛 Bug',perf:'⚡ Performance',style:'✨ Style',security:'🔒 Security'}[issue.type]||issue.type}</div>
        <div style="font-size:13px;font-weight:600;margin-bottom:3px">${escHtml(issue.title)}</div>
        <div class="review-item-text">${escHtml(issue.detail)}</div>
        ${issue.line ? `<div class="review-item-line">Line: ${issue.line}</div>` : ''}
      </div>`
    ).join('');

  } catch (err) {
    reviewItems.innerHTML = `<div style="color:var(--red);padding:16px;font-size:13px">⚠️ Review failed. Check API access or try again.</div>`;
  }
}

// ═══════════════════════════════════════════════════
//  ACTIVITY
// ═══════════════════════════════════════════════════
function renderActivity(items) {
  const feed = document.getElementById('activity-feed');
  if (!feed) return;
  feed.innerHTML = items.map(a =>
    `<div class="activity-item">
      <div class="activity-icon" style="background:${a.bg};color:${a.color}">${a.icon}</div>
      <div class="activity-content">
        <div class="activity-text">${a.text}<span class="activity-project">${a.project}</span></div>
        <div class="activity-time">${a.time}</div>
      </div>
    </div>`
  ).join('');
}

function filterActivity(el, type) {
  document.querySelectorAll('#view-activity .chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  const filtered = type === 'all' ? state.activity : state.activity.filter(a => a.type === type);
  renderActivity(filtered);
}

// ═══════════════════════════════════════════════════
//  MEMBERS
// ═══════════════════════════════════════════════════
function renderMembers() {
  const grid = document.getElementById('members-grid');
  if (!grid) return;
  grid.innerHTML = state.members.map(m =>
    `<div class="member-card">
      <div style="position:relative;display:inline-block">
        <div class="member-avatar-lg" style="background:linear-gradient(135deg,${m.color},${m.color}88)">${m.initials}</div>
        ${m.online ? `<div style="position:absolute;bottom:2px;right:2px;width:12px;height:12px;background:var(--green);border-radius:50%;border:2px solid var(--bg2)"></div>` : ''}
      </div>
      <div class="member-name">${m.name}</div>
      <div class="member-handle">${m.handle}</div>
      <div class="member-role-badge ${m.role==='Owner'?'owner':m.role==='Admin'?'admin':m.role==='Member'?'member-r':'viewer'}">${m.role}</div>
      <div style="font-size:12px;color:var(--text3);margin-bottom:10px">${m.bio}</div>
      <div class="member-skills">${m.skills.map(s=>`<span class="skill-tag">${s}</span>`).join('')}</div>
      <div style="margin-top:10px;display:flex;gap:6px">
        <button class="btn btn-ghost" style="font-size:11px;padding:4px 10px" onclick="showToast('Message sent!','success')">💬 Message</button>
        ${m.initials!=='AK'?`<button class="btn btn-ghost" style="font-size:11px;padding:4px 10px" onclick="showToast('Viewing profile...','info')">👤 Profile</button>`:''}
      </div>
    </div>`
  ).join('');
}

// ═══════════════════════════════════════════════════
//  NOTIFICATIONS
// ═══════════════════════════════════════════════════
function renderNotifPanel() {
  const list = document.getElementById('notif-panel-list');
  list.innerHTML = state.notifications.slice(0,5).map(n =>
    `<div class="notif-item ${n.unread?'unread':''}" onclick="n.unread=false;renderNotifPanel()">
      <div class="notif-avatar" style="background:${n.user==='🤖'?'var(--accent)':'linear-gradient(135deg,'+n.color+','+n.color+'88)'}">${n.user}</div>
      <div>
        <div class="notif-text">${n.text}</div>
        <div class="notif-time">${n.time}</div>
      </div>
    </div>`
  ).join('');
}

function renderFullNotifications() {
  const list = document.getElementById('full-notif-list');
  if (!list) return;
  list.innerHTML = state.notifications.map(n =>
    `<div class="notif-item ${n.unread?'unread':''}" style="position:relative;padding:14px 20px" onclick="n.unread=false;renderFullNotifications()">
      ${n.unread?`<div style="position:absolute;left:8px;top:50%;transform:translateY(-50%);width:6px;height:6px;background:var(--accent);border-radius:50%"></div>`:''}
      <div class="notif-avatar" style="background:${n.user==='🤖'?'var(--accent)':'linear-gradient(135deg,'+n.color+','+n.color+'88)'}">${n.user}</div>
      <div style="flex:1">
        <div class="notif-text">${n.text}</div>
        <div class="notif-time">${n.time}</div>
      </div>
    </div>`
  ).join('');
}

function toggleNotifPanel() {
  const panel = document.getElementById('notif-panel');
  panel.classList.toggle('open');
  if (panel.classList.contains('open')) renderNotifPanel();
}

function markAllRead() {
  state.notifications.forEach(n => n.unread = false);
  renderNotifPanel();
  renderFullNotifications();
  showToast('All notifications marked as read', 'success');
  const badge = document.querySelector('.nav-item[onclick*="notification"] .nav-badge');
  if (badge) badge.remove();
}

// ═══════════════════════════════════════════════════
//  PAYMENTS
// ═══════════════════════════════════════════════════
function checkoutPro() {
  showToast('Opening checkout (sandbox mode)...', 'info');
  setTimeout(() => {
    showToast('✅ Sandbox checkout: No card needed in demo!', 'success');
  }, 1200);
}

// ═══════════════════════════════════════════════════
//  PROFILE
// ═══════════════════════════════════════════════════
function renderProfile() {
  const prefs = document.getElementById('notif-prefs');
  if (!prefs || prefs.children.length) return;
  const items = [
    { label: 'Task assignments', key: 'assign', on: true },
    { label: '@mentions in comments', key: 'mention', on: true },
    { label: 'Task status changes', key: 'status', on: true },
    { label: 'New members joining', key: 'members', on: false },
    { label: 'AI blocker alerts', key: 'ai', on: true },
    { label: 'Wiki page updates', key: 'wiki', on: false },
  ];
  prefs.innerHTML = items.map(item =>
    `<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border)">
      <span style="font-size:13px">${item.label}</span>
      <label style="position:relative;display:inline-block;width:36px;height:20px;cursor:pointer">
        <input type="checkbox" ${item.on?'checked':''} style="opacity:0;width:0;height:0" onchange="showToast('Preference saved','success')">
        <span style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:${item.on?'var(--accent)':'var(--border2)'};transition:.2s;border-radius:20px"></span>
      </label>
    </div>`
  ).join('');
}

// ═══════════════════════════════════════════════════
//  SEARCH
// ═══════════════════════════════════════════════════
function openSearch() {
  document.getElementById('search-modal').classList.add('open');
  document.getElementById('search-overlay').style.display = 'block';
  setTimeout(() => document.getElementById('global-search-input').focus(), 50);
}
function closeSearch() {
  document.getElementById('search-modal').classList.remove('open');
  document.getElementById('search-overlay').style.display = 'none';
}

function runGlobalSearch(q) {
  const res = document.getElementById('global-search-results');
  if (!q) { res.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text3);font-size:13px">Type to search...</div>'; return; }
  const ql = q.toLowerCase();
  const results = [];
  state.tasks.filter(t=>t.title.toLowerCase().includes(ql)).forEach(t=>results.push({icon:'📋',bg:'rgba(108,99,255,0.15)',title:t.title,sub:`Task · ${COLS.find(c=>c.id===t.col)?.label}`,action:()=>{closeSearch();navigate('kanban',document.querySelector('[onclick*=kanban]'));}}));
  state.snippets.filter(s=>s.title.toLowerCase().includes(ql)||s.tags.some(t=>t.includes(ql))).forEach(s=>results.push({icon:'⌨️',bg:'rgba(236,72,153,0.15)',title:s.title,sub:`Snippet · ${s.lang}`,action:()=>{closeSearch();navigate('snippets',document.querySelector('[onclick*=snippets]'));}}));
  state.wikiPages.filter(p=>p.title.toLowerCase().includes(ql)).forEach(p=>results.push({icon:p.icon,bg:'rgba(245,158,11,0.15)',title:p.title,sub:'Wiki Page',action:()=>{closeSearch();navigate('wiki',document.querySelector('[onclick*=wiki]'));}}));
  state.members.filter(m=>m.name.toLowerCase().includes(ql)).forEach(m=>results.push({icon:m.initials,bg:`${m.color}22`,title:m.name,sub:`${m.role} · ${m.handle}`,action:()=>{closeSearch();navigate('members',document.querySelector('[onclick*=members]'));}}));

  if (!results.length) { res.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text3);font-size:13px">No results found</div>'; return; }
  res.innerHTML = results.slice(0,8).map(r=>
    `<div class="search-result-item" onclick="(${r.action.toString()})()">
      <div class="search-result-icon" style="background:${r.bg}">${r.icon}</div>
      <div class="search-result-text">
        <div class="search-result-title">${r.title}</div>
        <div class="search-result-sub">${r.sub}</div>
      </div>
    </div>`
  ).join('');
}

// ═══════════════════════════════════════════════════
//  MODALS
// ═══════════════════════════════════════════════════
function openModal(id) { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

// Close on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });
});

// ═══════════════════════════════════════════════════
//  INVITES
// ═══════════════════════════════════════════════════
function sendInvite() {
  const email = document.getElementById('invite-email').value;
  if (!email || !email.includes('@')) { showToast('Enter a valid email', 'error'); return; }
  closeModal('invite-modal');
  showToast(`Invite sent to ${email}`, 'success');
}

function selectProject(proj, el) {
  document.querySelectorAll('.project-item').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  state.currentProject = proj;
  showToast(`Switched to ${el.textContent.trim()}`, 'info');
}

// ═══════════════════════════════════════════════════
//  TOASTS
// ═══════════════════════════════════════════════════
function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  el.innerHTML = `<span>${icons[type]}</span> <span>${msg}</span>`;
  container.appendChild(el);
  setTimeout(() => el.style.transition = 'opacity 0.3s', 50);
  setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 300); }, 3000);
}

// ═══════════════════════════════════════════════════
//  KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════════
document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
  if (e.key === 'Escape') {
    closeSearch();
    document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
    document.getElementById('notif-panel')?.classList.remove('open');
  }
});

// Close notif panel on outside click
document.addEventListener('click', e => {
  const panel = document.getElementById('notif-panel');
  if (panel?.classList.contains('open') && !panel.contains(e.target) && !e.target.closest('[onclick*=toggleNotifPanel]')) {
    panel.classList.remove('open');
  }
});

// ═══════════════════════════════════════════════════
//  SIMULATE REALTIME
// ═══════════════════════════════════════════════════
const liveMessages = [
  "🔄 Riya Sharma is viewing the Kanban board",
  "💬 Dev Patel added a comment on 'DB Migration'",
  "✅ Schema migration moved to Done by Dev Patel",
  "🤖 AI: Auth service has been In Progress for 8 days",
  "👤 Priya Nair joined the project",
];
let liveIdx = 0;
setInterval(() => {
  if (state.currentView === 'kanban' || state.currentView === 'dashboard') {
    // silently add to activity
    const msgs = liveMessages;
    const msg = msgs[liveIdx % msgs.length];
    liveIdx++;
    // Add notification badge glow effect
    const dot = document.querySelector('.live-dot');
    if (dot) { dot.style.background = 'var(--yellow)'; setTimeout(() => dot.style.background = 'var(--green)', 400); }
  }
}, 8000);

// ═══════════════════════════════════════════════════
//  BOOT
// ═══════════════════════════════════════════════════
window.addEventListener('load', () => {
  initDashboard();
  renderNotifPanel();

  // Animate stat values
  setTimeout(() => {
    document.querySelectorAll('.stat-value').forEach(el => {
      const final = parseInt(el.textContent);
      if (isNaN(final)) return;
      let n = 0;
      const step = Math.ceil(final / 20);
      const t = setInterval(() => {
        n = Math.min(n + step, final);
        el.textContent = n;
        if (n >= final) clearInterval(t);
      }, 40);
    });
  }, 200);
});
