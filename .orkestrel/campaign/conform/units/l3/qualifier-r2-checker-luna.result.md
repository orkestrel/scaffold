1. **CONFIRMED** — Tree evidence covers every applied row: `src/core/factories.ts:61-107`, `src/core/helpers.ts:56-790`, `tests/setup.ts:22-260`, `tests/setup.test.ts:248-375`, `tests/guides.test.ts:181-294`, `guides/qualifier.md:210-810`, and `README.md:20-50`. `isBrowserVuePath` and the public `id` shape are absent by sweep.

2. **not held**

3. **CONFIRMED** — Word-boundary old-name sweep across `src`, `tests`, both guides, and `README.md` is empty. The case-insensitive inflection sweep finds only retained type references `QualificationDefinition` at `guides/qualifier.md:4,83`; no removed export survives. The report’s sweep names the same paths.

4. **not held**

5. **CONFIRMED** — Public exports in `src/core/index.ts:1-7` match the guide’s Surface, Helpers, Factories, Entities, and Methods tables at `guides/qualifier.md:72-386`. All guide fences import `@orkestrel/qualifier`; executable transcriptions are implemented at `tests/guides.test.ts:181-294`. `AGENTS §` sweep is empty.

6. **not held**

7. **CONFIRMED** — The status evidence lists only owned files. No compatibility alias, re-export, or shim appears in `src/core/index.ts:1-7`; old-name sweep across the audited paths is empty.

8. **not held**

9. **CONFIRMED** — Sweeps over the changed source, tests, guides, and README find no `TODO`, `FIXME`, `HACK`, debug call, skip, only, todo, retry, timeout, deferred-work marker, or old-name residue. The dispositioned edits match the current tree at `src/core/factories.ts:61-107`, `tests/setup.ts:22-260`, `tests/guides.test.ts:181-294`, and `guides/qualifier.md:790-810`.

Findings outside the claims

none

Referrals

none

VERDICT: PASS

Journal

Leave for the driver.

Deviation

No tree change observed. No required file was unreadable.