import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions'; 

export default class TransactionScreen extends Component {

  constructor(props){

    super(props);
    this.state={

      domState : "normal",
      haveCameraPermissions : null,
      scanned : false,
      scannedData : "",
      bookID : "",
      studentID : ""

    }

  }

  getCameraFunction = async domState =>{

    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({

      haveCameraPermissions : status === "granted",
      domState : domState,
      scanned : false,

    })

  }

  handleBarCodeScanned = async({type, data}) =>{

    const { domState } = this.state;

    if(domState === "bookID"){


      this.setState({

        bookID : data,
        domState : "normal",
        scanned : true
  
      })

    }

    else if (domState === "studentID"){

      this.setState({

        studentID : data,
        domState : "normal",
        scanned : true

    })

    

  }

}

  render() {

    const {domState, haveCameraPermissions, scannedData, scanned, bookID, studentID} = this.state

    if (domState !== "normal") {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

    return (
      <View style={styles.container}>

      <View style={styles.lowerContainer}>
        <View style={styles.textinputContainer}>
          <TextInput style={styles.textinput} 
          placeholder={"Book ID"}
          placeholderTextColor="white"
          value={bookID}/>
        
        <TouchableOpacity style={styles.scanButton} onPress={()=>this.getCameraFunction("bookID")}>
        <Text style={styles.scanbuttonText}>Scan</Text></TouchableOpacity>

      </View>

      <View style={styles.textinputContainer}>
          <TextInput style={styles.textinput} 
          placeholder={"Student ID"}
          placeholderTextColor="white"
          value={studentID}/>
        
        <TouchableOpacity style={styles.scanButton} onPress={()=>this.getCameraFunction("studentID")}>
        <Text style={styles.scanbuttonText}>Scan</Text></TouchableOpacity>

      </View>
      </View>

        <Text>
          {haveCameraPermissions ? scannedData:"request for the camera permission"}
        </Text>
        <Text style={styles.text}>Transaction Screen</Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  upperContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  appIcon: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 80
  },
  appName: {
    width: 80,
    height: 80,
    resizeMode: "contain"
  },
  lowerContainer: {
    flex: 0.5,
    alignItems: "center"
  },
  textinputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#9DFD24",
    borderColor: "#FFFFFF"
  },
  textinput: {
    width: "57%",
    height: 50,
    padding: 10,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: "#5653D4",
    fontFamily: "Rajdhani_600SemiBold",
    color: "#FFFFFF"
  },
  scanbutton: {
    width: 100,
    height: 50,
    backgroundColor: "#9DFD24",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  scanbuttonText: {
    fontSize: 24,
    color: "#0A0101",
    fontFamily: "Rajdhani_600SemiBold"
  }
});