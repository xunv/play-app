import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useColorScheme as useRNColorScheme } from 'react-native'

/**
 * 主题偏好:
 * - 'system' 跟随系统深浅色
 * - 'light'  强制浅色
 * - 'dark'   强制深色
 */
export type ThemePreference = 'system' | 'light' | 'dark'

/** 最终生效的外观(实际用于渲染的值) */
export type ResolvedColorScheme = 'light' | 'dark'

type ThemeContextValue = {
  /** 用户选择的偏好(三态) */
  preference: ThemePreference
  /** 结合系统外观后计算出的实际主题(两态) */
  colorScheme: ResolvedColorScheme
  /** 设置偏好(会持久化到本地) */
  setPreference: (preference: ThemePreference) => void
}

/** AsyncStorage 持久化 key */
const STORAGE_KEY = 'theme.preference'

const VALID_PREFERENCES: ThemePreference[] = ['system', 'light', 'dark']

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProviderCustom({ children }: { children: ReactNode }) {
  const systemScheme = useRNColorScheme()
  const [preference, setPreferenceState] = useState<ThemePreference>('system')

  // 首次挂载:从本地读取已保存的偏好
  useEffect(() => {
    let mounted = true
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (
          mounted &&
          stored &&
          VALID_PREFERENCES.includes(stored as ThemePreference)
        ) {
          setPreferenceState(stored as ThemePreference)
        }
      })
      .catch(() => {
        // 读取失败则保持默认 'system',不阻塞渲染
      })
    return () => {
      mounted = false
    }
  }, [])

  // 设置偏好并持久化
  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next)
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {
      // 写入失败不影响本次内存态切换
    })
  }, [])

  const colorScheme: ResolvedColorScheme = useMemo(() => {
    if (preference === 'system') {
      return systemScheme === 'dark' ? 'dark' : 'light'
    }
    return preference
  }, [preference, systemScheme])

  const value = useMemo<ThemeContextValue>(
    () => ({ preference, colorScheme, setPreference }),
    [preference, colorScheme, setPreference],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useThemeContext(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useThemeContext must be used within ThemeProviderCustom')
  }
  return ctx
}
