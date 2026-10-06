Gate verdict: **pass** on Chromium 141.0.7390.37. Chromium 153.0.8010.12 also produces positive growth and equal unchanged-content completion readings. Measurements are CSS pixels at devicePixelRatio 1; each cell is late / completed.

Final verification: Collapse 37 passed; plugins 7 passed; helpers 41 passed; browser project 793 passed and exactly the six permitted host-bound failures; policy 119 passed and 1 skipped; browser and root typechecks exit 0; format, lint, and diff whitespace checks exit 0. Guide parity exits 1 with 19 passed and 1 failed because the required public interface lacks an unowned Surface row. This report does not claim that guide gate passed.

| Chromium | Content | Engine on | Engine off | Bootstrap |
| --- | --- | --- | --- | --- |
| 141.0.7390.37 | 120 → 240 px | 195.96875 / 240 | 97.984375 / 240 | 97.984375 / 240 |
| 141.0.7390.37 | Unchanged 120 px | 97.984375 / 120 | 98 / 120 | 97.984375 / 120 |
| 153.0.8010.12 | 120 → 240 px | 192 / 240 | 95.984375 / 240 | 98 / 240 |
| 153.0.8010.12 | Unchanged 120 px | 96 / 120 | 95.984375 / 120 | 97.96875 / 120 |

Completion readings follow `shown.bs.collapse` by one rendering frame, after assertions that inline height and `interpolate-size` are cleared. Both probe runs produced all readings without a probe repair. The host queue serialized browser and typecheck commands. The scratch probe is deleted; its growth and unchanged-content controls are retained in `Collapse.test.ts`.

The implementation adds the typed leaf, the narrow plugin options record and factory-time copy, the transition-scoped hold, and propagation to created accordion siblings. The barrel already star-exports `types.ts`. The resolver already rejects unrecognized markup leaves. Both therefore need no source edit. The departure comparison uses supplemental readings in the existing oracle harness, with raw mutation observations proving both the zero and endpoint writes, and real animations proving the reflow starts a transition.

The full diff is [stage-b-b4.diff](./stage-b-b4.diff). No commit was made.

The final status is:

```text
 M guides/veneer.md
 M src/browser/Collapse.ts
 M src/browser/plugins.ts
 M src/browser/types.ts
 M tests/src/browser/Collapse.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/browser/plugins.test.ts
```

The deviations are:

| Expected | Found and evidence | Done or not | Hypothesis |
| --- | --- | --- | --- |
| Guide parity passes | `node --experimental-strip-types /home/user/.wave/veneer-b4/tests/guides.test.ts`, cwd `/home/user/.wave/veneer-b4`, exit 1: 19 passed, 1 failed; `guides/veneer.md does not document interface CollapsePluginOptions.` | Not repaired: the Surface table is outside the brief's permitted departure-row edits. The exact required row follows. | The serial guide unit must carry the public-interface Surface row with this held contract. |
| Optional leaf assignments typecheck | Initial browser and root checks both report TS2379 at `Collapse.ts:115` and `plugins.ts:116`: explicit `boolean \| undefined` does not satisfy an exact optional boolean. | Repaired with `?? false` in sibling and plugin creation; both checks rerun. | Explicit undefined assignments violate `exactOptionalPropertyTypes`. |
| Scoped lint passes | Initial lint reports `vitest/no-conditional-expect` at `Collapse.test.ts:72`, `:193`, and `:194`. | Repaired with unconditional assertions; final lint exits 0. | Assertions placed inside mode branches violate the test rule. |
| Browser project has only the permitted host-bound failures | `stage-b-b4-browser-a` exits 1 with 792 passed and 7 failed. The added accordion test reads 71.984375 px against 72 px at `Collapse.test.ts:255`. | Repaired the test to wait one rendering frame after completion and assert cleared slots before geometry. `collapse-d` passes 37; `browser-b` passes 793 with only the permitted 6 failures. | The comparison sampled the interpolation's final fractional frame before layout settled. |
| Completion geometry follows the brief's device-pixel tolerance | `stage-b-b4-collapse-c` exits 1 with 36 passed and 1 failed: the retained growth test compares 239.96875 px with 240 px by exact equality after the clearing-frame wait. | Repaired completion geometry assertions to use a difference below one device pixel; inline slot assertions remain exact. `collapse-d` passes 37 and all B4 cases pass in `browser-b`. Formatter required a line wrap; the final format check passes. | Final-frame interpolation rounding can remain below one device pixel even after the next rendering frame, which the brief's tolerance explicitly admits. |
| Chromium 141 can fail the host-bound titles listed by the brief | The browser run reports the listed config-popover-flip, perpendicular keyword, Popover scroll/transform, Placement departure-consumption, and Tip markup-placement failures. | Retained; these are outside B4's owned implementation and expressly permitted by the brief. | The host's Chromium 141 differs from the recorded Chromium 153 geometry and placement behavior. |

The unowned Surface-row repair, not applied, is:

```markdown
| `CollapsePluginOptions` | interface | Configures the native surfaces of every collapse a collapse plugin creates. |
```

The direct final gates cover these owned paths (including the unchanged barrel):

```text
/home/user/.wave/veneer-b4/src/browser/Collapse.ts
/home/user/.wave/veneer-b4/src/browser/types.ts
/home/user/.wave/veneer-b4/src/browser/plugins.ts
/home/user/.wave/veneer-b4/src/browser/index.ts
/home/user/.wave/veneer-b4/tests/src/browser/Collapse.test.ts
/home/user/.wave/veneer-b4/tests/src/browser/plugins.test.ts
/home/user/.wave/veneer-b4/tests/src/browser/helpers.test.ts
/home/user/.wave/veneer-b4/guides/veneer.md
```

The direct commands and results are:

| Command | Folder | Exit | Bare result |
| --- | --- | --- | --- |
| `/home/user/.wave/veneer-b4/node_modules/.bin/oxfmt --config /home/user/.wave/veneer-b4/.oxfmtrc.json --check` followed by the paths listed above | Direct, cwd `/home/user/.wave/veneer-b4` | 0 | All matched files use the correct format. Finished in 543ms on 8 files using 4 threads. |
| `/home/user/.wave/veneer-b4/node_modules/.bin/oxlint --config /home/user/.wave/veneer-b4/.oxlintrc.json --deny-warnings` followed by those paths | Direct, same cwd | 0 | No output. |
| `git -C /home/user/.wave/veneer-b4 diff --check` | Direct | 0 | No output. |
| `git -C /home/user/.wave/veneer-b4 status --porcelain` | Direct | 0 | Status reproduced above; owned paths only. |
| `node --experimental-strip-types /home/user/.wave/veneer-b4/tests/guides.test.ts` | Direct, cwd `/home/user/.wave/veneer-b4` | 1 | Test Files 1 failed (1); Tests 1 failed, 19 passed (20). Missing interface Surface row, as recorded above. |

Each queued gate's exact command, folder, exit, and unfiltered stdout/stderr follows. The `start.json` argv records the fully expanded PATH of the actual run. Every command used `flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder FOLDER --kind command --cwd /home/user/.wave/veneer-b4 --` followed by its recorded argv.

Gate folder: `/home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-gate141-a`.

start.json:

```text
{
  "timestamp": "2026-10-06T16:33:18.728Z",
  "argv": [
    "env",
    "PATH=/home/user/.wave/npm11/node_modules/.bin:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/opt/ruby-3.3.6/bin:/opt/rbenv/shims:/opt/rbenv/bin:/opt/node22/bin:/opt/maven/bin:/usr/lib/jvm/java-21-openjdk-amd64/bin:/opt/gradle/bin:/root/.bun/bin:/root/.codex/tmp/arg0/codex-arg0LZsdmo:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/root/.local/bin:/root/.cargo/bin:/usr/local/go/bin:/opt/node22/bin:/opt/maven/bin:/opt/gradle/bin:/opt/rbenv/bin:/root/.bun/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/root/.ccr/sessions/ffc8dbcaed7d035bd3355ea2e424a52d/bin",
    "/home/user/.wave/veneer-b4/node_modules/.bin/vitest",
    "run",
    "--config",
    "/home/user/.wave/veneer-b4/vite.config.ts",
    "--configLoader",
    "runner",
    "--no-cache",
    "--reporter=dot",
    "--project",
    "src:browser",
    "/home/user/.wave/veneer-b4/tests/src/browser/intrinsic.probe.test.ts"
  ],
  "cwd": "/home/user/.wave/veneer-b4",
  "category": "command",
  "browser": {
    "environment": {
      "PLAYWRIGHT_BROWSERS_PATH": "/opt/pw-browsers",
      "PLAYWRIGHT_EXECUTABLE_PATH": null,
      "PLAYWRIGHT_CHANNEL": null,
      "PLAYWRIGHT_WS_ENDPOINT": null
    },
    "bundled": "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "version": "Chromium 141.0.7390.37",
    "code": 0,
    "resolution": "Bundled fallback observation only; the Vitest resolver imports non-node packages and is not executed. Overrides and pinned Playwright may select another executable."
  }
}

```

end.json:

```text
{
  "timestamp": "2026-10-06T16:33:35.796Z",
  "seconds": 17.068,
  "child": {
    "code": 0,
    "signal": null
  },
  "exit": 0,
  "errors": []
}

```

stdout.log:

```text

 RUN  v4.1.11 /home/user/.wave/veneer-b4

stdout | tests/src/browser/intrinsic.probe.test.ts:7:1 > reads intrinsic growth and settled controls
INTRINSIC_READING {"version":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/141.0.0.0 Safari/537.36","growth":true,"backend":"on","late":195.96875,"completed":240,"dpr":1}
stdout | tests/src/browser/intrinsic.probe.test.ts:7:1 > reads intrinsic growth and settled controls
INTRINSIC_READING {"version":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/141.0.0.0 Safari/537.36","growth":true,"backend":"off","late":97.984375,"completed":240,"dpr":1}
stdout | tests/src/browser/intrinsic.probe.test.ts:7:1 > reads intrinsic growth and settled controls
INTRINSIC_READING {"version":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/141.0.0.0 Safari/537.36","growth":true,"backend":"bootstrap","late":97.984375,"completed":240,"dpr":1}
stdout | tests/src/browser/intrinsic.probe.test.ts:7:1 > reads intrinsic growth and settled controls
INTRINSIC_READING {"version":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/141.0.0.0 Safari/537.36","growth":false,"backend":"on","late":97.984375,"completed":120,"dpr":1}
stdout | tests/src/browser/intrinsic.probe.test.ts:7:1 > reads intrinsic growth and settled controls
INTRINSIC_READING {"version":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/141.0.0.0 Safari/537.36","growth":false,"backend":"off","late":98,"completed":120,"dpr":1}
stdout | tests/src/browser/intrinsic.probe.test.ts:7:1 > reads intrinsic growth and settled controls
INTRINSIC_READING {"version":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/141.0.0.0 Safari/537.36","growth":false,"backend":"bootstrap","late":97.984375,"completed":120,"dpr":1}
stdout | tests/src/browser/intrinsic.probe.test.ts:7:1 > reads intrinsic growth and settled controls
INTRINSIC_GATE {"growth":true,"control":true}
·

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  16:33:20
   Duration  15.26s (transform 0ms, setup 1.26s, import 182ms, tests 6.43s, environment 0ms)


```

stderr.log:

```text
<empty>

```


Gate folder: `/home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-gate153-a`.

start.json:

```text
{
  "timestamp": "2026-10-06T16:33:35.944Z",
  "argv": [
    "env",
    "PATH=/home/user/.wave/npm11/node_modules/.bin:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/opt/ruby-3.3.6/bin:/opt/rbenv/shims:/opt/rbenv/bin:/opt/node22/bin:/opt/maven/bin:/usr/lib/jvm/java-21-openjdk-amd64/bin:/opt/gradle/bin:/root/.bun/bin:/root/.codex/tmp/arg0/codex-arg0LZsdmo:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/root/.local/bin:/root/.cargo/bin:/usr/local/go/bin:/opt/node22/bin:/opt/maven/bin:/opt/gradle/bin:/opt/rbenv/bin:/root/.bun/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/root/.ccr/sessions/ffc8dbcaed7d035bd3355ea2e424a52d/bin",
    "PLAYWRIGHT_EXECUTABLE_PATH=/home/user/.wave/pw-153/chromium-1243/chrome-linux64/chrome",
    "/home/user/.wave/veneer-b4/node_modules/.bin/vitest",
    "run",
    "--config",
    "/home/user/.wave/veneer-b4/vite.config.ts",
    "--configLoader",
    "runner",
    "--no-cache",
    "--reporter=dot",
    "--project",
    "src:browser",
    "/home/user/.wave/veneer-b4/tests/src/browser/intrinsic.probe.test.ts"
  ],
  "cwd": "/home/user/.wave/veneer-b4",
  "category": "command",
  "browser": {
    "environment": {
      "PLAYWRIGHT_BROWSERS_PATH": "/opt/pw-browsers",
      "PLAYWRIGHT_EXECUTABLE_PATH": null,
      "PLAYWRIGHT_CHANNEL": null,
      "PLAYWRIGHT_WS_ENDPOINT": null
    },
    "bundled": "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "version": "Chromium 141.0.7390.37",
    "code": 0,
    "resolution": "Bundled fallback observation only; the Vitest resolver imports non-node packages and is not executed. Overrides and pinned Playwright may select another executable."
  }
}

```

end.json:

```text
{
  "timestamp": "2026-10-06T16:34:01.450Z",
  "seconds": 25.506,
  "child": {
    "code": 0,
    "signal": null
  },
  "exit": 0,
  "errors": []
}

```

stdout.log:

```text

 RUN  v4.1.11 /home/user/.wave/veneer-b4

stdout | tests/src/browser/intrinsic.probe.test.ts:7:1 > reads intrinsic growth and settled controls
INTRINSIC_READING {"version":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.0.0 Safari/537.36","growth":true,"backend":"on","late":192,"completed":240,"dpr":1}
stdout | tests/src/browser/intrinsic.probe.test.ts:7:1 > reads intrinsic growth and settled controls
INTRINSIC_READING {"version":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.0.0 Safari/537.36","growth":true,"backend":"off","late":95.984375,"completed":240,"dpr":1}
stdout | tests/src/browser/intrinsic.probe.test.ts:7:1 > reads intrinsic growth and settled controls
INTRINSIC_READING {"version":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.0.0 Safari/537.36","growth":true,"backend":"bootstrap","late":98,"completed":240,"dpr":1}
stdout | tests/src/browser/intrinsic.probe.test.ts:7:1 > reads intrinsic growth and settled controls
INTRINSIC_READING {"version":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.0.0 Safari/537.36","growth":false,"backend":"on","late":96,"completed":120,"dpr":1}
stdout | tests/src/browser/intrinsic.probe.test.ts:7:1 > reads intrinsic growth and settled controls
INTRINSIC_READING {"version":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.0.0 Safari/537.36","growth":false,"backend":"off","late":95.984375,"completed":120,"dpr":1}
stdout | tests/src/browser/intrinsic.probe.test.ts:7:1 > reads intrinsic growth and settled controls
INTRINSIC_READING {"version":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.0.0 Safari/537.36","growth":false,"backend":"bootstrap","late":97.96875,"completed":120,"dpr":1}
stdout | tests/src/browser/intrinsic.probe.test.ts:7:1 > reads intrinsic growth and settled controls
INTRINSIC_GATE {"growth":true,"control":true}
·

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  16:33:37
   Duration  23.47s (transform 0ms, setup 1.19s, import 186ms, tests 6.52s, environment 0ms)


```

stderr.log:

```text
<empty>

```


Gate folder: `/home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-types-browser-a`.

start.json:

```text
{
  "timestamp": "2026-10-06T16:38:06.880Z",
  "argv": [
    "env",
    "PATH=/home/user/.wave/npm11/node_modules/.bin:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/opt/ruby-3.3.6/bin:/opt/rbenv/shims:/opt/rbenv/bin:/opt/node22/bin:/opt/maven/bin:/usr/lib/jvm/java-21-openjdk-amd64/bin:/opt/gradle/bin:/root/.bun/bin:/root/.codex/tmp/arg0/codex-arg0LZsdmo:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/root/.local/bin:/root/.cargo/bin:/usr/local/go/bin:/opt/node22/bin:/opt/maven/bin:/opt/gradle/bin:/opt/rbenv/bin:/root/.bun/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/root/.ccr/sessions/ffc8dbcaed7d035bd3355ea2e424a52d/bin",
    "/home/user/.wave/veneer-b4/node_modules/.bin/tsc",
    "--noEmit",
    "-p",
    "/home/user/.wave/veneer-b4/configs/src/tsconfig.browser.json"
  ],
  "cwd": "/home/user/.wave/veneer-b4",
  "category": "command",
  "browser": {
    "environment": {
      "PLAYWRIGHT_BROWSERS_PATH": "/opt/pw-browsers",
      "PLAYWRIGHT_EXECUTABLE_PATH": null,
      "PLAYWRIGHT_CHANNEL": null,
      "PLAYWRIGHT_WS_ENDPOINT": null
    },
    "bundled": "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "version": "Chromium 141.0.7390.37",
    "code": 0,
    "resolution": "Bundled fallback observation only; the Vitest resolver imports non-node packages and is not executed. Overrides and pinned Playwright may select another executable."
  }
}

```

end.json:

```text
{
  "timestamp": "2026-10-06T16:38:10.078Z",
  "seconds": 3.198,
  "child": {
    "code": 2,
    "signal": null
  },
  "exit": 2,
  "errors": []
}

```

stdout.log:

```text
src/browser/Collapse.ts(115,45): error TS2379: Argument of type '{ toggle: false; intrinsic: boolean | undefined; }' is not assignable to parameter of type 'CollapseOptions' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
  Types of property 'intrinsic' are incompatible.
    Type 'boolean | undefined' is not assignable to type 'boolean'.
      Type 'undefined' is not assignable to type 'boolean'.
src/browser/plugins.ts(116,64): error TS2379: Argument of type '{ toggle: false; intrinsic: boolean | undefined; }' is not assignable to parameter of type 'CollapseOptions' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
  Types of property 'intrinsic' are incompatible.
    Type 'boolean | undefined' is not assignable to type 'boolean'.
      Type 'undefined' is not assignable to type 'boolean'.

```

stderr.log:

```text
<empty>

```


Gate folder: `/home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-types-root-a`.

start.json:

```text
{
  "timestamp": "2026-10-06T16:38:10.248Z",
  "argv": [
    "env",
    "PATH=/home/user/.wave/npm11/node_modules/.bin:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/opt/ruby-3.3.6/bin:/opt/rbenv/shims:/opt/rbenv/bin:/opt/node22/bin:/opt/maven/bin:/usr/lib/jvm/java-21-openjdk-amd64/bin:/opt/gradle/bin:/root/.bun/bin:/root/.codex/tmp/arg0/codex-arg0LZsdmo:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/root/.local/bin:/root/.cargo/bin:/usr/local/go/bin:/opt/node22/bin:/opt/maven/bin:/opt/gradle/bin:/opt/rbenv/bin:/root/.bun/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/root/.ccr/sessions/ffc8dbcaed7d035bd3355ea2e424a52d/bin",
    "/home/user/.wave/veneer-b4/node_modules/.bin/tsc",
    "--noEmit",
    "--project",
    "/home/user/.wave/veneer-b4/tsconfig.json"
  ],
  "cwd": "/home/user/.wave/veneer-b4",
  "category": "command",
  "browser": {
    "environment": {
      "PLAYWRIGHT_BROWSERS_PATH": "/opt/pw-browsers",
      "PLAYWRIGHT_EXECUTABLE_PATH": null,
      "PLAYWRIGHT_CHANNEL": null,
      "PLAYWRIGHT_WS_ENDPOINT": null
    },
    "bundled": "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "version": "Chromium 141.0.7390.37",
    "code": 0,
    "resolution": "Bundled fallback observation only; the Vitest resolver imports non-node packages and is not executed. Overrides and pinned Playwright may select another executable."
  }
}

```

end.json:

```text
{
  "timestamp": "2026-10-06T16:39:17.404Z",
  "seconds": 67.156,
  "child": {
    "code": 2,
    "signal": null
  },
  "exit": 2,
  "errors": []
}

```

stdout.log:

```text
src/browser/Collapse.ts(115,45): error TS2379: Argument of type '{ toggle: false; intrinsic: boolean | undefined; }' is not assignable to parameter of type 'CollapseOptions' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
  Types of property 'intrinsic' are incompatible.
    Type 'boolean | undefined' is not assignable to type 'boolean'.
      Type 'undefined' is not assignable to type 'boolean'.
src/browser/plugins.ts(116,64): error TS2379: Argument of type '{ toggle: false; intrinsic: boolean | undefined; }' is not assignable to parameter of type 'CollapseOptions' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
  Types of property 'intrinsic' are incompatible.
    Type 'boolean | undefined' is not assignable to type 'boolean'.
      Type 'undefined' is not assignable to type 'boolean'.

```

stderr.log:

```text
<empty>

```


Gate folder: `/home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-collapse-a`.

start.json:

```text
{
  "timestamp": "2026-10-06T16:37:34.249Z",
  "argv": [
    "env",
    "PATH=/home/user/.wave/npm11/node_modules/.bin:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/opt/ruby-3.3.6/bin:/opt/rbenv/shims:/opt/rbenv/bin:/opt/node22/bin:/opt/maven/bin:/usr/lib/jvm/java-21-openjdk-amd64/bin:/opt/gradle/bin:/root/.bun/bin:/root/.codex/tmp/arg0/codex-arg0LZsdmo:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/root/.local/bin:/root/.cargo/bin:/usr/local/go/bin:/opt/node22/bin:/opt/maven/bin:/opt/gradle/bin:/opt/rbenv/bin:/root/.bun/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/root/.ccr/sessions/ffc8dbcaed7d035bd3355ea2e424a52d/bin",
    "/home/user/.wave/veneer-b4/node_modules/.bin/vitest",
    "run",
    "--config",
    "/home/user/.wave/veneer-b4/vite.config.ts",
    "--configLoader",
    "runner",
    "--no-cache",
    "--reporter=dot",
    "--project",
    "src:browser",
    "/home/user/.wave/veneer-b4/tests/src/browser/Collapse.test.ts"
  ],
  "cwd": "/home/user/.wave/veneer-b4",
  "category": "command",
  "browser": {
    "environment": {
      "PLAYWRIGHT_BROWSERS_PATH": "/opt/pw-browsers",
      "PLAYWRIGHT_EXECUTABLE_PATH": null,
      "PLAYWRIGHT_CHANNEL": null,
      "PLAYWRIGHT_WS_ENDPOINT": null
    },
    "bundled": "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "version": "Chromium 141.0.7390.37",
    "code": 0,
    "resolution": "Bundled fallback observation only; the Vitest resolver imports non-node packages and is not executed. Overrides and pinned Playwright may select another executable."
  }
}

```

end.json:

```text
{
  "timestamp": "2026-10-06T16:38:06.706Z",
  "seconds": 32.457,
  "child": {
    "code": 0,
    "signal": null
  },
  "exit": 0,
  "errors": []
}

```

stdout.log:

```text

 RUN  v4.1.11 /home/user/.wave/veneer-b4

·····································

 Test Files  1 passed (1)
      Tests  37 passed (37)
   Start at  16:37:35
   Duration  30.54s (transform 0ms, setup 1.31s, import 360ms, tests 23.05s, environment 0ms)


```

stderr.log:

```text
<empty>

```


Gate folder: `/home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-plugins-a`.

start.json:

```text
{
  "timestamp": "2026-10-06T16:39:17.570Z",
  "argv": [
    "env",
    "PATH=/home/user/.wave/npm11/node_modules/.bin:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/opt/ruby-3.3.6/bin:/opt/rbenv/shims:/opt/rbenv/bin:/opt/node22/bin:/opt/maven/bin:/usr/lib/jvm/java-21-openjdk-amd64/bin:/opt/gradle/bin:/root/.bun/bin:/root/.codex/tmp/arg0/codex-arg0LZsdmo:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/root/.local/bin:/root/.cargo/bin:/usr/local/go/bin:/opt/node22/bin:/opt/maven/bin:/opt/gradle/bin:/opt/rbenv/bin:/root/.bun/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/root/.ccr/sessions/ffc8dbcaed7d035bd3355ea2e424a52d/bin",
    "/home/user/.wave/veneer-b4/node_modules/.bin/vitest",
    "run",
    "--config",
    "/home/user/.wave/veneer-b4/vite.config.ts",
    "--configLoader",
    "runner",
    "--no-cache",
    "--reporter=dot",
    "--project",
    "src:browser",
    "/home/user/.wave/veneer-b4/tests/src/browser/plugins.test.ts"
  ],
  "cwd": "/home/user/.wave/veneer-b4",
  "category": "command",
  "browser": {
    "environment": {
      "PLAYWRIGHT_BROWSERS_PATH": "/opt/pw-browsers",
      "PLAYWRIGHT_EXECUTABLE_PATH": null,
      "PLAYWRIGHT_CHANNEL": null,
      "PLAYWRIGHT_WS_ENDPOINT": null
    },
    "bundled": "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "version": "Chromium 141.0.7390.37",
    "code": 0,
    "resolution": "Bundled fallback observation only; the Vitest resolver imports non-node packages and is not executed. Overrides and pinned Playwright may select another executable."
  }
}

```

end.json:

```text
{
  "timestamp": "2026-10-06T16:39:34.913Z",
  "seconds": 17.343,
  "child": {
    "code": 0,
    "signal": null
  },
  "exit": 0,
  "errors": []
}

```

stdout.log:

```text

 RUN  v4.1.11 /home/user/.wave/veneer-b4

·······

 Test Files  1 passed (1)
      Tests  7 passed (7)
   Start at  16:39:19
   Duration  15.49s (transform 0ms, setup 1.14s, import 14ms, tests 41ms, environment 0ms)


```

stderr.log:

```text
<empty>

```


Gate folder: `/home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-helpers-a`.

start.json:

```text
{
  "timestamp": "2026-10-06T16:39:35.078Z",
  "argv": [
    "env",
    "PATH=/home/user/.wave/npm11/node_modules/.bin:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/opt/ruby-3.3.6/bin:/opt/rbenv/shims:/opt/rbenv/bin:/opt/node22/bin:/opt/maven/bin:/usr/lib/jvm/java-21-openjdk-amd64/bin:/opt/gradle/bin:/root/.bun/bin:/root/.codex/tmp/arg0/codex-arg0LZsdmo:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/root/.local/bin:/root/.cargo/bin:/usr/local/go/bin:/opt/node22/bin:/opt/maven/bin:/opt/gradle/bin:/opt/rbenv/bin:/root/.bun/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/root/.ccr/sessions/ffc8dbcaed7d035bd3355ea2e424a52d/bin",
    "/home/user/.wave/veneer-b4/node_modules/.bin/vitest",
    "run",
    "--config",
    "/home/user/.wave/veneer-b4/vite.config.ts",
    "--configLoader",
    "runner",
    "--no-cache",
    "--reporter=dot",
    "--project",
    "src:browser",
    "/home/user/.wave/veneer-b4/tests/src/browser/helpers.test.ts"
  ],
  "cwd": "/home/user/.wave/veneer-b4",
  "category": "command",
  "browser": {
    "environment": {
      "PLAYWRIGHT_BROWSERS_PATH": "/opt/pw-browsers",
      "PLAYWRIGHT_EXECUTABLE_PATH": null,
      "PLAYWRIGHT_CHANNEL": null,
      "PLAYWRIGHT_WS_ENDPOINT": null
    },
    "bundled": "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "version": "Chromium 141.0.7390.37",
    "code": 0,
    "resolution": "Bundled fallback observation only; the Vitest resolver imports non-node packages and is not executed. Overrides and pinned Playwright may select another executable."
  }
}

```

end.json:

```text
{
  "timestamp": "2026-10-06T16:39:46.965Z",
  "seconds": 11.887,
  "child": {
    "code": 0,
    "signal": null
  },
  "exit": 0,
  "errors": []
}

```

stdout.log:

```text

 RUN  v4.1.11 /home/user/.wave/veneer-b4

································stdout | tests/src/browser/helpers.test.ts:1170:2 > transition completion > observes CSS transitions synchronously after the write and bounds completion
{"measurement":"getAnimations-synchrony","synchronous":1,"elapsed":155.5,"duration":"0.15s","synthetic":0}
·········

 Test Files  1 passed (1)
      Tests  41 passed (41)
   Start at  16:39:37
   Duration  9.59s (transform 0ms, setup 1.09s, import 258ms, tests 1.04s, environment 0ms)


```

stderr.log:

```text
<empty>

```


Gate folder: `/home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-types-browser-b`.

start.json:

```text
{
  "timestamp": "2026-10-06T16:40:06.614Z",
  "argv": [
    "env",
    "PATH=/home/user/.wave/npm11/node_modules/.bin:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/opt/ruby-3.3.6/bin:/opt/rbenv/shims:/opt/rbenv/bin:/opt/node22/bin:/opt/maven/bin:/usr/lib/jvm/java-21-openjdk-amd64/bin:/opt/gradle/bin:/root/.bun/bin:/root/.codex/tmp/arg0/codex-arg0LZsdmo:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/root/.local/bin:/root/.cargo/bin:/usr/local/go/bin:/opt/node22/bin:/opt/maven/bin:/opt/gradle/bin:/opt/rbenv/bin:/root/.bun/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/root/.ccr/sessions/ffc8dbcaed7d035bd3355ea2e424a52d/bin",
    "/home/user/.wave/veneer-b4/node_modules/.bin/tsc",
    "--noEmit",
    "-p",
    "/home/user/.wave/veneer-b4/configs/src/tsconfig.browser.json"
  ],
  "cwd": "/home/user/.wave/veneer-b4",
  "category": "command",
  "browser": {
    "environment": {
      "PLAYWRIGHT_BROWSERS_PATH": "/opt/pw-browsers",
      "PLAYWRIGHT_EXECUTABLE_PATH": null,
      "PLAYWRIGHT_CHANNEL": null,
      "PLAYWRIGHT_WS_ENDPOINT": null
    },
    "bundled": "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "version": "Chromium 141.0.7390.37",
    "code": 0,
    "resolution": "Bundled fallback observation only; the Vitest resolver imports non-node packages and is not executed. Overrides and pinned Playwright may select another executable."
  }
}

```

end.json:

```text
{
  "timestamp": "2026-10-06T16:40:09.948Z",
  "seconds": 3.334,
  "child": {
    "code": 0,
    "signal": null
  },
  "exit": 0,
  "errors": []
}

```

stdout.log:

```text
<empty>

```

stderr.log:

```text
<empty>

```


Gate folder: `/home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-collapse-b`.

start.json:

```text
{
  "timestamp": "2026-10-06T16:40:10.116Z",
  "argv": [
    "env",
    "PATH=/home/user/.wave/npm11/node_modules/.bin:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/opt/ruby-3.3.6/bin:/opt/rbenv/shims:/opt/rbenv/bin:/opt/node22/bin:/opt/maven/bin:/usr/lib/jvm/java-21-openjdk-amd64/bin:/opt/gradle/bin:/root/.bun/bin:/root/.codex/tmp/arg0/codex-arg0LZsdmo:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/root/.local/bin:/root/.cargo/bin:/usr/local/go/bin:/opt/node22/bin:/opt/maven/bin:/opt/gradle/bin:/opt/rbenv/bin:/root/.bun/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/root/.ccr/sessions/ffc8dbcaed7d035bd3355ea2e424a52d/bin",
    "/home/user/.wave/veneer-b4/node_modules/.bin/vitest",
    "run",
    "--config",
    "/home/user/.wave/veneer-b4/vite.config.ts",
    "--configLoader",
    "runner",
    "--no-cache",
    "--reporter=dot",
    "--project",
    "src:browser",
    "/home/user/.wave/veneer-b4/tests/src/browser/Collapse.test.ts"
  ],
  "cwd": "/home/user/.wave/veneer-b4",
  "category": "command",
  "browser": {
    "environment": {
      "PLAYWRIGHT_BROWSERS_PATH": "/opt/pw-browsers",
      "PLAYWRIGHT_EXECUTABLE_PATH": null,
      "PLAYWRIGHT_CHANNEL": null,
      "PLAYWRIGHT_WS_ENDPOINT": null
    },
    "bundled": "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "version": "Chromium 141.0.7390.37",
    "code": 0,
    "resolution": "Bundled fallback observation only; the Vitest resolver imports non-node packages and is not executed. Overrides and pinned Playwright may select another executable."
  }
}

```

end.json:

```text
{
  "timestamp": "2026-10-06T16:40:49.341Z",
  "seconds": 39.225,
  "child": {
    "code": 0,
    "signal": null
  },
  "exit": 0,
  "errors": []
}

```

stdout.log:

```text

 RUN  v4.1.11 /home/user/.wave/veneer-b4

·····································

 Test Files  1 passed (1)
      Tests  37 passed (37)
   Start at  16:40:12
   Duration  37.04s (transform 0ms, setup 1.21s, import 224ms, tests 22.90s, environment 0ms)


```

stderr.log:

```text
<empty>

```


Gate folder: `/home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-plugins-b`.

start.json:

