#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

package=${1:-}
stage=${2:-}
branch=claude/orkestrel-npm-audit-deps-14ibta
case "$stage" in
  fix)
    case "$package" in
      agent | ollama | workflow | program | terminal | mcp) ;;
      *) printf 'unsupported fix package: %s\n' "$package" >&2; exit 1 ;;
    esac
    unit="d7n-$package-converge-fix"
    title="Converge $package documentation after its audit"
    ;;
  tests)
    test "$package" = probe || { printf 'tests require probe\n' >&2; exit 1; }
    unit=d7n-probe-tests
    title="Replace the suite's candidate drafts with lint-clean functions"
    ;;
  canon)
    test "$package" = database || { printf 'canon requires database\n' >&2; exit 1; }
    unit=d7n-database-canon
    title="Move database surface derivation into its package case"
    ;;
  *)
    printf 'unsupported stage: %s\n' "$stage" >&2
    exit 1
    ;;
esac

target="$FLEET/$package"
report="$SCAFFOLD/tmp/units/$unit-report.md"
log="$SCR/land/$unit.log.txt"
diff="$SCR/land/$unit.diff.txt"
status="$SCR/land/$unit.status.txt"
campaign="$SCAFFOLD/.orkestrel/campaign/docs-parity"

retain() {
  local source=$1
  local destination=$2
  if [[ -e "$destination" ]]; then
    cmp -s "$source" "$destination" || {
      printf 'retained file differs: %s\n' "$destination" >&2
      exit 1
    }
    return
  fi
  cp "$source" "$destination"
}

test -f "$report"
test "$(git -C "$target" branch --show-current)" = "$branch"
git -C "$target" diff --cached --quiet
test -z "$(git -C "$target" ls-files --others --exclude-standard)"
mapfile -t paths < <(git -C "$target" diff --name-only)
test "${#paths[@]}" -gt 0

for path in "${paths[@]}"; do
  case "$stage:$path" in
    tests:tests/src/server/Probe.test.ts | canon:tests/guides.test.ts | fix:guides/"$package".md | fix:README.md | fix:tests/guides.test.ts | fix:src/*.ts) ;;
    *)
      printf 'unexpected changed path: %s\n' "$path" >&2
      exit 1
      ;;
  esac
done

mkdir -p "$SCR/land"
test ! -e "$log"
test ! -e "$diff"
test ! -e "$status"
{
  git -C "$target" diff > "$diff"
  git -C "$target" status --short > "$status"
  for path in "${paths[@]}"; do
    git -C "$target" add -- "$path"
  done
  git -C "$target" -c user.name=Claude -c user.email=noreply@anthropic.com commit --only -m "$title" -m 'Co-Authored-By: Claude <noreply@anthropic.com>' -m 'Claude-Session: codex:01a0810d-21bf-7f60-8534-488348e05743' -- "${paths[@]}"
  git -C "$target" log -1 --oneline
  git -C "$target" status --short
} > "$log" 2>&1

retain "$report" "$campaign/$unit-report.md"
retain "$diff" "$campaign/$unit.diff.txt"
retain "$status" "$campaign/$unit.status.txt"
retain "$log" "$campaign/$unit.log.txt"
