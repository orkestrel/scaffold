# Repair the probe's arrival wait

Act as builder on Terra. Read the authority and previous successor brief `r-a-2-closure-instrument-brief-2.md`; preserve its ownership and limits. Spawn nothing. You are not alone; preserve all other edits.

Own only Roughnotes `tmp/probe/ra2-recovery/`. The independent browser run failed before the tested behavior: `readPerception('Content')` threw `Named region "Content" is not visible` during the route transition. The supplied `waitForCondition` does not retry thrown readings.

Replace each such arrival wait with Vitest `await expect.poll(() => readPerception(COPY.content), { timeout: 4_000 }).toContain(expectedNotice)`. Remove the unused `waitForCondition` import. Keep the assertions and ambiguity control unchanged. Use a plain string test name in the temporary Vite config instead of an object, so output identifies the project.

Run scoped formatting and diff whitespace only. Do not run browsers, install, commit, or touch source. Return the owned paths and exact command for independent execution.
