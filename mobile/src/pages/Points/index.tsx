import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MapView from "react-native-maps";
import { SvgUri } from "react-native-svg";

import styles from "./styles";

const Points = () => {
  const navigation = useNavigation();

  function handleNavigateBack() {
    navigation.goBack();
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Text style={styles.title}>Bem vindo.</Text>
        <Text style={styles.description}>
          Encontre no mapa um ponto de coleta
        </Text>

        <View style={styles.mapContainer}>
          <MapView style={styles.map} />
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <SvgUri width={42} height={42} uri="" />
        </TouchableOpacity>
      </View>
    </>
  );
};
export default Points;
