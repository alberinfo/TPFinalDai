import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { Text, StyleSheet, View, TextInput, Button } from "react-native-web";
import UserContext from "../context/context";
import { useNavigation } from "@react-navigation/native";

import firebaseApp from "../FirebaseConfig";

const database = getFirestore(firebaseApp);

function addOc({route}) {
    const navigation = useNavigation();

    const { type } = route.params;

    const [Imagen, setImagen] = useState("");
    const [URL, setURL] = useState("");
    const [Resultado, setResultado] = useState("");
    const [result, setResult] = useState("");

    const context = useContext(UserContext);

    async function handle(){
      try {
        if(Imagen.length === 0 || URL.length === 0) {
            setResult("Hay campos vacios");
            return;
        }

        const resp = await addDoc(collection(database, "Ocs"), {IdUsuario: context.user.uid, TipoOc: type, Imagen: Imagen, URL: URL, Resultado: Resultado});

        context.setReloadOcs(!context.reloadOcs);

        navigation.goBack();
      } catch (e) {
        console.log("e:", e);
        setResult("Hubo un error al subir los datos");
      }
    }
  
    return (
      <View style={styles.container}>
        <Text>Completa con los datos de tu OC. Como te fue?</Text>
        <TextInput placeholder="Imagen" onChangeText={(m) => setImagen(m)}/>
        <TextInput placeholder="Url" onChangeText={(m) => setURL(m)}/>
        <TextInput placeholder="Resultado del Oc" onChangeText={(m) => setResultado(m)}/>
        <Button title="Enviar" onPress={handle}/>
  
        <Text>{result}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default addOc;