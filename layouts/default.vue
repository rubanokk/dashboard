<script setup>
import Header from '@/components/Header'
import 'primeicons/primeicons.css'
</script>

<template>
  <Header />
  <div class="max-w-4xl mx-auto mt-8">
    <slot />
  </div>
</template>
