import React from 'react';
import {render} from 'react-dom';
import $ from "jquery";
import rd3 from "react-d3";

var BarChart = rd3.BarChart;

var InputComponent = React.createClass({

    getInitialState: function() {

        this.setState({data: this.props.data})

        return {data : this.props.data};
    },

    componentDidMount: function() {
       this.getInfo();
    },

    getInfo:function(){
       $.ajax({
         url:"http://localhost:5000/api/stats/labels?label=United Kingdom",

         success: function(data){
            this.setState({ data : data });
         }.bind(this)
       });
     },

    handleSubmit: function() {
        console.log(this.state)

          $.ajax({
              url: "http://localhost:5000/api/stats/labels?label=" + this.state.input,
              type: "GET",
              success: function(data) {

                  this.setState({data: data})
                  console.log(data)

              }.bind(this),
              fail: function() {
                  console.log("Operation failed")
              }
          });
    },

    handleTextInput: function(e) {
      this.setState({
          input: e.target.value
      })
    },

    render: function() {
        return(
        <div>
        <BarChart width={2000} height={300} fill={'#318'}
            title={this.state.data.GEO_LABEL} data={[this.state.data]}/>
            <input className="btn text-input" type="input" onChange={this.handleTextInput} placeholder={this.props.placeholder} text={this.props.text}/>
            <button className="btn btn-submit" type="submit" onClick={this.handleSubmit}>
                {this.props.text}
            </button>
        </div>
      )
    }

});

var jsonData = {};

$.ajax({
    url: "http://localhost:5000/api/stats/labels?label=Devon",
    type: "GET",
    success: function(data) {
        jsonData = data
    }.bind(this),
    fail: function() {
        console.log("Operation failed")
    }
});

setTimeout(function() {
    // console.log(jsonData)
}, 1000)


setTimeout(function() {
    render(<InputComponent placeholder="Input Search" text="Submit" data={jsonData}/>, document.getElementById('app'));
}, 2000);
