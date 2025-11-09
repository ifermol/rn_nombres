import AsyncStorage from "@react-native-async-storage/async-storage";
import { Probabilidad } from "../data/Tipos";

async function guardarProbabilidad(nombre:string, probabilidad:Array<Probabilidad>) {
    const json = JSON.stringify(probabilidad)
    await AsyncStorage.setItem(nombre, json)
}

async function consultarProbabilidadOffline(nombre:string) {
    let lista = []
    const json = await AsyncStorage.getItem(nombre)

    if(json!=null){
        lista = JSON.parse(json)
    }
    return lista
}

async function borrarNombresOffline() {
    await AsyncStorage.clear()
}

export { guardarProbabilidad, consultarProbabilidadOffline, borrarNombresOffline}