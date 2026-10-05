M1 — refuted. 223 union pairings, including the original 142. 37 fall below min(Bootstrap, 4.5): 2 prior, 1 added, 34 adjacent-surface rows. The context split leaves 36 misses and restores dark tertiary text from 3.940169 to 4.492043 against its 4.066830 floor. Node and Chromium disagree on 0 pairings at tolerance 0.001. The full below-floor list, both readings, and the live showcase subjects are in the JSON.

Output: [m1.json](m1.json).

M2 — holds. The 3 recipe forms preserve the flattened declaration sequence. The independent static theme still emits 409 variables. The consumer font reaches body and button; radius changes from 6px to 12px; primary stays rgb(21, 93, 252). The prefixed form falls back to the default references. The JSON records every emitted theme variable, resolved scale reference, body/button reading, and rewrite.

Output: [m2.json](m2.json).

M3 — refuted. The source rewrite finds {"condition":64,"breakpoint-value":10,"container":5,"token":11}, with 12 RFS conditions kept. Sass refuses the proposed scale(role,value) function at components/_floating-labels.scss:68: "Missing argument $value." Its unqualified CSS scale(0.85) call binds the added Sass function. Rewritten empty-scale digests, compiled tracer reach, and compiled line-count equality were not computed. Expected: both entries compile without a byte change. Found: compile refusal. Done: copy and source-site census; not done: compiled measurements. One hypothesis: the function name collides with the CSS transform function. The whole-shadow scale owns the four shadow color sites; swatch alone still traces them. Type sites stay unwrapped because the adopted type scale has no changed rows.

Output: [out/m3.json](out/m3.json).

