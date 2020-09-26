/* App.js */
import CanvasJSReact from '../ASSETS/canvasjs.react';
var React = require('react');
var Component = React.Component;
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Barchart extends Component {
	render() {
		const options = {
			// title: {
			// 	text: "Basic Column Chart"
			// },
			data: [
			{
				// Change type to "doughnut", "line", "splineArea", etc.
				type: "column",
				dataPoints: [
					{ label: "Jan",  y: 10  },
					{ label: "Feb", y: 15  },
					{ label: "Mar", y: 25  },
					{ label: "Apr",  y: 30  },
					{ label: "May",  y: 28  }
				]
			}
			]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
export default Barchart;             