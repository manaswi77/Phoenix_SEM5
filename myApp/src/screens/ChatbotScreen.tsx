import { StyleSheet, Text, View, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { setCurrentScreen } from "../contexts/screenSlice";

const ChatbotScreen = () => {
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
      <Text>ChatbotScreen</Text>
    </View>
  );
};

export default ChatbotScreen;

const styles = StyleSheet.create({});
