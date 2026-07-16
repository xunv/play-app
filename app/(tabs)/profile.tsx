import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'

export default function ProfileScreen() {
  const insets = useSafeAreaInsets()
  const backgroundColor = useThemeColor({}, 'background')

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
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">我的足迹</ThemedText>
          <ThemedText>最近浏览过的商品记录</ThemedText>
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">优惠券</ThemedText>
          <ThemedText>可用优惠券与红包</ThemedText>
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">收货地址</ThemedText>
          <ThemedText>管理常用收货地址</ThemedText>
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">我的评价</ThemedText>
          <ThemedText>待评价与历史评价</ThemedText>
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">客服与帮助</ThemedText>
          <ThemedText>联系客服、常见问题</ThemedText>
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">账户与安全</ThemedText>
          <ThemedText>登录设备、账号安全设置</ThemedText>
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">消息通知</ThemedText>
          <ThemedText>订单、活动、系统消息</ThemedText>
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">关于我们</ThemedText>
          <ThemedText>版本信息与用户协议</ThemedText>
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
