import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Animated,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLOURS} from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDatabase, ref, child, get} from 'firebase/database';

const ProductInfo = ({route, navigation}) => {
  const {productID} = route.params;
  const [items, setItems] = useState([]);

  const [product, setProduct] = useState({});

  const width = Dimensions.get('window').width;

  const scrollX = new Animated.Value(0);

  let position = Animated.divide(scrollX, width);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     getData();
      
  //   });
  //   getDataFromDB();
  //   return unsubscribe;
  // }, [navigation]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (items !== []) {
      getDataFromDB();
    }
  }, [items]);

  // get data
  const dbRef = ref(getDatabase());
  const getData = () => {
    get(child(dbRef, `items`))
      .then(snapshot => {
        if (snapshot.exists()) {
          let data = snapshot.val() ? snapshot.val() : {};
          let produkData = {...data};

          setItems(Object.values(produkData));
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
    };
    
  const getDataFromDB = async () => {
    console.log(items)
    for (let index = 0; index < items.length; index++) {
      if (items[index].id == productID) {
        await setProduct(items[index]);
        return;
      }
    }
  };

  //menambahkan product ke cart

  const addToCart = async id => {
    let itemArray = await AsyncStorage.getItem('cartItems');
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      array.push(id);

      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        ToastAndroid.show(
          'Berhasil di Tambahkan ke Keranjang',
          ToastAndroid.SHORT,
        );
        navigation.navigate('Home');
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        ToastAndroid.show(
          'Berhasil di Tambahkan ke Keranjang',
          ToastAndroid.SHORT,
        );
        navigation.navigate('Home');
      } catch (error) {
        return error;
      }
    }
  };

  // menampilkan foto 3 product

  const renderProduct = ({item, index}) => {
    return (
      <View
        style={{
          width: width,
          height: 240,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{uri: item}}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.bg,
        position: 'relative',
      }}>
      <StatusBar
        backgroundColor={COLOURS.backgroundLight}
        barStyle="dark-content"
      />
      <ScrollView>
        <View
          style={{
            width: '100%',
            backgroundColor: COLOURS.biru,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 4,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 16,
              paddingLeft: 16,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Entypo
                name="chevron-left"
                style={{
                  fontSize: 18,
                  color: COLOURS.backgroundDark,
                  padding: 12,
                  backgroundColor: COLOURS.white,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={product.productImageList ? product.productImageList : null}
            horizontal
            renderItem={renderProduct}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.8}
            snapToInterval={width}
            bounces={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
          />
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
              marginTop: 32,
            }}>
            {product.productImageList
              ? product.productImageList.map((data, index) => {
                  let opacity = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.2, 1, 0.2],
                    extrapolate: 'clamp',
                  });
                  return (
                    <Animated.View
                      key={index}
                      style={{
                        width: '16%',
                        height: 2.4,
                        backgroundColor: COLOURS.black,
                        opacity,
                        marginHorizontal: 4,
                        borderRadius: 100,
                      }}></Animated.View>
                  );
                })
              : null}
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 6,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 8,
            }}>
            <Entypo
              name="shopping-bag"
              style={{
                fontSize: 18,
                color: COLOURS.black,
                marginRight: 6,
              }}
            />
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.black,
              }}>
              Detail Produk
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 2,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                letterSpacing: 0.5,
                marginVertical: 4,
                color: COLOURS.black,
                maxWidth: '84%',
              }}>
              {product.productName}
            </Text>
            <Ionicons
              name="link-outline"
              style={{
                fontSize: 24,
                color: COLOURS.blue,
                backgroundColor: COLOURS.blue + 10,
                padding: 8,
                borderRadius: 100,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 13,
              color: COLOURS.black,
              fontWeight: '400',
              letterSpacing: 1,
              opacity: 0.5,
              lineHeight: 20,
              maxWidth: '85%',
              maxHeight: 46,
              marginBottom: 18,
            }}>
            {product.description}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 10,
              borderBottomColor: COLOURS.backgroundMedium,
              borderBottomWidth: 1,
              paddingBottom: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '80%',
                alignItems: 'center',
              }}>
              <View
                style={{
                  color: COLOURS.blue,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 12,
                  marginRight: 10,
                }}>
                <Entypo
                  name="location"
                  style={{
                    fontSize: 24,
                    color: COLOURS.blue,
                  }}
                />
              </View>
              <Text style={{
                color: COLOURS.backgroundDark,
              }}>Jln R.Sudibyo Temanggung {'\n'} 56261</Text>
            </View>
            <Entypo
              name="chevron-right"
              style={{
                fontSize: 22,
                color: COLOURS.backgroundDark,
              }}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 16,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                maxWidth: '85%',
                color: COLOURS.black,
                marginBottom: 4,
              }}>
              Rp.{product.productPrice}
            </Text>
            <Text>
              Ongkir 2% Rp.{product.productPrice / 20} (Rp.
              {product.productPrice + product.productPrice / 20})
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          height: '8%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => (product.isAvailable ? addToCart(product.id) : null)}
          style={{
            width: '86%',
            height: '90%',
            backgroundColor: COLOURS.blue,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              letterSpacing: 1,
              color: COLOURS.white,
              textTransform: 'uppercase',
            }}>
            {product.isAvailable ? 'Tambah ke Keranjang' : 'Stok Kosong'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductInfo;
