The brief requires a read-only reconciliation and a fleet-wide consumer sweep. I’m loading its governing reconciliation and evidence rules before extracting the rulings.## Question
Reconcile each `CONFIRMED` refuter ruling against the fixed rules and sweep breaking identifiers through the specified fleet and scaffold paths.

## Evidence

**browser-obj-1** — breaking: `true`
1. Fold candidate: `browser-obj-1`; “this is the same defect as browser-obj-1 at the same file:line. Give the deletion exactly one carrier.”
2. Off-limits repair: `none`.
3. Consumer-only repair: `none`.
4. Breaking sweep: removes `attributeOfBrowserNode`; no source consumer.

**browser-obj-2** — breaking: `false`
1. Fold candidate: `none`.
2. Off-limits repair: `none`.
3. Consumer-only repair: `none`.
4. Breaking sweep: `not applicable`.

**browser-obj-3** — breaking: `false`
1. Fold candidate: `none`.
2. Off-limits repair: `none`.
3. Consumer-only repair: `none`.
4. Breaking sweep: `not applicable`.

**browser-obj-4** — breaking: `false`
1. Fold candidate: `none`.
2. Off-limits repair: `none`.
3. Consumer-only repair: `none`.
4. Breaking sweep: `not applicable`.

**browser-obj-5** — breaking: `false`
1. Fold candidate: `none`.
2. Off-limits repair: `none`.
3. Consumer-only repair: `none`.
4. Breaking sweep: `not applicable`.

**browser-obj-6** — breaking: `false`
1. Fold candidate: `none`.
2. Off-limits repair: `none`.
3. Consumer-only repair: `none`.
4. Breaking sweep: `not applicable`.

**browser-obj-7** — breaking: `false`
1. Fold candidate: `none`.
2. Off-limits repair: `none`.
3. Consumer-only repair: `none`.
4. Breaking sweep: `not applicable`.

**browser-obj-8** — breaking: `false`
1. Fold candidate: `none`.
2. Off-limits repair: `none`.
3. Consumer-only repair: `none`.
4. Breaking sweep: `not applicable`.

**browser-obj-9** — breaking: `false`
1. Fold candidate: `none`.
2. Off-limits repair: `none`.
3. Consumer-only repair: `none`.
4. Breaking sweep: `not applicable`.

**browser-subj-1** — breaking: `false`
1. Fold candidate: `browser-subj-12`; “line 683's `parseBrowserChord` call is renamed by browser-subj-12 — give both rows to one writer in one pass over this file.”
2. Off-limits repair: `none`.
3. Consumer-only repair: `none`.
4. Breaking sweep: `not applicable`.

**browser-subj-2** — breaking: `false`
1. Fold candidate: `none`.
2. Off-limits repair: `none`.
3. Consumer-only repair: `none`.
4. Breaking sweep: `not applicable`.

**browser-subj-3** — breaking: `false`
1. Fold candidate: `none`.
2. Off-limits repair: `none`.
3. Consumer-only repair: `none`.
4. Breaking sweep: `not applicable`.

**browser-subj-4** — breaking: `false`
1. Fold candidate: `browser-subj-5`; “browser-subj-5 also rewrites Contract clause 10. Route both rows to one writer in one pass.”
2. Off-limits repair: `none`.
3. Consumer-only repair: `none`.
4. Breaking sweep: `not applicable`.

**browser-subj-5** — breaking: `false`
1. Fold candidate: `browser-subj-5`; “browser-subj-4 also edits clause 10 — carry the two rows in one brief.”
2. Off-limits repair: `none`.
3. Consumer-only repair: `none`.
4. Breaking sweep: `not applicable`.

**browser-subj-6** — breaking: `false`
1. Fold candidate: `none`.
2. Off-limits repair: `none`.
3. Consumer-only repair: `none`.
4. Breaking sweep: `not applicable`.

**browser-subj-7** — breaking: `false`
1. Fold candidate: `none`.
2. Off-limits repair: `none`.
3. Consumer-only repair: `none`.
4. Breaking sweep: `not applicable`.

