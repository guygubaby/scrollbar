import { defaultDarkOptions, defaultOptions } from './constants'
import type { ScrollbarOptions } from './types'

const resolveOptions = (options?: ScrollbarOptions) => ({
  ...defaultOptions,
  ...(options || {}),
})

const styleTag = document.createElement('style')
const head = document.head || document.getElementsByTagName('head')[0]
const externalOptionList: Required<ScrollbarOptions>[] = []

const mountStyle = (css: string) => {
  styleTag.textContent = css
  if (!head.contains(styleTag))
    head.appendChild(styleTag)
}

const resolveVar = (name: string) => {
  return `--scrollbar-${name}`
}

const minify = (css: string) => {
  return css.replace(/\s+/g, ' ').replace(/\s*([{}])\s*/g, '$1')
}

const generateDarkCss = (options: Required<ScrollbarOptions>) => {
  const {
    name,
    darkMode,
    darkOptions,
  } = options

  if (!darkMode) return ''

  const {
    trackColor = defaultDarkOptions.trackColor,
    thumbColor = defaultDarkOptions.thumbColor,
    thumbHoverColor = defaultDarkOptions.thumbHoverColor,
  } = darkOptions

  const variables = `
    ${resolveVar('track-color')}: ${trackColor};
    ${resolveVar('thumb-color')}: ${thumbColor};
    ${resolveVar('thumb-hover-color')}: ${thumbHoverColor};
    `

  if (darkMode === 'class') {
    const selector = name ? `.dark [scrollbar~="${name}"]` : 'html.dark'

    return `
    ${selector} {
      ${variables.trim()}
    }
    `
  }
  else if (darkMode === 'media') {
    return `
    @media (prefers-color-scheme: dark) {
      :root {
        ${variables.trim()}
      }
    }
    `
  }
  else {
    return ''
  }
}

const generateCss = (options: Required<ScrollbarOptions>) => {
  const {
    name,
    width,
    height,
    trackRadius,
    thumbRadius,
    trackColor,
    thumbColor,
    thumbHoverColor,
  } = options

  const selector = name ? `[scrollbar~="${name}"]` : ':root'

  const variables = `
    ${resolveVar('width')}: ${width};
    ${resolveVar('height')}: ${height};
    ${resolveVar('track-radius')}: ${trackRadius};
    ${resolveVar('thumb-radius')}: ${thumbRadius};
    ${resolveVar('track-color')}: ${trackColor};
    ${resolveVar('thumb-color')}: ${thumbColor};
    ${resolveVar('thumb-hover-color')}: ${thumbHoverColor};
    scrollbar-color: var(${resolveVar('thumb-color')}) var(${resolveVar('track-color')});
    scrollbar-width: thin;
    `

  return `
  ${selector} {
    ${variables.trim()}
  }
  `
}

const generateScrollbarStyle = () => {
  const css = `
  ::-webkit-scrollbar {
    width: var(${resolveVar('width')});
    height: var(${resolveVar('height')});
  }

  ::-webkit-scrollbar-track {
    background: var(${resolveVar('track-color')});
    border-radius: var(${resolveVar('track-radius')});
  }

  ::-webkit-scrollbar-thumb {
    background: var(${resolveVar('thumb-color')});
    border-radius: var(${resolveVar('thumb-radius')});
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(${resolveVar('thumb-hover-color')});
  }
`
  return css
}

// base style for all scrollbars
const baseStyle = generateScrollbarStyle()

let isPending = false

const generateAllStyle = () => {
  const cssRessult: string[] = [baseStyle]

  // generate style for each external options from user config
  externalOptionList.forEach((options) => {
    const variables = generateCss(options)
    const darkVariables = generateDarkCss(options)
    cssRessult.push(variables, darkVariables)
  })

  const css = cssRessult.filter(Boolean).join('\n')

  // minify css by default
  mountStyle(minify(css))

  isPending = false

  return css
}

const throttledGenerateAllStyle = () => {
  if (isPending) return

  isPending = true
  // use raf as a throttle
  window.requestAnimationFrame(generateAllStyle)
}

/**
 * Define scrollbar style
 */
export const defineScrollbar = (options?: ScrollbarOptions) => {
  const finalOptions = resolveOptions(options)

  const oldOptionIdx = externalOptionList.findIndex(item => item.name === finalOptions.name)

  const shouldReplace = oldOptionIdx !== -1 // existing options should be replaced

  if (shouldReplace)
    externalOptionList.splice(oldOptionIdx, 1, finalOptions)
  else
    externalOptionList.push(finalOptions)

  throttledGenerateAllStyle()
}
