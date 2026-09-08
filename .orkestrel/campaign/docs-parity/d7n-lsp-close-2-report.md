# Report — `d7n-lsp-close-2`

## Deviation note (non-blocking)

The brief's "Read first" names `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-lsp-closure-checker-lsp.md` as the checker's findings this unit closes; that path does not exist in the campaign folder (only `d7n-lsp-audit-checker-lsp.md` sits there). The brief's two Items are fully specified against the rulings and the guide's own text, so the work proceeded without that file. Flagging it rather than treating it as blocking.

## Items

### 1. Ruling 28 — class row `Shape` cells and convention text

`StdioClientTransport` implements `StdioClientTransportInterface` (`src/server/transports/StdioClientTransport.ts:44`); `LSPClient` implements `LSPClientInterface` (`src/core/LSPClient.ts:78`); `LSPError` extends `Error` and implements no package interface (`src/core/errors.ts:18`), so its cell holds the constructor signature.

```diff
--- a/guides/lsp.md
+++ b/guides/lsp.md
@@ Stdio client transport
-A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`. An extended interface's name comes before `plus`, with the members it adds after. A function row's `Shape` cell holds its signature, and a guard row's the type it narrows to.
+A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`. An extended interface's name comes before `plus`, with the members it adds after. A function row's `Shape` cell holds its signature, and a guard row's the type it narrows to. A class row's `Shape` cell holds the interface it implements, or its constructor signature where it implements none.
-| `StdioClientTransport`          | class     |                                                                           | Streams Language Server Protocol bytes between a client and a child process over stdio. |
+| `StdioClientTransport`          | class     | `StdioClientTransportInterface`                                          | Streams Language Server Protocol bytes between a client and a child process over stdio. |
@@ Client and transport contracts
-A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`. A function row's `Shape` cell holds its signature, and a guard row's the type it narrows to.
+A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`. A function row's `Shape` cell holds its signature, and a guard row's the type it narrows to. A class row's `Shape` cell holds the interface it implements, or its constructor signature where it implements none.
-| `LSPClient`             | class     |                                                                                                                                                                                                       | Drives a Language Server Protocol peer through an injected byte transport.            |
+| `LSPClient`             | class     | `LSPClientInterface`                                                                                                                                                                                  | Drives a Language Server Protocol peer through an injected byte transport.            |
@@ Framing, timing, and errors
-A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`. A function row's `Shape` cell holds its signature, and a guard row's the type it narrows to.
+A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`. A function row's `Shape` cell holds its signature, and a guard row's the type it narrows to. A class row's `Shape` cell holds the interface it implements, or its constructor signature where it implements none.
-| `LSPError`         | class     |                                                                                                                                     | Reports a package failure with a stable machine-readable category.                          |
+| `LSPError`         | class     | `new (message: string, options: LSPErrorOptions) => LSPError`                                                                       | Reports a package failure with a stable machine-readable category.                          |
```

### 2. Ruling 27 — the `### Guards` table's interface sentence struck

```diff
@@ Guards
-A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`. In a guard table a `Shape` cell holds the type the guard narrows to.
+In a guard table a `Shape` cell holds the type the guard narrows to.
```

`tests/guides.test.ts` needed no edit: `diff <(sed -n 1,3p .../abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` already reads empty.

## Criteria, cheapest first

1. `git status --short` → `M guides/lsp.md` (owned files only).
2. `grep -nE '^\| \`[^\`]+\` +\| (function|const|class) +\| +\| ' guides/lsp.md` → empty. Fence sweep `awk ...` over `guides/lsp.md` → empty. `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` → empty, exit 0.
3. `npx oxfmt --config .oxfmtrc.json --check guides/lsp.md tests/guides.test.ts` → `All matched files use the correct format.` exit 0. `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` → no output, exit 0.
4. `PATH=/opt/npm11/bin:$PATH npm run docs` → `rows read: 1, disagreements found: 0`. `npm run docs -- --to guide` → `rows read: 1, disagreements found: 0, written: 0, reported: 0`. `npm run docs -- --to source` → `rows read: 1, disagreements found: 0, written: 0, reported: 0`.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` → `Test Files 1 passed (1)`, `Tests 30 passed (30)`, exit 0.

No `Summary` cell was moved by hand.
