# Report — `d7n-template-close`

## Item 1 — the `Shape` idiom (Rulings 15, 18, 20)

Read every interface row the brief lists against `src/core/types.ts`. Every row lacking `plus`
declares data members only (no call-signature member), so those rows needed no change. The one row
needing work is the extended interface `TemplateFillContext extends TemplateFillOptions` (Ruling
21), and the Types table's convention sentence needed the extension clause added.

```diff
-A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`.
+A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`. An extended interface's name comes before `plus`, with the members it adds after.
```

```diff
-| `TemplateFillContext`      | interface | `{ missing?, locale?, placeholders? }`                                                                                      | Carries the full option bag `fillTemplate` takes — the per-call `TemplateFillOptions` plus the declared placeholders tokens resolve against.                                             |
+| `TemplateFillContext`      | interface | `TemplateFillOptions plus { placeholders? }`                                                                                | Carries the full option bag `fillTemplate` takes — the per-call `TemplateFillOptions` plus the declared placeholders tokens resolve against.                                             |
```

The Constants table already carries the constants sentence alone (Ruling 20) and every constant's
cell holds its declared type (`DEFAULT_LOCALE`'s inferred `const` type is the literal `"en-US"`
itself — `tsc --declaration` on an isolated file confirms the emitted `.d.ts` reads
`export declare const DEFAULT_LOCALE = "en-US"`, so the cell already carries the declared type with
no annotation to widen it, and the scope forbids adding one). No guide sentence duplicated a cell's
members, so nothing to delete there.

## Item 2 — member references

`npm run docs` on the installed head start reads `rows read: 1, disagreements found: 0`; every
`{@link Owner#member}` / `{@link #member}` cell (`MissingPolicy`, `TemplateFillValues`) already
reads `TemplateInterface#fill` / `#validate`, matching the doc blocks. No cell needed a re-read.

## Item 3 — the drop-in's canon (Rulings 13, 20)

`diff` of the drop-in region (`const root = …` through the manifest loop's closing brace) against
the pilot printed nothing — the region already matches byte for byte. The header (lines 1-3) and
the `INTERNAL` doc block did not match the pilot's canon, so both were corrected:

```diff
 // The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
-// this repo's own `guides/README.md` manifest. The constants below are this
-// package's own, and are the only part a sibling package changes. Every flagship fence
-// in `guides/template.md` is transcribed at the end of this file and asserted against what
-// its comments claim: name resolution is not a behavioural proof, so a fence documenting a
-// value the code contradicts is exactly what the transcriptions catch. Change a fence,
-// change its transcription.
+// this repo's own `guides/README.md` manifest. The constants that follow are this
+// package's own, as is the executed section that closes the file.
```

```diff
- * intentional rather than forgotten — and the second assertion below fails when a name
+ * intentional rather than forgotten — and the assertion that follows it fails when a name
```

## Item 4 — fence lead-ins (Ruling 21)

The `#### Create a template and a registry` fence sat directly under its heading with no lead-in
sentence.

```diff
 #### Create a template and a registry
 
+Builds a template and fills it directly, then seeds a registry with several templates and queries them by category and id.
+
 ```ts
 import { createTemplate, createTemplateManager } from '@orkestrel/template'
```

## Item 5 — propagation

Ran after every edit landed; both write directions and `oxfmt` report zero pending work.

## Acceptance criteria

1. `git status --short` in `/home/user/fleet/template`:
   ```
    M guides/template.md
    M tests/guides.test.ts
   ```
   Owned files only.
2. `grep -n '| interface *| `{[^`]*:' guides/template.md` and `grep -n '…' guides/template.md`: both print nothing.
3. `diff` of the drop-in region against the pilot: empty (item 3 above); line 2 of `tests/guides.test.ts` now equals the pilot's line 2.
4. `npx oxfmt --check guides/template.md tests/guides.test.ts`:
   ```
   Checking formatting...
   All matched files use the correct format.
   Finished in 1065ms on 2 files using 4 threads.
   ```
   exit 0.
   `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts`: exit 0, no output.
5. `npm run docs`:
   ```
   rows read: 1, disagreements found: 0
   ```
   `npm run docs -- --to guide`:
   ```
   rows read: 1, disagreements found: 0, written: 0, reported: 0
   ```
   `npm run docs -- --to source`:
   ```
   rows read: 1, disagreements found: 0, written: 0, reported: 0
   ```
6. `npm run test:guides`:
   ```
   Test Files  1 passed (1)
        Tests  34 passed (34)
     Duration  551ms
   ```
   exit 0 (equality case included, default budget).
   `npm run test:policy`:
   ```
   Test Files  1 passed (1)
        Tests  90 passed | 1 skipped (91)
     Duration  548ms
   ```
   exit 0.

Wall clock for the unit's own command sequence (docs run through both suites): under a minute of
combined command time; the two test runs alone report `551ms` and `548ms`.

## Deviations

None. No `Shape` cell fell outside Ruling 12's idiom, the equality case stayed green under the
default budget, no gate outside the owned files went red, and `npm run docs` reported zero
disagreements throughout.
