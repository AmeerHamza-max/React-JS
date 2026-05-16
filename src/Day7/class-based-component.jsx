// import { Component } from "react"

import { Component } from "react";

 class ClassBasedComponent extends Component{
    state = {
        showText : false,
        changeColor:false,
        count:0,
        changeCountStyle:false
    }
    // constructor(props){
    //     super(props);
    //     this.state = {
    //     showText : false,
    // }
    // }
    handleClick = () => {
    // this is not recommended
    // this.state.showText = !this.state.showText;
        console.log('button clicked');
    this.setState({
        showText:!this.state.showText,
        changeColor:!this.state.changeColor,
    })
    }

    handleCount=() => {
        this.setState({
            ...this.state,
            count:this.state.count+1
        })
    }


    //componentDidMount
    //componentDidUpdate
    //componentWillUnmount

    componentDidMount(){
        console.log('this is called for the first time when the page is load')
        this.setState({
            showText:!this.state.showText,
            changeColor:!this.state.changeColor
        })
    }
    componentDidUpdate(previousProps,previousState){
        // console.log(previousProps);
        console.log(previousState,this.state);
        if(previousState && previousState.count!== this.state.count && this.state.count === 10){
            this.setState({
            
                changeCountStyle:true,
            })
        }

    }

    componentWillUnmount(){
        console.log('Component is getting unmounted');
    }
    render(){
        // console.log(state); this will through an error.
        // console.log(this.state);
        // console.log(this.state.showText);
        const {showText, changeColor , count,changeCountStyle} = this.state;
        console.log(changeCountStyle);
        
        return <div>
            <div>{this.state.showText ? <h3 style={{color:this.state.changeColor ? "red":"black"}}>Class based component</h3> : null}</div>
            
            <button onClick={this.handleClick}>Toggle Text</button>
            <button onClick={this.handleCount}>Increase Count Value</button>
            <h3 style={{color:changeCountStyle ? 'blue' : 'black', fontSize:changeCountStyle ?"30px":'12px'}}>Count is {count}</h3>
        </div>

   }
}
export default ClassBasedComponent;



