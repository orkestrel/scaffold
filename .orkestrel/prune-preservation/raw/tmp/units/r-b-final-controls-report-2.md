# R-B final controls instrument successor

Updated `tmp/probe/run-r-b-final-controls.ps1`.

The content-continuation mutation retains `clickAccessibleWithin` through `void clickAccessibleWithin`, then waits for animations using the setup file's detected newline convention.

The menu opening and closing controls run through the generated normal setup target and the provider-only reduced target. The reduced target invokes:

```powershell
npm.cmd exec -- vitest run --config tmp/probe/r-b-final-host/setup-reduced.config.ts --no-cache --reporter=dot -t 'opens and closes compact navigation and resolves only the modal action'
```

Before mutation, the runner compares the reduced configuration with the expected provider-only composition. A changed config, missing provider configuration, or Vue override stops the runner before it writes a source fixture.

No browser control was executed by this unit. Parent owns the red and restored-green readings.
