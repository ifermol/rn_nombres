import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { Probabilidad } from '../data/Tipos'

type ItemProps= {
    item: Probabilidad
    
}

export default function ItemPaisProbabilidad({item}:ItemProps) {
  return (
    <View style={styles.container}>
      <Image
        source={`https://flagsapi.com/${item.country_id}/flat/64.png`}
        style={styles.icono}
        contentFit='contain'
      />
      <View>
        <Text style={styles.textoPais}> {item.pais}</Text>
        <Text style={styles.textoProbabilidad}>
            Probabilidad: {Math.round(100 * item.probability)} %
        </Text> 
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding:12,
        marginVertical:6,
        marginHorizontal:16,
        borderRadius:10,
        backgroundColor: "#fff",
        alignItems: "center",
        elevation:2,
        shadowColor:"#000",
        shadowOffset: {width:0, height:1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    textoPais:{
        fontSize: 16,
        fontWeight: "600",
        color: "#333"
    },

    icono: {
        width: 64,
        height: 48,
        borderRadius: 12,
    },
    textoProbabilidad: {
        fontSize: 14,
        color: "#666",
        marginTop:2
    }
})