import { usePlayerStore } from '@/store/playerStore'
import { hashStr } from '@/lib/utils'
import type { Song } from '@/types'

export async function pickAudioFilesMobile(): Promise<number> {
  return new Promise((resolve) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'audio/*'
    input.multiple = true

    input.onchange = async (e) => {
      const files = (e.target as HTMLInputElement).files
      if (!files || files.length === 0) {
        resolve(0)
        return
      }

      const existingIds = new Set(usePlayerStore.getState().library.map((s) => s.id))
      const newSongs: Song[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const blobUrl = URL.createObjectURL(file)
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '')
        const songId = hashStr(file.name + '_' + file.size + '_' + file.lastModified)

        if (existingIds.has(songId)) continue

        newSongs.push({
          id: songId,
          path: blobUrl,
          title: nameWithoutExt,
          artist: 'Local Audio',
          album: 'Device Storage',
          duration: 0,
          coverArt: null,
          addedAt: Date.now(),
          mtimeMs: file.lastModified,
          source: 'local',
        })
      }

      if (newSongs.length > 0) {
        usePlayerStore.getState().addToLibrary(newSongs)
      }
      resolve(newSongs.length)
    }

    input.click()
  })
}
