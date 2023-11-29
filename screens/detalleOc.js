import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import {  } from "react-native";

import firebaseApp from "../FirebaseConfig";

const database = getFirestore(firebaseApp);

function detalleOc({route}) {
    const { oc } = route.params;

    const [ocUser, setOcUser] = useState();

    useEffect(() => {
        async function getOcUser() {
            try {
                const res = await getDoc(doc(database, "Perfil", oc.IdUsuario));
                setOcUser(res.data().Username);
            } catch(e) {
                console.log("e", e);
            }
            //console.log(res.data());

            //setOcUser(res.data().Username);
        }

        getOcUser();
    }, [])

    return (
        <View style={styles.container}>
            <Text>Oc de {ocUser}</Text>
            <Text>Se alcanzo {oc.Resultado}</Text>
            <img style={{position: "relative !important"}} src={oc.Imagen} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        flexWrap: "wrap",
        maxWidth: "100%",
        maxHeight: "100%"
    },
});

export default detalleOc;