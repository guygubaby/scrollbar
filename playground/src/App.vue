<template>
  <main font-sans p="x-4 y-10" text="gray-700 dark:gray-200">
    <router-view />

    <Footer />
  </main>
</template>

<script lang="ts" setup>
import { useHead } from '@vueuse/head'
useHead({
  title: 'scrollbar | playground',
  meta: [
    {
      name: 'description',
      content: 'scrollbar playground',
    },
  ],
})
</script>
