<script setup lang="ts">
import type { Sticker } from '@/models/sticker'

interface IProps {
  sticker: Sticker
  editable?: boolean
}

withDefaults(defineProps<IProps>(), {
  editable: false,
})

const emit = defineEmits<{
  (e: 'delete', stickerId: number): void
}>()

function handleDelete(stickerId: number) {
  emit('delete', stickerId)
}
</script>

<template>
  <Card>
    <template #content>
      <div class="flex justify-between">
        <div>
          {{ sticker.content }}
        </div>
        <div v-if="editable" class="flex gap-2">
          <NuxtLink :to="{ name: 'form', query: { id: sticker.id } }">
            <Button severity="secondary">
              <span class="pi pi-file-edit" />
            </Button>
          </NuxtLink>
          <Button severity="secondary" @click="handleDelete(sticker.id)">
            <span class="pi pi-trash" />
          </Button>
        </div>
      </div>
    </template>
  </Card>
</template>
