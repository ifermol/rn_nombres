import AsyncStorage from "@react-native-async-storage/async-storage";

async function getNumeroNombresOffline():Promise<number> {
    const claves = await AsyncStorage.getAllKeys()
    return claves.length
    
}

async function existeNombre(nombre:string):Promise<boolean> {
    const claves = await AsyncStorage.getAllKeys()
    return claves.includes(nombre)
    
}

export { getNumeroNombresOffline, existeNombre }