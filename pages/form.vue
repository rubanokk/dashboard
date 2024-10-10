<script lang="ts" setup>
import type { Sticker } from '@/models/sticker'
import { stickerInitValue } from '@/models/sticker'
import { useStickersStore } from '@/store/stickers'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { addSticker, getSticker, updateSticker } = useStickersStore()
const sticker = ref<Sticker>({ ...stickerInitValue })
const isEditMode = ref<boolean>(false)
const isError = ref<boolean>(false)

watch(route, () => {
  const stickerId = route.query.id

  if (!stickerId)
    return

  isEditMode.value = true
  sticker.value = { ...getSticker(Number(stickerId)) }
}, {
  deep: true,
  immediate: true,
})

const isContentEmpty = computed(() => {
  return sticker.value.content.length === 0
})

function save() {
  if (isContentEmpty.value) {
    isError.value = true
    return
  }

  if (isEditMode.value) {
    updateSticker(sticker.value)
  }
  else {
    sticker.value.id = Math.floor(Math.random() * 1000)
    addSticker(sticker.value)
  }

  router.push({ path: '/settings' })
}

function updateContent(event: Event) {
  isError.value = false
  const target = event.target as HTMLTextAreaElement
  sticker.value.content = target.value
}

const pageTitle = computed(() => {
  return isEditMode.value ? 'Редактировать стикер' : 'Создать новый стикер'
})
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold">
      {{ pageTitle }}
    </h1>
    <label for="message" class="block font-semibold mt-8 mb-2">Текст</label>
    <Textarea :value="sticker.content" :class="{ '!border-rose-400': isError }" class="w-full" rows="4" @input="updateContent" />
    <div class="flex gap-4 mt-2">
      <Button label="Сохранить" icon="pi pi-save" @click="save" />
      <NuxtLink to="/settings">
        <Button label="К настройкам" outlined icon="pi pi-undo" />
      </NuxtLink>
    </div>
  </div>
</template>
