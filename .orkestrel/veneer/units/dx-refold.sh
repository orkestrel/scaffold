#!/bin/bash
# dx-refold.sh: rebuild the disclosure fold commit with the formatter's ROADMAP row padding (the merge-result fast gates ran oxfmt first),
# re-merge origin/main on it, and prove the final tree equals the gated working tree. Log: dx-refold.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/dx-refold.log.txt; : > $LOG
cd /home/user/veneer || exit 1
grep -q 'dx fast gates done' $S/dx-fast-gates-2.log.txt || { echo "gates-2 not done" >> $LOG; exit 2; }
grep -E 'exit=[1-9]' $S/dx-fast-gates-2.log.txt >> $LOG && { echo "gates-2 red" >> $LOG; exit 3; }
GATED=$(git stash create 2>/dev/null); echo "gated working tree commit: ${GATED:-none}" >> $LOG
BLOB=$(git hash-object -w ROADMAP.md); echo "formatted ROADMAP blob $BLOB" >> $LOG
export GIT_INDEX_FILE=$S/idx-fold; rm -f "$GIT_INDEX_FILE"; git read-tree c7530ef; git update-index --cacheinfo 100644,$BLOB,ROADMAP.md; TREE=$(git write-tree); unset GIT_INDEX_FILE
git log --format=%B -1 c7530ef > $S/fold-55-message.txt
FOLD=$(git commit-tree -S $TREE -p f3624fc -F $S/fold-55-message.txt); echo "fold rebuilt: $(git rev-parse --short $FOLD) tree $TREE gpgsig=$(git cat-file commit $FOLD | grep -c '^gpgsig')" >> $LOG
git reset -q --hard $FOLD; git fetch -q origin main; echo "origin/main $(git rev-parse --short origin/main)" >> $LOG
git merge --no-ff -q origin/main -m "$(printf 'Merge origin/main (the engine session removed the kickoff prompt) into the session branch before the disclosure push\n\nCo-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_016FizZRKTTm49XXhLB8eGTK')" >> $LOG 2>&1
echo "merge: $(git rev-parse --short HEAD) gpgsig=$(git cat-file commit HEAD | grep -c '^gpgsig')" >> $LOG
echo "status: [$(git status --porcelain)]" >> $LOG
echo "merge vs fold: $(git diff --stat HEAD^1 HEAD | tail -1)" >> $LOG
echo "final vs gated merge d46162a: $(git diff --stat d46162a HEAD | tail -1)" >> $LOG
[ -n "$GATED" ] && echo "final tree vs gated working tree: [$(git diff --stat $GATED HEAD | tail -1)]" >> $LOG
git log --format='%h %s' e4e6a40..HEAD >> $LOG
