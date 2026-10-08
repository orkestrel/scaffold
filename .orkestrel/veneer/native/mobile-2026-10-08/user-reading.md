# The user's reading, 2026-10-08

Device and browser: Samsung Galaxy S21+ (SM-G996U1), Android 15, Microsoft Edge 153.0.4234.49 (64-bit), Chromium 153.0.8010.53, V8 15.3.12.7; user agent `Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Mobile Safari/537.36 EdgA/153.0.0.0`; command line carries `--enable-longpress-drag-selection` and `--touch-selection-strategy=direction`.

Readings on the page built from `9f56e6a`:

| Context | Copy button | Table column sort | Sortable drag and move buttons |
| --- | --- | --- | --- |
| Opened inside the Claude app | Nothing | Nothing | Nothing |
| Downloaded and opened in Edge (`file://`) | Fails | Works | Works |

The first row is the insecure context the probe reproduces (`probe-insecure-153.json`): `crypto.randomUUID` undefined, the sorter's boot throws, the scope destroys itself. The second row isolates the clipboard: Chromium on Android denies the asynchronous clipboard write to a `file://` origin where desktop Chromium grants it with activation; unit M1's amendment adds the selection-path fallback.
