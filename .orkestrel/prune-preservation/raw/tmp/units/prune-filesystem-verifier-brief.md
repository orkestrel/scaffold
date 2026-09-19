# Unit prune-filesystem — Verify deletion boundaries

## Role and engine

verifier on native Terra, read-only.

## Objective

Identify the exact preservation and worktree conditions for deleting repository-local .orkestrel and tmp roots in Scaffold and Roughnotes.

## Context

**Evidence.** User requests a quick debrief/prune and hopes to fully delete these folders. Scaffold mainbe140671; Roughnotes main57b738f. Registered worktrees under Scaffold tmp: audit/setup-vue-control, audit/setup-vue-objective, audit/setup-vue-subjective atdc98373d; release/scaffold-0.0.75 at2574f559; recovery/roughnotes at57b738f (registered in Roughnotes). Root worktree-list readings supplied these exact paths. Source and gate acceptance is closed.

**Law.** Read AGENTS.md, .agents/orchestration.md, portability/writing/documentation/quality rules; orkestrel-debrief/SKILL.md and references/retention.md; guides/README.md. No edits or cleanup by verifier. Preserve user types, staged files, and unrelated work. No package additions, source changes, behavioral fakes, or source-gate reruns.

**Installed primitives.** Native Git status/diff/worktree and filesystem metadata only. No source capability implementation.

**Host.** PowerShell5.1 on Windows. Canonical Scaffold and neighboring Roughnotes. Read-only commands. Do not read file contents from .env, .npmrc, auth.json, keys, or tokens.

**Measurements.** Canonical protected SHA256: .codex/config.toml C8364A20FCA401E65F3C092968B1F6B4D4E025A1EFD91E22BEB01B3FCD39E076; .codex/hooks.json BDFD4F9741FC8EE65690F09B79C5100FFFF72F1F8C3D2693FAD89A85307734F3; host.json 3AC660B1D7077D93276226082BA5EF3124F266DA934D71814C791C06B4342AB0. Modified .orkestrel/campaign/rebaseline-2.md hash023E7615CA0651C9EE0F1A9734F963037B86BD2F2F72BFAB56DA9614D3CFF1C8 must be preserved before deletion. Original Roughnotes Codex index agent59069a1f5926a5a691982125cc4e0ec72f7e69fc, hooks7c6257de2940b4bf16d64f7ff20834152c899404.

**Control identifiers.** Root containment requires resolved literal .orkestrel/tmp paths beneath exact repository roots. Flag reparse points and registered worktree descendants; do not traverse a link target or assume it is disposable. The existing user files outside deletion roots provide the preservation boundary.

**Standing conditions.** Canonical .orkestrel contains untracked historical artifacts plus the modified rebaseline note. Never call them backed up merely because main is pushed. Roughnotes .orkestrel may be tracked. External scratch backup C:/Users/mikes/AppData/Local/Temp/roughnotes-integration-20260918/backup is excluded from deletion. The pending field proof can survive as forward work in ROADMAP.md; you do not decide scope or audit its content.

## Unknowns

Report any uncommitted product source in nested worktrees, unique commits not reachable from accepted main, untracked non-generated files without an evident campaign owner, nested external links, other Git worktrees, or live process using a target. Name exact evidence and do not fix.

## Scope

**Owned.** Read-only filesystem/Git verification of C:/Users/mikes/WebstormProjects/scaffold/{.orkestrel,tmp} and C:/Users/mikes/WebstormProjects/roughnotes/{.orkestrel,tmp}, plus registered worktree metadata and protected files.

**Shared (report-only).** All files. Grok separately maps campaign carry/promotions; do not duplicate its absorption.

**Off-limits.** Deletion, staging, commit, push, install, process termination, code/content audit, unrelated home/system temp directories, and delegation.

**What asserts the state this change ends.** No deletion has happened. This report decides whether a concrete deletion plan needs exclusions or preservation before root acts.

**Tools and limits.** Native read-only tools. Inspect process executable/PID/cwd evidence if available; never match a shell's own full command text. Report inability to establish liveness rather than claim no process exists.

## Execution

Perform directly and spawn nothing. Check exact root paths and reparse status; registered worktrees' HEAD ancestry and git status including untracked product files; tracked/untracked membership under .orkestrel; protected index/blob/working hashes. Classify generated dependency/cache/capture directories by path without reading their content. Return the minimal preservation set and exact safe worktree removal order. Do not enumerate thousands of dependency filenames into the response. Root creates the complete filename inventory externally.

## Output

Return a concise table of root, tracked status, worktree/dependency/link facts, unique data to preserve, and any blocker. Include actual native exit truth and exact original Codex/protected byte readings.

## Deviation contract

Follow orchestration protocol; report unknowns or risky targets, never improvise cleanup. Routine read-only Git/metadata command choice is yours.

## Acceptance criteria

- Every named target has a resolved boundary and worktree classification.
- Any uncommitted product work or unique commit is named before deletion.
- Protected user bytes/index are captured accurately.
- Reparse/link and live-process uncertainties are explicit.

**Observations, not criteria.** Root preserves records, rules on disposition, removes worktrees and directories, and commits/pushes deletion.

## Review evidence

Return literal paths, Git HEAD/status/ancestry readings, and hashes. Report no product completion claims.
