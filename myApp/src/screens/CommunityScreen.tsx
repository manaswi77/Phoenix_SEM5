import { View, Text, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { setCurrentScreen } from "../contexts/screenSlice";

const CommunityScreen = () => {
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
      <Text>CommunityScreen</Text>
    </View>
  );
};

export default CommunityScreen;
