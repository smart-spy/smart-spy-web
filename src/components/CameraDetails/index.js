import React, { Component } from "react";
import ReactModal from "react-modal";

import Button from "react-bootstrap/Button";

import "./styles.css";

import { Form, Container } from "./styles"; 

import { getUserId } from "../../services/auth"
import api from "../../services/api"


class CameraDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            camera: props.camera,
            callback: props.callback
        }

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }
      
    handleCloseModal = async e => {
        this.setState({ showModal: false });
        await this.state.callback();
        window.location.reload();
    }

    handleRemove = async e =>{
        e.preventDefault();
        const camera = this.state.camera;
        const userId = getUserId();
        const url = `/users/${userId}/cameras/${camera.id}`
        try {
            const response = await api.delete(url);
            this.state.callback();
        }
        catch(err){
            alert("Error");
        }
    }

    handleCameraModification = async e => {
        e.preventDefault();
        let data = {};
        if (this.state.update_description){
            data.description = this.state.update_description
        }

        if (this.state.update_connectionString){
            data.connection_string = this.state.update_connectionString            
        }

        if (Object.entries(data).length === 0 && data.constructor === Object) {
            alert("Nada para modificar");
            return;
        }

        const userId = getUserId();
        const cameraId = this.state.camera.id;
        try {
            const url = `/users/${userId}/cameras/${cameraId}`;
            const response = await api.put(url, data);
            await this.state.callback();
            alert("OK");
        }
        catch(err) {
            alert("Error");
        }
    }

    render(){
        return <p className="camera-detail">
        Câmera<br/>
        ID: {this.state.camera.id}<br/>
        Descrição: {this.state.camera.description}<br/>
        String de Conexão: {this.state.camera.connection_string}<br/>
        <Button variant="danger" size="sm" onClick={this.handleRemove}>
            Remover
        </Button>
        <Button size="sm" onClick={this.handleOpenModal}>Modificar</Button>
                    <ReactModal
                        isOpen={this.state.showModal}
                        contentLabel="Minimal Modal Example"
                    >
                        <Container>
                            <Form onSubmit={this.handleCameraModification}>
                                <input
                                    type="text"
                                    defaultValue={this.state.camera.description}
                                    onChange={e => this.setState({ update_description: e.target.value })}
                                />
                                <input
                                    type="text"
                                    defaultValue={this.state.camera.connection_string}
                                    onChange={e => this.setState({ update_connectionString: e.target.value })}
                                />
                                <button type="submit">Modificar</button>
                            </Form>
                        </Container>
                        <button className="add" onClick={this.handleCloseModal}>Fechar</button>
                    </ReactModal>
    </p>
    } 
}


const CameraDetailList = ( { callback, cameras} ) => (
<div className="camera-list">{cameras.map(c => <CameraDetail key={c.id} callback={callback} camera={c}/>)}</div>
);

export default CameraDetailList;