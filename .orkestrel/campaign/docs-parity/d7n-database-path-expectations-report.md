# Database path expectations

The parser refusal changed from a slash-only regular expression to the exact `The parser refused ${join(project.scratch.path, 'src', 'broken.ts')}` prefix. The compiler diagnostic changed from `join('src', 'broken.ts')` to `posix.join('src', 'broken.ts')`.

`C:/Users/mikes/WebstormProjects/database/node_modules/.bin/vitest.cmd run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupServer.test.ts` exited 0. The direct scoped oxfmt and oxlint commands, plus `git -C C:/Users/mikes/WebstormProjects/database diff --check`, exited 0.
