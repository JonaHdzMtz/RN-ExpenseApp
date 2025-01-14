import { StatusBar } from 'expo-status-bar';
import { Navigation } from './screens/navigation/Navigation';
import {ContexProvider } from './context/ContextProvider';
export default function App() {
  return (
    <ContexProvider>
      <Navigation />
      {/* <StatusBar style="auto" /> */}
    </ContexProvider>
  );
}

