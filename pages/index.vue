<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Stiker from '~/components/Stiker.vue'
import { useStickersStore } from '~/store/stickers'

const stickersStore = useStickersStore()
const { stickersList } = storeToRefs(stickersStore)
</script>

<template>
  <div class="grid grid-cols-3 gap-2">
    <Stiker v-for="sticker in stickersList" :key="sticker.id" :sticker="sticker" class="mb-2" />
  </div>
</template>
