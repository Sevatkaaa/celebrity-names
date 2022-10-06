import React, {Component} from "react";
import {Col, Row, Button, Container, Form, FormControl, FormGroup} from "react-bootstrap";
import {browserHistory} from "react-router";

import '../App.css';
import {NotificationContainer} from "react-notifications";

export default class GameNames extends Component {
    constructor(props) {
        super(props);
        this.game = JSON.parse(localStorage.getItem("game"));
        this.names = Array(this.game.nameAmount);
        this.state = {
            isLoading: false,
            errors: {
                names: Array(this.game.nameAmount)
            }
        }
    }

    redirect(path) {
        browserHistory.push(path);
    };

    joinGame() {
        if (this.validate()) {
            this.setState({isLoading: true});
            // TODO: add request to submit names
            this.redirect("/game-wait")
        }
    }

    validateName(i) {
        let errors = this.state.errors;

        let name = this.names[i].value
        if (!name || !name.trim()) {
            errors.names[i] = "Name should not be empty"
        } else {
            errors.names[i] = null;
        }

        this.setState({errors: errors});
    }

    validate() {
        let errors = this.state.errors;

        for (let i = 0; i < this.game.nameAmount; i++) {
            let name = this.names[i].value
            if (!name || !name.trim()) {
                errors.names[i] = "Name should not be empty"
            } else {
                errors.names[i] = null;
            }
        }

        let found = false;
        for (let i = 0; i < this.game.nameAmount; i++) {
            if (errors.names[i]) {
                found = true;
            }
        }
        this.setState({errors: errors});
        return !found;
    }

    render() {
        let _this = this;
        return (
            <div className="text-center">
                {this.state.isLoading ? <div className="application-loading"/> : null}
                <h2 className="mt-20">Game #{_this.game.id}</h2>
                <div className="main">
                    <Container className="text-center">
                        <Row>
                            <Col xs={{span: 12}}>
                                <div className="font-size-24 mt-20">Enter names</div>
                                <Form className="mt-20">
                                    <Row>
                                        {
                                            [...Array(this.game.nameAmount)].map((e, i) => {
                                                return (
                                                        <Col key={"teams-" + i} xs={{span: 10, offset: 1}}>
                                                            <FormGroup controlId={"name-input-" + i}>
                                                                <FormControl ref={ref => {
                                                                    this.names[i] = ref
                                                                }} type="text" placeholder="Enter celebrity name"
                                                                             onChange={_ => {
                                                                                 _this.validateName(i);
                                                                             }}
                                                                />
                                                                <span id={"error-names-" + i}
                                                                      style={{color: "red", fontSize: "12px"}}>{this.state.errors.names[i]}</span>
                                                            </FormGroup>
                                                        </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={{span: 4, offset: 4}}>
                                <div className="cursor-pointer mt-40 mb-40" onClick={function () {
                                    _this.joinGame()
                                }}>
                                    <Button>
                                        Start a game
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <NotificationContainer/>
            </div>
        );
    }
}