```text
{
  "timestamp": "2026-10-06T16:40:49.507Z",
  "argv": [
    "env",
    "PATH=/home/user/.wave/npm11/node_modules/.bin:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/opt/ruby-3.3.6/bin:/opt/rbenv/shims:/opt/rbenv/bin:/opt/node22/bin:/opt/maven/bin:/usr/lib/jvm/java-21-openjdk-amd64/bin:/opt/gradle/bin:/root/.bun/bin:/root/.codex/tmp/arg0/codex-arg0LZsdmo:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/root/.local/bin:/root/.cargo/bin:/usr/local/go/bin:/opt/node22/bin:/opt/maven/bin:/opt/gradle/bin:/opt/rbenv/bin:/root/.bun/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/root/.ccr/sessions/ffc8dbcaed7d035bd3355ea2e424a52d/bin",
    "/home/user/.wave/veneer-b4/node_modules/.bin/vitest",
    "run",
    "--config",
    "/home/user/.wave/veneer-b4/vite.config.ts",
    "--configLoader",
    "runner",
    "--no-cache",
    "--reporter=dot",
    "--project",
    "src:browser",
    "/home/user/.wave/veneer-b4/tests/src/browser/plugins.test.ts"
  ],
  "cwd": "/home/user/.wave/veneer-b4",
  "category": "command",
  "browser": {
    "environment": {
      "PLAYWRIGHT_BROWSERS_PATH": "/opt/pw-browsers",
      "PLAYWRIGHT_EXECUTABLE_PATH": null,
      "PLAYWRIGHT_CHANNEL": null,
      "PLAYWRIGHT_WS_ENDPOINT": null
    },
    "bundled": "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "version": "Chromium 141.0.7390.37",
    "code": 0,
    "resolution": "Bundled fallback observation only; the Vitest resolver imports non-node packages and is not executed. Overrides and pinned Playwright may select another executable."
  }
}

```

end.json:

```text
{
  "timestamp": "2026-10-06T16:41:03.430Z",
  "seconds": 13.923,
  "child": {
    "code": 0,
    "signal": null
  },
  "exit": 0,
  "errors": []
}

```

stdout.log:

```text

 RUN  v4.1.11 /home/user/.wave/veneer-b4

·······

 Test Files  1 passed (1)
      Tests  7 passed (7)
   Start at  16:40:51
   Duration  11.98s (transform 0ms, setup 1.21s, import 17ms, tests 43ms, environment 0ms)


```

stderr.log:

```text
<empty>

```


Gate folder: `/home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-types-root-b`.

start.json:

```text
{
  "timestamp": "2026-10-06T16:41:03.595Z",
  "argv": [
    "env",
    "PATH=/home/user/.wave/npm11/node_modules/.bin:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/opt/ruby-3.3.6/bin:/opt/rbenv/shims:/opt/rbenv/bin:/opt/node22/bin:/opt/maven/bin:/usr/lib/jvm/java-21-openjdk-amd64/bin:/opt/gradle/bin:/root/.bun/bin:/root/.codex/tmp/arg0/codex-arg0LZsdmo:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/root/.local/bin:/root/.cargo/bin:/usr/local/go/bin:/opt/node22/bin:/opt/maven/bin:/opt/gradle/bin:/opt/rbenv/bin:/root/.bun/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/root/.ccr/sessions/ffc8dbcaed7d035bd3355ea2e424a52d/bin",
    "/home/user/.wave/veneer-b4/node_modules/.bin/tsc",
    "--noEmit",
    "--project",
    "/home/user/.wave/veneer-b4/tsconfig.json"
  ],
  "cwd": "/home/user/.wave/veneer-b4",
  "category": "command",
  "browser": {
    "environment": {
      "PLAYWRIGHT_BROWSERS_PATH": "/opt/pw-browsers",
      "PLAYWRIGHT_EXECUTABLE_PATH": null,
      "PLAYWRIGHT_CHANNEL": null,
      "PLAYWRIGHT_WS_ENDPOINT": null
    },
    "bundled": "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "version": "Chromium 141.0.7390.37",
    "code": 0,
    "resolution": "Bundled fallback observation only; the Vitest resolver imports non-node packages and is not executed. Overrides and pinned Playwright may select another executable."
  }
}

```

end.json:

```text
{
  "timestamp": "2026-10-06T16:42:15.017Z",
  "seconds": 71.422,
  "child": {
    "code": 0,
    "signal": null
  },
  "exit": 0,
  "errors": []
}

```

stdout.log:

```text
<empty>

```

stderr.log:

```text
<empty>

```


Gate folder: `/home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-policy-a`.

start.json:

```text
{
  "timestamp": "2026-10-06T16:42:15.180Z",
  "argv": [
    "env",
    "PATH=/home/user/.wave/npm11/node_modules/.bin:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/opt/ruby-3.3.6/bin:/opt/rbenv/shims:/opt/rbenv/bin:/opt/node22/bin:/opt/maven/bin:/usr/lib/jvm/java-21-openjdk-amd64/bin:/opt/gradle/bin:/root/.bun/bin:/root/.codex/tmp/arg0/codex-arg0LZsdmo:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/root/.local/bin:/root/.cargo/bin:/usr/local/go/bin:/opt/node22/bin:/opt/maven/bin:/opt/gradle/bin:/opt/rbenv/bin:/root/.bun/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/root/.ccr/sessions/ffc8dbcaed7d035bd3355ea2e424a52d/bin",
    "/home/user/.wave/veneer-b4/node_modules/.bin/vitest",
    "run",
    "--config",
    "/home/user/.wave/veneer-b4/vite.config.ts",
    "--configLoader",
    "runner",
    "--no-cache",
    "--reporter=dot",
    "--project",
    "policy"
  ],
  "cwd": "/home/user/.wave/veneer-b4",
  "category": "command",
  "browser": {
    "environment": {
      "PLAYWRIGHT_BROWSERS_PATH": "/opt/pw-browsers",
      "PLAYWRIGHT_EXECUTABLE_PATH": null,
      "PLAYWRIGHT_CHANNEL": null,
      "PLAYWRIGHT_WS_ENDPOINT": null
    },
    "bundled": "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "version": "Chromium 141.0.7390.37",
    "code": 0,
    "resolution": "Bundled fallback observation only; the Vitest resolver imports non-node packages and is not executed. Overrides and pinned Playwright may select another executable."
  }
}

```

end.json:

```text
{
  "timestamp": "2026-10-06T16:42:21.393Z",
  "seconds": 6.213,
  "child": {
    "code": 0,
    "signal": null
  },
  "exit": 0,
  "errors": []
}

```

stdout.log:

```text

 RUN  v4.1.11 /home/user/.wave/veneer-b4

··············································································································-·········

 Test Files  1 passed (1)
      Tests  119 passed | 1 skipped (120)
   Start at  16:42:17
   Duration  4.04s (transform 418ms, setup 309ms, import 553ms, tests 2.93s, environment 0ms)


```

stderr.log:

```text
<empty>

```


Gate folder: `/home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-version153-a`.

start.json:

```text
{
  "timestamp": "2026-10-06T16:42:21.594Z",
  "argv": [
    "env",
    "PATH=/home/user/.wave/npm11/node_modules/.bin:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/opt/ruby-3.3.6/bin:/opt/rbenv/shims:/opt/rbenv/bin:/opt/node22/bin:/opt/maven/bin:/usr/lib/jvm/java-21-openjdk-amd64/bin:/opt/gradle/bin:/root/.bun/bin:/root/.codex/tmp/arg0/codex-arg0LZsdmo:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/root/.local/bin:/root/.cargo/bin:/usr/local/go/bin:/opt/node22/bin:/opt/maven/bin:/opt/gradle/bin:/opt/rbenv/bin:/root/.bun/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/root/.ccr/sessions/ffc8dbcaed7d035bd3355ea2e424a52d/bin",
    "/home/user/.wave/pw-153/chromium-1243/chrome-linux64/chrome",
    "--version"
  ],
  "cwd": "/home/user/.wave/veneer-b4",
  "category": "command",
  "browser": {
    "environment": {
      "PLAYWRIGHT_BROWSERS_PATH": "/opt/pw-browsers",
      "PLAYWRIGHT_EXECUTABLE_PATH": null,
      "PLAYWRIGHT_CHANNEL": null,
      "PLAYWRIGHT_WS_ENDPOINT": null
    },
    "bundled": "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "version": "Chromium 141.0.7390.37",
    "code": 0,
    "resolution": "Bundled fallback observation only; the Vitest resolver imports non-node packages and is not executed. Overrides and pinned Playwright may select another executable."
  }
}

```

end.json:

```text
{
  "timestamp": "2026-10-06T16:42:21.672Z",
  "seconds": 0.078,
  "child": {
    "code": 0,
    "signal": null
  },
  "exit": 0,
  "errors": []
}

```

stdout.log:

```text
Google Chrome for Testing 153.0.8010.12 

```

stderr.log:

```text
<empty>

```


Gate folder: `/home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-browser-a`.

start.json:

```text
{
  "timestamp": "2026-10-06T16:42:21.821Z",
  "argv": [
    "env",
    "PATH=/home/user/.wave/npm11/node_modules/.bin:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/opt/ruby-3.3.6/bin:/opt/rbenv/shims:/opt/rbenv/bin:/opt/node22/bin:/opt/maven/bin:/usr/lib/jvm/java-21-openjdk-amd64/bin:/opt/gradle/bin:/root/.bun/bin:/root/.codex/tmp/arg0/codex-arg0LZsdmo:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/root/.local/bin:/root/.cargo/bin:/usr/local/go/bin:/opt/node22/bin:/opt/maven/bin:/opt/gradle/bin:/opt/rbenv/bin:/root/.bun/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/root/.ccr/sessions/ffc8dbcaed7d035bd3355ea2e424a52d/bin",
    "/home/user/.wave/veneer-b4/node_modules/.bin/vitest",
    "run",
    "--config",
    "/home/user/.wave/veneer-b4/vite.config.ts",
    "--configLoader",
    "runner",
    "--no-cache",
    "--reporter=dot",
    "--project",
    "src:browser"
  ],
  "cwd": "/home/user/.wave/veneer-b4",
  "category": "command",
  "browser": {
    "environment": {
      "PLAYWRIGHT_BROWSERS_PATH": "/opt/pw-browsers",
      "PLAYWRIGHT_EXECUTABLE_PATH": null,
      "PLAYWRIGHT_CHANNEL": null,
      "PLAYWRIGHT_WS_ENDPOINT": null
    },
    "bundled": "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "version": "Chromium 141.0.7390.37",
    "code": 0,
    "resolution": "Bundled fallback observation only; the Vitest resolver imports non-node packages and is not executed. Overrides and pinned Playwright may select another executable."
  }
}

```

end.json:

```text
{
  "timestamp": "2026-10-06T16:45:47.160Z",
  "seconds": 205.339,
  "child": {
    "code": 1,
    "signal": null
  },
  "exit": 1,
  "errors": []
}

```

stdout.log:

