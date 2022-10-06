import React, {Component} from "react";
import {Col, Row, Button, Container} from "react-bootstrap";
import {browserHistory} from "react-router";

import '../App.css';
import {NotificationContainer} from "react-notifications";

export default class Main extends Component {

    redirect(path) {
        browserHistory.push(path);
    };

    render() {
        let _this = this;
        return (
            <div className="text-center">
                <h2 className="mt-20">Слава Україні</h2>
                <div className="text-secondary pb-100">
                    <br/>
                    Choose language
                </div>
                <div className="main">
                    <Container className="text-center">
                        <Row>
                            <Col sm={{span: 4}}>
                                <div className="main-action cursor-pointer" onClick={function () {
                                    localStorage.setItem("language", "EN");
                                    _this.redirect(`/start`)
                                }}>
                                <Button>
                                    EN
                                </Button>
                                </div>
                            </Col>
                            <Col sm={{span: 4}}>
                                <div className="main-action cursor-pointer" onClick={function () {
                                    localStorage.setItem("language", "UA");
                                    _this.redirect(`/start`)
                                }}>
                                <Button>
                                    UA
                                </Button>
                                </div>
                            </Col>
                            <Col sm={{span: 4}}>
                                <div className="main-action cursor-pointer" onClick={function () {
                                    localStorage.setItem("language", "RU");
                                    _this.redirect(`/start`)
                                }}>
                                <Button>
                                    RU
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
