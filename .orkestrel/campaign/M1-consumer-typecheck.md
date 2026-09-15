# Consumer typecheck against the U0 tool tarball — 2026-09-15T05:02:42Z

## agent
```text
tests/setup.test.ts(336,21): error TS2554: Expected 2 arguments, but got 1.
tests/setup.test.ts(342,21): error TS2554: Expected 2 arguments, but got 1.
tests/src/core/integration.test.ts(125,31): error TS2353: Object literal may only specify known properties, and 'caller' does not exist in type 'Partial<ToolCall>'.
tests/src/core/providers/RelayProvider.test.ts(158,31): error TS2353: Object literal may only specify known properties, and 'caller' does not exist in type 'Partial<ToolCall>'.
tests/src/core/providers/RelayProvider.test.ts(171,43): error TS2339: Property 'caller' does not exist on type 'ToolCall'.
exit=2
```
files named:
- tests/setup.test.ts
- tests/src/core/integration.test.ts
- tests/src/core/providers/RelayProvider.test.ts

## mcp
```text
tests/src/core/MCPClient.test.ts(1204,29): error TS2554: Expected 2 arguments, but got 1.
exit=2
```
files named:
- tests/src/core/MCPClient.test.ts

## ollama
```text
tests/setup.test.ts(434,28): error TS2554: Expected 2 arguments, but got 1.
tests/setup.test.ts(442,14): error TS2554: Expected 2 arguments, but got 1.
tests/setup.test.ts(443,14): error TS2554: Expected 2 arguments, but got 1.
tests/setup.test.ts(452,28): error TS2554: Expected 2 arguments, but got 1.
tests/setup.test.ts(460,21): error TS2554: Expected 2 arguments, but got 1.
tests/setup.test.ts(467,21): error TS2554: Expected 2 arguments, but got 1.
tests/setup.test.ts(477,28): error TS2554: Expected 2 arguments, but got 1.
tests/setup.test.ts(483,14): error TS2554: Expected 2 arguments, but got 1.
tests/setup.test.ts(484,28): error TS2554: Expected 2 arguments, but got 1.
tests/setup.test.ts(492,14): error TS2554: Expected 2 arguments, but got 1.
tests/setup.test.ts(493,14): error TS2554: Expected 2 arguments, but got 1.
tests/setup.test.ts(502,28): error TS2554: Expected 2 arguments, but got 1.
tests/setup.test.ts(510,15): error TS2554: Expected 2 arguments, but got 1.
tests/setup.test.ts(511,29): error TS2554: Expected 2 arguments, but got 1.
tests/setup.test.ts(512,30): error TS2554: Expected 2 arguments, but got 1.
exit=2
```
files named:
- tests/setup.test.ts
