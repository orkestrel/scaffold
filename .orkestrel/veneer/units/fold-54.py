# fold-54.py: the UTIL-SPACER landing (746d3e9): fill the CL8b carrier row's landing hash, record the landing in the
# B-UTILITIES row, and carry the round-2 Showcase clause (the gap steps' home) into the Showcase paragraph's own
# "X sits in Y" form, the site the landing checker named (claim 3). Anchor-refusing.
import sys
def edit(path, old, new):
    s=open(path).read(); n=s.count(old)
    if n!=1: sys.exit(f'integration refused: anchor count {n} in {path} for {old[:50]!r}')
    open(path,'w').write(s.replace(old,new))
R='/home/user/veneer/ROADMAP.md'; G='/home/user/veneer/guides/veneer.md'
edit(R, "closed: UTIL-SPACER landed (`<landing hash>`) with the `gap` and `column-gap` keys", "closed: UTIL-SPACER landed (`746d3e9`) with the `gap` and `column-gap` keys")
edit(R, "| B-UTILITIES              | `opus` on Opus 5.5, one unit per mechanism ", "| B-UTILITIES              | `opus` on Opus 5.5, one unit per mechanism; UTIL-SPACER landed as `746d3e9` (the `utility` and `utility-variable` mixins with `$state`, the gap keys) ")
edit(G, "the vertical rule sits in Layout, and the list and quotation classes sit in Type.", "the vertical rule and the gap steps sit in Layout beside the gutters, and the list and quotation classes sit in Type.")
print('fold-54 applied')
# --- appended 15:22 UTC: the Codex bench came live (the user reset the limits at 15:18 UTC; the probe round-tripped) ---
edit(R, "| Opus 5.5 runs every lane until the bench round-trips again (the substitution table in `.agents/orchestration.md` § Engine assignment): the objective lane as `reviewer` told it holds that lane, in a separate clean-context subagent, blind to the subjective lane; each verdict records the substitution. The user decides whether to add credits; no other login or credential is substituted. |",
        "| The user reset the limits on 2026-09-23 and the bench round-tripped at 15:18 UTC (thread `01a0ced9-1af4-7260-b880-adf089965967`), so the objective lane is `analyst` on Astra again from that probe, re-probed at each dispatch. Between 13:34 and 15:18 UTC Opus 5.5 ran every lane (the substitution table in `.agents/orchestration.md` § Engine assignment): the objective lane as `reviewer` told it holds that lane, in a separate clean-context subagent, blind to the subjective lane; each verdict of that window records the substitution. No other login or credential is substituted. |")
P='/home/user/veneer/prompt.txt'
edit(P, "(the Codex bench is dark on quota until 2026-09-26 17:53 UTC; record the Opus substitution per round)", "(the bench's state is `ROADMAP.md` § Standing conditions, live again from 2026-09-23 15:18 UTC; probe it at each dispatch and record any Opus substitution per round)")
import shutil; shutil.copy(P, '/home/user/scaffold/.orkestrel/veneer/j-engine-session-prompt.txt')
print('fold-54: bench-live amendments staged')
