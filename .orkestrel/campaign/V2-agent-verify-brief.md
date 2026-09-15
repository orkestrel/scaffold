# Verify V2 — authoritative gates for `@orkestrel/agent` at checkpoint `ac7ef43`

## Role and engine

`verifier` on Sonnet (native; Read, Grep, Glob, Bash). Run the named commands directly, spawn
nothing, fix nothing, edit nothing.

## Objective

Report exit-code truth for the package's full gate chain on the committed tree.

## Context

Checkout `C:/Users/mikes/WebstormProjects/agent`, HEAD `ac7ef43` (`feat: adopt the tool context,
and authorize, guard, then dispatch under the run signal`). Working tree expected clean before you
start. `node_modules/@orkestrel/tool` is the accepted tool tarball installed `--no-save`
(`ToolErrorContext` appears in its declaration). Windows 11, Git Bash; `npm run <script>` works.
No network is needed. You are the only executor in this checkout; another checkout's browser
suite may be running on the same host, so a timing-only failure is reported as such, verbatim,
not diagnosed.

## Commands, in this order

```bash
git -C /c/Users/mikes/WebstormProjects/agent status --porcelain
git -C /c/Users/mikes/WebstormProjects/agent rev-parse --short HEAD
grep -c ToolErrorContext /c/Users/mikes/WebstormProjects/agent/node_modules/@orkestrel/tool/dist/src/core/index.d.ts
cd /c/Users/mikes/WebstormProjects/agent && npm run format:check
cd /c/Users/mikes/WebstormProjects/agent && npm run lint:check
cd /c/Users/mikes/WebstormProjects/agent && npm run check
cd /c/Users/mikes/WebstormProjects/agent && npm run build
cd /c/Users/mikes/WebstormProjects/agent && npm test
git -C /c/Users/mikes/WebstormProjects/agent status --porcelain
```

Run each as its own Bash call. Do not stop at the first failure; run every command and report
each.

## Output

Final message, and nothing else:

- HEAD, the `ToolErrorContext` count, and the before/after `git status --porcelain` output
  (state "empty" when empty).
- One line per command: the command, its exit code, and for a Vitest run the `Test Files` and
  `Tests` summary lines per project, exactly as printed (strip color codes).
- For any non-zero exit: the exact failure excerpt (the failing test title or diagnostic, at
  most 40 lines).
- A one-line verdict: `GATES GREEN` when every exit is 0, else `GATES RED: <commands>`.
