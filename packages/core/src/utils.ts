import { defaultOptions } from './constants'
import type { ScrollbarOptions } from './types'

const defineOptions = (options?: ScrollbarOptions) => ({
  ...defaultOptions,
  ...(options || {}),
})

const styleTag = document.createElement('style')
const head = document.head || document.getElementsByTagName('head')[0]
const externalOptionList: Required<ScrollbarOptions>[] = []

const mountStyle = (css: string) => {
  styleTag.textContent = css
  if (!head.contains(styleTag)) {
    head.appendChild(styleTag)
  }
}

const resolveVar = (name: string, prefix: string) => {
  return `--${prefix ? `${prefix}-` : ''}scrollbar-${name}`
}

const generateCss = ({
  options,
  forRoot,
}: {
  options: Required<ScrollbarOptions>
  forRoot?: boolean
}) => {
  const {
    name,
    scrollbarWidth,
    scrollbarHeight,
    scrollbarTrackRadius,
    scrollbarThumbRadius,
    scrollbarTrackColor,
    scrollbarThumbColor,
    scrollbarThumbHoverColor,
    varPrefix,
  } = options

  const variables = `
    ${resolveVar('width', varPrefix)}: ${scrollbarWidth};
    ${resolveVar('height', varPrefix)}: ${scrollbarHeight};
    ${resolveVar('track-radius', varPrefix)}: ${scrollbarTrackRadius};
    ${resolveVar('thumb-radius', varPrefix)}: ${scrollbarThumbRadius};
    ${resolveVar('track-color', varPrefix)}: ${scrollbarTrackColor};
    ${resolveVar('thumb-color', varPrefix)}: ${scrollbarThumbColor};
    ${resolveVar('thumb-hover-color', varPrefix)}: ${scrollbarThumbHoverColor};
    `

  const selector = forRoot ? ':root' : name ? `[scrollbar~="${name}"]` : ''

  if (!selector) return ''

  return `
  ${selector} {
    ${variables.trim()}
  }
  `
}

const generateBaseScrollbarStyle = (options: Required<ScrollbarOptions>) => {
  const { varPrefix } = options

  const css = `
  ::-webkit-scrollbar {
    width: var(${resolveVar('width', varPrefix)});
    height: var(${resolveVar('height', varPrefix)});
  }

  ::-webkit-scrollbar-track {
    background: var(${resolveVar('track-color', varPrefix)});
    border-radius: var(${resolveVar('track-radius', varPrefix)}, 0);
  }

  ::-webkit-scrollbar-thumb {
    background: var(${resolveVar('thumb-color', varPrefix)});
    border-radius: var(${resolveVar('thumb-radius', varPrefix)}, 0);
    transition: background 0.6s ease-in-out;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(${resolveVar('thumb-hover-color', varPrefix)});
  }
`
  return css
}

// css variables for :root selector
const rootVariables = generateCss({
  options: defaultOptions,
  forRoot: true,
})

// base style for all scrollbars
const baseStyle = generateBaseScrollbarStyle(defaultOptions)

let isPending = false

const generateAllStyle = () => {
  const cssRessult: string[] = [rootVariables, baseStyle]

  // generate style for each external options from user config
  externalOptionList.forEach((options) => {
    const variables = generateCss({ options })
    cssRessult.push(variables)
  })

  const css = cssRessult.filter(Boolean).join('\n')

  mountStyle(css)

  isPending = false

  return css
}

const throttledGenerateAllStyle = () => {
  if (!isPending) {
    isPending = true
    // use raf as a throttle
    window.requestAnimationFrame(generateAllStyle)
  }
}

export const defineScrollbar = (options?: ScrollbarOptions) => {
  const finalOptions = defineOptions(options)

  const oldOption = externalOptionList.find(
    (item) => item.name === finalOptions.name
  )

  if (!oldOption) {
    externalOptionList.push(finalOptions)
  }

  throttledGenerateAllStyle()
}
