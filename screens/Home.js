import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, Button } from "react-native-web";
import UserContext from "../context/context";
import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import firebaseApp from "../FirebaseConfig";

const database = getFirestore(firebaseApp);

function Home() {
    const [ocs, setOcs] = useState([]);
    
    const context = useContext(UserContext);

    const navigation = useNavigation();

    useEffect(() => {
        async function checkCompleteUser() {
            const res = await getDoc(doc(database, "Perfil", context.user.uid));

            //console.log("RES", res.data());

            if(res.data().CPU === "Unknown") navigation.navigate("CompletarPerfil");
            else context.setComputadoraUser(res.data());
        }

        checkCompleteUser();
    }, [])

    useEffect(() => {
        async function getOcs() { //getOverclocks
            const res = await getDocs(collection(database, "Ocs"));

            console.log(res);

            const registros = res.docs.map(registro => registro.data());

            console.log("registros", registros);

            setOcs(registros);
        }

        getOcs();
    }, [context.reloadOcs])

    return (
        <View style={styles.container}>
            <View style={styles.containerOc}>
                <Text>BLCK OCs</Text>
                {ocs.filter(oc => oc.TipoOc === "MOBO").map(oc => (
                    <View style={styles.oc}>
                        <Text>{oc.TipoOc}</Text>
                        <Image src={oc.Imagen} />
                        <Button title="Ver Mas Detalle" onPress={() => navigation.navigate("detalleOc", {oc: oc})} />
                    </View>
                ))}
                <Button title="añadir oc" style={{marginTop: "1%"}} onPress={() => navigation.navigate("addOc", {type:"MOBO"})}/>
            </View>
            <View style={styles.containerOc}>
                <Text>CPU OC</Text>
                {ocs.filter(oc => oc.TipoOc === "CPU").map(oc => (
                    <View style={styles.oc}>
                        <Text>{oc.Resultado}</Text>
                        <Image src={oc.Imagen} />
                        <Button title="Ver Mas Detalle" onPress={() => navigation.navigate("detalleOc", {oc: oc})} />
                    </View>
                ))}
                <Button title="añadir oc" style={{marginTop: "1%"}} onPress={() => navigation.navigate("addOc", {type:"CPU"})}/>
            </View>
            <View style={styles.containerOc}>
                <Text>RAM OC</Text>
                {ocs.filter(oc => oc.TipoOc === "RAM").map(oc => (
                    <View style={styles.oc}>
                        <Text>{oc.Resultado}</Text>
                        <Image src={oc.Imagen} />
                        <Button title="Ver Mas Detalle" onPress={() => navigation.navigate("detalleOc", {oc: oc})} />
                    </View>
                ))}
                <Button title="añadir oc" style={{marginTop: "1%"}} onPress={() => navigation.navigate("addOc", {type:"RAM"})}/>
            </View>
            <View style={styles.containerOc}>
                <Text>GPU OC</Text>
                {ocs.filter(oc => oc.TipoOc === "GPU").map(oc => (
                    <View style={styles.oc} >
                        <Text>{oc.Resultado}</Text>
                        <Image src={oc.Imagen} />
                        <Button title="Ver Mas Detalle" onPress={() => navigation.navigate("detalleOc", {oc: oc})} />
                    </View>
                ))}
                <Button title="añadir oc" style={{marginTop: "1%"}} onPress={() => navigation.navigate("addOc", {type:"GPU"})}/>
            </View>
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
    },
    containerOc: {
        marginRight: "4rem",
        padding: "1rem"
    },
    oc: {
        border: "1px solid grey",
        borderRadius: "10%",
        marginTop: "2%",
        marginBottom: "2%"
    }
});

export default Home;