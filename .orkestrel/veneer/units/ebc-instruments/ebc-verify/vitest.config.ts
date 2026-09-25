// Runs the patched copies of the unowned enumerating proofs against the rebuilt cascade, from a
// scratch directory, so the returned patch is read green without writing the files it patches.
import base from '../../../configs/src/vite.styles.config.ts'

export default { ...base, test: { ...base.test, include: ['tmp/units/ebc-verify/src/**/*.test.ts'] } }
