# A1 Opus reviewer verdict — verbatim

Lane: subjective (design fit, API, vocabulary, guide voice) plus the correctness the claims demand.
Allowlist Read/Grep/Glob only; behavioural verdicts are source readings against supplied executed
evidence, labelled per the quality law. Terminal: FAIL — 7 broken, 3 unresolved, 0 not-evidenced,
7 findings outside the claims.

1 BROKEN — createRecorders: TName infers from the array element type, so a widened array yields a
map promising keys the runtime map lacks; and Object.fromEntries falls to the any overload (entry
inferred as array, not tuple), so the declared return is asserted, not checked — the same unchecked
bridge the package names invokeUnchecked, left implicit in its own factory. Right: tuple-annotated
entry so the shape is verified, keying limit stated on signature and guide Bounds.
2 CONFIRMED — createSignal under the enumerated interleavings; attacks named (double add, once+plain
both orders, removal by original after wrap, throwing once-callback, re-add after fire, mismatched
capture). Desync outside the enumeration is F-2.
3 BROKEN — revoked object and revoked array are one failure class: every internal method of a
revoked proxy throws, and Array.isArray throws before consulting the target, so the array member's
arrayness is unobservable. Right: live array-target proxy with a throwing get trap — isArray true,
hostile on index read, a class the set lacks.
4 BROKEN (claim over-reach) — invokeUnchecked holds; readProperty's TypeError covers the target,
not the read: the get-trap hostile propagates its own Error, and null-prototype reads throw
nothing. TSDoc is true; the claim and the Limits row over-sell. Right: guide Bounds row — the
target refusal is contained, a hostile getter's throw reaches the caller.
5 UNRESOLVED — flattenHeaders forms and freeze hold; "HeadersSource resolves identically in every
project" is the unverifiable half: it resolves against each project's own Headers declaration,
which is appropriate-per-project, not identical, and the remark asserts identity. Settling probe
named (ragged pair under each project config).
6 CONFIRMED — retryUntil rendering: cyclic → String form, both-throwing → [unrenderable], 200-cut;
BigInt and symbol attacks failed.
7 CONFIRMED — waitForAbort: no window between the aborted read and subscription; once-listener
self-removes; never-aborting signal is the documented deadlock, not a leak.
8 CONFIRMED — the inference lesson as a compile fact via the campaign instruments; that no gate in
the repository proves it is F-5.
9 CONFIRMED — mount survives the wrapper test on composition: deleting it breaks render's returns
and rgba's mount(build('span')) — append returns void. Its TSDoc justifies the wrong thing (the
invariant it neither checks nor enforces); fix the TSDoc to name composition.
10 CONFIRMED — the style trim is end-only normalization; the guide claims only "trimmed". The
TSDoc's restated premise is 24(b).
11 CONFIRMED — readRules order and throw-skip; sheet-level try contains a mid-list throw without
losing later sheets or nested rules; nested style rules expand via CSSGroupingRule. @keyframes gap
is F-4.
12 CONFIRMED — pixels 0 is a lawful measured-contribution contract; would not change the type;
required: a Bounds row beside rgba's, because the name says length and the contract says
contribution.
13 CONFIRMED — rgba finally-cleanup on all paths; setter ignores unparsable rather than throwing;
limit stated where met.
14 CONFIRMED — render overloads cannot misresolve; widened string refused at compile time; no call
site breaks.
15 CONFIRMED — removeDatabase blocked-rejects; later success cannot silently settle a settled
promise.
16 CONFIRMED with gap — order input-then-change, values set first, bubbling; both construct plain
Event, never InputEvent — a component reading inputType or instanceof sees plain Event; add to the
absence list.
17 CONFIRMED — requestUpgrade settles once (withResolvers), socket destroyed before every
settlement, agent:false; strongest attack (no-upgrade-listener server) refuted by the driven suite.
Missing bound is F-6.
18 BROKEN, would hold the bump — claimed is fully derivable (status === undefined), the flat shape
narrows nothing, admits { claimed:true, status:426, protocol:undefined }, and undefined pads
inapplicable members. Right: discriminated union —
  { claimed: true; protocol: string | undefined } | { claimed: false; status: number }
