import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  Modal,
  TextInput,
  RefreshControl,
} from "react-native";
//
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
} from "react-native-fontawesome";
//
import Icon from "react-native-vector-icons/FontAwesome";
//
const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

export default function App() {
  // data
  const [unit, setUnit] = useState("C");
  const [q, setQ] = useState("Berhampore,Murshidabad,Westbangal");
  const [data, setData] = useState(null);
  const testData = {
    coord: { lon: 88.2667, lat: 24.1833 },
    weather: [
      { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
    ],
    base: "stations",
    main: {
      temp: 300.96,
      feels_like: 297.68,
      temp_min: 300.96,
      temp_max: 300.96,
      pressure: 1011,
      humidity: 27,
      sea_level: 1011,
      grnd_level: 1008,
    },
    visibility: 10000,
    wind: { speed: 3.72, deg: 287 },
    clouds: { all: 2 },
    dt: 1610443627,
    sys: { country: "IN", sunrise: 1610412724, sunset: 1610451472 },
    timezone: 19800,
    id: 1262412,
    name: "Murshidābād",
    cod: 200,
  };

  // functions
  const realTime = (epc) => {
    const myDate = new Date(epc * 1000);
    const a = myDate.toLocaleString();
    const b = a.split(",");
    const dateStr = b[1].replace(" ", "");
    // alert(dateStr);
    return dateStr;
  };

  // realTime(data.sys.sunrise);

  // celcious
  const changeToC = (klvn) => {
    const c = (klvn - 273.15).toFixed(1);
    return c;
  };

  // farenhite
  const changeToF = (klvn) => {
    const f = ((klvn - 273.15) * (9 / 5) + 32).toFixed(1);
    return f;
  };

  // 1 hPa = 0.000987 atm
  const changeToAtm = (hPa) => {
    const atm = Number(hPa) * 0.000987;
    return atm.toFixed(1);
  };

  const Refresh=()=>{
    setData(null);
    CALL_API();
  }

  const API_KEY = "ff05f8c09dfd8d8f97450980f607a648";
  const API_URI = `http://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${API_KEY}`;

  const setIcon = () => {
    const iconCode = data !== null && data.weather[0].icon;
    // icon url
    const iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
    return iconUrl;
  };
  // use effect
  const NoDataFound = () => {
    return (
      <View style={[s.row]}>
        <View style={[s.col]}>
          <Text style={[styles.textCloudy]}>{data.message}</Text>
        </View>
      </View>
    );
  };

  //  loadng
  const Loading = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: "100px",
        }}
      >
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  };
  // test componet
  const [modalVisible, setModalVisible] = useState(false);
  const InputComp = () => {
    // alert("modal")
    return (
      <View>
        <TextInput />
      </View>
    );
  };

  // call api
  const CALL_API = () => {
    fetch(API_URI)
      .then((response) => response.json())
      .then((data) => {
        console.log("res data ", data);
        setData(data);
        // setIcon()
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    CALL_API();
    // setTimeout(() => {
    //   CALL_API()
    // }, 10000)
  }, []);

  // main component
  return (
    <View style={[s.body]}>
      {data == null ? (
        Loading()
      ) : // ModalComp()
      data.cod === 200 ? (
        <>
          {/* {InputComp()} */}
          <View style={[styles.card, styles.bg, s.mb1]}>
            <View style={[styles.cardBody]}>
              {/* row 1 */}
              <View style={[s.row]}>
                <View
                  style={[
                    s.col,
                    { justifyContent: "center", marginLeft: "15px" },
                  ]}
                >
                  {/*  */}
                  <View style={[s.row]}>
                    <View style={[s.col, { justifyContent: "flex-start" }]}>
                      <TouchableOpacity
                        onPress={() => {
                          alert("Berhampore, Murshidabad, Westbengal");
                        }}
                      >
                        <Text style={[styles.text, { textAlign: "center" }]}>
                          {data.name}, {data.sys.country}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {/*  */}
                  <View style={[s.row, s.mt3]}>
                    <View style={[s.col2]}>
                      <img src={setIcon()} />
                    </View>
                    <View style={[s.col9]}>
                      <Text
                        style={[
                          styles.textCloudy,
                          { textAlign: "left", marginTop: "10px" },
                        ]}
                      >
                        {data.weather[0].description}
                      </Text>
                    </View>
                  </View>
                  {/*  */}
                </View>
              </View>
              {/* row 2 */}
              <View style={[s.row]}>
                {/* current temp*/}
                <View
                  style={[
                    s.col10,
                    { justifyContent: "center", alignItems: "center" },
                  ]}
                >
                  <Text style={[styles.tempText]}>
                    {unit === "C"
                      ? changeToC(data.main.temp)
                      : changeToF(data.main.temp)}
                    &deg;<Text style={styles.dg}>{unit}</Text>
                  </Text>
                </View>
                {/* max min temp */}
                <View
                  style={[
                    s.col5,
                    s.mt4,
                    {
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#9FA8DA",
                    },
                  ]}
                >
                  <Text style={[styles.mmText]}>
                    {changeToC(data.main.temp_max)}&deg;{unit}
                  </Text>
                  <hr style={{ width: "50%", color: "#9FA8DA" }} />
                  <Text style={[styles.mmText]}>
                    {changeToC(data.main.temp_min)}&deg;{unit}
                  </Text>
                </View>
                {/*  */}
              </View>
              {/* <Button title="refresh" /> */}
              {/* <TouchableOpacity onPress={()=>alert("pressed!")}  style={[s.btnTouchable]}>
              <View style={[s.btn, s.btnPrimary]}>
                <Text style={[s.btnText, s.btnPrimaryText]}>Signup</Text>
              </View>
            </TouchableOpacity> */}
              {/*  */}
            </View>
          </View>
          {/* CARD 2 */}
          <View style={[styles.card, styles.bg]}>
            <View style={[styles.cardBody]}>
              {/* row */}
              <View style={[s.row]}>
                <View style={[s.col]}>
                  <Text style={[styles.opText]}>Sun rise</Text>
                </View>
                <View style={[s.col, { textAlign: "end" }]}>
                  <Text style={[styles.infoText]}>
                    {realTime(data.sys.sunrise)}
                  </Text>
                </View>
              </View>
              {/* row */}
              <View style={[s.row]}>
                <View style={[s.col]}>
                  <Text style={[styles.opText]}>Sun set</Text>
                </View>
                <View style={[s.col, { textAlign: "end" }]}>
                  <Text style={[styles.infoText]}>
                    {realTime(data.sys.sunset)}
                  </Text>
                </View>
              </View>
              {/*  */}
            </View>
          </View>
          {/* CARD 3 */}
          <View style={[styles.card, styles.bg]}>
            <View style={[styles.cardBody]}>
              {/* row */}
              <View style={[s.row]}>
                <View style={[s.col10]}>
                  <Text style={[styles.opText]}>Temperature (&deg;C)</Text>
                </View>
                <View style={[s.col5, { textAlign: "end" }]}>
                  <Text style={[styles.infoText]}>
                    {changeToC(data.main.temp)}&deg;C
                  </Text>
                </View>
              </View>
              {/* row */}
              <View style={[s.row]}>
                <View style={[s.col10]}>
                  <Text style={[styles.opText]}>Temperature (&deg;F)</Text>
                </View>
                <View style={[s.col5, { textAlign: "end" }]}>
                  <Text style={[styles.infoText]}>
                    {changeToF(data.main.temp)}&deg;F
                  </Text>
                </View>
              </View>
              {/*  */}
            </View>
          </View>
          {/* CARD 4 */}
          <View style={[styles.card, styles.bg]}>
            <View style={[styles.cardBody]}>
              {/* row */}
              <View style={[s.row]}>
                <View style={[s.col10]}>
                  <Text style={[styles.opText]}>Max </Text>
                </View>
                <View style={[s.col4, { textAlign: "end" }]}>
                  <Text style={[styles.infoText]}>
                    {changeToC(data.main.temp_max)}&deg;{unit}
                  </Text>
                </View>
              </View>
              {/* row */}
              <View style={[s.row]}>
                <View style={[s.col10]}>
                  <Text style={[styles.opText]}>Min </Text>
                </View>
                <View style={[s.col4, { textAlign: "end" }]}>
                  <Text style={[styles.infoText]}>
                    {changeToC(data.main.temp_min)}&deg;{unit}
                  </Text>
                </View>
              </View>
              {/*  */}
            </View>
          </View>
          {/* CARD 5 */}
          <View style={[styles.card, styles.bg]}>
            <View style={[styles.cardBody]}>
              {/* row */}
              <View style={[s.row]}>
                <View style={[s.col10]}>
                  <Text style={[styles.opText]}>Humidity (%)</Text>
                </View>
                <View style={[s.col4, { textAlign: "end" }]}>
                  <Text style={[styles.infoText]}>{data.main.humidity}%</Text>
                </View>
              </View>
              {/* row */}
              <View style={[s.row]}>
                <View style={[s.col10]}>
                  <Text style={[styles.opText]}>Cloudiness (%)</Text>
                </View>
                <View style={[s.col4, { textAlign: "end" }]}>
                  <Text style={[styles.infoText]}>{data.clouds.all}%</Text>
                </View>
              </View>
              {/*  */}
            </View>
          </View>
          {/* CARD 6 */}
          <View style={[styles.card, styles.bg]}>
            <View style={[styles.cardBody]}>
              {/* row */}
              <View style={[s.row]}>
                <View style={[s.col10]}>
                  <Text style={[styles.opText]}>Pressure (atm)</Text>
                </View>
                <View style={[s.col4, { textAlign: "end" }]}>
                  <Text style={[styles.infoText]}>
                    {changeToAtm(data.main.pressure)}
                  </Text>
                </View>
              </View>
              {/* row */}
              <View style={[s.row]}>
                <View style={[s.col10]}>
                  <Text style={[styles.opText]}>Wind speed (m/s)</Text>
                </View>
                <View style={[s.col4, { textAlign: "end" }]}>
                  <Text style={[styles.infoText]}>{data.wind.speed}</Text>
                </View>
              </View>
              {/*  */}
            </View>
          </View>
          {/*  */}
          <View style={[s.row, s.mt3]}>
            <View style={[s.col, s.textCenter]}>
              <TouchableOpacity onPress={()=>{Refresh()}}>
                <Icon name="refresh" style={{fontSize: "30px", color: "#311B92"}} />
              </TouchableOpacity>
              {/* <Button
                onPress={()=>{Refresh()}}
                title="Learn More"
                color="#841584"
              /> */}
            </View>
          </View>
        </>
      ) : (
        <>
          {NoDataFound()}
          {/* {InputComp()} */}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    // flex: 1,
    backgroundColor: "#311B92",
  },
  textCloudy: {
    fontSize: "20px",
    fontWeight: "500",
    color: "#9FA8DA",
    alignItems: "center",
  },
  text: {
    fontSize: "25px",
    fontWeight: "600",
    color: "#9FA8DA",
    alignItems: "center",
  },
  tempText: {
    fontSize: "70px",
    fontWeight: "600",
    // color: "#18FFFF",
    color: "#29B6F6",
  },
  dg: {
    fontSize: "50px",
    fontWeight: "500",
    color: "#18FFFF",
  },
  mmText: {
    fontSize: "25px",
    fontWeight: "500",
    color: "#9FA8DA",
  },
  opText: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#9FA8DA",
  },
  infoText: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#18FFFF",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    margin: 5,
    marginBottom: 5,

    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 3,
    },

    shadowOpacity: 0.7,
    shadowRadius: 5.49,
  },

  //
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
