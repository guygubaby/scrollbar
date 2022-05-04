# scrollbar

[![NPM version](https://img.shields.io/npm/v/@bryce-loskie/scrollbar?color=a1b858&label=)](https://www.npmjs.com/package/@bryce-loskie/scrollbar)

## Get Started

### Install

```bash
pnpm i @bryce-loskie/scrollbar
```

### Usage

```html
<div p="4" w="50" overflow="auto">
  <div w="200">default horizontal scrollbar</div>
</div>

<div p="4" w="50" overflow="auto" scrollbar="foo">
  <div w="200">custom thumb color</div>
</div>

<script setup lang="ts">
import { defineScrollbar } from '@bryce-loskie/scrollbar'

defineScrollbar()

defineScrollbar({
  name: 'foo', // use with `scrollbar="foo"` attribute
  thumbColor: 'gray',
})
</script>
```

## Todo

- [x] thumb hover color
- [ ] dark mode
- [ ] minify generated css code

## License

[MIT](./LICENSE) License © 2022 [guygubaby](https://github.com/guygubaby)
