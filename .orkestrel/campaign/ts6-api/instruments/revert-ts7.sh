#!/usr/bin/env bash
# Removes the TypeScript 7 move from scaffold (the branch) and probe (its branch and main) by reverting
# the product commits with --no-commit and landing one commit per checkout with the session trailers,
# then re-syncing node_modules to the restored lockfiles with npm 11. Records commits stay for the prune.
set -u
LOG=/home/user/scaffold/.orkestrel/campaign/ts6-api/revert-ts7.log.txt
AUTHOR=(-c user.name=Claude -c user.email=noreply@anthropic.com)
{
echo "== scaffold, $(date -u +%H:%M:%S)"
cd /home/user/scaffold || exit 2
git status --short | grep -v '^?? .orkestrel' && echo "REFUSE: dirty product tree" && exit 3
git log --oneline -1
git revert --no-commit 70f42aa7 6c46f547 47200d6c; echo "revert exit=$?"
git status --short | head -40
git "${AUTHOR[@]}" commit -q -F - <<'MSG'
Remove the TypeScript 7 move from scaffold

Reverts the bridge adoption (47200d6c), the move to 7.0.2 with the rollup override and the browser fork (6c46f547), and the audit fix rounds over it (70f42aa7). The owner's ruling is that the fleet stays on TypeScript 6.0.3 with no `@typescript/typescript6` bridge, and that the in-process compiler API is removed by a later plan that uses only surfaces both majors ship. `package.json`, the lockfile, the vendored guide, the templates, the seeds, the fixtures, `PROPOSAL.md`, `ROADMAP.md`, and `host.json` return to their state before the campaign; the campaign records under `.orkestrel/campaign/ts7/` and `ts7-break/` are pruned in a following commit after their promotion.

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01V28La253kW5DDvGA5wGKtB
MSG
echo "commit exit=$?"; git log --oneline -2
grep -n '"typescript"\|typescript6' package.json | head -3
echo "== scaffold npm install (npm 11), $(date -u +%H:%M:%S)"
PATH=/opt/npm11/bin:$PATH npm install --no-audit --no-fund 2>&1 | tail -3; echo "install exit=${PIPESTATUS[0]}"
node -e "console.log('typescript', require('./node_modules/typescript/package.json').version); try { require('./node_modules/@typescript/typescript6/package.json'); console.log('bridge still installed') } catch { console.log('bridge gone') }"
git status --short | grep -v '^?? .orkestrel' | head -5
echo "== probe, $(date -u +%H:%M:%S)"
cd /home/user/fleet/probe || exit 2
git status --short && git log --oneline -1
git revert --no-commit 9331ef4; echo "revert exit=$?"
git status --short | head -20
git "${AUTHOR[@]}" commit -q -F - <<'MSG'
Remove the bridge loader and the widened peer from probe

Reverts 9331ef4. The fleet stays on TypeScript 6.0.3 with no `@typescript/typescript6` bridge; the type stage's in-process compiler API is replaced by a later change that drives the `tsc` command, which both majors ship.

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01V28La253kW5DDvGA5wGKtB
MSG
echo "commit exit=$?"; git log --oneline -2
echo "== probe npm install (npm 11), $(date -u +%H:%M:%S)"
PATH=/opt/npm11/bin:$PATH npm install --no-audit --no-fund 2>&1 | tail -3; echo "install exit=${PIPESTATUS[0]}"
node -e "console.log('typescript', require('./node_modules/typescript/package.json').version); try { require('./node_modules/@typescript/typescript6/package.json'); console.log('bridge still installed') } catch { console.log('bridge gone') }"
git status --short | head -5
echo "== done, $(date -u +%H:%M:%S)"
} > "$LOG" 2>&1