— claimed becomes a lawful named discriminant; the impossible state stops being expressible.
Publishing first makes the correct shape a breaking change fleet-wide.
19 CONFIRMED — supports* probes: no import-time IO, allocation outside try propagates, refusals
false, finally removeTree; the supportsBytes cleanup attack refuted by the controlled residue
proof.
20 BROKEN on its final conjunct only — the repair itself holds and is probe-keyed; three
process.platform gates remain, each citing its mechanism beside the key, which the rule permits;
the smallest fix is to the claim, not the tree.
21 UNRESOLVED — tests/guides.test.ts transcribes exactly two fences; every other fence reaches the
gate only through import resolution; settling action: transcribe the remaining Node-runnable
fences (signal count, resource numbering, HTTP upgrade at minimum).
22 CONFIRMED and the gate is weak — surface/voices/limits rows all present and exhaustive; the
drift the gate would miss: the upgrade fence's literals are untranscribed while the cookie fence
beside it, needing the same loopback in the same project, is transcribed.
23 UNRESOLVED (no diff supplied to a lane with no shell) — one change named from source: readCascade
consolidation widened its answer to classes declared inside media/supports/layer/nested rules,
which the documented change set does not name.
24 BROKEN — three writer rulings attacked: (a) U3 shipping the derivable claimed (see 18);
(b) U2's claim the padded-premise TSDoc was dropped — helpers.ts:1563-1566 restates it as a spec
argument with an uncheckable "on every engine" universal, banned by the writing rules; cut both
clauses; (c) U3's "deletion belongs to the test repo's own adoption unit" — this IS the test repo,
so the named carrier does not exist and the finding is uncarried (F-1).
25 BROKEN — would stop the publish on exactly two things: the UpgradeResult shape (version spent on
upload makes the right shape a breaking change) and F-1 (the package's own suite is a live
counter-example to the guide it ships). Everything else is patch-repairable. The vocabulary is
otherwise genuinely one vocabulary and the entry seams are clean.

F-1 tests/setupServer.ts reimplements all five shipped probes via a local probeCapability; not
even equivalent (CASE_SENSITIVE_FS counts directory entries, supportsCase compares contents); the
equivalence-pin test exists only because there are two mechanisms. Right: delete the five bodies
and probeCapability, set each constant from the shipped probe imported through @src/server.
F-2 createSignal desynchronizes when a listener is scoped with AddEventListenerOptions.signal:
options forwarded but the registration never spliced when the scoping signal fires; count reports a
leak that does not exist. Right: subscribe once to options.signal abort and splice — or refuse the
option explicitly in Bounds. Do not leave the tally silently wrong.
F-3 helpers.test.ts:1262 reduces to P === (S && P), which cannot fail where S is true — every POSIX
host the gate runs on; it sits in the test whose subject is the stored/enforced distinction. Right:
drop or replace with an assertion whose failure is reachable.
F-4 readRules/readCascade promise "nested rules included" but descend only into CSSGroupingRule;
CSSKeyframesRule is not one, so @keyframes children are never collected on any engine; the TSDoc's
own example points at the boundary. Right: say "nested grouping rules included", name the exclusion
with findKeyframes as the door.
F-5 the inference property justifying createRecorders is under no gate — every suite call names
both type arguments after F1; only the sweep-bound campaign instruments prove it. Right: promote
both instruments into tests/src/core as compiled proof and control.
F-6 requestUpgrade is the only wait-family member with no bound: a server that accepts and never
answers parks it forever, surfacing as the runner's own timeout — the exact defect the package's
wait vocabulary exists to prevent. Right: UpgradeOptions extends WaitOptions, rejection names port
and path.
F-7 createDragEvent's null arm is dead: new DragEvent throws before the argument evaluates on any
host lacking DataTransfer, and both ship together; the arm forces | null and the ?. in the example
and documents a host that does not exist. Right: allocate unconditionally, delete the arm and the
sentence.

Deviation: the brief assigned the diff as a command and probes as writes; the lane's allowlist has
no shell and no write. Claim 23 is UNRESOLVED for that reason alone. Supply the diff to a lane that
can read it.

VERDICT: FAIL — 7 broken, 3 unresolved, 0 not-evidenced, 7 findings outside the claims
