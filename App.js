import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  Text,
  TextInput,
  ActivityIndicator,
  View,
  Button,
} from "react-native";

export default function App() {
  return (
    <SafeAreaView>
      <Wo />
    </SafeAreaView>
  );
}

function Wo() {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getMerc = async () => {
    try {
      setLoading(true);
      const caminhoApi = await fetch("https://teste-ld.onrender.com/api/produtos");
      const dadosApi = await caminhoApi.json();
      setProdutos(dadosApi.produtos);
    } catch (error) {
      setProdutos([]);
      alert("Houve um erro ao carregar os produtos");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMerc();
  }, []);
const Item = (props) => {
    return (
        <View>
            <Text>{props.item.nome}</Text>
        </View>
    )
}
  return (
    <View>
      <Text>Produtos: </Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          {/* <Image style={styles.img} source={{ uri: props.item.foto }}> </Image> */}
          <FlatList data={produtos} renderItem={({ item }) => <Item item={item} />} keyExtractor={(item) => "#" + item.id}></FlatList>
          {/* <Text>{slip.advice || "Não possui conselho carregado"}</Text> */}
        </View>
      )}
      
    </View>
  );
}