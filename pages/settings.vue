<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Stiker from '~/components/Stiker.vue'
import { useStickersStore } from '~/store/stickers'

const stickersStore = useStickersStore()
const { deleteSticker } = useStickersStore()
const { stickersList } = storeToRefs(stickersStore)

function handleDelete(stickerId: number) {
  deleteSticker(stickerId)
}
</script>

<template>
  <div class="flex justify-between mb-8">
    <h1 class="text-2xl font-semibold">
      Настройки
    </h1>
    <NuxtLink to="/form">
      <Button label="Добавить стикер">
        <i class="pi pi-file-plus" style="font-size: 1.2rem" />
        Добавить стикер
      </Button>
    </NuxtLink>
  </div>
  <Stiker v-for="sticker in stickersList" :key="sticker.id" :sticker="sticker" editable class="mb-2" @delete="handleDelete" />
</template>
