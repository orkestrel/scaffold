# E-ID-BUTTON-CASCADE round 4 report

Unit `builder` on Sonnet, native, sole writer in `/home/user/veneer-ebc`; brief `ebc-brief-4.md`. It applied
`ebc-instruments/r3/ebc-3-btn-states.patch` with `git apply` and changed nothing else. The returned text follows, with
its paths rewritten to the retained copies under `.orkestrel/veneer/units/`.

**The `.btn` case title** (`tests/src/styles/elements/button.test.ts`, the case near line 197): `resolves every .btn form
on a button as the same form resolves on an anchor at rest, and every enabled form under hover, press, and keyboard
focus, apart from the button appearance and the user agent's focus offset on a link`.

**The `state-spacing` kill** (`ebc-instruments/r4/ebc-4-mutation-state-spacing.log.txt`):

```
KILL | tests/src/styles/mixins.test.ts > declaration mixins writes the button reboot back on every longhand the button surface writes, on each class the release builds on a button, and the surface writes none of them important | AssertionError: expected { …(2) } to deeply equal { …(2) }
KILL | tests/src/styles/elements/button.test.ts > button resolves every .btn form on a button as the same form resolves on an anchor at rest, and every enabled form under hover, press, and keyboard focus, apart from the button appearance and the user agent's focus offset on a link | AssertionError: expected [ { form: 'filled', …(2) }, …(24) ] to deeply equal [ { form: 'filled', …(2) }, …(24) ]
restore: byte-identical 94711449d6374bb70487e1e687f863c088d357767d0f650864aead2ef8b6c82f
rebuild exit=0
```

| Gate | Exit | Log |
| --- | --- | --- |
| `npm run format:check` | 0 | `ebc-instruments/r4/ebc-4-format-check.log.txt` |
| `npm run lint:check` | 0 | `ebc-instruments/r4/ebc-4-lint-check.log.txt` |
| `npm run check` | 0 | `ebc-instruments/r4/ebc-4-check.log.txt` |
| `npm run test:src:styles` | 0 | `ebc-instruments/r4/ebc-4-test-src-styles.log.txt` (1500 tests passed) |
| `npm run test:setup` | 0 | `ebc-instruments/r4/ebc-4-test-setup.log.txt` (321 tests passed) |
| `npm run test:guides` | 0 | `ebc-instruments/r4/ebc-4-test-guides.log.txt` (20 tests passed) |

Diff and status: `ebc-4.diff` (`git diff e07b3a6`, rounds 1 to 4) and `ebc-4-status.txt`. No deviation.
