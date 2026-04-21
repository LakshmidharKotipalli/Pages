# AI Engineering Hub

A personal reference site for AI engineers — comprehensive deep dives and quick references on LLMs, agents, frameworks, and infrastructure.

**Live:** [LakshmidharKotipalli.github.io/Pages](https://LakshmidharKotipalli.github.io/Pages/)

---

## What's inside

11 resources across 6 categories, all accessible from the hub page with live search and category filtering.

| Category | Resources |
|----------|-----------|
| **Reference** | LLM Benchmark Guide |
| **AI Foundations** | Large Language Models |
| **Frameworks** | LangChain, LangGraph, Retrieval-Augmented Generation |
| **Agents & Vision** | AI Agents & MCP, Vision-Language Models |
| **Claude Code** | Claude Code Deep Dive, Claude Code Ecosystem |
| **Infrastructure** | Docker Ecosystem, Kubernetes |

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
├── index.html                    # Hub — search, filter chips, all 11 cards
├── llm-benchmark-guide.html      # Standalone benchmark reference
│
├── <topic>.html                  # 10 combined deep-dive pages
│
├── combine_topics.py             # Combines section files → single pages
└── patch_combined.py             # Adds interactive JS to combined pages
```

---

## Extending the site

### Add a standalone reference page

1. Create a self-contained HTML file at the repo root.
2. Add it to the `PAGES` array in `index.html`:
   ```js
   { title:"Title", href:"slug.html", icon:"📘",
     type:"ref", cat:"foundations", desc:"Description", ac:"#8B5CF6" }
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
