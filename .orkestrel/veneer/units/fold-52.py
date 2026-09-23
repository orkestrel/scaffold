# fold-52.py: the intersession reconciliation protocol (the user's instruction, 2026-09-23) under
# ROADMAP.md § Protocol › ### The engine session. Anchor-refusing: every edit requires exactly one match.
import sys
path = '/home/user/veneer/ROADMAP.md'
s = open(path).read()
def edit(old, new):
    global s
    n = s.count(old)
    if n != 1:
        sys.exit(f'integration refused: anchor count {n} for {old[:60]!r}')
    s = s.replace(old, new)
edit(
"""  `/home/user/scaffold/.orkestrel/veneer/engine/` and nowhere else in that folder.

## Carriers""",
"""  `/home/user/scaffold/.orkestrel/veneer/engine/` and nowhere else in that folder.
- Each session keeps a reconciliation marker in its plan file, the baseline session in
  `/home/user/scaffold/.orkestrel/veneer/plan.md` § Intersession state and the engine session in
  `/home/user/scaffold/.orkestrel/veneer/engine/plan.md` § Intersession state. The marker names
  the `origin/main` commit of Veneer and of scaffold the session last reconciled, with the date.
- At session start, before writing a brief, before every landing, and at every re-baseline, each
  session fetches `origin/main` in Veneer and in scaffold, reads `git log --oneline
  <marker>..origin/main` in both, reads the other session's plan file (its marker, its units in
  flight, its pending shared changes) and its decisions file, and moves its marker. A landing since
  the marker that touches a file a unit in flight owns or shares is sent to that unit as a
  mid-campaign decision; a brief not yet dispatched is rewritten against the merge result and names
  a base commit that `origin/main` carries.
- A session records a change it intends to land in a report-only shared file, in a guide section
  the other session owns, or in a roadmap row the other session owns under § Pending shared changes
  in its plan file before the landing that applies it, with the exact hunk or sentence; the other
  session carries that change into its in-flight briefs at its next boundary. Two pending changes
  to one site go to the user.
- The baseline session numbers its decisions `D<n>` in `units/decisions-round-2.md`; the engine
  session numbers its decisions `E<n>` in `engine/decisions.md`. A decision that moves the other
  session's scope or exit criterion is a question for the user, never a unilateral ruling.
- The baseline session adds the `plugin` row of each landed family with `Owner: J-ENGINE.`; the
  engine session fills that row's Status, Proof, and Obligation cells when its unit for that plugin
  lands, and reconciles a `plugin` row the baseline adds while that unit is in flight at its next
  boundary.
- Each report to the user names the session's marker, so the intersession state is visible in
  both sessions' reports.

## Carriers""")
open(path, 'w').write(s)
print('fold-52 applied')
