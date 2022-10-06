import React, {Component} from "react";
import {Col, Row, Button, Container} from "react-bootstrap";
import {browserHistory} from "react-router";

import '../App.css';
import {NotificationContainer} from "react-notifications";

export default class Start extends Component {

    redirect(path) {
        browserHistory.push(path);
    };

    render() {
        let _this = this;
        return (
            <div className="text-center">
                <h2 className="mt-20">Choose option</h2>
                <div className="text-secondary pb-100">
                </div>
                <div className="main">
                    <Container className="text-center">
                        <Row>
                            <Col sm={{span: 6}}>
                                <div className="main-action cursor-pointer" onClick={function () {
                                    _this.redirect(`/new-game`)
                                }}>
                                <Button>
                                    Create new game
                                </Button>
                                </div>
                            </Col>
                            <Col sm={{span: 6}}>
                                <div className="main-action cursor-pointer" onClick={function () {
                                    _this.redirect(`/join-game`)
                                }}>
                                <Button>
                                    Join a game
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
