import { extractFenceImports } from 'file:///C:/Users/mikes/WebstormProjects/scaffold/node_modules/@orkestrel/guide/dist/src/core/index.js'
const fixture = '```ts\nimport {\n  /* exported name */ waitForCondition as local,\n  type WaitOptions,\n} from "@orkestrel/test"\n```\n'
console.log(JSON.stringify(extractFenceImports(fixture), null, 1))
const plain = '```ts\nimport { waitForCondition as local, type WaitOptions } from "@orkestrel/test"\n```\n'
console.log(JSON.stringify(extractFenceImports(plain), null, 1))
