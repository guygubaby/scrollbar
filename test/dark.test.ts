import { defaultOptions, generateCss } from '@bryce-loskie/scrollbar'
import { expect, test } from 'vitest'

test('dark mode, should generate dark mode css', () => {
  expect(true).toBe(true)

  const css = generateCss({
    ...defaultOptions,
    darkMode: 'class',
    darkOptions: {
      thumbColor: 'red',
    },
  })

  expect(css).toMatchSnapshot()
})
