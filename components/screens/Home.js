import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import {COLOURS} from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {getDatabase, ref, child, get} from 'firebase/database';
import FIREBASE from '../appFirebase';

const Home = ({navigation}) => {

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true)
    return() => {
      BackHandler.addEventListener('hardwareBackPress', () => true)
    }
  }, [])

  const [products, setProducts] = useState([]);
  const [accessory, setAccessory] = useState([]);
  const [items, setItems] = useState([]);
  const [itemsKey, setItemsKey] = useState([])

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     getData();
  //   });
  //   filtering();
  //   return unsubscribe;
  // }, [navigation]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (items !== []) {
      filtering();
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
          setItemsKey(Object.keys(produkData));
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
    };
    // console.log(items);
    // console.log(items[1]);
    
    const filtering = () => {
    // console.log(items);

    let productsList = [];
    let accessoryList = [];

    for (let index = 0; index < items.length; index++) {
      if (items[index].category === 'product') {
        productsList.push(items[index]);
      } else if (items[index].category == 'accessory') {
        accessoryList.push(items[index]);
      }else { return; }
      
      setProducts(productsList);
      setAccessory(accessoryList);

      // console.log(crewneck)
    }
  };

  //menampilkan data

  // const getDataFromDB = () => {
  //   let productList = [];
  //   let accessoryList = [];
  //   for (let index = 0; index < Items.length; index++) {
  //     if (Items[index].category == 'product') {
  //       productList.push(Items[index]);
  //     } else if (Items[index].category == 'accessory') {
  //       accessoryList.push(Items[index]);
  //     }
  //   }

  //   setProducts(productList);
  //   setAccessory(accessoryList);
  // };


  const ProductCard = ({data}) => {
    return (
      <TouchableOpacity 
      onPress={() => navigation.navigate('ProductInfo', {productID: data.id})}
        style={{
        width: '48%',
        marginVertical: 14,
      }} >
        <View style={{
          width: '100%',
          height: 100,
          borderRadius: 10,
          backgroundColor: COLOURS.biru,
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 8,
        }}>
          {
            data.isOff ? (
              <View style={{
                position: 'absolute',
                width: '20%',
                height: '24%',
                backgroundColor: COLOURS.green,
                top: 0,
                left: 0,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Text style={{
                  fontSize: 12,
                  color: COLOURS.white,
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}>{data.offPercentage} %</Text>
              </View>
            ) : null
          }
          <Image source={{uri: data.productImage}} style={{
            width: '80%',
            height: '80%',
            resizeMode: 'contain',
          }} />
        </View>
        <Text  style={{
            fontSize: 12,
            color: COLOURS.black,
            fontWeight: '600',
            marginBottom: 2,
          }}>
          {data.productName}
        </Text>
        {
          data.category == 'accessory' ? data.isAvailable ? (
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <FontAwesome name="circle"
              style={{
                fontSize: 12,
                marginRight: 6,
                color: COLOURS.green,
              }} />
              <Text style={{
                fontSize: 12,
                color: COLOURS.green,
              }}>Tersedia</Text>
            </View>
          ) : (
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <FontAwesome name="circle"
              style={{
                fontSize: 12,
                marginRight: 6,
                color: COLOURS.red,
              }} />
              <Text style={{
                fontSize: 12,
                color: COLOURS.red,
              }}>Kosong</Text>
            </View>
          ) : null }
        <Text>
          Rp. {data.productPrice}
        </Text>
      </TouchableOpacity>
    )
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.bg,
      }}>
      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
          }}>
          <TouchableOpacity>
            <Entypo
              name="shop"
              style={{
                fontSize: 28,
                color: COLOURS.backgroundDark,
                padding: 10,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
            <MaterialCommunityIcons
              name="shopping"
              style={{
                fontSize: 20,
                color: COLOURS.backgroundDark,
                padding: 12,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLOURS.backgroundDark,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginBottom: 10,
            padding: 16,
          }}>
          <Text
            style={{
              fontSize: 26,
              color: COLOURS.black,
              fontWeight: '500',
              letterSpacing: 1,
              marginBottom: 10,
            }}>
            Toko Buah Wak Haji
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.black,
              fontWeight: '400',
              letterSpacing: 1,
              lineHeight: 24,
            }}>
            Tersedia Buah Lokal dan Import.
            {'\n'}Dengan kualitas terbaik
          </Text>
        </View>
        <View  style={{
            padding: 16,
          }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: COLOURS.black,
                fontWeight: '500',
                letterSpacing: 1,
              }}>
              Buah Lokal
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.black,
                fontWeight: '400',
                opacity: 0.5,
                marginLeft: 10,
              }}>
              2
            </Text>
          </View>
          <Text
              style={{
                fontSize: 14,
                color: COLOURS.blue,
                fontWeight: '400',
              }}>
              SeeAll
            </Text>
        </View>
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}>
        {products.map(data => {
              return <ProductCard data={data} key={data.id} />;
            })}
        </View>
        </View>

        {/* bagian bawah */}

        <View  style={{
            padding: 16,
          }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: COLOURS.black,
                fontWeight: '500',
                letterSpacing: 1,
              }}>
              Buah Import
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.black,
                fontWeight: '400',
                opacity: 0.5,
                marginLeft: 10,
              }}>
              4
            </Text>
          </View>
          <Text
              style={{
                fontSize: 14,
                color: COLOURS.blue,
                fontWeight: '400',
              }}>
              SeeAll
            </Text>
        </View>
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}>
        {accessory.map(data => {
              return <ProductCard data={data} key={data.id} />;
            })}
        </View>
        </View>

      </ScrollView>
    </View>
  );
};

export default Home;
