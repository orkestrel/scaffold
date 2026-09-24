# Unit FADE (the `cf` prefix), round 3 report

Round 3 deletes the clause "as on every inactive tab pane" from the `CASCADE_KEYS` TSDoc paragraph
in the `tests/setup.ts` module, and changes nothing else. The `cf-shared-3.patch` file replaces the
`cf-shared-2.patch` file whole, and the interdiff between those patch files is that one line. Every
gate the brief names exits 0. The worktree holds the owned files alone, and nothing was committed or
pushed.

The report file is `.orkestrel/veneer/units/cf-instruments/cf-report-3.md`. Every artifact this report names
is retained under the `.orkestrel/veneer/units/` directory (the report, the shared patch) or the `.orkestrel/veneer/units/cf-instruments/` directory (everything else).

## The paragraph

The paragraph sits in the `CASCADE_KEYS` TSDoc of the `tests/setup.ts` module, around line 580.

- Before: "The fade key's hidden state takes a frame: the reserved empty frame. Its rule writes the
  `opacity: 0` declaration and no other property, so the hidden card body keeps its box inside the
  card that holds it. The `Fade hidden` row therefore names that card through a `:has()` selector
  over the hidden body and reads the card's `height` property: a region declared on the transparent
  body paints the card's one fill, and the frame guard refuses a one-color region as a blank, while
  the card's region carries its header and its edges around the reserved box. What separates it
  from the transparent states this block declines is what its frame shows. The hidden fade state is
  a resting state the release's markup writes, as on every inactive tab pane, and its frame shows
  the box that state reserves inside a card that paints. The grow spinner's resting step, the
  resting tooltip, the toast carrying the `showing` class, and each backdrop carrying the `fade`
  class alone each paint nothing in a frame of their own, so a shot of any of them carries an empty
  surface and no subject. The fade proof reads the transparent body itself."
- After: the same paragraph with the clause removed, so the changed sentence reads "The hidden fade
  state is a resting state the release's markup writes, and its frame shows the box that state
  reserves inside a card that paints."

The explanation stays tied to the hidden card body through the paragraph's unchanged opening
sentences. The clause's line keeps its shorter length rather than being rewrapped, so no
neighbouring line changes. The `oxfmt` formatter leaves comment wrapping alone, and the
`npm run format:check` command exits 0 on the result.

## Interdiff

The `cf-3-interdiff.txt` file (SHA-256
c64c1d42522e029afebb40e78146d75f7e5d4388761d1e59e27dbe92380f41be) holds this interdiff of the
`cf-shared-3.patch` file against the `cf-shared-2.patch` file:

```diff
--- cf-shared-2.patch
+++ cf-shared-3.patch
@@ -426,7 +426,7 @@
 + * body paints the card's one fill, and the frame guard refuses a one-color region as a blank, while
 + * the card's region carries its header and its edges around the reserved box. What separates it
 + * from the transparent states this block declines is what its frame shows. The hidden fade state is
-+ * a resting state the release's markup writes, as on every inactive tab pane, and its frame shows
++ * a resting state the release's markup writes, and its frame shows
 + * the box that state reserves inside a card that paints. The grow spinner's resting step, the
 + * resting tooltip, the toast carrying the `showing` class, and each backdrop carrying the `fade`
 + * class alone each paint nothing in a frame of their own, so a shot of any of them carries an empty
```

The edit replaces one line with one line, so the hunk header of the `tests/setup.ts` module keeps
its line counts. The `git apply --numstat` command reads 27 added lines and 0 deleted lines for that
module, as for the `cf-shared-2.patch` file. The `git apply --check` command accepts the
`cf-shared-3.patch` file on the worktree. The `cf-shared-3.patch` file has SHA-256
07cd8e53bd829068394fc11d4e8b785ae6318eafcda354cd6d18134947a812e4.

## Gates

The `cf-3-gates.sh` script ran the gates on a scratch copy in the `tmp/probe/cf3-copy` directory.
That copy held:

- a `git archive 42fd88e` extract with the `cf-shared-3.patch` file and the unchanged
  `cf-offlimits.patch` file (SHA-256 7df554a4a78490be32cd0238a3fe77828cd24bf32e810ed77aaaae92e6403aa2)
  applied through the `patch -p1` command
- the owned files, copied in
- a hard-linked `node_modules` directory
- an empty `.git` directory, which makes the copy its own ignore root

The script's record is the `cf-3-gates.log.txt` file, and each full log is a `cf-3-gate-<n>.log.txt`
file.

| Command | Exit | Result line |
| --- | --- | --- |
| `npm run format:check` | 0 | `Finished in 12693ms on 419 files using 4 threads.` |
| `npm run lint:check` | 0 | none; the `oxlint` linter prints nothing on a clean run |
| `npm run check` | 0 | none; the `tsc` and `vue-tsc` checkers print nothing when clean |
| `npm run build:src` | 0 | `✓ built in 2.03s` |
| `npm run test:setup` | 0 | `Tests  287 passed (287)` |

The `npm run build:src` command is a precondition of the `npm run test:setup` command. The setup
project's readers open the `dist/src/styles/index.css` cascade and the `dist/src/core/index.js`
entry. A pass of the script without the build reported `Tests  7 failed | 256 passed (263)` for the
setup project. Each failure was an `ENOENT` error or the missing-cascade refusal on those built
files. That record is kept as the `cf-3-gates-nobuild.log.txt` file, with each full log in a
`cf-3-nobuild-gate-<n>.log.txt` file. The script with the build step is the one this table records.

## Observations

- The `tmp/probe/` directory is deleted.
- The owned files are unchanged from round 2, and the `cf-2.diff` file still records them.
- Round 3 found no round-3 work in the worktree when it resumed from the rate-limit stop. The
  `cf-guide-3.py` script, the `cf-gate-3.log.txt` file, and the `cf-format-3.log.txt` file belong to
  round 1.
