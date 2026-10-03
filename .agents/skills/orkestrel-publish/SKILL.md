---
name: orkestrel-publish
description: Run an Orkestrel release from layer order to registry confirmation. Use when the user asks to publish a package, to run a fleet-wide release wave, or to recover a release that stalled at the npm approval, and follow it for the per-repository visit, the bump ruling, the layer preparation, the login approval, and the five-minute upload window.
---

# Publish an Orkestrel release

## Read

`AGENTS.md` § Authority and loading names the files every unit reads. This skill adds, in this order:

1. `references/release.md`, the `orkestrel-dispatch` skill and the launch reference it names, and `.agents/orchestration.md` § Routing,
   § Parallelism, and § Dispatch. Each named section binds every step
   here.
2. The reference the moment needs: [wave.md](references/wave.md) before visiting a repository,
   ruling on a bump, or preparing a layer; [window.md](references/window.md) before running
   `npm login` or any upload.
3. The live evidence: the registry's packument for every package in the round, each target's
   manifest, and the catalog table the contract names as the layer order.

## Scripts

| Script               | Does                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `scripts/compare.ts` | `[--package NAME] [--version V] [--tarball PATH] [--dist dist] [--json]`, run from the package root after its build: fetches the published tarball and lists the material differences from the rebuilt `dist/` (sourcemaps excluded, whitespace-only differences ignored). Exit 0 when nothing differs, 3 when something does, 2 when the tarball cannot be read, 64 on usage (no package name, no `dist/`, or `--tarball` with no path).                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `scripts/pins.ts`    | `--version PRIOR [--range PRIOR_RANGE ...] [--paths src,tests] [--json]`, run from the package root: lists every line under the paths carrying the prior version literal or a prior range literal, once per line, sweeping a one-comparator range such as `^8.3.0` for its bare version in any form. Exit 0 with no hits, 3 with hits, 64 on usage (no literal, or a flag with no value).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `scripts/wave.ts`    | `--visit [--target DIR] [--offline] [--from STEP] [--to STEP] [--prior VERSION] [--dry-run] [--json] [--out FILE]` runs one repository's visit in the order [wave.md](references/wave.md) § Visit a repository fixes (pin, commit, overwrite, verify, install, pins, format, gates, compare), stops at the first failing step, and prints each step's exit (a failed step names the `code: message` refusal or the `note` a JSON verb writes on stdout, else the last stderr lines), the bump ruling (the rebuilt dist against the published tarball, and the final runtime dependency set against the published manifest), and a row for `.orkestrel/release.md`; `--prior` names the version a pre-ruled bump replaced so the self-pin sweep finds it; `--plan` prints the packages by layer from the catalog table. Exit 0 when every step passed, 1 when one failed, 2 when a reading failed, 64 on usage. |
| `scripts/window.ts`  | `--whoami [--wait SECONDS]` reads or polls `npm whoami`; `--login` prints the operator's login command and polls `whoami` until it answers; `--publish DIR... --otp CODE` refuses a batch containing a linked worktree with exit 3 and names its primary clone before contacting npm, then uploads back to back with `npm publish --ignore-scripts --otp`, journals each upload under `tmp/units/`, stops at the first refusal naming where to resume, and confirms each accepted version against the registry; `--confirm NAME@VERSION...` re-reads the registry until it serves the version. Exit 0 on success, 3 when not.                                                                                                                                                                                                                                                                                  |

The user's current instruction wins. `references/release.md` owns the credential
and authorization law; nothing here weakens it.

## The boundary with the contract

`references/release.md` binds every release, and this skill does not
repeat it. Read that section for the credential and approval law, the long-running-command
binding, the serialization of uploads, the tarball swap that serves a consumer whose dependency
has not published, what a bump obliges downstream, and where the layer order comes from.

This skill carries what an operator needs while a release is running: the per-repository visit,
the bump ruling, the preparation order, the login and approval mechanics, and the window.

Where the skill and the contract disagree, the contract wins. Report the drift instead of
following the skill.

## Run the release

1. **Name the round.** List the packages the release covers, and group them into layers with
   `node .agents/skills/orkestrel-publish/scripts/wave.ts --plan`, which reads the contract's
   layer order from the catalog table.
2. **Take the registry evidence.** Read what the registry serves for every package in the round.
   Derive each pin from that reading, never from a local manifest.
3. **Visit each repository.** Run `node .agents/skills/orkestrel-publish/scripts/wave.ts --visit --target <repository>`,
   which runs the visit in [wave.md](references/wave.md) in its stated order and stops at the first
   failing step; repair that step by hand and re-run from it with `--from`. Run visits in parallel
   slices of disjoint repositories, each slice serial inside itself.
4. **Rule on each package's bump.** Take the visit's comparison and range reading; repeat `compare.ts` only after the artifact changes or an unanswered result. Apply the triggers in [wave.md](references/wave.md) § Rule on
   the bump; `references/release.md` § What a bump obliges owns the blast radius.
5. **Prepare the whole layer before authenticating**, in the order [wave.md](references/wave.md)
   § Prepare a layer fixes. Every one of those steps happens outside the window.
6. **Reach the approval.** Follow [window.md](references/window.md): run
   `node .agents/skills/orkestrel-publish/scripts/window.ts --login` only after the user signals
   they are at the keyboard, and read its `whoami` answer as the session.
7. **Authorize and upload.** Follow [window.md](references/window.md). Take the account's one-time
   code where it has one and run
   `node .agents/skills/orkestrel-publish/scripts/window.ts --publish <layer directories> --otp <code>`; § Authorize the upload there fixes that code's life and the layer it
   carries. Where the account answers with no code, follow § Spend the window there.
8. **Close the layer from the registry, then prepare the next**, per [wave.md](references/wave.md)
   § Prepare a layer.

Run that sequence for every layer, from the registry reading to the registry close. Refresh the
registry evidence between layers rather than carrying the previous round's reading forward.

## Accept the release

Completion requires:

- every package the round named has ended published at a registry-confirmed version, published on
  a later round with the reason recorded, or ruled as no bump with the evidence that ruled it;
- every obligation `references/release.md` § What a bump obliges places on a published package's dependents has closed as
  that section requires;
- every tarball swap is restored per `references/release.md` § Fix a dependency before it publishes, and no target
  repository is left holding an uncommitted bump or an unpushed commit;
- every gate that proved a package ran outside the window and against the artifact that shipped;
- every gate red at a package's baseline for a cause `ROADMAP.md` already carries is recorded as a
  standing reading beside the package's row with its carrier, and the release report names it. A
  standing reading is not a gate the release ran.

Report the layers in publish order, each package with its registry-confirmed version, the bump
rulings and their evidence, the approvals the user granted, and anything still unpublished. End
with exactly one terminal line — `RELEASE: LANDED` when every package in the round has closed, or
`RELEASE: OPEN` with the packages that have not.
