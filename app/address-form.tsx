import { Stack } from 'expo-router'
import { useState } from 'react'
import {
  Alert,
  Pressable,
  StyleSheet,
  Switch,
  TextInput,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { RegionPicker, type RegionValue } from '@/components/RegionPicker'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'

const PROVINCES: Record<string, string[]> = {
  北京市: ['朝阳区', '海淀区', '东城区', '西城区'],
  上海市: ['浦东新区', '徐汇区', '静安区', '黄浦区'],
  广东省: ['广州市 天河区', '深圳市 南山区', '珠海市 香洲区'],
  浙江省: ['杭州市 西湖区', '宁波市 鄞州区'],
}
const PROVINCE_NAMES = Object.keys(PROVINCES)
const TAGS = ['家', '公司', '学校']
const ACCENT_COLOR = '#007AFF'

export default function AddressFormScreen() {
  const insets = useSafeAreaInsets()
  const textColor = useThemeColor({}, 'text')
  const tintColor = ACCENT_COLOR
  const borderColor = useThemeColor(
    { light: '#D1D1D6', dark: '#3A3A3C' },
    'background',
  )
  const inputBg = useThemeColor(
    { light: '#F2F2F7', dark: '#1C1C1E' },
    'background',
  )

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [region, setRegion] = useState<RegionValue>([0, 0])
  const [detail, setDetail] = useState('')
  const [tag, setTag] = useState(TAGS[0])
  const [isDefault, setIsDefault] = useState(false)

  const regionText = `${PROVINCE_NAMES[region[0]]} ${PROVINCES[PROVINCE_NAMES[region[0]]][region[1]]}`

  const canSubmit = name.trim() && phone.trim() && detail.trim()

  const handleSubmit = () => {
    Alert.alert(
      '保存成功',
      `${name} ${phone}\n${regionText} ${detail}\n标签:${tag}${isDefault ? ' · 默认地址' : ''}`,
    )
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: '新增收货地址',
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
      <KeyboardAwareScrollView
        bottomOffset={16}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 32 },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {/* 文本输入 */}
        <View style={styles.field}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            收货人
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              { color: textColor, borderColor, backgroundColor: inputBg },
            ]}
            placeholder="请输入姓名"
            placeholderTextColor="#8E8E93"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* 数字键盘输入 */}
        <View style={styles.field}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            手机号
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              { color: textColor, borderColor, backgroundColor: inputBg },
            ]}
            placeholder="请输入 11 位手机号"
            placeholderTextColor="#8E8E93"
            keyboardType="phone-pad"
            maxLength={11}
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        {/* 底部拉起滚轮选择(封装组件,自动处理弹层与双列联动) */}
        <View style={styles.field}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            所在地区
          </ThemedText>
          <RegionPicker
            data={PROVINCES}
            value={region}
            onChange={setRegion}
            accentColor={tintColor}
          />
        </View>

        {/* 多行输入 */}
        <View style={styles.field}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            详细地址
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              styles.textarea,
              { color: textColor, borderColor, backgroundColor: inputBg },
            ]}
            placeholder="街道、楼牌号等"
            placeholderTextColor="#8E8E93"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={detail}
            onChangeText={setDetail}
          />
        </View>

        {/* 分段选择 */}
        <View style={styles.field}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            地址标签
          </ThemedText>
          <View style={[styles.segment, { borderColor }]}>
            {TAGS.map((item, index) => {
              const selected = item === tag
              return (
                <Pressable
                  key={item}
                  onPress={() => setTag(item)}
                  style={[
                    styles.segmentItem,
                    index > 0 && {
                      borderLeftWidth: StyleSheet.hairlineWidth,
                      borderLeftColor: borderColor,
                    },
                    selected && { backgroundColor: tintColor },
                  ]}
                >
                  <ThemedText
                    style={selected ? styles.segmentTextActive : undefined}
                  >
                    {item}
                  </ThemedText>
                </Pressable>
              )
            })}
          </View>
        </View>

        {/* 开关 */}
        <View style={[styles.switchRow, { borderColor }]}>
          <ThemedText type="defaultSemiBold">设为默认地址</ThemedText>
          <Switch
            value={isDefault}
            onValueChange={setIsDefault}
            trackColor={{ true: tintColor }}
          />
        </View>

        {/* 提交按钮 */}
        <Pressable
          onPress={handleSubmit}
          disabled={!canSubmit}
          style={({ pressed }) => [
            styles.submit,
            { backgroundColor: tintColor },
            (!canSubmit || pressed) && styles.submitDimmed,
          ]}
        >
          <ThemedText style={styles.submitText}>保存</ThemedText>
        </Pressable>
      </KeyboardAwareScrollView>
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
    gap: 20,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  textarea: {
    minHeight: 80,
  },
  segment: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  segmentItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  segmentTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  submit: {
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 8,
  },
  submitDimmed: {
    opacity: 0.5,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})
