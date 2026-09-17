Stopped under the Deviation protocol. No files changed.

Expected: ruling 2 extends the existing invocation reader within the owned scope.

Found: `scriptToInvocations` lives at `src/bin/helpers.ts:774`. Its `ScriptInvocations` contract at `src/bin/types.ts:234` exposes `projects` and `scripts`, with no configuration paths. Neither file is owned by the brief. Extending that reader requires an unowned change.

The brief needs to authorize those files and their mirrored reader tests before implementation can continue.

The actual diff and diff stat are empty. `git status --short` returned:

```text
?? .orkestrel/campaign/
```

Git also reported permission denied while reading the user-level ignore file. The campaign directory was present before this work and remains untouched.

The rulings have these landing states:

| Ruling | Landing state |
|---|---|
| Birth | Not landed; intended site: `src/bin/CLI.ts`, `#create` |
| Agreement | Blocked by reader and contract ownership |
| Factory pins | Not landed |
| `readSpecifiers` TSDoc and test | Not landed |
| `inspectSkillImports` TSDoc | Not landed |
| Guide | Not landed |

The controls have no red or green readings:

| Control | Command or proof | Reading |
|---|---|---|
| S4-C1 | Scoped CLI birth cases | Not authored or run |
| S4-C2 | Scoped CLI manifest-question cases | Not authored or run |
| S4-C3 | Factory case under each specified mutation, then restored | Not run; no mutations made |
| S4-C4 | Member-expression case; search for `Two forms` | Not run |
| S4-C5 | `npm.cmd run test:policy`; `npm.cmd run test:setup` | Not run |
| S4-C6 | Required gates listed below | Not run |

The unknown remains unanswered by execution. Source inspection shows that `#scriptQuestion` compares writable scripts and that `#projectQuestion` builds reachability from `invoked.projects`. I did not run the wrapper-present, journey-omitted chain case after encountering the ownership stop.

No non-ASCII lines were touched.

The gate table records the unexecuted checks:

| Gate | Exit code | Totals |
|---|---|---|
| Scoped Oxfmt over owned files | Not run | — |
| Scoped Oxlint over owned files | Not run | — |
| `npm.cmd run check` | Not run | — |
| `npm.cmd run test:src:core` | Not run | — |
| `npm.cmd run test:src:bin` | Not run | — |
| `npm.cmd run test:config` | Not run | — |
| `npm.cmd run test:setup` | Not run | — |
| `npm.cmd run test:guides` | Not run | — |
| `npm.cmd run test:policy` | Not run | — |

Least certain: the existing questions’ runtime behavior for the unknown case. No implementation, mutation, browser, or acceptance claim is made.