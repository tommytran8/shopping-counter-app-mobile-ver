import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  SectionList
} from 'react-native'

const Button = (props) => {
  const add = "+"
  const sub = "-"
  const trash = "trash"
  return (
    <View style={styles.buttons}>
      <TouchableOpacity style={styles.container} onPress={props.onClickAdd}>
        <Text style={styles.itembutton}>{add}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.container} onPress={props.onClickSub}>
        <Text style={styles.itembutton}>{sub}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.container} onPress={props.onClickTrash}>
        <Text style={styles.itembutton}>{trash}</Text>
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
            <View style={styles.container}>
              <Text style={styles.itemquantity}>{value}</Text>
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
      <View style={styles.body}>
        {output}
        <View style={styles.dropDown}> 
          <Text style={styles.currentItem}>{this.state.currentItem}</Text>
          <DropdownList
            onSelect={(item)=>{this.setState({currentItem: item})}}
          />
          <TouchableOpacity onPress={() => {this.handleSubmit()}}>
              <Text style={styles.addCart} >{"Add to Cart"}</Text>
          </TouchableOpacity>
        </View>
        
        
      </View>
     
        
    </View>
    )
  }
}

const styles = StyleSheet.create({
  site: {
    // backgroundColor: 'antiquewhite',
    width: '100%',
    height: '100%'
  },
  nav: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 70,
    backgroundColor: 'antiquewhite',
    position: "absolute"
  },
  numofItems: {
    color: "aliceblue",
    fontSize: 17,
    fontWeight: "bold",
    alignItems: "center",
  },
  numofItemsContainer: {
    borderRadius: 25,
    borderColor: "rgb(78, 216, 170)",
    backgroundColor: "rgb(78, 216, 170)",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    width: 55,
    height: 25
  },
  navText: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 20
  },
  body: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    alignItems: "center",
    marginTop: 70
  },
  refresh: {
    alignItems: 'center',
    width: 40,
    height:  40,
    // resizeMode: 'stretch',
    marginLeft: 20
  },
  cart: {
    alignItems: 'center',
    width:  40,
    height:  40,
    // resizeMode: 'stretch',
    marginRight: 20
  },
  itemcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  itemname: {
    
  },

  container: {
    backgroundColor: "rgb(255, 217, 0)",
    width: 100,
    height: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default Site;