**browser-subj-8** — breaking: `false`
1. Fold candidate: `none`.
2. Off-limits repair: `none`.
3. Consumer-only repair: `none`.
4. Breaking sweep: `not applicable`.

**browser-subj-9** — breaking: `false`
1. Fold candidate: `none`.
2. Off-limits repair: `none`.
3. Consumer-only repair: `none`.
4. Breaking sweep: `not applicable`.

**browser-subj-10** — breaking: `false`
1. Fold candidate: `none`.
2. Off-limits repair: `none`.
3. Consumer-only repair: `none`.
4. Breaking sweep: `not applicable`.

**browser-subj-11** — breaking: `true`
1. Fold candidate: `browser-obj-1`; “record this row as naming ground behind that single carrier rather than as a second edit.”
2. Off-limits repair: `none`.
3. Consumer-only repair: `none`.
4. Breaking sweep: removes `attributeOfBrowserNode`; no source consumer.

**browser-subj-12** — breaking: `true`
1. Fold candidate: `browser-subj-12`; “line 683's `parseBrowserChord` call is renamed by browser-subj-12 — give both rows to one writer in one pass over this file.”
2. Off-limits repair: `none`.
3. Consumer-only repair: `none`.
4. Breaking sweep: renames `parseBrowserChord` to `extractBrowserChord`; no source consumer.

**browser-subj-14** — breaking: `true`
1. Fold candidate: `browser-subj-16`; “browser-subj-16 renames `defaultStoreBases` in the same file, the same guide rows, and the same test file. Carry both renames in one brief.”
2. Off-limits repair: `none`.
3. Consumer-only repair: `none`.
4. Breaking sweep: renames `findInStore` to `findStorePaths`; no source consumer.

**browser-subj-15** — breaking: `false`
1. Fold candidate: `none`.
2. Off-limits repair: `none`.
3. Consumer-only repair: `none`.
4. Breaking sweep: `not applicable`.

**browser-subj-16** — breaking: `true`
1. Fold candidate: `browser-subj-16`; “pair this with browser-subj-14 — same file, same guide rows, same test file.”
2. Off-limits repair: `none`.
3. Consumer-only repair: `none`.
4. Breaking sweep: renames `defaultInstallPaths` to `buildInstallPaths`, `windowsRoots` to `buildWindowsRoots`, and `defaultStoreBases` to `buildStoreBases`; no source consumer.

**browser-subj-17** — breaking: `false`
1. Fold candidate: `none`.
2. Off-limits repair: `none`.
3. Consumer-only repair: `none`.
4. Breaking sweep: `not applicable`.

**browser-subj-18** — breaking: `false`
1. Fold candidate: `none`.
2. Off-limits repair: `none`.
3. Consumer-only repair: `none`.
4. Breaking sweep: `not applicable`.

## Distillate
- `CONFIRMED` ids: `browser-obj-1`, `browser-obj-2`, `browser-obj-3`, `browser-obj-4`, `browser-obj-5`, `browser-obj-6`, `browser-obj-7`, `browser-obj-8`, `browser-obj-9`, `browser-subj-1`, `browser-subj-2`, `browser-subj-3`, `browser-subj-4`, `browser-subj-5`, `browser-subj-6`, `browser-subj-7`, `browser-subj-8`, `browser-subj-9`, `browser-subj-10`, `browser-subj-11`, `browser-subj-12`, `browser-subj-14`, `browser-subj-15`, `browser-subj-16`, `browser-subj-17`, `browser-subj-18`.
- Rule 1 flagged: `browser-obj-1`, `browser-subj-1`, `browser-subj-4`, `browser-subj-5`, `browser-subj-11`, `browser-subj-12`, `browser-subj-14`, `browser-subj-16`.
- Rule 2 flagged: `none`.
- Rule 3 flagged: `none`.
- Breaking rulings: `browser-obj-1`, `browser-subj-11`, `browser-subj-12`, `browser-subj-14`, `browser-subj-16`.
- Source-consumer checkouts: `none`.
- Sites the sweep could not read: `none`.

## Unknowns
`none`.

## Journal
Leave for the driver.

## Deviation
`none`.