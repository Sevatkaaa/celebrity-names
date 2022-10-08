import React, {Component} from "react";
import {Col, Row, Button, Container, Form, FormControl, FormGroup} from "react-bootstrap";
import {browserHistory} from "react-router";

import '../App.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {NotificationContainer} from "react-notifications";
import {getGame} from "../api/getGame";

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
        getGame(this.gameCode.value)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("game", JSON.stringify(response.data));
                    this.redirect("/join-team");
                    this.setState({isLoading: false});
                }
            })
            .catch(error => {
                console.log("Error *** : " + error);
            });
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
