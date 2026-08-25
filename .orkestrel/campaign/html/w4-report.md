- Reference loader: [tests/setup.ts](/home/user/orkestrel/html/tests/setup.ts:3) statically imports the fetched `entities.json` file and exports a frozen semicolon-terminated `name → characters` record. The comment records the WHATWG URL and fetch date `2026-08-24`. Fixture SHA-256 remains `d741d877ac77c4194c4ad526b5b4a19aef8dfe411ab840a466891cdbb9f362e6`.

- Equality proof: [helpers.test.ts](/home/user/orkestrel/html/tests/src/core/helpers.test.ts:61) uses `expect(NAMED_ENTITIES).toEqual(WHATWG_NAMED_ENTITIES)` and decodes every reference entry. The security audit takes its population from the same reference while retaining the `controls` and `punctuation` assertions. The size assertions are gone.

- Mutation controls:
  - Altered name, temporary line 70: `- "AEligAltered": "Æ"` / `+ "AElig": "Æ"`.
  - Altered value, temporary line 65: `- "AElig": "altered"` / `+ "AElig": "Æ"`.
  - Vitest reported the named equality test red for each mutation. No control remains.

- Guide: [guides/html.md](/home/user/orkestrel/html/guides/html.md:56) states that the table exactly matches the vendored WHATWG semicolon-terminated name-to-character reference set.

- Validation:
  - Scoped TypeScript check: exit `0`.
  - Scoped Oxlint check: exit `0`.
  - Scoped Oxfmt check on the changed TypeScript and guide files: exit `0`.
  - `npm run test:src:core`: exit `0`.
  - `npm run test:guides`: exit `0`.
  - `git diff --check`: exit `0`.

- Unclosed claim: the all-tree formatter check still reports `tests/src/core/fixtures/entities.json`. I left the fetched fixture bytes unchanged because the brief forbids modifying or renormalizing that file.