import { StyleSheet } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.avatarSection}>
        <ThemedView style={styles.avatar}>
          <ThemedText type="title" style={styles.avatarText}>
            我
          </ThemedText>
        </ThemedView>
        <ThemedText type="subtitle">用户名</ThemedText>
        <ThemedText>user@example.com</ThemedText>
      </ThemedView>
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">我的订单</ThemedText>
        <ThemedText>查看历史订单和物流信息</ThemedText>
      </ThemedView>
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">我的收藏</ThemedText>
        <ThemedText>收藏的商品和店铺</ThemedText>
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
  avatarSection: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
  },
  section: {
    gap: 4,
  },
})
