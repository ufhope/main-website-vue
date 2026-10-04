<template>
  <header
    class="page-header"
    :style="{ backgroundImage: `url(${background})` }"
  >
    <div class="page-header__overlay">
      <div class="page-header__content">
        <h1>{{ title }}</h1>
        <p v-if="subtitle">{{ subtitle }}</p>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  background: string
}>()
</script>

<style scoped>
.page-header {
  min-height: 320px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.page-header__overlay {
  min-height: 320px;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
}

.page-header__content {
  width: min(1200px, 90%);
  margin: 0 auto;
  color: white;
}

h1 {
  font-size: 3rem;
  margin: 0;
}

p {
  font-size: 1.2rem;
}
</style>