```text

 RUN  v4.1.11 /home/user/.wave/veneer-b4

·····················································································x···································································································stdout | tests/src/browser/helpers.test.ts:1170:2 > transition completion > observes CSS transitions synchronously after the write and bounds completion
{"measurement":"getAnimations-synchrony","synchronous":1,"elapsed":158.10000000149012,"duration":"0.15s","synthetic":0}
···········································································································································x··········································stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'scaled'
{"name":"scaled","initial":{"box":{"x":155,"y":460,"width":240,"height":75,"right":395,"bottom":535},"placement":"bottom-start"},"expected":{"box":{"x":155,"y":460,"width":240,"height":75,"right":395,"bottom":535},"placement":"bottom-start"},"actual":{"box":{"x":155,"y":459,"width":240,"height":75,"right":395,"bottom":534},"placement":"bottom-start"},"area":"end span-end","style":"position-anchor: --vn-placement-19; position: fixed; translate: 0px -0.666667px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'offset-nan'
{"name":"offset-nan","initial":{"box":{"x":150,"y":338,"width":160,"height":50,"right":310,"bottom":388},"placement":"bottom-start"},"expected":{"box":{"x":150,"y":338,"width":160,"height":50,"right":310,"bottom":388},"placement":"bottom-start"},"actual":{"box":{"x":150,"y":338,"width":160,"height":50,"right":310,"bottom":388},"placement":"bottom-start"},"area":"end span-end","style":"position-anchor: --vn-placement-20; position: fixed; translate: 0px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-start-800-ltr'
{"name":"dropdown-start-800-ltr","initial":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"expected":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"actual":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"area":"end span-end","style":"position-anchor: --vn-placement-21; position: fixed; translate: 0px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-dropdown-menu-end-800-ltr'
{"name":"dropdown-dropdown-menu-end-800-ltr","initial":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"expected":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"actual":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"area":"end span-start","style":"position-anchor: --vn-placement-22; position: fixed; translate: 0px; position-area: block-end span-inline-start; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-dropdown-menu-lg-end-800-ltr'
{"name":"dropdown-dropdown-menu-lg-end-800-ltr","initial":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"expected":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"actual":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"area":"end span-end","style":"position-anchor: --vn-placement-23; position: fixed; translate: 0px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-dropdown-menu-lg-end-1100-ltr'
{"name":"dropdown-dropdown-menu-lg-end-1100-ltr","initial":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"expected":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"actual":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"area":"end span-start","style":"position-anchor: --vn-placement-24; position: fixed; translate: 0px; position-area: block-end span-inline-start; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-start-800-ltr'
{"name":"dropup-start-800-ltr","initial":{"box":{"x":150,"y":248,"width":160,"height":50,"right":310,"bottom":298},"placement":"top-start"},"expected":{"box":{"x":150,"y":248,"width":160,"height":50,"right":310,"bottom":298},"placement":"top-start"},"actual":{"box":{"x":150,"y":248,"width":160,"height":50,"right":310,"bottom":298},"placement":"top-start"},"area":"start span-end","style":"position-anchor: --vn-placement-25; position: fixed; translate: 0px; position-area: block-start span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 0px 0px 2px; width: 160px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-dropdown-menu-end-800-ltr'
{"name":"dropup-dropdown-menu-end-800-ltr","initial":{"box":{"x":86.53125,"y":248,"width":160,"height":50,"right":246.53125,"bottom":298},"placement":"top-end"},"expected":{"box":{"x":86.53125,"y":248,"width":160,"height":50,"right":246.53125,"bottom":298},"placement":"top-end"},"actual":{"box":{"x":86.53125,"y":248,"width":160,"height":50,"right":246.53125,"bottom":298},"placement":"top-end"},"area":"start span-start","style":"position-anchor: --vn-placement-26; position: fixed; translate: 0px; position-area: block-start span-inline-start; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 0px 0px 2px; width: 160px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-dropdown-menu-lg-end-800-ltr'
{"name":"dropup-dropdown-menu-lg-end-800-ltr","initial":{"box":{"x":150,"y":248,"width":160,"height":50,"right":310,"bottom":298},"placement":"top-start"},"expected":{"box":{"x":150,"y":248,"width":160,"height":50,"right":310,"bottom":298},"placement":"top-start"},"actual":{"box":{"x":150,"y":248,"width":160,"height":50,"right":310,"bottom":298},"placement":"top-start"},"area":"start span-end","style":"position-anchor: --vn-placement-27; position: fixed; translate: 0px; position-area: block-start span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-dropdown-menu-lg-end-1100-ltr'
{"name":"dropup-dropdown-menu-lg-end-1100-ltr","initial":{"box":{"x":86.53125,"y":248,"width":160,"height":50,"right":246.53125,"bottom":298},"placement":"top-end"},"expected":{"box":{"x":86.53125,"y":248,"width":160,"height":50,"right":246.53125,"bottom":298},"placement":"top-end"},"actual":{"box":{"x":86.53125,"y":248,"width":160,"height":50,"right":246.53125,"bottom":298},"placement":"top-end"},"area":"start span-start","style":"position-anchor: --vn-placement-28; position: fixed; translate: 0px; position-area: block-start span-inline-start; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropend-start-800-ltr'
{"name":"dropend-start-800-ltr","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end end","style":"position-anchor: --vn-placement-29; position: fixed; translate: 0px; position-area: span-block-end inline-end; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropend-dropdown-menu-end-800-ltr'
{"name":"dropend-dropdown-menu-end-800-ltr","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end end","style":"position-anchor: --vn-placement-30; position: fixed; translate: 0px; position-area: span-block-end inline-end; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropend-dropdown-menu-lg-end-800-ltr'
{"name":"dropend-dropdown-menu-lg-end-800-ltr","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end end","style":"position-anchor: --vn-placement-31; position: fixed; translate: 0px; position-area: span-block-end inline-end; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 0px 0px 2px; width: 160px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropend-dropdown-menu-lg-end-1100-ltr'
{"name":"dropend-dropdown-menu-lg-end-1100-ltr","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end end","style":"position-anchor: --vn-placement-32; position: fixed; translate: 0px; position-area: span-block-end inline-end; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 0px 0px 2px; width: 160px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropstart-start-800-ltr'
{"name":"dropstart-start-800-ltr","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end end","style":"position-anchor: --vn-placement-33; position: fixed; translate: 0px; position-area: span-block-end inline-start; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropstart-dropdown-menu-end-800-ltr'
{"name":"dropstart-dropdown-menu-end-800-ltr","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end end","style":"position-anchor: --vn-placement-34; position: fixed; translate: 0px; position-area: span-block-end inline-start; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropstart-dropdown-menu-lg-end-800-ltr'
{"name":"dropstart-dropdown-menu-lg-end-800-ltr","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end end","style":"position-anchor: --vn-placement-35; position: fixed; translate: 0px; position-area: span-block-end inline-start; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropstart-dropdown-menu-lg-end-1100-l…'
{"name":"dropstart-dropdown-menu-lg-end-1100-ltr","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end end","style":"position-anchor: --vn-placement-36; position: fixed; translate: 0px; position-area: span-block-end inline-start; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-center-start-800-ltr'
{"name":"dropup-center-start-800-ltr","initial":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"expected":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"actual":{"box":{"x":118.265625,"y":248,"width":160,"height":50,"right":278.265625,"bottom":298},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-37; position: fixed; translate: 0px; position-area: block-start; position-try-fallbacks: flip-block; inset: auto; margin: 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-center-dropdown-menu-end-800-l…'
{"name":"dropup-center-dropdown-menu-end-800-ltr","initial":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"expected":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"actual":{"box":{"x":118.265625,"y":248,"width":160,"height":50,"right":278.265625,"bottom":298},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-38; position: fixed; translate: 0px; position-area: block-start; position-try-fallbacks: flip-block; inset: auto; margin: 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-center-dropdown-menu-lg-end-80…'
{"name":"dropup-center-dropdown-menu-lg-end-800-ltr","initial":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"expected":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"actual":{"box":{"x":118.265625,"y":248,"width":160,"height":50,"right":278.265625,"bottom":298},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-39; position: fixed; translate: 0px; position-area: block-start; position-try-fallbacks: flip-block; inset: auto; margin: 0px 0px 2px; width: 160px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-center-dropdown-menu-lg-end-11…'
{"name":"dropup-center-dropdown-menu-lg-end-1100-ltr","initial":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"expected":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"actual":{"box":{"x":118.265625,"y":248,"width":160,"height":50,"right":278.265625,"bottom":298},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-40; position: fixed; translate: 0px; position-area: block-start; position-try-fallbacks: flip-block; inset: auto; margin: 0px 0px 2px; width: 160px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-center-start-800-ltr'
{"name":"dropdown-center-start-800-ltr","initial":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"expected":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"actual":{"box":{"x":118.265625,"y":340,"width":160,"height":50,"right":278.265625,"bottom":390},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-41; position: fixed; translate: 0px; position-area: block-end; position-try-fallbacks: flip-block; inset: auto; margin: 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-center-dropdown-menu-end-800…'
{"name":"dropdown-center-dropdown-menu-end-800-ltr","initial":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"expected":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"actual":{"box":{"x":118.265625,"y":340,"width":160,"height":50,"right":278.265625,"bottom":390},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-42; position: fixed; translate: 0px; position-area: block-end; position-try-fallbacks: flip-block; inset: auto; margin: 2px 0px 0px; width: 160px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-center-dropdown-menu-lg-end-…'
{"name":"dropdown-center-dropdown-menu-lg-end-800-ltr","initial":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"expected":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"actual":{"box":{"x":118.265625,"y":340,"width":160,"height":50,"right":278.265625,"bottom":390},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-43; position: fixed; translate: 0px; position-area: block-end; position-try-fallbacks: flip-block; inset: auto; margin: 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-center-dropdown-menu-lg-end-…'
{"name":"dropdown-center-dropdown-menu-lg-end-1100-ltr","initial":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"expected":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"actual":{"box":{"x":118.265625,"y":340,"width":160,"height":50,"right":278.265625,"bottom":390},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-44; position: fixed; translate: 0px; position-area: block-end; position-try-fallbacks: flip-block; inset: auto; margin: 2px 0px 0px; width: 160px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-start-800-rtl'
{"name":"dropdown-start-800-rtl","initial":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"expected":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"actual":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"area":"end span-end","style":"position-anchor: --vn-placement-45; position: fixed; translate: 0px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-dropdown-menu-end-800-rtl'
{"name":"dropdown-dropdown-menu-end-800-rtl","initial":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"expected":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"actual":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"area":"end span-start","style":"position-anchor: --vn-placement-46; position: fixed; translate: 0px; position-area: block-end span-inline-start; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-dropdown-menu-lg-end-800-rtl'
{"name":"dropdown-dropdown-menu-lg-end-800-rtl","initial":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"expected":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"actual":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"area":"end span-end","style":"position-anchor: --vn-placement-47; position: fixed; translate: 0px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-dropdown-menu-lg-end-1100-rtl'
{"name":"dropdown-dropdown-menu-lg-end-1100-rtl","initial":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"expected":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"actual":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"area":"end span-start","style":"position-anchor: --vn-placement-48; position: fixed; translate: 0px; position-area: block-end span-inline-start; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-start-800-rtl'
{"name":"dropup-start-800-rtl","initial":{"box":{"x":86.53125,"y":248,"width":160,"height":50,"right":246.53125,"bottom":298},"placement":"top-end"},"expected":{"box":{"x":86.53125,"y":248,"width":160,"height":50,"right":246.53125,"bottom":298},"placement":"top-end"},"actual":{"box":{"x":86.53125,"y":248,"width":160,"height":50,"right":246.53125,"bottom":298},"placement":"top-end"},"area":"start span-end","style":"position-anchor: --vn-placement-49; position: fixed; translate: 0px; position-area: block-start span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 0px 0px 2px; width: 160px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-dropdown-menu-end-800-rtl'
{"name":"dropup-dropdown-menu-end-800-rtl","initial":{"box":{"x":150,"y":248,"width":160,"height":50,"right":310,"bottom":298},"placement":"top-start"},"expected":{"box":{"x":150,"y":248,"width":160,"height":50,"right":310,"bottom":298},"placement":"top-start"},"actual":{"box":{"x":150,"y":248,"width":160,"height":50,"right":310,"bottom":298},"placement":"top-start"},"area":"start span-start","style":"position-anchor: --vn-placement-50; position: fixed; translate: 0px; position-area: block-start span-inline-start; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-dropdown-menu-lg-end-800-rtl'
{"name":"dropup-dropdown-menu-lg-end-800-rtl","initial":{"box":{"x":86.53125,"y":248,"width":160,"height":50,"right":246.53125,"bottom":298},"placement":"top-end"},"expected":{"box":{"x":86.53125,"y":248,"width":160,"height":50,"right":246.53125,"bottom":298},"placement":"top-end"},"actual":{"box":{"x":86.53125,"y":248,"width":160,"height":50,"right":246.53125,"bottom":298},"placement":"top-end"},"area":"start span-end","style":"position-anchor: --vn-placement-51; position: fixed; translate: 0px; position-area: block-start span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-dropdown-menu-lg-end-1100-rtl'
{"name":"dropup-dropdown-menu-lg-end-1100-rtl","initial":{"box":{"x":150,"y":248,"width":160,"height":50,"right":310,"bottom":298},"placement":"top-start"},"expected":{"box":{"x":150,"y":248,"width":160,"height":50,"right":310,"bottom":298},"placement":"top-start"},"actual":{"box":{"x":150,"y":248,"width":160,"height":50,"right":310,"bottom":298},"placement":"top-start"},"area":"start span-start","style":"position-anchor: --vn-placement-52; position: fixed; translate: 0px; position-area: block-start span-inline-start; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropend-start-800-rtl'
{"name":"dropend-start-800-rtl","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end start","style":"position-anchor: --vn-placement-53; position: fixed; translate: 0px; position-area: span-block-end inline-end; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropend-dropdown-menu-end-800-rtl'
{"name":"dropend-dropdown-menu-end-800-rtl","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end start","style":"position-anchor: --vn-placement-54; position: fixed; translate: 0px; position-area: span-block-end inline-end; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropend-dropdown-menu-lg-end-800-rtl'
{"name":"dropend-dropdown-menu-lg-end-800-rtl","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end start","style":"position-anchor: --vn-placement-55; position: fixed; translate: 0px; position-area: span-block-end inline-end; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropend-dropdown-menu-lg-end-1100-rtl'
{"name":"dropend-dropdown-menu-lg-end-1100-rtl","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end start","style":"position-anchor: --vn-placement-56; position: fixed; translate: 0px; position-area: span-block-end inline-end; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropstart-start-800-rtl'
{"name":"dropstart-start-800-rtl","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end start","style":"position-anchor: --vn-placement-57; position: fixed; translate: 0px; position-area: span-block-end inline-start; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 0px 0px 2px; width: 160px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropstart-dropdown-menu-end-800-rtl'
{"name":"dropstart-dropdown-menu-end-800-rtl","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end start","style":"position-anchor: --vn-placement-58; position: fixed; translate: 0px; position-area: span-block-end inline-start; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 0px 0px 2px; width: 160px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropstart-dropdown-menu-lg-end-800-rtl'
{"name":"dropstart-dropdown-menu-lg-end-800-rtl","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end start","style":"position-anchor: --vn-placement-59; position: fixed; translate: 0px; position-area: span-block-end inline-start; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropstart-dropdown-menu-lg-end-1100-r…'
{"name":"dropstart-dropdown-menu-lg-end-1100-rtl","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end start","style":"position-anchor: --vn-placement-60; position: fixed; translate: 0px; position-area: span-block-end inline-start; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-center-start-800-rtl'
{"name":"dropup-center-start-800-rtl","initial":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"expected":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"actual":{"box":{"x":118.265625,"y":248,"width":160,"height":50,"right":278.265625,"bottom":298},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-61; position: fixed; translate: 0px; position-area: block-start; position-try-fallbacks: flip-block; inset: auto; margin: 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-center-dropdown-menu-end-800-r…'
{"name":"dropup-center-dropdown-menu-end-800-rtl","initial":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"expected":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"actual":{"box":{"x":118.265625,"y":248,"width":160,"height":50,"right":278.265625,"bottom":298},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-62; position: fixed; translate: 0px; position-area: block-start; position-try-fallbacks: flip-block; inset: auto; margin: 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-center-dropdown-menu-lg-end-80…'
{"name":"dropup-center-dropdown-menu-lg-end-800-rtl","initial":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"expected":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"actual":{"box":{"x":118.265625,"y":248,"width":160,"height":50,"right":278.265625,"bottom":298},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-63; position: fixed; translate: 0px; position-area: block-start; position-try-fallbacks: flip-block; inset: auto; margin: 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-center-dropdown-menu-lg-end-11…'
{"name":"dropup-center-dropdown-menu-lg-end-1100-rtl","initial":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"expected":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"actual":{"box":{"x":118.265625,"y":248,"width":160,"height":50,"right":278.265625,"bottom":298},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-64; position: fixed; translate: 0px; position-area: block-start; position-try-fallbacks: flip-block; inset: auto; margin: 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-center-start-800-rtl'
{"name":"dropdown-center-start-800-rtl","initial":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"expected":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"actual":{"box":{"x":118.265625,"y":340,"width":160,"height":50,"right":278.265625,"bottom":390},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-65; position: fixed; translate: 0px; position-area: block-end; position-try-fallbacks: flip-block; inset: auto; margin: 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-center-dropdown-menu-end-800…'
{"name":"dropdown-center-dropdown-menu-end-800-rtl","initial":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"expected":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"actual":{"box":{"x":118.265625,"y":340,"width":160,"height":50,"right":278.265625,"bottom":390},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-66; position: fixed; translate: 0px; position-area: block-end; position-try-fallbacks: flip-block; inset: auto; margin: 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-center-dropdown-menu-lg-end-…'
{"name":"dropdown-center-dropdown-menu-lg-end-800-rtl","initial":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"expected":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"actual":{"box":{"x":118.265625,"y":340,"width":160,"height":50,"right":278.265625,"bottom":390},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-67; position: fixed; translate: 0px; position-area: block-end; position-try-fallbacks: flip-block; inset: auto; margin: 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-center-dropdown-menu-lg-end-…'
{"name":"dropdown-center-dropdown-menu-lg-end-1100-rtl","initial":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"expected":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"actual":{"box":{"x":118.265625,"y":340,"width":160,"height":50,"right":278.265625,"bottom":390},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-68; position: fixed; translate: 0px; position-area: block-end; position-try-fallbacks: flip-block; inset: auto; margin: 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-top-center-ltr'
{"name":"Tooltip-top-center-ltr","initial":{"box":{"x":113,"y":265,"width":157.203125,"height":29,"right":270.203125,"bottom":294},"arrow":{"x":185,"y":294,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":300.390625},"placement":"top"},"expected":{"box":{"x":113,"y":265,"width":157.203125,"height":29,"right":270.203125,"bottom":294},"arrow":{"x":185,"y":294,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":300.390625},"placement":"top"},"actual":{"box":{"x":112.40625,"y":265,"width":157.1875,"height":29,"right":269.59375,"bottom":294},"arrow":{"x":184.40625,"y":294,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":300.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-69; position: fixed; translate: -16px 265px; position-area: block-start; position-try-fallbacks: --vn-placement-69-1, flip-block, --vn-placement-69-3; inset: auto; margin: 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-top-top-ltr'
{"name":"Tooltip-top-top-ltr","initial":{"box":{"x":238,"y":7,"width":157.203125,"height":29,"right":395.203125,"bottom":36},"arrow":{"x":231.609375,"y":15,"width":6.390625,"height":12.796875,"right":238,"bottom":27.796875},"placement":"right"},"expected":{"box":{"x":238,"y":7,"width":157.203125,"height":29,"right":395.203125,"bottom":36},"arrow":{"x":231.609375,"y":15,"width":6.390625,"height":12.796875,"right":238,"bottom":27.796875},"placement":"right"},"actual":{"box":{"x":238,"y":6.5,"width":157.1875,"height":29,"right":395.1875,"bottom":35.5},"arrow":{"x":231.609375,"y":14.5,"width":6.390625,"height":12.796875,"right":238,"bottom":27.296875},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-70; position: fixed; translate: 232px -427px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-top-right-ltr'
{"name":"Tooltip-top-right-ltr","initial":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"expected":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"actual":{"box":{"x":161,"y":304.5,"width":157.1875,"height":29,"right":318.1875,"bottom":333.5},"arrow":{"x":318.1875,"y":312.5,"width":6.390625,"height":12.796875,"right":324.578125,"bottom":325.296875},"placement":"left"},"area":"inline-start","style":"position-anchor: --vn-placement-71; position: fixed; translate: 161px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 6px 0px 0px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-top-bottom-ltr'
{"name":"Tooltip-top-bottom-ltr","initial":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"expected":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"actual":{"box":{"x":112.40625,"y":821,"width":157.1875,"height":29,"right":269.59375,"bottom":850},"arrow":{"x":184.40625,"y":850,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":856.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-72; position: fixed; translate: -16px 821px; position-area: block-start; position-try-fallbacks: --vn-placement-72-1, flip-block, --vn-placement-72-3; inset: auto; margin: 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-top-left-ltr'
{"name":"Tooltip-top-left-ltr","initial":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"expected":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"actual":{"box":{"x":90,"y":304.5,"width":157.1875,"height":29,"right":247.1875,"bottom":333.5},"arrow":{"x":83.609375,"y":312.5,"width":6.390625,"height":12.796875,"right":90,"bottom":325.296875},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-73; position: fixed; translate: 84px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-right-center-ltr'
{"name":"Tooltip-right-center-ltr","initial":{"box":{"x":238,"y":305,"width":157.203125,"height":29,"right":395.203125,"bottom":334},"arrow":{"x":231.609375,"y":313,"width":6.390625,"height":12.796875,"right":238,"bottom":325.796875},"placement":"right"},"expected":{"box":{"x":238,"y":305,"width":157.203125,"height":29,"right":395.203125,"bottom":334},"arrow":{"x":231.609375,"y":313,"width":6.390625,"height":12.796875,"right":238,"bottom":325.796875},"placement":"right"},"actual":{"box":{"x":238,"y":304.5,"width":157.1875,"height":29,"right":395.1875,"bottom":333.5},"arrow":{"x":231.609375,"y":312.5,"width":6.390625,"height":12.796875,"right":238,"bottom":325.296875},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-74; position: fixed; translate: 232px -129px; position-area: inline-end; position-try-fallbacks: --vn-placement-74-0, --vn-placement-74-2, flip-inline; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-right-top-ltr'
{"name":"Tooltip-right-top-ltr","initial":{"box":{"x":238,"y":7,"width":157.203125,"height":29,"right":395.203125,"bottom":36},"arrow":{"x":231.609375,"y":15,"width":6.390625,"height":12.796875,"right":238,"bottom":27.796875},"placement":"right"},"expected":{"box":{"x":238,"y":7,"width":157.203125,"height":29,"right":395.203125,"bottom":36},"arrow":{"x":231.609375,"y":15,"width":6.390625,"height":12.796875,"right":238,"bottom":27.796875},"placement":"right"},"actual":{"box":{"x":238,"y":6.5,"width":157.1875,"height":29,"right":395.1875,"bottom":35.5},"arrow":{"x":231.609375,"y":14.5,"width":6.390625,"height":12.796875,"right":238,"bottom":27.296875},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-75; position: fixed; translate: 232px -427px; position-area: inline-end; position-try-fallbacks: --vn-placement-75-0, --vn-placement-75-2, flip-inline; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-right-right-ltr'
{"name":"Tooltip-right-right-ltr","initial":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"expected":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"actual":{"box":{"x":161,"y":304.5,"width":157.1875,"height":29,"right":318.1875,"bottom":333.5},"arrow":{"x":318.1875,"y":312.5,"width":6.390625,"height":12.796875,"right":324.578125,"bottom":325.296875},"placement":"left"},"area":"inline-start","style":"position-anchor: --vn-placement-76; position: fixed; translate: 161px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 6px 0px 0px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-right-bottom-ltr'
{"name":"Tooltip-right-bottom-ltr","initial":{"box":{"x":238,"y":861,"width":157.203125,"height":29,"right":395.203125,"bottom":890},"arrow":{"x":231.609375,"y":869,"width":6.390625,"height":12.796875,"right":238,"bottom":881.796875},"placement":"right"},"expected":{"box":{"x":238,"y":861,"width":157.203125,"height":29,"right":395.203125,"bottom":890},"arrow":{"x":231.609375,"y":869,"width":6.390625,"height":12.796875,"right":238,"bottom":881.796875},"placement":"right"},"actual":{"box":{"x":238,"y":860.5,"width":157.1875,"height":29,"right":395.1875,"bottom":889.5},"arrow":{"x":231.609375,"y":868.5,"width":6.390625,"height":12.796875,"right":238,"bottom":881.296875},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-77; position: fixed; translate: 232px 427px; position-area: inline-end; position-try-fallbacks: --vn-placement-77-0, --vn-placement-77-2, flip-inline; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-right-left-ltr'
{"name":"Tooltip-right-left-ltr","initial":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"expected":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"actual":{"box":{"x":90,"y":304.5,"width":157.1875,"height":29,"right":247.1875,"bottom":333.5},"arrow":{"x":83.609375,"y":312.5,"width":6.390625,"height":12.796875,"right":90,"bottom":325.296875},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-78; position: fixed; translate: 84px -129px; position-area: inline-end; position-try-fallbacks: --vn-placement-78-0, --vn-placement-78-2, flip-inline; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-bottom-center-ltr'
{"name":"Tooltip-bottom-center-ltr","initial":{"box":{"x":113,"y":344,"width":157.203125,"height":29,"right":270.203125,"bottom":373},"arrow":{"x":185,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":344},"placement":"bottom"},"expected":{"box":{"x":113,"y":344,"width":157.203125,"height":29,"right":270.203125,"bottom":373},"arrow":{"x":185,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":344},"placement":"bottom"},"actual":{"box":{"x":112.40625,"y":344,"width":157.1875,"height":29,"right":269.59375,"bottom":373},"arrow":{"x":184.40625,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":344},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-79; position: fixed; translate: -16px 338px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-79-1, --vn-placement-79-3; inset: auto; margin: 6px 0px 0px; width: 157.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-bottom-top-ltr'
{"name":"Tooltip-bottom-top-ltr","initial":{"box":{"x":113,"y":46,"width":157.203125,"height":29,"right":270.203125,"bottom":75},"arrow":{"x":185,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":46},"placement":"bottom"},"expected":{"box":{"x":113,"y":46,"width":157.203125,"height":29,"right":270.203125,"bottom":75},"arrow":{"x":185,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":46},"placement":"bottom"},"actual":{"box":{"x":112.40625,"y":46,"width":157.1875,"height":29,"right":269.59375,"bottom":75},"arrow":{"x":184.40625,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":46},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-80; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-80-1, --vn-placement-80-3; inset: auto; margin: 6px 0px 0px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-bottom-right-ltr'
{"name":"Tooltip-bottom-right-ltr","initial":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"expected":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"actual":{"box":{"x":161,"y":304.5,"width":157.1875,"height":29,"right":318.1875,"bottom":333.5},"arrow":{"x":318.1875,"y":312.5,"width":6.390625,"height":12.796875,"right":324.578125,"bottom":325.296875},"placement":"left"},"area":"inline-start","style":"position-anchor: --vn-placement-81; position: fixed; translate: 161px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 6px 0px 0px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-bottom-bottom-ltr'
{"name":"Tooltip-bottom-bottom-ltr","initial":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"expected":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"actual":{"box":{"x":112.40625,"y":821,"width":157.1875,"height":29,"right":269.59375,"bottom":850},"arrow":{"x":184.40625,"y":850,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":856.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-82; position: fixed; translate: -16px 821px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-bottom-left-ltr'
{"name":"Tooltip-bottom-left-ltr","initial":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"expected":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"actual":{"box":{"x":90,"y":304.5,"width":157.1875,"height":29,"right":247.1875,"bottom":333.5},"arrow":{"x":83.609375,"y":312.5,"width":6.390625,"height":12.796875,"right":90,"bottom":325.296875},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-83; position: fixed; translate: 84px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-left-center-ltr'
{"name":"Tooltip-left-center-ltr","initial":{"box":{"x":113,"y":265,"width":157.203125,"height":29,"right":270.203125,"bottom":294},"arrow":{"x":185,"y":294,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":300.390625},"placement":"top"},"expected":{"box":{"x":113,"y":265,"width":157.203125,"height":29,"right":270.203125,"bottom":294},"arrow":{"x":185,"y":294,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":300.390625},"placement":"top"},"actual":{"box":{"x":112.40625,"y":265,"width":157.1875,"height":29,"right":269.59375,"bottom":294},"arrow":{"x":184.40625,"y":294,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":300.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-84; position: fixed; translate: -16px 265px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 6px; width: 157.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-left-top-ltr'
{"name":"Tooltip-left-top-ltr","initial":{"box":{"x":238,"y":7,"width":157.203125,"height":29,"right":395.203125,"bottom":36},"arrow":{"x":231.609375,"y":15,"width":6.390625,"height":12.796875,"right":238,"bottom":27.796875},"placement":"right"},"expected":{"box":{"x":238,"y":7,"width":157.203125,"height":29,"right":395.203125,"bottom":36},"arrow":{"x":231.609375,"y":15,"width":6.390625,"height":12.796875,"right":238,"bottom":27.796875},"placement":"right"},"actual":{"box":{"x":238,"y":6.5,"width":157.1875,"height":29,"right":395.1875,"bottom":35.5},"arrow":{"x":231.609375,"y":14.5,"width":6.390625,"height":12.796875,"right":238,"bottom":27.296875},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-85; position: fixed; translate: 232px -427px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-left-right-ltr'
{"name":"Tooltip-left-right-ltr","initial":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"expected":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"actual":{"box":{"x":161,"y":304.5,"width":157.1875,"height":29,"right":318.1875,"bottom":333.5},"arrow":{"x":318.1875,"y":312.5,"width":6.390625,"height":12.796875,"right":324.578125,"bottom":325.296875},"placement":"left"},"area":"inline-start","style":"position-anchor: --vn-placement-86; position: fixed; translate: 161px -129px; position-area: inline-start; position-try-fallbacks: --vn-placement-86-0, flip-inline, --vn-placement-86-2; inset: auto; margin: 0px 6px 0px 0px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-left-bottom-ltr'
{"name":"Tooltip-left-bottom-ltr","initial":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"expected":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"actual":{"box":{"x":112.40625,"y":821,"width":157.1875,"height":29,"right":269.59375,"bottom":850},"arrow":{"x":184.40625,"y":850,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":856.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-87; position: fixed; translate: -16px 821px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-left-left-ltr'
{"name":"Tooltip-left-left-ltr","initial":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"expected":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"actual":{"box":{"x":90,"y":304.5,"width":157.1875,"height":29,"right":247.1875,"bottom":333.5},"arrow":{"x":83.609375,"y":312.5,"width":6.390625,"height":12.796875,"right":90,"bottom":325.296875},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-88; position: fixed; translate: 84px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-auto-center-ltr'
{"name":"Tooltip-auto-center-ltr","initial":{"box":{"x":113,"y":344,"width":157.203125,"height":29,"right":270.203125,"bottom":373},"arrow":{"x":185,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":344},"placement":"bottom"},"expected":{"box":{"x":113,"y":344,"width":157.203125,"height":29,"right":270.203125,"bottom":373},"arrow":{"x":185,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":344},"placement":"bottom"},"actual":{"box":{"x":112.40625,"y":344,"width":157.1875,"height":29,"right":269.59375,"bottom":373},"arrow":{"x":184.40625,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":344},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-89; position: fixed; translate: -16px 338px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-89-1, --vn-placement-89-3; inset: auto; margin: 6px 0px 0px; width: 157.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-auto-top-ltr'
{"name":"Tooltip-auto-top-ltr","initial":{"box":{"x":113,"y":46,"width":157.203125,"height":29,"right":270.203125,"bottom":75},"arrow":{"x":185,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":46},"placement":"bottom"},"expected":{"box":{"x":113,"y":46,"width":157.203125,"height":29,"right":270.203125,"bottom":75},"arrow":{"x":185,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":46},"placement":"bottom"},"actual":{"box":{"x":112.40625,"y":46,"width":157.1875,"height":29,"right":269.59375,"bottom":75},"arrow":{"x":184.40625,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":46},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-90; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-90-1, --vn-placement-90-3; inset: auto; margin: 6px 0px 0px; width: 157.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-auto-right-ltr'
{"name":"Tooltip-auto-right-ltr","initial":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"expected":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"actual":{"box":{"x":161,"y":304.5,"width":157.1875,"height":29,"right":318.1875,"bottom":333.5},"arrow":{"x":318.1875,"y":312.5,"width":6.390625,"height":12.796875,"right":324.578125,"bottom":325.296875},"placement":"left"},"area":"inline-start","style":"position-anchor: --vn-placement-91; position: fixed; translate: 161px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 6px 0px 0px; width: 157.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-auto-bottom-ltr'
{"name":"Tooltip-auto-bottom-ltr","initial":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"expected":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"actual":{"box":{"x":112.40625,"y":821,"width":157.1875,"height":29,"right":269.59375,"bottom":850},"arrow":{"x":184.40625,"y":850,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":856.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-92; position: fixed; translate: -16px 821px; position-area: block-start; position-try-fallbacks: --vn-placement-92-1, flip-block, --vn-placement-92-3; inset: auto; margin: 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-auto-left-ltr'
{"name":"Tooltip-auto-left-ltr","initial":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"expected":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"actual":{"box":{"x":90,"y":304.5,"width":157.1875,"height":29,"right":247.1875,"bottom":333.5},"arrow":{"x":83.609375,"y":312.5,"width":6.390625,"height":12.796875,"right":90,"bottom":325.296875},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-93; position: fixed; translate: 84px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-top-center-rtl'
{"name":"Tooltip-top-center-rtl","initial":{"box":{"x":113,"y":265,"width":157.203125,"height":29,"right":270.203125,"bottom":294},"arrow":{"x":185,"y":294,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":300.390625},"placement":"top"},"expected":{"box":{"x":113,"y":265,"width":157.203125,"height":29,"right":270.203125,"bottom":294},"arrow":{"x":185,"y":294,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":300.390625},"placement":"top"},"actual":{"box":{"x":112.40625,"y":265,"width":157.1875,"height":29,"right":269.59375,"bottom":294},"arrow":{"x":184.40625,"y":294,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":300.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-94; position: fixed; translate: -16px 265px; position-area: block-start; position-try-fallbacks: --vn-placement-94-1, flip-block, --vn-placement-94-3; inset: auto; margin: 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-top-top-rtl'
{"name":"Tooltip-top-top-rtl","initial":{"box":{"x":238,"y":7,"width":157.203125,"height":29,"right":395.203125,"bottom":36},"arrow":{"x":231.609375,"y":15,"width":6.390625,"height":12.796875,"right":238,"bottom":27.796875},"placement":"right"},"expected":{"box":{"x":238,"y":7,"width":157.203125,"height":29,"right":395.203125,"bottom":36},"arrow":{"x":231.609375,"y":15,"width":6.390625,"height":12.796875,"right":238,"bottom":27.796875},"placement":"right"},"actual":{"box":{"x":238.8125,"y":6.5,"width":157.1875,"height":29,"right":396,"bottom":35.5},"arrow":{"x":232.421875,"y":14.5,"width":6.390625,"height":12.796875,"right":238.8125,"bottom":27.296875},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-95; position: fixed; translate: -18px -427px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-top-right-rtl'
{"name":"Tooltip-top-right-rtl","initial":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"expected":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"actual":{"box":{"x":160.8125,"y":304.5,"width":157.1875,"height":29,"right":318,"bottom":333.5},"arrow":{"x":318,"y":312.5,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.296875},"placement":"left"},"area":"inline-end","style":"position-anchor: --vn-placement-96; position: fixed; translate: -90px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 6px 0px 0px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-top-bottom-rtl'
{"name":"Tooltip-top-bottom-rtl","initial":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"expected":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"actual":{"box":{"x":112.40625,"y":821,"width":157.1875,"height":29,"right":269.59375,"bottom":850},"arrow":{"x":184.40625,"y":850,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":856.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-97; position: fixed; translate: -16px 821px; position-area: block-start; position-try-fallbacks: --vn-placement-97-1, flip-block, --vn-placement-97-3; inset: auto; margin: 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-top-left-rtl'
{"name":"Tooltip-top-left-rtl","initial":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"expected":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"actual":{"box":{"x":90.8125,"y":304.5,"width":157.1875,"height":29,"right":248,"bottom":333.5},"arrow":{"x":84.421875,"y":312.5,"width":6.390625,"height":12.796875,"right":90.8125,"bottom":325.296875},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-98; position: fixed; translate: -166px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-right-center-rtl'
{"name":"Tooltip-right-center-rtl","initial":{"box":{"x":113,"y":265,"width":157.203125,"height":29,"right":270.203125,"bottom":294},"arrow":{"x":185,"y":294,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":300.390625},"placement":"top"},"expected":{"box":{"x":113,"y":265,"width":157.203125,"height":29,"right":270.203125,"bottom":294},"arrow":{"x":185,"y":294,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":300.390625},"placement":"top"},"actual":{"box":{"x":112.40625,"y":265,"width":157.1875,"height":29,"right":269.59375,"bottom":294},"arrow":{"x":184.40625,"y":294,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":300.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-99; position: fixed; translate: -16px 265px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-right-top-rtl'
{"name":"Tooltip-right-top-rtl","initial":{"box":{"x":238,"y":7,"width":157.203125,"height":29,"right":395.203125,"bottom":36},"arrow":{"x":231.609375,"y":15,"width":6.390625,"height":12.796875,"right":238,"bottom":27.796875},"placement":"right"},"expected":{"box":{"x":238,"y":7,"width":157.203125,"height":29,"right":395.203125,"bottom":36},"arrow":{"x":231.609375,"y":15,"width":6.390625,"height":12.796875,"right":238,"bottom":27.796875},"placement":"right"},"actual":{"box":{"x":238.8125,"y":6.5,"width":157.1875,"height":29,"right":396,"bottom":35.5},"arrow":{"x":232.421875,"y":14.5,"width":6.390625,"height":12.796875,"right":238.8125,"bottom":27.296875},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-100; position: fixed; translate: -18px -427px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-right-right-rtl'
{"name":"Tooltip-right-right-rtl","initial":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"expected":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"actual":{"box":{"x":160.8125,"y":304.5,"width":157.1875,"height":29,"right":318,"bottom":333.5},"arrow":{"x":318,"y":312.5,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.296875},"placement":"left"},"area":"inline-end","style":"position-anchor: --vn-placement-101; position: fixed; translate: -90px -129px; position-area: inline-end; position-try-fallbacks: --vn-placement-101-0, flip-inline, --vn-placement-101-2; inset: auto; margin: 0px 6px 0px 0px; width: 157.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-right-bottom-rtl'
{"name":"Tooltip-right-bottom-rtl","initial":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"expected":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"actual":{"box":{"x":112.40625,"y":821,"width":157.1875,"height":29,"right":269.59375,"bottom":850},"arrow":{"x":184.40625,"y":850,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":856.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-102; position: fixed; translate: -16px 821px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 6px; width: 157.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-right-left-rtl'
{"name":"Tooltip-right-left-rtl","initial":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"expected":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"actual":{"box":{"x":90.8125,"y":304.5,"width":157.1875,"height":29,"right":248,"bottom":333.5},"arrow":{"x":84.421875,"y":312.5,"width":6.390625,"height":12.796875,"right":90.8125,"bottom":325.296875},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-103; position: fixed; translate: -166px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-bottom-center-rtl'
{"name":"Tooltip-bottom-center-rtl","initial":{"box":{"x":113,"y":344,"width":157.203125,"height":29,"right":270.203125,"bottom":373},"arrow":{"x":185,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":344},"placement":"bottom"},"expected":{"box":{"x":113,"y":344,"width":157.203125,"height":29,"right":270.203125,"bottom":373},"arrow":{"x":185,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":344},"placement":"bottom"},"actual":{"box":{"x":112.40625,"y":344,"width":157.1875,"height":29,"right":269.59375,"bottom":373},"arrow":{"x":184.40625,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":344},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-104; position: fixed; translate: -16px 338px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-104-1, --vn-placement-104-3; inset: auto; margin: 6px 0px 0px; width: 157.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-bottom-top-rtl'
{"name":"Tooltip-bottom-top-rtl","initial":{"box":{"x":113,"y":46,"width":157.203125,"height":29,"right":270.203125,"bottom":75},"arrow":{"x":185,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":46},"placement":"bottom"},"expected":{"box":{"x":113,"y":46,"width":157.203125,"height":29,"right":270.203125,"bottom":75},"arrow":{"x":185,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":46},"placement":"bottom"},"actual":{"box":{"x":112.40625,"y":46,"width":157.1875,"height":29,"right":269.59375,"bottom":75},"arrow":{"x":184.40625,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":46},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-105; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-105-1, --vn-placement-105-3; inset: auto; margin: 6px 0px 0px; width: 157.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-bottom-right-rtl'
{"name":"Tooltip-bottom-right-rtl","initial":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"expected":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"actual":{"box":{"x":160.8125,"y":304.5,"width":157.1875,"height":29,"right":318,"bottom":333.5},"arrow":{"x":318,"y":312.5,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.296875},"placement":"left"},"area":"inline-end","style":"position-anchor: --vn-placement-106; position: fixed; translate: -90px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 6px 0px 0px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-bottom-bottom-rtl'
{"name":"Tooltip-bottom-bottom-rtl","initial":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"expected":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"actual":{"box":{"x":112.40625,"y":821,"width":157.1875,"height":29,"right":269.59375,"bottom":850},"arrow":{"x":184.40625,"y":850,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":856.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-107; position: fixed; translate: -16px 821px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-bottom-left-rtl'
{"name":"Tooltip-bottom-left-rtl","initial":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"expected":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"actual":{"box":{"x":90.8125,"y":304.5,"width":157.1875,"height":29,"right":248,"bottom":333.5},"arrow":{"x":84.421875,"y":312.5,"width":6.390625,"height":12.796875,"right":90.8125,"bottom":325.296875},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-108; position: fixed; translate: -166px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-left-center-rtl'
{"name":"Tooltip-left-center-rtl","initial":{"box":{"x":238,"y":305,"width":157.203125,"height":29,"right":395.203125,"bottom":334},"arrow":{"x":231.609375,"y":313,"width":6.390625,"height":12.796875,"right":238,"bottom":325.796875},"placement":"right"},"expected":{"box":{"x":238,"y":305,"width":157.203125,"height":29,"right":395.203125,"bottom":334},"arrow":{"x":231.609375,"y":313,"width":6.390625,"height":12.796875,"right":238,"bottom":325.796875},"placement":"right"},"actual":{"box":{"x":238.8125,"y":304.5,"width":157.1875,"height":29,"right":396,"bottom":333.5},"arrow":{"x":232.421875,"y":312.5,"width":6.390625,"height":12.796875,"right":238.8125,"bottom":325.296875},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-109; position: fixed; translate: -18px -129px; position-area: inline-start; position-try-fallbacks: --vn-placement-109-0, --vn-placement-109-2, flip-inline; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-left-top-rtl'
{"name":"Tooltip-left-top-rtl","initial":{"box":{"x":238,"y":7,"width":157.203125,"height":29,"right":395.203125,"bottom":36},"arrow":{"x":231.609375,"y":15,"width":6.390625,"height":12.796875,"right":238,"bottom":27.796875},"placement":"right"},"expected":{"box":{"x":238,"y":7,"width":157.203125,"height":29,"right":395.203125,"bottom":36},"arrow":{"x":231.609375,"y":15,"width":6.390625,"height":12.796875,"right":238,"bottom":27.796875},"placement":"right"},"actual":{"box":{"x":238.8125,"y":6.5,"width":157.1875,"height":29,"right":396,"bottom":35.5},"arrow":{"x":232.421875,"y":14.5,"width":6.390625,"height":12.796875,"right":238.8125,"bottom":27.296875},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-110; position: fixed; translate: -18px -427px; position-area: inline-start; position-try-fallbacks: --vn-placement-110-0, --vn-placement-110-2, flip-inline; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-left-right-rtl'
{"name":"Tooltip-left-right-rtl","initial":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"expected":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"actual":{"box":{"x":160.8125,"y":304.5,"width":157.1875,"height":29,"right":318,"bottom":333.5},"arrow":{"x":318,"y":312.5,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.296875},"placement":"left"},"area":"inline-end","style":"position-anchor: --vn-placement-111; position: fixed; translate: -90px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 6px 0px 0px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-left-bottom-rtl'
{"name":"Tooltip-left-bottom-rtl","initial":{"box":{"x":238,"y":861,"width":157.203125,"height":29,"right":395.203125,"bottom":890},"arrow":{"x":231.609375,"y":869,"width":6.390625,"height":12.796875,"right":238,"bottom":881.796875},"placement":"right"},"expected":{"box":{"x":238,"y":861,"width":157.203125,"height":29,"right":395.203125,"bottom":890},"arrow":{"x":231.609375,"y":869,"width":6.390625,"height":12.796875,"right":238,"bottom":881.796875},"placement":"right"},"actual":{"box":{"x":238.8125,"y":860.5,"width":157.1875,"height":29,"right":396,"bottom":889.5},"arrow":{"x":232.421875,"y":868.5,"width":6.390625,"height":12.796875,"right":238.8125,"bottom":881.296875},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-112; position: fixed; translate: -18px 427px; position-area: inline-start; position-try-fallbacks: --vn-placement-112-0, --vn-placement-112-2, flip-inline; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-left-left-rtl'
{"name":"Tooltip-left-left-rtl","initial":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"expected":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"actual":{"box":{"x":90.8125,"y":304.5,"width":157.1875,"height":29,"right":248,"bottom":333.5},"arrow":{"x":84.421875,"y":312.5,"width":6.390625,"height":12.796875,"right":90.8125,"bottom":325.296875},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-113; position: fixed; translate: -166px -129px; position-area: inline-start; position-try-fallbacks: --vn-placement-113-0, --vn-placement-113-2, flip-inline; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-auto-center-rtl'
{"name":"Tooltip-auto-center-rtl","initial":{"box":{"x":113,"y":344,"width":157.203125,"height":29,"right":270.203125,"bottom":373},"arrow":{"x":185,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":344},"placement":"bottom"},"expected":{"box":{"x":113,"y":344,"width":157.203125,"height":29,"right":270.203125,"bottom":373},"arrow":{"x":185,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":344},"placement":"bottom"},"actual":{"box":{"x":112.40625,"y":344,"width":157.1875,"height":29,"right":269.59375,"bottom":373},"arrow":{"x":184.40625,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":344},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-114; position: fixed; translate: -16px 338px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-114-1, --vn-placement-114-3; inset: auto; margin: 6px 0px 0px; width: 157.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-auto-top-rtl'
{"name":"Tooltip-auto-top-rtl","initial":{"box":{"x":113,"y":46,"width":157.203125,"height":29,"right":270.203125,"bottom":75},"arrow":{"x":185,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":46},"placement":"bottom"},"expected":{"box":{"x":113,"y":46,"width":157.203125,"height":29,"right":270.203125,"bottom":75},"arrow":{"x":185,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":46},"placement":"bottom"},"actual":{"box":{"x":112.40625,"y":46,"width":157.1875,"height":29,"right":269.59375,"bottom":75},"arrow":{"x":184.40625,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":46},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-115; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-115-1, --vn-placement-115-3; inset: auto; margin: 6px 0px 0px; width: 157.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-auto-right-rtl'
{"name":"Tooltip-auto-right-rtl","initial":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"expected":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"actual":{"box":{"x":160.8125,"y":304.5,"width":157.1875,"height":29,"right":318,"bottom":333.5},"arrow":{"x":318,"y":312.5,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.296875},"placement":"left"},"area":"inline-end","style":"position-anchor: --vn-placement-116; position: fixed; translate: -90px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 6px 0px 0px; width: 157.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-auto-bottom-rtl'
{"name":"Tooltip-auto-bottom-rtl","initial":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"expected":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"actual":{"box":{"x":112.40625,"y":821,"width":157.1875,"height":29,"right":269.59375,"bottom":850},"arrow":{"x":184.40625,"y":850,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":856.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-117; position: fixed; translate: -16px 821px; position-area: block-start; position-try-fallbacks: --vn-placement-117-1, flip-block, --vn-placement-117-3; inset: auto; margin: 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-auto-left-rtl'
{"name":"Tooltip-auto-left-rtl","initial":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"expected":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"actual":{"box":{"x":90.8125,"y":304.5,"width":157.1875,"height":29,"right":248,"bottom":333.5},"arrow":{"x":84.421875,"y":312.5,"width":6.390625,"height":12.796875,"right":90.8125,"bottom":325.296875},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-118; position: fixed; translate: -166px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-top-center-ltr'
{"name":"Popover-top-center-ltr","initial":{"box":{"x":104,"y":200.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":292},"arrow":{"x":184,"y":292,"width":16,"height":8,"right":200,"bottom":300},"placement":"top"},"expected":{"box":{"x":104,"y":200.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":292},"arrow":{"x":184,"y":292,"width":16,"height":8,"right":200,"bottom":300},"placement":"top"},"actual":{"box":{"x":103.40625,"y":201,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":292.1875},"arrow":{"x":183.40625,"y":292.1875,"width":16,"height":8,"right":199.40625,"bottom":300.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-119; position: fixed; translate: -16px 201px; position-area: block-start; position-try-fallbacks: --vn-placement-119-1, flip-block, --vn-placement-119-3; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-top-top-ltr'
{"name":"Popover-top-top-ltr","initial":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"expected":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":48,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":139.1875},"arrow":{"x":183.40625,"y":40,"width":16,"height":8,"right":199.40625,"bottom":48},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-120; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: none; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-top-right-ltr'
{"name":"Popover-top-right-ltr","initial":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"expected":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"actual":{"box":{"x":141,"y":273.40625,"width":175.1875,"height":91.1875,"right":316.1875,"bottom":364.59375},"arrow":{"x":316.1875,"y":311.40625,"width":8,"height":16,"right":324.1875,"bottom":327.40625},"placement":"left"},"area":"inline-start","style":"position-anchor: --vn-placement-121; position: fixed; translate: 141px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-top-bottom-ltr'
{"name":"Popover-top-bottom-ltr","initial":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"expected":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"actual":{"box":{"x":103.40625,"y":757,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":848.1875},"arrow":{"x":183.40625,"y":848.1875,"width":16,"height":8,"right":199.40625,"bottom":856.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-122; position: fixed; translate: -16px 757px; position-area: block-start; position-try-fallbacks: --vn-placement-122-1, flip-block, --vn-placement-122-3; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-top-left-ltr'
{"name":"Popover-top-left-ltr","initial":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"expected":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"actual":{"box":{"x":92,"y":273.40625,"width":175.1875,"height":91.1875,"right":267.1875,"bottom":364.59375},"arrow":{"x":84,"y":311.40625,"width":8,"height":16,"right":92,"bottom":327.40625},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-123; position: fixed; translate: 84px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-right-center-ltr'
{"name":"Popover-right-center-ltr","initial":{"box":{"x":104,"y":200.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":292},"arrow":{"x":184,"y":292,"width":16,"height":8,"right":200,"bottom":300},"placement":"top"},"expected":{"box":{"x":104,"y":200.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":292},"arrow":{"x":184,"y":292,"width":16,"height":8,"right":200,"bottom":300},"placement":"top"},"actual":{"box":{"x":103.40625,"y":201,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":292.1875},"arrow":{"x":183.40625,"y":292.1875,"width":16,"height":8,"right":199.40625,"bottom":300.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-124; position: fixed; translate: -16px 201px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-right-top-ltr'
{"name":"Popover-right-top-ltr","initial":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"expected":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":48,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":139.1875},"arrow":{"x":183.40625,"y":40,"width":16,"height":8,"right":199.40625,"bottom":48},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-125; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: none; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-right-right-ltr'
{"name":"Popover-right-right-ltr","initial":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"expected":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"actual":{"box":{"x":141,"y":273.40625,"width":175.1875,"height":91.1875,"right":316.1875,"bottom":364.59375},"arrow":{"x":316.1875,"y":311.40625,"width":8,"height":16,"right":324.1875,"bottom":327.40625},"placement":"left"},"area":"inline-start","style":"position-anchor: --vn-placement-126; position: fixed; translate: 141px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-right-bottom-ltr'
{"name":"Popover-right-bottom-ltr","initial":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"expected":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"actual":{"box":{"x":103.40625,"y":757,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":848.1875},"arrow":{"x":183.40625,"y":848.1875,"width":16,"height":8,"right":199.40625,"bottom":856.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-127; position: fixed; translate: -16px 757px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-right-left-ltr'
{"name":"Popover-right-left-ltr","initial":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"expected":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"actual":{"box":{"x":92,"y":273.40625,"width":175.1875,"height":91.1875,"right":267.1875,"bottom":364.59375},"arrow":{"x":84,"y":311.40625,"width":8,"height":16,"right":92,"bottom":327.40625},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-128; position: fixed; translate: 84px -129px; position-area: inline-end; position-try-fallbacks: --vn-placement-128-0, --vn-placement-128-2, flip-inline; inset: auto; margin: 0px 0px 0px 8px; width: 175.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-bottom-center-ltr'
{"name":"Popover-bottom-center-ltr","initial":{"box":{"x":104,"y":346,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":437.1875},"arrow":{"x":184,"y":338,"width":16,"height":8,"right":200,"bottom":346},"placement":"bottom"},"expected":{"box":{"x":104,"y":346,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":437.1875},"arrow":{"x":184,"y":338,"width":16,"height":8,"right":200,"bottom":346},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":346,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":437.1875},"arrow":{"x":183.40625,"y":338,"width":16,"height":8,"right":199.40625,"bottom":346},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-129; position: fixed; translate: -16px 338px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-129-1, --vn-placement-129-3; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-bottom-top-ltr'
{"name":"Popover-bottom-top-ltr","initial":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"expected":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":48,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":139.1875},"arrow":{"x":183.40625,"y":40,"width":16,"height":8,"right":199.40625,"bottom":48},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-130; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-130-1, --vn-placement-130-3; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-bottom-right-ltr'
{"name":"Popover-bottom-right-ltr","initial":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"expected":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"actual":{"box":{"x":141,"y":273.40625,"width":175.1875,"height":91.1875,"right":316.1875,"bottom":364.59375},"arrow":{"x":316.1875,"y":311.40625,"width":8,"height":16,"right":324.1875,"bottom":327.40625},"placement":"left"},"area":"inline-start","style":"position-anchor: --vn-placement-131; position: fixed; translate: 141px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 8px 0px 0px; width: 175.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-bottom-bottom-ltr'
{"name":"Popover-bottom-bottom-ltr","initial":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"expected":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"actual":{"box":{"x":103.40625,"y":757,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":848.1875},"arrow":{"x":183.40625,"y":848.1875,"width":16,"height":8,"right":199.40625,"bottom":856.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-132; position: fixed; translate: -16px 757px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-bottom-left-ltr'
{"name":"Popover-bottom-left-ltr","initial":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"expected":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"actual":{"box":{"x":92,"y":273.40625,"width":175.1875,"height":91.1875,"right":267.1875,"bottom":364.59375},"arrow":{"x":84,"y":311.40625,"width":8,"height":16,"right":92,"bottom":327.40625},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-133; position: fixed; translate: 84px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 8px; width: 175.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-left-center-ltr'
{"name":"Popover-left-center-ltr","initial":{"box":{"x":104,"y":200.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":292},"arrow":{"x":184,"y":292,"width":16,"height":8,"right":200,"bottom":300},"placement":"top"},"expected":{"box":{"x":104,"y":200.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":292},"arrow":{"x":184,"y":292,"width":16,"height":8,"right":200,"bottom":300},"placement":"top"},"actual":{"box":{"x":103.40625,"y":201,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":292.1875},"arrow":{"x":183.40625,"y":292.1875,"width":16,"height":8,"right":199.40625,"bottom":300.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-134; position: fixed; translate: -16px 201px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-left-top-ltr'
{"name":"Popover-left-top-ltr","initial":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"expected":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":48,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":139.1875},"arrow":{"x":183.40625,"y":40,"width":16,"height":8,"right":199.40625,"bottom":48},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-135; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: none; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-left-right-ltr'
{"name":"Popover-left-right-ltr","initial":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"expected":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"actual":{"box":{"x":141,"y":273.40625,"width":175.1875,"height":91.1875,"right":316.1875,"bottom":364.59375},"arrow":{"x":316.1875,"y":311.40625,"width":8,"height":16,"right":324.1875,"bottom":327.40625},"placement":"left"},"area":"inline-start","style":"position-anchor: --vn-placement-136; position: fixed; translate: 141px -129px; position-area: inline-start; position-try-fallbacks: --vn-placement-136-0, flip-inline, --vn-placement-136-2; inset: auto; margin: 0px 8px 0px 0px; width: 175.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-left-bottom-ltr'
{"name":"Popover-left-bottom-ltr","initial":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"expected":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"actual":{"box":{"x":103.40625,"y":757,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":848.1875},"arrow":{"x":183.40625,"y":848.1875,"width":16,"height":8,"right":199.40625,"bottom":856.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-137; position: fixed; translate: -16px 757px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-left-left-ltr'
{"name":"Popover-left-left-ltr","initial":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"expected":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"actual":{"box":{"x":92,"y":273.40625,"width":175.1875,"height":91.1875,"right":267.1875,"bottom":364.59375},"arrow":{"x":84,"y":311.40625,"width":8,"height":16,"right":92,"bottom":327.40625},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-138; position: fixed; translate: 84px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 8px; width: 175.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-auto-center-ltr'
{"name":"Popover-auto-center-ltr","initial":{"box":{"x":104,"y":346,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":437.1875},"arrow":{"x":184,"y":338,"width":16,"height":8,"right":200,"bottom":346},"placement":"bottom"},"expected":{"box":{"x":104,"y":346,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":437.1875},"arrow":{"x":184,"y":338,"width":16,"height":8,"right":200,"bottom":346},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":346,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":437.1875},"arrow":{"x":183.40625,"y":338,"width":16,"height":8,"right":199.40625,"bottom":346},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-139; position: fixed; translate: -16px 338px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-139-1, --vn-placement-139-3; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-auto-top-ltr'
{"name":"Popover-auto-top-ltr","initial":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"expected":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":48,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":139.1875},"arrow":{"x":183.40625,"y":40,"width":16,"height":8,"right":199.40625,"bottom":48},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-140; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-140-1, --vn-placement-140-3; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-auto-right-ltr'
{"name":"Popover-auto-right-ltr","initial":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"expected":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"actual":{"box":{"x":141,"y":273.40625,"width":175.1875,"height":91.1875,"right":316.1875,"bottom":364.59375},"arrow":{"x":316.1875,"y":311.40625,"width":8,"height":16,"right":324.1875,"bottom":327.40625},"placement":"left"},"area":"inline-start","style":"position-anchor: --vn-placement-141; position: fixed; translate: 141px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 8px 0px 0px; width: 175.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-auto-bottom-ltr'
{"name":"Popover-auto-bottom-ltr","initial":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"expected":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"actual":{"box":{"x":103.40625,"y":757,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":848.1875},"arrow":{"x":183.40625,"y":848.1875,"width":16,"height":8,"right":199.40625,"bottom":856.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-142; position: fixed; translate: -16px 757px; position-area: block-start; position-try-fallbacks: --vn-placement-142-1, flip-block, --vn-placement-142-3; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-auto-left-ltr'
{"name":"Popover-auto-left-ltr","initial":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"expected":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"actual":{"box":{"x":92,"y":273.40625,"width":175.1875,"height":91.1875,"right":267.1875,"bottom":364.59375},"arrow":{"x":84,"y":311.40625,"width":8,"height":16,"right":92,"bottom":327.40625},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-143; position: fixed; translate: 84px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-top-center-rtl'
{"name":"Popover-top-center-rtl","initial":{"box":{"x":104,"y":200.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":292},"arrow":{"x":184,"y":292,"width":16,"height":8,"right":200,"bottom":300},"placement":"top"},"expected":{"box":{"x":104,"y":200.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":292},"arrow":{"x":184,"y":292,"width":16,"height":8,"right":200,"bottom":300},"placement":"top"},"actual":{"box":{"x":103.40625,"y":201,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":292.1875},"arrow":{"x":183.40625,"y":292.1875,"width":16,"height":8,"right":199.40625,"bottom":300.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-144; position: fixed; translate: -16px 201px; position-area: block-start; position-try-fallbacks: --vn-placement-144-1, flip-block, --vn-placement-144-3; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-top-top-rtl'
{"name":"Popover-top-top-rtl","initial":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"expected":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":48,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":139.1875},"arrow":{"x":183.40625,"y":40,"width":16,"height":8,"right":199.40625,"bottom":48},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-145; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: none; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-top-right-rtl'
{"name":"Popover-top-right-rtl","initial":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"expected":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"actual":{"box":{"x":140.8125,"y":273.40625,"width":175.1875,"height":91.1875,"right":316,"bottom":364.59375},"arrow":{"x":316,"y":311.40625,"width":8,"height":16,"right":324,"bottom":327.40625},"placement":"left"},"area":"inline-end","style":"position-anchor: --vn-placement-146; position: fixed; translate: -90px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-top-bottom-rtl'
{"name":"Popover-top-bottom-rtl","initial":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"expected":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"actual":{"box":{"x":103.40625,"y":757,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":848.1875},"arrow":{"x":183.40625,"y":848.1875,"width":16,"height":8,"right":199.40625,"bottom":856.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-147; position: fixed; translate: -16px 757px; position-area: block-start; position-try-fallbacks: --vn-placement-147-1, flip-block, --vn-placement-147-3; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-top-left-rtl'
{"name":"Popover-top-left-rtl","initial":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"expected":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"actual":{"box":{"x":92.8125,"y":273.40625,"width":175.1875,"height":91.1875,"right":268,"bottom":364.59375},"arrow":{"x":84.8125,"y":311.40625,"width":8,"height":16,"right":92.8125,"bottom":327.40625},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-148; position: fixed; translate: -146px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-right-center-rtl'
{"name":"Popover-right-center-rtl","initial":{"box":{"x":104,"y":200.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":292},"arrow":{"x":184,"y":292,"width":16,"height":8,"right":200,"bottom":300},"placement":"top"},"expected":{"box":{"x":104,"y":200.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":292},"arrow":{"x":184,"y":292,"width":16,"height":8,"right":200,"bottom":300},"placement":"top"},"actual":{"box":{"x":103.40625,"y":201,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":292.1875},"arrow":{"x":183.40625,"y":292.1875,"width":16,"height":8,"right":199.40625,"bottom":300.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-149; position: fixed; translate: -16px 201px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-right-top-rtl'
{"name":"Popover-right-top-rtl","initial":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"expected":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":48,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":139.1875},"arrow":{"x":183.40625,"y":40,"width":16,"height":8,"right":199.40625,"bottom":48},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-150; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: none; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-right-right-rtl'
{"name":"Popover-right-right-rtl","initial":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"expected":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"actual":{"box":{"x":140.8125,"y":273.40625,"width":175.1875,"height":91.1875,"right":316,"bottom":364.59375},"arrow":{"x":316,"y":311.40625,"width":8,"height":16,"right":324,"bottom":327.40625},"placement":"left"},"area":"inline-end","style":"position-anchor: --vn-placement-151; position: fixed; translate: -90px -129px; position-area: inline-end; position-try-fallbacks: --vn-placement-151-0, flip-inline, --vn-placement-151-2; inset: auto; margin: 0px 8px 0px 0px; width: 175.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-right-bottom-rtl'
{"name":"Popover-right-bottom-rtl","initial":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"expected":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"actual":{"box":{"x":103.40625,"y":757,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":848.1875},"arrow":{"x":183.40625,"y":848.1875,"width":16,"height":8,"right":199.40625,"bottom":856.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-152; position: fixed; translate: -16px 757px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-right-left-rtl'
{"name":"Popover-right-left-rtl","initial":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"expected":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"actual":{"box":{"x":92.8125,"y":273.40625,"width":175.1875,"height":91.1875,"right":268,"bottom":364.59375},"arrow":{"x":84.8125,"y":311.40625,"width":8,"height":16,"right":92.8125,"bottom":327.40625},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-153; position: fixed; translate: -146px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 8px; width: 175.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-bottom-center-rtl'
{"name":"Popover-bottom-center-rtl","initial":{"box":{"x":104,"y":346,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":437.1875},"arrow":{"x":184,"y":338,"width":16,"height":8,"right":200,"bottom":346},"placement":"bottom"},"expected":{"box":{"x":104,"y":346,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":437.1875},"arrow":{"x":184,"y":338,"width":16,"height":8,"right":200,"bottom":346},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":346,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":437.1875},"arrow":{"x":183.40625,"y":338,"width":16,"height":8,"right":199.40625,"bottom":346},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-154; position: fixed; translate: -16px 338px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-154-1, --vn-placement-154-3; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-bottom-top-rtl'
{"name":"Popover-bottom-top-rtl","initial":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"expected":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":48,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":139.1875},"arrow":{"x":183.40625,"y":40,"width":16,"height":8,"right":199.40625,"bottom":48},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-155; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-155-1, --vn-placement-155-3; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-bottom-right-rtl'
{"name":"Popover-bottom-right-rtl","initial":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"expected":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"actual":{"box":{"x":140.8125,"y":273.40625,"width":175.1875,"height":91.1875,"right":316,"bottom":364.59375},"arrow":{"x":316,"y":311.40625,"width":8,"height":16,"right":324,"bottom":327.40625},"placement":"left"},"area":"inline-end","style":"position-anchor: --vn-placement-156; position: fixed; translate: -90px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-bottom-bottom-rtl'
{"name":"Popover-bottom-bottom-rtl","initial":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"expected":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"actual":{"box":{"x":103.40625,"y":757,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":848.1875},"arrow":{"x":183.40625,"y":848.1875,"width":16,"height":8,"right":199.40625,"bottom":856.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-157; position: fixed; translate: -16px 757px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-bottom-left-rtl'
{"name":"Popover-bottom-left-rtl","initial":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"expected":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"actual":{"box":{"x":92.8125,"y":273.40625,"width":175.1875,"height":91.1875,"right":268,"bottom":364.59375},"arrow":{"x":84.8125,"y":311.40625,"width":8,"height":16,"right":92.8125,"bottom":327.40625},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-158; position: fixed; translate: -146px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 8px; width: 175.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-left-center-rtl'
{"name":"Popover-left-center-rtl","initial":{"box":{"x":104,"y":200.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":292},"arrow":{"x":184,"y":292,"width":16,"height":8,"right":200,"bottom":300},"placement":"top"},"expected":{"box":{"x":104,"y":200.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":292},"arrow":{"x":184,"y":292,"width":16,"height":8,"right":200,"bottom":300},"placement":"top"},"actual":{"box":{"x":103.40625,"y":201,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":292.1875},"arrow":{"x":183.40625,"y":292.1875,"width":16,"height":8,"right":199.40625,"bottom":300.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-159; position: fixed; translate: -16px 201px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-left-top-rtl'
{"name":"Popover-left-top-rtl","initial":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"expected":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":48,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":139.1875},"arrow":{"x":183.40625,"y":40,"width":16,"height":8,"right":199.40625,"bottom":48},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-160; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: none; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-left-right-rtl'
{"name":"Popover-left-right-rtl","initial":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"expected":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"actual":{"box":{"x":140.8125,"y":273.40625,"width":175.1875,"height":91.1875,"right":316,"bottom":364.59375},"arrow":{"x":316,"y":311.40625,"width":8,"height":16,"right":324,"bottom":327.40625},"placement":"left"},"area":"inline-end","style":"position-anchor: --vn-placement-161; position: fixed; translate: -90px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 8px 0px 0px; width: 175.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-left-bottom-rtl'
{"name":"Popover-left-bottom-rtl","initial":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"expected":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"actual":{"box":{"x":103.40625,"y":757,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":848.1875},"arrow":{"x":183.40625,"y":848.1875,"width":16,"height":8,"right":199.40625,"bottom":856.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-162; position: fixed; translate: -16px 757px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-left-left-rtl'
{"name":"Popover-left-left-rtl","initial":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"expected":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"actual":{"box":{"x":92.8125,"y":273.40625,"width":175.1875,"height":91.1875,"right":268,"bottom":364.59375},"arrow":{"x":84.8125,"y":311.40625,"width":8,"height":16,"right":92.8125,"bottom":327.40625},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-163; position: fixed; translate: -146px -129px; position-area: inline-start; position-try-fallbacks: --vn-placement-163-0, --vn-placement-163-2, flip-inline; inset: auto; margin: 0px 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-auto-center-rtl'
{"name":"Popover-auto-center-rtl","initial":{"box":{"x":104,"y":346,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":437.1875},"arrow":{"x":184,"y":338,"width":16,"height":8,"right":200,"bottom":346},"placement":"bottom"},"expected":{"box":{"x":104,"y":346,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":437.1875},"arrow":{"x":184,"y":338,"width":16,"height":8,"right":200,"bottom":346},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":346,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":437.1875},"arrow":{"x":183.40625,"y":338,"width":16,"height":8,"right":199.40625,"bottom":346},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-164; position: fixed; translate: -16px 338px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-164-1, --vn-placement-164-3; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-auto-top-rtl'
{"name":"Popover-auto-top-rtl","initial":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"expected":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":48,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":139.1875},"arrow":{"x":183.40625,"y":40,"width":16,"height":8,"right":199.40625,"bottom":48},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-165; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-165-1, --vn-placement-165-3; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-auto-right-rtl'
{"name":"Popover-auto-right-rtl","initial":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"expected":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"actual":{"box":{"x":140.8125,"y":273.40625,"width":175.1875,"height":91.1875,"right":316,"bottom":364.59375},"arrow":{"x":316,"y":311.40625,"width":8,"height":16,"right":324,"bottom":327.40625},"placement":"left"},"area":"inline-end","style":"position-anchor: --vn-placement-166; position: fixed; translate: -90px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-auto-bottom-rtl'
{"name":"Popover-auto-bottom-rtl","initial":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"expected":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"actual":{"box":{"x":103.40625,"y":757,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":848.1875},"arrow":{"x":183.40625,"y":848.1875,"width":16,"height":8,"right":199.40625,"bottom":856.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-167; position: fixed; translate: -16px 757px; position-area: block-start; position-try-fallbacks: --vn-placement-167-1, flip-block, --vn-placement-167-3; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-auto-left-rtl'
{"name":"Popover-auto-left-rtl","initial":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"expected":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"actual":{"box":{"x":92.8125,"y":273.40625,"width":175.1875,"height":91.1875,"right":268,"bottom":364.59375},"arrow":{"x":84.8125,"y":311.40625,"width":8,"height":16,"right":92.8125,"bottom":327.40625},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-168; position: fixed; translate: -146px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 8px; width: 175.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-reference-parent'
{"name":"dropdown-reference-parent","initial":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"expected":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"actual":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"area":"end span-end","style":"position-anchor: --vn-placement-169; position: fixed; translate: 0px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-reference-element'
{"name":"dropdown-reference-element","initial":{"box":{"x":20,"y":702,"width":160,"height":50,"right":180,"bottom":752},"placement":"bottom-start"},"expected":{"box":{"x":20,"y":702,"width":160,"height":50,"right":180,"bottom":752},"placement":"bottom-start"},"actual":{"box":{"x":20,"y":702,"width":160,"height":50,"right":180,"bottom":752},"placement":"bottom-start"},"area":"end span-end","style":"position-anchor: --vn-placement-170; position: fixed; translate: 0px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-offset-10-20'
{"name":"dropdown-offset-10-20","initial":{"box":{"x":160,"y":358,"width":160,"height":50,"right":320,"bottom":408},"placement":"bottom-start"},"expected":{"box":{"x":160,"y":358,"width":160,"height":50,"right":320,"bottom":408},"placement":"bottom-start"},"actual":{"box":{"x":160,"y":358,"width":160,"height":50,"right":320,"bottom":408},"placement":"bottom-start"},"area":"end span-end","style":"position-anchor: --vn-placement-171; position: fixed; translate: 0px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 20px -10px 0px 10px; width: 160px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-boundary'
{"name":"dropdown-boundary","initial":{"box":{"x":219.53125,"y":340,"width":160,"height":50,"right":379.53125,"bottom":390},"placement":"bottom-end"},"expected":{"box":{"x":219.53125,"y":340,"width":160,"height":50,"right":379.53125,"bottom":390},"placement":"bottom-end"},"actual":{"box":{"x":219.53125,"y":340,"width":160,"height":50,"right":379.53125,"bottom":390},"placement":"bottom-end"},"area":"end span-start","style":"position-anchor: --vn-placement-172; position: fixed; translate: -41px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-edge-top'
{"name":"dropdown-edge-top","initial":{"box":{"x":150,"y":42,"width":160,"height":50,"right":310,"bottom":92},"placement":"bottom-start"},"expected":{"box":{"x":150,"y":42,"width":160,"height":50,"right":310,"bottom":92},"placement":"bottom-start"},"actual":{"box":{"x":150,"y":42,"width":160,"height":50,"right":310,"bottom":92},"placement":"bottom-start"},"area":"end span-end","style":"position-anchor: --vn-placement-173; position: fixed; translate: 0px; position-area: block-start span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-edge-bottom'
{"name":"dropdown-edge-bottom","initial":{"box":{"x":150,"y":804,"width":160,"height":50,"right":310,"bottom":854},"placement":"top-start"},"expected":{"box":{"x":150,"y":804,"width":160,"height":50,"right":310,"bottom":854},"placement":"top-start"},"actual":{"box":{"x":150,"y":804,"width":160,"height":50,"right":310,"bottom":854},"placement":"top-start"},"area":"start span-end","style":"position-anchor: --vn-placement-174; position: fixed; translate: 0px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-edge-right'
{"name":"dropdown-edge-right","initial":{"box":{"x":161.53125,"y":300,"width":160,"height":50,"right":321.53125,"bottom":350},"placement":"left-start"},"expected":{"box":{"x":161.53125,"y":300,"width":160,"height":50,"right":321.53125,"bottom":350},"placement":"left-start"},"actual":{"box":{"x":162,"y":300,"width":160,"height":50,"right":322,"bottom":350},"placement":"left-start"},"area":"span-end start","style":"position-anchor: --vn-placement-175; position: fixed; translate: 0px; position-area: span-block-end inline-end; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-edge-left'
{"name":"dropdown-edge-left","initial":{"box":{"x":97,"y":300,"width":160,"height":50,"right":257,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":97,"y":300,"width":160,"height":50,"right":257,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":96.53125,"y":300,"width":160,"height":50,"right":256.53125,"bottom":350},"placement":"right-start"},"area":"span-end end","style":"position-anchor: --vn-placement-176; position: fixed; translate: 0px; position-area: span-block-end inline-start; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'tooltip-custom-fallback'
{"name":"tooltip-custom-fallback","initial":{"box":{"x":113,"y":46,"width":157.203125,"height":29,"right":270.203125,"bottom":75},"arrow":{"x":185,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":46},"placement":"bottom"},"expected":{"box":{"x":113,"y":46,"width":157.203125,"height":29,"right":270.203125,"bottom":75},"arrow":{"x":185,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":46},"placement":"bottom"},"actual":{"box":{"x":112.40625,"y":46,"width":157.1875,"height":29,"right":269.59375,"bottom":75},"arrow":{"x":184.40625,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":46},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-177; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: none; inset: auto; margin: 6px 0px 0px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'popover-custom-fallback'
{"name":"popover-custom-fallback","initial":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"expected":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"actual":{"box":{"x":141,"y":273.40625,"width":175.1875,"height":91.1875,"right":316.1875,"bottom":364.59375},"arrow":{"x":316.1875,"y":311.40625,"width":8,"height":16,"right":324.1875,"bottom":327.40625},"placement":"left"},"area":"inline-start","style":"position-anchor: --vn-placement-178; position: fixed; translate: 141px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'tooltip-custom-offset'
{"name":"tooltip-custom-offset","initial":{"box":{"x":123,"y":251,"width":157.203125,"height":29,"right":280.203125,"bottom":280},"arrow":{"x":185,"y":280,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":286.390625},"placement":"top"},"expected":{"box":{"x":123,"y":251,"width":157.203125,"height":29,"right":280.203125,"bottom":280},"arrow":{"x":185,"y":280,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":286.390625},"placement":"top"},"actual":{"box":{"x":122.40625,"y":251,"width":157.1875,"height":29,"right":279.59375,"bottom":280},"arrow":{"x":184.40625,"y":280,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":286.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-179; position: fixed; translate: -16px 251px; position-area: block-start; position-try-fallbacks: --vn-placement-179-1, flip-block, --vn-placement-179-3; inset: auto; margin: 0px -10px 20px 10px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'popover-custom-offset'
{"name":"popover-custom-offset","initial":{"box":{"x":114,"y":188.8125,"width":175.203125,"height":91.1875,"right":289.203125,"bottom":280},"arrow":{"x":184,"y":280,"width":16,"height":8,"right":200,"bottom":288},"placement":"top"},"expected":{"box":{"x":114,"y":188.8125,"width":175.203125,"height":91.1875,"right":289.203125,"bottom":280},"arrow":{"x":184,"y":280,"width":16,"height":8,"right":200,"bottom":288},"placement":"top"},"actual":{"box":{"x":113.40625,"y":189,"width":175.1875,"height":91.1875,"right":288.59375,"bottom":280.1875},"arrow":{"x":183.40625,"y":280.1875,"width":16,"height":8,"right":199.40625,"bottom":288.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-180; position: fixed; translate: -16px 189px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px -10px 20px 10px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'tooltip-boundary'
{"name":"tooltip-boundary","initial":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"expected":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"actual":{"box":{"x":161,"y":304.5,"width":157.1875,"height":29,"right":318.1875,"bottom":333.5},"arrow":{"x":318.1875,"y":312.5,"width":6.390625,"height":12.796875,"right":324.578125,"bottom":325.296875},"placement":"left"},"area":"inline-start","style":"position-anchor: --vn-placement-181; position: fixed; translate: 161px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 6px 0px 0px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'popover-boundary'
{"name":"popover-boundary","initial":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"expected":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"actual":{"box":{"x":141,"y":273.40625,"width":175.1875,"height":91.1875,"right":316.1875,"bottom":364.59375},"arrow":{"x":316.1875,"y":311.40625,"width":8,"height":16,"right":324.1875,"bottom":327.40625},"placement":"left"},"area":"inline-start","style":"position-anchor: --vn-placement-182; position: fixed; translate: 141px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'config-placement'
{"name":"config-placement","initial":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"expected":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"actual":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"area":"end span-start","style":"position-anchor: --vn-placement-183; position: fixed; translate: 0px; position-area: block-end span-inline-start; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'config-disabled-flip'
{"name":"config-disabled-flip","initial":{"box":{"x":150,"y":894,"width":160,"height":50,"right":310,"bottom":944},"placement":"bottom-start"},"expected":{"box":{"x":150,"y":894,"width":160,"height":50,"right":310,"bottom":944},"placement":"bottom-start"},"actual":{"box":{"x":150,"y":894,"width":160,"height":50,"right":310,"bottom":944},"placement":"bottom-start"},"area":"end span-end","style":"position-anchor: --vn-placement-184; position: fixed; translate: 0px; position-area: block-end span-inline-end; position-try-fallbacks: none; inset: auto; margin: 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'config-offset'
{"name":"config-offset","initial":{"box":{"x":160,"y":358,"width":160,"height":50,"right":320,"bottom":408},"placement":"bottom-start"},"expected":{"box":{"x":160,"y":358,"width":160,"height":50,"right":320,"bottom":408},"placement":"bottom-start"},"actual":{"box":{"x":160,"y":358,"width":160,"height":50,"right":320,"bottom":408},"placement":"bottom-start"},"area":"end span-end","style":"position-anchor: --vn-placement-185; position: fixed; translate: 0px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 20px -10px 0px 10px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'config-overflow-boundary'
{"name":"config-overflow-boundary","initial":{"box":{"x":241.53125,"y":338,"width":160,"height":50,"right":401.53125,"bottom":388},"placement":"bottom-end"},"expected":{"box":{"x":241.53125,"y":338,"width":160,"height":50,"right":401.53125,"bottom":388},"placement":"bottom-end"},"actual":{"box":{"x":241.53125,"y":338,"width":160,"height":50,"right":401.53125,"bottom":388},"placement":"bottom-end"},"area":"end span-start","style":"position-anchor: --vn-placement-186; position: fixed; translate: -19px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'config-tip-placement'
{"name":"config-tip-placement","initial":{"box":{"x":74.796875,"y":344,"width":157.203125,"height":29,"right":232,"bottom":373},"arrow":{"x":184.796875,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.59375,"bottom":344},"placement":"bottom-end"},"expected":{"box":{"x":74.796875,"y":344,"width":157.203125,"height":29,"right":232,"bottom":373},"arrow":{"x":184.796875,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.59375,"bottom":344},"placement":"bottom-end"},"actual":{"box":{"x":75,"y":344,"width":157.1875,"height":29,"right":232.1875,"bottom":373},"arrow":{"x":185,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":344},"placement":"bottom-end"},"area":"end span-start","style":"position-anchor: --vn-placement-187; position: fixed; translate: 75px 338px; position-area: block-end span-inline-start; position-try-fallbacks: --vn-placement-187-0, --vn-placement-187-1, --vn-placement-187-2, --vn-placement-187-3; inset: auto; margin: 6px 0px 0px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'config-tip-offset'
{"name":"config-tip-offset","initial":{"box":{"x":123,"y":244.609375,"width":157.203125,"height":35.390625,"right":280.203125,"bottom":280},"arrow":{"x":123,"y":244.609375,"width":12.796875,"height":6.390625,"right":135.796875,"bottom":251},"placement":"top"},"expected":{"box":{"x":123,"y":244.609375,"width":157.203125,"height":35.390625,"right":280.203125,"bottom":280},"arrow":{"x":123,"y":244.609375,"width":12.796875,"height":6.390625,"right":135.796875,"bottom":251},"placement":"top"},"actual":{"box":{"x":122.40625,"y":245,"width":157.1875,"height":35.390625,"right":279.59375,"bottom":280.390625},"arrow":{"x":122.40625,"y":245,"width":12.796875,"height":6.390625,"right":135.203125,"bottom":251.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-188; position: fixed; translate: -16px 245px; position-area: block-start; position-try-fallbacks: flip-block; inset: auto; margin: 0px -10px 20px 10px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'config-popover-flip'
{"name":"config-popover-flip","initial":{"box":{"x":406,"y":269,"width":175.203125,"height":107.1875,"right":581.203125,"bottom":376.1875},"arrow":{"x":407,"y":270,"width":8,"height":16,"right":415,"bottom":286},"placement":"right"},"expected":{"box":{"x":406,"y":265,"width":175.203125,"height":107.1875,"right":581.203125,"bottom":372.1875},"arrow":{"x":407,"y":266,"width":8,"height":16,"right":415,"bottom":282},"placement":"right"},"actual":{"box":{"x":406,"y":265.40625,"width":175.1875,"height":107.1875,"right":581.1875,"bottom":372.59375},"arrow":{"x":407,"y":266.40625,"width":8,"height":16,"right":415,"bottom":282.40625},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-189; position: fixed; translate: 406px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px; width: 175.203px;"}
·x··x········stdout | tests/src/browser/Placement.test.ts:1019:3 > Placement moving geometry > 'Dropdown'-'scroll'
{"name":"Dropdown-scroll","expected":{"box":{"x":170,"y":340,"width":160,"height":50,"right":330,"bottom":390},"placement":"bottom-start"},"actual":{"box":{"x":170,"y":340,"width":160,"height":50,"right":330,"bottom":390},"placement":"bottom-start"}}
·stdout | tests/src/browser/Placement.test.ts:1019:3 > Placement moving geometry > 'Dropdown'-'resize'
{"name":"Dropdown-resize","expected":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"actual":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"}}
stdout | tests/src/browser/Placement.test.ts:1019:3 > Placement moving geometry > 'Dropdown'-'transform'
{"name":"Dropdown-transform","expected":{"box":{"x":182,"y":458,"width":160,"height":50,"right":342,"bottom":508},"placement":"bottom-start"},"actual":{"box":{"x":182,"y":458,"width":160,"height":50,"right":342,"bottom":508},"placement":"bottom-start"}}
·stdout | tests/src/browser/Placement.test.ts:1019:3 > Placement moving geometry > 'Tooltip'-'scroll'
{"name":"Tooltip-scroll","expected":{"box":{"x":133,"y":344,"width":157.203125,"height":29,"right":290.203125,"bottom":373},"arrow":{"x":205,"y":337.609375,"width":12.796875,"height":6.390625,"right":217.796875,"bottom":344},"placement":"bottom"},"actual":{"box":{"x":132.609375,"y":344,"width":157.1875,"height":29,"right":289.796875,"bottom":373},"arrow":{"x":204.609375,"y":337.609375,"width":12.796875,"height":6.390625,"right":217.40625,"bottom":344},"placement":"bottom"}}
··stdout | tests/src/browser/Placement.test.ts:1019:3 > Placement moving geometry > 'Tooltip'-'resize'
{"name":"Tooltip-resize","expected":{"box":{"x":113,"y":344,"width":157.203125,"height":29,"right":270.203125,"bottom":373},"arrow":{"x":185,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":344},"placement":"bottom"},"actual":{"box":{"x":112.40625,"y":344,"width":157.1875,"height":29,"right":269.59375,"bottom":373},"arrow":{"x":184.40625,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":344},"placement":"bottom"}}
stdout | tests/src/browser/Placement.test.ts:1019:3 > Placement moving geometry > 'Tooltip'-'transform'
{"name":"Tooltip-transform","expected":{"box":{"x":145,"y":462,"width":157.203125,"height":29,"right":302.203125,"bottom":491},"arrow":{"x":217,"y":455.609375,"width":12.796875,"height":6.390625,"right":229.796875,"bottom":462},"placement":"bottom"},"actual":{"box":{"x":144.609375,"y":462,"width":157.1875,"height":29,"right":301.796875,"bottom":491},"arrow":{"x":216.609375,"y":455.609375,"width":12.796875,"height":6.390625,"right":229.40625,"bottom":462},"placement":"bottom"}}
·stdout | tests/src/browser/Placement.test.ts:1019:3 > Placement moving geometry > 'Popover'-'scroll'
{"name":"Popover-scroll","expected":{"box":{"x":124,"y":346,"width":175.203125,"height":91.1875,"right":299.203125,"bottom":437.1875},"arrow":{"x":204,"y":338,"width":16,"height":8,"right":220,"bottom":346},"placement":"bottom"},"actual":{"box":{"x":123.609375,"y":346,"width":175.1875,"height":91.1875,"right":298.796875,"bottom":437.1875},"arrow":{"x":202.609375,"y":338,"width":16,"height":8,"right":218.609375,"bottom":346},"placement":"bottom"}}
·xstdout | tests/src/browser/Placement.test.ts:1019:3 > Placement moving geometry > 'Popover'-'resize'
{"name":"Popover-resize","expected":{"box":{"x":104,"y":346,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":437.1875},"arrow":{"x":184,"y":338,"width":16,"height":8,"right":200,"bottom":346},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":346,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":437.1875},"arrow":{"x":183.40625,"y":338,"width":16,"height":8,"right":199.40625,"bottom":346},"placement":"bottom"}}
stdout | tests/src/browser/Placement.test.ts:1019:3 > Placement moving geometry > 'Popover'-'transform'
{"name":"Popover-transform","expected":{"box":{"x":136,"y":464,"width":175.203125,"height":91.1875,"right":311.203125,"bottom":555.1875},"arrow":{"x":216,"y":456,"width":16,"height":8,"right":232,"bottom":464},"placement":"bottom"},"actual":{"box":{"x":135.609375,"y":464,"width":175.1875,"height":91.1875,"right":310.796875,"bottom":555.1875},"arrow":{"x":214.609375,"y":456,"width":16,"height":8,"right":230.609375,"bottom":464},"placement":"bottom"}}
·xx········································································································································································stdout | tests/src/browser/Lock.test.ts:138:2 > body scrollbar lock > shares measurement across owners and restores only on final release
{"measurement":"scrollbar-compensation","mode":"test","width":0}
·······································································

 Test Files  3 failed | 23 passed (26)
      Tests  7 failed | 792 passed (799)
   Start at  16:42:23
   Duration  203.56s (transform 0ms, setup 6.42s, import 1.46s, tests 182.88s, environment 0ms)


```

