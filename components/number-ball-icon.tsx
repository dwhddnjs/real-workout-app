import { StyleSheet } from "react-native"
import React from "react"
import { Text, View } from "./Themed"
import Colors from "@/constants/Colors"

export const NumberBallIcon = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.tint,
    borderRadius: 50,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    marginTop: 2,
    fontFamily: "sb-b",
    color: Colors.dark.text,
    textAlign: "center",
    fontSize: 12,
  },
})
