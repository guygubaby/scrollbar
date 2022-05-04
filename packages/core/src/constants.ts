import type { ScrollbarOptions } from './types'

export const defaultDarkOptions: Required<Pick<ScrollbarOptions, 'trackColor' | 'thumbColor' | 'thumbHoverColor'>> = {
  trackColor: '#414141',
  thumbColor: '#ccc',
  thumbHoverColor: '#999',
}

export const defaultOptions: Required<ScrollbarOptions> = {
  width: '8px',
  height: '8px',
  trackRadius: '4px',
  thumbRadius: '4px',
  trackColor: '#f5f5f5',
  thumbColor: '#ccc',
  thumbHoverColor: '#999',
  name: '',
  darkMode: false,
  darkOptions: defaultDarkOptions,
}
