# Unit G3 — Absorb Elements and Mailbox as Veneer's references

## Role and engine

`grok` on Cursor Grok 4.7 (`grok-4.7-high`), reached through the Cursor CLI in `--mode=ask`
(read-only). You are the bench engine reading this brief inside your own CLI: perform the assignment
directly and spawn nothing.

## Question

What mechanisms in `/home/user/elements` and `/home/user/mailbox` produce their interaction
behaviour, motion, token system, semantic-tag defaults, native-platform use, and framework boundary —
the things `/home/user/scaffold/.orkestrel/veneer/tenets.txt` tells Veneer to learn from — and what
do the two repositories record about their own problems?

## Scope

Read-only. Read the tenets file whole first. Then read each repository's `package.json`, `README*`,
any `ROADMAP*`, `AGENTS.md`, `CLAUDE.md`, `guides/**`, `docs/**`, and every source file under
`src/**` and `app/**` (`.ts`, `.vue`, `.scss`, `.css`, `.html`), plus `tests/**` far enough to state
what the tests prove about interaction and motion. Where a repository holds more than two hundred
source files, read every styles and engine file whole and sample the component files, naming the
sample.

Do not read `node_modules`, `dist`, lockfiles, or `.git`. Do not edit, create, or delete any file.
Run `git -C /home/user/elements status --porcelain` and `git -C /home/user/mailbox status --porcelain`
before reading and again before answering, and report the outputs verbatim.

## Output

Return evidence only: no decisions, no recommendations, no design proposals. Cite every fact as
`repo/path:line` (`elements/…` or `mailbox/…`). Quote at most two lines per citation. Keep the whole
answer under 500 lines. Use exactly these headings, and inside each give one block per repository:

### A. Repository shape
Stack, build tool, entry points, published surface, and whether `vue`, `@vue/reactivity`,
`bootstrap`, `@popperjs/*`, or `tailwindcss` is a runtime dependency, a peer dependency, or a
development dependency (`package.json:line`).

### B. Interaction engine
How interactive components are discovered and initialised (data attributes, classes, explicit
construction, delegation), their lifecycle, event model (custom events, emitter, callbacks), focus
management, keyboard handling, state classes and `aria-*` writes, and teardown. Name the central
files and the entities with `path:line`.

### C. Motion
Every transition and animation the styles declare (property, duration, easing, the selector it
applies to), the JavaScript that drives or waits on them (`transitionend`, Web Animations API,
`requestAnimationFrame`, View Transitions, `@starting-style`), and reduced-motion handling. Name
the components whose motion is distinctive (enter/exit, collapse, fade, slide, ripple, focus rings).

### D. Tokens
The custom-property scheme (prefixes, naming, where `:root` tokens are declared), theming
(`data-theme`, `color-scheme`, `prefers-color-scheme`, light and dark maps), how components consume
tokens (direct `var()`, `color-mix()`, Sass maps), and any documented token contract.

### E. Native platform use
Every use of Popover API, `<dialog>`, `<details>`, `inert`, anchor positioning, `:has()`,
`@container`, `@layer`, `scroll-snap`, `<input type=…>` native controls, `hashchange` routing,
`ResizeObserver`, `IntersectionObserver`, with `path:line`.

### F. Framework boundary
Where Vue or another framework is used versus plain DOM; whether an engine exists that runs without
Vue; how a Vue component wraps or reaches that engine; the reactivity primitives used
(`ref`, `reactive`, `@vue/reactivity`, custom).

### G. Semantic tag defaults versus class components
How each repository styles bare elements (`h1`, `p`, `a`, `button`, `table`, form controls) and
whether any selector styles a bare element by its position beside or inside another element
(descendant, child, sibling, or `:has` selectors over tags with no class), quoted with `path:line`.
How component appearance is selected (class names, data attributes, custom elements).

### H. Recorded lessons
Every comment, roadmap row, guide passage, or commit-message-like note that records a known problem,
regret, deferred fix, or design limit, with `path:line`.

### I. Unknowns
Facts the question needs that you could not establish from the files read, one line each.

### Journal
The `git status --porcelain` outputs, before and after, for each repository.
