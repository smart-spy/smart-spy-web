import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Logo from "../../assets/puc-logo.png";

import { Form, Container } from "./styles";

import api from "../../services/api";


class SignUp extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  handleSignUp = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" });
    } else {
      try {
        await api.post("/users", { email, password });
        this.props.history.push("/");
      } catch (err) {
        const detail = err.response.data.detail;
        this.setState({ error: detail });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignUp}>
          <img src={Logo} alt="PUC Minas logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <div align="center">
            Trabalho de Conclusão de Curso
            </div>
          <br/><br/>
          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Cadastrar</button>
          <hr />
          <Link to="/">Fazer login</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignUp);
