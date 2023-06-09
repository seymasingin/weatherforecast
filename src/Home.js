import React, {useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions, SafeAreaView, TextInput, ImageBackground, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function Home() {

  const navigation = useNavigation();
  const key= "5f84a809fae644b996791850230705"; 
  const [search, setSearch] = useState ('Ankara');
  const [city, setCity] = useState({location:{name:""},current:{temp_c:0},
                                    forecast:{forecastday:[{date:'', day:{mintemp_c:0},hour:[{time:"",temp_c:0},{time:"",temp_c:0},{time:"",temp_c:0},{time:"",temp_c:0},{time:"",temp_c:0}]},
                                                          {date:'',day:{mintemp_c:0}},
                                                          {date:'',day:{mintemp_c:0}},
                                                          ]}});
  
  weekdays= ["Sunday", "Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday"]
 
  useEffect(()=>{
    return() =>  axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${search}&days=3&aqi=no&alerts=no`)
      .then(response=>setCity(response.data)) 
      .catch(function (error) {
        console.log(error);
      })
    }
    , [search] );

    const getBackgroundImage = () => {
      if (city.current.temp_c > 25) {
        return require('./assets/sunny.jpg');
      } else if (city.current.temp_c < 20) {
        return require('./assets/cloud.jpg');
      } else {
        return require('./assets/rainy.jpg');
      }
    };

    const getWeekContent = weekdays => {
      let content = [];
      for (let i = 0; i < 3; i++) {
        const item = weekdays[i];
        content.push(<View key={Math.random(10)} style={styles.futday}><Text  style={styles.futuredays}>{weekdays[((new Date(city.forecast.forecastday[i].date)).getDay())]}</Text>
                            <Text  style={styles.max}>{Math.round(city.forecast.forecastday[i].day.maxtemp_c)}</Text>
                            <Text  style={styles.min}>{Math.round(city.forecast.forecastday[i].day.mintemp_c)}</Text></View>);
      }
      return content;
    };

    const getDayContent = () => {
      let content = []
      for (let i=0; i<5; i++){
        content.push(<View key={Math.random(10)} style={styles.hour_container}>
          <Text style={styles.hour}>{new Date(city.forecast.forecastday[0].hour[i].time).getHours().toString().padStart(2,"0")}</Text>
        <Text>{city.forecast.forecastday[0].hour[i].temp_c}</Text></View>)
      }
      return content;
    }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ImageBackground source={getBackgroundImage()} resizeMode="stretch" style={styles.image}>
      <View style={styles.number}>
        <View style={styles.search_container}>
          <TextInput  style={styles.search} value= {search} onChangeText={(text) => setSearch(text)} />
        </View>
        <View style={styles.current}>
          <Text style={styles.region}>{city.location.name}</Text>
          <Text style={styles.current_deg}>{city.current.temp_c}°C</Text>
        </View>
      </View>
      <View style={styles.hours}>
        {getDayContent()}
      </View>
      <View style={styles.days}>
        {getWeekContent(weekdays)}
      </View>
      <View style={styles.slider}>
      <Image style={styles.logo} source={require("./assets/logo.png")}/>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon style={styles.icon} name='list-outline' size={30}/>
        </TouchableOpacity>   
      </View>
      </ImageBackground>
   
    </KeyboardAvoidingView>
  )
}

const styles= {
  container:{flex:1, flexDirection: 'column'},
  image:{flex:1, height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,},
  current:{flexDirection: "column", alignItems: 'center', marginTop: 20, },
  current_deg:{ color:'black', fontSize:40, fontWeight:'bold'},
  number:{flex:9 ,margin:10, borderBottomWidth:1, borderColor: 'aliceblue' },
  region:{color:'black',fontSize:35, fontWeight:'bold'},
  search_container:{flexDirection: "row", margin:15, borderWidth: 1, borderRadius: 10, alignItems:'center'},
  search:{ fontWeight:'bold', },
  max:{color:'white',fontSize:18, fontWeight:'bold', paddingRight:30 },
  min:{ color:'gainsboro', fontSize:18, justifyContent:'flex-end', paddingRight:10},
  futuredays:{flexDirection:'column', marginRight:200, color: 'white',fontSize:18, fontWeight:'bold', },
  search_icon:{marginLeft:20, position: "absolute"},
  hours:{flex:4, flexDirection: "row", margin:10,borderBottomWidth:1, borderColor: 'aliceblue',justifyContent:'space-around' },
  hour:{color:'gainsboro',fontSize:18 },
  hour_container:{flexDirection:'column', marginLeft:25, marginRight:25, alignItems:'center', justifyContent:'center'},
  days:{ flex:6,margin:10,borderBottomWidth:1, borderColor: 'aliceblue',justifyContent:'space-around'   },
  futday:{flexDirection:'row', alignSelf:'flex-end', },
  slider:{flex:1,margin:10, flexDirection: "row", height:60,
  width:Dimensions.get("window").width, 
  alignItems:'center', },
  logo:{height: 50, width: 50, alignItems:'center',},
  icon:{marginLeft:290, color: 'white'},
}


