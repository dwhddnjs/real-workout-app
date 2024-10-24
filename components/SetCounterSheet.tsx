import { StyleSheet } from "react-native"
import React, { forwardRef, useCallback, useMemo, useState } from "react"
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet"
import { Picker } from "@react-native-picker/picker"
import Colors from "@/constants/Colors"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Text, View } from "./Themed"
import { Button } from "./Button"
import { countData, setData, setTypeData } from "@/constants/constants"
import { usePlanStore } from "@/hooks/use-plan-store"

interface SetCountSheetProps {
  onClose: () => void
}

export const SetCounterSheet = forwardRef<BottomSheet, SetCountSheetProps>(
  ({ onClose }, ref) => {
    const [picker, setPicker] = useState({
      set: "본 세트",
      count: "8 + α",
    })
    const { setSetWithCount, setWithCount } = usePlanStore()

    const onSelectedPicker = (type: string, value: string) => {
      setPicker({
        ...picker,
        [type]: value,
      })
    }

    const onSetPlanStore = () => {
      setSetWithCount({ ...picker, id: setWithCount.length + 1 })
      onClose()
    }

    const snapPoints = useMemo(() => ["50%"], [])
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...props}
        />
      ),
      []
    )

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: Colors.dark.itemColor }}
        handleIndicatorStyle={{ backgroundColor: Colors.dark.subText }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            paddingTop: 14,
            backgroundColor: Colors.dark.itemColor,
          }}
        >
          <View
            style={{
              width: "50%",
              backgroundColor: Colors.dark.itemColor,
            }}
          >
            <Text style={styles.title}>세트 유형</Text>
            <Picker
              selectedValue={picker.set}
              onValueChange={(itemValue, itemIndex) =>
                onSelectedPicker("set", itemValue)
              }
            >
              {setTypeData.map((item) => (
                <Picker.Item
                  key={item}
                  label={String(item)}
                  value={item}
                  color={Colors.dark.text}
                  fontFamily="sb-b"
                />
              ))}
            </Picker>
          </View>

          <View
            style={{
              width: "50%",
              backgroundColor: Colors.dark.itemColor,
            }}
          >
            <Text style={styles.title}>반복 횟수</Text>
            <Picker
              selectedValue={picker.count}
              onValueChange={(itemValue, itemIndex) =>
                onSelectedPicker("count", itemValue)
              }
            >
              {countData.map((item) => (
                <Picker.Item
                  key={item}
                  label={item}
                  value={item}
                  color={Colors.dark.text}
                  fontFamily="sb-b"
                />
              ))}
            </Picker>
          </View>
        </View>
        <View
          style={{ paddingBottom: 44, backgroundColor: Colors.dark.itemColor }}
        >
          <Button type="solid" onPress={onSetPlanStore}>
            완료
          </Button>
        </View>
      </BottomSheet>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
  },
  title: {
    fontSize: 16,
    fontFamily: "sb-m",
    textAlign: "center",
    color: Colors.dark.text,
  },
  successButton: {
    backgroundColor: Colors.dark.tint,
    paddingVertical: 14,
    marginHorizontal: 24,
    marginBottom: 44,
    borderRadius: 12,
  },
})
