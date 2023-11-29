import { useContext, useEffect, useState } from "react";
import { StyleSheet } from 'react-native';
import { Button, TextInput, Text, View } from "react-native-web";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import firebaseApp from "../FirebaseConfig";
import UserContext from "../context/context";

const database = getFirestore(firebaseApp);

function CompletarPerfil() {
    const [Username, setUsername] = useState("");
    const [MOBO, setMOBO] = useState("");
    const [CPU, setCPU] = useState("");
    const [RAM, setRAM] = useState("");
    const [GPU, setGPU] = useState("");
    const [result, setResult] = useState("");

    const navigation = useNavigation();

    const context = useContext(UserContext);

    async function handle(){
      try {
        if(Username.length === 0 || CPU.length == 0 || RAM.length == 0 || MOBO.length == 0 || GPU.length == 0) {
            setResult("Hay campos vacios");
            return;
        }

        const _ = await updateDoc(doc(database, "Perfil", context.user.uid), {
            Username: Username,
            CPU: CPU,
            MOBO: MOBO,
            GPU: GPU,
            RAM: RAM
        });

        navigation.navigate("Home");
      } catch (e) {
        console.log("e:", e);
        setResult("There was an error while updating your data");
      }
    }
  
    return (
      <View style={styles.container}>
        <Text>Contanos mas sobre vos!</Text>

        <TextInput placeholder="Nombre de usuario" onChangeText={(m) => setUsername(m)}/>
        <TextInput placeholder="MOBO" onChangeText={(m) => setMOBO(m)}/>
        <TextInput placeholder="CPU" onChangeText={(m) => setCPU(m)}/>
        <TextInput placeholder="RAM" onChangeText={(m) => setRAM(m)}/>
        <TextInput placeholder="GPU" onChangeText={(m) => setGPU(m)}/>

        <Button title="Enviar" onPress={handle}/>

        <Button title="Despues lo completo" onPress={() => navigation.goBack()}/>
  
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

export default CompletarPerfil;