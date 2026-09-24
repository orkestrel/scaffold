import * as sass from 'sass'
const cases = {
	interp: `$b: 1200px; .c { font-size: calc(var(--s) - max(var(--s) * 0.9 - 1.125rem, 0px) * (1 - 100vw / #{$b})); }`,
	interpAll: `$b: 1200px; .c { font-size: calc(var(--s) - max(var(--s) * 0.9 - 1.125rem, 0px) * (1 - #{100vw / $b})); }`,
	unquote: `@use 'sass:string'; $b: 1200px; .c { font-size: calc(var(--s) - max(var(--s) * 0.9 - 1.125rem, 0px) * (1 - #{string.unquote('100vw / #{$b}')})); }`,
	fnInterp: `@function fluid($size, $b: 1200px) { @return calc(#{$size} - max(#{$size} * 0.9 - 1.125rem, 0px) * (1 - 100vw / #{$b})); } .c { font-size: fluid(var(--vn-size-8)); } .d { font-size: fluid(2.25rem); }`,
	fnPlain: `@function fluid($size, $b: 1200px) { @return calc($size - max($size * 0.9 - 1.125rem, 0px) * (1 - 100vw / #{$b})); } .c { font-size: fluid(var(--vn-size-8)); } .d { font-size: fluid(2.25rem); } .e { font-size: fluid(1rem); }`,
}
for (const [name, source] of Object.entries(cases)) {
	try { console.log(name, '=>', sass.compileString(source).css.replace(/\s+/g, ' ')) } catch (e) { console.log(name, 'ERR', String(e).split('\n')[0]) }
}
