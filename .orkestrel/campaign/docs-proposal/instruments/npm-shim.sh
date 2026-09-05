#!/usr/bin/env bash
# PATH shim for a read-only bench lane: logs every npm invocation and refuses install-class subcommands.
echo "$(date -u +%H:%M:%S) npm $* cwd=$PWD" >> /home/user/scaffold/tmp/cursor/npm-shim.log
case "${1:-}" in install|i|ci|add|update|up|uninstall|un|remove|rm|link|ln|publish|dedupe|prune|rebuild) echo "REFUSED by bench shim: npm $*" >&2; exit 97;; esac
exec /usr/bin/env -u npm_config_prefix /usr/local/bin/npm "$@"
