import Colors from "@/constants/Colors"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import { TouchableOpacity, useColorScheme } from "react-native"
import XIcon from "@expo/vector-icons/Feather"
import "react-native-reanimated"
import ArrowIcon from "@expo/vector-icons/AntDesign"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { BottomSheetProvider } from "@gorhom/bottom-sheet/lib/typescript/contexts"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import Checkcircle from "@expo/vector-icons/AntDesign"
import { useNoteStore } from "@/hooks/use-note-store"
import { usePlanStore } from "@/hooks/use-plan-store"
import {
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"
import { useUser } from "@/hooks/use-user"

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router"

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "sb-b": require("../assets/fonts/SB_B.otf"),
    "sb-l": require("../assets/fonts/SB_L.otf"),
    "sb-m": require("../assets/fonts/SB_M.otf"),
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RootLayoutNav />
    </QueryClientProvider>
  )
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()
  //   const { setUser } = useUser()

  //   useEffect(() => {
  //     supabase.auth.onAuthStateChange((_event, session) => {
  //       setUser(session)
  //     })
  //   }, [])

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: Colors[colorScheme ?? "light"].background,
              },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(modals)/select-type"
              options={({ navigation }) => ({
                presentation: "modal",
                headerTitle: "",
                headerStyle: {
                  borderBottomWidth: 0,
                  elevation: 0,
                  shadowOpacity: 0,
                  backgroundColor: "#1a1a1a",
                },
                headerShadowVisible: false,

                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <XIcon
                      name="x"
                      size={30}
                      color={Colors[colorScheme ?? "light"].subText}
                    />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="(modals)/note"
              options={({ navigation }) => ({
                presentation: "modal",
                headerTitle: "",
                headerStyle: {
                  borderBottomWidth: 0,
                  elevation: 0,
                  shadowOpacity: 0,
                  backgroundColor: "#1a1a1a",
                },
                headerShadowVisible: false,

                headerLeft: () => (
                  <TouchableOpacity style={{ marginLeft: 3, marginTop: 18 }}>
                    <XIcon
                      name="x"
                      size={30}
                      color={Colors[colorScheme ?? "light"].subText}
                    />
                  </TouchableOpacity>
                ),
                headerRight: () => {
                  const { title, content } = useNoteStore()
                  const { setPlanValue } = usePlanStore()
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setPlanValue("title", title)
                        setPlanValue("content", content)
                        navigation.goBack()
                      }}
                      style={{ marginRight: 8, marginTop: 18 }}
                    >
                      <Checkcircle
                        name="checkcircle"
                        size={30}
                        color={Colors[colorScheme ?? "light"].tint}
                      />
                    </TouchableOpacity>
                  )
                },
              })}
            />
            <Stack.Screen
              name="add-plan/[slug]"
              options={({ navigation }) => ({
                headerTitle: "",
                headerStyle: {
                  borderBottomWidth: 0,
                  elevation: 0,
                  shadowOpacity: 0,
                  backgroundColor: "#1a1a1a",
                },
                headerShadowVisible: false,

                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowIcon
                      name="left"
                      size={28}
                      color={Colors[colorScheme ?? "light"].subText}
                    />
                  </TouchableOpacity>
                ),
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ marginRight: 8 }}
                  >
                    <Checkcircle
                      name="checkcircle"
                      size={30}
                      color={Colors[colorScheme ?? "light"].tint}
                    />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="auth/sign-in"
              options={({ navigation }) => ({
                headerTitle: "",
                headerStyle: {
                  borderBottomWidth: 0,
                  elevation: 0,
                  shadowOpacity: 0,
                  backgroundColor: "#1a1a1a",
                },
                headerShadowVisible: false,
                animation: "slide_from_bottom",

                headerLeft: () => (
                  <TouchableOpacity
                    style={{ marginLeft: 4 }}
                    onPress={() => navigation.goBack()}
                  >
                    <XIcon
                      name="x"
                      size={30}
                      color={Colors[colorScheme ?? "light"].subText}
                    />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="auth/sign-up"
              options={({ navigation }) => ({
                headerTitle: "회원가입",
                headerStyle: {
                  borderBottomWidth: 0,
                  elevation: 0,
                  shadowOpacity: 0,
                  backgroundColor: "#1a1a1a",
                },
                headerTitleStyle: {
                  fontFamily: "sb-m",
                },
                // headerShadowVisible: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{ marginLeft: 6 }}
                    onPress={() => navigation.goBack()}
                  >
                    <ArrowIcon
                      name="left"
                      size={24}
                      color={Colors[colorScheme ?? "light"].subText}
                    />
                  </TouchableOpacity>
                ),
                // headerRight: () => (
                //   <TouchableOpacity
                //     onPress={() => navigation.goBack()}
                //     style={{ marginRight: 8 }}
                //   >
                //     <Checkcircle
                //       name="checkcircle"
                //       size={30}
                //       color={Colors[colorScheme ?? "light"].tint}
                //     />
                //   </TouchableOpacity>
                // ),
              })}
            />
          </Stack>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  )
}
