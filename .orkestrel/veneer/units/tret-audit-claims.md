# TOKEN-RETIRE audit — claims

Subject: TOKEN-RETIRE in `/home/user/veneer-tret` (branch `unit/tret`, committed as `a5a85d8` over Veneer `1deced0`),
briefed by `token-retire-brief.md` on the TOKEN-PROOFS carrier paragraph and claim 5 of
`tenets-styles/tenets-styles-audit-verdict.md`. Written by `opus` on Opus 5.5 and reported in `token-retire-report.md`.
Evidence: `tret-instruments/` (`tret.diff`, `git diff 1deced0`; `tret-status.txt`; `tret-constants.diff.txt`; the
readings probe under `probe/`, the before and after readings and their comparison; the plant and gate drivers; every
log). All paths sit under `/home/user/scaffold/.orkestrel/veneer/units/`. The live change reads with
`git -C /home/user/veneer-tret diff 1deced0 a5a85d8`. The unit edited `tests/src/styles/fixtures/mixins.scss`, outside
its owned set; the Orchestrator accepts that edit, because the brief required a proof that only a caller passing no
`$reset` argument can give and granted no file holding such a caller. A mutation counts as a kill only when the failing
case's log names an `AssertionError`. Rule every claim.

1. **The retirement.** The built cascade (`dist/src/styles/index.css`) declares none of `--vn-focus-reset`,
   `--vn-color-tertiary-subtle`, `--vn-color-tertiary-border`, and `--vn-color-tertiary-rgb` in any scope, and no rule
   reads one; `TOKEN_NAMES` in `src/core/constants.ts` names none of them; the guide names none of them outside a
   sentence stating that they are not declared. No reader in `src/`, `app/`, `tests/`, or `guides/` is left pointing at
   a retired name, including a name built from a role or tier variable.
2. **Nothing painted moves.** Every shipped `focus-ring` caller paints the same outline and shadow with and without
   forced colors; `.btn-tertiary` and `.btn-outline-tertiary` paint the same in both color modes at rest, focus, hover,
   active, and disabled; every other role keeps its `-subtle`, `-emphasis`, `-border`, and `-rgb` tiers in every scope
   it declared them in; and the contrast rule still reads the tertiary triplet at compile time
   (`tret-readings-compare.log.txt`, the built cascade).
3. **The mechanism.** The `focus-ring` mixin's `$reset` defaults to `none`; `role-each` emits the `-subtle` and
   `-border` tiers only for roles in its `$aliased` list, and the `-emphasis` tier for every role, in the order it
   emitted them before; the `:root` channel loop emits a triplet only for an aliased role. Each change is the smallest
   that retires the names, adds no second list of roles that can drift from `$aliased`, and reads as one decision.
4. **The proofs.** The retired-name case, the default-reset case, the tertiary fill and emphasis case, and the
   every-caller forced-colors case each read the rendered or declared result the report states; the retired-name and
   default-reset cases failed at `1deced0` (`tret-red.log.txt`) and pass after (`tret-green.log.txt`); the
   `focus-reset` and `tertiary-subtle` plants each fail a case with an `AssertionError` and restore identically. For each
   case, name the mutation that would make it fail, and say whether its assertions distinguish that mutation from the
   passing case.
5. **The guide.** Each sentence and table the report lists under Guide changes reads true against the built cascade and
   `src/styles/_tokens.scss`, reads once, and holds the voice `.claude/rules/writing.md` fixes; the § Reference map
   proof resolves each row it names; and no other guide sentence the change makes false remains.
6. **The engine hunk.** `tret-constants.diff.txt` removes exactly the `focus.reset` leaf and the tertiary `rgb`,
   `subtle`, and `border` leaves, and nothing in `src/core/types.ts`, `tests/src/core/`, or `tests/src/browser/` reads a
   removed leaf.
7. **Scope and gates.** The status names only the owned files, the shared `constants.ts`, and the accepted fixture. The
   oxfmt check, `npm run check`, `npm run lint:check`, `npm run build:src`, `npm run test:setup`,
   `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0 in `tret-instruments/`.
