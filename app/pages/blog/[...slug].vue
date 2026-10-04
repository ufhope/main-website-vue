<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(
  `blog-${route.path}`,
  () => queryCollection('content')
    .path(route.path.replace(/^\/blog/, '') || '/')
    .first()
)
</script>

<template>
  <ContentRenderer v-if="page" :value="page" />
</template>
