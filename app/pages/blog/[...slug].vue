<script setup lang="ts">
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap',
    },
  ],
})

const route = useRoute()

const { data: page } = await useAsyncData(
  `blog-${route.path}`,
  () => queryCollection('content')
    .path(route.path.replace(/^\/blog/, '') || '/')
    .first()
)

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
})

const formatDate = (date: string | Date) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
</script>

<template>
  <main class="post">
    <NuxtLink to="/blog" class="post__back">&larr; Back to blog</NuxtLink>

    <template v-if="page">
      <header class="post__header">
        <time v-if="page.date" class="post__date">
          {{ formatDate(page.date) }}
        </time>
        <h1 class="post__title">{{ page.title }}</h1>
        <p v-if="page.description" class="post__description">
          {{ page.description }}
        </p>
      </header>

      <article class="prose">
        <ContentRenderer :value="page" />
      </article>
    </template>

    <p v-else class="post__missing">That post doesn't exist (or has moved).</p>
  </main>
</template>

<style scoped>
.post {
  --bg: #fff;
  --ink: #000;
  --display: 'Fredoka', ui-rounded, 'Nunito', system-ui, sans-serif;
  --mono: 'Ubuntu Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace;

  min-height: 100dvh;
  padding: clamp(1.75rem, 6vw, 4rem) 1.5rem 7rem;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--mono);
}

.post__header,
.prose,
.post__missing {
  max-width: 42rem;
  margin-inline: auto;
}

/* ---------- Back link ---------- */
.post__back {
  display: block;
  width: fit-content;
  /* line up with the left edge of the 42rem column */
  margin: 0 0 clamp(2rem, 6vw, 3.5rem) max(0px, calc((100% - 42rem) / 2));
  padding: 0.2rem 0.85rem 0.25rem;
  border: 2px solid var(--ink);
  border-radius: 999px;
  color: inherit;
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  transition:
    background-color 0.12s ease,
    color 0.12s ease;
}

.post__back:hover,
.post__back:focus-visible {
  background: var(--ink);
  color: var(--bg);
}

.post__back:focus-visible {
  outline: 3px solid var(--ink);
  outline-offset: 3px;
}

/* ---------- Header ---------- */
.post__header {
  display: grid;
  justify-items: start;
  gap: 1rem;
  padding-bottom: clamp(1.75rem, 5vw, 2.5rem);
  margin-bottom: clamp(2rem, 5vw, 3rem);
  border-bottom: 2px dashed var(--ink);
}

.post__date {
  padding: 0.1rem 0.75rem 0.15rem;
  border: 2px solid var(--ink);
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.4;
}

.post__title {
  margin: 0;
  font-family: var(--display);
  font-size: clamp(2.25rem, 7vw, 3.75rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.02em;
  text-wrap: balance;
}

.post__description {
  max-width: 56ch;
  margin: 0;
  font-size: 1.2rem;
  line-height: 1.6;
  text-wrap: pretty;
}

.post__missing {
  font-size: 1.15rem;
}

/* ---------- Article body ---------- */
.prose {
  font-size: 1.1rem;
  line-height: 1.8;
  overflow-wrap: break-word;
}

.prose :deep(> :first-child) {
  margin-top: 0;
}

.prose :deep(p) {
  margin: 0 0 1.4rem;
}

/* Headings */
.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3),
.prose :deep(h4) {
  font-family: var(--display);
  font-weight: 600;
  line-height: 1.2;
  text-wrap: balance;
  scroll-margin-top: 1.5rem;
}

.prose :deep(h1) {
  margin: 3rem 0 1rem;
  font-size: 2.25rem;
}

.prose :deep(h2) {
  margin: 3rem 0 1rem;
  font-size: 1.85rem;
}

.prose :deep(h3) {
  margin: 2.25rem 0 0.75rem;
  font-size: 1.45rem;
}

.prose :deep(h4) {
  margin: 2rem 0 0.5rem;
  font-size: 1.2rem;
}

/* Heading anchor links added by Nuxt Content */
.prose :deep(h1 a),
.prose :deep(h2 a),
.prose :deep(h3 a),
.prose :deep(h4 a) {
  color: inherit;
  text-decoration: none;
  background: none;
}

/* Links */
.prose :deep(a) {
  color: inherit;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 0.2em;
}

.prose :deep(a:hover),
.prose :deep(a:focus-visible) {
  background: var(--ink);
  color: var(--bg);
  text-decoration-color: transparent;
}

/* Lists */
.prose :deep(ul),
.prose :deep(ol) {
  margin: 0 0 1.4rem;
  padding-left: 1.6rem;
}

.prose :deep(li) {
  margin-bottom: 0.45rem;
  padding-left: 0.3rem;
}

.prose :deep(li > ul),
.prose :deep(li > ol) {
  margin: 0.45rem 0 0;
}

.prose :deep(li::marker) {
  font-weight: 700;
}

/* Quotes */
.prose :deep(blockquote) {
  margin: 2rem 0;
  padding: 0.25rem 0 0.25rem 1.5rem;
  border-left: 5px solid var(--ink);
  font-style: italic;
}

.prose :deep(blockquote > :last-child) {
  margin-bottom: 0;
}

/* Inline code */
.prose :deep(code) {
  padding: 0.05rem 0.4rem 0.1rem;
  border: 1.5px solid var(--ink);
  border-radius: 6px;
  font-family: var(--mono);
  font-size: 0.95em;
  font-weight: 700;
}

/* Code blocks */
.prose :deep(pre) {
  margin: 2rem 0;
  padding: 1.25rem 1.4rem;
  overflow-x: auto;
  border: 2px solid var(--ink);
  border-radius: 16px;
  background: var(--bg) !important;
  box-shadow: 5px 5px 0 var(--ink);
  font-size: 1rem;
  line-height: 1.65;
  tab-size: 2;
}

.prose :deep(pre code) {
  padding: 0;
  border: 0;
  border-radius: 0;
  font-size: inherit;
  font-weight: 400;
  background: none;
}

/* Images & figures */
.prose :deep(img),
.prose :deep(video) {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 2rem 0;
  border: 2px solid var(--ink);
  border-radius: 16px;
}

.prose :deep(figure) {
  margin: 2rem 0;
}

.prose :deep(figure img) {
  margin: 0;
}

.prose :deep(figcaption) {
  margin-top: 0.6rem;
  font-size: 0.95rem;
  text-align: center;
}

/* Tables */
.prose :deep(table) {
  display: block;
  width: 100%;
  margin: 2rem 0;
  overflow-x: auto;
  border-collapse: collapse;
  font-size: 1rem;
}

.prose :deep(th),
.prose :deep(td) {
  padding: 0.6rem 0.9rem;
  border: 2px solid var(--ink);
  text-align: left;
}

.prose :deep(th) {
  font-family: var(--display);
  font-weight: 600;
}

/* Dividers */
.prose :deep(hr) {
  margin: 3rem 0;
  border: 0;
  border-top: 2px dashed var(--ink);
}

.prose :deep(strong) {
  font-weight: 700;
}

@media (prefers-reduced-motion: reduce) {
  .post__back {
    transition: none;
  }
}
</style>