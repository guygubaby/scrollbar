<template>
  <div>
    <h1 text="2xl purple-500 center" font="bold" p="b-4">
      Scrollbar playground
    </h1>

    <div
      p="4"
      m="2"
      flex="~ col"
      items="center"
      justify="center"
      border="~"
      rounded="~"
    >
      <div p="4" w="50" overflow="auto">
        <div w="200">
          default horizontal scrollbar
        </div>
      </div>

      <div p="4" w="50" overflow="auto" scrollbar="dark-mode">
        <div w="200">
          dark mode support
        </div>
      </div>

      <div p="4" w="50" overflow="auto" scrollbar="custom-thumb-track">
        <div w="200">
          custom thumb and track
        </div>
      </div>

      <div p="4" w="50" overflow="auto" scrollbar="custom-height">
        <div w="200">
          custom height
        </div>
      </div>

      <div p="4" w="50" overflow="auto" scrollbar="custom-radius">
        <div w="200">
          custom-radius
        </div>
      </div>
    </div>

    <div
      p="4"
      m="2"
      flex="~"
      items="center"
      justify="center"
      border="~"
      rounded="~"
    >
      <div p="4" h="50" flex="1" overflow="auto">
        <div h="200">
          default vertical scrollbar
        </div>
      </div>

      <div p="4" h="50" flex="1" overflow="auto" scrollbar="custom-width">
        <div h="200">
          custom width
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineScrollbar } from '@bryce-loskie/scrollbar'

defineScrollbar({
  darkMode: 'media',
  darkOptions: {
    thumbColor: 'red',
    trackColor: 'blue',
  },
})

defineScrollbar({
  name: 'dark-mode',
  thumbColor: 'gray',
  thumbHoverColor: 'red',
  darkMode: 'class',
  darkOptions: {
    thumbColor: 'red',
    trackColor: 'blue',
  },
})

defineScrollbar({
  name: 'custom-thumb-track',
  thumbColor: 'rgb(15,118,110)',
  trackColor: 'rgb(31,41,55)',
})

defineScrollbar({
  name: 'custom-height',
  height: '20px',
})

defineScrollbar({
  name: 'custom-radius',
  height: '20px',
  thumbRadius: '10px',
  trackRadius: '10px',
})

defineScrollbar({
  name: 'custom-width',
  width: '20px',
})

// same name will cover previous definition
defineScrollbar({
  name: 'custom-width',
  width: '14px',
})
</script>
