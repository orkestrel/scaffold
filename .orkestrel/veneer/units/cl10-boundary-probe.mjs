// The exact admission regex from collectGridVocabulary in veneer tests/setupStyles.ts.
const re = /^\.(?:(?:row|col|offset|g|gx|gy|table|icon-link|ratio|vr)(?:-|[^\w-]|$)|caption-top(?:[^\w-]|$))/u
const BS = String.fromCharCode(92)
const cases = [
  ['shipped name', '.ratio'],
  ['shipped name', '.ratio-21x9'],
  ['shipped pseudo', '.ratio::before'],
  ['shipped name', '.vr'],
  ['shipped name', '.icon-link'],
  ['shipped complex', '.icon-link-hover:hover > .bi'],
  ['ASCII longer', '.ratios'],
  ['ASCII longer', '.icon-linkage'],
  ['ASCII longer', '.vrs'],
  ['non-ASCII longer', '.ratio\u00e9'],
  ['non-ASCII longer', '.icon-link\u00e9'],
  ['non-ASCII longer', '.vr\u00e9'],
  ['non-ASCII longer', '.table\u00e9'],
  ['non-ASCII longer', '.col\u00e9'],
  ['non-ASCII longer', '.ratio\u4e2d'],
  ['escaped longer', '.ratio' + BS + '78'],
  ['escaped longer', '.vr' + BS + '5f x'],
  ['underscore longer', '.ratio_x'],
  ['underscore longer', '.vr_x'],
]
for (const [kind, c] of cases) {
  const admitted = re.test(c)
  console.log((admitted ? 'ADMIT  ' : 'refuse ') + kind.padEnd(18) + JSON.stringify(c))
}
