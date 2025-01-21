import { StatusBar } from 'expo-status-bar';
import { Navigation } from './screens/navigation/Navigation';
import {ContextProvider } from './context/ContextProvider';
export default function App() {
  return (
    <ContextProvider>
      <Navigation />
      {/* <StatusBar style="auto" /> */}
    </ContextProvider>
  );
}

