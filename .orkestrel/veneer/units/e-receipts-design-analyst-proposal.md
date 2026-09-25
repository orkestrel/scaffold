Keep the promised hosts and accepted receipts in `guides/veneer.md`, with runtime collection and a validation gate. Leave E-RECEIPTS open until the promised browser runs exist. Close `Audit claim 14` only on an executed release-mode distribution proof.

**Promised hosts.** Record Windows and Linux as the operating-system scope, and Chromium, Chrome, and Edge as the browser families. The portability rule supplies the operating systems; the platform tenet and README identify the browser families. An executable layout in `configs/browsers.ts` doesn't establish another support promise.

Treat the existing build strings as measurements, not supported-version ranges. The terrain establishes no browser minimum version. Don't turn Playwright revision `1243` into a browser requirement or treat Chromium `141.0.7390.37` as the minimum supported build.

Make a `Hosts` section in the guide the canonical index of these obligations:

| Subject | Authority and ruling |
| --- | --- |
| Operating systems and browser families | Declare the scope in the guide. Replace the README’s independent host list with a link. Point ROADMAP receipt obligations at this section. |
| Node | Read `engines.node` from `package.json`; don't maintain another literal range. |
| npm | Read `devEngines.packageManager` from `package.json`. This governs development commands, not the consumer’s browser. |
| Tailwind | Keep the supported `4.3` line in the guide’s Tailwind section and link to it from `Hosts`. Record the exact installed version when its proofs run. |
| Vue | Keep the adapter obligation with E-VUE. The development dependency doesn't establish an implemented Vue integration or a supported Vue version range. |
| Playwright | Record the installed tool version and the selected managed revision as provenance. Neither substitutes for the browser’s measured build. |

This preserves the distinction between a support obligation and a reading on a particular configuration. It doesn't claim coverage of every browser–operating-system pairing. The host record must show which configurations were measured and which remain unverified.

The authorities are the [manifest](/home/user/veneer-read/package.json:121), [platform tenet](/home/user/veneer-read/ROADMAP.md:54), [Tailwind contract](/home/user/veneer-read/guides/veneer.md:3309), and scaffold’s [portability rule](/home/user/scaffold/.claude/rules/portability.md:14).

**Receipt shape and home.** Put accepted receipt records under `Receipts` in the existing guide. ROADMAP requires the guide to remain the machine-read record; another maintained JSON ledger would duplicate it. Retain the executed instrument and logs in the orchestrator’s scaffold repository under `.orkestrel/veneer/`, following the retention contract. Link to retained evidence through an immutable revision so acceptance pruning doesn't break provenance.

Use the following logical shape. Properties and collections are readonly.

| Field | Required content |
| --- | --- |
| `id` | Stable identifier used by claim links. |
| `revision` | Veneer commit measured; identify any measured patch explicitly. |
| `date` | UTC timestamp of the run. |
| `host` | Operating system, release, and architecture of the execution host. |
| `node` | Exact Node version used by the commands. |
| `npm` | Exact npm version and the executable or JavaScript entry actually invoked. |
| `browser` | Product, exact version returned by the running browser, and the observation source. |
| `selection` | Effective channel, executable, or connection selection; managed revision when applicable. |
| `tools` | Exact installed Playwright version and relevant integration versions, including Tailwind for its proofs. |
| `commands` | Executable, arguments, working directory, relevant browser overrides, mode, result, exit code or termination cause, and executed/skipped scope. |
| `evidence` | Durable instrument and output references; distribution receipts also identify the packed artifact. |
| `limits` | Explicit exclusions and unmeasured behavior. |

A command that fails before browser launch produces an attempt record with its failure, not a browser receipt with an invented version. An unattempted host belongs in the host-obligation table with its owner and prerequisite. Derive completion from evidence; don't store another independent “verified” flag.

Implement collection and checking through the package’s existing setup modules:

- Read browser provenance from the instance performing the measurement. Use Playwright’s `browser.version()` for direct launches. For Vitest browser projects, use the provider’s installed protocol interface and validate its returned version data.
- Capture Node and npm from the processes executing the chain. Prepend the pinned npm installation to the command environment so nested `npm` invocations don't fall back to system npm.
- Emit structured observations into the retained run output. Have the native instrument assemble the receipt from those observations and command results.
- Parse the guide through installed Markdown and Guide capabilities. Extend `tests/guides.test.ts` to reject malformed receipts, duplicate identifiers, dangling claim references, and a success assertion backed by failed or skipped required work.
- Preserve the oracle’s distinction between provenance and behavioral comparison. A different valid browser build must remain permissible when the recorded behavior agrees.

