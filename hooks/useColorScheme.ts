import { useThemeContext } from '@/contexts/ThemeContext'

/**
 * 返回当前实际生效的外观('light' | 'dark')。
 * 由 ThemeContext 统一管理(结合用户偏好与系统外观后计算得出),
 * 因此所有依赖此 hook 的组件(主题色、导航栏、tab 图标等)都会随三态切换自动更新。
 */
export function useColorScheme() {
  return useThemeContext().colorScheme
}
