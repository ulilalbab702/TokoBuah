import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

const Create = ({navigation}) => {

  const [email, Setemail] = useState();
  const [password, SetPassword] = useState();
  const [loading, setLoading] = useState({
    loadingLogin:false,
    loadingSign:false
  });

  const AuthSign = async () => {
    try {
      setLoading({loadingSign:true})
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8e8_6kOcE2SKWm8DykV4hsd81hkcywsc',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        },
      );
      const resData = await response.json()
        if(response.ok){
          await navigation.navigate('Create', Alert.alert('Akun Berhasil di buat'))
        }else {
          Alert.alert('Error !',resData.error.message,[{
            text:'Okay'
          }])
        }
        setLoading({loadingSign:false})
    } catch (error) {
      console.log(error)
      setLoading({loadingSign:false})
    }
    
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Daftar </Text>
      <View style={styles.inputView}>
      <TextInput
          style={styles.inputText}
          placeholder="Email.."
          placeholderTextColor="#003f5c"
          onChangeText={text => {
            Setemail(text);
          }}
        />
      </View>
      <View style={styles.inputView}>
      <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password.."
          placeholderTextColor="#003f5c"
          onChangeText={text => {
            SetPassword(text);
          }}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn}onPress={AuthSign}>
        {loading.loadingSign ? <ActivityIndicator size="small" color="white" /> : <Text style={styles.loginText}>Daftar</Text>}
      </TouchableOpacity>
      <Text style={styles.forget}>Sudah punya akun ?</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.masuk}>Masuk</Text>
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

export default Create;