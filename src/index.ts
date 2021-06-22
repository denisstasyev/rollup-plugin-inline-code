import path from 'path'

type Options = {
	prefix?: string
}

export default (options: Options = {}) => {
	const { prefix = 'inline!' } = options

	const paths = new Map()

	return {
		name: 'rollup-plugin-inline-code',
		resolveId: (sourcePath: string) => {
			if (sourcePath.includes(prefix)) {
				const sourceArray = sourcePath.split(prefix)
				const name = sourceArray[sourceArray.length - 1]
				const target = path.resolve(__dirname, name)

				paths.set(target, name)

				return target
			}
			return null
		},
		transform: (codeContent: string, id: string) => {
			if (!paths.has(id)) {
				return null
			}

			const code = `export default ${JSON.stringify(codeContent)};`
			const map = { mappings: '' }

			return {
				code,
				map,
			}
		},
	}
}
