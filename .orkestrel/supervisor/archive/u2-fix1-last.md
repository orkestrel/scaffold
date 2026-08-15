Diffs:
```diff
- import { BrowserApplicationError, isApplicationRoster } from '@app/browser'
+ import { BrowserApplicationError } from '../../../../app/browser/errors.js'
+ import { isApplicationRoster } from '../../../../app/browser/validators.js'

- expect(client.commands).toEqual(['login', 'session'])
+ expect(client.commands).toEqual(['login', 'session', 'roster:watch'])

- expect(client.commands.at(-1)).toBe('logout')
+ expect(client.commands).toEqual(['session', 'roster:watch', 'logout'])
```

`git status --porcelain`:
```text
 M app/browser/controllers/Operator.ts
 M app/browser/factories.ts
 M app/browser/index.ts
 M app/browser/types.ts
 M tests/app/browser/controllers/Operator.test.ts
 M tests/app/browser/integration/setup.ts
?? app/browser/controllers/RosterManager.ts
?? tests/app/browser/controllers/RosterManager.test.ts
?? tests/app/browser/integration/RosterManager.test.ts
```

Finding 1: Integration setup now imports `BrowserApplicationError` and `isApplicationRoster` directly from their owning modules, avoiding the Vue-bearing browser barrel.

Finding 2: Updated the login assertion and the “aborts first and clears all reader state when logout is chosen” assertion to include the roster watcher’s true lifecycle ordering.

Static gates: `format:check`, `lint:check`, and `check` passed.

Deviations: none.