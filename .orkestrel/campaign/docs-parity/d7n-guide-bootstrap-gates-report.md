# d7n guide bootstrap gates report

## Status

Authored `tmp/pass/validate-guide-bootstrap.sh`. The gate chain was not run.

## Exact difference from validate-guide-heading.sh

- The log-directory prefix is `d7n-guide-bootstrap-validate`.
- `allowed()` includes `tests/setupPolicy.ts` and `tests/config.test.ts`.
- The out-of-scope diagnostic names the Guide bootstrap candidate.
- The argument-refusal message names `validate-guide-bootstrap.sh`.

The branch guard, checkout root, gate commands and order, state capture, exit propagation,
and success-marker behavior match the predecessor.

## Syntax validation

`bash -n tmp/pass/validate-guide-bootstrap.sh` exited `0`.

`git diff --check -- tmp/pass/validate-guide-bootstrap.sh tmp/units/d7n-guide-bootstrap-gates-report.md`
exited `0`.

## Unrun work

The full Guide gate chain remains unrun for root's tracked execution.