The installed packages already expose `createMarkdown`, `selectSectionBlocks`, and `findColumnIndex`. The oracle already calls `browser.version()`; see [the recorder](/home/user/veneer-read/tests/setupServer.ts:3448). No npm package or published receipt API is needed.

**Build attribution in existing prose.** Use stable receipt links wherever prose reports a run. Repeat an exact build inline only where distinguishing builds is necessary to understand the behavior.

The following edits resolve the cited claims:

| Claim location | Ruling |
| --- | --- |
| Sanitizer and closing `beforetoggle` paragraphs | Name the exact measured Chromium build and link the receipt covering the named behavior. Don't attach an unrelated passing gate run. |
| Preflight comparison | Name the exact build behind the recorded defaults and link its receipt. Describe staged Chromium defaults as staged input; that run doesn't establish behavior on another browser build. |
| “Managed Chromium and Edge receipts” departures and selector rows | Link the particular receipts supporting the claim. Until Edge evidence exists, remove the assertion that Edge proved it and name the outstanding obligation. |
| Filled-role “run-6” readings | Resolve the original instrument and browser provenance. Preserve the historical measurement with its evidence, or take a fresh measurement and describe that run. |
| Compatibility ledger | Keep obligation and proof-path rows as contracts. Link any surrounding statement reporting an executed browser result to its receipt; don't add a browser version to every obligation row. |
| ROADMAP npm standing condition | Distinguish system npm `10.9.7` from the pinned npm used for the receipt. Link the measured command environment. |
| ROADMAP Playwright standing condition | Distinguish expected revision, available revision, exact running build, and user-agent text. Link each build-dependent observation. |
| ROADMAP sandbox condition | Keep it as an execution constraint. If retaining the historical “browser projects run” assertion, link its original measured evidence. |
| `Chrome receipt` and `Audit claim 14` | Link the host obligation and release receipt respectively. Record closure only when their evidence exists. |
| `PREFLIGHT-HOST` row | Link the exact-build receipt and retain the distinction between native defaults and staged input. |

Don't fill historical gaps with today’s Node version, npm version, or date. The existing Windows and Linux reports need their original evidence recovered or fresh runs recorded.

**Unreachable hosts.** Assign Linux Chromium collection to the native host execution lane. Assign Windows managed Chromium collection to the engine session’s native host lane. The brief supplies Chromium `141.0.7390.37` for Linux and `153.0.8010.12` for Windows; each receipt must measure the build again when it runs.

The Orchestrator owns Edge verification on the Windows host and coordinates Chrome verification after the user installs Chrome on the chosen supported host. The installed browser’s measured version replaces assumptions from the README. Edge `153.0.4234.48` is an identified installation, not a passing receipt.

For channel runs, clear conflicting executable and WebSocket overrides. `resolveBrowser` gives those overrides precedence over `PLAYWRIGHT_CHANNEL`; setting `chrome` or `msedge` alone doesn't prove the requested browser ran. See [the resolver](/home/user/veneer-read/configs/browsers.ts:289).

Until evidence exists, record “awaiting installation” or “awaiting native verification,” with the owner and settling command. Do not infer Chrome or Edge results from Chromium. A remote browser also needs its own host provenance; the controller’s operating system cannot silently stand in for it.

**Release-mode distribution proof.** Run it on the native Linux host after the build, using the pinned npm installation and the explicit available Chromium executable, provided the registry is reachable. It cannot run as accepted evidence inside this read-only design lane or a bench sandbox. If Linux cannot reach the registry, assign the same proof to the native Windows host and retain the Linux failure as an attempt.

The settling command is `npm run test:distribution -- --mode release`. Preserve its existing failure on unavailable registry or browser evidence. An ordinary-mode run that skips cannot close the row.

Extend the successful browser-launch path to emit the actual `browser.version()` before driving the packed consumer. Keep `describeBrowser` for launch-failure diagnostics: an executable path or channel describes the attempted selection, not a measured build. Record provenance for every launched browser used by the proof; split differing builds into distinct measurements.

