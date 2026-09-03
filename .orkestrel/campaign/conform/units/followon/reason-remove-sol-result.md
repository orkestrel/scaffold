# Rows

| Row | Status | Evidence |
| --- | --- | --- |
| Contract | applied | `src/core/types.ts:1453`, `src/core/types.ts:1475` |
| Class | applied | `src/core/builders/SubjectBuilder.ts:104` |
| Proof | applied | `tests/src/core/builders/SubjectBuilder.test.ts:76` |
| Guide | applied | `guides/reason.md:94`, `guides/reason.md:390`, `guides/reason.md:563` |

The guide keeps a dedicated `SubjectBuilderInterface` Methods table. Its `remove` row documents the no-argument, one-key, and key-list forms.

# Failing-first controls

The types-first `npm run check` command exited 2 before the class edit. TypeScript named `SubjectBuilder.remove` and the factory return as incompatible with the added no-argument interface overload.

- Red command: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/builders/SubjectBuilder.test.ts > /home/user/work/evidence/reason-remove-proofs/red.txt 2>&1`
  - Exit: 1
  - Result: 1 failed, 20 passed. The named no-argument case failed because the planted implementation emitted no `remove` events.
  - Capture: `/home/user/work/evidence/reason-remove-proofs/red.txt`
- Green command: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/builders/SubjectBuilder.test.ts > /home/user/work/evidence/reason-remove-proofs/green.txt 2>&1`
  - Exit: 0
  - Result: 21 passed.
  - Capture: `/home/user/work/evidence/reason-remove-proofs/green.txt`

# Sweeps

Commands:

- `grep -rn '\bremove(' src tests guides/reason.md`
- `grep -rn '^[[:space:]]remove(' src tests guides/reason.md`

Declarations and arities:

- `src/core/types.ts:916-918` — `GroupManagerInterface.remove`: array 1, single 1, all 0.
- `src/core/types.ts:978-980` — `FactorManagerInterface.remove`: array 2, single 2, all 1 because `groupId` remains required.
- `src/core/types.ts:1031-1033` — `RuleManagerInterface.remove`: array 1, single 1, all 0.
- `src/core/types.ts:1085-1087` — `EquationManagerInterface.remove`: array 1, single 1, all 0.
- `src/core/types.ts:1137-1139` — `FactManagerInterface.remove`: array 1, single 1, all 0.
- `src/core/types.ts:1191-1193` — `InferenceManagerInterface.remove`: array 1, single 1, all 0.
- `src/core/types.ts:1243-1245` — `VariableManagerInterface.remove`: array 1, single 1, all 0.
- `src/core/types.ts:1475-1477` — `SubjectBuilderInterface.remove`: array 1, single 1, all 0.
- `src/core/builders/SubjectBuilder.ts:104-107` — public overloads 1, 1, and 0; implementation 0-1.
- `src/core/builders/managers/GroupManager.ts:81-84` — public overloads 1, 1, and 0; implementation 0-1.
- `src/core/builders/managers/FactorManager.ts:100-103` — public overloads 2, 2, and 1; implementation 1-2.
- `src/core/builders/managers/RuleManager.ts:84-87` — public overloads 1, 1, and 0; implementation 0-1.
- `src/core/builders/managers/EquationManager.ts:86-89` — public overloads 1, 1, and 0; implementation 0-1.
- `src/core/builders/managers/FactManager.ts:81-84` — public overloads 1, 1, and 0; implementation 0-1.
- `src/core/builders/managers/InferenceManager.ts:91-94` — public overloads 1, 1, and 0; implementation 0-1.
- `src/core/builders/managers/VariableManager.ts:75-78` — public overloads 1, 1, and 0; implementation 0-1.
- `src/core/builders/managers/Collection.ts:64` — implementation 1.
- `tests` and `guides/reason.md` contain calls and documentation, but no `remove` declarations.

# Gates

| Command | Exit |
| --- | --- |
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run test:guides` | 0 |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/builders/SubjectBuilder.test.ts` | 0 |

# Breaking

The added overload breaks no caller.

# Deviations

None.