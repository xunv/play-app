import { useThemeContext } from '@/contexts/ThemeContext'

/**
 * Web 端实现:同样从 ThemeContext 读取实际生效的外观。
 * ThemeContext 内部使用 RN 的 useColorScheme 读取系统外观,
 * 在 web 上会返回浏览器的 prefers-color-scheme,行为与移动端一致。
 */
export function useColorScheme() {
  return useThemeContext().colorScheme
}
