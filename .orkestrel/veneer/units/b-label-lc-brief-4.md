# Unit LABEL (`lc`), brief 4 — round 4: one guide sentence

Resume in `/home/user/veneer-lc2`. Round 3's audit (`/home/user/scaffold/.orkestrel/veneer/units/lc-audit-3-verdict.md`)
confirmed every code claim and found one false sentence in `guides/veneer.md` § Color modes (around line 3002): it says a
`color-scheme` set apart from the attribute moves the label wherever a browser reads `light-dark()` natively, where the
published stylesheet is lowered and the `declared` case keeps the label and every fill. Replace that sentence, up to
"instead.", with the subjective lane's text (`lc-audit-3-subjective-verdict.md`, claim 2):

> The published stylesheet keeps the label and every fill under a `color-scheme` value you set apart from the
> attribute, so set the `data-bs-theme` attribute instead. Where your own build lowers that declaration into the same
> two variables, the label and the endpoint the hover and active fills mix toward move with it, and the resting fill
> does not.

Leave the proof sentence after it as it stands. Run the formatter check on `guides/veneer.md` and `npm run test:guides`.
Report in `/home/user/veneer-lc2/tmp/units/lc-report-4.md` and as the final message: the sentence before and after, each
command with its exit and result line, `lc-4.diff` (rounds 2 to 4 against `7852481`), and `lc-4-status.txt`. A few
lines. Perform it directly and spawn nothing; no commit, push, install, `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`.
