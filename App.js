import React from 'react';
import { YellowBox } from "react-native";
import Navigation from "./app/navigation/Navigation";
import { firebaseApp } from "./app/utils/firebase";

YellowBox.ignoreWarnings(["Setting a timer"]);

export default function App() {
  return <Navigation />;
}

