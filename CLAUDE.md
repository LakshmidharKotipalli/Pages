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
├── index.html                        # Hub page — links all 11 resources, search + filter
├── llm-benchmark-guide.html          # Standalone LLM benchmark reference
│
├── <topic>.html                      # 10 combined deep-dive pages
│   langchain.html, langgraph.html, kubernetes.html, docker-ecosystem.html,
│   large-language-models.html, retrieval-augmented-generation.html,
│   ai-agents-mcp-ecosystem.html, vision-language-models.html,
│   claude-code-mastery.html, claude-code-ecosystem.html
│
├── combine_topics.py                 # Script: rebuild combined pages from source sections
└── patch_combined.py                 # Script: inject interactive JS into combined pages
```

> **Note:** The `required/` and `topics/` source directories were removed from the repo.  
> The 10 combined deep-dive pages at the root are the canonical published files.

---

## Maintenance scripts

### `combine_topics.py`
If source section files exist under `topics/<topic>/`, this script strips per-page nav/breadcrumbs, inlines CSS, and outputs a single scrollable page with a sticky sidebar TOC.

```bash
python3 combine_topics.py
```

Outputs to `Pages/<topic>.html`.  
Run this after re-adding section source files for any topic.

### `patch_combined.py`
Injects accordion, tab, copy-button, and scroll-reveal JS into all 10 combined pages.  
Run this after `combine_topics.py` (the combine script does not include this JS).

```bash
python3 patch_combined.py
```

### Typical workflow for updating a topic

```bash
# 1. Edit the combined <topic>.html directly (since source sections are removed)
# 2. Or re-add topics/<topic>/ section files and run:
python3 combine_topics.py
python3 patch_combined.py
# 3. Commit and push
git add <topic>.html && git commit -m "Update <topic>" && git push
```

---

## Adding a new page

### Adding a new standalone page

1. Create `<slug>.html` at the repo root — self-contained, all CSS inline.
2. Add a card entry to `index.html` inside the `PAGES` array in the `<script>` block:
   ```js
   { title:"My Guide", href:"my-guide.html", icon:"📘", type:"ref",
     cat:"foundations", desc:"One-line description", ac:"#8B5CF6" }
   ```

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
//      URL path    "dive"|"ref"   category key
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
