<template>
  <div class="flex items-center justify-center">
    <div p="4" w="50" overflow="auto" scrollbar="foo">
      <div w="200">
        custom thumb and track
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineScrollbar } from '@bryce-loskie/scrollbar'

defineScrollbar({
  name: 'foo',
  thumbColor: 'red',
  thumbHoverColor: 'blue',
})
</script>
