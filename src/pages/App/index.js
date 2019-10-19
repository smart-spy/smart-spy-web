import React, { Component } from "react";

import { getUserName, getUserId } from "../../services/auth";
import api from "../../services/api";

import Navbar from "../../components/Navbar";

import CameraView from "../../components/CameraView";
import "./styles.css";



export default class SmartSpy extends Component {
    state = {
        username: "",
        cameras: null,
        views: "",
    }

    getCameras = async () => {
        const userId = getUserId();
        const url = `/users/${userId}/cameras/`;
        const response = await api.get(url);
        const cameras = response.data;
        return cameras;
    }

    addViews = async () => {
        const cameras = await this.getCameras();
        try {
            const views = cameras.map((c) => <CameraView key={c.id} camera={c}/>);
            this.setState( {views: views} );
        }
        catch(err){
            
        }
    }

    componentDidMount = async () => {
        this.addViews();
    }

    render() {
        return <div><Navbar /><div className="c-overflow-scroll">{this.state.views}</div></div>
    }
}
