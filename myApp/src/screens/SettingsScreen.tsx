import { View, Text, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { setCurrentScreen } from "../contexts/screenSlice";

const SettingsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const backAction = () => {
      dispatch(setCurrentScreen("info"));
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [dispatch]);
  return (
    <View>
      <Text>SettingsScreen</Text>
    </View>
  );
};

export default SettingsScreen;
