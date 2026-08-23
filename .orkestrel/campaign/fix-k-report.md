# FIX-K report

The unit's own report is recorded verbatim in the campaign dispatch pair. This file records the
Orchestrator's integration, including one correction made on the unit's own flagged weak claim.

## What the unit closed

All eight acceptance criteria. `guides/scaffold.md` (K1, K1b, K5), the emitted guard comment in
`src/core/templates.ts` (K2), `tests/src/core/compilers.test.ts:666` (K3), and the trimmed-comparison
nouns in `src/bin/CLI.ts` and `tests/src/bin/CLI.test.ts` (K4), with `host.json` regenerated.

It ruled every `bytes` hit by sense and named each one it left with the sense justifying it, which is
what the brief asked for and what a sweep by match would have got wrong.

## The unit's deviation, and why carrying on was right

`tests/src/core/compilers.test.ts:628-629` bans the literals `playwright` and `configs/browsers.js`
from the core-only emitted proof's **whole content**, not from its import statements. So K2 could not
name the specifiers the settled reason of record names; doing so reddens the gate. The unit measured
the failure, named the reason of record by role instead, and recorded the choice rather than
absorbing it.

That is correct handling: the brief's objective was to retire the wrong reason and state the settled
one, and either wording meets it. The unit's hypothesis — that the assertion's subject is imports and
the substring form is a cheap proxy that also catches prose — is recorded as a successor row rather
than acted on, because that file was granted for the K3 comment alone.

## The Orchestrator's correction, on the unit's own flagged weak claim

The unit flagged this claim of its own as weak: **"Those sets are Node's and Vite's own."** It had
verified the sets against the code and the code's comment, and said plainly that it had not
re-derived them from the published documentation, so the sentence rested on the code and its comment
agreeing.

That flag was right, and the provenance chain was worse than the unit could see: the sets came from
the FIX-L unit's citation, through the Orchestrator's brief, into vendored guide prose that ships to
every target. Nobody had measured them.

**Node's half is verified.** Instrument: `scratchpad/conditions/run.sh`, a package declaring one
branch per condition name, resolved from a real consumer.

```text
  cond-probe               require -> node-addons   import -> node-addons
  cond-probe/no-addons     require -> node          import -> node
  cond-probe/no-node       require -> module-sync   import -> module-sync
  cond-probe/browserish    require -> default       import -> import
```

`node-addons`, `node`, and `module-sync` all match under both `require` and `import`, so the Node
sets are right. The final row is the control that matters: `module`, `browser`, and `production`
match nothing in Node, which is what makes them bundler conditions rather than Node's.

**Vite's half was imprecise, and the guide is corrected.** Read from the installed package rather
than from documentation:

```text
=== vite 8.2.2 real exported defaults ===
  defaultClientConditions : ["module","browser","development|production"]
  defaultServerConditions : ["module","node","development|production"]
```

`import` is not in `defaultClientConditions`; Vite applies it separately as the format condition for
an ES module resolution, and the condition is spelled `development|production` rather than
`production`. The code is correct — `RUNTIME_CONDITIONS.browser` is
`['module', 'browser', 'production', 'import']`, which is what a production client build effectively
resolves. The guide sentence claiming the set was "Vite's own" was not checkable against anything a
reader could open.

The sentence now names `defaultClientConditions` and its real members, says a production build
resolves `development|production` as `production`, and attributes `import` to the ES module
resolution rather than to Vite's defaults. A reader can now check every part of it.

This edit is Orchestrator-written and is audited as one.

## Gates after the correction

```text
npm run build && npm run build:inventory   → staged 108 file(s) into host.json
npm run format:check = 0
npm run lint:check   = 0
npm run check        = 0
npm run test:guides  = 0
```

## Carried, not closed

- `src/bin/CLI.ts` writes "the filter above decides", which `.claude/rules/writing.md` refuses. The
  unit left it because it sits outside K4's sense in an owned file. It joins the recorded
  directional-reference sweep.
- The two guide rulings the unit added carry no executed assertion, and
  `.claude/rules/documentation.md` § Parity asks for one where a prose claim about behaviour sits
  under no fence. Adding a substring assertion needs `tests/src/core/compilers.test.ts`, granted to
  the unit for K3 alone. Successor row.
- The `playwright` literal ban's substring form. Successor row.