stderr.log:

```text
4:43:05 PM [vite] (client) [Unhandled error] VeneerError: Component teardown failed
 > Veneer.destroy src/browser/Veneer.ts:128:9
    126 |  		if (Veneer.#scopes.get(this.#root) === this) Veneer.#scopes.delete(this.#root)
    127 |  		if (errors.length)
    128 |  			throw new VeneerError('VENEER_DESTROY', 'Component teardown failed', { errors })
        |           ^
    129 |  	}
    130 |  
 > src/browser/Veneer.ts:222:37
 > attempt node_modules/@orkestrel/contract/dist/src/core/index.js:2489:10
 > #boot src/browser/Veneer.ts:222:18
 > new Veneer src/browser/Veneer.ts:79:60
 > Veneer.resolve src/browser/Veneer.ts:108:54
 > createVeneer src/browser/factories.ts:173:15
 > tests/src/browser/Veneer.test.ts:118:32
 > attempt node_modules/@orkestrel/contract/dist/src/core/index.js:2489:10
 > tests/src/browser/Veneer.test.ts:118:18

4:43:05 PM [vite] (client) [console.error] Error: Uncaught VeneerError: Component teardown failed
    at throwUnhandlerError (http://localhost:63315/@fs/home/user/.wave/veneer-b4/node_modules/@vitest/browser/dist/client/error-catcher.js:38:33)
    at #boot (http://localhost:63315/src/browser/Veneer.ts:179:64)
    at new Veneer (http://localhost:63315/src/browser/Veneer.ts:58:60)
    at Veneer.resolve (http://localhost:63315/src/browser/Veneer.ts:81:55)
    at createVeneer (http://localhost:63315/src/browser/factories.ts:83:16)
    at http://localhost:63315/home/user/.wave/veneer-b4/tests/src/browser/Veneer.test.ts?import&browserv=1791304985086:73:33
    at attempt (http://localhost:63315/node_modules/.vite/vitest/b27dd0da05f810f88681a19f44fd63c3c0a89532/deps/@orkestrel_contract.js?v=a9ece1a2:2483:11)
    at http://localhost:63315/home/user/.wave/veneer-b4/tests/src/browser/Veneer.test.ts?import&browserv=1791304985086:73:19
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:302:11
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:1903:26
4:43:05 PM [vite] (client) [Unhandled error] SyntaxError: Failed to execute 'closest' on 'Element': '[' is not a valid selector.
 > src/browser/Veneer.ts:194:28
    192 |  				if (route.event !== event.type) continue
    193 |  				const result = attempt(() => {
    194 |  					const trigger = target.closest(route.selector)
        |                              ^
    195 |  					if (!isBrowserElement(trigger) || this.#owner(path, trigger) !== this) return
    196 |  					route.execute({
 > attempt node_modules/@orkestrel/contract/dist/src/core/index.js:2489:10
 > #route src/browser/Veneer.ts:193:19
 > Veneer.#document.addEventListener.capture src/browser/Veneer.ts:70:64
 > tests/src/browser/Veneer.test.ts:150:9
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2027:60
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:302:11
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:1903:26
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2326:20

4:43:05 PM [vite] (client) [console.error] Error: Uncaught 
    at throwUnhandlerError (http://localhost:63315/@fs/home/user/.wave/veneer-b4/node_modules/@vitest/browser/dist/client/error-catcher.js:38:33)
    at #route (http://localhost:63315/src/browser/Veneer.ts:161:32)
    at Veneer.#document.addEventListener.capture (http://localhost:63315/src/browser/Veneer.ts:52:90)
    at http://localhost:63315/home/user/.wave/veneer-b4/tests/src/browser/Veneer.test.ts?import&browserv=1791304985086:109:9
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2027:60
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:302:11
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:1903:26
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2326:20
    at new Promise (<anonymous>)
    at runWithCancel (http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2323:10)
4:43:05 PM [vite] (client) [Unhandled error] Error: Settled boot failed
 > tests/src/browser/Veneer.test.ts:230:18
    228 |  		const created = createRecorder<readonly [Button]>()
    229 |  		const observed = createRecorder<readonly [unknown]>()
    230 |  		const failure = new Error('Settled boot failed')
        |                    ^
    231 |  		const controller = new AbortController()
    232 |  		window.addEventListener(
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2027:60
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:302:11
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:1903:26
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2326:20
 > runWithCancel node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2323:10
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2305:20
 > runWithTimeout node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2272:10

4:43:05 PM [vite] (client) [console.error] Error: Uncaught Error: Settled boot failed
    at throwUnhandlerError (http://localhost:63315/@fs/home/user/.wave/veneer-b4/node_modules/@vitest/browser/dist/client/error-catcher.js:38:33)
    at http://localhost:63315/home/user/.wave/veneer-b4/tests/src/browser/Veneer.test.ts?import&browserv=1791304985086:194:30
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2027:60
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:302:11
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:1903:26
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2326:20
    at new Promise (<anonymous>)
    at runWithCancel (http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2323:10)
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2305:20
    at new Promise (<anonymous>)
4:43:05 PM [vite] (client) [Unhandled error] VeneerError: A live component holds this plugin and host
 > Object.own src/browser/Registry.ts:67:11
    65 |  				const existing = entries.get(plugin.name)
    66 |  				if (existing && !existing.destroyed && existing !== component)
    67 |  					throw new VeneerError(
       |             ^
    68 |  						'REGISTRY_CONFLICT',
    69 |  						'A live component holds this plugin and host',
 > Object.own src/browser/Veneer.ts:141:12
 > new Button src/browser/Button.ts:26:10
 > tests/src/browser/Veneer.test.ts:300:34
 > attempt node_modules/@orkestrel/contract/dist/src/core/index.js:2489:10
 > create tests/src/browser/Veneer.test.ts:300:20
 > Object.create src/browser/helpers.ts:80:3
 > Object.execute src/browser/helpers.ts:126:44
 > #initialize src/browser/Veneer.ts:239:10
 > #boot src/browser/Veneer.ts:220:20

4:43:05 PM [vite] (client) [console.error] Error: Uncaught VeneerError: A live component holds this plugin and host
    at throwUnhandlerError (http://localhost:63315/@fs/home/user/.wave/veneer-b4/node_modules/@vitest/browser/dist/client/error-catcher.js:38:33)
    at http://localhost:63315/home/user/.wave/veneer-b4/tests/src/browser/Veneer.test.ts?import&browserv=1791304985086:251:11
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2027:60
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:302:11
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:1903:26
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2326:20
    at new Promise (<anonymous>)
    at runWithCancel (http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2323:10)
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2305:20
    at new Promise (<anonymous>)
4:43:05 PM [vite] (client) [Unhandled error] Error: Dispatch refused
 > tests/src/browser/Veneer.test.ts:410:18
    408 |  			{ capture: true, signal: controller.signal },
    409 |  		)
    410 |  		const failure = new Error('Dispatch refused')
        |                    ^
    411 |  		const first = buildEnginePlugin({
    412 |  			routes: [
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:302:11
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:1903:26
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2326:20
 > runWithCancel node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2323:10
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2305:20
 > runWithTimeout node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2272:10
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2956:64

4:43:05 PM [vite] (client) [console.error] Error: Uncaught Error: Dispatch refused
    at throwUnhandlerError (http://localhost:63315/@fs/home/user/.wave/veneer-b4/node_modules/@vitest/browser/dist/client/error-catcher.js:38:33)
    at #route (http://localhost:63315/src/browser/Veneer.ts:161:32)
    at Veneer.#document.addEventListener.capture (http://localhost:63315/src/browser/Veneer.ts:52:90)
    at http://localhost:63315/home/user/.wave/veneer-b4/tests/src/browser/Veneer.test.ts?import&browserv=1791304985086:364:9
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:302:11
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:1903:26
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2326:20
    at new Promise (<anonymous>)
    at runWithCancel (http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2323:10)
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2305:20
4:43:05 PM [vite] (client) [Unhandled error] Error: Dispatch refused
 > tests/src/browser/Veneer.test.ts:410:18
    408 |  			{ capture: true, signal: controller.signal },
    409 |  		)
    410 |  		const failure = new Error('Dispatch refused')
        |                    ^
    411 |  		const first = buildEnginePlugin({
    412 |  			routes: [
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:302:11
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:1903:26
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2326:20
 > runWithCancel node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2323:10
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2305:20
 > runWithTimeout node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2272:10
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2956:64

4:43:05 PM [vite] (client) [console.error] Error: Uncaught Error: Dispatch refused
    at throwUnhandlerError (http://localhost:63315/@fs/home/user/.wave/veneer-b4/node_modules/@vitest/browser/dist/client/error-catcher.js:38:33)
    at #clear (http://localhost:63315/src/browser/Veneer.ts:171:64)
    at Veneer.#document.addEventListener.signal (http://localhost:63315/src/browser/Veneer.ts:56:154)
    at http://localhost:63315/home/user/.wave/veneer-b4/tests/src/browser/Veneer.test.ts?import&browserv=1791304985086:364:9
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:302:11
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:1903:26
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2326:20
    at new Promise (<anonymous>)
    at runWithCancel (http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2323:10)
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2305:20
stderr | tests/src/browser/Veneer.test.ts:83:2 > engine contexts and routing > reports failed boot teardown while rethrowing the boot error
[Error: Uncaught VeneerError: Component teardown failed]
stderr | tests/src/browser/Veneer.test.ts:132:2 > engine contexts and routing > isolates selector failures from later routes: [
[Error: Uncaught ]
stderr | tests/src/browser/Veneer.test.ts:218:24 > engine contexts and routing > releases settled components when boot fails: deferred=true
[Error: Uncaught Error: Settled boot failed]
stderr | tests/src/browser/Veneer.test.ts:275:2 > engine contexts and routing > destroys a failed boot and preserves its conflict, deferred=true
[Error: Uncaught VeneerError: A live component holds this plugin and host]
stderr | tests/src/browser/Veneer.test.ts:396:2 > engine contexts and routing > reports a throwing route and clear and continues to the next plugin
[Error: Uncaught Error: Dispatch refused]
stderr | tests/src/browser/Veneer.test.ts:396:2 > engine contexts and routing > reports a throwing route and clear and continues to the next plugin
[Error: Uncaught Error: Dispatch refused]

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 7 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |src:browser (chromium)| tests/src/browser/Collapse.test.ts:222:2 > Collapse oracle > propagates intrinsic to an accordion sibling it creates
AssertionError: expected 71.984375 to be 72 // Object.is equality

[32m- Expected[39m
[31m+ Received[39m

[32m- 72[39m
[31m+ 71.984375[39m

 ❯ tests/src/browser/Collapse.test.ts:255:48
    253|     { budget: 5000 },
    254|    )
    255|    expect(first.getBoundingClientRect().height).toBe(
       |                                                ^
    256|     expectedFirst.getBoundingClientRect().height,
    257|    )

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/7]⎯

 FAIL  |src:browser (chromium)| tests/src/browser/Placement.test.ts:471:2 > Placement controls > records the config-popover-flip transient departure and compares the settled box
AssertionError: expected { …(2) } to deeply equal { differences: [], unused: [] }

[32m- Expected[39m
[31m+ Received[39m

[2m  {[22m
[32m-   "differences": [],[39m
[32m-   "unused": [],[39m
[31m+   "differences": [[39m
[31m+     {[39m
[31m+       "actual": "Settled (406,265.40625,175.1875,107.1875,581.1875,372.59375)",[39m
[31m+       "checkpoint": "config-popover-flip",[39m
[31m+       "expected": "Initial (406,269,175.203125,107.1875,581.203125,376.1875); settled (406,265,175.203125,107.1875,581.203125,372.1875)",[39m
[31m+       "path": "floating",[39m
[31m+       "property": "box",[39m
[31m+     },[39m
[31m+     {[39m
[31m+       "actual": undefined,[39m
[31m+       "checkpoint": "config-popover-flip",[39m
[31m+       "expected": "Initial (401,269,155.984375,107.1875,556.984375,376.1875); settled (401,265,155.984375,107.1875,556.984375,372.1875)",[39m
[31m+       "path": "floating::box",[39m
[31m+       "property": "departure",[39m
[31m+     },[39m
[31m+   ],[39m
[31m+   "unused": [[39m
[31m+     {[39m
[31m+       "bootstrap": "Initial (401,269,155.984375,107.1875,556.984375,376.1875); settled (401,265,155.984375,107.1875,556.984375,372.1875)",[39m
[31m+       "engine": "Settled (401.03125,265.40625,155.96875,107.1875,557,372.59375)",[39m
[31m+       "path": "floating::box",[39m
[31m+       "proof": "Placement.test.ts: records the config-popover-flip transient departure and compares the settled box",[39m
[31m+       "reason": "A popperConfig modifier list replaces Bootstrap's early-placement and arrow modifiers; equality uses the oracle after one update, and the engine omits the transient. Box order: x,y,width,height,right,bottom.",[39m
[31m+       "scenario": "config-popover-flip",[39m
[31m+     },[39m
[31m+   ],[39m
[2m  }[22m

 ❯ tests/src/browser/Placement.test.ts:513:5
    511|      ledger.rows.filter((row) => row.scenario === 'config-popover-flip…
    512|     ),
    513|    ).toEqual({ differences: [], unused: [] })
       |     ^
    514|   } finally {
    515|    placement.destroy()

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/7]⎯

 FAIL  |src:browser (chromium)| tests/src/browser/Placement.test.ts:681:2 > Placement controls > measures the perpendicular keyword dimension swap warrant for constructed rules
AssertionError: expected 120 to be 80 // Object.is equality

[32m- Expected[39m
[31m+ Received[39m

[32m- 80[39m
[31m+ 120[39m

 ❯ tests/src/browser/Placement.test.ts:693:47
    691|    expect(panel.getBoundingClientRect().height).toBe(80)
    692|    panel.style.setProperty('position-try-fallbacks', 'flip-start')
    693|    expect(panel.getBoundingClientRect().width).toBe(80)
       |                                               ^
    694|    expect(panel.getBoundingClientRect().height).toBe(120)
    695|    panel.style.setProperty('position-try-fallbacks', 'none')

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/7]⎯

 FAIL  |src:browser (chromium)| tests/src/browser/Placement.test.ts:1019:3 > Placement moving geometry > 'Popover'-'scroll'
 FAIL  |src:browser (chromium)| tests/src/browser/Placement.test.ts:1019:3 > Placement moving geometry > 'Popover'-'transform'
AssertionError: expected 1.390625 to be less than or equal to 1
 ❯ tests/src/browser/Placement.test.ts:1062:7
    1060|      expect(
    1061|       Math.abs(requireValue(native)[coordinate] - requireValue(oracle)…
    1062|      ).toBeLessThanOrEqual(1)
       |       ^
    1063|   } finally {
    1064|    placement.destroy()

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/7]⎯

 FAIL  |src:browser (chromium)| tests/src/browser/Placement.test.ts:1072:1 > consumes every selected departure
AssertionError: expected [ { …(6) } ] to deeply equal []

[32m- Expected[39m
[31m+ Received[39m

[32m- [][39m
[31m+ [[39m
[31m+   {[39m
[31m+     "bootstrap": "Initial (401,269,155.984375,107.1875,556.984375,376.1875); settled (401,265,155.984375,107.1875,556.984375,372.1875)",[39m
[31m+     "engine": "Settled (401.03125,265.40625,155.96875,107.1875,557,372.59375)",[39m
[31m+     "path": "floating::box",[39m
[31m+     "proof": "Placement.test.ts: records the config-popover-flip transient departure and compares the settled box",[39m
[31m+     "reason": "A popperConfig modifier list replaces Bootstrap's early-placement and arrow modifiers; equality uses the oracle after one update, and the engine omits the transient. Box order: x,y,width,height,right,bottom.",[39m
[31m+     "scenario": "config-popover-flip",[39m
[31m+   },[39m
[31m+ ][39m

 ❯ tests/src/browser/Placement.test.ts:1073:23
    1071| const ledger = new DepartureLedger(readDepartures(guide, 'Engine depar…
    1072| it('consumes every selected departure', () => {
    1073|  expect(ledger.unused).toEqual([])
       |                       ^
    1074|  expect(ledger.unproven).toEqual([])
    1075| })

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[5/7]⎯

 FAIL  |src:browser (chromium)| tests/src/browser/Tip.test.ts:1147:2 > Tip initialization: popover > projects markup leaves and refuses the tooltip config and sanitizer attributes
AssertionError: expected 'top' to be 'right' // Object.is equality

Expected: [32m"right"[39m
Received: [31m"top"[39m

 ❯ tests/src/browser/Tip.test.ts:1166:25
    1164|    expect(tip.panel?.querySelector('[onerror]')).toBeNull()
    1165|    expect(tip.panel?.classList.contains('message')).toBe(true)
    1166|    expect(tip.placement).toBe('right')
       |                         ^
    1167|    expect(tip.phase).toBe('shown')
    1168|   } finally {

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[6/7]⎯


```


