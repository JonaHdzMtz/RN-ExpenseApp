import { StatusBar } from 'expo-status-bar';
import { Navigation } from './screens/navigation/Navigation';
import {ContextProvider } from './context/ContextProvider';
import { useFonts } from 'expo-font';
export default function App() {
  const [loaded, error] = useFonts({
    'SpaceMono-Regular': require("./assets/fonts/JetBrainsMonoNL-Regular.ttf"),
  });
  return (
    <ContextProvider>
      <Navigation />
      {/* <StatusBar style="auto" /> */}
    </ContextProvider>
  );
}

