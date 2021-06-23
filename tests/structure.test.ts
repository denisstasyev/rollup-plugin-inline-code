import inlineCode from 'src/index'

describe('Check plugin code structure', () => {
	test('Should has proper name', () => {
		expect(inlineCode().name).toBe('rollup-plugin-inline-code')
	})

	test('Should return object', () => {
		expect(typeof inlineCode()).toBe('object')
	})

	test('Should return object with resolveId-hook', () => {
		expect(typeof inlineCode().resolveId).toBe('function')
	})

	test('Should return object with transform-hook', () => {
		expect(typeof inlineCode().transform).toBe('function')
	})
})
