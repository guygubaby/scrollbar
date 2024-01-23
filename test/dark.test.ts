import { generateBaseCss, generateVars } from '@bryce-loskie/scrollbar'
import { expect, test } from 'vitest'

test('should generate css', () => {
  const vars = generateVars({
    name: 'custom-thumb',
    width: 0,
    height: 4,
    trackRadius: 3,
    trackColor: 'red',
    thumbRadius: 3,
    thumbColor: 'red',
    thumbHoverColor: 'red',
    darkMode: 'class',
    darkOptions: {
      thumbColor: 'red',
    },
  })

  expect(vars).toMatchInlineSnapshot(`
    "
      .scrollbar-custom-thumb,[scrollbar~="custom-thumb"] {
        --scrollbar-width: 0px;
        --scrollbar-height: 4px;
        --scrollbar-track-radius: 3px;
        --scrollbar-thumb-radius: 3px;
        --scrollbar-track-color: red;
        --scrollbar-thumb-color: red;
        --scrollbar-thumb-hover-color: red;
        scrollbar-color: var(--scrollbar-thumb-color) var(--scrollbar-track-color);
        scrollbar-width: thin
      }
      "
  `)

  const css = generateBaseCss()

  expect(css).toMatchInlineSnapshot(`
    "
      ::-webkit-scrollbar {
        width: var(--scrollbar-width);
        height: var(--scrollbar-height);
      }

      ::-webkit-scrollbar-track {
        background: var(--scrollbar-track-color);
        border-radius: var(--scrollbar-track-radius);
      }

      ::-webkit-scrollbar-thumb {
        background: var(--scrollbar-thumb-color);
        border-radius: var(--scrollbar-thumb-radius);
      }

      ::-webkit-scrollbar-thumb:hover {
        background: var(--scrollbar-thumb-hover-color);
      }
    "
  `)
})
