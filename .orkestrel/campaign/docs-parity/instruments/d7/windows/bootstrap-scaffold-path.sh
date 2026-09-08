#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

baseline=c87021bdc6367d27463139b293287a586de18240
campaign=claude/orkestrel-npm-audit-deps-14ibta

record_root() {
  prefix=$1
  git -C "$SCAFFOLD" rev-parse HEAD >"$root_log.$prefix.head"
  git -C "$SCAFFOLD" branch --show-current >"$root_log.$prefix.branch"
  git -C "$SCAFFOLD" status --short >"$root_log.$prefix.status"
  sha256sum "$SCAFFOLD/package.json" >"$root_log.$prefix.package.json.sha256"
  sha256sum "$SCAFFOLD/package-lock.json" >"$root_log.$prefix.package-lock.json.sha256"
  git -C "$SCAFFOLD" diff --cached -- package-lock.json | sha256sum >"$root_log.$prefix.lock.diff.sha256"
}

assert_root() {
  if ! cmp -s "$root_log.before.head" "$root_log.after.head" ||
    ! cmp -s "$root_log.before.branch" "$root_log.after.branch" ||
    ! cmp -s "$root_log.before.status" "$root_log.after.status" ||
    ! cmp -s "$root_log.before.package.json.sha256" "$root_log.after.package.json.sha256" ||
    ! cmp -s "$root_log.before.package-lock.json.sha256" "$root_log.after.package-lock.json.sha256" ||
    ! cmp -s "$root_log.before.lock.diff.sha256" "$root_log.after.lock.diff.sha256"; then
    printf '%s\n' 'The root owner readings changed.' >&2
    return 1
  fi
}

complete_root() {
  result=$?
  trap - EXIT
  set +e
  record_root after
  reading_exit=$?
  assert_root
  preservation_exit=$?
  set -e
  if [ "$reading_exit" -ne 0 ] || [ "$preservation_exit" -ne 0 ]; then
    exit 1
  fi
  exit "$result"
}

scr_absolute=$(cd "$SCR" && pwd -P)
target="$scr_absolute/scaffold-path"

if [ "$(dirname "$target")" != "$scr_absolute" ] || [ "$(basename "$target")" != 'scaffold-path' ]; then
  printf '%s\n' 'The worktree target is outside the configured scratch directory.' >&2
  exit 1
fi

if [ -e "$target" ] || [ -L "$target" ]; then
  printf '%s\n' 'The scaffold-path worktree target is occupied.' >&2
  exit 1
fi

log_directory=$(mktemp -d "$scr_absolute/scaffold-path-log.XXXXXX")
root_log="$log_directory/root"
printf '%s\n' "Log directory: $log_directory"
record_root before
trap complete_root EXIT

if [ "$(cat "$root_log.before.head")" != "$baseline" ]; then
  printf '%s\n' 'The root HEAD does not match the required baseline.' >&2
  exit 1
fi

if [ "$(cat "$root_log.before.branch")" != "$campaign" ]; then
  printf '%s\n' 'The root branch does not match the campaign branch.' >&2
  exit 1
fi

git -C "$SCAFFOLD" worktree add --detach "$target" "$baseline" >"$log_directory/worktree.log" 2>&1

set +e
(cd "$target" && npm ci --ignore-scripts) >"$log_directory/npm-ci.log" 2>&1
install_exit=$?
set -e
printf '%s\n' "npm ci exit: $install_exit"

if [ "$install_exit" -ne 0 ]; then
  exit "$install_exit"
fi

(cd "$target" && node --version && npm --version && npm ls oxlint typescript vitest --depth=0) >"$log_directory/toolchain.log" 2>&1
git -C "$target" rev-parse HEAD >"$log_directory/worktree.head"
git -C "$target" status --short >"$log_directory/worktree.status"

if [ "$(cat "$log_directory/worktree.head")" != "$baseline" ] || [ -s "$log_directory/worktree.status" ]; then
  printf '%s\n' 'The fresh worktree does not match the required clean baseline.' >&2
  exit 1
fi

set +e
(cd "$target" && npm run test:config -- tests/config.test.ts -t 'loads every configured policy rule through the real binary') >"$log_directory/test-config.log" 2>&1
test_exit=$?
set -e
printf '%s\n' "test:config exit: $test_exit"

exit "$test_exit"
