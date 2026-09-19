# Use the generated host's Chromium resolver

Act as builder on Terra for the existing temporary client. Keep its ownership and all limits. The client cannot launch Playwright's default missing headless-shell revision. The real Vitest host already resolves an installed browser through configs/browsers.ts; reuse that exact resolver rather than installing or guessing a browser path.

Import resolveBrowser and resolvePinnedBrowser from ../../../configs/browsers.ts in client.mjs. Node24 can load this erasable TypeScript helper. Obtain provider options through resolveBrowser(resolvePinnedBrowser(), process.platform, process.env), without printing environment values. If connectOptions is present, use chromium.connect with those options; otherwise chromium.launch with its launchOptions and headless:true. Inspect the installed Playwright signature and returned resolver contract before writing the branch. Keep a fresh browser context and existing finally cleanup.

Do not run the browser, install, print credentials, mutate source, or weaken UI/network assertions. Run node --check and scoped formatting only, then return the updated path. Preserve the failed-launch report as a separate named record before root reruns; parent owns that copy.
