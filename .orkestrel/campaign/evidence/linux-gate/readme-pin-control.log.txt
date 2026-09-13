== tree: /tmp/tmp.6YvhIXwbWU from 373d29e
== negative control: README floor rewritten to 22.12
The executable needs Node 22.12 or later. Run it without installing anything:
⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯
 FAIL   guides  tests/guides.test.ts > guides > states the Node floor the published manifest requires
AssertionError: expected undefined to be '22.18.0' // Object.is equality
    110|    const readme = requireValue(files['README.md'])
 Test Files  1 failed (1)
      Tests  1 failed | 22 passed (23)
negative exit=1
== positive control: README restored to 22.18.0
The executable needs Node 22.18.0 or later. Run it without installing anything:
 Test Files  1 passed (1)
      Tests  23 passed (23)
positive exit=0
