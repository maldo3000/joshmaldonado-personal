import { useCallback, useEffect, useState } from 'react'
import type {
  PortfolioCategory,
  PortfolioProject,
} from '../../api/_lib/projects'

export type { PortfolioCategory, PortfolioProject }

export type PortfolioData = {
  projects: PortfolioProject[]
  categoryLabels: Record<PortfolioCategory, string>
}

export type AuthState = 'checking' | 'locked' | 'ready'

export function usePortfolio() {
  const [state, setState] = useState<AuthState>('checking')
  const [error, setError] = useState('')
  const [data, setData] = useState<PortfolioData | null>(null)

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/portfolio/data')
      if (res.status === 401) {
        setState('locked')
        return
      }
      if (!res.ok) throw new Error(String(res.status))
      setData((await res.json()) as PortfolioData)
      setState('ready')
    } catch {
      setState('locked')
      setError('Something went wrong — try again.')
    }
  }, [])

  useEffect(() => {
    void fetchData()
  }, [fetchData])

  const login = useCallback(
    async (password: string) => {
      setError('')
      try {
        const res = await fetch('/api/portfolio/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        })
        if (res.ok) {
          await fetchData()
        } else {
          setError('Incorrect password')
        }
      } catch {
        setError('Something went wrong — try again.')
      }
    },
    [fetchData]
  )

  return { state, data, error, login }
}
