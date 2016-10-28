import React from 'react';
import {render} from 'react-dom';
import $ from "jquery";
import rd3 from "react-d3";

var BarChart = rd3.BarChart;

// var x = $.ajax({
//     url: "http://localhost:5000/api/stats/labels?label=London",
//     type: "GET",
//     success: function(data) {
//
//         console.log(this)
//
//         barData = data;
//
//     },
//     fail: function() {
//         console.log("Operation failed")
//     }
// });


// var BarChartComponent = React.createClass({
//
//     componentDidMount: function() {
//         $.ajax({
//             url: this.props.url,
//             type: "GET",
//             success: function(data) {
//                 this.setState({data: data})
//             }.bind(this),
//             fail: function() {
//                 console.log("Operation failed")
//             }
//         });
//
//     },
//
//     render: function() {
//
//         console.log(this)
//
//         return (
//             <BarChart width={500}
//                       height={200}
//                       data={barData}/>
//         )
//     }
// });
//
// var ContainerComponent = React.createClass({
//
//     getInitialState: function() {
//           return {
//               data: []
//           }
//     },
//
//     componentDidMount: function() {
//         $.ajax({
//             url: this.props.url,
//             type: "GET",
//             success: function(data) {
//                 this.setState({data: data})
//             }.bind(this),
//             fail: function() {
//                 console.log("Operation failed")
//             }
//         });
//
//     },
//
//     render: function() {
//
//         console.log(this)
//
//         return (
//
//             <BarChartComponent values={this.state.data}/>
//
//         )
//     }
//
// })

// var Button = React.createClass({
//
//     componentDidMount: function() {
//       $.ajax({
//         type: "GET",
//         url: this.props.url,
//         context: document.body,
//         success: function(data) {
//
//             this.setState({values: data});
//
//         }.bind(this),
//         fail: function() {
//           console.log("Operation failed");
//         }
//       });
//
//       console.log(this)
//     },
//
//     showGraph: function() {
//
//
//
//     },
//
//     render: function() {
//
//         return (
//             <button onClick={this.showGraph}> Show Graph </button>
//         )
//
//     }
//
// });

// $.ajax({
//   type: "GET",
//   url: "http://localhost:5000/api/stats",
//   context: document.body,
//   success: function(data) {
//     console.log(data.values)
//   },
//   fail: function() {
//     console.log("Operation failed");
//   }
// })

// var BarChartComponent = React.createClass({
//
//     rend: function() {
//         console.log("TEST")
//     },
//
//     render: function() {
//
//       console.log(this)
//
//         return (
//             <div>
//               <BarChart width={2000} height={300} fill={'#318'}
//                   title='Bar Chart' data={[this.props.data]}/>
//
//             <InputComponent placeholder="Input Search" text="Submit" test={this.rend}/>
//             </div>
//         )
//     }
//
// });

var InputComponent = React.createClass({

    getInitialState: function() {

        this.setState({data: this.props.data})

        setTimeout(function() {

          console.log(this)
        }.bind(this), 3000)

        return {data : this.props.data};
    },

    componentDidMount: function() {

       this.getInfo();
       console.log("hit")
    },

    getInfo:function(){
       $.ajax({
         url:"http://localhost:5000/api/stats/labels?label=United Kingdom",

         success: function(data){
            this.setState({ data : data });
         }.bind(this)
       });

       setTimeout(function() {

         console.log(this)
       }.bind(this), 1000)

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

        setTimeout(function() {
            console.log(this)
        }.bind(this), 2000);

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
            title='Bar Chart' data={[this.state.data]}/>
            <input className="btn" type="input" onChange={this.handleTextInput} placeholder={this.props.placeholder} text={this.props.text}/>
            <button className="btn btn-submit" type="submit" onClick={this.handleSubmit}>
                {this.props.text}
            </button>
        </div>
      )
    }

});

var jsonData = {};

var x = $.ajax({
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

console.log(x)

setTimeout(function() {
    render(<InputComponent placeholder="Input Search" text="Submit" data={jsonData}/>, document.getElementById('app'));
}, 2000);
