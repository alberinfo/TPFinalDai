import { useContext, useEffect } from "react";
import { View } from "react-native-web";
import UserContext from "../context/context";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import firebaseApp from "../FirebaseConfig";

const database = getFirestore(firebaseApp);

function Home() {
    const context = useContext(UserContext);

    const navigation = useNavigation();

    useEffect(() => {
        async function checkCompleteUser() {
            const res = await getDoc(doc(database, "User", context.user.uid));

            console.log("CheckCompleteUser", res.data());

            if(res.data().CPU === "Unknown") navigation.navigate("CompletarPerfil");
            else  context.setComputadoraUser(res.data());
        }

        checkCompleteUser();
    }, [])

    return (
        <View>
            oh my man
        </View>
    )
}

export default Home;