import type { Sticker } from '@/models/sticker'
import { stickerInitValue } from '@/models/sticker'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStickersStore = defineStore('stikersStore', () => {
  const stickersList = ref<Sticker[]>([])

  const addSticker = (sticker: Sticker): void => {
    stickersList.value.unshift(sticker)
  }

  const updateSticker = (sticker: Sticker): void => {
    const index: number = stickersList.value.findIndex(_ => _.id === sticker.id)
    stickersList.value[index] = sticker
  }

  const deleteSticker = (stickerId: number): void => {
    const index: number = stickersList.value.findIndex(_ => _.id === stickerId)
    stickersList.value.splice(index, 1)
  }

  const getSticker = (stickerId: number): Sticker => {
    const lookup = stickersList.value.find(_ => _.id === stickerId)
    return lookup === undefined ? stickerInitValue : lookup
  }

  return { addSticker, stickersList, getSticker, updateSticker, deleteSticker }
}, {
  persist: true,
  share: {
    enable: true,
  },
})
