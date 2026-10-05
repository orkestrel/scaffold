# attack

**Verdict:** H1 holds, and a check of the retained netlog strengthens it. The plan has one flaw that would invalidate its readings, it lacks a deterministic positive control, and it misses one hypothesis.

**H1, synced webRequest/DNR extension install resets the loader factories: survives, stronger than stated.** The passing netlog `browser\tmp\probes\netlog\item15d-2\document_test_ts-...983e1c8c....json` shows two install waves. Times are relative to the first NTP event at line 130.
- **Wave 1, +0.24 to +2.4 s** (lines 156, 1800, 19152): `ghbmnnjooekpmoecnnnilnnbdlolhkhi` (Docs Offline) and `jmjflgjpcpepeafmmgdpfkogkghcpiha` ("Edge relevant text changes"). Their Default-profile manifests list no webRequest or DNR permission, so `MayHaveProxies` stays false.
- **Wave 2, +19.8 to +22.2 s** (lines 114221, 115491, 152390, 170016): `fcoeoabgfenejglbffodgkkbkcdhcgfn` (Claude, DNR) and `kiiaghlmeikbpmeabhilfphikfcefljn` (Capital One, webRequest). This is the false-to-true flip, inside the 15 to 24 s failure window.

The synthesis's "+0.2 s crx downloads" are wave 1. Those downloads cannot flip the flag, so its timing argument stood on the wrong wave until now.

Remaining risks to H1:
- An Edge component extension that holds webRequest from startup would make the flag true before wave 2, and then nothing flips. Nothing on record rules that out.
- The renderer mapping from a closed factory to `ERR_ABORTED` is unverified.
- Wave 2 also overlapped codec waves at +21.8 and +22.3 s in a run that passed. Per-overlap hit odds are small, so 3 of 3 failures at night needs a second factor, such as host load widening the swap window or a different wave-2 landing.

**H2, network-service crash: weak, keep only as a free Crashpad read.** The capture can't refute it, because no earlier request was in flight to cut. It doesn't explain the timing.

**H3, content script stops the load: refuted by the evidence on record.** Every cancellation lasts 0.1 to 0.6 ms from fetchStart, and a resident script would fail more than once per run. Arm C is still a valid decider.

**H4, sync settings: timing-refuted.** Sign-in lands at +0.3 to +0.6 s. Keep arm D only if arm B passes and arm A fails without wave-2 extensions.

**H5 and H6, IP-address flush and port exhaustion: refuted for the 20:13:08 run** (`test-tune-diagnose.log:66-79`, `ERR_ABORTED`, `canceled: true`). That is the only run with an errorText, so a cheap event-log read stays justified.

**Missed hypothesis, H7: Claude's `debugger` permission.** On install, the Claude extension attaches to tabs, and an attach-and-detach with interception would cancel pending requests. Wave 2 fits it too. An arm with Capital One alone (webRequest) separates H1 from H7: H1 predicts failures with either extension, H7 only with Claude. Also widen H1 from "first install" to any load or unload that flips the count, including enable, disable, update, and reload. `first_install_time` misses every case except a first install.

**Problems in the plan:**
1. **E1's back-to-back reload loop forges the signature.** A navigation during an import wave cancels that document's requests with `ERR_ABORTED` and `canceled: true`. Each iteration must wait until the toolset starts or a timeout passes. Count only failures inside a document that reached `complete` without a toolset, keyed by loaderId.
2. **Without a positive control, a zero in E1 says nothing.** The field rate since 07:00 is 0 of 16, and wave-2 timing follows the sync server. Add the deterministic trigger in step 2 of the plan.
3. **The optional `Extensions.loadUnpacked` control probably needs `--remote-debugging-pipe`.** The library uses a port. Replace it with the reload trigger in step 2.
4. **Arms B and D also remove the onInstalled tabs, which un-hides the page.** That is acceptable, because a hidden page alone is already ruled out. Record it as a confound.
5. **"Never a file run alone" has no measured sample.** Record wave-2 time in single-file runs before ruling on it.
6. **Fix proof by full runs is uninformative at a base rate near zero.** Prove the fix with the trigger instead: it fails with the default arguments and reads zero with `--disable-sync`. Confirm through Preferences that Edge honors `--disable-sync`, and keep the regression case that asserts no account extension is installed.

**Plan in the order I would run it:**
1. **Zero-run reads.**
   - **Netlog alignment:** for each retained item15d document netlog, find the wave-2 times (the POST `extensionwebstorebase/v1/crx` for `fcoeo...` and `kiiag...`, then `logextensionreliability`) and align them with the document page's module request times.
   - **Event logs:** query Get-WinEvent for H5 and H6 over the nine failure windows.

   Stop conditions:
   - If wave 2 never overlaps the capture stream in the passing runs, the session shift is explained and H1 gains support.
   - If adapter events line up with every failure, return to H5.
2. **Mechanism trigger.** No sync dependence, and seconds per trial.
   - **Setup:** reuse an arm-A profile with Claude removed, so Capital One is the only proxy-holding extension. The removal can itself fire a flip; wait for it to settle before the first trial.
   - **Trial:** through the existing CDP port, `Runtime.evaluate` `chrome.runtime.reload()` in Capital One's service-worker target, timed into the document page's import wave. A reload unloads and reloads the extension, which flips the flag twice.
   - **Control:** a no-op evaluate at the same timing.
   - **Stop, H1 mechanism confirmed:** pre-dispatch `ERR_ABORTED` on the trigger with zero on the control.
   - **Stop, H1 refuted:** the trigger reads zero. Run the Claude-only arm for H7, then read Crashpad for H2.
3. **E1 with the loop corrected.**
   - **Arms:** A and B, interleaved, plus the H7 split arm.
   - **Per launch:** record wave-2 time from Preferences and from extension service-worker `targetCreated` times.
   - **Before the series:** declare the launch count from arm A's observed rate.
   - **Stop:** every failure is classified, or the declared count is reached.
4. **Fix.** Add `--disable-sync` to `SERVICE_BROWSER_ARGS` and to the renderer-crash launcher. Whether `BROWSER_LAUNCH_ARGS` and `browse` carry it is the user's ruling.
5. **Prove the fix.**
   - The step 2 trigger and E1 arm A fail with the default arguments, and both read zero with the flag.
   - Copied Preferences show no synced extension.
   - Add the regression case.
   - Record the cause in ROADMAP item 15 and in `status.md`.

Before step 2 runs, the user must approve signing more fresh profiles in to their Microsoft account.

Paths cited are in `C:\Users\mikes\WebstormProjects\browser\tmp\codex\` and `C:\Users\mikes\AppData\Local\Microsoft\Edge\User Data\Default\Extensions\`.
