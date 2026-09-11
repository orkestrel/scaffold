import '@orkestrel/guide/server'
import '@orkestrel/test/server'
import 'vitest/node'

console.log(JSON.stringify({ argv: process.argv, vitest: process.env.VITEST }))
