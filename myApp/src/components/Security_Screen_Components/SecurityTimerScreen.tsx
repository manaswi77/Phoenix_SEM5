import { StyleSheet, Text, View, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { setCurrentFeature } from "../../contexts/securitySlice";

const SecurityTimerScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const backAction = () => {
      dispatch(setCurrentFeature("features"));
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text>Security Timer Screen</Text>
    </View>
  );
};

export default SecurityTimerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
