import React, {Component} from "react";
import {Col, Row, Button, Container, Form, FormControl, FormGroup} from "react-bootstrap";
import {browserHistory} from "react-router";

import '../App.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {NotificationContainer} from "react-notifications";

export default class JoinGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }

    redirect(path) {
        browserHistory.push(path);
    };

    joinGame() {
        this.setState({isLoading: true});
        // TODO: request to get game by code
        localStorage.setItem("game", JSON.stringify({
            id: "123qwe",
            teams: [
                {
                    name: "Winners",
                    score: 10
                },
                {
                    name: "Keks",
                    score: 0
                },
                {
                    name: "Koks",
                    score: 0
                },
                {
                    name: "Losers",
                    score: 9
                }
            ],
            names: [
                "Taras Shevchenko",
                "Andrii Shevchenko"
            ],
            timeInterval: 30,
            nameAmount: 10,
            status: "CREATED",
            currentMove: null,
            nextMove: null
        }));
        this.redirect(`/join-team`)
    }

    render() {
        let _this = this;
        return (
            <div className="text-center">
                {this.state.isLoading ? <div className="application-loading"/> : null}
                <h2 className="mt-20">Join game by code</h2>
                <div className="main">
                    <Container className="text-center">
                        <Row>
                            <Col xs={{span: 12}}>
                                <Form className="mt-100 mb-100">
                                    <Row>
                                        <Col xs={{span: 6, offset: 3}}>
                                            <FormGroup controlId="gameCode">
                                                <FormControl ref={ref => {
                                                    this.gameCode = ref
                                                }} type="text" placeholder="Enter game code"/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                                <Button className="center mt-100" onClick={function () {
                                    _this.joinGame()
                                }}>
                                    <FontAwesomeIcon icon={faUserPlus}/> Join a game
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <NotificationContainer/>
            </div>
        );
    }
}
