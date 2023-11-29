import { useContext, useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-web';
import { TextInput } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../context/context.js';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import firebaseApp from "../FirebaseConfig";

const auth = getAuth(firebaseApp);

function Login() {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [result, setResult] = useState("");

    const context = useContext(UserContext);

    useEffect(() => {
        const userLS = JSON.parse(localStorage.getItem("user"));
        console.log("USERLS", userLS);
    
        if(userLS !== null) {
            context.setUser(userLS);
            navigation.navigate("Home");
        }
    }, []);

    async function handle(){
      try { 
        const resp = await signInWithEmailAndPassword(auth, email, pwd);

        context.setUser(resp.user);

        navigation.navigate("Home");
      } catch (e) {
        setResult("Usuario o contraseña incorrectas");
      }
    }
  
    return (
      <View style={styles.container}>
        <TextInput placeholder="email" onChangeText={(m) => setEmail(m)}/>
        <TextInput secureTextEntry={true} placeholder="contraseña" onChangeText={(pwd) => setPwd(pwd)} />
        <Button title="Enviar" onPress={handle}/>
  
        <Text>{result}</Text>
        <Button onPress={() => navigation.navigate("Registro")} title="no tengo cuenta"/>
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

export default Login;