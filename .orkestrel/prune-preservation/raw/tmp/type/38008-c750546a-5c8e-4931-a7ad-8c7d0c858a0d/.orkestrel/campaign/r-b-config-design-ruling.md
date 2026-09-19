# Preserve the canonical application wrapper

Take the omission path the blind config designs proposed, following measured cold dev behavior. Keep configs/app/vite.browser.config.ts content-owned and generated from appBrowser(). Remove the historical optimizeDeps inclusion requirement; retain generic factory override coverage.

The Orchestrator ran the actual app entry in fresh browser contexts against distinct cold caches. The plain factory passed in7.39s and the historical forced list passed in7.37s. Each observed arrival, Menu opening, Products navigation, dismissal, reopening and Close menu. Page errors, request failures and failed script responses were empty. Captures show the actual home and Products surfaces.

Bind the observation with the omitted-mount control: the plain client exited1 after the arrival heading remained absent for30000ms. Restore the original main.ts bytes, verify SHA256, and observe the same client exit0. The restored main.ts diff is empty. Retain reports, captures and scripts from tmp/probe/r-b-cold and canonical tmp/probe/run-r-b-cold-entry-control.ps1.

Exclude the earlier relative-cache result from product findings. Its cache resolved beneath app/browser and violated the existing environment boundary. Corrected absolute node_modules cache paths preserve that boundary.

Carry implementation through R-B successor7. Require cold browser/journey suites, scoped conformance and build alongside this dev observation. The generated Vue setup prerequisite remains separate and must close against the packed then published Scaffold artifact.
