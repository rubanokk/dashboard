<script setup lang="ts">
import type { Sticker } from '@/models/sticker'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'
import Stiker from '~/components/Stiker.vue'
import { useStickersStore } from '~/store/stickers'

const stickersStore = useStickersStore()
const { getFilteredStikers } = stickersStore
const currentStickers = ref<Sticker[]>(getFilteredStikers())

function onSearch(event: Event) {
  const target = event.target as HTMLTextAreaElement
  currentStickers.value = getFilteredStikers(target.value)
}
</script>

<template>
  <InputText class="w-full" placeholder="Поиск по стикерам" @input="onSearch" />
  <div class="grid grid-cols-3 gap-2 mt-4">
    <Stiker v-for="sticker in currentStickers" :key="sticker.id" :sticker="sticker" class="mb-2" />
  </div>
</template>
