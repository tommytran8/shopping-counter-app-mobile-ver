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

const Item = (props) => {
  const add = "+"
  const sub = "-"
  const trash = "trash"
  return (
    <View>
      <TouchableOpacity onPress={props.onClickAdd}>
        <Text>{add}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onClickSub}>
        <Text>{sub}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onClickTrash}>
        <Text>{trash}</Text>
      </TouchableOpacity>
    </View>
  );
}
const DropdownList = (props) => {
    return (
      <View>
        <TouchableOpacity onPress={ () => {props.onSelect("Cookies")}}>
        <Text>{"Cookies"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {props.onSelect("Chocolate")}}>
          <Text>{"Chocolate"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {props.onSelect("Chips")}}>
          <Text>{"Chips"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {props.onSelect("Gummies")}}>
          <Text>{"Gummies"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {props.onSelect("Lime")}}>
          <Text>{"Lime"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {props.onSelect("Lemons")}}>
          <Text>{"Lemons"}</Text>
        </TouchableOpacity>
      </View>
    );
}


/** Sample of correct code */
class Site extends Component {
  state = {
    itemlist: ["Cookies"],
    quantitys: ["Zero"],
    currentItem : "Cookies",
  }

  handleincrement(i){
    const newQuantity = [];
    const temp = this.state.quantitys[i] === "Zero" ? 1 : this.state.quantitys[i] + 1;
    for (let j = 0; j < this.state.quantitys.length; j++){
      if (i !== j){
        newQuantity.push(this.state.quantitys[j]);
      }
      else{
        newQuantity.push(temp);
      }
    }
    this.setState({
      quantitys: newQuantity,
    });
    
  }
  handledecrement(i){
    const newQuantity = [];
    const temp = this.state.quantitys[i] === "Zero" || this.state.quantitys[i] === 1 ? "Zero" : this.state.quantitys[i] - 1;
    for (let j = 0; j < this.state.quantitys.length; j++){
      if (i !== j){
        newQuantity.push(this.state.quantitys[j]);
      }
      else{
        newQuantity.push(temp);
      }
    }
    this.setState({
      quantitys: newQuantity,
    });
  }
  handleClickTrash(i){
    const itemlist = [];
    const newQuantity = [];

    for (let j = 0; j < this.state.itemlist.length; j++){
      if (i !== j){
        itemlist.push(this.state.itemlist[j]);
        newQuantity.push(this.state.quantitys[j]);
      }
    }
    this.setState({itemlist: itemlist, quantitys: newQuantity});
  }
  handleRefresh(){
    const newQuantity = [];
    for (let i = 0; i < this.state.quantitys.length; i++){
      newQuantity.push("Zero");
    }
    this.setState({quantitys: newQuantity});
  }
  handleSubmit(){
    const newItemlist = this.state.itemlist;
    const newQuantity = this.state.quantitys;
    if(!this.state.itemlist.includes(this.state.currentItem)){
      newItemlist.push(this.state.currentItem);
      newQuantity.push("Zero");
    }
    this.setState({
      itemlist: newItemlist,
      quantitys: newQuantity
    })
  }

 render() {
    let output = this.state.itemlist.map((element, index)=>{
      return (
        <View style={styles.itemcontainer}>
          <Text style={styles.itemname}>{element}{": "}</Text>
          <Text style={styles.itemquantity}>{this.state.quantitys[index]}</Text>
          <Item 
            onClickAdd = {()=>{
              this.handleincrement(index);
            }}
            onClickSub = {()=>{
              this.handledecrement(index);
            }}
            onClickTrash = {()=>{
              this.handleClickTrash(index);
            }}
          />
        </View>
      )
    });
    let numofItems = 0;
    for (let i = 0; i < this.state.quantitys.length; i ++){
      if (this.state.quantitys[i] !== "Zero"){
        numofItems += 1;
      }
    }
    return (
    <View style={styles.site}>
      <View style={styles.nav}>
        <Image style={styles.cart} source={require('./assets/cart.png')}/>
        <View style={styles.numofItems}>
          <Text>{numofItems}</Text>
        </View>
        <View style={styles.text}>
          <Text>Items</Text>
        </View>
        <TouchableOpacity onPress={() => {this.handleRefresh()}}>
          <Image style={styles.refresh} source={require('./assets/refresh.png')}/> 
        </TouchableOpacity>

      </View>
      {output}
      <View>
        <Text>{this.state.currentItem}</Text>
        <DropdownList
          onSelect={(item)=>{this.setState({currentItem: item})}}
        />
        <TouchableOpacity onPress={() => {this.handleSubmit()}}>
            <Text>{"Add to Cart"}</Text>
        </TouchableOpacity>
      </View>
     
        
    </View>
    )
  }
}

const styles = StyleSheet.create({
  site: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nav: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10
  },
  cart: {
    alignItems: 'center',
    width: 50,
    height: 50,
    resizeMode: 'stretch',
  },
  numofItems: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10
  },
  text: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10
  },
  refresh: {
    alignItems: 'center',
    width:50,
    height: 50,
    resizeMode: 'stretch',
  }
})

export default Site;

/** Sample of correct code ENDS HERE*/

