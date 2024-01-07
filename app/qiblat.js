import React, { useState, useEffect } from "react";
import { Image, View, Text, Dimensions, Vibration } from "react-native";
import { Grid, Col, Row } from "react-native-easy-grid";
import { Magnetometer } from "expo-sensors";
import { AntDesign } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

export default App = () => {
  const [subscription, setSubscription] = useState(null);
  const [magnetometer, setMagnetometer] = useState(0);

  useEffect(() => {
    _toggle();
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((data) => {
        setMagnetometer(_angle(data));
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const _angle = (magnetometer) => {
    let angle = 0;
    if (magnetometer) {
      let { x, y, z } = magnetometer;
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }
    return Math.round(angle);
  };

  const _direction = (degree) => {
    if (degree >= 22.5 && degree < 67.5) {
      return "NE";
    } else if (degree >= 67.5 && degree < 112.5) {
      return "E";
    } else if (degree >= 112.5 && degree < 157.5) {
      return "SE";
    } else if (degree >= 157.5 && degree < 202.5) {
      return "S";
    } else if (degree >= 202.5 && degree < 247.5) {
      return "SW";
    } else if (degree >= 247.5 && degree < 292.5) {
      return "W";
    } else if (degree >= 292.5 && degree < 312) {
      if (degree === 293) {
        Vibration.vibrate(400);
      } else if (degree === 311) {
        Vibration.vibrate(400);
      } else {
        Vibration.vibrate(50);
      }
      return "True";
    } else if (degree >= 313 && degree < 337.5) {
      return "NW";
    } else {
      return "N";
    }
  };

  // Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)
  const _degree = (magnetometer) => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };

  // console.log(_degree(magnetometer));

  return (
    <Grid style={{ backgroundColor: "rgb(40,100,120)" }}>
      <Row style={{ alignItems: "center" }} size={0.9}>
        <Col style={{ alignItems: "center" }}>
          {_direction(_degree(magnetometer)) === "True" ? (
            <Text
              style={{
                color: "white",
                fontSize: height / 26,
                fontWeight: "bold",
              }}
            >
              <AntDesign name="checkcircle" size={40} color="white" />
            </Text>
          ) : (
            <Text
              style={{
                color: "white",
                fontSize: height / 26,
                fontWeight: "bold",
              }}
            >
              {_direction(_degree(magnetometer))}
            </Text>
          )}
        </Col>
      </Row>

      <Row style={{ alignItems: "center" }} size={2}>
        <Col style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/qibla.png")}
            style={{
              height: width - 30,
              justifyContent: "center",
              alignItems: "center",
              resizeMode: "contain",
              transform: [{ rotate: 23 - magnetometer + "deg" }],
            }}
          />
        </Col>
      </Row>
    </Grid>
  );
};
