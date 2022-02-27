import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import {getDatabase, ref, child, get} from 'firebase/database';

const Profile = ({navigation}) => {
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState();
  const [users, SetUser] = useState();


  const dbRef = ref(getDatabase());
  const getData = () => {
    get(child(dbRef, `users`))
      .then(snapshot => {
        if (snapshot.exists()) {
          let data = snapshot.val() ? snapshot.val() : {};
          let produkData = {...data};

          SetUser(Object.values(produkData));
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
    };  

    useEffect(() => {
      getData();
    }, []);

    const handleSubmit = () => {
      let data=[]
      for (let index = 0; index < users.length; index++) {
        if (users[index].email == email && users[index].password == password) {
          data.push(users[index]);
          const storeData = async data => {
            try {
              const jsonValue = JSON.stringify(data);
              await AsyncStorage.setItem('userData', jsonValue);
              SetEmail('');
              SetPassword('');
              // 
            } catch (e) {
            }
          };
          navigation.navigate('Beranda');
          ToastAndroid.show('Login successfully.', ToastAndroid.SHORT);
          storeData(data);
        } else {
          ToastAndroid.show('Email or Password incorrect.', ToastAndroid.SHORT);
        }
      }
    };


  // const AuthLogin = async () => {
  //   try {
  //     setLoading({
  //       loadingLogin:true
  //     })
  //     const response = await fetch(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8e8_6kOcE2SKWm8DykV4hsd81hkcywsc',
  //       {
  //         method: "POST",
  //         headers: {
  //           'Content-type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           email: email,
  //           password: password,
  //           returnSecureToken: true,
  //         })
  //       });
  //       const resData = await response.json()
  //       if(response.ok){
  //         await navigation.navigate('Beranda')
  //       }else {
  //         Alert.alert('Error !',resData.error.message,[{
  //           text:'Okay'
  //         }])
  //       }
  //       setLoading({loadingLogin:false})
  //   } catch (error) {
  //       console.log(error)
  //       setLoading({loadingLogin:false})
  //   }

    
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Masuk </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email.."
          placeholderTextColor="#003f5c"
          onChangeText={text => {
            SetEmail(text);
          }}
          value={email}
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
          value={password}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {handleSubmit()}}>
        <Text style={styles.loginText}>Masuk</Text>
      </TouchableOpacity>
      <Text style={styles.forget}>Belum punya akun ?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Text style={styles.masuk}>Daftar</Text>
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

export default Profile;
