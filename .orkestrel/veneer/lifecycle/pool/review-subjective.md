**Lane:** subjective, covering API shape, vocabulary, consumer ergonomics and guide voice. I read the diff at `C:\Users\mikes\WebstormProjects\pool\tmp\codex\review-floor\diff.patch`, the tip files, the brief, the writer's report, `ruling.md`, `design-brief.md` D10 to D13, both consumers, and worker. Correctness questions go to the objective lane under Referred.

## Verdicts

1. **CONFIRMED.** The names `min`, `restarts`, `watch`, `start` and `destroy` follow the rules and read naturally for both consumers.
   - All five are one word, matching `names.md:27-31`.
   - `start` fills the floor and restarts a spent one, which is the fixed meaning "Begin or restart" (`names.md:224`).
   - On the token, `destroy` tears down one record (`names.md:231`). It sits naturally beside `release`, and record teardown is already called `destroy` in the hook and the event (`ruling.md:45`).
   - `watch` fits beside the other hooks, which are verbs: `create`, `destroy`, `validate`.
   - Browse reads `createPool<BrowserSlot>({ create, destroy, validate, watch, min: size, restarts })` and calls `token.destroy()` after a failed per-call ping.
   - Probe reads `min: 1` per stage and calls `token.destroy()` where its deadline fires (`C:\Users\mikes\WebstormProjects\probe\src\server\Probe.ts:525-526`).
   - Vocabulary drift in the prose is in A2 and A5.

2. **BROKEN.**
   - The minimal-surface half holds: there is no holder, no payload, no acquire option and no token signal (`types.ts:35-44`, `:50-66`, `:133`).
   - The "nothing left implicit" half fails, on three points.
   - **(a) How browse learns its leased browser was lost (R2).** Browse holds token T on slot S, and S's Chromium crashes.
     - The watch settles and `#lose` runs (`Pool.ts:436`). `#dispose` drops S from the leased set and runs browse's `destroy` hook while the session still holds T (`:709-713`).
     - After that, `T.release()` does nothing (`:682`) and `T.destroy()` resolves without doing anything (`:448-454`).
     - The guide never says a leased record is torn down under its holder or that the token then does nothing. It never says the holder learns of the loss only through its own `watch` or `destroy` hook (`guides/pool.md:118-125`, `:205-208`). The `release` summary lists teardown as the only case where the call does nothing (`types.ts:54-56`, `guides/pool.md:101`).
   - **(b) The watch idiom produces false error reports (R5).** The guide tells the watch to release its listeners on abort (`:123`).
     - Probe's natural watch is `(stage, signal) => once(client, 'exit', { signal })`. Node's `events.once` rejects with `AbortError` when the signal aborts.
     - Every planned disposal aborts that signal (`Pool.ts:710`): `token.destroy()` at a deadline, `clear()`, failed validation, and `pool.destroy()`. `#lose` ignores the rejection, but `Pool.ts:439` still calls `error(AbortError, 'watch')`.
     - So every recycle and every teardown reports an error. A fulfilment after the abort is ignored but a rejection after the abort is reported, which is inconsistent.
   - **(c) The blocked-floor hang is not stated.** The guide never says that an `acquire()` parks forever when retained records fill the floor (see claim 4).
   - Probe's deadline recycle itself maps cleanly onto `token.destroy()`. Its remaining obligations are in A1 and the Q1 referral.

3. **BROKEN.**
   - **(a) The executed example is not tied to the guide (R4).** `tests/guides.test.ts:159-172` runs its own re-typed copy of the fence. Nothing in that file reads the floor fence's body. The boundary fence gets presence guards (`:185-193`); the floor fence gets none.
     - Mutation one: delete `, restarts: 1` at `guides/pool.md:153`. The fence would then throw `invalid` at construction.
     - Mutation two: move `await pool.start()` after the `acquire()` line. The fence would then park forever.
     - For both, no assertion in `tests/guides.test.ts` reads the fence body, so they pass unchanged. No assertion tells them apart.
   - **(b) The `token.destroy()` contract is false in one case (R3).** It applies when watch has already begun disposing S and the session's ping then fails.
     - `T.destroy()` resolves at once (`Pool.ts:451`), before cleanup settles. It still resolves when that cleanup then fails and S is retained (`:734-736`).
     - `types.ts:62-63` and `guides/pool.md:138-140` say it returns "A promise for this record's cleanup attempt" that rejects with `cleanup` on failure.
   - **(c) One guide sentence is wrong as written (part of R1).** `guides/pool.md:132-133` says "An acquire without an idle record rejects with `create` after pending refills and disposal settle". That is true only while the floor is spent; under retained records the acquire parks forever.
   - Voice items are in A2 to A10.