Gate folder: `/home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-collapse-c`.

start.json:

```text
{
  "timestamp": "2026-10-06T16:56:08.009Z",
  "argv": [
    "env",
    "PATH=/home/user/.wave/npm11/node_modules/.bin:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/opt/ruby-3.3.6/bin:/opt/rbenv/shims:/opt/rbenv/bin:/opt/node22/bin:/opt/maven/bin:/usr/lib/jvm/java-21-openjdk-amd64/bin:/opt/gradle/bin:/root/.bun/bin:/root/.codex/tmp/arg0/codex-arg0LZsdmo:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/root/.local/bin:/root/.cargo/bin:/usr/local/go/bin:/opt/node22/bin:/opt/maven/bin:/opt/gradle/bin:/opt/rbenv/bin:/root/.bun/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/root/.ccr/sessions/ffc8dbcaed7d035bd3355ea2e424a52d/bin",
    "/home/user/.wave/veneer-b4/node_modules/.bin/vitest",
    "run",
    "--config",
    "/home/user/.wave/veneer-b4/vite.config.ts",
    "--configLoader",
    "runner",
    "--no-cache",
    "--reporter=dot",
    "--project",
    "src:browser",
    "/home/user/.wave/veneer-b4/tests/src/browser/Collapse.test.ts"
  ],
  "cwd": "/home/user/.wave/veneer-b4",
  "category": "command",
  "browser": {
    "environment": {
      "PLAYWRIGHT_BROWSERS_PATH": "/opt/pw-browsers",
      "PLAYWRIGHT_EXECUTABLE_PATH": null,
      "PLAYWRIGHT_CHANNEL": null,
      "PLAYWRIGHT_WS_ENDPOINT": null
    },
    "bundled": "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "version": "Chromium 141.0.7390.37",
    "code": 0,
    "resolution": "Bundled fallback observation only; the Vitest resolver imports non-node packages and is not executed. Overrides and pinned Playwright may select another executable."
  }
}

```

end.json:

```text
{
  "timestamp": "2026-10-06T16:56:40.714Z",
  "seconds": 32.705,
  "child": {
    "code": 1,
    "signal": null
  },
  "exit": 1,
  "errors": []
}

```

stdout.log:

```text

 RUN  v4.1.11 /home/user/.wave/veneer-b4

···································x·

 Test Files  1 failed (1)
      Tests  1 failed | 36 passed (37)
   Start at  16:56:10
   Duration  30.52s (transform 0ms, setup 1.21s, import 257ms, tests 17.84s, environment 0ms)


```

stderr.log:

```text

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |src:browser (chromium)| tests/src/browser/Collapse.test.ts:888:1 > follows growing content with intrinsic while measured paths keep their endpoint
AssertionError: expected 239.96875 to be 240 // Object.is equality

[32m- Expected[39m
[31m+ Received[39m

[32m- 240[39m
[31m+ 239.96875[39m

 ❯ tests/src/browser/Collapse.test.ts:936:22
    934|     expect(panel.style.getPropertyValue('interpolate-size')).toBe('')
    935|     const completed = panel.getBoundingClientRect().height
    936|     expect(completed).toBe(growth ? 240 : 120)
       |                      ^
    937|     const reading = {
    938|      version: navigator.userAgent,

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


```


Gate folder: `/home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-collapse-d`.

start.json:

```text
{
  "timestamp": "2026-10-06T17:12:17.878Z",
  "argv": [
    "env",
    "PATH=/home/user/.wave/npm11/node_modules/.bin:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/opt/ruby-3.3.6/bin:/opt/rbenv/shims:/opt/rbenv/bin:/opt/node22/bin:/opt/maven/bin:/usr/lib/jvm/java-21-openjdk-amd64/bin:/opt/gradle/bin:/root/.bun/bin:/root/.codex/tmp/arg0/codex-arg0LZsdmo:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/root/.local/bin:/root/.cargo/bin:/usr/local/go/bin:/opt/node22/bin:/opt/maven/bin:/opt/gradle/bin:/opt/rbenv/bin:/root/.bun/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/root/.ccr/sessions/ffc8dbcaed7d035bd3355ea2e424a52d/bin",
    "/home/user/.wave/veneer-b4/node_modules/.bin/vitest",
    "run",
    "--config",
    "/home/user/.wave/veneer-b4/vite.config.ts",
    "--configLoader",
    "runner",
    "--no-cache",
    "--reporter=dot",
    "--project",
    "src:browser",
    "/home/user/.wave/veneer-b4/tests/src/browser/Collapse.test.ts"
  ],
  "cwd": "/home/user/.wave/veneer-b4",
  "category": "command",
  "browser": {
    "environment": {
      "PLAYWRIGHT_BROWSERS_PATH": "/opt/pw-browsers",
      "PLAYWRIGHT_EXECUTABLE_PATH": null,
      "PLAYWRIGHT_CHANNEL": null,
      "PLAYWRIGHT_WS_ENDPOINT": null
    },
    "bundled": "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "version": "Chromium 141.0.7390.37",
    "code": 0,
    "resolution": "Bundled fallback observation only; the Vitest resolver imports non-node packages and is not executed. Overrides and pinned Playwright may select another executable."
  }
}

```

end.json:

```text
{
  "timestamp": "2026-10-06T17:12:56.649Z",
  "seconds": 38.771,
  "child": {
    "code": 0,
    "signal": null
  },
  "exit": 0,
  "errors": []
}

```

stdout.log:

```text

 RUN  v4.1.11 /home/user/.wave/veneer-b4

·····································

 Test Files  1 passed (1)
      Tests  37 passed (37)
   Start at  17:12:19
   Duration  36.77s (transform 0ms, setup 1.28s, import 220ms, tests 23.08s, environment 0ms)


```

stderr.log:

```text
<empty>

```


Gate folder: `/home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-types-root-c`.

start.json:

```text
{
  "timestamp": "2026-10-06T17:12:57.183Z",
  "argv": [
    "env",
    "PATH=/home/user/.wave/npm11/node_modules/.bin:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/opt/ruby-3.3.6/bin:/opt/rbenv/shims:/opt/rbenv/bin:/opt/node22/bin:/opt/maven/bin:/usr/lib/jvm/java-21-openjdk-amd64/bin:/opt/gradle/bin:/root/.bun/bin:/root/.codex/tmp/arg0/codex-arg0LZsdmo:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/root/.local/bin:/root/.cargo/bin:/usr/local/go/bin:/opt/node22/bin:/opt/maven/bin:/opt/gradle/bin:/opt/rbenv/bin:/root/.bun/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/root/.ccr/sessions/ffc8dbcaed7d035bd3355ea2e424a52d/bin",
    "/home/user/.wave/veneer-b4/node_modules/.bin/tsc",
    "--noEmit",
    "--project",
    "/home/user/.wave/veneer-b4/tsconfig.json"
  ],
  "cwd": "/home/user/.wave/veneer-b4",
  "category": "command",
  "browser": {
    "environment": {
      "PLAYWRIGHT_BROWSERS_PATH": "/opt/pw-browsers",
      "PLAYWRIGHT_EXECUTABLE_PATH": null,
      "PLAYWRIGHT_CHANNEL": null,
      "PLAYWRIGHT_WS_ENDPOINT": null
    },
    "bundled": "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "version": "Chromium 141.0.7390.37",
    "code": 0,
    "resolution": "Bundled fallback observation only; the Vitest resolver imports non-node packages and is not executed. Overrides and pinned Playwright may select another executable."
  }
}

```

end.json:

```text
{
  "timestamp": "2026-10-06T17:14:05.162Z",
  "seconds": 67.979,
  "child": {
    "code": 0,
    "signal": null
  },
  "exit": 0,
  "errors": []
}

```

stdout.log:

```text
<empty>

```

stderr.log:

```text
<empty>

```


Gate folder: `/home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-browser-b`.

start.json:

```text
{
  "timestamp": "2026-10-06T17:14:05.292Z",
  "argv": [
    "env",
    "PATH=/home/user/.wave/npm11/node_modules/.bin:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/opt/ruby-3.3.6/bin:/opt/rbenv/shims:/opt/rbenv/bin:/opt/node22/bin:/opt/maven/bin:/usr/lib/jvm/java-21-openjdk-amd64/bin:/opt/gradle/bin:/root/.bun/bin:/root/.codex/tmp/arg0/codex-arg0LZsdmo:/opt/codex/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/codex-path:/root/.local/bin:/root/.cargo/bin:/usr/local/go/bin:/opt/node22/bin:/opt/maven/bin:/opt/gradle/bin:/opt/rbenv/bin:/root/.bun/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/root/.ccr/sessions/ffc8dbcaed7d035bd3355ea2e424a52d/bin",
    "/home/user/.wave/veneer-b4/node_modules/.bin/vitest",
    "run",
    "--config",
    "/home/user/.wave/veneer-b4/vite.config.ts",
    "--configLoader",
    "runner",
    "--no-cache",
    "--reporter=dot",
    "--project",
    "src:browser"
  ],
  "cwd": "/home/user/.wave/veneer-b4",
  "category": "command",
  "browser": {
    "environment": {
      "PLAYWRIGHT_BROWSERS_PATH": "/opt/pw-browsers",
      "PLAYWRIGHT_EXECUTABLE_PATH": null,
      "PLAYWRIGHT_CHANNEL": null,
      "PLAYWRIGHT_WS_ENDPOINT": null
    },
    "bundled": "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "version": "Chromium 141.0.7390.37",
    "code": 0,
    "resolution": "Bundled fallback observation only; the Vitest resolver imports non-node packages and is not executed. Overrides and pinned Playwright may select another executable."
  }
}

```

end.json:

```text
{
  "timestamp": "2026-10-06T17:17:29.901Z",
  "seconds": 204.609,
  "child": {
    "code": 1,
    "signal": null
  },
  "exit": 1,
  "errors": []
}

```

stdout.log:

