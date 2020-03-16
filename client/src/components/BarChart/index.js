/* App.js */
import React, { Component } from 'react';
import { getAllEvents } from "../UserFunctions";
import CanvasJSReact from './canvasjs/canvasjs.react';
import "./style.css"
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class BarChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refresh: false
        };
    }

    handleAddEvent() {
        this.setState({ refresh: true});
    }

    render() {
        let attendAA = 0;
        let watchedVideo = 0;
        let meetUp = 0;
        let alc = 0;
        let noAlc = 0;
        let other = 0;


        let userId = {
            userId: localStorage.getItem("userId"),
        };

        getAllEvents(userId).then(res => {
            if (res) {

                res.forEach(entry => {
                    switch (entry.event) {
                        case "Watched Video":
                            watchedVideo++;
                            break;
                        case "AA Meeting":
                            attendAA++;
                            break;
                        case "MeetUp":
                            meetUp++;
                            break;
                        case "Alcohol Drink":
                            alc++;
                            break;
                        case "No Alcohol":
                            noAlc++;
                            break;
                        case "Other":
                            other++;
                            break;
                    }
                });
                window.options = {
                    animationEnabled: true,
                    theme: "light2",
                    title: {
                        text: "Events Tracker"
                    },
                    axisX: {
                        title: "Events",
                        reversed: true,
                    },
                    axisY: {
                        interval: 2,
                        title: "# of days",
                        labelFormatter: this.addSymbols
                    },
                    data: [{
                        type: "bar",
                        dataPoints: [
                            { y: attendAA, label: "Attend AA" },
                            { y: watchedVideo, label: "Watched Video" },
                            { y: meetUp, label: "MeetUp" },
                            { y: alc, label: "Alcohol" },
                            { y: noAlc, label: "No Alcohol" },
                            { y: other, label: "Other" },
                        ]
                    }]
                }

            }
        });
        this.handleAddEvent();
        return (
            <div>
                <CanvasJSChart options={window.options}
                /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );

    }
    addSymbols(e) {
        var suffixes = ["", "K", "M", "B"];
        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        if (order > suffixes.length - 1)
            order = suffixes.length - 1;
        var suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }
}

export default BarChart;