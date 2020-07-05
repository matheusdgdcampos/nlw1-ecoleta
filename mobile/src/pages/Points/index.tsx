import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { SvgUri } from "react-native-svg";
import api from "../../services/api";
import * as Location from "expo-location";

import styles from "./styles";

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface IPoint {
  id: number;
  name: string;
  image: string;
  latitude: number;
  longitude: number;
}

const Points = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<IPoint[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [inicialPosition, setInicialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Desculpe...",
          "Precisamos de sua permissão para obter a geolocalização."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      setInicialPosition([latitude, longitude]);
    })();
  }, []);

  useEffect(() => {
    api.get("items").then((response) => setItems(response.data));
  }, []);

  useEffect(() => {
    (async () => {
      const response = await api.get("points", {
        params: {
          city: "Rio de Janeiro",
          uf: "RJ",
          items: [1, 2],
        },
      });
      console.log(response.data);
      setPoints(response.data);
    })();
  }, []);

  function handleSelectedItem(id: number) {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleNavigateToDetail(id: number) {
    navigation.navigate("Detail", { point_id: id });
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
          {inicialPosition[0] !== 0 && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: inicialPosition[0],
                longitude: inicialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {points.map((point) => (
                <Marker
                  key={String(point.id)}
                  style={styles.mapMarker}
                  onPress={() => handleNavigateToDetail(point.id)}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image
                      style={styles.mapMarkerImage}
                      source={{
                        uri: point.image,
                      }}
                    />
                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          )}
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {items.map((items) => (
            <TouchableOpacity
              key={items.id}
              style={[
                styles.item,
                selectedItems.includes(items.id) ? styles.selectedItem : {},
              ]}
              onPress={() => handleSelectedItem(items.id)}
              activeOpacity={0.6}
            >
              <SvgUri width={42} height={42} uri={items.image_url} />
              <Text style={styles.itemTitle}>{items.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};
export default Points;
