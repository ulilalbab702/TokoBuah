import React from 'react'
import { StyleSheet, Text, View,StatusBar,Image } from 'react-native'


const Splash = ({navigation}) => {

    setTimeout(()=>{
        navigation.replace('Profile')
    },3000)
    return (
        <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#D9E5FE'}} >
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#465bd8" />
            <Image source={require('../database/images/a.png')} style={{width:280,height:280}}  />    
            <Text style={{fontFamily:'OpenSans-Bold',fontSize:30,color:'black',fontWeight:'bold', textAlign:'center'}} >Selamat Datang 
            {'\n'} di App Toko Buah</Text>
        </View>
    )
}

export default Splash;

const styles = StyleSheet.create({})