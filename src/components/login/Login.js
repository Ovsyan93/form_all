import React, { Component } from "react";
import { Row, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import './login.sass';
import { isLogin, isEmpty, isLength, isContainWhiteSpace } from 'shared/validator';

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            formData: {}, 
            errors: {}, 
            formSubmitted: false,
            loading: false 
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }

    validateLoginForm = (e) => {
        
        let errors = {};
        const { formData } = this.state;

        if (isEmpty(formData.login)) {
            errors.login = "Введите Login";
        } else if (!isLogin(formData.login)) {
            errors.login = "Пожалуйста, введите правильный Login";
        }

        if (isEmpty(formData.password)) {
            errors.password = "Введите Password";
        }  else if (isContainWhiteSpace(formData.password)) {
            errors.password = "Пароль не должен содержать пробелы";
        } else if (!isLength(formData.password, { gte: 6, lte: 16, trim: true })) {
            errors.password = "Длина пароля должна быть 6 - 16 символов";
        }

        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }    
    }

    login = (e) => {
        
        e.preventDefault();

        let errors = this.validateLoginForm();

        if(errors === true){
            alert("You are successfully signed in..." );
            window.location.reload()   
        } else {
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }
    }

    render() {

        const { errors, formSubmitted } = this.state;

        return (
            <div className="Login">
                <Row>
                    <form onSubmit={this.login}>
                        <FormGroup controlId="login" validationState={ formSubmitted ? (errors.login ? 'error' : 'success') : null }>
                            <ControlLabel>Login</ControlLabel>
                            <FormControl type="text" name="login" placeholder="Ваш Login" onChange={this.handleInputChange} />
                        { errors.login && 
                            <HelpBlock>{errors.login}</HelpBlock> 
                        }
                        </FormGroup >
                        <FormGroup controlId="password" validationState={ formSubmitted ? (errors.password ? 'error' : 'success') : null }>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type="password" name="password" placeholder="Введите Password" onChange={this.handleInputChange} />
                        { errors.password && 
                            <HelpBlock>{errors.password}</HelpBlock> 
                        }
                        </FormGroup>
                        <Button type="submit" bsStyle="primary">Отправить</Button>
                    </form>
                </Row>
            </div>
        )
    }
}

export default Login;