# 🏗️ DevCollab — Real-Time Project Collaboration Platform for Developers

> **Problem Statement:** Student developer teams lack a unified workspace. They juggle GitHub for code, Notion for docs, Trello for tasks, and Slack for communication — context switches kill momentum, nothing stays in sync, and AI assistance is completely absent from the workflow. DevCollab solves this by collapsing all of it into one AI-native platform built specifically for how developers think and work.

---


## 📸 Screenshots

| Dashboard | Kanban Board | AI Assistant |
|-----------|--------------|--------------|
| Live project health, stats, quick actions | Drag-and-drop with board/list/calendar views | project intelligence |

| Code Reviewer | Snippets Library | Wiki Editor |
|---------------|-----------------|-------------|
| AI quality score + issue breakdown | Syntax-highlighted reusable code | Rich text with tables, code blocks, headings |

---

## 🧩 Problem Statement (Detailed)

Most student developer teams face the same fragmented toolchain problem:

- **Tasks** live in Trello or Linear — disconnected from the actual code
- **Documentation** is scattered across Notion, Google Docs, and README files
- **Code snippets** get copy-pasted into Slack and lost forever
- **Communication** happens in Discord/Slack with zero project context
- **AI tools** (ChatGPT, Copilot) require manually copy-pasting context every single time
- **No single source of truth** — onboarding a new member is painful, progress is invisible

**DevCollab** is the answer: one workspace where tasks, docs, code, and AI are deeply integrated. The AI assistant already knows your tasks, your team, your deadlines, and your stack — no prompting overhead.

---

## ✨ Features

### 🏠 Workspace & Projects
- Multi-project workspace with team/organisation structure
- Invite members via email link or shareable invite URL
- **Role system:** Owner · Admin · Member · Viewer — each with scoped permissions
- Project health dashboard with completion rates and sparkline charts

### 📋 Task Management
- **Kanban Board** with 4 columns: To Do → In Progress → In Review → Done
- Full drag-and-drop task movement across columns
- Per-task: title, description, assignee, priority (P0/P1/P2), due date, labels, comment thread
- **3 views:** Board view · List view · Calendar view (switch with one click)
- Priority filters (P0 / P1 / P2 / All)
- Task detail modal with inline comment system and @mention support
- Overdue detection with visual alerts

### 🔴 Real-Time Collaboration
- Live presence bar showing who is currently viewing the board
- Animated live indicator (green pulse dot) for active sessions
- Simulated real-time events: task moves, comments, member joins
- Toast notifications for all collaborative actions
- "X moved your task to In Review" style alerts

### ⌨️ Code Snippet Manager
- Save reusable code snippets with title, language, description, tags
- Syntax-highlighted display powered by **highlight.js**
- Supports: JavaScript · Python · Go · Java · C++
- Search snippets by title or tag
- One-click **Copy to clipboard**
- Tag filter bar for quick browsing

### 📖 Documentation Wiki
- Each project has a fully editable wiki section
- Rich text editor with toolbar: **Bold** · *Italic* · Underline · H1/H2/H3 · Bullet list · Numbered list · Code block · Table · Horizontal rule
- Multiple pages with sidebar navigation
- Page templates: Blank · Technical Spec · Meeting Notes · RFC · Onboarding Guide
- Version history button (UI ready for backend integration)
- `contenteditable` based editor, works out of the box

### 🤖 AI Project Assistant *(Live Claude API)*
- **"Summarise this project"** — AI reads all task titles, statuses, and team context to generate a progress summary
- **"What's blocking us?"** — identifies tasks stuck In Progress, overdue items, and bottlenecks
- **"Generate a standup report"** — creates ✅ Done · 🔄 In Progress · ⏳ Blocked format from task data
- **"Build a login system"** → AI generates subtasks → one-click creates them on the Kanban board
- **"Suggest assignees"** — AI matches tasks to team members based on skills
- Full project context injected automatically (tasks, team, deadlines, stack)
- Markdown rendering in chat (headings, bold, lists, inline code)
- Chat history maintained per session

### 🔍 AI Code Reviewer *(Live Claude API)*
- Paste any code → click **Run Review** → get an AI-powered analysis
- **Quality score (1–10)** with animated ring gauge
- Issue categories: 🐛 Bug · ⚡ Performance · ✨ Style · 🔒 Security
- Each issue includes: title, detailed explanation, line reference
- Supports: JavaScript · Python · Java · C++ · Go
- Sample code loader to demo the feature instantly
- Built-in SQL injection, `localStorage` leakage, and performance issue detection

