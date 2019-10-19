import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Logo from "../../assets/puc-logo.png";
import api from "../../services/api";
import qs from "querystring"
import { login } from "../../services/auth";

import { Form, Container } from "./styles";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const requestBody = {username: email, password: password};
        const config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        const response = await api.post("/login", qs.stringify(requestBody), config);
        login(response.data.access_token, email, response.data.user_id);
        this.props.history.push("/app");
      } catch (err) {
        console.log(err.response);
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais."
        });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
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
          <button type="submit">Entrar</button>
          <hr />
          <Link to="/signup">Criar conta</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignIn);