# Blast Radius

Technology leadership study app (executive layer). Plan of record: `claude/tech-leadership-app-plan.md` in the claude.ai Project "Interview, Cert Exam, and Career Prep Apps". Status and handoffs: `claude/blast-radius-status.md`. Shared rules: `claude/study-apps-index.md`.

## Rules
- Engines come from study-kit, pinned in `vendor/study-kit/VERSION` (v0.2.2, 2d9c534). Never edit `vendor/study-kit/` by hand: engine fixes go to study-kit, get a new tag, and are copied in.
- Routes use the dash form only (`#lane-cio`, `#stage-br-1-1`, `#run-brn-1`). Published links keep the dash form (study-kit accepts dots too since v0.2.1).
- Never rename or drop a published id. `build.js` refuses to build if an id in `published-ids.json` is missing. After a publish, run `node build.js --record`.
- Every content item carries `lane` and `levels` (director, vp, c-level). Lane names use full titles; no bare colliding acronyms (CDO, CRO, CPO, CCO).
- Role-plays: rules `guarded`, `noCoaching`, `noUnpromptedOffer` and scoring `outcomeAgreesWithScore`, `verifiedQuotes` are on (as in Inspect & Adapt V34).
- New content: helper drafts, blind check by a second model, all arithmetic in code and checked two ways, Draft label until Kristen reviews. Claim tags: Measured, Read, Relayed, Inferred, Untested.
- Master Story Bank is read-only.
- Work on a branch and open a pull request; never push to main or force-push.

## Content layout
- `math/numbers.js` computes every number; `math/numbers.py` recomputes them with decimals; `build.js` fails on any difference over half a cent. Text gets numbers only through `{{placeholders}}` (`{{$x}}` prints money).
- `craft-src/*.md` + `craft-stages.js`: Craft packets BR-n (filled into `build/craft/`; `{{table:...}}` renders tables from `data/*.json`). `sims-runs.js`: BRN-1, BRN-2. `sims-roleplay.js`: BRL-n. Shared modules in `content/` (`opmodel.js` om-n/OM-nn, `economics.js` ec-n/EC-nn), registered in `build.js` MODS. `content/prompts.js`: BP-nn, linked to Master Story Bank cards. `content/tmay.js`: CIO-family TMAY (beats and budgets only; bank text is never copied in). Every packet, run and role-play names its lane `section`.
- Lanes: `lanes.js` (active: CIO, AI leadership, Data leadership, CTO, CISO). A run can be listed in a second lane with `alsoIn` (BRN-2); shared modules appear in any lane whose sections name them, under the same lesson ids. Prompts carry `lane` (default 'cio'); routes `#prompts-<lane>`.
- AI leadership (Phase 2b): `content/strategy.js` (as-n/AS-nn), ec-6 in `content/economics.js`, BRN-3/BRN-4 in `sims-runs.js`, BR-8..BR-11 (data in `data/br8.json`, made by `tools/make-br8.py`, and `data/br11.json`), BRL-4..6, BP-11..22, links out in `content/links.js` (to other apps' published routes only).
- Role-play learner label is 'technology leader' for every role-play; each persona says who the learner is.
- `{{placeholders}}` print text values as they are (ids, lists) and numbers formatted; `{{$x}}` on text is an error.
- Draft labels come from each item's `status` ('Draft' or empty).
- `content/place.js` moves each keyed answer to a set position (POS arrays) and remaps index-keyed fields.
- CTO lane (Phase 3b): `content/techstrat.js` (ts-n/TS-nn), `content/delivery.js` (ed-n/ED-nn), BRN-6 in `sims-runs.js` (best debt share found by scan in both math modules), BR-13 (`data/br13.json` from `tools/make-br13.py`) and BR-14 (`data/br14.json` from `tools/make-br14.py`), BRL-9..11, BP-33..42, `content/tmay-cto.js` (hidden), links in `content/links.js`. BRN-2 is also listed in the CTO lane.
- Phase 4a (risk and incidents): shared module `content/risk.js` (rk-n/RK-nn, section `risk`) and BRN-7 (ransomware; cio, also cto), BRN-8 (shadow AI; ai-leadership), BRN-9 (model data leak; ai-leadership, also data-leadership), all in section `incident-sim`. Each stage states the time since detection in its phase and stem. Math blocks N.rk, N.inc, N.sh, N.ml (dates and business days computed in both modules). Phase 4b adds the CISO lane and `ciso` to these `alsoIn` lists. Export: `node tools/export-blind-4a.js <dir>`.
- CISO lane (Phase 4b): `content/secprog.js` (sp-n/SP-nn, section `security-program`), BR-15 (`data/br15.json` from `tools/make-br15.py`) and BR-16 (`data/br16.json` from `tools/make-br16.py`; best investment set found by checking every combination in both math modules), BRL-12..14, BP-43..52, `content/tmay-ciso.js` (hidden), links in `content/links.js`. BRN-7..9 are also listed in the CISO lane. Export: `node tools/export-blind-4b.js <dir>`.
- `fill()` refuses a non-money placeholder with more than two decimals (it would print rounded); restate the unit instead.
- Blind-check records: `docs/blind-check-*.md`. Export for Phase 2b: `node tools/export-blind-2b.js <dir>` (reads `build/bank.json`).

## Build and test
```sh
node build.js        # build/index.html
node test.js         # Playwright: 360/390/414 px in light and dark, lane picker, level filter, idle-write check
```
