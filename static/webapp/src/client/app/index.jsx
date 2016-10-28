import React from 'react';
import {render} from 'react-dom';
import $ from "jquery";
import rd3 from "react-d3";

var BarChart = rd3.BarChart;

var barData = [{
    "values": [
      { "x": 1, "y":  91},
      { "x": 2, "y":  90},
      { "x": 3, "y":  95},
      { "x": 4, "y":  91},
      { "x": 5, "y":  90},
      { "x": 6, "y":  91},
    ]
  }

];

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

var BarChartComponent = React.createClass({

    render: function() {

      console.log(this)

        return (
            <div>
              <BarChart width={2000} height={300} fill={'#318'}
                  title='Bar Chart' data={[this.props.data]}/>
            </div>
        )
    }

})

var jsonData = {};

$.ajax({
    url: "http://localhost:5000/api/stats/labels?label=United Kingdom",
    type: "GET",
    success: function(data) {
        jsonData = data
    }.bind(this),
    fail: function() {
        console.log("Operation failed")
    }
});

setTimeout(function() {
    console.log(jsonData)
}, 1000)


setTimeout(function() {
    render(<BarChartComponent data={jsonData}/>, document.getElementById('app'));
}, 1000)
