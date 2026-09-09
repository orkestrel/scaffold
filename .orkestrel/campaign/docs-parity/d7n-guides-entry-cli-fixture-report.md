# Guides entry CLI fixture integration return

Root applied the exact serial correction named in the matching brief. The custom
command fixture now declares node scripts/custom-guides.mjs, so it differs from
the generated test:guides launcher. Every expected question and byte-preservation
assertion remains. Root also removed a count comment from scripts/guides.ts and
regenerated host.json with the canonical build.

The full test chain failed in the CLI case and failed again in a root-only repeat.
The exact scoped command then failed at exit 1 before the initializer edit and
passed at exit 0 afterward. The control and output are retained in the root-gates
evidence directory as cli-fixture-red and cli-fixture-green.

The corrected candidate passed the ordered format:check, lint:check, check, build
and npm test commands. The latter reached policy, config, setup and test:guides;
it exited 0. The final diff, status and new entry hashes are unchanged across
ordinary npm test. This snapshot covers tracked candidate bytes and the untracked
new launcher; it does not claim that temporary test resources were never created.

No primary product file changed. Independent acceptance remains pending.
