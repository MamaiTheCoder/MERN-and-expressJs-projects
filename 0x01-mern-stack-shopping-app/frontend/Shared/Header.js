import React from 'react'
import { Image, SafeAreaView } from 'react-native'

function Header() {
  return (
    <SafeAreaView style={styles.header}>
      <Image
        source={require('../assets/Logo.png')}
      />
    </SafeAreaView>
  )
}

export default Header
