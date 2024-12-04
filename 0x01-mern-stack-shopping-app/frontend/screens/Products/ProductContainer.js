import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';

import ProductList from './ProductList';

const data = require('../../assets/data/products.json');

var { height } = Dimensions.get('window')

function ProductContainer() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data);

    return () => {
      setProducts([]);
    };
  });
  return (
    <View>
      <Text>Products container</Text>
      <View style={{marginTop: 100}}>
      <FlatList
        horizontal
        data={products}
        renderItem={({item}) => <ProductList key={item.id} item={item} />}
        keyExtractor={item => item.name}
      />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  listContainer: {
    height: height,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
      justifyContent: 'center',
      alignItems: 'center'
  }
});
export default ProductContainer;
