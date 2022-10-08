import React, {Component} from "react";
import {Col, Row, Button, Container} from "react-bootstrap";
import {browserHistory} from "react-router";

import '../App.css';
import {NotificationContainer} from "react-notifications";
import {getGame} from "../api/getGame";

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
        this.setState({isLoading: true});
        getGame(this.game.id)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("game", JSON.stringify(response.data));
                    if (response.data.status === "PLAYING") {
                        this.redirect("/game");
                    } else {
                        // TODO: add notification
                    }
                    this.setState({isLoading: false});
                }
            })
            .catch(error => {
                console.log("Error *** : " + error);
                this.setState({isLoading: false});
            });
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
