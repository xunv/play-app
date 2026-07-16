import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useThemeContext, type ThemePreference } from '@/contexts/ThemeContext'
import { useThemeColor } from '@/hooks/useThemeColor'

const THEME_OPTIONS: { key: ThemePreference; label: string }[] = [
  { key: 'system', label: '跟随系统' },
  { key: 'light', label: '浅色' },
  { key: 'dark', label: '深色' },
]

const ACCENT_COLOR = '#007AFF'

export default function SettingsScreen() {
  const insets = useSafeAreaInsets()
  const backgroundColor = useThemeColor({}, 'background')
  const { preference, setPreference } = useThemeContext()

  return (
    <View
      style={[styles.container, { backgroundColor, paddingTop: insets.top }]}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingTop: 16, paddingBottom: insets.bottom + 32 },
        ]}
      >
        <ThemedText type="title">设置</ThemedText>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">通用</ThemedText>
          <ThemedText>语言、外观、通知等设置项</ThemedText>
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">隐私与安全</ThemedText>
          <ThemedText>密码、权限、数据管理等</ThemedText>
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">通知</ThemedText>
          <ThemedText>推送、声音、免打扰时段</ThemedText>
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">显示与亮度</ThemedText>
          <ThemedText>选择应用外观(当前:{preference}）</ThemedText>
          <View style={styles.segment}>
            {THEME_OPTIONS.map((option) => {
              const active = preference === option.key
              return (
                <Pressable
                  key={option.key}
                  onPress={() => setPreference(option.key)}
                  style={[
                    styles.segmentItem,
                    { borderColor: ACCENT_COLOR },
                    active && { backgroundColor: ACCENT_COLOR },
                  ]}
                >
                  <ThemedText
                    style={[styles.segmentLabel, active && { color: '#fff' }]}
                  >
                    {option.label}
                  </ThemedText>
                </Pressable>
              )
            })}
          </View>
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">存储空间</ThemedText>
          <ThemedText>缓存清理、下载管理</ThemedText>
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">账号与同步</ThemedText>
          <ThemedText>登录信息、数据同步设置</ThemedText>
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">支付设置</ThemedText>
          <ThemedText>支付方式、免密支付</ThemedText>
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">帮助与反馈</ThemedText>
          <ThemedText>常见问题、意见反馈</ThemedText>
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">关于</ThemedText>
          <ThemedText>版本信息、开源许可等</ThemedText>
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">退出登录</ThemedText>
          <ThemedText>安全退出当前账号</ThemedText>
        </ThemedView>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    gap: 16,
  },
  section: {
    gap: 4,
  },
  segment: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  segmentItem: {
    flex: 1,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
  },
  segmentLabel: {
    fontSize: 14,
  },
})
