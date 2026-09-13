# Implementation brief — U-fix-5b (successor of U-fix-5, same unit, same writer)

## What changed and why

U-fix-5's item C named the nouns for file, constant, helper, field, and package tokens and left two
tokens in the edited ROADMAP rows unruled, which the unit reported correctly: `src:server`, a test
project identifier, and `scripts/ollama.sh`, a shell script. This successor names their nouns. The
U-fix-5 brief and every other item stand; the working tree already carries U-fix-5's edits and this
unit keeps them.

## Items

In `ROADMAP.md`, in the rows item C of `u-fix-5-brief.md` names:

- "`src:server`" with no following noun → "the `src:server` project" (keep the surrounding words;
  where the text reads "under `src:server`", write "under the `src:server` project").
- "`scripts/ollama.sh`" with no following noun → "the `scripts/ollama.sh` script".

Change nothing else.

## Owned files

`ROADMAP.md`.

## Execution and deviation contract

As `u-fix-5-brief.md`. Stop and report if either token is not found in those rows.

## Acceptance criteria

1. `npm run format:check` exits 0.
2. `npm run test:policy` exits 0.
3. `grep -c 'the `src:server` project' ROADMAP.md` reads 1 or more, and
   `grep -c 'the `scripts/ollama.sh` script' ROADMAP.md` reads 1 or more.
4. `git diff --stat` names only `README.md`, `ROADMAP.md`, `guides/scaffold.md`, and
   `src/core/constants.ts` (U-fix-5's files, unchanged by this unit except `ROADMAP.md`).

## Output

Each criterion with its exact reading; the two edited clauses verbatim; the deviation state.
