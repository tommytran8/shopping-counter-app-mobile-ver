import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image
} from 'react-native'

const Button = (props) => {
  return (
    <View style={styles.buttons}>
        <View style={styles.buttoncontainer}>
          <TouchableOpacity onPress={props.onClickAdd}>
            <Text style={styles.addsub}>{"+"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttoncontainer}>
          <TouchableOpacity onPress={props.onClickSub}>
            <Text style={styles.addsub}>{"-"}</Text>
          </TouchableOpacity>
        </View>
      <TouchableOpacity style={styles.trashcontainer} onPress={props.onClickTrash}>
        <Image style={styles.trash} source={require('./assets/trash.png')}/>
      </TouchableOpacity>
    </View>
  );
}
const DropdownList = (props) => {
    return (
      <View style={styles.dropDownList}>
        <TouchableOpacity onPress={ () => {props.onSelect("Cookies")}}>
        <Text style={styles.list}>{"Cookies"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {props.onSelect("Chocolate")}}>
          <Text style={styles.list}>{"Chocolate"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {props.onSelect("Chips")}}>
          <Text style={styles.list}>{"Chips"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {props.onSelect("Gummies")}}>
          <Text style={styles.list}>{"Gummies"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {props.onSelect("Lime")}}>
          <Text style={styles.list}>{"Lime"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {props.onSelect("Lemons")}}>
          <Text style={styles.list}>{"Lemons"}</Text>
        </TouchableOpacity>
      </View>
    );
}


/** Sample of correct code */
class Site extends Component {
  state = {
    itemlist: (new Map()).set("Cookies", "Zero"),
    currentItem : "Cookies",
  }

  handleincrement(item){
    this.state.itemlist.set(item, this.state.itemlist.get(item) === "Zero" ? 1 : this.state.itemlist.get(item)  + 1);
    this.setState({itemlist : this.state.itemlist});
  }
  handledecrement(item){
    this.state.itemlist.set(item , this.state.itemlist.get(item)  === "Zero" || this.state.itemlist.get(item) === 1 ? "Zero" : this.state.itemlist.get(item) - 1);
    this.setState({itemlist : this.state.itemlist});
  }
  handleClickTrash(item){
    this.state.itemlist.delete(item);
    this.setState({itemlist : this.state.itemlist});
  }
  handleRefresh(){
    this.state.itemlist.forEach((v, k) => {
      this.state.itemlist.set(k,"Zero");
    });
    this.setState({itemlist : this.state.itemlist});
  }
  handleSubmit(){
    if(!this.state.itemlist.get(this.state.currentItem)){
      this.state.itemlist.set(this.state.currentItem, "Zero");
    }
    this.setState({itemlist : this.state.itemlist});
    
  }

 render() {
    let output = [];
    this.state.itemlist.forEach((value, key)=>{
      output.push(
          <View style={styles.itemcontainer}>
            <View style={styles.container}>
              <Text style={styles.itemname}>{key}{": "}</Text>
            </View>
            <View style={styles.numcontainer}>
              <Text style={styles.itemname}>{value}</Text>
            </View>
            
            <Button 
              onClickAdd = {()=>{
                this.handleincrement(key);
              }}
              onClickSub = {()=>{
                this.handledecrement(key);
              }}
              onClickTrash = {()=>{
                this.handleClickTrash(key);
              }}
            />
          </View>
      )
    });
    let numofItems = 0;
    this.state.itemlist.forEach((value, key)=>{
      if (value !== "Zero"){
        numofItems += 1;
      }
    });
    return (
    <View style={styles.site}>
      <View style={styles.header}>
        <Text style={styles.title}>{'Shopping Cart'}</Text>
        <View style={styles.nav}>
          <Image style={styles.cart} source={require('./assets/cart.png')}/>
          <View style={styles.numofItemsContainer}>
            <Text style={styles.numofItems}>{numofItems}</Text>
          </View>
          <Text style={styles.navText}>Items</Text>
          
          <TouchableOpacity onPress={() => {this.handleRefresh()}}>
            <Image style={styles.refresh} source={require('./assets/refresh.png')}/> 
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        {output}
        <View style={styles.dropDown}> 
          <Text style={styles.currentItem}>{"Choose an item: "}{this.state.currentItem}</Text>
          <DropdownList
            onSelect={(item)=>{this.setState({currentItem: item})}}
          />
          <TouchableOpacity style={styles.addCart} onPress={() => {this.handleSubmit()}}>
              <Text >{"Add to Cart"}</Text>
          </TouchableOpacity>
        </View>
        
        
      </View>
     
        
    </View>
    )
  }
}

const styles = StyleSheet.create({
  site: {

  },
  header: {
    width: '100%',
    backgroundColor: 'antiquewhite',
    paddingTop: 30,
    paddingBottom: 10,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    
  },
  nav: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingTop: 20,
  },
  numofItems: {
    color: "aliceblue",
    fontSize: 17,
    fontWeight: "bold",
    alignSelf: "center",
  },
  numofItemsContainer: {
    borderRadius: 25,
    borderColor: "rgb(78, 216, 170)",
    backgroundColor: "rgb(78, 216, 170)",
    borderWidth: 2,
    alignSelf: "center",
    width: 55,
    height: 25
  },
  navText: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 10,
    alignSelf: "center",
  },
  body: {
    //display: none
  },
  refresh: {
    width: 40,
    height:  40,
    marginLeft: 20
  },
  cart: {
    width:  40,
    height:  40,
    marginRight: 20
  },
  itemcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    
  },
  buttons: {
    flexDirection: 'row',
  },
  itemname: {
    alignSelf: 'center',
    fontWeight: "bold",
  },
  addsub: {
    alignSelf: 'center',
    color: "white",
    fontSize: 20
  },
  trash: {
    width: 25,
    height:  25,
    alignSelf: 'center',
  },
  trashcontainer: {
    backgroundColor: "red",
    margin : 5,
    width: 40,
    height:  40,
    justifyContent: "center",
    borderRadius: 10,
  },
  buttoncontainer: {
    backgroundColor: "black",
    margin : 5,
    width: 40,
    height:  40,
    justifyContent: "center",
    borderRadius: 10,
  },

  numcontainer: {
    backgroundColor: "rgb(255, 217, 0)",
    margin : 5,
    width: 50,
    height:  40,
    justifyContent: "center",
    borderRadius:5
  },

  container: {
    margin : 5,
    width: 80,
    height:  40,
    justifyContent: "center",
  },
  dropDown: {
    alignSelf: "center",
    marginTop: 15,
  },
  dropDownList: {
    // display: "none",
    marginTop: 8,
    marginBottom: 8,
    alignSelf: "center"
  },

  currentItem: {
    
  },

  list: {
    borderRadius: 5,
    padding: 2,
    borderWidth: 1,
  },

  addCart: {
    backgroundColor: "#d2e2fc",
    alignSelf: "center",
    borderRadius: 5,
    padding: 3,
    borderWidth: 1,
  },
})

export default Site;


