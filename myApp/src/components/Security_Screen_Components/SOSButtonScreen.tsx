import { StyleSheet, Text, View, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentFeature } from "../../contexts/securityFeatureSlice";

const SOSButtonScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isSOSButtonEnabled = useSelector(
    (state: RootState) => state.securityFeature.isSOSButtonEnabled
  );

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
    <View style={styles.SOSButtonMainContainer}>
      <Text>SOSButtonScreen</Text>
    </View>
  );
};

export default SOSButtonScreen;

const styles = StyleSheet.create({
  SOSButtonMainContainer: {},
});
