<script setup lang="ts">
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Ubuntu+Mono:wght@400;700&display=swap',
    },
  ],
})

const { data: articles } = await useAsyncData('articles', () =>
  queryCollection('content').order('date', 'DESC').all()
)

const formatDate = (date: string | Date) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

const blogPath = (path: string) => `/blog${path === '/' ? '' : path}`
</script>

<template>
  <main class="blog">
    <h1 class="blog__title">Blog</h1>

    <ul class="posts">
      <li v-for="article in articles" :key="article.path" class="post">
        <NuxtLink :to="blogPath(article.path)" class="post__link">
          <time v-if="article.date" class="post__date">
            {{ formatDate(article.date) }}
          </time>
          <h2 class="post__title">{{ article.title }}</h2>
          <p v-if="article.description" class="post__description">
            {{ article.description }}
          </p>
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.blog {
  --display: 'Fredoka', ui-rounded, 'Nunito', system-ui, sans-serif;
  --mono: 'Ubuntu Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace;

  min-height: 100dvh;
  padding: clamp(2.5rem, 8vw, 5.5rem) 1.5rem 6rem;
  font-family: var(--mono);
}

.blog__title,
.posts {
  max-width: 44rem;
  margin-inline: auto;
}

.blog__title {
  margin-block: 0 clamp(2.25rem, 6vw, 3.5rem);
  font-family: var(--display);
  font-size: clamp(3.25rem, 9vw, 5.5rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
  text-decoration: underline wavy var(--ink);
  text-decoration-thickness: 5px;
  text-underline-offset: 0.16em;
  text-decoration-skip-ink: none;
}

.posts {
  display: grid;
  gap: 1.75rem;
  padding: 0;
  list-style: none;
}

/* The whole link is the card: hard outline, hard shadow, presses down on hover */
.post__link {
  display: grid;
  justify-items: start;
  gap: 0.6rem;
  padding: 1.5rem 1.5rem 1.65rem;
  border: 2px solid var(--ink);
  border-radius: 20px;
  box-shadow: 6px 6px 0 var(--ink);
  text-decoration: none;
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease;
}

.post__link:hover,
.post__link:focus-visible {
  transform: translate(4px, 4px);
  box-shadow: 2px 2px 0 var(--ink);
}

.post__link:focus-visible {
  outline: 3px solid var(--ink);
  outline-offset: 5px;
}

.post__date {
  padding: 0.1rem 0.75rem 0.15rem;
  border: 2px solid var(--ink);
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.4;
}

.post__link:hover .post__date,

.post__title {
  margin: 0.15rem 0 0;
  font-family: var(--display);
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 600;
  line-height: 1.2;
  text-wrap: balance;
  text-decoration: underline wavy transparent;
  text-decoration-thickness: 3px;
  text-underline-offset: 0.2em;
  text-decoration-skip-ink: none;
}

.post__description {
  max-width: 62ch;
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.65;
  text-wrap: pretty;
}

@media (prefers-reduced-motion: reduce) {
  .post__link,
  .post__date,
  .post__title {
    transition: none;
  }
}
</style>