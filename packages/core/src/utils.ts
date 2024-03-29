import { name, version } from '../package.json'
import { defaultDarkOptions, defaultOptions } from './constants'
import type { ScrollbarOptions } from './types'

const Banner = `/* Generated by ${name} v${version} */`
const styleTag = document.createElement('style')
const head = document.head || document.getElementsByTagName('head')[0]
const externalOptionList: Required<ScrollbarOptions>[] = []

const minify = (css: string) => {
  return css
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}])\s*/g, '$1')
    .trim()
}

const resolveOptions = (options?: ScrollbarOptions) => ({
  ...defaultOptions,
  ...(options || {}),
})

const resolveVar = (name: string) => {
  return `--scrollbar-${name}`
}

export const generateBaseCss = () => {
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

export const generateVars = (options: Required<ScrollbarOptions>) => {
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

  const selector = name ? `.scrollbar-${name},[scrollbar~="${name}"]` : ':root'

  const isNoScrollbar = width === 0 && height === 0

  const [widthStr, heightStr, trackRadiusStr, thumbRadiusStr] = [
    width,
    height,
    trackRadius,
    thumbRadius,
  ].map((item) => {
    if (typeof item === 'number')
      return `${item}px`

    return item
  })

  const variables = `
    ${resolveVar('width')}: ${widthStr};
    ${resolveVar('height')}: ${heightStr};
    ${resolveVar('track-radius')}: ${trackRadiusStr};
    ${resolveVar('thumb-radius')}: ${thumbRadiusStr};
    ${resolveVar('track-color')}: ${trackColor};
    ${resolveVar('thumb-color')}: ${thumbColor};
    ${resolveVar('thumb-hover-color')}: ${thumbHoverColor};
    scrollbar-color: var(${resolveVar('thumb-color')}) var(${resolveVar(
      'track-color',
    )});
    scrollbar-width: ${isNoScrollbar ? 'none' : 'thin'}
    `

  return `
  ${selector} {
    ${variables.trim()}
  }
  `
}

const generateDarkVars = (options: Required<ScrollbarOptions>) => {
  const { name, darkMode, darkOptions } = options

  if (!darkMode)
    return ''

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
    const selector = name ? `.dark .scrollbar-${name},[scrollbar~="${name}"]` : 'html.dark'

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

const processOptions = (options?: ScrollbarOptions) => {
  const finalOptions = resolveOptions(options)
  const oldOptionIdx = externalOptionList.findIndex(
    item => item.name === finalOptions.name,
  )
  const shouldReplace = oldOptionIdx !== -1 // existing options should be replaced
  if (shouldReplace)
    externalOptionList.splice(oldOptionIdx, 1, finalOptions)
  else externalOptionList.push(finalOptions)
}

const generateAllVars = () => {
  return externalOptionList
    .reduce((acc, cur) => {
      const variables = generateVars(cur)
      const darkVariables = generateDarkVars(cur)
      acc.push(variables, darkVariables)
      return acc
    }, [] as string[])
    .filter(Boolean)
    .join('\n')
}

const mountStyle = (css: string) => {
  styleTag.textContent = css
  if (!head.contains(styleTag))
    head.appendChild(styleTag)
}

let isPending = false

const generateStyle = () => {
  if (isPending)
    return

  // schedule a task to generate css
  isPending = true
  window.requestAnimationFrame(() => {
    const baseCss = generateBaseCss()
    const vars = generateAllVars()
    const style = minify(Banner + baseCss + vars)
    mountStyle(style)
    isPending = false
  })
}

/**
 * Define scrollbar style
 */
export const defineScrollbar = (options?: ScrollbarOptions) => {
  processOptions(options)
  generateStyle()
}
