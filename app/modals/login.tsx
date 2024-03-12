import { View, Text, StyleSheet, TextInput, TouchableOpacity,  } from "react-native";
import React from "react";
import { useWarmUpBrrowser } from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/Styles";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Ionicons } from "@expo/vector-icons";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

enum Stragy {
  Apple='oauth_apple',
  Google='oauth_google',
  Fecebook='oauth_facebook',
}


const  Page = () => {
  useWarmUpBrrowser();

  const router = useRouter();
  const {startOAuthFlow:appleAuth} = useOAuth ({ strategy: 'oauth_apple'})
  const {startOAuthFlow:googleAuth} = useOAuth ({ strategy: 'oauth_google'})
  const {startOAuthFlow:facebookAuth} = useOAuth ({ strategy: 'oauth_facebook'}) 

  const onSelecAuth = async (strategy: Stragy) =>{
    const selecteAuth = {
      [Stragy.Apple]: appleAuth,
      [Stragy.Google]: googleAuth,
      [Stragy.Fecebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive} = await googleAuth();
    
      if (createdSessionId) {
        setActive!({session: createdSessionId})
        router.back();
      }
    } catch (err){
      console.error('OAuth error:', err)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput 
        autoCapitalize="none"
        placeholder="Email" 
        style={[defaultStyles.inputField, {marginBottom: 30}]}
        />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

    <View style={styles.seperatorView}>
      <View 
      style={{
        flex: 1,
        borderBottomColor:'#000',
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
     />
     <Text style={styles.seperator}>or</Text>
     <View 
      style={{
        flex: 1,
        borderBottomColor:'#000',
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
     />
   </View>

   <View style={{ gap: 20}}>
       <TouchableOpacity style={styles.btnOtline}>
        <Ionicons name="call-outline" size={24}  style={defaultStyles.btnIcon} />
        <Text style={styles.btnOutlineText}>Cotinue with Phone</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.btnOtline} onPress={() => onSelecAuth(Stragy.Apple)}>
        <Ionicons name="logo-apple" size={24}  style={defaultStyles.btnIcon} />
        <Text style={styles.btnOutlineText}>Cotinue with Apple</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.btnOtline} onPress={() => onSelecAuth(Stragy.Google)}>
        <Ionicons name="logo-google" size={24}  style={defaultStyles.btnIcon} />
        <Text style={styles.btnOutlineText}>Cotinue with Google</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.btnOtline} onPress={() => onSelecAuth(Stragy.Fecebook)}>
        <Ionicons name="logo-facebook" size={24}  style={defaultStyles.btnIcon} />
       <Text style={styles.btnOutlineText}>Cotinue with Facebook</Text>
      </TouchableOpacity>
   </View>
  </View>
   
  ); 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding:26,
  },  
    seperatorView:{
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  seperator: {
    fontFamily: 'mon-sb',
    color: Colors.grey,
    },
  btnOtline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height:50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
});
export default Page