M4 — holds. Both empty-map compiles retain ef7b5845a7dd3de2a1d8f94a5486a2cbf10175dd3136839292324d534fc1a109 and 4142d6d4bf5f4c02d74c80f90e9c55bfc3f6daa560d17d8d2983bb821465fc88. 571 sites produce 571 tracer hits, 0 missing keys, and unchanged compiled line counts. The 7 spellings include short %23fff, RGBA(, and rgba%28. The missing-key control refuses the compile.

Output: [out/m4.json](out/m4.json).

M5 — refuted. 54 face/width readings cover 18 widths. The 17 shared component names have 5661 departing longhands at the 19 RELATION_WIDTHS, all listed. Fractional iframe reads at device scale 1.25 and 1.5 find 0 unmatched gaps in 50 readings; each row records requested and actual width. The modal width stays 1140px at 1280 while the tuned container reads 1280px. This refutes equality to Bootstrap alone, not the recorded breakpoint alignment.

Output: [out/m5.json](out/m5.json).

M6 — refuted. The live population has 1666 and 1666 signatures at 1280 and 390, against the historical 1665. The copied winner model records 5346 scale-bearing Bootstrap-winner longhands before exclusions, 0 colliding value groups within that population, and 0 unexplained included scale mappings. The separate 1140px collision control maps the container to 1280px and keeps modal-xl at 1140px. mapReading is implemented in this probe from the role/longhand ruling; no checkout implementation was imported. Full journey not run: The full journey imports checkout source/test trees and writes its configured artifacts outside tmp/probes/tokens2; the brief forbids both. Only the copied focused partition was run.

Output: [out/m6.json](out/m6.json).

M7 — holds. All 6 requested utility/component pairs read per-channel difference [0, 0, 0] on an sRGB canvas under --force-color-profile=srgb. Teal uses a var(--bs-teal) swatch because Bootstrap has no teal component. This run measures sRGB only.

Output: [m7.json](m7.json).

M8 — refuted. 97 of 105 amount rows join to Bootstrap's own configured Sass. Maximum difference is 1 channel unit; 0 exceed one unit; 8 are unjoined. Bases, role variables, and table variants are configured independently before Bootstrap's Sass computes the amounts.

Output: [m8.json](m8.json).

M9 — refuted. 10 of 288 palette rows disagree with Chromium's color-mix(in srgb, VALUE 100%, transparent) serialization after clipping and rounding. --color-orange-200: #ffd6a7 → #ffd7a8; --color-orange-600: #f54900 → #f54a00; --color-green-100: #dcfce7 → #dbfce7; --color-green-500: #00c950 → #00c951; --color-teal-300: #46ecd5 → #46edd5; --color-cyan-400: #00d3f2 → #00d3f3; --color-sky-900: #024a70 → #024a71; --color-blue-950: #162456 → #162556; --color-fuchsia-400: #ed6aff → #ed6bff; --color-zinc-700: #3f3f46 → #3f3f47.

Output: [m9.json](m9.json).

Checks and reproduction

Chromium 141.0.7390.37; Node v22.22.2; Bootstrap 5.3.8; Tailwind 4.3.3; Sass 1.105.1. The loopback server binds 127.0.0.1 on port 0. Chromium profiles, cache, configuration, journals, and outputs stay under this directory. No network input, rebuild, install, or commit was used.

Scratch baseline: /home/user/veneer/dist/src/tailwindcss/index.css, the tuned sheet the real recipe loader uses. The map contains 125 keys, with 0 conflicts and 0 unmapped literals. Collision-safe replacement makes one pass over bounded hex/short hex, rgb/rgba/RGBA channels, -rgb triplets, %23 escapes, rgba%28 channels, and data-URI attributes. The dark-secondary ruling is gray-900. colors.css retains the value-only gray-300 dark body for M1; split.css applies the specific dark body/secondary/tertiary gray-200 context split; references.css and aligned.css build on that split. The original color palette remains pinned. M3 and M4 use separate source copies to isolate their mechanisms.

Unmapped literals: []. The current source, prior probe, and governing-file full reads are hashed in reads.json. Existing shared names are copied from the current committed comparison and switch records; current tests were read as they stood. The probe copies the current partition logic with source-line citations, imports only installed packages and owned probe modules, and adds a recorder before exclusions. It does not import checkout source or tests. AST syntax scan: 0 prohibited any/type-assertion/non-null-assertion nodes.

Commands:

```text
PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH TMPDIR=/home/user/veneer/tmp/probes/tokens2/host node node_modules/@orkestrel/scaffold/dist/agents/skills/orkestrel-dispatch/scripts/launch.js --journal tmp/probes/tokens2/acceptance.log --errors tmp/probes/tokens2/acceptance.err --cap 420 -- node tmp/probes/tokens2/run.ts
PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH TMPDIR=/home/user/veneer/tmp/probes/tokens2/host node tmp/probes/tokens2/repeat-m1.ts
node tmp/probes/tokens2/summarize.ts
```

run.ts executes map.ts, scale.ts (M3), lex.ts (M4), oracle.ts (M8), host.ts, measure.ts (M1/M2/M5/M7/M9), and partition-run.ts (M6), twice each. It snapshots the first output and executes cmp for each out/mN.json. M3 exits 0 after serializing its exact compile refusal, as the brief requires for an unavailable measurement. The initial M1 comparison caught in-flight header color transitions. The probe then awaited each real header transition and repeat-m1.ts ran M1 twice with cmp exit 0; m1-repeat.log records both exits. The final two m1 entries in durations.log are those settled-state runs. No sheet was altered to suppress a transition.

```text
m1.json: cmp exit 0 (after waiting for header transitions)
m2.json: cmp exit 0
m3.json: cmp exit 0
m4.json: cmp exit 0
m5.json: cmp exit 0
m6.json: cmp exit 0
m7.json: cmp exit 0
m8.json: cmp exit 0
m9.json: cmp exit 0
```

Measured durations (seconds; repeated runs only):

```text
run 1 map.ts 0.843 s
run 1 scale.ts 1.160 s
run 1 lex.ts 2.735 s
run 1 oracle.ts 1.789 s
run 1 host.ts 1.298 s
m9 0.123 s
m7 0.212 s
m2 3.087 s
m1 3.858 s
m5 14.731 s
run 1 measure.ts 23.003 s
m6 33.248 s; reference focused 53 s; journey references 449 s and 487 s
run 1 partition-run.ts 34.173 s
run 2 map.ts 0.831 s
run 2 scale.ts 1.288 s
run 2 lex.ts 3.170 s
run 2 oracle.ts 2.060 s
run 2 host.ts 1.308 s
m9 0.142 s
m7 0.222 s
m2 3.494 s
m1 4.476 s
m5 15.345 s
run 2 measure.ts 24.708 s
m6 34.794 s; reference focused 53 s; journey references 449 s and 487 s
run 2 partition-run.ts 35.756 s
m1 5.571 s
m1 4.730 s
```

The focused partition timings compare against 53 s. The full journey was not run; its references are 449 s and 487 s.

Git status before: empty. Git status after: 
```text
 M ROADMAP.md
 M guides/veneer.md
 M src/bootstrap/_mixins.scss
 M src/tailwindcss/_tokens.scss
 M tests/app/browser/integration.test.ts
 M tests/app/browser/sections/integration.test.ts
 M tests/conformance.test.ts
 M tests/integration.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupServer.ts
 M tests/src/tailwindcss/index.test.ts
```. Status equality: false. The brief names a pre-launch dirty set, but this run observed no such entries at its baseline. The final tracked entries are external concurrent-lane changes, not the probe's. Their ownership cannot be distinguished further from git status alone. The tests entries fall in fix unit A's stated area; entries in src/, guides/, and ROADMAP.md extend beyond that area, so the brief's tests-only status exception is not met. The user's broader concurrent-writer instruction authorizes reading those files as found, never changing them. No tracked file was written.
