# Release: @orkestrel/scaffold 0.0.56

Date: 2026-08-27. Operator: the Orchestrator, session `claude/scaffold-proposal-impl-nabmm9`.
Round: `@orkestrel/scaffold` alone. The tooling packages sit outside the runtime layer order,
because nothing depends on them at runtime, so this release publishes on its own and propagates
to targets as files.

## Registry evidence

Swept 2026-08-27 with `npm view <package> version`:

| Package               | Registry | Manifest range | Moved |
| --------------------- | -------- | -------------- | ----- |
| `@orkestrel/scaffold` | 0.0.55   | —              | —     |
| `@orkestrel/console`  | 0.0.11   | ^0.0.11        | no    |
| `@orkestrel/contract` | 0.0.13   | ^0.0.13        | no    |
| `@orkestrel/emitter`  | 0.0.8    | ^0.0.8         | no    |
| `@orkestrel/markdown` | 0.0.12   | ^0.0.12        | no    |
| `@orkestrel/process`  | 0.0.6    | ^0.0.6         | no    |
| `@orkestrel/template` | 0.0.5    | ^0.0.5         | no    |
| `@orkestrel/guide`    | 0.0.14   | ^0.0.14        | no    |
| `@orkestrel/html`     | 0.0.7    | ^0.0.7         | no    |
| `@orkestrel/probe`    | 0.0.9    | ^0.0.9         | no    |
| `@orkestrel/test`     | 0.0.11   | ^0.0.11        | no    |

Every range already names what the registry serves, so the layer takes no re-pin. The published
0.0.55 tarball carries shasum `b3e1f39f8425ad60b2e5e34ef1f3e29562434037`, 134 files, and was built
from the pre-split model on `origin/main`.

## Bump ruling: bump, on the dist trigger

- **Runtime dependency set:** identical to the packument's `dependencies`. This trigger does not
  fire.
- **Rebuilt dist against the published tarball:** the file set matches, and material content
  differs in `dist/bin/main.js`, both library entries in every emitted form
  (`index.js`, `index.cjs`, `index.d.ts`, `index.d.cts` for core and server), `dist/host/manifest.json`,
  and the host copies of `agents/orchestration.md`, `agents/skills/orkestrel-publish/references/wave.md`,
  `claude/agents/orkestrel.md`, `claude/rules/quality.md`, `guides/scaffold.md`, and
  `tests/policy.test.ts`. No file differs by whitespace alone. This trigger fires.
- The comparison instrument ran with a negative control: the published tarball compared against
  itself reports no mismatch, and a mutated copy of its manifest reports one.
- The vendored surface moved on its own account as well, which the contract's vendored-byte rule
  makes a bump and a re-propagation across every target.

## Self-pins swept

`BASE_DEV_DEPENDENCIES` in `src/core/constants.ts` derives the scaffold pin from the manifest
version, so the bump reaches published code and generated output:

- `tests/src/core/fixtures/app-only-toolchain.txt`, `tests/src/core/fixtures/source-manifest.txt`,
  and `tests/src/core/fixtures/setup-false-manifest.txt` are `toMatchFileSnapshot` expectations of
  generated manifests and carried `^0.0.55`. Each moved to `^0.0.56` in the bump commit.
- `dist/` was rebuilt after the bump. The rebuilt core entry answers
  `BASE_DEV_DEPENDENCIES['@orkestrel/scaffold'] === '^0.0.56'`, and the published 0.0.55 entry
  carries `version: "0.0.55"` where the rebuilt one carries `version: "0.0.56"`.
- `host.json` did not move: the version reaches no vendored file, and the inventory holds 116
  entries before and after.
- The lockfile moved its version fields alone. This container runs npm 10.9.7, whose install
  strips the `libc` metadata npm 12 records on optional platform binaries, so the committed bytes
  were restored and only the bump applied.

## Gate evidence

Pending: the independent `verifier` runs the manifest's `prepublishOnly` chain command by command
at the bump commit.

## The upload

The container held no npm credential when the layer was prepared (`npm whoami` reported
`need auth`), so the chain runs `npm login --browser=false` before the upload. Both run on a pty
through `script`, with stdin held open by a fifo and never written to. The pty and fifo shape was
probed against a throwaway command, which reported a TTY where a run without the pty reported
none.

The upload command is `npm publish --ignore-scripts --browser=false`, with `--otp=<code>` where the
account answers publish 2FA with an authenticator code. `--ignore-scripts` is deliberate: the gate
chain proved the artifact outside the window, and the flag stops it running again inside the five
minutes. The dry run reports 134 files, 1.1 MB packed, tag `latest`, public access.

## After the upload

- Read the version back from the registry rather than from an exit code.
- Every target re-pins `@orkestrel/scaffold` to `^0.0.56`, runs the migration visit in
  `.agents/skills/orkestrel-publish/references/wave.md`, and proves its own gates. The vendored
  surface changed shape in this release, so the visit is the canon migration the contract trial
  proved rather than an ordinary refresh.
- The branch this release is built from must land on `main`. The registry's 0.0.55 came from
  `main`'s pre-split tip, and the two stay divergent until the merge.
