# Service ownership regression reproduced

Root ran the planted CLI regression through scaffold-service-action.sh with
the d7n-service-script-regression-red label. The actual action exited1 at the
composite ownership assertion, not during fixture setup.

```text
npm run test:src:bin -- tests/src/bin/CLI.test.ts -t "preserves the existing provisioner through target-reading audit and overwrite"
```

The clean committed disposable target's audit reports scripts/service.sh
foreign. Overwrite reports it removed, and the final provisioner bytes are
absent. Retired docs/custom scripts are also removed as expected. Fresh audit
is clean after that loss, which demonstrates why audit exit alone cannot prove
preservation. The complete assertion difference and command exits are retained
under evidence/d7n-service-script-regression-red.

This changes the deletion consequence from a source-backed prediction to an
observed result in the disposable test target only. Canonical Ollama remains
untouched. The test fixture cleans itself through existing scratch lifecycle.
Root has not run canonical Ollama overwrite or changed production source.

Continue the same unaccepted writing unit's implementation phase. Preserve the
planted regression and run its exact command unchanged after the fix. The
registered prove claim/control and final source gates remain outstanding.
