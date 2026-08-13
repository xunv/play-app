import { Picker } from '@react-native-picker/picker'
import { useRef, useState } from 'react'
import { Animated, Modal, Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { ThemedText } from '@/components/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'

export type RegionValue = [provinceIndex: number, cityIndex: number]

type RegionPickerProps = {
  /** 省 -> 市/区 列表的二级数据 */
  data: Record<string, string[]>
  value: RegionValue
  onChange: (value: RegionValue) => void
  /** 弹层标题 */
  title?: string
  /** 主题强调色(完成按钮) */
  accentColor?: string
}

/**
 * 省市双列级联选择器:点击触发框后从底部拉起原生滚轮(UIPickerView)。
 * 封装了 Modal、工具栏、双列联动,页面只需传 data/value/onChange。
 */
export function RegionPicker({
  data,
  value,
  onChange,
  title = '选择地区',
  accentColor = '#007AFF',
}: RegionPickerProps) {
  const insets = useSafeAreaInsets()
  // modalVisible 控制 Modal 挂载;退场动画播完后才卸载,避免生硬消失
  const [modalVisible, setModalVisible] = useState(false)
  // 遮罩淡入淡出 / 面板滑入滑出 两个独立动画,模拟原生 ActionSheet 效果
  const backdropOpacity = useRef(new Animated.Value(0)).current
  const sheetTranslate = useRef(new Animated.Value(300)).current

  const openSheet = () => {
    backdropOpacity.setValue(0)
    sheetTranslate.setValue(300)
    setModalVisible(true)
  }

  // Modal 挂载完成后(onShow)再播入场动画,避免首帧闪烁
  const animateIn = () => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(sheetTranslate, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const closeSheet = () => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(sheetTranslate, {
        toValue: 300,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) setModalVisible(false)
    })
  }

  const textColor = useThemeColor({}, 'text')
  const borderColor = useThemeColor(
    { light: '#D1D1D6', dark: '#3A3A3C' },
    'background',
  )
  const sheetBg = useThemeColor(
    { light: '#F2F2F7', dark: '#1C1C1E' },
    'background',
  )

  const provinceNames = Object.keys(data)
  const [provinceIdx, cityIdx] = value
  const cityList = data[provinceNames[provinceIdx]] ?? []

  return (
    <>
      <Pressable
        onPress={openSheet}
        style={[styles.trigger, { borderColor, backgroundColor: sheetBg }]}
      >
        <ThemedText>
          {provinceNames[provinceIdx]} {cityList[cityIdx]}
        </ThemedText>
        <ThemedText style={styles.chevron}>›</ThemedText>
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
        onShow={animateIn}
        onRequestClose={closeSheet}
      >
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={closeSheet} />
        </Animated.View>
        <Animated.View
          style={[
            styles.sheet,
            {
              backgroundColor: sheetBg,
              paddingBottom: insets.bottom + 8,
              transform: [{ translateY: sheetTranslate }],
            },
          ]}
        >
          <View
            style={[styles.sheetHeader, { borderBottomColor: borderColor }]}
          >
            <Pressable onPress={closeSheet} hitSlop={8}>
              <ThemedText style={styles.sheetAction}>取消</ThemedText>
            </Pressable>
            <ThemedText type="defaultSemiBold">{title}</ThemedText>
            <Pressable onPress={closeSheet} hitSlop={8}>
              <ThemedText style={[styles.sheetAction, { color: accentColor }]}>
                完成
              </ThemedText>
            </Pressable>
          </View>
          <View style={styles.pickerRow}>
            <Picker
              style={styles.picker}
              itemStyle={{ color: textColor }}
              selectedValue={provinceIdx}
              onValueChange={(v) => onChange([v as number, 0])}
            >
              {provinceNames.map((name, index) => (
                <Picker.Item key={name} label={name} value={index} />
              ))}
            </Picker>
            <Picker
              style={styles.picker}
              itemStyle={{ color: textColor }}
              selectedValue={cityIdx}
              onValueChange={(v) => onChange([provinceIdx, v as number])}
            >
              {cityList.map((name, index) => (
                <Picker.Item key={name} label={name} value={index} />
              ))}
            </Picker>
          </View>
        </Animated.View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  chevron: {
    fontSize: 20,
    opacity: 0.4,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sheetAction: {
    fontSize: 16,
    color: '#8E8E93',
  },
  pickerRow: {
    flexDirection: 'row',
  },
  picker: {
    flex: 1,
    height: 200,
  },
})
