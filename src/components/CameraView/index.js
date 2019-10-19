import React, { Component } from "react";

import { getUserId } from "../../services/auth";
import { baseIp } from "../../services/api";

import { View } from "./styles";


export default class CameraView extends Component {
    constructor(props){
        super(props);
        this.state = {
            camera: props.camera,
            data: "",
        };
        this.setContext = this.setContext.bind(this);
    }

    drawRectangle = (predicted) => {
        if (predicted.class_name == "person") {
            this.context.beginPath();
            this.context.strokeStyle = "#00FF00"; 
            const w = predicted.x2 - predicted.x1;
            const h = predicted.y2 - predicted.y1;
            this.context.rect(predicted.x1, predicted.y1, w, h);
            this.context.stroke();
            this.context.closePath();
        }
    }

    setContext(r) {
        try {
            this.context = r.getContext("2d");
        }
        catch(err){

        }
    }

    componentDidMount() {
        const userId = getUserId();
        const cameraId = this.state.camera.id;
        const url = `ws://${baseIp}/users/${userId}/cameras/${cameraId}/stream/smart-spy/ws`
        
        const ws = new WebSocket(url);
        const image = new Image();
        ws.onmessage = event => {
            const data = JSON.parse(event.data);
            image.src = "data:image/png;base64," + data.image;
            this.context.drawImage(image, 0, 0);
            data.predicted.map((predicted) => this.drawRectangle(predicted));
            console.log(cameraId);
        }
    }

    render() {
        return <View>
                <canvas ref={this.setContext} width="320" height="320">
                </canvas>
            </View>
    }
}
