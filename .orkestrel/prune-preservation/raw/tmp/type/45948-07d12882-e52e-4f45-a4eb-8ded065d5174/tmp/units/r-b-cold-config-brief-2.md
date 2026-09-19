# Place cold caches outside the application graph

Act as builder on Terra. Keep the original cold-config ownership. The parent ran each dev client and observed the same500 response: app/core's @orkestrel/contract import resolved into the temporary relative Vite cache below app/browser, which environmentPathError correctly treats as a browser path. appBrowser sets root to app/browser, so the earlier relative cacheDir did not name the intended workspace temporary directory.

Change each temporary config to import resolve from node:path and set its distinct cacheDir to an absolute path under the workspace's node_modules, using resolve('node_modules/.vite-r-b-plain') or resolve('node_modules/.vite-r-b-historical'). This matches the dependency-cache boundary while keeping each run cold and isolated. Change no app source or boundary rule. Keep each host/port, historical list, and all other factory behavior unchanged.

Author only; do not run servers or browsers. Parent stops the earlier recorded servers, retains the failing reports and restarts these configs with --force. Run scoped formatting and return.