```text

 RUN  v4.1.11 /home/user/.wave/veneer-b4

·····················································································x···································································································stdout | tests/src/browser/helpers.test.ts:1170:2 > transition completion > observes CSS transitions synchronously after the write and bounds completion
{"measurement":"getAnimations-synchrony","synchronous":1,"elapsed":155.60000000149012,"duration":"0.15s","synthetic":0}
·····················································································································································································stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'scaled'
{"name":"scaled","initial":{"box":{"x":155,"y":460,"width":240,"height":75,"right":395,"bottom":535},"placement":"bottom-start"},"expected":{"box":{"x":155,"y":460,"width":240,"height":75,"right":395,"bottom":535},"placement":"bottom-start"},"actual":{"box":{"x":155,"y":459,"width":240,"height":75,"right":395,"bottom":534},"placement":"bottom-start"},"area":"end span-end","style":"position-anchor: --vn-placement-19; position: fixed; translate: 0px -0.666667px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'offset-nan'
{"name":"offset-nan","initial":{"box":{"x":150,"y":338,"width":160,"height":50,"right":310,"bottom":388},"placement":"bottom-start"},"expected":{"box":{"x":150,"y":338,"width":160,"height":50,"right":310,"bottom":388},"placement":"bottom-start"},"actual":{"box":{"x":150,"y":338,"width":160,"height":50,"right":310,"bottom":388},"placement":"bottom-start"},"area":"end span-end","style":"position-anchor: --vn-placement-20; position: fixed; translate: 0px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 0px; width: 160px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-start-800-ltr'
{"name":"dropdown-start-800-ltr","initial":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"expected":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"actual":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"area":"end span-end","style":"position-anchor: --vn-placement-21; position: fixed; translate: 0px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-dropdown-menu-end-800-ltr'
{"name":"dropdown-dropdown-menu-end-800-ltr","initial":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"expected":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"actual":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"area":"end span-start","style":"position-anchor: --vn-placement-22; position: fixed; translate: 0px; position-area: block-end span-inline-start; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-dropdown-menu-lg-end-800-ltr'
{"name":"dropdown-dropdown-menu-lg-end-800-ltr","initial":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"expected":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"actual":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"area":"end span-end","style":"position-anchor: --vn-placement-23; position: fixed; translate: 0px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-dropdown-menu-lg-end-1100-ltr'
{"name":"dropdown-dropdown-menu-lg-end-1100-ltr","initial":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"expected":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"actual":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"area":"end span-start","style":"position-anchor: --vn-placement-24; position: fixed; translate: 0px; position-area: block-end span-inline-start; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-start-800-ltr'
{"name":"dropup-start-800-ltr","initial":{"box":{"x":150,"y":248,"width":160,"height":50,"right":310,"bottom":298},"placement":"top-start"},"expected":{"box":{"x":150,"y":248,"width":160,"height":50,"right":310,"bottom":298},"placement":"top-start"},"actual":{"box":{"x":150,"y":248,"width":160,"height":50,"right":310,"bottom":298},"placement":"top-start"},"area":"start span-end","style":"position-anchor: --vn-placement-25; position: fixed; translate: 0px; position-area: block-start span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-dropdown-menu-end-800-ltr'
{"name":"dropup-dropdown-menu-end-800-ltr","initial":{"box":{"x":86.53125,"y":248,"width":160,"height":50,"right":246.53125,"bottom":298},"placement":"top-end"},"expected":{"box":{"x":86.53125,"y":248,"width":160,"height":50,"right":246.53125,"bottom":298},"placement":"top-end"},"actual":{"box":{"x":86.53125,"y":248,"width":160,"height":50,"right":246.53125,"bottom":298},"placement":"top-end"},"area":"start span-start","style":"position-anchor: --vn-placement-26; position: fixed; translate: 0px; position-area: block-start span-inline-start; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-dropdown-menu-lg-end-800-ltr'
{"name":"dropup-dropdown-menu-lg-end-800-ltr","initial":{"box":{"x":150,"y":248,"width":160,"height":50,"right":310,"bottom":298},"placement":"top-start"},"expected":{"box":{"x":150,"y":248,"width":160,"height":50,"right":310,"bottom":298},"placement":"top-start"},"actual":{"box":{"x":150,"y":248,"width":160,"height":50,"right":310,"bottom":298},"placement":"top-start"},"area":"start span-end","style":"position-anchor: --vn-placement-27; position: fixed; translate: 0px; position-area: block-start span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-dropdown-menu-lg-end-1100-ltr'
{"name":"dropup-dropdown-menu-lg-end-1100-ltr","initial":{"box":{"x":86.53125,"y":248,"width":160,"height":50,"right":246.53125,"bottom":298},"placement":"top-end"},"expected":{"box":{"x":86.53125,"y":248,"width":160,"height":50,"right":246.53125,"bottom":298},"placement":"top-end"},"actual":{"box":{"x":86.53125,"y":248,"width":160,"height":50,"right":246.53125,"bottom":298},"placement":"top-end"},"area":"start span-start","style":"position-anchor: --vn-placement-28; position: fixed; translate: 0px; position-area: block-start span-inline-start; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 0px 0px 2px; width: 160px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropend-start-800-ltr'
{"name":"dropend-start-800-ltr","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end end","style":"position-anchor: --vn-placement-29; position: fixed; translate: 0px; position-area: span-block-end inline-end; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 0px 0px 2px; width: 160px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropend-dropdown-menu-end-800-ltr'
{"name":"dropend-dropdown-menu-end-800-ltr","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end end","style":"position-anchor: --vn-placement-30; position: fixed; translate: 0px; position-area: span-block-end inline-end; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropend-dropdown-menu-lg-end-800-ltr'
{"name":"dropend-dropdown-menu-lg-end-800-ltr","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end end","style":"position-anchor: --vn-placement-31; position: fixed; translate: 0px; position-area: span-block-end inline-end; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropend-dropdown-menu-lg-end-1100-ltr'
{"name":"dropend-dropdown-menu-lg-end-1100-ltr","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end end","style":"position-anchor: --vn-placement-32; position: fixed; translate: 0px; position-area: span-block-end inline-end; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropstart-start-800-ltr'
{"name":"dropstart-start-800-ltr","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end end","style":"position-anchor: --vn-placement-33; position: fixed; translate: 0px; position-area: span-block-end inline-start; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropstart-dropdown-menu-end-800-ltr'
{"name":"dropstart-dropdown-menu-end-800-ltr","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end end","style":"position-anchor: --vn-placement-34; position: fixed; translate: 0px; position-area: span-block-end inline-start; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 2px 0px 0px; width: 160px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropstart-dropdown-menu-lg-end-800-ltr'
{"name":"dropstart-dropdown-menu-lg-end-800-ltr","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end end","style":"position-anchor: --vn-placement-35; position: fixed; translate: 0px; position-area: span-block-end inline-start; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropstart-dropdown-menu-lg-end-1100-l…'
{"name":"dropstart-dropdown-menu-lg-end-1100-ltr","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end end","style":"position-anchor: --vn-placement-36; position: fixed; translate: 0px; position-area: span-block-end inline-start; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 2px 0px 0px; width: 160px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-center-start-800-ltr'
{"name":"dropup-center-start-800-ltr","initial":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"expected":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"actual":{"box":{"x":118.265625,"y":248,"width":160,"height":50,"right":278.265625,"bottom":298},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-37; position: fixed; translate: 0px; position-area: block-start; position-try-fallbacks: flip-block; inset: auto; margin: 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-center-dropdown-menu-end-800-l…'
{"name":"dropup-center-dropdown-menu-end-800-ltr","initial":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"expected":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"actual":{"box":{"x":118.265625,"y":248,"width":160,"height":50,"right":278.265625,"bottom":298},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-38; position: fixed; translate: 0px; position-area: block-start; position-try-fallbacks: flip-block; inset: auto; margin: 0px 0px 2px; width: 160px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-center-dropdown-menu-lg-end-80…'
{"name":"dropup-center-dropdown-menu-lg-end-800-ltr","initial":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"expected":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"actual":{"box":{"x":118.265625,"y":248,"width":160,"height":50,"right":278.265625,"bottom":298},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-39; position: fixed; translate: 0px; position-area: block-start; position-try-fallbacks: flip-block; inset: auto; margin: 0px 0px 2px; width: 160px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-center-dropdown-menu-lg-end-11…'
{"name":"dropup-center-dropdown-menu-lg-end-1100-ltr","initial":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"expected":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"actual":{"box":{"x":118.265625,"y":248,"width":160,"height":50,"right":278.265625,"bottom":298},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-40; position: fixed; translate: 0px; position-area: block-start; position-try-fallbacks: flip-block; inset: auto; margin: 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-center-start-800-ltr'
{"name":"dropdown-center-start-800-ltr","initial":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"expected":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"actual":{"box":{"x":118.265625,"y":340,"width":160,"height":50,"right":278.265625,"bottom":390},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-41; position: fixed; translate: 0px; position-area: block-end; position-try-fallbacks: flip-block; inset: auto; margin: 2px 0px 0px; width: 160px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-center-dropdown-menu-end-800…'
{"name":"dropdown-center-dropdown-menu-end-800-ltr","initial":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"expected":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"actual":{"box":{"x":118.265625,"y":340,"width":160,"height":50,"right":278.265625,"bottom":390},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-42; position: fixed; translate: 0px; position-area: block-end; position-try-fallbacks: flip-block; inset: auto; margin: 2px 0px 0px; width: 160px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-center-dropdown-menu-lg-end-…'
{"name":"dropdown-center-dropdown-menu-lg-end-800-ltr","initial":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"expected":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"actual":{"box":{"x":118.265625,"y":340,"width":160,"height":50,"right":278.265625,"bottom":390},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-43; position: fixed; translate: 0px; position-area: block-end; position-try-fallbacks: flip-block; inset: auto; margin: 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-center-dropdown-menu-lg-end-…'
{"name":"dropdown-center-dropdown-menu-lg-end-1100-ltr","initial":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"expected":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"actual":{"box":{"x":118.265625,"y":340,"width":160,"height":50,"right":278.265625,"bottom":390},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-44; position: fixed; translate: 0px; position-area: block-end; position-try-fallbacks: flip-block; inset: auto; margin: 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-start-800-rtl'
{"name":"dropdown-start-800-rtl","initial":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"expected":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"actual":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"area":"end span-end","style":"position-anchor: --vn-placement-45; position: fixed; translate: 0px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-dropdown-menu-end-800-rtl'
{"name":"dropdown-dropdown-menu-end-800-rtl","initial":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"expected":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"actual":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"area":"end span-start","style":"position-anchor: --vn-placement-46; position: fixed; translate: 0px; position-area: block-end span-inline-start; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-dropdown-menu-lg-end-800-rtl'
{"name":"dropdown-dropdown-menu-lg-end-800-rtl","initial":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"expected":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"actual":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"area":"end span-end","style":"position-anchor: --vn-placement-47; position: fixed; translate: 0px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-dropdown-menu-lg-end-1100-rtl'
{"name":"dropdown-dropdown-menu-lg-end-1100-rtl","initial":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"expected":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"actual":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"area":"end span-start","style":"position-anchor: --vn-placement-48; position: fixed; translate: 0px; position-area: block-end span-inline-start; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-start-800-rtl'
{"name":"dropup-start-800-rtl","initial":{"box":{"x":86.53125,"y":248,"width":160,"height":50,"right":246.53125,"bottom":298},"placement":"top-end"},"expected":{"box":{"x":86.53125,"y":248,"width":160,"height":50,"right":246.53125,"bottom":298},"placement":"top-end"},"actual":{"box":{"x":86.53125,"y":248,"width":160,"height":50,"right":246.53125,"bottom":298},"placement":"top-end"},"area":"start span-end","style":"position-anchor: --vn-placement-49; position: fixed; translate: 0px; position-area: block-start span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 0px 0px 2px; width: 160px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-dropdown-menu-end-800-rtl'
{"name":"dropup-dropdown-menu-end-800-rtl","initial":{"box":{"x":150,"y":248,"width":160,"height":50,"right":310,"bottom":298},"placement":"top-start"},"expected":{"box":{"x":150,"y":248,"width":160,"height":50,"right":310,"bottom":298},"placement":"top-start"},"actual":{"box":{"x":150,"y":248,"width":160,"height":50,"right":310,"bottom":298},"placement":"top-start"},"area":"start span-start","style":"position-anchor: --vn-placement-50; position: fixed; translate: 0px; position-area: block-start span-inline-start; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-dropdown-menu-lg-end-800-rtl'
{"name":"dropup-dropdown-menu-lg-end-800-rtl","initial":{"box":{"x":86.53125,"y":248,"width":160,"height":50,"right":246.53125,"bottom":298},"placement":"top-end"},"expected":{"box":{"x":86.53125,"y":248,"width":160,"height":50,"right":246.53125,"bottom":298},"placement":"top-end"},"actual":{"box":{"x":86.53125,"y":248,"width":160,"height":50,"right":246.53125,"bottom":298},"placement":"top-end"},"area":"start span-end","style":"position-anchor: --vn-placement-51; position: fixed; translate: 0px; position-area: block-start span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-dropdown-menu-lg-end-1100-rtl'
{"name":"dropup-dropdown-menu-lg-end-1100-rtl","initial":{"box":{"x":150,"y":248,"width":160,"height":50,"right":310,"bottom":298},"placement":"top-start"},"expected":{"box":{"x":150,"y":248,"width":160,"height":50,"right":310,"bottom":298},"placement":"top-start"},"actual":{"box":{"x":150,"y":248,"width":160,"height":50,"right":310,"bottom":298},"placement":"top-start"},"area":"start span-start","style":"position-anchor: --vn-placement-52; position: fixed; translate: 0px; position-area: block-start span-inline-start; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropend-start-800-rtl'
{"name":"dropend-start-800-rtl","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end start","style":"position-anchor: --vn-placement-53; position: fixed; translate: 0px; position-area: span-block-end inline-end; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropend-dropdown-menu-end-800-rtl'
{"name":"dropend-dropdown-menu-end-800-rtl","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end start","style":"position-anchor: --vn-placement-54; position: fixed; translate: 0px; position-area: span-block-end inline-end; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 2px 0px 0px; width: 160px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropend-dropdown-menu-lg-end-800-rtl'
{"name":"dropend-dropdown-menu-lg-end-800-rtl","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end start","style":"position-anchor: --vn-placement-55; position: fixed; translate: 0px; position-area: span-block-end inline-end; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 2px 0px 0px; width: 160px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropend-dropdown-menu-lg-end-1100-rtl'
{"name":"dropend-dropdown-menu-lg-end-1100-rtl","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end start","style":"position-anchor: --vn-placement-56; position: fixed; translate: 0px; position-area: span-block-end inline-end; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropstart-start-800-rtl'
{"name":"dropstart-start-800-rtl","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end start","style":"position-anchor: --vn-placement-57; position: fixed; translate: 0px; position-area: span-block-end inline-start; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropstart-dropdown-menu-end-800-rtl'
{"name":"dropstart-dropdown-menu-end-800-rtl","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end start","style":"position-anchor: --vn-placement-58; position: fixed; translate: 0px; position-area: span-block-end inline-start; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropstart-dropdown-menu-lg-end-800-rtl'
{"name":"dropstart-dropdown-menu-lg-end-800-rtl","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end start","style":"position-anchor: --vn-placement-59; position: fixed; translate: 0px; position-area: span-block-end inline-start; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropstart-dropdown-menu-lg-end-1100-r…'
{"name":"dropstart-dropdown-menu-lg-end-1100-rtl","initial":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":245,"y":300,"width":160,"height":50,"right":405,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":244.53125,"y":300,"width":160,"height":50,"right":404.53125,"bottom":350},"placement":"right-start"},"area":"span-end start","style":"position-anchor: --vn-placement-60; position: fixed; translate: 0px; position-area: span-block-end inline-start; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-center-start-800-rtl'
{"name":"dropup-center-start-800-rtl","initial":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"expected":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"actual":{"box":{"x":118.265625,"y":248,"width":160,"height":50,"right":278.265625,"bottom":298},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-61; position: fixed; translate: 0px; position-area: block-start; position-try-fallbacks: flip-block; inset: auto; margin: 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-center-dropdown-menu-end-800-r…'
{"name":"dropup-center-dropdown-menu-end-800-rtl","initial":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"expected":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"actual":{"box":{"x":118.265625,"y":248,"width":160,"height":50,"right":278.265625,"bottom":298},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-62; position: fixed; translate: 0px; position-area: block-start; position-try-fallbacks: flip-block; inset: auto; margin: 0px 0px 2px; width: 160px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-center-dropdown-menu-lg-end-80…'
{"name":"dropup-center-dropdown-menu-lg-end-800-rtl","initial":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"expected":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"actual":{"box":{"x":118.265625,"y":248,"width":160,"height":50,"right":278.265625,"bottom":298},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-63; position: fixed; translate: 0px; position-area: block-start; position-try-fallbacks: flip-block; inset: auto; margin: 0px 0px 2px; width: 160px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropup-center-dropdown-menu-lg-end-11…'
{"name":"dropup-center-dropdown-menu-lg-end-1100-rtl","initial":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"expected":{"box":{"x":118,"y":248,"width":160,"height":50,"right":278,"bottom":298},"placement":"top"},"actual":{"box":{"x":118.265625,"y":248,"width":160,"height":50,"right":278.265625,"bottom":298},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-64; position: fixed; translate: 0px; position-area: block-start; position-try-fallbacks: flip-block; inset: auto; margin: 0px 0px 2px; width: 160px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-center-start-800-rtl'
{"name":"dropdown-center-start-800-rtl","initial":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"expected":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"actual":{"box":{"x":118.265625,"y":340,"width":160,"height":50,"right":278.265625,"bottom":390},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-65; position: fixed; translate: 0px; position-area: block-end; position-try-fallbacks: flip-block; inset: auto; margin: 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-center-dropdown-menu-end-800…'
{"name":"dropdown-center-dropdown-menu-end-800-rtl","initial":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"expected":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"actual":{"box":{"x":118.265625,"y":340,"width":160,"height":50,"right":278.265625,"bottom":390},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-66; position: fixed; translate: 0px; position-area: block-end; position-try-fallbacks: flip-block; inset: auto; margin: 2px 0px 0px; width: 160px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-center-dropdown-menu-lg-end-…'
{"name":"dropdown-center-dropdown-menu-lg-end-800-rtl","initial":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"expected":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"actual":{"box":{"x":118.265625,"y":340,"width":160,"height":50,"right":278.265625,"bottom":390},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-67; position: fixed; translate: 0px; position-area: block-end; position-try-fallbacks: flip-block; inset: auto; margin: 2px 0px 0px; width: 160px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-center-dropdown-menu-lg-end-…'
{"name":"dropdown-center-dropdown-menu-lg-end-1100-rtl","initial":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"expected":{"box":{"x":118,"y":340,"width":160,"height":50,"right":278,"bottom":390},"placement":"bottom"},"actual":{"box":{"x":118.265625,"y":340,"width":160,"height":50,"right":278.265625,"bottom":390},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-68; position: fixed; translate: 0px; position-area: block-end; position-try-fallbacks: flip-block; inset: auto; margin: 2px 0px 0px; width: 160px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-top-center-ltr'
{"name":"Tooltip-top-center-ltr","initial":{"box":{"x":113,"y":265,"width":157.203125,"height":29,"right":270.203125,"bottom":294},"arrow":{"x":185,"y":294,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":300.390625},"placement":"top"},"expected":{"box":{"x":113,"y":265,"width":157.203125,"height":29,"right":270.203125,"bottom":294},"arrow":{"x":185,"y":294,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":300.390625},"placement":"top"},"actual":{"box":{"x":112.40625,"y":265,"width":157.1875,"height":29,"right":269.59375,"bottom":294},"arrow":{"x":184.40625,"y":294,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":300.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-69; position: fixed; translate: -16px 265px; position-area: block-start; position-try-fallbacks: --vn-placement-69-1, flip-block, --vn-placement-69-3; inset: auto; margin: 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-top-top-ltr'
{"name":"Tooltip-top-top-ltr","initial":{"box":{"x":238,"y":7,"width":157.203125,"height":29,"right":395.203125,"bottom":36},"arrow":{"x":231.609375,"y":15,"width":6.390625,"height":12.796875,"right":238,"bottom":27.796875},"placement":"right"},"expected":{"box":{"x":238,"y":7,"width":157.203125,"height":29,"right":395.203125,"bottom":36},"arrow":{"x":231.609375,"y":15,"width":6.390625,"height":12.796875,"right":238,"bottom":27.796875},"placement":"right"},"actual":{"box":{"x":238,"y":6.5,"width":157.1875,"height":29,"right":395.1875,"bottom":35.5},"arrow":{"x":231.609375,"y":14.5,"width":6.390625,"height":12.796875,"right":238,"bottom":27.296875},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-70; position: fixed; translate: 232px -427px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-top-right-ltr'
{"name":"Tooltip-top-right-ltr","initial":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"expected":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"actual":{"box":{"x":161,"y":304.5,"width":157.1875,"height":29,"right":318.1875,"bottom":333.5},"arrow":{"x":318.1875,"y":312.5,"width":6.390625,"height":12.796875,"right":324.578125,"bottom":325.296875},"placement":"left"},"area":"inline-start","style":"position-anchor: --vn-placement-71; position: fixed; translate: 161px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 6px 0px 0px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-top-bottom-ltr'
{"name":"Tooltip-top-bottom-ltr","initial":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"expected":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"actual":{"box":{"x":112.40625,"y":821,"width":157.1875,"height":29,"right":269.59375,"bottom":850},"arrow":{"x":184.40625,"y":850,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":856.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-72; position: fixed; translate: -16px 821px; position-area: block-start; position-try-fallbacks: --vn-placement-72-1, flip-block, --vn-placement-72-3; inset: auto; margin: 0px 0px 6px; width: 157.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-top-left-ltr'
{"name":"Tooltip-top-left-ltr","initial":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"expected":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"actual":{"box":{"x":90,"y":304.5,"width":157.1875,"height":29,"right":247.1875,"bottom":333.5},"arrow":{"x":83.609375,"y":312.5,"width":6.390625,"height":12.796875,"right":90,"bottom":325.296875},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-73; position: fixed; translate: 84px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-right-center-ltr'
{"name":"Tooltip-right-center-ltr","initial":{"box":{"x":238,"y":305,"width":157.203125,"height":29,"right":395.203125,"bottom":334},"arrow":{"x":231.609375,"y":313,"width":6.390625,"height":12.796875,"right":238,"bottom":325.796875},"placement":"right"},"expected":{"box":{"x":238,"y":305,"width":157.203125,"height":29,"right":395.203125,"bottom":334},"arrow":{"x":231.609375,"y":313,"width":6.390625,"height":12.796875,"right":238,"bottom":325.796875},"placement":"right"},"actual":{"box":{"x":238,"y":304.5,"width":157.1875,"height":29,"right":395.1875,"bottom":333.5},"arrow":{"x":231.609375,"y":312.5,"width":6.390625,"height":12.796875,"right":238,"bottom":325.296875},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-74; position: fixed; translate: 232px -129px; position-area: inline-end; position-try-fallbacks: --vn-placement-74-0, --vn-placement-74-2, flip-inline; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-right-top-ltr'
{"name":"Tooltip-right-top-ltr","initial":{"box":{"x":238,"y":7,"width":157.203125,"height":29,"right":395.203125,"bottom":36},"arrow":{"x":231.609375,"y":15,"width":6.390625,"height":12.796875,"right":238,"bottom":27.796875},"placement":"right"},"expected":{"box":{"x":238,"y":7,"width":157.203125,"height":29,"right":395.203125,"bottom":36},"arrow":{"x":231.609375,"y":15,"width":6.390625,"height":12.796875,"right":238,"bottom":27.796875},"placement":"right"},"actual":{"box":{"x":238,"y":6.5,"width":157.1875,"height":29,"right":395.1875,"bottom":35.5},"arrow":{"x":231.609375,"y":14.5,"width":6.390625,"height":12.796875,"right":238,"bottom":27.296875},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-75; position: fixed; translate: 232px -427px; position-area: inline-end; position-try-fallbacks: --vn-placement-75-0, --vn-placement-75-2, flip-inline; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-right-right-ltr'
{"name":"Tooltip-right-right-ltr","initial":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"expected":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"actual":{"box":{"x":161,"y":304.5,"width":157.1875,"height":29,"right":318.1875,"bottom":333.5},"arrow":{"x":318.1875,"y":312.5,"width":6.390625,"height":12.796875,"right":324.578125,"bottom":325.296875},"placement":"left"},"area":"inline-start","style":"position-anchor: --vn-placement-76; position: fixed; translate: 161px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 6px 0px 0px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-right-bottom-ltr'
{"name":"Tooltip-right-bottom-ltr","initial":{"box":{"x":238,"y":861,"width":157.203125,"height":29,"right":395.203125,"bottom":890},"arrow":{"x":231.609375,"y":869,"width":6.390625,"height":12.796875,"right":238,"bottom":881.796875},"placement":"right"},"expected":{"box":{"x":238,"y":861,"width":157.203125,"height":29,"right":395.203125,"bottom":890},"arrow":{"x":231.609375,"y":869,"width":6.390625,"height":12.796875,"right":238,"bottom":881.796875},"placement":"right"},"actual":{"box":{"x":238,"y":860.5,"width":157.1875,"height":29,"right":395.1875,"bottom":889.5},"arrow":{"x":231.609375,"y":868.5,"width":6.390625,"height":12.796875,"right":238,"bottom":881.296875},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-77; position: fixed; translate: 232px 427px; position-area: inline-end; position-try-fallbacks: --vn-placement-77-0, --vn-placement-77-2, flip-inline; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-right-left-ltr'
{"name":"Tooltip-right-left-ltr","initial":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"expected":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"actual":{"box":{"x":90,"y":304.5,"width":157.1875,"height":29,"right":247.1875,"bottom":333.5},"arrow":{"x":83.609375,"y":312.5,"width":6.390625,"height":12.796875,"right":90,"bottom":325.296875},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-78; position: fixed; translate: 84px -129px; position-area: inline-end; position-try-fallbacks: --vn-placement-78-0, --vn-placement-78-2, flip-inline; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-bottom-center-ltr'
{"name":"Tooltip-bottom-center-ltr","initial":{"box":{"x":113,"y":344,"width":157.203125,"height":29,"right":270.203125,"bottom":373},"arrow":{"x":185,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":344},"placement":"bottom"},"expected":{"box":{"x":113,"y":344,"width":157.203125,"height":29,"right":270.203125,"bottom":373},"arrow":{"x":185,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":344},"placement":"bottom"},"actual":{"box":{"x":112.40625,"y":344,"width":157.1875,"height":29,"right":269.59375,"bottom":373},"arrow":{"x":184.40625,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":344},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-79; position: fixed; translate: -16px 338px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-79-1, --vn-placement-79-3; inset: auto; margin: 6px 0px 0px; width: 157.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-bottom-top-ltr'
{"name":"Tooltip-bottom-top-ltr","initial":{"box":{"x":113,"y":46,"width":157.203125,"height":29,"right":270.203125,"bottom":75},"arrow":{"x":185,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":46},"placement":"bottom"},"expected":{"box":{"x":113,"y":46,"width":157.203125,"height":29,"right":270.203125,"bottom":75},"arrow":{"x":185,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":46},"placement":"bottom"},"actual":{"box":{"x":112.40625,"y":46,"width":157.1875,"height":29,"right":269.59375,"bottom":75},"arrow":{"x":184.40625,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":46},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-80; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-80-1, --vn-placement-80-3; inset: auto; margin: 6px 0px 0px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-bottom-right-ltr'
{"name":"Tooltip-bottom-right-ltr","initial":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"expected":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"actual":{"box":{"x":161,"y":304.5,"width":157.1875,"height":29,"right":318.1875,"bottom":333.5},"arrow":{"x":318.1875,"y":312.5,"width":6.390625,"height":12.796875,"right":324.578125,"bottom":325.296875},"placement":"left"},"area":"inline-start","style":"position-anchor: --vn-placement-81; position: fixed; translate: 161px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 6px 0px 0px; width: 157.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-bottom-bottom-ltr'
{"name":"Tooltip-bottom-bottom-ltr","initial":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"expected":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"actual":{"box":{"x":112.40625,"y":821,"width":157.1875,"height":29,"right":269.59375,"bottom":850},"arrow":{"x":184.40625,"y":850,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":856.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-82; position: fixed; translate: -16px 821px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 6px; width: 157.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-bottom-left-ltr'
{"name":"Tooltip-bottom-left-ltr","initial":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"expected":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"actual":{"box":{"x":90,"y":304.5,"width":157.1875,"height":29,"right":247.1875,"bottom":333.5},"arrow":{"x":83.609375,"y":312.5,"width":6.390625,"height":12.796875,"right":90,"bottom":325.296875},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-83; position: fixed; translate: 84px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-left-center-ltr'
{"name":"Tooltip-left-center-ltr","initial":{"box":{"x":113,"y":265,"width":157.203125,"height":29,"right":270.203125,"bottom":294},"arrow":{"x":185,"y":294,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":300.390625},"placement":"top"},"expected":{"box":{"x":113,"y":265,"width":157.203125,"height":29,"right":270.203125,"bottom":294},"arrow":{"x":185,"y":294,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":300.390625},"placement":"top"},"actual":{"box":{"x":112.40625,"y":265,"width":157.1875,"height":29,"right":269.59375,"bottom":294},"arrow":{"x":184.40625,"y":294,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":300.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-84; position: fixed; translate: -16px 265px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-left-top-ltr'
{"name":"Tooltip-left-top-ltr","initial":{"box":{"x":238,"y":7,"width":157.203125,"height":29,"right":395.203125,"bottom":36},"arrow":{"x":231.609375,"y":15,"width":6.390625,"height":12.796875,"right":238,"bottom":27.796875},"placement":"right"},"expected":{"box":{"x":238,"y":7,"width":157.203125,"height":29,"right":395.203125,"bottom":36},"arrow":{"x":231.609375,"y":15,"width":6.390625,"height":12.796875,"right":238,"bottom":27.796875},"placement":"right"},"actual":{"box":{"x":238,"y":6.5,"width":157.1875,"height":29,"right":395.1875,"bottom":35.5},"arrow":{"x":231.609375,"y":14.5,"width":6.390625,"height":12.796875,"right":238,"bottom":27.296875},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-85; position: fixed; translate: 232px -427px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-left-right-ltr'
{"name":"Tooltip-left-right-ltr","initial":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"expected":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"actual":{"box":{"x":161,"y":304.5,"width":157.1875,"height":29,"right":318.1875,"bottom":333.5},"arrow":{"x":318.1875,"y":312.5,"width":6.390625,"height":12.796875,"right":324.578125,"bottom":325.296875},"placement":"left"},"area":"inline-start","style":"position-anchor: --vn-placement-86; position: fixed; translate: 161px -129px; position-area: inline-start; position-try-fallbacks: --vn-placement-86-0, flip-inline, --vn-placement-86-2; inset: auto; margin: 0px 6px 0px 0px; width: 157.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-left-bottom-ltr'
{"name":"Tooltip-left-bottom-ltr","initial":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"expected":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"actual":{"box":{"x":112.40625,"y":821,"width":157.1875,"height":29,"right":269.59375,"bottom":850},"arrow":{"x":184.40625,"y":850,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":856.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-87; position: fixed; translate: -16px 821px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-left-left-ltr'
{"name":"Tooltip-left-left-ltr","initial":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"expected":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"actual":{"box":{"x":90,"y":304.5,"width":157.1875,"height":29,"right":247.1875,"bottom":333.5},"arrow":{"x":83.609375,"y":312.5,"width":6.390625,"height":12.796875,"right":90,"bottom":325.296875},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-88; position: fixed; translate: 84px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-auto-center-ltr'
{"name":"Tooltip-auto-center-ltr","initial":{"box":{"x":113,"y":344,"width":157.203125,"height":29,"right":270.203125,"bottom":373},"arrow":{"x":185,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":344},"placement":"bottom"},"expected":{"box":{"x":113,"y":344,"width":157.203125,"height":29,"right":270.203125,"bottom":373},"arrow":{"x":185,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":344},"placement":"bottom"},"actual":{"box":{"x":112.40625,"y":344,"width":157.1875,"height":29,"right":269.59375,"bottom":373},"arrow":{"x":184.40625,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":344},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-89; position: fixed; translate: -16px 338px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-89-1, --vn-placement-89-3; inset: auto; margin: 6px 0px 0px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-auto-top-ltr'
{"name":"Tooltip-auto-top-ltr","initial":{"box":{"x":113,"y":46,"width":157.203125,"height":29,"right":270.203125,"bottom":75},"arrow":{"x":185,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":46},"placement":"bottom"},"expected":{"box":{"x":113,"y":46,"width":157.203125,"height":29,"right":270.203125,"bottom":75},"arrow":{"x":185,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":46},"placement":"bottom"},"actual":{"box":{"x":112.40625,"y":46,"width":157.1875,"height":29,"right":269.59375,"bottom":75},"arrow":{"x":184.40625,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":46},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-90; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-90-1, --vn-placement-90-3; inset: auto; margin: 6px 0px 0px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-auto-right-ltr'
{"name":"Tooltip-auto-right-ltr","initial":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"expected":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"actual":{"box":{"x":161,"y":304.5,"width":157.1875,"height":29,"right":318.1875,"bottom":333.5},"arrow":{"x":318.1875,"y":312.5,"width":6.390625,"height":12.796875,"right":324.578125,"bottom":325.296875},"placement":"left"},"area":"inline-start","style":"position-anchor: --vn-placement-91; position: fixed; translate: 161px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 6px 0px 0px; width: 157.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-auto-bottom-ltr'
{"name":"Tooltip-auto-bottom-ltr","initial":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"expected":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"actual":{"box":{"x":112.40625,"y":821,"width":157.1875,"height":29,"right":269.59375,"bottom":850},"arrow":{"x":184.40625,"y":850,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":856.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-92; position: fixed; translate: -16px 821px; position-area: block-start; position-try-fallbacks: --vn-placement-92-1, flip-block, --vn-placement-92-3; inset: auto; margin: 0px 0px 6px; width: 157.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-auto-left-ltr'
{"name":"Tooltip-auto-left-ltr","initial":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"expected":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"actual":{"box":{"x":90,"y":304.5,"width":157.1875,"height":29,"right":247.1875,"bottom":333.5},"arrow":{"x":83.609375,"y":312.5,"width":6.390625,"height":12.796875,"right":90,"bottom":325.296875},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-93; position: fixed; translate: 84px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-top-center-rtl'
{"name":"Tooltip-top-center-rtl","initial":{"box":{"x":113,"y":265,"width":157.203125,"height":29,"right":270.203125,"bottom":294},"arrow":{"x":185,"y":294,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":300.390625},"placement":"top"},"expected":{"box":{"x":113,"y":265,"width":157.203125,"height":29,"right":270.203125,"bottom":294},"arrow":{"x":185,"y":294,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":300.390625},"placement":"top"},"actual":{"box":{"x":112.40625,"y":265,"width":157.1875,"height":29,"right":269.59375,"bottom":294},"arrow":{"x":184.40625,"y":294,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":300.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-94; position: fixed; translate: -16px 265px; position-area: block-start; position-try-fallbacks: --vn-placement-94-1, flip-block, --vn-placement-94-3; inset: auto; margin: 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-top-top-rtl'
{"name":"Tooltip-top-top-rtl","initial":{"box":{"x":238,"y":7,"width":157.203125,"height":29,"right":395.203125,"bottom":36},"arrow":{"x":231.609375,"y":15,"width":6.390625,"height":12.796875,"right":238,"bottom":27.796875},"placement":"right"},"expected":{"box":{"x":238,"y":7,"width":157.203125,"height":29,"right":395.203125,"bottom":36},"arrow":{"x":231.609375,"y":15,"width":6.390625,"height":12.796875,"right":238,"bottom":27.796875},"placement":"right"},"actual":{"box":{"x":238.8125,"y":6.5,"width":157.1875,"height":29,"right":396,"bottom":35.5},"arrow":{"x":232.421875,"y":14.5,"width":6.390625,"height":12.796875,"right":238.8125,"bottom":27.296875},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-95; position: fixed; translate: -18px -427px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-top-right-rtl'
{"name":"Tooltip-top-right-rtl","initial":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"expected":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"actual":{"box":{"x":160.8125,"y":304.5,"width":157.1875,"height":29,"right":318,"bottom":333.5},"arrow":{"x":318,"y":312.5,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.296875},"placement":"left"},"area":"inline-end","style":"position-anchor: --vn-placement-96; position: fixed; translate: -90px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 6px 0px 0px; width: 157.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-top-bottom-rtl'
{"name":"Tooltip-top-bottom-rtl","initial":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"expected":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"actual":{"box":{"x":112.40625,"y":821,"width":157.1875,"height":29,"right":269.59375,"bottom":850},"arrow":{"x":184.40625,"y":850,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":856.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-97; position: fixed; translate: -16px 821px; position-area: block-start; position-try-fallbacks: --vn-placement-97-1, flip-block, --vn-placement-97-3; inset: auto; margin: 0px 0px 6px; width: 157.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-top-left-rtl'
{"name":"Tooltip-top-left-rtl","initial":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"expected":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"actual":{"box":{"x":90.8125,"y":304.5,"width":157.1875,"height":29,"right":248,"bottom":333.5},"arrow":{"x":84.421875,"y":312.5,"width":6.390625,"height":12.796875,"right":90.8125,"bottom":325.296875},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-98; position: fixed; translate: -166px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-right-center-rtl'
{"name":"Tooltip-right-center-rtl","initial":{"box":{"x":113,"y":265,"width":157.203125,"height":29,"right":270.203125,"bottom":294},"arrow":{"x":185,"y":294,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":300.390625},"placement":"top"},"expected":{"box":{"x":113,"y":265,"width":157.203125,"height":29,"right":270.203125,"bottom":294},"arrow":{"x":185,"y":294,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":300.390625},"placement":"top"},"actual":{"box":{"x":112.40625,"y":265,"width":157.1875,"height":29,"right":269.59375,"bottom":294},"arrow":{"x":184.40625,"y":294,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":300.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-99; position: fixed; translate: -16px 265px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 6px; width: 157.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-right-top-rtl'
{"name":"Tooltip-right-top-rtl","initial":{"box":{"x":238,"y":7,"width":157.203125,"height":29,"right":395.203125,"bottom":36},"arrow":{"x":231.609375,"y":15,"width":6.390625,"height":12.796875,"right":238,"bottom":27.796875},"placement":"right"},"expected":{"box":{"x":238,"y":7,"width":157.203125,"height":29,"right":395.203125,"bottom":36},"arrow":{"x":231.609375,"y":15,"width":6.390625,"height":12.796875,"right":238,"bottom":27.796875},"placement":"right"},"actual":{"box":{"x":238.8125,"y":6.5,"width":157.1875,"height":29,"right":396,"bottom":35.5},"arrow":{"x":232.421875,"y":14.5,"width":6.390625,"height":12.796875,"right":238.8125,"bottom":27.296875},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-100; position: fixed; translate: -18px -427px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-right-right-rtl'
{"name":"Tooltip-right-right-rtl","initial":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"expected":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"actual":{"box":{"x":160.8125,"y":304.5,"width":157.1875,"height":29,"right":318,"bottom":333.5},"arrow":{"x":318,"y":312.5,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.296875},"placement":"left"},"area":"inline-end","style":"position-anchor: --vn-placement-101; position: fixed; translate: -90px -129px; position-area: inline-end; position-try-fallbacks: --vn-placement-101-0, flip-inline, --vn-placement-101-2; inset: auto; margin: 0px 6px 0px 0px; width: 157.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-right-bottom-rtl'
{"name":"Tooltip-right-bottom-rtl","initial":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"expected":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"actual":{"box":{"x":112.40625,"y":821,"width":157.1875,"height":29,"right":269.59375,"bottom":850},"arrow":{"x":184.40625,"y":850,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":856.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-102; position: fixed; translate: -16px 821px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 6px; width: 157.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-right-left-rtl'
{"name":"Tooltip-right-left-rtl","initial":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"expected":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"actual":{"box":{"x":90.8125,"y":304.5,"width":157.1875,"height":29,"right":248,"bottom":333.5},"arrow":{"x":84.421875,"y":312.5,"width":6.390625,"height":12.796875,"right":90.8125,"bottom":325.296875},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-103; position: fixed; translate: -166px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-bottom-center-rtl'
{"name":"Tooltip-bottom-center-rtl","initial":{"box":{"x":113,"y":344,"width":157.203125,"height":29,"right":270.203125,"bottom":373},"arrow":{"x":185,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":344},"placement":"bottom"},"expected":{"box":{"x":113,"y":344,"width":157.203125,"height":29,"right":270.203125,"bottom":373},"arrow":{"x":185,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":344},"placement":"bottom"},"actual":{"box":{"x":112.40625,"y":344,"width":157.1875,"height":29,"right":269.59375,"bottom":373},"arrow":{"x":184.40625,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":344},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-104; position: fixed; translate: -16px 338px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-104-1, --vn-placement-104-3; inset: auto; margin: 6px 0px 0px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-bottom-top-rtl'
{"name":"Tooltip-bottom-top-rtl","initial":{"box":{"x":113,"y":46,"width":157.203125,"height":29,"right":270.203125,"bottom":75},"arrow":{"x":185,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":46},"placement":"bottom"},"expected":{"box":{"x":113,"y":46,"width":157.203125,"height":29,"right":270.203125,"bottom":75},"arrow":{"x":185,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":46},"placement":"bottom"},"actual":{"box":{"x":112.40625,"y":46,"width":157.1875,"height":29,"right":269.59375,"bottom":75},"arrow":{"x":184.40625,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":46},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-105; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-105-1, --vn-placement-105-3; inset: auto; margin: 6px 0px 0px; width: 157.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-bottom-right-rtl'
{"name":"Tooltip-bottom-right-rtl","initial":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"expected":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"actual":{"box":{"x":160.8125,"y":304.5,"width":157.1875,"height":29,"right":318,"bottom":333.5},"arrow":{"x":318,"y":312.5,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.296875},"placement":"left"},"area":"inline-end","style":"position-anchor: --vn-placement-106; position: fixed; translate: -90px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 6px 0px 0px; width: 157.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-bottom-bottom-rtl'
{"name":"Tooltip-bottom-bottom-rtl","initial":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"expected":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"actual":{"box":{"x":112.40625,"y":821,"width":157.1875,"height":29,"right":269.59375,"bottom":850},"arrow":{"x":184.40625,"y":850,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":856.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-107; position: fixed; translate: -16px 821px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-bottom-left-rtl'
{"name":"Tooltip-bottom-left-rtl","initial":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"expected":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"actual":{"box":{"x":90.8125,"y":304.5,"width":157.1875,"height":29,"right":248,"bottom":333.5},"arrow":{"x":84.421875,"y":312.5,"width":6.390625,"height":12.796875,"right":90.8125,"bottom":325.296875},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-108; position: fixed; translate: -166px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-left-center-rtl'
{"name":"Tooltip-left-center-rtl","initial":{"box":{"x":238,"y":305,"width":157.203125,"height":29,"right":395.203125,"bottom":334},"arrow":{"x":231.609375,"y":313,"width":6.390625,"height":12.796875,"right":238,"bottom":325.796875},"placement":"right"},"expected":{"box":{"x":238,"y":305,"width":157.203125,"height":29,"right":395.203125,"bottom":334},"arrow":{"x":231.609375,"y":313,"width":6.390625,"height":12.796875,"right":238,"bottom":325.796875},"placement":"right"},"actual":{"box":{"x":238.8125,"y":304.5,"width":157.1875,"height":29,"right":396,"bottom":333.5},"arrow":{"x":232.421875,"y":312.5,"width":6.390625,"height":12.796875,"right":238.8125,"bottom":325.296875},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-109; position: fixed; translate: -18px -129px; position-area: inline-start; position-try-fallbacks: --vn-placement-109-0, --vn-placement-109-2, flip-inline; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-left-top-rtl'
{"name":"Tooltip-left-top-rtl","initial":{"box":{"x":238,"y":7,"width":157.203125,"height":29,"right":395.203125,"bottom":36},"arrow":{"x":231.609375,"y":15,"width":6.390625,"height":12.796875,"right":238,"bottom":27.796875},"placement":"right"},"expected":{"box":{"x":238,"y":7,"width":157.203125,"height":29,"right":395.203125,"bottom":36},"arrow":{"x":231.609375,"y":15,"width":6.390625,"height":12.796875,"right":238,"bottom":27.796875},"placement":"right"},"actual":{"box":{"x":238.8125,"y":6.5,"width":157.1875,"height":29,"right":396,"bottom":35.5},"arrow":{"x":232.421875,"y":14.5,"width":6.390625,"height":12.796875,"right":238.8125,"bottom":27.296875},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-110; position: fixed; translate: -18px -427px; position-area: inline-start; position-try-fallbacks: --vn-placement-110-0, --vn-placement-110-2, flip-inline; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-left-right-rtl'
{"name":"Tooltip-left-right-rtl","initial":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"expected":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"actual":{"box":{"x":160.8125,"y":304.5,"width":157.1875,"height":29,"right":318,"bottom":333.5},"arrow":{"x":318,"y":312.5,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.296875},"placement":"left"},"area":"inline-end","style":"position-anchor: --vn-placement-111; position: fixed; translate: -90px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 6px 0px 0px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-left-bottom-rtl'
{"name":"Tooltip-left-bottom-rtl","initial":{"box":{"x":238,"y":861,"width":157.203125,"height":29,"right":395.203125,"bottom":890},"arrow":{"x":231.609375,"y":869,"width":6.390625,"height":12.796875,"right":238,"bottom":881.796875},"placement":"right"},"expected":{"box":{"x":238,"y":861,"width":157.203125,"height":29,"right":395.203125,"bottom":890},"arrow":{"x":231.609375,"y":869,"width":6.390625,"height":12.796875,"right":238,"bottom":881.796875},"placement":"right"},"actual":{"box":{"x":238.8125,"y":860.5,"width":157.1875,"height":29,"right":396,"bottom":889.5},"arrow":{"x":232.421875,"y":868.5,"width":6.390625,"height":12.796875,"right":238.8125,"bottom":881.296875},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-112; position: fixed; translate: -18px 427px; position-area: inline-start; position-try-fallbacks: --vn-placement-112-0, --vn-placement-112-2, flip-inline; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-left-left-rtl'
{"name":"Tooltip-left-left-rtl","initial":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"expected":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"actual":{"box":{"x":90.8125,"y":304.5,"width":157.1875,"height":29,"right":248,"bottom":333.5},"arrow":{"x":84.421875,"y":312.5,"width":6.390625,"height":12.796875,"right":90.8125,"bottom":325.296875},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-113; position: fixed; translate: -166px -129px; position-area: inline-start; position-try-fallbacks: --vn-placement-113-0, --vn-placement-113-2, flip-inline; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-auto-center-rtl'
{"name":"Tooltip-auto-center-rtl","initial":{"box":{"x":113,"y":344,"width":157.203125,"height":29,"right":270.203125,"bottom":373},"arrow":{"x":185,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":344},"placement":"bottom"},"expected":{"box":{"x":113,"y":344,"width":157.203125,"height":29,"right":270.203125,"bottom":373},"arrow":{"x":185,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":344},"placement":"bottom"},"actual":{"box":{"x":112.40625,"y":344,"width":157.1875,"height":29,"right":269.59375,"bottom":373},"arrow":{"x":184.40625,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":344},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-114; position: fixed; translate: -16px 338px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-114-1, --vn-placement-114-3; inset: auto; margin: 6px 0px 0px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-auto-top-rtl'
{"name":"Tooltip-auto-top-rtl","initial":{"box":{"x":113,"y":46,"width":157.203125,"height":29,"right":270.203125,"bottom":75},"arrow":{"x":185,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":46},"placement":"bottom"},"expected":{"box":{"x":113,"y":46,"width":157.203125,"height":29,"right":270.203125,"bottom":75},"arrow":{"x":185,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":46},"placement":"bottom"},"actual":{"box":{"x":112.40625,"y":46,"width":157.1875,"height":29,"right":269.59375,"bottom":75},"arrow":{"x":184.40625,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":46},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-115; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-115-1, --vn-placement-115-3; inset: auto; margin: 6px 0px 0px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-auto-right-rtl'
{"name":"Tooltip-auto-right-rtl","initial":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"expected":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"actual":{"box":{"x":160.8125,"y":304.5,"width":157.1875,"height":29,"right":318,"bottom":333.5},"arrow":{"x":318,"y":312.5,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.296875},"placement":"left"},"area":"inline-end","style":"position-anchor: --vn-placement-116; position: fixed; translate: -90px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 6px 0px 0px; width: 157.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-auto-bottom-rtl'
{"name":"Tooltip-auto-bottom-rtl","initial":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"expected":{"box":{"x":113,"y":821,"width":157.203125,"height":29,"right":270.203125,"bottom":850},"arrow":{"x":185,"y":850,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":856.390625},"placement":"top"},"actual":{"box":{"x":112.40625,"y":821,"width":157.1875,"height":29,"right":269.59375,"bottom":850},"arrow":{"x":184.40625,"y":850,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":856.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-117; position: fixed; translate: -16px 821px; position-area: block-start; position-try-fallbacks: --vn-placement-117-1, flip-block, --vn-placement-117-3; inset: auto; margin: 0px 0px 6px; width: 157.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Tooltip-auto-left-rtl'
{"name":"Tooltip-auto-left-rtl","initial":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"expected":{"box":{"x":90,"y":305,"width":157.203125,"height":29,"right":247.203125,"bottom":334},"arrow":{"x":83.609375,"y":313,"width":6.390625,"height":12.796875,"right":90,"bottom":325.796875},"placement":"right"},"actual":{"box":{"x":90.8125,"y":304.5,"width":157.1875,"height":29,"right":248,"bottom":333.5},"arrow":{"x":84.421875,"y":312.5,"width":6.390625,"height":12.796875,"right":90.8125,"bottom":325.296875},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-118; position: fixed; translate: -166px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 6px; width: 157.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-top-center-ltr'
{"name":"Popover-top-center-ltr","initial":{"box":{"x":104,"y":200.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":292},"arrow":{"x":184,"y":292,"width":16,"height":8,"right":200,"bottom":300},"placement":"top"},"expected":{"box":{"x":104,"y":200.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":292},"arrow":{"x":184,"y":292,"width":16,"height":8,"right":200,"bottom":300},"placement":"top"},"actual":{"box":{"x":103.40625,"y":201,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":292.1875},"arrow":{"x":183.40625,"y":292.1875,"width":16,"height":8,"right":199.40625,"bottom":300.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-119; position: fixed; translate: -16px 201px; position-area: block-start; position-try-fallbacks: --vn-placement-119-1, flip-block, --vn-placement-119-3; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-top-top-ltr'
{"name":"Popover-top-top-ltr","initial":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"expected":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":48,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":139.1875},"arrow":{"x":183.40625,"y":40,"width":16,"height":8,"right":199.40625,"bottom":48},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-120; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: none; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-top-right-ltr'
{"name":"Popover-top-right-ltr","initial":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"expected":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"actual":{"box":{"x":141,"y":273.40625,"width":175.1875,"height":91.1875,"right":316.1875,"bottom":364.59375},"arrow":{"x":316.1875,"y":311.40625,"width":8,"height":16,"right":324.1875,"bottom":327.40625},"placement":"left"},"area":"inline-start","style":"position-anchor: --vn-placement-121; position: fixed; translate: 141px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-top-bottom-ltr'
{"name":"Popover-top-bottom-ltr","initial":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"expected":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"actual":{"box":{"x":103.40625,"y":757,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":848.1875},"arrow":{"x":183.40625,"y":848.1875,"width":16,"height":8,"right":199.40625,"bottom":856.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-122; position: fixed; translate: -16px 757px; position-area: block-start; position-try-fallbacks: --vn-placement-122-1, flip-block, --vn-placement-122-3; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-top-left-ltr'
{"name":"Popover-top-left-ltr","initial":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"expected":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"actual":{"box":{"x":92,"y":273.40625,"width":175.1875,"height":91.1875,"right":267.1875,"bottom":364.59375},"arrow":{"x":84,"y":311.40625,"width":8,"height":16,"right":92,"bottom":327.40625},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-123; position: fixed; translate: 84px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-right-center-ltr'
{"name":"Popover-right-center-ltr","initial":{"box":{"x":104,"y":200.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":292},"arrow":{"x":184,"y":292,"width":16,"height":8,"right":200,"bottom":300},"placement":"top"},"expected":{"box":{"x":104,"y":200.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":292},"arrow":{"x":184,"y":292,"width":16,"height":8,"right":200,"bottom":300},"placement":"top"},"actual":{"box":{"x":103.40625,"y":201,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":292.1875},"arrow":{"x":183.40625,"y":292.1875,"width":16,"height":8,"right":199.40625,"bottom":300.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-124; position: fixed; translate: -16px 201px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-right-top-ltr'
{"name":"Popover-right-top-ltr","initial":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"expected":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":48,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":139.1875},"arrow":{"x":183.40625,"y":40,"width":16,"height":8,"right":199.40625,"bottom":48},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-125; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: none; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-right-right-ltr'
{"name":"Popover-right-right-ltr","initial":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"expected":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"actual":{"box":{"x":141,"y":273.40625,"width":175.1875,"height":91.1875,"right":316.1875,"bottom":364.59375},"arrow":{"x":316.1875,"y":311.40625,"width":8,"height":16,"right":324.1875,"bottom":327.40625},"placement":"left"},"area":"inline-start","style":"position-anchor: --vn-placement-126; position: fixed; translate: 141px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-right-bottom-ltr'
{"name":"Popover-right-bottom-ltr","initial":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"expected":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"actual":{"box":{"x":103.40625,"y":757,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":848.1875},"arrow":{"x":183.40625,"y":848.1875,"width":16,"height":8,"right":199.40625,"bottom":856.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-127; position: fixed; translate: -16px 757px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-right-left-ltr'
{"name":"Popover-right-left-ltr","initial":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"expected":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"actual":{"box":{"x":92,"y":273.40625,"width":175.1875,"height":91.1875,"right":267.1875,"bottom":364.59375},"arrow":{"x":84,"y":311.40625,"width":8,"height":16,"right":92,"bottom":327.40625},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-128; position: fixed; translate: 84px -129px; position-area: inline-end; position-try-fallbacks: --vn-placement-128-0, --vn-placement-128-2, flip-inline; inset: auto; margin: 0px 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-bottom-center-ltr'
{"name":"Popover-bottom-center-ltr","initial":{"box":{"x":104,"y":346,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":437.1875},"arrow":{"x":184,"y":338,"width":16,"height":8,"right":200,"bottom":346},"placement":"bottom"},"expected":{"box":{"x":104,"y":346,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":437.1875},"arrow":{"x":184,"y":338,"width":16,"height":8,"right":200,"bottom":346},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":346,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":437.1875},"arrow":{"x":183.40625,"y":338,"width":16,"height":8,"right":199.40625,"bottom":346},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-129; position: fixed; translate: -16px 338px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-129-1, --vn-placement-129-3; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-bottom-top-ltr'
{"name":"Popover-bottom-top-ltr","initial":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"expected":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":48,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":139.1875},"arrow":{"x":183.40625,"y":40,"width":16,"height":8,"right":199.40625,"bottom":48},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-130; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-130-1, --vn-placement-130-3; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-bottom-right-ltr'
{"name":"Popover-bottom-right-ltr","initial":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"expected":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"actual":{"box":{"x":141,"y":273.40625,"width":175.1875,"height":91.1875,"right":316.1875,"bottom":364.59375},"arrow":{"x":316.1875,"y":311.40625,"width":8,"height":16,"right":324.1875,"bottom":327.40625},"placement":"left"},"area":"inline-start","style":"position-anchor: --vn-placement-131; position: fixed; translate: 141px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-bottom-bottom-ltr'
{"name":"Popover-bottom-bottom-ltr","initial":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"expected":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"actual":{"box":{"x":103.40625,"y":757,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":848.1875},"arrow":{"x":183.40625,"y":848.1875,"width":16,"height":8,"right":199.40625,"bottom":856.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-132; position: fixed; translate: -16px 757px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-bottom-left-ltr'
{"name":"Popover-bottom-left-ltr","initial":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"expected":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"actual":{"box":{"x":92,"y":273.40625,"width":175.1875,"height":91.1875,"right":267.1875,"bottom":364.59375},"arrow":{"x":84,"y":311.40625,"width":8,"height":16,"right":92,"bottom":327.40625},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-133; position: fixed; translate: 84px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 8px; width: 175.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-left-center-ltr'
{"name":"Popover-left-center-ltr","initial":{"box":{"x":104,"y":200.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":292},"arrow":{"x":184,"y":292,"width":16,"height":8,"right":200,"bottom":300},"placement":"top"},"expected":{"box":{"x":104,"y":200.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":292},"arrow":{"x":184,"y":292,"width":16,"height":8,"right":200,"bottom":300},"placement":"top"},"actual":{"box":{"x":103.40625,"y":201,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":292.1875},"arrow":{"x":183.40625,"y":292.1875,"width":16,"height":8,"right":199.40625,"bottom":300.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-134; position: fixed; translate: -16px 201px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-left-top-ltr'
{"name":"Popover-left-top-ltr","initial":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"expected":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":48,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":139.1875},"arrow":{"x":183.40625,"y":40,"width":16,"height":8,"right":199.40625,"bottom":48},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-135; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: none; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-left-right-ltr'
{"name":"Popover-left-right-ltr","initial":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"expected":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"actual":{"box":{"x":141,"y":273.40625,"width":175.1875,"height":91.1875,"right":316.1875,"bottom":364.59375},"arrow":{"x":316.1875,"y":311.40625,"width":8,"height":16,"right":324.1875,"bottom":327.40625},"placement":"left"},"area":"inline-start","style":"position-anchor: --vn-placement-136; position: fixed; translate: 141px -129px; position-area: inline-start; position-try-fallbacks: --vn-placement-136-0, flip-inline, --vn-placement-136-2; inset: auto; margin: 0px 8px 0px 0px; width: 175.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-left-bottom-ltr'
{"name":"Popover-left-bottom-ltr","initial":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"expected":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"actual":{"box":{"x":103.40625,"y":757,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":848.1875},"arrow":{"x":183.40625,"y":848.1875,"width":16,"height":8,"right":199.40625,"bottom":856.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-137; position: fixed; translate: -16px 757px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-left-left-ltr'
{"name":"Popover-left-left-ltr","initial":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"expected":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"actual":{"box":{"x":92,"y":273.40625,"width":175.1875,"height":91.1875,"right":267.1875,"bottom":364.59375},"arrow":{"x":84,"y":311.40625,"width":8,"height":16,"right":92,"bottom":327.40625},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-138; position: fixed; translate: 84px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-auto-center-ltr'
{"name":"Popover-auto-center-ltr","initial":{"box":{"x":104,"y":346,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":437.1875},"arrow":{"x":184,"y":338,"width":16,"height":8,"right":200,"bottom":346},"placement":"bottom"},"expected":{"box":{"x":104,"y":346,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":437.1875},"arrow":{"x":184,"y":338,"width":16,"height":8,"right":200,"bottom":346},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":346,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":437.1875},"arrow":{"x":183.40625,"y":338,"width":16,"height":8,"right":199.40625,"bottom":346},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-139; position: fixed; translate: -16px 338px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-139-1, --vn-placement-139-3; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-auto-top-ltr'
{"name":"Popover-auto-top-ltr","initial":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"expected":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":48,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":139.1875},"arrow":{"x":183.40625,"y":40,"width":16,"height":8,"right":199.40625,"bottom":48},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-140; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-140-1, --vn-placement-140-3; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-auto-right-ltr'
{"name":"Popover-auto-right-ltr","initial":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"expected":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"actual":{"box":{"x":141,"y":273.40625,"width":175.1875,"height":91.1875,"right":316.1875,"bottom":364.59375},"arrow":{"x":316.1875,"y":311.40625,"width":8,"height":16,"right":324.1875,"bottom":327.40625},"placement":"left"},"area":"inline-start","style":"position-anchor: --vn-placement-141; position: fixed; translate: 141px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-auto-bottom-ltr'
{"name":"Popover-auto-bottom-ltr","initial":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"expected":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"actual":{"box":{"x":103.40625,"y":757,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":848.1875},"arrow":{"x":183.40625,"y":848.1875,"width":16,"height":8,"right":199.40625,"bottom":856.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-142; position: fixed; translate: -16px 757px; position-area: block-start; position-try-fallbacks: --vn-placement-142-1, flip-block, --vn-placement-142-3; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-auto-left-ltr'
{"name":"Popover-auto-left-ltr","initial":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"expected":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"actual":{"box":{"x":92,"y":273.40625,"width":175.1875,"height":91.1875,"right":267.1875,"bottom":364.59375},"arrow":{"x":84,"y":311.40625,"width":8,"height":16,"right":92,"bottom":327.40625},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-143; position: fixed; translate: 84px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 8px; width: 175.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-top-center-rtl'
{"name":"Popover-top-center-rtl","initial":{"box":{"x":104,"y":200.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":292},"arrow":{"x":184,"y":292,"width":16,"height":8,"right":200,"bottom":300},"placement":"top"},"expected":{"box":{"x":104,"y":200.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":292},"arrow":{"x":184,"y":292,"width":16,"height":8,"right":200,"bottom":300},"placement":"top"},"actual":{"box":{"x":103.40625,"y":201,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":292.1875},"arrow":{"x":183.40625,"y":292.1875,"width":16,"height":8,"right":199.40625,"bottom":300.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-144; position: fixed; translate: -16px 201px; position-area: block-start; position-try-fallbacks: --vn-placement-144-1, flip-block, --vn-placement-144-3; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-top-top-rtl'
{"name":"Popover-top-top-rtl","initial":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"expected":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":48,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":139.1875},"arrow":{"x":183.40625,"y":40,"width":16,"height":8,"right":199.40625,"bottom":48},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-145; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: none; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-top-right-rtl'
{"name":"Popover-top-right-rtl","initial":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"expected":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"actual":{"box":{"x":140.8125,"y":273.40625,"width":175.1875,"height":91.1875,"right":316,"bottom":364.59375},"arrow":{"x":316,"y":311.40625,"width":8,"height":16,"right":324,"bottom":327.40625},"placement":"left"},"area":"inline-end","style":"position-anchor: --vn-placement-146; position: fixed; translate: -90px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-top-bottom-rtl'
{"name":"Popover-top-bottom-rtl","initial":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"expected":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"actual":{"box":{"x":103.40625,"y":757,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":848.1875},"arrow":{"x":183.40625,"y":848.1875,"width":16,"height":8,"right":199.40625,"bottom":856.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-147; position: fixed; translate: -16px 757px; position-area: block-start; position-try-fallbacks: --vn-placement-147-1, flip-block, --vn-placement-147-3; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-top-left-rtl'
{"name":"Popover-top-left-rtl","initial":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"expected":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"actual":{"box":{"x":92.8125,"y":273.40625,"width":175.1875,"height":91.1875,"right":268,"bottom":364.59375},"arrow":{"x":84.8125,"y":311.40625,"width":8,"height":16,"right":92.8125,"bottom":327.40625},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-148; position: fixed; translate: -146px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 8px; width: 175.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-right-center-rtl'
{"name":"Popover-right-center-rtl","initial":{"box":{"x":104,"y":200.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":292},"arrow":{"x":184,"y":292,"width":16,"height":8,"right":200,"bottom":300},"placement":"top"},"expected":{"box":{"x":104,"y":200.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":292},"arrow":{"x":184,"y":292,"width":16,"height":8,"right":200,"bottom":300},"placement":"top"},"actual":{"box":{"x":103.40625,"y":201,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":292.1875},"arrow":{"x":183.40625,"y":292.1875,"width":16,"height":8,"right":199.40625,"bottom":300.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-149; position: fixed; translate: -16px 201px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-right-top-rtl'
{"name":"Popover-right-top-rtl","initial":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"expected":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":48,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":139.1875},"arrow":{"x":183.40625,"y":40,"width":16,"height":8,"right":199.40625,"bottom":48},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-150; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: none; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-right-right-rtl'
{"name":"Popover-right-right-rtl","initial":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"expected":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"actual":{"box":{"x":140.8125,"y":273.40625,"width":175.1875,"height":91.1875,"right":316,"bottom":364.59375},"arrow":{"x":316,"y":311.40625,"width":8,"height":16,"right":324,"bottom":327.40625},"placement":"left"},"area":"inline-end","style":"position-anchor: --vn-placement-151; position: fixed; translate: -90px -129px; position-area: inline-end; position-try-fallbacks: --vn-placement-151-0, flip-inline, --vn-placement-151-2; inset: auto; margin: 0px 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-right-bottom-rtl'
{"name":"Popover-right-bottom-rtl","initial":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"expected":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"actual":{"box":{"x":103.40625,"y":757,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":848.1875},"arrow":{"x":183.40625,"y":848.1875,"width":16,"height":8,"right":199.40625,"bottom":856.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-152; position: fixed; translate: -16px 757px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-right-left-rtl'
{"name":"Popover-right-left-rtl","initial":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"expected":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"actual":{"box":{"x":92.8125,"y":273.40625,"width":175.1875,"height":91.1875,"right":268,"bottom":364.59375},"arrow":{"x":84.8125,"y":311.40625,"width":8,"height":16,"right":92.8125,"bottom":327.40625},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-153; position: fixed; translate: -146px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 8px; width: 175.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-bottom-center-rtl'
{"name":"Popover-bottom-center-rtl","initial":{"box":{"x":104,"y":346,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":437.1875},"arrow":{"x":184,"y":338,"width":16,"height":8,"right":200,"bottom":346},"placement":"bottom"},"expected":{"box":{"x":104,"y":346,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":437.1875},"arrow":{"x":184,"y":338,"width":16,"height":8,"right":200,"bottom":346},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":346,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":437.1875},"arrow":{"x":183.40625,"y":338,"width":16,"height":8,"right":199.40625,"bottom":346},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-154; position: fixed; translate: -16px 338px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-154-1, --vn-placement-154-3; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-bottom-top-rtl'
{"name":"Popover-bottom-top-rtl","initial":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"expected":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":48,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":139.1875},"arrow":{"x":183.40625,"y":40,"width":16,"height":8,"right":199.40625,"bottom":48},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-155; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-155-1, --vn-placement-155-3; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-bottom-right-rtl'
{"name":"Popover-bottom-right-rtl","initial":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"expected":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"actual":{"box":{"x":140.8125,"y":273.40625,"width":175.1875,"height":91.1875,"right":316,"bottom":364.59375},"arrow":{"x":316,"y":311.40625,"width":8,"height":16,"right":324,"bottom":327.40625},"placement":"left"},"area":"inline-end","style":"position-anchor: --vn-placement-156; position: fixed; translate: -90px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-bottom-bottom-rtl'
{"name":"Popover-bottom-bottom-rtl","initial":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"expected":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"actual":{"box":{"x":103.40625,"y":757,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":848.1875},"arrow":{"x":183.40625,"y":848.1875,"width":16,"height":8,"right":199.40625,"bottom":856.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-157; position: fixed; translate: -16px 757px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-bottom-left-rtl'
{"name":"Popover-bottom-left-rtl","initial":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"expected":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"actual":{"box":{"x":92.8125,"y":273.40625,"width":175.1875,"height":91.1875,"right":268,"bottom":364.59375},"arrow":{"x":84.8125,"y":311.40625,"width":8,"height":16,"right":92.8125,"bottom":327.40625},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-158; position: fixed; translate: -146px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-left-center-rtl'
{"name":"Popover-left-center-rtl","initial":{"box":{"x":104,"y":200.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":292},"arrow":{"x":184,"y":292,"width":16,"height":8,"right":200,"bottom":300},"placement":"top"},"expected":{"box":{"x":104,"y":200.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":292},"arrow":{"x":184,"y":292,"width":16,"height":8,"right":200,"bottom":300},"placement":"top"},"actual":{"box":{"x":103.40625,"y":201,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":292.1875},"arrow":{"x":183.40625,"y":292.1875,"width":16,"height":8,"right":199.40625,"bottom":300.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-159; position: fixed; translate: -16px 201px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-left-top-rtl'
{"name":"Popover-left-top-rtl","initial":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"expected":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":48,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":139.1875},"arrow":{"x":183.40625,"y":40,"width":16,"height":8,"right":199.40625,"bottom":48},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-160; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: none; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-left-right-rtl'
{"name":"Popover-left-right-rtl","initial":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"expected":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"actual":{"box":{"x":140.8125,"y":273.40625,"width":175.1875,"height":91.1875,"right":316,"bottom":364.59375},"arrow":{"x":316,"y":311.40625,"width":8,"height":16,"right":324,"bottom":327.40625},"placement":"left"},"area":"inline-end","style":"position-anchor: --vn-placement-161; position: fixed; translate: -90px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-left-bottom-rtl'
{"name":"Popover-left-bottom-rtl","initial":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"expected":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"actual":{"box":{"x":103.40625,"y":757,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":848.1875},"arrow":{"x":183.40625,"y":848.1875,"width":16,"height":8,"right":199.40625,"bottom":856.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-162; position: fixed; translate: -16px 757px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-left-left-rtl'
{"name":"Popover-left-left-rtl","initial":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"expected":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"actual":{"box":{"x":92.8125,"y":273.40625,"width":175.1875,"height":91.1875,"right":268,"bottom":364.59375},"arrow":{"x":84.8125,"y":311.40625,"width":8,"height":16,"right":92.8125,"bottom":327.40625},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-163; position: fixed; translate: -146px -129px; position-area: inline-start; position-try-fallbacks: --vn-placement-163-0, --vn-placement-163-2, flip-inline; inset: auto; margin: 0px 0px 0px 8px; width: 175.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-auto-center-rtl'
{"name":"Popover-auto-center-rtl","initial":{"box":{"x":104,"y":346,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":437.1875},"arrow":{"x":184,"y":338,"width":16,"height":8,"right":200,"bottom":346},"placement":"bottom"},"expected":{"box":{"x":104,"y":346,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":437.1875},"arrow":{"x":184,"y":338,"width":16,"height":8,"right":200,"bottom":346},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":346,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":437.1875},"arrow":{"x":183.40625,"y":338,"width":16,"height":8,"right":199.40625,"bottom":346},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-164; position: fixed; translate: -16px 338px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-164-1, --vn-placement-164-3; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-auto-top-rtl'
{"name":"Popover-auto-top-rtl","initial":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"expected":{"box":{"x":104,"y":48,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":139.1875},"arrow":{"x":184,"y":40,"width":16,"height":8,"right":200,"bottom":48},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":48,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":139.1875},"arrow":{"x":183.40625,"y":40,"width":16,"height":8,"right":199.40625,"bottom":48},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-165; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: flip-block, --vn-placement-165-1, --vn-placement-165-3; inset: auto; margin: 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-auto-right-rtl'
{"name":"Popover-auto-right-rtl","initial":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"expected":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"actual":{"box":{"x":140.8125,"y":273.40625,"width":175.1875,"height":91.1875,"right":316,"bottom":364.59375},"arrow":{"x":316,"y":311.40625,"width":8,"height":16,"right":324,"bottom":327.40625},"placement":"left"},"area":"inline-end","style":"position-anchor: --vn-placement-166; position: fixed; translate: -90px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-auto-bottom-rtl'
{"name":"Popover-auto-bottom-rtl","initial":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"expected":{"box":{"x":104,"y":756.8125,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":848},"arrow":{"x":184,"y":848,"width":16,"height":8,"right":200,"bottom":856},"placement":"top"},"actual":{"box":{"x":103.40625,"y":757,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":848.1875},"arrow":{"x":183.40625,"y":848.1875,"width":16,"height":8,"right":199.40625,"bottom":856.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-167; position: fixed; translate: -16px 757px; position-area: block-start; position-try-fallbacks: --vn-placement-167-1, flip-block, --vn-placement-167-3; inset: auto; margin: 0px 0px 8px; width: 175.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'Popover-auto-left-rtl'
{"name":"Popover-auto-left-rtl","initial":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"expected":{"box":{"x":92,"y":273,"width":175.203125,"height":91.1875,"right":267.203125,"bottom":364.1875},"arrow":{"x":84,"y":311,"width":8,"height":16,"right":92,"bottom":327},"placement":"right"},"actual":{"box":{"x":92.8125,"y":273.40625,"width":175.1875,"height":91.1875,"right":268,"bottom":364.59375},"arrow":{"x":84.8125,"y":311.40625,"width":8,"height":16,"right":92.8125,"bottom":327.40625},"placement":"right"},"area":"inline-start","style":"position-anchor: --vn-placement-168; position: fixed; translate: -146px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 0px 0px 8px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-reference-parent'
{"name":"dropdown-reference-parent","initial":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"expected":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"actual":{"box":{"x":150,"y":340,"width":160,"height":50,"right":310,"bottom":390},"placement":"bottom-start"},"area":"end span-end","style":"position-anchor: --vn-placement-169; position: fixed; translate: 0px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-reference-element'
{"name":"dropdown-reference-element","initial":{"box":{"x":20,"y":702,"width":160,"height":50,"right":180,"bottom":752},"placement":"bottom-start"},"expected":{"box":{"x":20,"y":702,"width":160,"height":50,"right":180,"bottom":752},"placement":"bottom-start"},"actual":{"box":{"x":20,"y":702,"width":160,"height":50,"right":180,"bottom":752},"placement":"bottom-start"},"area":"end span-end","style":"position-anchor: --vn-placement-170; position: fixed; translate: 0px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-offset-10-20'
{"name":"dropdown-offset-10-20","initial":{"box":{"x":160,"y":358,"width":160,"height":50,"right":320,"bottom":408},"placement":"bottom-start"},"expected":{"box":{"x":160,"y":358,"width":160,"height":50,"right":320,"bottom":408},"placement":"bottom-start"},"actual":{"box":{"x":160,"y":358,"width":160,"height":50,"right":320,"bottom":408},"placement":"bottom-start"},"area":"end span-end","style":"position-anchor: --vn-placement-171; position: fixed; translate: 0px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 20px -10px 0px 10px; width: 160px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-boundary'
{"name":"dropdown-boundary","initial":{"box":{"x":219.53125,"y":340,"width":160,"height":50,"right":379.53125,"bottom":390},"placement":"bottom-end"},"expected":{"box":{"x":219.53125,"y":340,"width":160,"height":50,"right":379.53125,"bottom":390},"placement":"bottom-end"},"actual":{"box":{"x":219.53125,"y":340,"width":160,"height":50,"right":379.53125,"bottom":390},"placement":"bottom-end"},"area":"end span-start","style":"position-anchor: --vn-placement-172; position: fixed; translate: -41px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-edge-top'
{"name":"dropdown-edge-top","initial":{"box":{"x":150,"y":42,"width":160,"height":50,"right":310,"bottom":92},"placement":"bottom-start"},"expected":{"box":{"x":150,"y":42,"width":160,"height":50,"right":310,"bottom":92},"placement":"bottom-start"},"actual":{"box":{"x":150,"y":42,"width":160,"height":50,"right":310,"bottom":92},"placement":"bottom-start"},"area":"end span-end","style":"position-anchor: --vn-placement-173; position: fixed; translate: 0px; position-area: block-start span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-edge-bottom'
{"name":"dropdown-edge-bottom","initial":{"box":{"x":150,"y":804,"width":160,"height":50,"right":310,"bottom":854},"placement":"top-start"},"expected":{"box":{"x":150,"y":804,"width":160,"height":50,"right":310,"bottom":854},"placement":"top-start"},"actual":{"box":{"x":150,"y":804,"width":160,"height":50,"right":310,"bottom":854},"placement":"top-start"},"area":"start span-end","style":"position-anchor: --vn-placement-174; position: fixed; translate: 0px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-edge-right'
{"name":"dropdown-edge-right","initial":{"box":{"x":161.53125,"y":300,"width":160,"height":50,"right":321.53125,"bottom":350},"placement":"left-start"},"expected":{"box":{"x":161.53125,"y":300,"width":160,"height":50,"right":321.53125,"bottom":350},"placement":"left-start"},"actual":{"box":{"x":162,"y":300,"width":160,"height":50,"right":322,"bottom":350},"placement":"left-start"},"area":"span-end start","style":"position-anchor: --vn-placement-175; position: fixed; translate: 0px; position-area: span-block-end inline-end; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 0px 0px 2px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'dropdown-edge-left'
{"name":"dropdown-edge-left","initial":{"box":{"x":97,"y":300,"width":160,"height":50,"right":257,"bottom":350},"placement":"right-start"},"expected":{"box":{"x":97,"y":300,"width":160,"height":50,"right":257,"bottom":350},"placement":"right-start"},"actual":{"box":{"x":96.53125,"y":300,"width":160,"height":50,"right":256.53125,"bottom":350},"placement":"right-start"},"area":"span-end end","style":"position-anchor: --vn-placement-176; position: fixed; translate: 0px; position-area: span-block-end inline-start; position-try-fallbacks: flip-block, flip-inline, flip-inline flip-block; inset: auto; margin: 0px 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'tooltip-custom-fallback'
{"name":"tooltip-custom-fallback","initial":{"box":{"x":113,"y":46,"width":157.203125,"height":29,"right":270.203125,"bottom":75},"arrow":{"x":185,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":46},"placement":"bottom"},"expected":{"box":{"x":113,"y":46,"width":157.203125,"height":29,"right":270.203125,"bottom":75},"arrow":{"x":185,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":46},"placement":"bottom"},"actual":{"box":{"x":112.40625,"y":46,"width":157.1875,"height":29,"right":269.59375,"bottom":75},"arrow":{"x":184.40625,"y":39.609375,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":46},"placement":"bottom"},"area":"block-end","style":"position-anchor: --vn-placement-177; position: fixed; translate: -16px 40px; position-area: block-end; position-try-fallbacks: none; inset: auto; margin: 6px 0px 0px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'popover-custom-fallback'
{"name":"popover-custom-fallback","initial":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"expected":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"actual":{"box":{"x":141,"y":273.40625,"width":175.1875,"height":91.1875,"right":316.1875,"bottom":364.59375},"arrow":{"x":316.1875,"y":311.40625,"width":8,"height":16,"right":324.1875,"bottom":327.40625},"placement":"left"},"area":"inline-start","style":"position-anchor: --vn-placement-178; position: fixed; translate: 141px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 8px 0px 0px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'tooltip-custom-offset'
{"name":"tooltip-custom-offset","initial":{"box":{"x":123,"y":251,"width":157.203125,"height":29,"right":280.203125,"bottom":280},"arrow":{"x":185,"y":280,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":286.390625},"placement":"top"},"expected":{"box":{"x":123,"y":251,"width":157.203125,"height":29,"right":280.203125,"bottom":280},"arrow":{"x":185,"y":280,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":286.390625},"placement":"top"},"actual":{"box":{"x":122.40625,"y":251,"width":157.1875,"height":29,"right":279.59375,"bottom":280},"arrow":{"x":184.40625,"y":280,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":286.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-179; position: fixed; translate: -16px 251px; position-area: block-start; position-try-fallbacks: --vn-placement-179-1, flip-block, --vn-placement-179-3; inset: auto; margin: 0px -10px 20px 10px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'popover-custom-offset'
{"name":"popover-custom-offset","initial":{"box":{"x":114,"y":188.8125,"width":175.203125,"height":91.1875,"right":289.203125,"bottom":280},"arrow":{"x":184,"y":280,"width":16,"height":8,"right":200,"bottom":288},"placement":"top"},"expected":{"box":{"x":114,"y":188.8125,"width":175.203125,"height":91.1875,"right":289.203125,"bottom":280},"arrow":{"x":184,"y":280,"width":16,"height":8,"right":200,"bottom":288},"placement":"top"},"actual":{"box":{"x":113.40625,"y":189,"width":175.1875,"height":91.1875,"right":288.59375,"bottom":280.1875},"arrow":{"x":183.40625,"y":280.1875,"width":16,"height":8,"right":199.40625,"bottom":288.1875},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-180; position: fixed; translate: -16px 189px; position-area: block-start; position-try-fallbacks: none; inset: auto; margin: 0px -10px 20px 10px; width: 175.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'tooltip-boundary'
{"name":"tooltip-boundary","initial":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"expected":{"box":{"x":160.796875,"y":305,"width":157.203125,"height":29,"right":318,"bottom":334},"arrow":{"x":318,"y":313,"width":6.390625,"height":12.796875,"right":324.390625,"bottom":325.796875},"placement":"left"},"actual":{"box":{"x":161,"y":304.5,"width":157.1875,"height":29,"right":318.1875,"bottom":333.5},"arrow":{"x":318.1875,"y":312.5,"width":6.390625,"height":12.796875,"right":324.578125,"bottom":325.296875},"placement":"left"},"area":"inline-start","style":"position-anchor: --vn-placement-181; position: fixed; translate: 161px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 6px 0px 0px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'popover-boundary'
{"name":"popover-boundary","initial":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"expected":{"box":{"x":140.796875,"y":273,"width":175.203125,"height":91.1875,"right":316,"bottom":364.1875},"arrow":{"x":316,"y":311,"width":8,"height":16,"right":324,"bottom":327},"placement":"left"},"actual":{"box":{"x":141,"y":273.40625,"width":175.1875,"height":91.1875,"right":316.1875,"bottom":364.59375},"arrow":{"x":316.1875,"y":311.40625,"width":8,"height":16,"right":324.1875,"bottom":327.40625},"placement":"left"},"area":"inline-start","style":"position-anchor: --vn-placement-182; position: fixed; translate: 141px -129px; position-area: inline-start; position-try-fallbacks: none; inset: auto; margin: 0px 8px 0px 0px; width: 175.203px;"}
··stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'config-placement'
{"name":"config-placement","initial":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"expected":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"actual":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"area":"end span-start","style":"position-anchor: --vn-placement-183; position: fixed; translate: 0px; position-area: block-end span-inline-start; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 2px 0px 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'config-disabled-flip'
{"name":"config-disabled-flip","initial":{"box":{"x":150,"y":894,"width":160,"height":50,"right":310,"bottom":944},"placement":"bottom-start"},"expected":{"box":{"x":150,"y":894,"width":160,"height":50,"right":310,"bottom":944},"placement":"bottom-start"},"actual":{"box":{"x":150,"y":894,"width":160,"height":50,"right":310,"bottom":944},"placement":"bottom-start"},"area":"end span-end","style":"position-anchor: --vn-placement-184; position: fixed; translate: 0px; position-area: block-end span-inline-end; position-try-fallbacks: none; inset: auto; margin: 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'config-offset'
{"name":"config-offset","initial":{"box":{"x":160,"y":358,"width":160,"height":50,"right":320,"bottom":408},"placement":"bottom-start"},"expected":{"box":{"x":160,"y":358,"width":160,"height":50,"right":320,"bottom":408},"placement":"bottom-start"},"actual":{"box":{"x":160,"y":358,"width":160,"height":50,"right":320,"bottom":408},"placement":"bottom-start"},"area":"end span-end","style":"position-anchor: --vn-placement-185; position: fixed; translate: 0px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 20px -10px 0px 10px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'config-overflow-boundary'
{"name":"config-overflow-boundary","initial":{"box":{"x":241.53125,"y":338,"width":160,"height":50,"right":401.53125,"bottom":388},"placement":"bottom-end"},"expected":{"box":{"x":241.53125,"y":338,"width":160,"height":50,"right":401.53125,"bottom":388},"placement":"bottom-end"},"actual":{"box":{"x":241.53125,"y":338,"width":160,"height":50,"right":401.53125,"bottom":388},"placement":"bottom-end"},"area":"end span-start","style":"position-anchor: --vn-placement-186; position: fixed; translate: -19px; position-area: block-end span-inline-end; position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline; inset: auto; margin: 0px; width: 160px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'config-tip-placement'
{"name":"config-tip-placement","initial":{"box":{"x":74.796875,"y":344,"width":157.203125,"height":29,"right":232,"bottom":373},"arrow":{"x":184.796875,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.59375,"bottom":344},"placement":"bottom-end"},"expected":{"box":{"x":74.796875,"y":344,"width":157.203125,"height":29,"right":232,"bottom":373},"arrow":{"x":184.796875,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.59375,"bottom":344},"placement":"bottom-end"},"actual":{"box":{"x":75,"y":344,"width":157.1875,"height":29,"right":232.1875,"bottom":373},"arrow":{"x":185,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":344},"placement":"bottom-end"},"area":"end span-start","style":"position-anchor: --vn-placement-187; position: fixed; translate: 75px 338px; position-area: block-end span-inline-start; position-try-fallbacks: --vn-placement-187-0, --vn-placement-187-1, --vn-placement-187-2, --vn-placement-187-3; inset: auto; margin: 6px 0px 0px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'config-tip-offset'
{"name":"config-tip-offset","initial":{"box":{"x":123,"y":244.609375,"width":157.203125,"height":35.390625,"right":280.203125,"bottom":280},"arrow":{"x":123,"y":244.609375,"width":12.796875,"height":6.390625,"right":135.796875,"bottom":251},"placement":"top"},"expected":{"box":{"x":123,"y":244.609375,"width":157.203125,"height":35.390625,"right":280.203125,"bottom":280},"arrow":{"x":123,"y":244.609375,"width":12.796875,"height":6.390625,"right":135.796875,"bottom":251},"placement":"top"},"actual":{"box":{"x":122.40625,"y":245,"width":157.1875,"height":35.390625,"right":279.59375,"bottom":280.390625},"arrow":{"x":122.40625,"y":245,"width":12.796875,"height":6.390625,"right":135.203125,"bottom":251.390625},"placement":"top"},"area":"block-start","style":"position-anchor: --vn-placement-188; position: fixed; translate: -16px 245px; position-area: block-start; position-try-fallbacks: flip-block; inset: auto; margin: 0px -10px 20px 10px; width: 157.203px;"}
·stdout | tests/src/browser/Placement.test.ts:430:4 > Placement population > 'config-popover-flip'
{"name":"config-popover-flip","initial":{"box":{"x":406,"y":269,"width":175.203125,"height":107.1875,"right":581.203125,"bottom":376.1875},"arrow":{"x":407,"y":270,"width":8,"height":16,"right":415,"bottom":286},"placement":"right"},"expected":{"box":{"x":406,"y":265,"width":175.203125,"height":107.1875,"right":581.203125,"bottom":372.1875},"arrow":{"x":407,"y":266,"width":8,"height":16,"right":415,"bottom":282},"placement":"right"},"actual":{"box":{"x":406,"y":265.40625,"width":175.1875,"height":107.1875,"right":581.1875,"bottom":372.59375},"arrow":{"x":407,"y":266.40625,"width":8,"height":16,"right":415,"bottom":282.40625},"placement":"right"},"area":"inline-end","style":"position-anchor: --vn-placement-189; position: fixed; translate: 406px -129px; position-area: inline-end; position-try-fallbacks: none; inset: auto; margin: 0px; width: 175.203px;"}
·x··x·······stdout | tests/src/browser/Placement.test.ts:1019:3 > Placement moving geometry > 'Dropdown'-'scroll'
{"name":"Dropdown-scroll","expected":{"box":{"x":170,"y":340,"width":160,"height":50,"right":330,"bottom":390},"placement":"bottom-start"},"actual":{"box":{"x":170,"y":340,"width":160,"height":50,"right":330,"bottom":390},"placement":"bottom-start"}}
··stdout | tests/src/browser/Placement.test.ts:1019:3 > Placement moving geometry > 'Dropdown'-'resize'
{"name":"Dropdown-resize","expected":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"},"actual":{"box":{"x":86.53125,"y":340,"width":160,"height":50,"right":246.53125,"bottom":390},"placement":"bottom-end"}}
stdout | tests/src/browser/Placement.test.ts:1019:3 > Placement moving geometry > 'Dropdown'-'transform'
{"name":"Dropdown-transform","expected":{"box":{"x":182,"y":458,"width":160,"height":50,"right":342,"bottom":508},"placement":"bottom-start"},"actual":{"box":{"x":182,"y":458,"width":160,"height":50,"right":342,"bottom":508},"placement":"bottom-start"}}
·stdout | tests/src/browser/Placement.test.ts:1019:3 > Placement moving geometry > 'Tooltip'-'scroll'
{"name":"Tooltip-scroll","expected":{"box":{"x":133,"y":344,"width":157.203125,"height":29,"right":290.203125,"bottom":373},"arrow":{"x":205,"y":337.609375,"width":12.796875,"height":6.390625,"right":217.796875,"bottom":344},"placement":"bottom"},"actual":{"box":{"x":132.609375,"y":344,"width":157.1875,"height":29,"right":289.796875,"bottom":373},"arrow":{"x":204.609375,"y":337.609375,"width":12.796875,"height":6.390625,"right":217.40625,"bottom":344},"placement":"bottom"}}
··stdout | tests/src/browser/Placement.test.ts:1019:3 > Placement moving geometry > 'Tooltip'-'resize'
{"name":"Tooltip-resize","expected":{"box":{"x":113,"y":344,"width":157.203125,"height":29,"right":270.203125,"bottom":373},"arrow":{"x":185,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.796875,"bottom":344},"placement":"bottom"},"actual":{"box":{"x":112.40625,"y":344,"width":157.1875,"height":29,"right":269.59375,"bottom":373},"arrow":{"x":184.40625,"y":337.609375,"width":12.796875,"height":6.390625,"right":197.203125,"bottom":344},"placement":"bottom"}}
stdout | tests/src/browser/Placement.test.ts:1019:3 > Placement moving geometry > 'Tooltip'-'transform'
{"name":"Tooltip-transform","expected":{"box":{"x":145,"y":462,"width":157.203125,"height":29,"right":302.203125,"bottom":491},"arrow":{"x":217,"y":455.609375,"width":12.796875,"height":6.390625,"right":229.796875,"bottom":462},"placement":"bottom"},"actual":{"box":{"x":144.609375,"y":462,"width":157.1875,"height":29,"right":301.796875,"bottom":491},"arrow":{"x":216.609375,"y":455.609375,"width":12.796875,"height":6.390625,"right":229.40625,"bottom":462},"placement":"bottom"}}
··stdout | tests/src/browser/Placement.test.ts:1019:3 > Placement moving geometry > 'Popover'-'scroll'
{"name":"Popover-scroll","expected":{"box":{"x":124,"y":346,"width":175.203125,"height":91.1875,"right":299.203125,"bottom":437.1875},"arrow":{"x":204,"y":338,"width":16,"height":8,"right":220,"bottom":346},"placement":"bottom"},"actual":{"box":{"x":123.609375,"y":346,"width":175.1875,"height":91.1875,"right":298.796875,"bottom":437.1875},"arrow":{"x":202.609375,"y":338,"width":16,"height":8,"right":218.609375,"bottom":346},"placement":"bottom"}}
xstdout | tests/src/browser/Placement.test.ts:1019:3 > Placement moving geometry > 'Popover'-'resize'
{"name":"Popover-resize","expected":{"box":{"x":104,"y":346,"width":175.203125,"height":91.1875,"right":279.203125,"bottom":437.1875},"arrow":{"x":184,"y":338,"width":16,"height":8,"right":200,"bottom":346},"placement":"bottom"},"actual":{"box":{"x":103.40625,"y":346,"width":175.1875,"height":91.1875,"right":278.59375,"bottom":437.1875},"arrow":{"x":183.40625,"y":338,"width":16,"height":8,"right":199.40625,"bottom":346},"placement":"bottom"}}
·stdout | tests/src/browser/Placement.test.ts:1019:3 > Placement moving geometry > 'Popover'-'transform'
{"name":"Popover-transform","expected":{"box":{"x":136,"y":464,"width":175.203125,"height":91.1875,"right":311.203125,"bottom":555.1875},"arrow":{"x":216,"y":456,"width":16,"height":8,"right":232,"bottom":464},"placement":"bottom"},"actual":{"box":{"x":135.609375,"y":464,"width":175.1875,"height":91.1875,"right":310.796875,"bottom":555.1875},"arrow":{"x":214.609375,"y":456,"width":16,"height":8,"right":230.609375,"bottom":464},"placement":"bottom"}}
xx··········································································································································································stdout | tests/src/browser/Lock.test.ts:138:2 > body scrollbar lock > shares measurement across owners and restores only on final release
{"measurement":"scrollbar-compensation","mode":"test","width":0}
·····································································

 Test Files  2 failed | 24 passed (26)
      Tests  6 failed | 793 passed (799)
   Start at  17:14:07
   Duration  202.57s (transform 0ms, setup 6.36s, import 1.46s, tests 182.12s, environment 0ms)


```

