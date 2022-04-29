export interface ScrollbarOptions {
  /**
   * Scoped scrollbar name, can be used with the scrollbar attribute.
   * 
   * ```
      import { defineScrollbar } from '@bryce-loskie/scrollbar'
    * defineScrollbar({
        name: 'custom-thumb',
        scrollbarThumbColor: 'gray',
      })
    * ```
      And then in html tag add the attribute: `scrollbar="foo"`
   */
  name?: string
  /**
   * scrollbar width
   * @default '8px'
   */
  scrollbarWidth?: string
  /**
   * scrollbar height
   * @default '8px'
   */
  scrollbarHeight?: string
  /**
   * scrollbar track radius
   * @default '4px'
   */
  scrollbarTrackRadius?: string
  /**
   * scrollbar thumb radius
   * @default '4px'
   */
  scrollbarThumbRadius?: string
  /**
   * scrollbar track background color
   * @default '#f5f5f5'
   */
  scrollbarTrackColor?: string
  /**
   * scrollbar thumb background color
   * @default '#ddd'
   */
  scrollbarThumbColor?: string
  /**
   * css variable prefix
   * @default ''
   */
  varPrefix?: string
}