The receipt must identify the release mode, source revision, packed artifact, real archive installation, command result, and browser build used by the applicable installed-consumer assertions. Build first because `buildStage` packs with `--ignore-scripts`. The proof already performs an archive installation; preserve that behavior. See [the distribution proof](/home/user/veneer-read/tests/distribution.test.ts:826).

The implementation units have the following ownership and acceptance conditions.

| Unit | Role and engine | Owned files | Acceptance and dependencies |
| --- | --- | --- | --- |
| E-RECEIPTS-CONTRACT | `opus`, Opus 5.5 | `guides/veneer.md` host and receipt sections; `ROADMAP.md` receipt and standing-condition rows, through serialized ownership | Fix the host obligations, receipt schema, evidence-link rules, and closure conditions before mechanism implementation. README and guide style-row edits are exact patches returned to the styles session. |
| E-RECEIPTS-MECHANISM | `sol`, GPT-6 Astra, native for browser validation | `tests/setup.ts`, `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/setupService.ts`, `tests/setupService.test.ts`, `tests/guides.test.ts`, `tests/distribution.test.ts` | Depend on the contract. Collect provenance from the measured instances and validate guide records. Prove rejection of missing build data, dangling references, failed commands represented as success, and mismatched browser selection. Preserve oracle comparison across valid differing builds. Prove release failures with unavailable prerequisites and successful collection on a real browser. |
| E-RECEIPTS-INSTRUMENT | `sol`, GPT-6 Astra | Scaffold’s `.orkestrel/veneer/units/e-receipts-run.mjs` and its retained unit record | Depend on the mechanism. Produce portable command execution, pinned npm propagation, structured receipt output, and explicit failure results. Exercise real successful and failing child commands. Add no receipt database to Veneer. |
| E-RECEIPTS-RUNS | `verifier`, native Sonnet or Terra for the executing harness; Orchestrator owns installation-bearing tracked commands | No product source; retained instruments, logs, and receipt output | Depend on integrated implementation and E-IDENTITY. Run the prescribed gate chain on each recorded configuration. Run Tailwind service proofs where compatibility is claimed. Obtain Chrome and Edge evidence on their actual installations and execute release distribution on a reachable native host. |
| E-RECEIPTS-PROSE | `opus`, Opus 5.5 | `guides/veneer.md` receipt records and non-style claim links; `ROADMAP.md` closure links, serialized with their owners | Depend on accepted run evidence. The styles session applies the README and guide style-row patches. Replace unsupported Edge assertions, resolve historical claims, and pass guide and policy checks without inventing missing metadata. |

Treat `src/browser/**` and `tests/src/browser/**` as engine-session-owned and outside these writing units. Treat the README and guide style rows as styles-session-owned. Serialize writes to the guide even when sections differ. Leave scaffold-owned configuration and policy files untouched. Audit the implementation through the required independent lanes, then obtain authoritative gate evidence before acceptance.

The material risks are stale historical evidence, automatic browser updates during collection, browser-selection overrides, nested npm resolving to the system installation, and registry restrictions. Receipt attribution must expose these conditions. Schema validation proves the record’s structure; the retained execution output and independent review establish whether the claimed run happened.

The terrain’s cited source content held in the inspected areas, but its gap classification needs correction:

- **An outstanding Chrome obligation isn't a receipt missing its version.** Running `rg -n 'Open: Chrome|host verification receipt remains' README.md` returned the Edge assignment and `Open: Chrome is not installed on this host`. These are explicitly uncompleted work.
- **The Compatibility table isn't a browser receipt.** Running `rg -n '^This section is the ledger' guides/veneer.md` returned `10237:This section is the ledger of what Veneer accepts from Bootstrap 5.3.8. The`. Its rows describe obligations and proof bindings.
- **A staged Chromium profile isn't a Chromium host run.** Running `rg -n "this proof doesn't measure" guides/veneer.md` returned `3546:this proof doesn't measure that height on Chromium 153.` Preserve that limit.
- **Vue’s development dependency isn't evidence of an implemented Vue consumer.** Running `rg -n 'shell declares no' guides/veneer.md` returned the statement at line `10609` that the shell declares no component. E-VUE owns that missing implementation proof.