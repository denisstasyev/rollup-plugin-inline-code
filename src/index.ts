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

				// target - name
				paths.set(name, name)

				return name
			}
			return null
		},
		transform: (codeContent: string, id: string | null) => {
			if (!paths.has(id)) {
				return null
			}

			const code = `export default ${JSON.stringify(codeContent.trim())};`
			const map = { mappings: '' }

			return {
				code,
				map,
			}
		},
	}
}
