import { StyleSheet } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

export default function SettingsScreen() {
  return (
    <ThemedView style={styles.container}>
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
        <ThemedText type="subtitle">关于</ThemedText>
        <ThemedText>版本信息、开源许可等</ThemedText>
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  section: {
    gap: 4,
  },
})
