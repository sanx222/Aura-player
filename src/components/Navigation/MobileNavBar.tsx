import { Music2, Globe, Heart, ListMusic, Settings } from 'lucide-react'
import { usePlayerStore } from '@/store/playerStore'
import type { AppView } from '@/types'

export function MobileNavBar() {
  const activeView = usePlayerStore((s) => s.activeView)
  const setActiveView = usePlayerStore((s) => s.setActiveView)

  const items: { id: AppView; label: string; icon: typeof Music2 }[] = [
    { id: 'library', label: 'Library', icon: Music2 },
    { id: 'explore', label: 'Explore', icon: Globe },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'playlist', label: 'Playlists', icon: ListMusic },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around px-2 py-2 md:hidden"
      style={{
        background: 'color-mix(in srgb, var(--surface-raised) 85%, transparent)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid var(--border-subtle)',
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 6px)',
      }}
    >
      {items.map((item) => {
        const Icon = item.icon
        const isActive = activeView === item.id
        return (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all"
            style={{
              color: isActive ? 'var(--accent)' : 'var(--text-tertiary)',
            }}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
