export interface ScrollbarOptions {
  /**
   * Scoped scrollbar name, can be used with the scrollbar attribute.
   *
   * ```html
   * <div p="4" w="50" overflow="auto" scrollbar="custom-thumb"> </div>
   * <script>
      import { defineScrollbar } from '@bryce-loskie/scrollbar'
    * defineScrollbar({
        name: 'custom-thumb',
        scrollbarThumbColor: 'gray',
      })
      </script>
    * ```
      And then in html tag add the attribute: `scrollbar="foo"`
   */
  name?: string
  /**
   * scrollbar width
   * @default '8px'
   */
  width?: string | number
  /**
   * scrollbar height
   * @default '8px'
   */
  height?: string | number
  /**
   * scrollbar track radius
   * @default '4px'
   */
  trackRadius?: string | number
  /**
   * scrollbar thumb radius
   * @default '4px'
   */
  thumbRadius?: string | number
  /**
   * scrollbar track background color
   * @default '#f5f5f5'
   */
  trackColor?: string
  /**
   * scrollbar thumb background color
   * @default '#ccc'
   */
  thumbColor?: string
  /**
   * scrollbar thumb hovered background color
   * @default '#999'
   */
  thumbHoverColor?: string

  darkMode?: false | 'class' | 'media'
  darkOptions?: Pick<ScrollbarOptions, 'trackColor' | 'thumbColor' | 'thumbHoverColor'>
}
