import fs from 'fs'

import inlineCode from 'src/index'

const INLINE_JAVASCRIPT_FILE_PATH = 'tests/mocks/sample.js'
const INLINE_TYPESCRIPT_FILE_PATH = 'tests/mocks/sample.ts'
const INLINE_SVG_FILE_PATH = 'tests/mocks/sample.svg'

const defaultPrefix = 'inline!'
const customPrefix = '_customPrefix_'

const getFileIds = (prefix: string = defaultPrefix) => [
	{
		type: 'JavaScript',
		resolveId: `${prefix}tests/mocks/sample.js`,
		correctId: INLINE_JAVASCRIPT_FILE_PATH,
	},
	{
		type: 'TypeScript',
		resolveId: `${prefix}tests/mocks/sample.ts`,
		correctId: INLINE_TYPESCRIPT_FILE_PATH,
	},
	{
		type: 'SVG',
		resolveId: `${prefix}tests/mocks/sample.svg`,
		correctId: INLINE_SVG_FILE_PATH,
	},
]

describe('Check resolveId hook work', () => {
	runTestWithDifferentPrefixes(prefix =>
		getFileIds(prefix.value).forEach(({ type, resolveId, correctId }) => {
			test(`Should find a ${type} file despite the ${prefix.name} prefix`, () => {
				const plugin = inlineCode({ prefix: prefix.value })
				const target = plugin.resolveId(resolveId) as string

				expect(target.endsWith(correctId)).toBe(true)
			})
		}),
	)

	test(`Should not find a file without a prefix`, () => {
		const plugin = inlineCode()
		const target = plugin.resolveId(INLINE_JAVASCRIPT_FILE_PATH)

		expect(target).toEqual(null)
	})
})

describe('Check plugin full work', () => {
	runTestWithDifferentPrefixes(prefix =>
		getFileIds(prefix.value).forEach(({ type, resolveId, correctId }) => {
			test(`Should inline ${type} file despite the ${prefix.name} prefix`, () => {
				const plugin = inlineCode({ prefix: prefix.value })
				const target = plugin.resolveId(resolveId) as string

				expect(target.endsWith(correctId)).toBe(true)

				const codeContent = fs.readFileSync(correctId).toString().trim()
				const generatedCodeWithInline = plugin.transform(codeContent, target)?.code

				expect(generatedCodeWithInline).toEqual(
					`export default "${codeContent
						.replace(/\\/g, '\\\\')
						.replace(/\n/g, '\\n')
						.replace(/\"/g, '\\"')
						.replace(/\t/g, '\\t')}";`,
				)
			})
		}),
	)

	test(`Should not inline a file without a prefix`, () => {
		const plugin = inlineCode()
		const generatedCodeWithInline = plugin.transform('', null)

		expect(generatedCodeWithInline).toEqual(null)
	})
})

function runTestWithDifferentPrefixes(test: (prefix: { name: string; value: string }) => void) {
	;[
		{ name: 'default', value: defaultPrefix },
		{ name: 'custom', value: customPrefix },
	].forEach(test)
}
