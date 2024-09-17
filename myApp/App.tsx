import React from "react";
import { ScreenProvider } from "./src/contexts/HomeScreenContext";
import HomeScreen from "./src/screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";

const App: React.FC = () => {
  return (
    <ScreenProvider>
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    </ScreenProvider>
  );
};

export default App;
