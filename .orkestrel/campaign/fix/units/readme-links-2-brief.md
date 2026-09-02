# Unit readme-links-2 — the second README pass, over the checkouts the first pass excluded

Successor to `readme-links-brief.md`. What changed: the first pass ran while `ollama` and
`toolbox` held live units, so the Orchestrator excluded those checkouts; their units have landed
(`ollama` at `795782d`, `toolbox` at `e5b868a`), and this pass covers them. Every other section of
the original brief binds unchanged.

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

`/home/user/fleet/ollama/README.md` and `/home/user/fleet/toolbox/README.md` link
`guides/<package>.md` wherever they linked `guides/src/<package>.md`, committed per package by the
Orchestrator.

## Scope

**Owned.** `README.md` in `/home/user/fleet/ollama` and `/home/user/fleet/toolbox`, at the link
targets only. Derive the set from `grep -l 'guides/src/' /home/user/fleet/ollama/README.md
/home/user/fleet/toolbox/README.md`; a checkout the grep does not name is untouched.

**Off-limits.** Every other file in every checkout; every other checkout; `/home/user/scaffold`.

**Standing conditions.** Both checkouts are committed clean at launch; a dirty one is a deviation.

## Execution, Output, Deviation contract, Acceptance criteria

As in `readme-links-brief.md`, with the grep bounded to the two READMEs named here. The
`toolbox` README links `guides/src/toolbox.md`, `guides/src/tool.md`, and
`guides/src/workspace.md`; `guides/tool.md` and `guides/workspace.md` are vendored mirrors that
exist in the checkout, so the `ls` proof covers each target the README names.
