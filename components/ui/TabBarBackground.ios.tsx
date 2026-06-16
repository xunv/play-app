import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function useBottomTabOverflow() {
  const { bottom } = useSafeAreaInsets()
  return bottom
}