4. **BROKEN.**
   - Both of the writer's choices hold on their own; see "Attacked and held".
   - The `start()` rejection stops at `start()`, though, and `acquire()` in the same blocked state never settles (R1). Trace:
     ```ts
     const pool = createPool({ create: () => ({}), destroy: () => { throw new Error('survivor') }, min: 1, restarts: 1 })
     await pool.start()
     const token = await pool.acquire()
     await token.destroy().catch(() => {}) // record retained, Pool.ts:734-736
     await pool.acquire()                   // never settles
     ```
   - `#fill` sees a size of 1, equal to `min`, and starts no refill (`Pool.ts:390`). It rejects only the pending `start()` (`:402-408`).
   - The `#pump` floor branch finds the bound not spent and returns at `:362`. Nothing is left to wake the waiter.
   - Browse ships at size 1 (D10), and the ruling's V1 breaking input (Chromium surviving SIGKILL, `ruling.md:116-118`) produces exactly this state. The session's next lease never answers.
   - For probe, a stage teardown that rejects (`Probe.ts:541-543`) parks every later claim on that stage.
   - No test acquires after a record is retained.

## Findings outside the claims

None in this lane.

**Referred (no ruling):**
- **Objective lane:** whether R1 and R5 are correctness defects; the traces above are the evidence.
- **Orchestrator (worker's next visit, W1):** under `^0.0.13` worker is unaffected. When worker moves to 0.0.14:
  - The `Required<PoolOptions<number>>` literals at `C:\Users\mikes\WebstormProjects\worker\tests\src\core\Worker.test.ts:377` and `:399` will need `watch`, `min` and `restarts`. The same goes for `PoolOptionsProbe` at `C:\Users\mikes\WebstormProjects\worker\tests\setup.ts:60`, `:64` and `:101`.
  - `Worker.ts:81-89` would silently drop `min`, `restarts` and `watch`.
- **Q1 (probe mapping):** probe installs a replacement even when teardown rejects (`Probe.ts:541-555`). Under `min`, the pool retains that record instead, so probe keeps its policy only if its `destroy` hook resolves.

## Attacked and held

- **Minimal surface (V6):** the test asserts the token's keys are exactly `['destroy', 'release', 'value']`, so adding a `signal` key fails it. Event tuples are asserted empty.
- **`start()` rejecting with `cleanup` (`Pool.ts:401-409`):** the alternative, pending forever, would hang browse's onset and probe's arm. Removing `|| this.#survivors.size > 0` makes the "retains failed cleanup against max" test time out, so the mutation is caught.
- **Serialized refills (`Pool.ts:384-399`):** the right call for D6's one to three browsers. Serialization keeps the bound exact ("pins the last allowed failure" expects 2 creates). At D10's shipping size of 1 it costs nothing.
- **Watch abort on every disposal path:** there is one abort site (`Pool.ts:710`), reached from validation (`:577`, `:590`), `clear` (`:213`), teardown (`:248`, `:806`) and `#lose` (`:458`).
- **Code `create` for a spent floor with an undefined cause:** set by the brief and documented at `guides/pool.md:132-133`.
- **`restarts` for browse:** strikes accumulate across a session that holds one token, so `restarts` bounds spare deaths. V5's owed attempt covers the session's own browser, as the ruling chose.
- **Lazy path unchanged:** every new branch is gated on `#min` or `#watch`, and worker passes neither. The `release` event wording (`types.ts:40`) matches refills through `#recycle` (`:695`).
- **README pitch and guide tagline:** both are noun phrases and equal each other.

## REQUIRED

- **R1** — `C:\Users\mikes\WebstormProjects\pool\src\core\Pool.ts:349-363`
  - **Wrong:** under `min`, an `acquire()` parks forever when retained records fill the floor.
  - **Right:** in the `min` branch, settle the waiter with the same `cleanup` error `start()` uses (`:406`) when all of these hold: nothing idle, not refilling, no disposal pending, `#resources.size >= #min`, and `#survivors.size > 0`. Add the test.
  - Also state the rule in `guides/pool.md:131-133` and in both acquire `@throws` blocks (`types.ts:127-131`, `Pool.ts:170-174`).
- **R2** — `C:\Users\mikes\WebstormProjects\pool\guides\pool.md:118-125`, `:205-208`, `:101` and `src\core\types.ts:54-56`
  - **Wrong:** the guide is silent on what a holder sees when its leased record is lost.
  - **Right:** state that the pool disposes a lost leased record while its holder still holds the token. After that, the token's `release()` and `destroy()` do nothing, and the holder learns of the loss from its own `watch` or `destroy` hook.
  - Add the loss case to the `release` summary in both files, which must stay equal.
- **R3** — `C:\Users\mikes\WebstormProjects\pool\src\core\Pool.ts:297-305`, `:447-454`; `types.ts:58-65`; `guides/pool.md:102`, `:138-140`
  - **Wrong:** `token.destroy()` resolves before an in-flight disposal finishes, and resolves even when that disposal fails.
  - **Right:** when the record is already being disposed, return that disposal, mapped to `cleanup`, so the TSDoc holds.
- **R4** — `C:\Users\mikes\WebstormProjects\pool\tests\guides.test.ts:159-172`
  - **Wrong:** the floor fence at `guides/pool.md:150-158` is not tied to the guide; R4's mutations pass unchanged.
  - **Right:** add presence guards for each line of the floor fence, following the pattern at `:185-193`.
- **R5** — `C:\Users\mikes\WebstormProjects\pool\src\core\Pool.ts:437-440`; `guides/pool.md:120-123`
  - **Wrong:** a watch that rejects because the pool aborted its signal still reaches `error(…, 'watch')`.
  - **Right:** report a rejection only when `controller.signal` was not aborted, and state that any settlement after the abort is ignored. Add a rejecting-on-abort case beside "ignores watches settling because their disposal signal aborted".

## ADVISORY

- **A1:** refills run one at a time, so filling the floor takes `min` times one create. At sizes 2 and 3 that is unmeasured; at the shipping size of 1 there is no effect. A create that never settles blocks every later refill, including a leased loss's owed attempt. A destroy hook that never settles holds its capacity, and probe's deadline bound (`Probe.ts:538-552`) has to move inside the hook. Tell consumers to bound both hooks at `guides/pool.md:116`.
- **A2:** "restarts a spent refill bound" (`types.ts:110`, `guides/pool.md:90`) uses "restart" for the reset while `restarts` names the bound. The guide also says "resets the bound" (`:131`) and "restart other spent capacity" (`:137`). Use "resets the strikes" throughout.
- **A3:** "retains capacity" (`README.md:14`, `guides/pool.md:216-217`) can be read as the reverse of what it means. Write "keeps a record whose cleanup fails counted against `max`".
- **A4:** "That credit survives a concurrent refill" and "shares its release latch" (`guides/pool.md:136`, `:139`) describe internals. Write "A token ends once: after `release()` or `destroy()`, the other call does nothing."
- **A5:** "restores an active floor" (`types.ts:135`, `guides/pool.md:92`) collides with the `active` count. Write "a started floor".
- **A6:** "restores the floor" (`guides/pool.md:120`) is stated without its condition; a spent floor does not refill. State that a spent floor, and a rejected `start()`, still serve their live records.
- **A7:** the floor fence shows no `watch`. Show a watch that removes its listener on abort, which is the one obligation `:123` states.
- **A8:** the `package.json` description and the `Pool` class summary (`Pool.ts:8-11`, `guides/pool.md:48`) omit the floor.
- **A9:** the phase diagram (`guides/pool.md:177-181`) lacks the refill entry into `available`.
- **A10:** the README says "the required `restarts` bound" (`README.md:12`) without naming what it bounds.
- **A11:** unwrapped or awkwardly broken lines at `guides/pool.md:6`, `:75-76`, `:171`, `:213` and `types.ts:77`.
- **A12:** the new prose uses no negative contractions and bare code tokens such as "`start()` resolves", which `writing.md` asks for in a guide. This matches the existing file; a sweep across it belongs to a separate unit.

VERDICT: FAIL 2, 3, 4; outside the claims: none