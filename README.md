# AI Engineering Hub

A personal reference site for AI engineers — comprehensive guides, deep dives, and quick references on LLMs, agents, frameworks, and infrastructure.

**Live:** [LakshmidharKotipalli.github.io/Pages](https://LakshmidharKotipalli.github.io/Pages/)

---

## What's inside

22 resources across 6 categories, all accessible from the hub page with live search and category filtering.

| Category | Resources |
|----------|-----------|
| **AI Foundations** | LLM Fundamentals, Large Language Models, AI Vision & OCR, Prompt Engineering |
| **Frameworks** | LangChain + LangGraph, LangChain, LangGraph, RAG Decoded, RAG Deep Dive |
| **Agents & Vision** | AI Agents & MCP, Vision-Language Models, LLM Productionization |
| **Claude Code** | Claude Code Mastery (guide + deep dive), Claude Code Ecosystem |
| **Infrastructure** | Docker, Kubernetes, Modern Backend Stack, GCP Explorer, System Design |
| **Reference** | LLM Benchmark Guide, Interview Prep Summary |

Each **Deep Dive** combines 12–18 structured sections into a single scrollable page with:
- Fixed sidebar navigation with scroll-spy
- Accordion expand/collapse for Q&A and detail sections
- Tabbed content panels
- Copy buttons on all code blocks
- Reading progress bar

---

## Project structure

```
Pages/
├── index.html                    # Hub — search, filter chips, all 22 cards
├── llm-benchmark-guide.html      # Standalone benchmark reference
│
├── <topic>.html                  # 10 combined deep-dive pages
│
├── required/                     # 10 standalone guide pages
│
├── topics/                       # Source sections for deep-dive pages
│   └── <topic>/                  # 16–18 HTML section files per topic
│
├── combine_topics.py             # Combines section files → single pages
└── patch_combined.py             # Adds interactive JS to combined pages
```

---

## Extending the site

### Add a standalone guide

1. Drop a self-contained HTML file in `required/`.
2. Add it to the `PAGES` array in `index.html`:
   ```js
   { title:"Title", href:"required/slug.html", icon:"📘",
     type:"guide", cat:"foundations", desc:"Description", ac:"#8B5CF6" }
   ```

### Add a topic deep-dive

1. Create `topics/<slug>/` with numbered section HTML files, `css/styles.css`, and `js/components.js`.
2. Add metadata to `TOPIC_META` in `combine_topics.py`.
3. Run the build scripts:
   ```bash
   python3 combine_topics.py
   python3 patch_combined.py
   ```
4. Add a `type:"dive"` card to `index.html`'s `PAGES` array.

### Deploy

```bash
git add .
git commit -m "Add <topic>"
git push
```

GitHub Pages auto-deploys from the `master` branch root within ~1 minute.

---

## Tech

Pure static HTML/CSS/JS — no framework, no bundler, no build pipeline.  
Fonts via Google Fonts (Syne · DM Sans · JetBrains Mono). All other CSS inline per file.