### 📡 Activity Feed
- Global feed showing all workspace events: task moved, comment added, doc updated, member joined
- Filter by type: All · Tasks · Docs · Members
- Timestamped entries with project badges
- Mini activity widget embedded in the dashboard

### 👤 User System
- Profile page with name, username, email, GitHub link, bio
- Notification preferences with toggles per event type
- User card in sidebar with online/offline status indicator
- Member directory with roles, skills, online status, and messaging

### 🔔 Notification Centre
- In-app notification panel (bell icon in topbar)
- Unread indicators with accent dot
- Notification types: @mentions, task assignments, status changes, AI alerts, new members
- Mark all as read
- Full notifications page with complete history

### 🔍 Global Search
- `⌘K` / `Ctrl+K` shortcut from anywhere
- Searches across: Tasks · Snippets · Wiki Pages · Members simultaneously
- Click result to navigate directly to that section
- Keyboard-dismissable with `Escape`

### 💎 Payments (Sandbox)
| Plan | Price | Limits |
|------|-------|--------|
| **Free** | 0/mo | 1 workspace · 3 projects · 5 members · No AI |
| **Pro** | 19/mo | Unlimited everything · Full AI · Version history · Priority support |

- Sandbox checkout (no real card required in demo mode)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Vanilla HTML5 · CSS3 · JavaScript (ES2022) |
| **Fonts** | Syne (headings) · DM Mono (code/mono) · Instrument Sans (body) |
| **Syntax Highlighting** | highlight.js 11.9 (atom-one-dark theme) |
| **AI Integration** | Anthropic Claude API (`claude-sonnet-4-20250514`) |
| **Drag & Drop** | Native HTML5 Drag and Drop API |
| **Rich Text Editor** | `contenteditable` + `document.execCommand` |
| **Fonts CDN** | Google Fonts |
| **Highlight CDN** | cdnjs.cloudflare.com |
| **Architecture** | Single-file SPA (zero bundler, zero dependencies to install) |

---

## 🗂️ Project Structure

```
devcollab/
├── devcollab.html          # Entire application — HTML + CSS + JS in one file
└── README.md               # This file
```

The entire application is intentionally a **single HTML file**. This means:
- Zero build step
- Zero npm install
- Works offline (except AI features which need the Anthropic API)
- Easy to share, fork, or embed

---





## 🎮 Usage Guide

### Navigation
- Use the **left sidebar** to switch between views
- Click project names in the sidebar to switch active project
- Use the **workspace selector** at the top of the sidebar

### Kanban Board
1. Navigate to **Kanban Board** in the sidebar
2. Drag tasks between columns to update status
3. Click any task card to open the detail modal
4. Use the view toggle (Board / List / Calendar) in the toolbar
5. Click **+ New Task** to create a task with full metadata

### AI Assistant
1. Navigate to **AI Assistant**
2. Use the quick-action buttons or type any question
3. For feature breakdown: type `"Build a [feature name]"` → AI generates subtasks → click **Create Tasks** to add to board

### Code Review
1. Navigate to **Code Review**
2. Select language from the dropdown
3. Paste your code (or click **Load Sample** to try it)
4. Click **▶ Run Review**
5. Review the quality score and per-issue breakdown

### Snippets
1. Navigate to **Code Snippets**
2. Search by name or filter by tag
3. Click **📋 Copy** on any card
4. Click **+ New Snippet** to save your own

### Wiki
1. Navigate to **Wiki / Docs**
2. Select a page from the left panel
3. Edit inline using the toolbar or directly in the content area
4. Click **Save** to persist (connects to backend when integrated)

---

## 🧪 Demo Credentials

The app ships with a pre-populated demo workspace:

| Field | Value |
|-------|-------|
| **Workspace** | NovaSpark Inc. (Pro Plan) |
| **Logged in as** | Ankush Kumar (Owner) |
| **Active Project** | Athena AI Platform |
| **Team size** | 5 members |
| **Tasks** | 10 tasks across all columns |
| **Snippets** | 6 code snippets |
| **Wiki pages** | 6 pages with real content |



## 📄 License

MIT License — free to use, modify, and distribute.

---

## 👨‍💻 Author

Built for **Adivya 2.0 — Developer Hackathon**

---

