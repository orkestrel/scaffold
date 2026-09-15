# Verify V1 — authoritative gates for `@orkestrel/tool` at checkpoint `8f2ad5d`

## Role and engine

`verifier` on Sonnet (native; Read, Grep, Glob, Bash). Run the named commands directly, spawn
nothing, fix nothing, edit nothing.

## Objective

Report exit-code truth for the package's full gate chain on the committed tree.

## Context

Checkout `C:/Users/mikes/WebstormProjects/tool`, HEAD `8f2ad5d` (`feat: give every tool a
context, a call envelope, a contract option, and a typed error`). Working tree expected clean
before you start. Windows 11, Git Bash; `npm run <script>` works. No network is needed. You are
the only executor in this checkout.

## Commands, in this order

```bash
git -C /c/Users/mikes/WebstormProjects/tool status --porcelain
git -C /c/Users/mikes/WebstormProjects/tool rev-parse --short HEAD
cd /c/Users/mikes/WebstormProjects/tool && npm run format:check
cd /c/Users/mikes/WebstormProjects/tool && npm run lint:check
cd /c/Users/mikes/WebstormProjects/tool && npm run check
cd /c/Users/mikes/WebstormProjects/tool && npm run build
cd /c/Users/mikes/WebstormProjects/tool && npm test
git -C /c/Users/mikes/WebstormProjects/tool status --porcelain
```

Run each as its own Bash call. Do not stop at the first failure; run every command and report
each.

## Output

Final message, and nothing else:

- HEAD and the before/after `git status --porcelain` output (state "empty" when empty).
- One line per command: the command, its exit code, and for a Vitest run the `Test Files` and
  `Tests` summary lines per project, exactly as printed (strip color codes).
- For any non-zero exit: the exact failure excerpt (the failing test title or diagnostic, at
  most 40 lines).
- A one-line verdict: `GATES GREEN` when every exit is 0, else `GATES RED: <commands>`.
