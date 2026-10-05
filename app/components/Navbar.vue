<template>
  <header class="navbar">
    <a href="/" class="brand">HOPE PARTY</a>

    <!-- Mobile menu button -->
    <button
      id="navToggle"
      type="button"
      class="nav-toggle"
      aria-label="Open navigation menu"
      aria-controls="mobileNav"
      :aria-expanded="mobileNavOpen"
      @click="toggleMobileNav"
    >
      ☰
    </button>

    <!-- Desktop navigation -->
    <nav class="desktop-nav" aria-label="Primary navigation">
      <a href="/about/">About Us</a>
      <a href="/blog/">Our Blog</a>
      <a href="/people/">Our People</a>
      <a href="/platform/">Platform</a>
      <a href="https://archive.ufhope.org">Archive</a>
      <a href="/calendar/">Calendar</a>
    </nav>

    <!-- Mobile navigation -->
    <nav
      id="mobileNav"
      class="mobile-nav"
      :class="{ open: mobileNavOpen }"
      aria-label="Primary navigation"
    >
      <a href="/about/" @click="closeMobileNav">About Us</a>
      <a href="/blog/" @click="closeMobileNav">Blog</a>
      <a href="/people/" @click="closeMobileNav">Our People</a>
      <a href="/platform/" @click="closeMobileNav">Platform</a>
      <a href="https://archive.ufhope.org" @click="closeMobileNav">Archive</a>
      <a href="/calendar/" @click="closeMobileNav">Calendar</a>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";

const mobileNavOpen = ref(false);

function toggleMobileNav() {
  mobileNavOpen.value = !mobileNavOpen.value;
}

function closeMobileNav() {
  mobileNavOpen.value = false;
}
</script>

<style scoped>
# {
  color: #ffffff;
}
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;

  min-height: 8vh;
  width: 100%;
  box-sizing: border-box;

  padding: 1vh 1vw;

  background-color: #4f009f;
  color: #ffffff;

  display: grid;
  grid-template-columns: repeat(9, 1fr);
  align-items: center;
  gap: 1vw;

  font-family: 'Fredoka', sans-serif;
  font-weight: 400;
  font-size: 1.5rem;

  border-radius: 20px 20px 0 0;
}

.navbar a {
  color: #ffffff;
  text-decoration: none;
}

.brand {
  grid-column: 1 / 3;
  font-weight: bold;
  font-size: 1.2rem;
}

.desktop-nav {
  grid-column: 5 / 10;

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;

  text-align: center;
}

.desktop-nav a:hover,
.mobile-nav a:hover {
  text-decoration: underline;
}

.nav-toggle {
  display: none;

  font-size: 26px;
  padding: 12px 14px;
  min-width: 48px;
  min-height: 48px;

  border: none;
  border-radius: 8px;

  background: transparent;
  color: #ffffff;

  cursor: pointer;
}

.mobile-nav {
  display: none;
}

/* Mobile */
@media (max-width: 768px) {
  .navbar {
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .brand {
    grid-column: 1;
  }

  .nav-toggle {
    display: block;
    grid-column: 2;
  }

  .desktop-nav {
    display: none;
  }

  .mobile-nav {
    grid-column: 1 / -1;

    display: none;
    grid-template-columns: 1fr;

    padding: 1rem 0;
  }

  .mobile-nav.open {
    display: grid;
  }

  .mobile-nav a {
    padding: 12px 8px;
  }
}
</style>