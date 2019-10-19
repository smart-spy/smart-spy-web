import React, { Component, useState } from "react";
import ReactModal from "react-modal";

import Navbar from "../../components/Navbar";
import CameraDetailList from "../../components/CameraDetails";

import api from "../../services/api";

import { getUserId } from "../../services/auth";

import "./styles.css";
import "../../styles/bootstrap.min.css"
import { Form, Container } from "./styles";


export default class CameraList extends Component {
    constructor () {
        super();
        this.state = {
            showModal: false,
            userId: "",
            container: "Loading...",
            description: "",
            connectionString: "",
        };
        
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }
      
      handleCloseModal () {
        this.setState({ showModal: false });
        this.loadCameras();
    }

    loadCameras = async () => {
        try {
            const userId = getUserId();
            const url = `/users/${userId}/cameras/`;
            const response = await api.get(url);
            const cameras = response.data;
            if (cameras.length > 0) {
                this.setState({container: <CameraDetailList callback={this.loadCameras} cameras={cameras}/>});
            }
            else {
                this.setState({container: "Sem câmeras"});
            }
        }
        catch (err) {
            console.log(err.response);
            this.setState({container: "ERROR"});
        }
    };

    handleCameraRegistration = async e => {
        e.preventDefault();
        const { description, connectionString } = this.state;
        try {
            const userId = getUserId();
            const url = `/users/${userId}/cameras`;
            const data = {"connection_string": connectionString, description}
            const response = await api.post(url, data);
            alert(`OK, ID: ${response.data.id}`);
        }
        catch (err) {
            alert(`Error: ${err.response.data.detail}`);
        }
    }

    componentDidMount() {
        this.loadCameras();
    }

    render() {
        return <>
            <Navbar id="main"/>
                {this.state.container}
                <br/>
                    <button className="add" onClick={this.handleOpenModal}>Adicionar</button>
                    <ReactModal
                        isOpen={this.state.showModal}
                        contentLabel="Minimal Modal Example"
                    >
                        <Container>
                            <Form onSubmit={this.handleCameraRegistration}>
                                <input
                                    type="text"
                                    placeholder="Descrição"
                                    onChange={e => this.setState({ description: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="String de Conexão"
                                    onChange={e => this.setState({ connectionString: e.target.value })}
                                />
                                <button type="submit">Cadastrar</button>
                            </Form>
                        </Container>
                        <button className="add" onClick={this.handleCloseModal}>Fechar</button>
                    </ReactModal>
            </>
    }
}
