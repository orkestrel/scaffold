# U3 audit round 6 — numbered claims (both lanes and the checker)

Subject: the U3 working tree in `C:/Users/mikes/WebstormProjects/veneer` after brief 9
(`.orkestrel/veneer/units/u3-brief-9.md`, report `units/u3-report-7.md`), on top of the round-5
tree the verdict `u3-audit-verdict-5.md` ruled on. Native Opus 5 wrote the unit, so the `analyst`
on Astra holds the OBJECTIVE lane and the `reviewer` on Opus the SUBJECTIVE lane and is told its
engine wrote the work. This file alone fixes the claim numbers. The Orchestrator rendered the diff
over `b661142` including every untracked file at `units/u3-diff-6.patch.txt` and the status at
`tmp/audit/u3-status-6.txt`. Rule on every claim with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and
the deciding evidence (`file:line` or exact text); read the rendered diff and the live files,
never the reports alone; execute a reading in memory where a claim names one. Rounds 2 to 5
confirmed everything outside the sites brief 9 touched; re-read those sites only where an item
touched them. Law: scaffold's `AGENTS.md`, `.claude/rules/styles.md`, `tests.md`,
`architecture.md`, `names.md`, `typescript.md`, `writing.md`, `documentation.md`, `quality.md`,
read from `C:/Users/mikes/WebstormProjects/scaffold`.

1. **Identifiers and escapes.** `tests/setupStyles.ts` exports `readEscape(text, index)` (a
   `SelectorEscape`: the character an escape stands for and the span it occupies; one to six hex
   digits with an optional terminating whitespace decode to that code point; zero, a surrogate,
   and an out-of-range value decode to U+FFFD; any other escaped character decodes to itself; a
   trailing backslash to nothing) and `readIdentifier(steps, start)` (a `SelectorIdentifier`:
   decoded text and the end index, over letters, digits, `-`, `_`, non-ASCII, and escapes,
   stopping at a quoted or syntax step); `walkSelector` measures an escape's literal run through
   `readEscape`. Executed in memory: `matchesLooseTagPair` reads `details-card summary` true,
   `detai\ls summary` false, `det\ails summary` true, `details summary` false, `h1\64 p` false,
   `h1\64x p` true; `extractCompoundTags('detai\ls')` is `['details']`, `('det\ails')` is `['det',
   line feed, 'ils']` as one string, `('h1\64 p')` is `['h1dp']`, `('h1\+p')` is `['h1+p']`; every
   reading reports 4 to 6 record still holds; the new readings are cases.
2. **The functional name.** `extractCompoundTags` reads its leading tag and its functional
   pseudo-class name through `readIdentifier` over the walk, compares the name lowercased against
   `is` and `where`, and takes the group only when the step at the name's end is a `(` at the
   compound's own depth: `:IS(h1)+p` reads true, `:is(h1)+p` true; no reader in
   `tests/setupStyles.ts` reads selector text except through `walkSelector` and `readIdentifier`
   (the whole-scope `BOOTSTRAP_SCOPE_PATTERNS` test in `extractBootstrapVariables` matches a scope
   selector as a whole and reads no compound); the TSDoc of `walkSelector` and
   `extractCompoundTags` say so.
3. **The guard's test.** `src/styles/_tokens.scss` declares `$assets` with `!default` and changes
   nothing else; a Node case in `tests/setupStyles.test.ts` compiles the shipped partials through
   `sass`'s `compileString` from `src/styles`, configuring `$assets` with a key `$dark` lacks, and
   asserts the error names the key, with a control that configures a key `$dark` declares and
   reads the emitted declaration; the case reddens when the `@error` block is removed from
   `_theme.scss` (report 7's plant) and `_theme.scss` is byte-identical to its report-6 state.
4. **The legend sentence.** The `Source` legend table in `guides/veneer.md` follows a sentence
   naming that the table lists every `Source` value and what each names; inside § Tokens every
   table follows a sentence.
5. **The departures cells.** The Token column of the departures table holds bare keys; the
   `--bs-body-font-size` and `--bs-font-sans-serif` aliases sit in a sentence after the table.
6. **The either/or.** No line of the guide names a disclosure or drawer unit; the sentence reads
   "the first unit that animates a keyword length".
7. **Law over the diff.** No `any`, non-null assertion, type assertion beyond `as const`, `@ts-`
   directive, `eslint-disable`, default export outside a config file, nested function, or hidden
   or mutable module-scope declaration; readonly public shapes; the added prose sweeps clean under
   `writing.md`; every file U3 owns sits where the placement rows put it; the cascade's SHA-256
   is `8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1` (the round-5 reading).
8. **Scope honesty.** `tmp/audit/u3-status-6.txt` lists exactly the files briefs 4 to 9 own or
   grant, the two integrated patch sites (`configs/src/vite.styles.config.ts`,
   `tests/distribution.test.ts`), and nothing else.
9. **Gates (ruled by the Orchestrator from the retained verifier report).** The whole chain exits
   0 on managed Chromium; `test:src:styles`, `test:src`, and `test:setup:browser` exit 0 on Edge;
   `test:distribution` green; `scaffold audit` reports no drift beyond the pending
   `@orkestrel/scaffold` re-pin.
