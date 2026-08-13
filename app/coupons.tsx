import { Stack } from 'expo-router'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'

type Coupon = {
  id: string
  amount: number
  threshold: number
  title: string
  scope: string
  expiresAt: string
  status: 'available' | 'used' | 'expired'
  type: 'discount' | 'cash' | 'shipping'
}

const coupons: Coupon[] = [
  {
    id: 'c1',
    type: 'cash',
    amount: 30,
    threshold: 200,
    title: '满减券',
    scope: '全场通用',
    expiresAt: '2026-09-30 到期',
    status: 'available',
  },
  {
    id: 'c2',
    type: 'discount',
    amount: 85,
    threshold: 0,
    title: '折扣券',
    scope: '仅限服饰品类',
    expiresAt: '2026-08-31 到期',
    status: 'available',
  },
  {
    id: 'c3',
    type: 'cash',
    amount: 10,
    threshold: 0,
    title: '无门槛券',
    scope: '全场通用',
    expiresAt: '2026-12-31 到期',
    status: 'available',
  },
  {
    id: 'c4',
    type: 'shipping',
    amount: 8,
    threshold: 0,
    title: '运费券',
    scope: '仅限生鲜品类',
    expiresAt: '2026-08-20 到期',
    status: 'available',
  },
  {
    id: 'c5',
    type: 'cash',
    amount: 50,
    threshold: 300,
    title: '满减券',
    scope: '仅限数码品类',
    expiresAt: '2026-07-10 到期',
    status: 'used',
  },
  {
    id: 'c6',
    type: 'cash',
    amount: 20,
    threshold: 99,
    title: '满减券',
    scope: '仅限美妆品类',
    expiresAt: '2026-06-30 到期',
    status: 'expired',
  },
]

function formatAmount(coupon: Coupon) {
  if (coupon.type === 'discount') return `${coupon.amount / 10} 折`
  if (coupon.type === 'shipping') return `免 ${coupon.amount}`
  return `¥${coupon.amount}`
}

function formatCondition(coupon: Coupon) {
  if (coupon.type === 'discount') return '折扣优惠'
  if (coupon.threshold === 0) return '无门槛'
  return `满 ¥${coupon.threshold} 可用`
}

function CouponCard({
  coupon,
  borderColor,
  mutedColor,
}: {
  coupon: Coupon
  borderColor: string
  mutedColor: string
}) {
  const isDisabled = coupon.status !== 'available'
  const amount = formatAmount(coupon)
  const condition = formatCondition(coupon)
  const isDiscount = coupon.type === 'discount'

  return (
    <View
      style={[styles.card, { borderColor }, isDisabled && styles.cardDisabled]}
    >
      <View
        style={[
          styles.amountBox,
          isDiscount && styles.amountBoxDiscount,
          isDisabled && styles.amountBoxDisabled,
        ]}
      >
        <ThemedText
          style={[styles.amountText, isDisabled && styles.amountTextDisabled]}
        >
          {amount}
        </ThemedText>
        <ThemedText
          style={[styles.amountHint, isDisabled && styles.amountTextDisabled]}
        >
          {coupon.type === 'shipping'
            ? '运费'
            : coupon.type === 'discount'
              ? '折扣'
              : '满减'}
        </ThemedText>
      </View>
      <View style={styles.divider}>
        {Array.from({ length: 8 }).map((_, i) => (
          <View
            key={i}
            style={[styles.notch, { backgroundColor: mutedColor }]}
          />
        ))}
      </View>
      <View style={styles.info}>
        <ThemedText
          type="defaultSemiBold"
          style={isDisabled && styles.textDisabled}
        >
          {coupon.title}
        </ThemedText>
        <ThemedText style={[styles.scope, isDisabled && styles.textDisabled]}>
          {condition} · {coupon.scope}
        </ThemedText>
        <ThemedText style={[styles.expires, isDisabled && styles.textDisabled]}>
          {coupon.expiresAt}
        </ThemedText>
      </View>
      <View style={[styles.action, isDisabled && styles.actionDisabled]}>
        <ThemedText
          style={[styles.actionText, isDisabled && styles.textDisabled]}
        >
          {coupon.status === 'available'
            ? '立即使用'
            : coupon.status === 'used'
              ? '已使用'
              : '已过期'}
        </ThemedText>
      </View>
    </View>
  )
}

export default function CouponsScreen() {
  const insets = useSafeAreaInsets()
  const backgroundColor = useThemeColor({}, 'background')
  const cardBorder = useThemeColor({}, 'tint')
  const muted = useThemeColor({}, 'icon')

  const available = coupons.filter((c) => c.status === 'available')
  const others = coupons.filter((c) => c.status !== 'available')

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: '我的优惠券',
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 32 },
        ]}
      >
        <ThemedText type="subtitle" style={styles.heading}>
          可使用 ({available.length})
        </ThemedText>
        {available.map((coupon) => (
          <CouponCard
            key={coupon.id}
            coupon={coupon}
            borderColor={cardBorder}
            mutedColor={muted}
          />
        ))}

        {others.length > 0 && (
          <>
            <ThemedText type="subtitle" style={styles.heading}>
              不可使用 ({others.length})
            </ThemedText>
            {others.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                borderColor={cardBorder}
                mutedColor={muted}
              />
            ))}
          </>
        )}
      </ScrollView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  heading: {
    marginTop: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    minHeight: 96,
  },
  cardDisabled: {
    opacity: 0.55,
  },
  amountBox: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
  },
  amountBoxDiscount: {
    backgroundColor: '#FF9500',
  },
  amountBoxDisabled: {
    backgroundColor: '#8E8E93',
  },
  amountText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  amountHint: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
  },
  amountTextDisabled: {
    color: '#E5E5EA',
  },
  divider: {
    width: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  notch: {
    width: 8,
    height: 2,
    borderRadius: 1,
  },
  info: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 4,
  },
  scope: {
    fontSize: 13,
    opacity: 0.7,
  },
  expires: {
    fontSize: 12,
    opacity: 0.5,
    marginTop: 2,
  },
  action: {
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionDisabled: {
    opacity: 0.8,
  },
  actionText: {
    color: '#FF3B30',
    fontSize: 13,
    fontWeight: '600',
    borderWidth: 1,
    borderColor: '#FF3B30',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  textDisabled: {
    color: '#8E8E93',
  },
})
