import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { consultarProbabilidades } from './helpers/ConsultasApi'
import { Probabilidad } from './data/Tipos'
import ItemPaisProbabilidad from './components/itemPaisProbabilidad'


export default function App() {



  const [nombre, setNombre] = useState("")
  const [listaProbabilidades, setListaProbabilidades] = useState<Array<Probabilidad>>([])


  function botonPulsado(){

    if(validarNombre()){
    consultarProbabilidades(nombre)
        .then( respuesta => setListaProbabilidades(respuesta))
        .catch( error => Alert.alert("Error", error.toString()))
    }else {
      Alert.alert("Error", "El nombre no puede dejarse vacío")
    }
   
  }

  function validarNombre(){
    return nombre.trim() !==""
  }

  return (
    <View style={styles.contenedorPrincipal}>
      <View style={styles.fila}>
      <TextInput style={styles.cuadroTexto} value={nombre} onChangeText={setNombre}/>
      <Pressable style={({pressed}) => pressed? styles.botonPresionado : styles.boton} onPress={() =>botonPulsado()}>
        <Text style={styles.textoBoton}>Consultar</Text>
      </Pressable>
      </View>
      <FlatList
        data={listaProbabilidades}
        renderItem={ItemPaisProbabilidad}
        keyExtractor={ (item) => item.country_id}
        ListEmptyComponent={ () => <Text style={{margin:"auto"}}>No se han encontrado resultados</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  contenedorPrincipal:{
    flex:1,
    backgroundColor:"#f3f4f6"
  },

  fila:{
    flex:1,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    padding:20,
    columnGap:20,
    maxHeight:200
  },
  cuadroTexto:{
    flex:1,
    backgroundColor:"#fff",
    paddingVertical: 12,
    paddingHorizontal:16,
    borderRadius: 8,
    borderColor:"#d1D5DB",
    borderWidth:1,
    fontSize: 16,
    color: "#111827"
  },
  botonPresionado:{
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor:"#1E40AF",

  },
  boton:{
    backgroundColor:"#2563EB",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBoton:{
    color:"#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
})