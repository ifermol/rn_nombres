import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type InformacionNombresProps = {
    totalNombresOnline:number,
    onPress ?: () => void
}

export default function InformacionNombres({totalNombresOnline, onPress}:InformacionNombresProps) {
  return (
    <Pressable onPress={onPress}>
      <Text>Nombres almacenados: {totalNombresOnline}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({})