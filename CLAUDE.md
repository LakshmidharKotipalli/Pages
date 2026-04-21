# CLAUDE.md — AI Engineering Hub

## Project overview

Static site hosted on GitHub Pages at `https://LakshmidharKotipalli.github.io/Pages/`.  
A reference hub for AI engineers — deep-dive guides on LLMs, agents, frameworks, and infrastructure.

**Live URL:** `https://LakshmidharKotipalli.github.io/Pages/`  
**Branch:** `master` → auto-deployed via GitHub Pages (root `/`)

---

## Repository layout

```
Pages/
├── index.html                        # Hub page — links all 22 resources, search + filter
├── llm-benchmark-guide.html          # Standalone LLM benchmark reference
│
├── <topic>.html                      # 10 combined deep-dive pages (generated)
│   langchain.html, langgraph.html, kubernetes.html, docker-ecosystem.html,
│   large-language-models.html, retrieval-augmented-generation.html,
│   ai-agents-mcp-ecosystem.html, vision-language-models.html,
│   claude-code-mastery.html, claude-code-ecosystem.html
│
├── required/                         # 10 standalone guide pages (hand-authored)
│   llm-fundamentals.html, prompt-engineering.html, rag-decoded.html,
│   langchain-langgraph-mastery.html, ai-complete-guide.html,
│   productionization.html, modern-backend-stack.html, gcp-explorer.html,
│   claude-code-mastery.html, system design.html
│
├── topics/                           # Source content for combined deep-dive pages
│   ├── <topic>/                      # One folder per deep-dive topic
│   │   ├── index.html                # Topic hub (section navigation)
│   │   ├── 01-foundation.html        # Section files (16–18 per topic)
│   │   ├── ...
│   │   ├── css/styles.css            # Shared CSS (Type A topics)
│   │   ├── js/components.js          # Shared JS — accordion, tabs, copy buttons
│   │   └── theme.css                 # Override CSS (Type B topics)
│   └── summary.html                  # Interview prep summary (standalone)
│
├── combine_topics.py                 # Script: combine topic sections → single pages
└── patch_combined.py                 # Script: inject interactive JS into combined pages
```

### Two topic folder types

| Type | Topics | CSS | JS |
|------|--------|-----|----|
| **A** (numbered sections) | langgraph, langchain, large-language-models, retrieval-augmented-generation, vision-language-models, claude-code-mastery, docker-ecosystem | `css/styles.css` | `js/components.js` |
| **B** (named sections) | ai-agents-mcp-ecosystem, kubernetes, claude-code-ecosystem | `../../css/styles.css` + `theme.css` | (same components.js pattern) |

---

## Maintenance scripts

### `combine_topics.py`
Reads all section HTML files in `topics/<topic>/`, strips per-page nav/breadcrumbs, inlines CSS, and outputs a single scrollable page with a sticky sidebar TOC.

```bash
python3 combine_topics.py
```

Outputs to `Pages/<topic>.html`. Also rewrites `index.html`.  
Run this after adding new sections to any topic folder.

### `patch_combined.py`
Injects accordion, tab, copy-button, and scroll-reveal JS into all 10 combined pages.  
Run this after `combine_topics.py` (the combine script does not include this JS).

```bash
python3 patch_combined.py
```

### Typical workflow for updating a topic

```bash
# 1. Edit section files in topics/<topic>/
# 2. Regenerate the combined page
python3 combine_topics.py
# 3. Re-inject interactive JS
python3 patch_combined.py
# 4. Commit and push
git add <topic>.html && git commit -m "Update <topic>" && git push
```

---

## Adding a new page

### Adding a new standalone guide (like `required/`)

1. Create `required/<slug>.html` — self-contained, all CSS inline.
2. Add a card entry to `index.html` inside the `PAGES` array in the `<script>` block:
   ```js
   { title:"My Guide", href:"required/my-guide.html", icon:"📘", type:"guide",
     cat:"foundations", desc:"One-line description", ac:"#8B5CF6" }
   ```
3. Update the chip count for that category (or let `chip-n` auto-update since it's computed from PAGES).

### Adding a new topic deep-dive

1. Create `topics/<topic-slug>/` with section HTML files + `css/styles.css` + `js/components.js`.
2. Add the topic metadata to `TOPIC_META` in `combine_topics.py`.
3. If sections are unnumbered, add ordering to `UNNUMBERED_ORDER` in `combine_topics.py`.
4. Run `python3 combine_topics.py && python3 patch_combined.py`.
5. Add a card in `index.html`'s `PAGES` array with `type:"dive"`.

---

## index.html — hub page

All page cards are defined in a single `PAGES` JavaScript array. Each entry:

```js
{ title, href, icon, type, cat, desc, ac }
//        ^            ^    ^
//      URL path    "guide"|"dive"|"ref"   category key
```

**Category keys:** `ref` · `foundations` · `frameworks` · `agents` · `claude` · `infra`

Cards are filtered client-side — no rebuild needed to update the hub. Just edit the array.

---

## Deployment

GitHub Pages is configured to serve from the `master` branch root (`/`).  
Every `git push` to `master` auto-deploys within ~1 minute.

```bash
git add <files>
git commit -m "message"
git push
```

No build step, no CI, no bundler — pure static HTML/CSS/JS.

---

## Design conventions

- **Dark theme throughout:** bg `#0d1117`, card `#111720`, border `rgba(255,255,255,0.07–0.13)`
- **Fonts:** Syne (headings) · DM Sans (body) · JetBrains Mono (labels/code) — loaded via Google Fonts
- **All CSS inline** in each HTML file — no external stylesheet dependencies
- **Accent colors** per topic — defined in `TOPIC_META` / `PAGES` array, applied via CSS `--ac` variable
- **No framework, no bundler** — vanilla HTML/CSS/JS only
