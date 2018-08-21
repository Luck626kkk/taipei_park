import React, { Component } from 'react';
import logo from './logo.svg';
import loupe from './loupe.png';
import './App.css';

let data= [];
class Park extends Component{
  constructor(props){
    super(props);
    this.state={};
  }
 
  render(){
    const parksElements = this.props.searchData.map((item) => {
      return(
          <div className="park">
            {/* <img src={ require('./test.JPG') } alt=""/> */}
            <img src={item.Image} alt=""/>
            <h2 className="name">景點名稱: {item.Name}</h2>
            <h2 className="parkName">景點地點: {item.ParkName}</h2>
            <h2 className="openTime">開放時間: {item.OpenTime}</h2>
            <h2 className="introduction">介紹: {item.Introduction}</h2>
          </div>
      )
    });
    return <div className="parks">{parksElements}</div>
  }
 
}

class App extends Component {
  constructor(props){
    super(props);
    this.state={search:[]};
  }
  componentDidMount(){
    this.getData();
  }
  getData = () => {
    const url ="apiIn.json";
    fetch(url,{mode:'cors',method: "GET"}).then((response) => {
        // 這裡會得到一個 ReadableStream 的物件
        console.log(response);
        console.log(response.headers.get('content-type'));
        // 可以透過 blob(), json(), text() 轉成可用的資訊
        return response.json();
      }).then((jsonData) => {
        console.log(jsonData);
        data=jsonData;
        this.setState({search:data})
      }).catch((err) => {
        console.log('錯誤:', err);
    });
  }
  render() {
    return (
      <div className="wrap">
        <h1>臺北市公園景點介紹</h1>
        <div className="container">
          <div className="search">
            <input id="search" type="text" placeholder="請填入關鍵字" onChange={this.onChange.bind(this)}/>
            {/* <img src={ require('./loupe.png') } /> */}
          </div>
          <Park searchData={this.state.search}/>
        </div>
      </div>
    );
  }
  onChange(){
    let txt = document.getElementById('search').value;
    let searchDatas = data.filter(function(item, index, array){
      return item.ParkName.indexOf(txt) === 0 || item.Name.indexOf(txt) ===0 ;      //是否要改成!= 
    });
    console.log(searchDatas);
    if(txt===''){
      this.setState({search:data});
    }else{
      this.setState({search:searchDatas});
    }
    
    
  }
}

export default App;
