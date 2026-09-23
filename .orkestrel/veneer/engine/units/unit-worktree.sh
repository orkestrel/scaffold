#!/usr/bin/env bash
# The engine session's unit worktree instrument (E4). One writer per checkout: a unit writes in a
# temporary worktree on a `unit/<unit>` branch cut from the committed `main` tip, and its landing
# cherry-picks the unit's commits onto `main` and removes the worktree and the branch. The session
# itself works on `main` in the user's checkout. Usage:
#   unit-worktree.sh new <unit>                      create ../veneer-<unit> on unit/<unit> from main, install
#   unit-worktree.sh commit <unit> <message-file> <pathspec>...   commit the named paths in the worktree
#   unit-worktree.sh land <unit>                     fast-forward main to origin, cherry-pick unit/<unit>, remove
#   unit-worktree.sh drop <unit>                     remove the worktree and branch without landing
set -u
VENEER=/c/Users/mikes/WebstormProjects/veneer
ACTION="${1:-}"
UNIT="${2:-}"
if [ -z "$ACTION" ] || [ -z "$UNIT" ]; then
	echo "usage: unit-worktree.sh new|commit|land|drop <unit> [args]" >&2
	exit 64
fi
TREE="/c/Users/mikes/WebstormProjects/veneer-$UNIT"
BRANCH="unit/$UNIT"
case "$ACTION" in
	new)
		git -C "$VENEER" fetch origin main || exit 1
		git -C "$VENEER" worktree add -b "$BRANCH" "$TREE" main || exit 1
		cd "$TREE" || exit 1
		npm ci --ignore-scripts || exit 1
		sha256sum package-lock.json | cut -c1-64 > node_modules/.orkestrel-lock.sha256
		git -C "$TREE" log --oneline -1
		echo "worktree=$TREE branch=$BRANCH"
		;;
	commit)
		MESSAGE="${3:-}"
		shift 3 || { echo "commit needs a message file and pathspecs" >&2; exit 64; }
		[ -f "$MESSAGE" ] || { echo "missing message file $MESSAGE" >&2; exit 66; }
		git -C "$TREE" add -- "$@" || exit 1
		git -C "$TREE" status --short
		git -C "$TREE" commit -F "$MESSAGE" -- "$@" || exit 1
		git -C "$TREE" log --oneline -1
		;;
	land)
		if [ -n "$(git -C "$VENEER" status --porcelain)" ]; then
			echo "main checkout is not clean; land refused" >&2
			git -C "$VENEER" status --short >&2
			exit 65
		fi
		git -C "$VENEER" fetch origin main || exit 1
		git -C "$VENEER" merge --ff-only origin/main || exit 1
		BASE=$(git -C "$VENEER" merge-base main "$BRANCH")
		COMMITS=$(git -C "$VENEER" rev-list --reverse "$BASE".."$BRANCH")
		if [ -z "$COMMITS" ]; then
			echo "no commits on $BRANCH beyond $BASE" >&2
			exit 67
		fi
		for commit in $COMMITS; do
			git -C "$VENEER" cherry-pick "$commit" || { echo "cherry-pick of $commit stopped; resolve in $VENEER then remove the worktree by hand" >&2; exit 68; }
		done
		git -C "$VENEER" worktree remove --force "$TREE" || exit 1
		git -C "$VENEER" branch -D "$BRANCH" || exit 1
		git -C "$VENEER" log --oneline -3
		git -C "$VENEER" status --short --branch
		;;
	drop)
		git -C "$VENEER" worktree remove --force "$TREE" || exit 1
		git -C "$VENEER" branch -D "$BRANCH" || exit 1
		git -C "$VENEER" worktree list
		;;
	*)
		echo "unknown action $ACTION" >&2
		exit 64
		;;
esac
