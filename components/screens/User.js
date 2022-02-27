import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';


const User = ({navigation}) => {

  signOutUser = async () => {
        try {
            await navigation.reset({
                index: 0,
                routes: [{name:'Profile'}]
            });
            // firebase.auth().signOut();
            
        } catch (e) {
            console.log(e);
        }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Hallo Ulil ! </Text>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={signOutUser}> 
        <Text style={styles.loginText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9E5FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#0043F9',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#A3B8FE',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: 'blue',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 2,
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    letterSpacing: 2,
  },
  forget: {
    color: 'black',
    fontSize: 16,
    marginTop: 10,
  },
  masuk: {
    color: 'blue',
    fontSize: 18,
    marginTop: 10,
    letterSpacing: 1,
  },
});

export default User;