// const Buttons = (props) =>{
//   let add = "+"
//   let sub = "-"
//   let trash = "trash"
//     return (
//       <View className="Buttons">
//         <Button key={add} className="add" onClick={props.onClickAdd}>
//           {add}
//         </Button>
//         <Button key={sub} className="sub" onClick={props.onClickSub}>
//         {sub}
//       </Button>
//       <Button key={trash} className="trash" onClick={props.onClickTrash}>
//           <Image src={trashlogo} alt="trash" width={20}/>
//       </Button>
//     </View>
//     );
// }
// function Item(props){
//   return(
//         <Buttons
//           item = {props.item}
//           onClickAdd = {()=>{
//             props.onClickAdd()
//           }}
//           onClickSub = {()=>{
//             props.onClickSub()
//           }}
//           onClickTrash = {()=>{
//             props.onClickTrash();
//           }}
//         />
//     );
// }
// class ItemList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: "Cookies",
//     }
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   handleChange(event){
//     this.setState({value: event.target.value});
//   }
//   handleSubmit(event){
//     event.preventDefault();
//     this.props.onSubmit(this.state.value);
//   }
//   render(){
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           {"Choose an Item: "}
//           <select value={this.state.value} onChange={this.handleChange}>
//           <optgroup label="Snacks">
//               <option value="Chocolate">Chocolate</option>
//               <option value="Cookies">Cookies</option>
//               <option value="Chips">Chips</option>
//               <option value="Gummy">Gummy</option>
//             </optgroup>
//             <optgroup label="Fruits">
//               <option value="Grapefruit">Grapefruit</option>
//               <option value="Lime">Lime</option>
//               <option value="Coconut">Coconut</option>
//               <option value="Mango">Mango</option>
//             </optgroup>
//           </select>
//         </label>
//         <input type="submit" value=" Add to Cart" />
//       </form>
//     );
//   }
// }

// class Site extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       itemlist: ["Cookies"],
//       quantitys: ["Zero"],
//      };
//   }
//   handleincrement(i){
//     const newQuantity = [];
//     const temp = this.state.quantitys[i] === "Zero" ? 1 : this.state.quantitys[i] + 1;
//     for (let j = 0; j < this.state.quantitys.length; j++){
//       if (i !== j){
//         newQuantity.push(this.state.quantitys[j]);
//       }
//       else{
//         newQuantity.push(temp);
//       }
//     }
//     this.setState({
//       quantitys: newQuantity,
//     });
    
//   }
//   handledecrement(i){
//     const newQuantity = [];
//     const temp = this.state.quantitys[i] === "Zero" || this.state.quantitys[i] === 1 ? "Zero" : this.state.quantitys[i] - 1;
//     for (let j = 0; j < this.state.quantitys.length; j++){
//       if (i !== j){
//         newQuantity.push(this.state.quantitys[j]);
//       }
//       else{
//         newQuantity.push(temp);
//       }
//     }
//     this.setState({
//       quantitys: newQuantity,
//     });
//   }
//   handleClickTrash(i){
//     const itemlist = [];
//     const newQuantity = [];

//     for (let j = 0; j < this.state.itemlist.length; j++){
//       if (i !== j){
//         itemlist.push(this.state.itemlist[j]);
//         newQuantity.push(this.state.quantitys[j]);
//       }
//     }
//     this.setState({itemlist: itemlist, quantitys: newQuantity});
//   }
//   handleRefresh(){
//     const newQuantity = [];
//     for (let i = 0; i < this.state.quantitys.length; i++){
//       newQuantity.push("Zero");
//     }
//     this.setState({quantitys: newQuantity});
//   }
//   handleSubmit(item){
//     const newItemlist =  this.state.itemlist;
//     const newQuantity = this.state.quantitys;
//     if(!this.state.itemlist.includes(item)){
//       newItemlist.push(item);
//       newQuantity.push("Zero");
//     }
//     this.setState({
//       itemlist: newItemlist,
//       quantitys: newQuantity
//     })
//   }
//   render(){
//     const output = this.state.itemlist.map((element, index)=>{
//       return (
//         <View className="item" key={element}>
//           <h3 className="itemname">{element}{": "}</h3>
//           <h3 className="itemquantity"><p>{this.state.quantitys[index]}</p></h3>
//           <Item 
//             item = {element}
//             onClickAdd = {()=>{
//               this.handleincrement(index);
//             }}
//             onClickSub = {()=>{
//               this.handledecrement(index);
//             }}
//             onClickTrash = {()=>{
//               this.handleClickTrash(index);
//             }}
//           />
//         </View>
//       );
//     });
//   let numofItems = 0;
//   for (let i = 0; i < this.state.quantitys.length; i ++){
//     if (this.state.quantitys[i] !== "Zero"){
//       numofItems += 1;
//     }
//   }
//   return (
//     <View className="site">
//       <View className="nav">
//         <Image className="cart" src={cartlogo} alt="cart" width={35}/>
//         <h2 className="num">{numofItems}</h2>
//         <h2 className="text">{"Items"}</h2>
//         <Button className="refresh" onClick={()=>{this.handleRefresh()}}>
//           <Image src={refreshlogo} alt="refresh" width={18}/>
//         </Button>
//       </View>
//       {output}
//       <ItemList
//         onSubmit={(item)=>{this.handleSubmit(item)}}
//       />
//     </View>
//     );
//   }
// }