stderr.log:

```text
5:14:49 PM [vite] (client) [Unhandled error] VeneerError: Component teardown failed
 > Veneer.destroy src/browser/Veneer.ts:128:9
    126 |  		if (Veneer.#scopes.get(this.#root) === this) Veneer.#scopes.delete(this.#root)
    127 |  		if (errors.length)
    128 |  			throw new VeneerError('VENEER_DESTROY', 'Component teardown failed', { errors })
        |           ^
    129 |  	}
    130 |  
 > src/browser/Veneer.ts:222:37
 > attempt node_modules/@orkestrel/contract/dist/src/core/index.js:2489:10
 > #boot src/browser/Veneer.ts:222:18
 > new Veneer src/browser/Veneer.ts:79:60
 > Veneer.resolve src/browser/Veneer.ts:108:54
 > createVeneer src/browser/factories.ts:173:15
 > tests/src/browser/Veneer.test.ts:118:32
 > attempt node_modules/@orkestrel/contract/dist/src/core/index.js:2489:10
 > tests/src/browser/Veneer.test.ts:118:18

5:14:49 PM [vite] (client) [console.error] Error: Uncaught VeneerError: Component teardown failed
    at throwUnhandlerError (http://localhost:63315/@fs/home/user/.wave/veneer-b4/node_modules/@vitest/browser/dist/client/error-catcher.js:38:33)
    at #boot (http://localhost:63315/src/browser/Veneer.ts:179:64)
    at new Veneer (http://localhost:63315/src/browser/Veneer.ts:58:60)
    at Veneer.resolve (http://localhost:63315/src/browser/Veneer.ts:81:55)
    at createVeneer (http://localhost:63315/src/browser/factories.ts:83:16)
    at http://localhost:63315/home/user/.wave/veneer-b4/tests/src/browser/Veneer.test.ts?import&browserv=1791306888982:73:33
    at attempt (http://localhost:63315/node_modules/.vite/vitest/b27dd0da05f810f88681a19f44fd63c3c0a89532/deps/@orkestrel_contract.js?v=a9ece1a2:2483:11)
    at http://localhost:63315/home/user/.wave/veneer-b4/tests/src/browser/Veneer.test.ts?import&browserv=1791306888982:73:19
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:302:11
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:1903:26
5:14:49 PM [vite] (client) [Unhandled error] SyntaxError: Failed to execute 'closest' on 'Element': '[' is not a valid selector.
 > src/browser/Veneer.ts:194:28
    192 |  				if (route.event !== event.type) continue
    193 |  				const result = attempt(() => {
    194 |  					const trigger = target.closest(route.selector)
        |                              ^
    195 |  					if (!isBrowserElement(trigger) || this.#owner(path, trigger) !== this) return
    196 |  					route.execute({
 > attempt node_modules/@orkestrel/contract/dist/src/core/index.js:2489:10
 > #route src/browser/Veneer.ts:193:19
 > Veneer.#document.addEventListener.capture src/browser/Veneer.ts:70:64
 > tests/src/browser/Veneer.test.ts:150:9
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2027:60
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:302:11
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:1903:26
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2326:20

5:14:49 PM [vite] (client) [console.error] Error: Uncaught 
    at throwUnhandlerError (http://localhost:63315/@fs/home/user/.wave/veneer-b4/node_modules/@vitest/browser/dist/client/error-catcher.js:38:33)
    at #route (http://localhost:63315/src/browser/Veneer.ts:161:32)
    at Veneer.#document.addEventListener.capture (http://localhost:63315/src/browser/Veneer.ts:52:90)
    at http://localhost:63315/home/user/.wave/veneer-b4/tests/src/browser/Veneer.test.ts?import&browserv=1791306888982:109:9
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2027:60
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:302:11
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:1903:26
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2326:20
    at new Promise (<anonymous>)
    at runWithCancel (http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2323:10)
5:14:49 PM [vite] (client) [Unhandled error] Error: Settled boot failed
 > tests/src/browser/Veneer.test.ts:230:18
    228 |  		const created = createRecorder<readonly [Button]>()
    229 |  		const observed = createRecorder<readonly [unknown]>()
    230 |  		const failure = new Error('Settled boot failed')
        |                    ^
    231 |  		const controller = new AbortController()
    232 |  		window.addEventListener(
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2027:60
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:302:11
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:1903:26
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2326:20
 > runWithCancel node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2323:10
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2305:20
 > runWithTimeout node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2272:10

5:14:49 PM [vite] (client) [console.error] Error: Uncaught Error: Settled boot failed
    at throwUnhandlerError (http://localhost:63315/@fs/home/user/.wave/veneer-b4/node_modules/@vitest/browser/dist/client/error-catcher.js:38:33)
    at http://localhost:63315/home/user/.wave/veneer-b4/tests/src/browser/Veneer.test.ts?import&browserv=1791306888982:194:30
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2027:60
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:302:11
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:1903:26
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2326:20
    at new Promise (<anonymous>)
    at runWithCancel (http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2323:10)
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2305:20
    at new Promise (<anonymous>)
stderr | tests/src/browser/Veneer.test.ts:83:2 > engine contexts and routing > reports failed boot teardown while rethrowing the boot error
[Error: Uncaught VeneerError: Component teardown failed]
stderr | tests/src/browser/Veneer.test.ts:132:2 > engine contexts and routing > isolates selector failures from later routes: [
[Error: Uncaught ]
stderr | tests/src/browser/Veneer.test.ts:218:24 > engine contexts and routing > releases settled components when boot fails: deferred=true
[Error: Uncaught Error: Settled boot failed]
stderr | tests/src/browser/Veneer.test.ts:275:2 > engine contexts and routing > destroys a failed boot and preserves its conflict, deferred=true
[Error: Uncaught VeneerError: A live component holds this plugin and host]
5:14:49 PM [vite] (client) [Unhandled error] VeneerError: A live component holds this plugin and host
 > Object.own src/browser/Registry.ts:67:11
    65 |  				const existing = entries.get(plugin.name)
    66 |  				if (existing && !existing.destroyed && existing !== component)
    67 |  					throw new VeneerError(
       |             ^
    68 |  						'REGISTRY_CONFLICT',
    69 |  						'A live component holds this plugin and host',
 > Object.own src/browser/Veneer.ts:141:12
 > new Button src/browser/Button.ts:26:10
 > tests/src/browser/Veneer.test.ts:300:34
 > attempt node_modules/@orkestrel/contract/dist/src/core/index.js:2489:10
 > create tests/src/browser/Veneer.test.ts:300:20
 > Object.create src/browser/helpers.ts:80:3
 > Object.execute src/browser/helpers.ts:126:44
 > #initialize src/browser/Veneer.ts:239:10
 > #boot src/browser/Veneer.ts:220:20

5:14:49 PM [vite] (client) [console.error] Error: Uncaught VeneerError: A live component holds this plugin and host
    at throwUnhandlerError (http://localhost:63315/@fs/home/user/.wave/veneer-b4/node_modules/@vitest/browser/dist/client/error-catcher.js:38:33)
    at http://localhost:63315/home/user/.wave/veneer-b4/tests/src/browser/Veneer.test.ts?import&browserv=1791306888982:251:11
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2027:60
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:302:11
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:1903:26
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2326:20
    at new Promise (<anonymous>)
    at runWithCancel (http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2323:10)
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2305:20
    at new Promise (<anonymous>)
5:14:49 PM [vite] (client) [Unhandled error] Error: Dispatch refused
 > tests/src/browser/Veneer.test.ts:410:18
    408 |  			{ capture: true, signal: controller.signal },
    409 |  		)
    410 |  		const failure = new Error('Dispatch refused')
        |                    ^
    411 |  		const first = buildEnginePlugin({
    412 |  			routes: [
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:302:11
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:1903:26
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2326:20
 > runWithCancel node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2323:10
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2305:20
 > runWithTimeout node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2272:10
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2956:64

5:14:49 PM [vite] (client) [console.error] Error: Uncaught Error: Dispatch refused
    at throwUnhandlerError (http://localhost:63315/@fs/home/user/.wave/veneer-b4/node_modules/@vitest/browser/dist/client/error-catcher.js:38:33)
    at #route (http://localhost:63315/src/browser/Veneer.ts:161:32)
    at Veneer.#document.addEventListener.capture (http://localhost:63315/src/browser/Veneer.ts:52:90)
    at http://localhost:63315/home/user/.wave/veneer-b4/tests/src/browser/Veneer.test.ts?import&browserv=1791306888982:364:9
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:302:11
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:1903:26
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2326:20
    at new Promise (<anonymous>)
    at runWithCancel (http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2323:10)
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2305:20
5:14:49 PM [vite] (client) [Unhandled error] Error: Dispatch refused
 > tests/src/browser/Veneer.test.ts:410:18
    408 |  			{ capture: true, signal: controller.signal },
    409 |  		)
    410 |  		const failure = new Error('Dispatch refused')
        |                    ^
    411 |  		const first = buildEnginePlugin({
    412 |  			routes: [
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:302:11
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:1903:26
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2326:20
 > runWithCancel node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2323:10
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2305:20
 > runWithTimeout node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2272:10
 > node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2956:64

5:14:49 PM [vite] (client) [console.error] Error: Uncaught Error: Dispatch refused
    at throwUnhandlerError (http://localhost:63315/@fs/home/user/.wave/veneer-b4/node_modules/@vitest/browser/dist/client/error-catcher.js:38:33)
    at #clear (http://localhost:63315/src/browser/Veneer.ts:171:64)
    at Veneer.#document.addEventListener.signal (http://localhost:63315/src/browser/Veneer.ts:56:154)
    at http://localhost:63315/home/user/.wave/veneer-b4/tests/src/browser/Veneer.test.ts?import&browserv=1791306888982:364:9
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:302:11
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:1903:26
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2326:20
    at new Promise (<anonymous>)
    at runWithCancel (http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2323:10)
    at http://localhost:63315/node_modules/@vitest/runner/dist/chunk-artifact.js?v=a9ece1a2:2305:20
stderr | tests/src/browser/Veneer.test.ts:396:2 > engine contexts and routing > reports a throwing route and clear and continues to the next plugin
[Error: Uncaught Error: Dispatch refused]
stderr | tests/src/browser/Veneer.test.ts:396:2 > engine contexts and routing > reports a throwing route and clear and continues to the next plugin
[Error: Uncaught Error: Dispatch refused]

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 6 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |src:browser (chromium)| tests/src/browser/Placement.test.ts:471:2 > Placement controls > records the config-popover-flip transient departure and compares the settled box
AssertionError: expected { …(2) } to deeply equal { differences: [], unused: [] }

[32m- Expected[39m
[31m+ Received[39m

[2m  {[22m
[32m-   "differences": [],[39m
[32m-   "unused": [],[39m
[31m+   "differences": [[39m
[31m+     {[39m
[31m+       "actual": "Settled (406,265.40625,175.1875,107.1875,581.1875,372.59375)",[39m
[31m+       "checkpoint": "config-popover-flip",[39m
[31m+       "expected": "Initial (406,269,175.203125,107.1875,581.203125,376.1875); settled (406,265,175.203125,107.1875,581.203125,372.1875)",[39m
[31m+       "path": "floating",[39m
[31m+       "property": "box",[39m
[31m+     },[39m
[31m+     {[39m
[31m+       "actual": undefined,[39m
[31m+       "checkpoint": "config-popover-flip",[39m
[31m+       "expected": "Initial (401,269,155.984375,107.1875,556.984375,376.1875); settled (401,265,155.984375,107.1875,556.984375,372.1875)",[39m
[31m+       "path": "floating::box",[39m
[31m+       "property": "departure",[39m
[31m+     },[39m
[31m+   ],[39m
[31m+   "unused": [[39m
[31m+     {[39m
[31m+       "bootstrap": "Initial (401,269,155.984375,107.1875,556.984375,376.1875); settled (401,265,155.984375,107.1875,556.984375,372.1875)",[39m
[31m+       "engine": "Settled (401.03125,265.40625,155.96875,107.1875,557,372.59375)",[39m
[31m+       "path": "floating::box",[39m
[31m+       "proof": "Placement.test.ts: records the config-popover-flip transient departure and compares the settled box",[39m
[31m+       "reason": "A popperConfig modifier list replaces Bootstrap's early-placement and arrow modifiers; equality uses the oracle after one update, and the engine omits the transient. Box order: x,y,width,height,right,bottom.",[39m
[31m+       "scenario": "config-popover-flip",[39m
[31m+     },[39m
[31m+   ],[39m
[2m  }[22m

 ❯ tests/src/browser/Placement.test.ts:513:5
    511|      ledger.rows.filter((row) => row.scenario === 'config-popover-flip…
    512|     ),
    513|    ).toEqual({ differences: [], unused: [] })
       |     ^
    514|   } finally {
    515|    placement.destroy()

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/6]⎯

 FAIL  |src:browser (chromium)| tests/src/browser/Placement.test.ts:681:2 > Placement controls > measures the perpendicular keyword dimension swap warrant for constructed rules
AssertionError: expected 120 to be 80 // Object.is equality

[32m- Expected[39m
[31m+ Received[39m

[32m- 80[39m
[31m+ 120[39m

 ❯ tests/src/browser/Placement.test.ts:693:47
    691|    expect(panel.getBoundingClientRect().height).toBe(80)
    692|    panel.style.setProperty('position-try-fallbacks', 'flip-start')
    693|    expect(panel.getBoundingClientRect().width).toBe(80)
       |                                               ^
    694|    expect(panel.getBoundingClientRect().height).toBe(120)
    695|    panel.style.setProperty('position-try-fallbacks', 'none')

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/6]⎯

 FAIL  |src:browser (chromium)| tests/src/browser/Placement.test.ts:1019:3 > Placement moving geometry > 'Popover'-'scroll'
 FAIL  |src:browser (chromium)| tests/src/browser/Placement.test.ts:1019:3 > Placement moving geometry > 'Popover'-'transform'
AssertionError: expected 1.390625 to be less than or equal to 1
 ❯ tests/src/browser/Placement.test.ts:1062:7
    1060|      expect(
    1061|       Math.abs(requireValue(native)[coordinate] - requireValue(oracle)…
    1062|      ).toBeLessThanOrEqual(1)
       |       ^
    1063|   } finally {
    1064|    placement.destroy()

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/6]⎯

 FAIL  |src:browser (chromium)| tests/src/browser/Placement.test.ts:1072:1 > consumes every selected departure
AssertionError: expected [ { …(6) } ] to deeply equal []

[32m- Expected[39m
[31m+ Received[39m

[32m- [][39m
[31m+ [[39m
[31m+   {[39m
[31m+     "bootstrap": "Initial (401,269,155.984375,107.1875,556.984375,376.1875); settled (401,265,155.984375,107.1875,556.984375,372.1875)",[39m
[31m+     "engine": "Settled (401.03125,265.40625,155.96875,107.1875,557,372.59375)",[39m
[31m+     "path": "floating::box",[39m
[31m+     "proof": "Placement.test.ts: records the config-popover-flip transient departure and compares the settled box",[39m
[31m+     "reason": "A popperConfig modifier list replaces Bootstrap's early-placement and arrow modifiers; equality uses the oracle after one update, and the engine omits the transient. Box order: x,y,width,height,right,bottom.",[39m
[31m+     "scenario": "config-popover-flip",[39m
[31m+   },[39m
[31m+ ][39m

 ❯ tests/src/browser/Placement.test.ts:1073:23
    1071| const ledger = new DepartureLedger(readDepartures(guide, 'Engine depar…
    1072| it('consumes every selected departure', () => {
    1073|  expect(ledger.unused).toEqual([])
       |                       ^
    1074|  expect(ledger.unproven).toEqual([])
    1075| })

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/6]⎯

 FAIL  |src:browser (chromium)| tests/src/browser/Tip.test.ts:1147:2 > Tip initialization: popover > projects markup leaves and refuses the tooltip config and sanitizer attributes
AssertionError: expected 'top' to be 'right' // Object.is equality

Expected: [32m"right"[39m
Received: [31m"top"[39m

 ❯ tests/src/browser/Tip.test.ts:1166:25
    1164|    expect(tip.panel?.querySelector('[onerror]')).toBeNull()
    1165|    expect(tip.panel?.classList.contains('message')).toBe(true)
    1166|    expect(tip.placement).toBe('right')
       |                         ^
    1167|    expect(tip.phase).toBe('shown')
    1168|   } finally {

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[5/6]⎯


```

