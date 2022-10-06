import React, {Component} from "react";
import {Col, Row, Button, Container, Form, FormControl, FormGroup} from "react-bootstrap";
import {browserHistory} from "react-router";

import '../App.css';
import {NotificationContainer} from "react-notifications";

export default class GameWait extends Component {
    constructor(props) {
        super(props);
        this.game = JSON.parse(localStorage.getItem("game"));
        this.state = {
            isLoading: false,
        }
    }

    redirect(path) {
        browserHistory.push(path);
    };

    joinGame() {
        if (this.validate()) {
            this.setState({isLoading: true});
            // this.redirect("/join-team")
        }
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
                                <div className="font-size-24 mt-100">Waiting for other players to join</div>

                            </Col>
                        </Row>
                        <Row>
                            <Col sm={{span: 4, offset: 4}}>
                                <div className="cursor-pointer mt-100 mb-40" onClick={function () {
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
