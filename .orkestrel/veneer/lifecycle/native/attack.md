# attack

```json
{
  "verdicts": [
    {
      "proposal": "consumer",
      "id": "publish-pool-0.0.16",
      "verdict": "CONFIRMED",
      "evidence": "pool/package.json:3 reads 0.0.15. HEAD 1f194d7 sits on the 4c589c6 release with 3ff0c63. pool/src/core/types.ts:105 adds `capacity`. BrowserMCPServer.ts:207 passes `capacity: contexts`, while browser/package.json:110 pins ^0.0.15. The claim that the public API 'gains nothing beyond `capacity`' is false: `git grep` shows 4c589c6 validators.ts exporting `isPoolMax` and HEAD exporting `isPoolLimit` (status.md:24 records the rename).",
      "repair": "Publish 0.0.16 with no further API change. Record the `isPoolMax` to `isPoolLimit` rename in the release record as a breaking change to a public export. No fleet source imports it. Refresh scaffold guides/pool.md, which still names `isPoolMax`, at the scaffold re-pin."
    },
    {
      "proposal": "consumer",
      "id": "browser-repin-pool",
      "verdict": "CONFIRMED",
      "evidence": "browser/package.json:110 pins ^0.0.15. git status shows package.json, package-lock.json, and src/core/constants.ts modified (the 0.0.25 bump and HAR stamp), plus C2's uncommitted test files. status.md:45 records that `npm ci` restores 0.0.15 and breaks the C1 build.",
      "repair": "Re-pin in the 0.0.25 release commit. The proposal lists only the item-15 hold. The release is also gated by C2, C3, and M2 (contexts-synthesis.md:53-56), because C1 (6bedbb1) now sits on main."
    },
    {
      "proposal": "consumer",
      "id": "pool-roadmap-correction",
      "verdict": "CONFIRMED",
      "evidence": "pool/ROADMAP.md item 1 ends 'probe runs each stage at `min: 1` with exclusive leases'. probe/package.json:95-101 declares no pool dependency, and probe/src has no `@orkestrel/pool` import. probe/ROADMAP.md item 1 is a plan. status.md:46 asks for a ruling on the item before the release.",
      "repair": "None. Ride the 0.0.16 release commit."
    },
    {
      "proposal": "consumer",
      "id": "worker-repin-narrow-capacity",
      "verdict": "CONFIRMED",
      "evidence": "worker/src/core/types.ts:77 reads `pool: PoolOptions<TResource>`. The Worker.ts:85-95 destructuring omits `capacity`. worker/package.json:89 pins ^0.0.14. No package depends on worker.",
      "repair": "Re-pin directly to ^0.0.16 and skip the ^0.0.15 step in status.md:62. Ground the narrowing in the minimal-API gate. Core `Worker` is generic over `TResource`, so the thread-abort blast radius (Dispatch.ts:162-169) is a NodeWorker concern, not the reason to narrow core. Add the idle-loss strike case. Refresh scaffold guides/worker.md."
    },
    {
      "proposal": "consumer",
      "id": "probe-pool-stages",
      "verdict": "CONFIRMED",
      "evidence": "probe/ROADMAP.md item 1 and the brief (eager-probe-brief.md:1, :13) target pool 0.0.14. The brief removes queue. Probe.ts:229-242 holds the unbounded re-arm. The user authorized declaring pool on 2026-10-03 (ROADMAP item 1).",
      "repair": "The risk is wrong: probe already pins contract ^0.0.19 (probe/package.json:95), so no contract re-pin comes along. Update the stale facts in the ROADMAP item and the brief (pool 0.0.14, browser 0.0.23, the contract re-pin) in the same change."
    },
    {
      "proposal": "consumer",
      "id": "node-worker-floor-watch",
      "verdict": "CONFIRMED",
      "evidence": "NodeWorker.ts:45-50 forwards only `create`, `destroy`, `validate`, and `max`. No package.json outside worker names @orkestrel/worker.",
      "repair": "Keep it at later. Admit it with the first `createNodeWorker` consumer."
    },
    {
      "proposal": "consumer",
      "id": "pool-token-retire",
      "verdict": "CONFIRMED",
      "evidence": "The gap is real. `destroy()` goes through #lose, and #strike skips leased records (Pool.ts:305-313, 512, 524). Browse emulates the verb at S:863-871 and 923-931. The rationale is wrong in two places. (1) A strike on a leased record does not change the grant rule: the refilled record is born in the new epoch, and its grant zeroes the strikes (Pool.ts:713, 482, 532). The verb therefore neither undoes Q3 nor bounds the loop. (2) At the default topology the shared holder co-holds the only slot from setup (S:274), so the release branches at S:865-869 and S:925-929 never run. Browse would delete no live code path.",
      "repair": "Keep it at later. Tie it to Q3(b) together with the reset change. Name it without creating a synonym of `destroy` (names.md, the fixed lifecycle vocabulary)."
    },
    {
      "proposal": "consumer",
      "id": "pool-roadmap-item-1",
      "verdict": "CONFIRMED",
      "evidence": "Pool.ts:359-387. At size 1 a spent or retained floor has disposed its only record, so no live lease remains to free a place. The default `BROWSE_POOL` is 1 (contexts-synthesis.md:11).",
      "repair": "Record the ruling (unbuilt, not blocking) before 0.0.16 publishes."
    },
    {
      "proposal": "reliability",
      "id": "release-pool-0.0.16",
      "verdict": "CONFIRMED",
      "evidence": "This item rests on the same facts as consumer publish-pool-0.0.16. The release unit sits at contexts-synthesis.md:56.",
      "repair": "Add the user's hold on browser 0.0.25 until item 15 is fixed (status.md:23) and the M2 confirmation (synthesis:55) to the browser gate. Name the `isPoolLimit` rename."
    },
    {
      "proposal": "reliability",
      "id": "record-retirement-limit",
      "verdict": "CONFIRMED",
      "evidence": "S:274 grants the shared holder at setup. S:866 then finds a co-holder, so #lose takes the leased path: no strike and an owed refill (Pool.ts:512, 524, 809). The idle-strike path is erased by the grant at Pool.ts:713. The tests reach spent only through `fixture.launcher.refuse` (BrowserMCPServer.test.ts:3211, 3248). Rulings 4 and 8 (contexts-synthesis.md:32, 36) claim a bound. Review-c1 claim 5 confirmed only the accounting.",
      "repair": "The C3 brief already lists the loop as a limit and states no bound (contexts-c3-brief.md:28). Correct rulings 4 and 8 in contexts-synthesis.md, and extend C3's limit line to name failed disposal and failed context creation."
    },
    {
      "proposal": "reliability",
      "id": "pool-roadmap-probe",
      "verdict": "CONFIRMED",
      "evidence": "This item duplicates consumer pool-roadmap-correction, with the same evidence.",
      "repair": "Merge it with that item."
    },
    {
      "proposal": "reliability",
      "id": "pool-fail-verb",
      "verdict": "REFUTED",
      "evidence": "Priority 'next' has no consumer. The item's own risk concedes that it bounds nothing without Q3(b), which the user ruled closed (contexts-synthesis.md:9). At the default topology the release-then-lose branches are dead (S:274, S:866, S:926), so browse gains no live deletion. Probe's deadline recycle wants the non-striking `destroy()`.",
      "repair": "Move it to later, behind the user reopening Q3(b). Build it with the reset change, or not at all."
    },
    {
      "proposal": "reliability",
      "id": "probe-on-pool",
      "verdict": "CONFIRMED",
      "evidence": "This item rests on the same evidence as consumer probe-pool-stages.",
      "repair": "The contract-pin risk is false: probe already pins ^0.0.19 (probe/package.json:95)."
    },
    {
      "proposal": "reliability",
      "id": "worker-repin-capacity",
      "verdict": "CONFIRMED",
      "evidence": "worker types.ts:77 and Worker.ts:85-106, as read.",
      "repair": "Same as consumer worker-repin-narrow-capacity."
    },
    {
      "proposal": "reliability",
      "id": "worker-thread-watch-floor",
      "verdict": "CONFIRMED",
      "evidence": "Dispatch.ts:162-169 terminates the thread. The next acquire's validate fails (NodeWorker.ts:69-71). Pool.ts:632 strikes only under `min`, and NodeWorker sets none. The item names no consumer.",
      "repair": "Keep it at later. Add the red-without-watch ordering test when a consumer arrives."
    },
    {
      "proposal": "reliability",
      "id": "pool-lease-signal",
      "verdict": "CONFIRMED",
      "evidence": "The consumer field reads 'None that deletes code today'. PoolToken carries only `value`, `release`, and `destroy` (types.ts:50-66). Browse keeps #departures and #notices regardless (S:771-780).",
      "repair": "Keep it at later, or never until a shared-record consumer exists that has no watch fan-out of its own."
    },
    {
      "proposal": "reliability",
      "id": "pool-roadmap-item-1",
      "verdict": "CONFIRMED",
      "evidence": "Same evidence as the consumer item.",
      "repair": "None."
    },
    {
      "proposal": "reliability",
      "id": "queue-retry-delay",
      "verdict": "CONFIRMED",
      "evidence": "Queue.ts:582-597 retries with no delay. queue.md:29 and :181 state that delay was deliberately cut. No consumer has a need.",
      "repair": "Keep it at later. Reopening the cut needs a consumer and a store-schema answer for `restore`."
    },
    {
      "proposal": "reliability",
      "id": "workflow-store-fencing",
      "verdict": "CONFIRMED",
      "evidence": "workflow types.ts:554-577 gives `get`, `set`, and `delete` with no revision. types.ts:2000-2002 makes the claim process-local. supervisor/package.json:111 pins workflow ^0.0.18.",
      "repair": "Keep it at later. Supervisor's run lease was not re-read."
    },
    {
      "proposal": "reliability",
      "id": "browser-process-launch",
      "verdict": "REFUTED",
      "evidence": "browser/package.json declares no @orkestrel/process, and AGENTS.md forbids adding an npm package without the user's request. No defect is recorded against browser's Windows kill (browser ROADMAP items 14-15 are unrelated). The item's own risk concedes the polling conflict.",
      "repair": "Never, unless the user asks and a Windows leftover-process defect is recorded."
    }
  ],
  "missing": [
    "The 0.0.16 release renames a public export. `isPoolMax` (4c589c6 src/core/validators.ts) becomes `isPoolLimit` (HEAD), so 0.0.16 breaks a caller that imports it. No fleet source imports it, and scaffold guides/pool.md still names `isPoolMax`. Both proposals call 0.0.16 'capacity only'.",
    "The content of browser 0.0.25 has changed. contexts-synthesis.md:58 planned 0.0.25 (e931740 and 132c580) to ship ahead of the contexts campaign. Main now carries item 16 (e8aa649) and C1 (6bedbb1), so 0.0.25 needs pool 0.0.16 and C2 (running), C3, and M2, plus the user's item-15 hold (status.md:23). Neither proposal lists the whole gate.",
    "Scaffold has its own release outstanding. status.md:69 records 64 commits since 0.0.92, including the cloud session's S46 rule, with the release coordinated through the lanes. This matters to the user's question about what is unpublished. The consumer proposal omits scaffold, and the reliability proposal mentions it only as a re-pin. Stale mirrors and records to refresh in that release: guides/pool.md, guides/worker.md, and eager/capabilities.md (pool 0.0.13).",
    "Probe item 1 removes @orkestrel/queue from probe (eager-probe-brief.md:13), so queue loses a consumer. This supports 'nothing for queue now'. The probe ROADMAP item 1 text also carries stale facts (pool 0.0.14, browser 0.0.23, a contract re-pin that is already done)."
  ],
  "recommendation": "Now:\n1. Record the ruling on pool ROADMAP item 1: it stays unbuilt and does not block the release, because size 1 cannot reach it. Delete the false sentence that says probe runs stages on pool.\n2. Publish pool 0.0.16 as it stands: `capacity`, the idle-loss strike, and the `isPoolLimit` rename, with the rename named as breaking in the release record.\n3. Correct contexts-synthesis.md rulings 4 and 8. A Chromium that always fails disposal or context creation falls under the Q3 call-paced loop, because the shared holder's lease makes it a leased loss and the next grant erases an idle strike. Extend the C3 brief's limit line to name both failures.\n4. Re-pin browser to ^0.0.16 in the 0.0.25 commit. Publish only after item 15 is fixed, and after C2, C3, and M2 close.\n5. Release scaffold with the pool re-pin and the refreshed mirrors (guides/pool.md, guides/worker.md, capabilities.md).\n\nNext:\n6. Re-pin worker straight to pool ^0.0.16. In the same change, narrow `WorkerOptions.pool` to exclude `capacity`. The minimal-API gate decides this: no consumer exists, and forwarding the option would expand the capability. Add a case that pins the idle-loss strike under `min` and `restarts`.\n7. Build probe ROADMAP item 1 on the existing pool 0.0.16 API, refreshing its stale facts first. Probe is pool's second real consumer, and it needs no new pool API.\n\nLater, each gated on a consumer or a user ruling:\n- A pool verb that faults a record and charges a strike, only if the user reopens Q3(b), and only together with moving the strike reset off the bare grant. Alone, it bounds nothing and deletes no live browse path at the default topology.\n- NodeWorker `min`, `restarts`, and a death-latch `watch`, with the first `createNodeWorker` consumer.\n- `PoolToken.signal`.\n- A queue retry `delay`, which reverses a deliberate cut.\n- Workflow store fencing, when supervisor returns to the release waves.\n\nNever, unless the user asks:\n- Launching Chromium through process (a dependency the user has not requested, and no recorded defect).\n- A holder or session layer, prepared sub-resources, or retained lease cleanup in pool or worker.\n- Validation on every hand-out.\n- A non-waiting acquire.\n- Public strike counts.\n- Queue de-duplication after an entry settles, or a cap on pending entries.\n\nAnswer to the user:\n- The publish gap is pool 0.0.16, which gates browser 0.0.25, plus scaffold's own release.\n- Nothing from the browse work needs to become native to pool or worker now.\n- Queue needs nothing."
}
```
