# U3 audit — checker report (native Sonnet, 2026-09-20, 284 s)

## A. Registry

`src/core/constants.ts:16-254`: every leaf equals `--vn-` plus its dash-joined key path (every
group walked: `factor`, `palette`, `color`, `text`, `surface`, `link`, `border`, `radius`,
`space`, `font`, `size`, `line`, `weight`, `shadow`, `motion`, `ease`, `focus`, `form`,
`breakpoint`, `stack`); every literal is `Object.freeze({ … } as const)` at every level; no
listener, timer, or DOM access in `constants.ts` or `types.ts`. `src/core/index.ts` is exactly the
two star-exports. `types.ts` declares `TokenLeaf`, `TokenMap`, `TokenName` as designed. **PASS**

## B. Aliases

Built `dist/src/styles/index.css`: the `:root` rule declares 127 distinct `--bs-*` names, equal to
the inventory's `root` keys token for token; the `[data-bs-theme=dark]` rule declares 64, which is
the inventory's 61 `dark` keys plus exactly `THEME_DARK_ADDITIONS`
(`tests/setupStyles.ts:467-471`: `--bs-focus-ring-color`, `--bs-primary`, `--bs-primary-rgb`).
**PASS**

## C. Physical properties and RTL identity

No hit in the built cascade for `margin-left|margin-right|padding-left|padding-right|border-left|border-right|left:|right:|text-align: left|text-align: right|float:|clear:`.
**PASS** on the sweep. `cmp` could not run (no shell tool); byte identity is the verifier's reading.

## D. Control residue

No `PLANT-`, `vn-ghost`, `h1 + p`, or `margin-left` under `src/` or `tests/src/`; the
`addEventListener` hits are the recorder in `tests/src/core/index.test.ts:31,41,44` and a browser
fixture outside U3's scope. **PASS**

## E. Guide parity

The four `Surface` rows' `Summary` cells equal their TSDoc paragraphs (`constants.ts:2-3`,
`types.ts:4`, `:12`, `:15`); the `## Tests` link to the core proof is present; every sentence of the
integrated `## Showcase` paragraph is true of the built cascade (tokens, 127 root aliases, the
`elements/_html.scss` and `_body.scss` baseline, no component selector); `guides/README.md`
carries the `src/styles` row and the paragraph naming `tokens.md`; `README.md:27` names the
Tokens guide; `guides/tokens.md` headings: Reference map, Bootstrap variables Veneer retains,
Customization, Departures from Bootstrap, Deferred names, Tests; the `css` fence under
Customization (`:178-183`) is the recipe `tests/src/styles/integration.test.ts` executes. **PASS**

## F. Names

0 hits for every new name over `node_modules/@orkestrel/scaffold/dist/host/guides/*.md`. **PASS**

## G. Scope and syntax

Every diff path is inside the brief's owned set or one of the three integrated patch sites; no
`package.json`, `tests/guides.test.ts`, vendored, `src/browser/**`, or `app/**` path. No `: any`,
`@ts-`, `eslint-disable`, `!.`, `!)`; every ` as ` on an added line is `as const` or prose. **PASS**

## H. Writing sweep

No banned-substitution hit; the only sense-dependent hit is the `new` operator inside a code
fence. Count phrases in `guides/tokens.md`: `:160` "Four root variables paint…", `:166` "five
image-valued variables…", `:217` "Two Elements behaviors are departures…". **FAIL** — rewrite the
three sentences without the leading numeral.
