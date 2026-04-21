# CLAUDE.md — AI Engineering Hub

## Project overview

Static site hosted on GitHub Pages at `https://LakshmidharKotipalli.github.io/Pages/`.  
A personal reference hub for AI engineers — deep-dive guides on LLMs, agents, frameworks, and infrastructure.

**Branch:** `master` → auto-deploys via GitHub Pages (root `/`)

---

## File structure

```
Pages/
├── index.html                        # Hub page — search, filter, all 11 resource cards
├── llm-benchmark-guide.html          # LLM benchmark reference
├── large-language-models.html        # LLM deep dive
├── langchain.html                    # LangChain deep dive
├── langgraph.html                    # LangGraph deep dive
├── retrieval-augmented-generation.html
├── ai-agents-mcp-ecosystem.html
├── vision-language-models.html
├── claude-code-mastery.html
├── claude-code-ecosystem.html
├── docker-ecosystem.html
├── kubernetes.html
├── combine_topics.py                 # Combines section files → single page
└── patch_combined.py                 # Injects interactive JS into combined pages
```

---

## index.html

Cards are defined in a `PAGES` array in the `<script>` block. Each entry:

```js
{ title, href, icon, type, cat, desc, ac }
// type: "dive" | "ref"
// cat:  "ref" | "foundations" | "frameworks" | "agents" | "claude" | "infra"
// ac:   accent hex color
```

Filtering and search run client-side — no rebuild needed to add or update a card.

---

## Adding a new deep-dive page

1. Create `topics/<slug>/` with section HTML files, `css/styles.css`, `js/components.js`.
2. Add topic metadata to `TOPIC_META` in `combine_topics.py`.
3. Run:
   ```bash
   python3 combine_topics.py
   python3 patch_combined.py
   ```
4. Add a `type:"dive"` entry to `PAGES` in `index.html`.

---

## Design conventions

- **Dark theme:** bg `#0d1117`, card `#111720`, borders `rgba(255,255,255,0.07–0.13)`
- **Fonts:** Syne · DM Sans · JetBrains Mono (Google Fonts)
- **All CSS inline** — no external stylesheets
- **No framework, no bundler** — vanilla HTML/CSS/JS only

---

## Deploy

```bash
git add <files>
git commit -m "message"
git push
```
