# Unit ts7-break-research-b — Vue single-file components under TypeScript 7 without `vue-tsc` on 6

`researcher` on Sonnet, a native Claude Code subagent with `WebFetch` and `WebSearch`. Perform the assignment directly and spawn nothing. Read-only. Primary sources first (vuejs/language-tools on GitHub, the Vue and Volar docs, microsoft/TypeScript), secondary sources named as such. Cite every fact with its URL. Today is 2026-09-05.

## Question

A generated `app/browser` workspace checks its Vue sources with `vue-tsc --noEmit -p configs/app/tsconfig.browser.json` and holds `typescript` at `^6.0.3` for that reason (`vuejs/language-tools` issue 5381). For a fleet that runs TypeScript 7 only, with no 6.x compiler anywhere, what checks a `.vue` file's `<script setup lang="ts">` block today, and what is the honest state of each option?

## Rows

1. **Issue 5381 and its neighbours** as of today: the status, the maintainers' stated plan (a `tsgo` switch, dropping the TypeScript-internals patching, a rewrite), any merged pull request, any pre-release package (`@vue/language-tsgo`, `vue-tsgo`, a `vue-tsc` major with 7 support), and the dates.
2. **TypeScript 7's plugin story:** whether `tsgo`/TypeScript 7.0.2 supports language service plugins or external language plugins at all (the typescript-go feature matrix, any devblog statement), because `vue-tsc` is built on patching the 6.x language service.
3. **Alternatives that need no 6.x compiler:** checking the extracted `<script>` blocks with `tsc` 7 after a build-time transform (`@vue/compiler-sfc` emitting `.ts` shadows), `vite-plugin-checker`'s state, Volar's own plans, and what each loses (template type-checking, `defineProps` inference across the template).
4. **What the fleet loses if `app/browser` drops `vue-tsc`:** state precisely which checks `vue-tsc` performs that `tsc` over the extracted script blocks does not, from the language-tools documentation.

## Output

`## Evidence` per row with citations; `## Distillate`; `## Unknowns`. No process diary. End with `Deviation: none` or the deviation.
