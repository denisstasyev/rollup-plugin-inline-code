import inlineCode from 'src/index'

describe('Check plugin code structure', () => {
	test('Should has proper name', () => {
		expect(inlineCode().name).toBe('rollup-plugin-inline-code')
	})

	test('Should return proper object', () => {
		expect(typeof inlineCode()).toBe('object')
	})
})
