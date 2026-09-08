import pathlib, sys

p = pathlib.Path('guides/probe.md')
t = p.read_text()

old = """The blueprints behind both the published tool schema and the guard applied to an arriving call, from
[`shapers.ts`](../src/core/shapers.ts). `CLAIM_SHAPE` compiles to the `prove` tool's JSON Schema. The
schema is the wire contract's shape and `isClaim` is the admission rule, and the rule is narrower on
`Draft.path`: see [The advertised schema is wider than the admission rule](#registering-the-server).

| Name            | Kind  | Summary                                                                                                                  |
| --------------- | ----- | ------------------------------------------------------------------------------------------------------------------------ |
| `DRAFT_SHAPE`   | const | Describes one proposed file a claim carries.                                                                             |
| `CASE_SHAPE`    | const | Describes the drafts a claim asserts about and the test that exercises them.                                             |
| `CONTROL_SHAPE` | const | Describes the negative control, which is a case plus where and why it must break.                                        |
| `CLAIM_SHAPE`   | const | Describes one claim and is the sole source of both the published tool schema and the guard applied to an arriving claim. |
"""

new = """The blueprints behind both the published tool schema and the guard applied to an arriving call,
from [`shapers.ts`](../src/core/shapers.ts). `CLAIM_SHAPE` compiles to the `prove` tool's JSON
Schema. The schema is the wire contract's shape and `isClaim` is the admission rule, and the rule is
narrower on `Draft.path`: see
[The advertised schema is wider than the admission rule](#registering-the-server).

A `Shape` cell holds the constant's declared type.

| Name            | Kind  | Shape                                         | Summary                                                                                                                  |
| --------------- | ----- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `DRAFT_SHAPE`   | const | `ObjectShape<{ path, text }>`                 | Describes one proposed file a claim carries.                                                                             |
| `CASE_SHAPE`    | const | `ObjectShape<{ files, test }>`                | Describes the drafts a claim asserts about and the test that exercises them.                                             |
| `CONTROL_SHAPE` | const | `ObjectShape<{ files, test, stage, reason }>` | Describes the negative control, which is a case plus where and why it must break.                                        |
| `CLAIM_SHAPE`   | const | `ObjectShape<{ project, case, control }>`     | Describes one claim and is the sole source of both the published tool schema and the guard applied to an arriving claim. |
"""

if t.count(old) != 1:
	sys.exit(f'found {t.count(old)}')
p.write_text(t.replace(old, new))
print('guides/probe.md: Shapes table headed Shape under the constants sentence')
