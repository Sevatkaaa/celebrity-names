import React, {Component} from "react";
import {Col, Row, Button, Container} from "react-bootstrap";
import {browserHistory} from "react-router";

import '../App.css';
import {NotificationContainer} from "react-notifications";

export default class Game extends Component {
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
        this.redirect("/game-ready")
    }

    refresh() {
        // TODO: refresh game state
    }

    render() {
        let _this = this;
        return (
            <div className="text-center">
                {this.state.isLoading ? <div className="application-loading"/> : null}
                <h2 className="mt-20">Game #{_this.game.id}</h2>
                <div className="main">
                    <Container className="text-center">
                        {
                            _this.game.status !== "FINISHED" ?
                                <>
                                    <Row>
                                        <Col xs={{span: 12}}>
                                            <div className="mt-20">Wait for your turn</div>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={{span: 4, offset: 4}}>
                                            <div className="cursor-pointer mt-20 mb-40" onClick={function () {
                                                _this.joinGame()
                                            }}>
                                                <Button>
                                                    It's my turn
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </>
                                :
                                <>
                                    <Row>
                                        <Col xs={{span: 12}}>
                                            <div className="mt-20">Game is up!</div>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={{span: 4, offset: 4}}>
                                            <div className="cursor-pointer mt-20 mb-40" onClick={function () {
                                                _this.joinGame()
                                            }}>
                                                <Button>
                                                    Go to main page
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </>
                        }
                        <Row>
                            <Col className={"user-preview-scoreboard"} xs={{span: 12}}>
                                <div className="font-size-24 mt-20">Scoreboard</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{span: 10, offset: 1 }}>
                                {
                                    _this.game.teams.sort((a, b) => b.score - a.score).map((team) => {
                                        return (
                                            <Row key={"teams-score-" + team.name} className={"user-preview"}>
                                                <Col xs={{span: 6}}>
                                                    {team.name}
                                                </Col>
                                                <Col className={"team-preview-score"} xs={{span: 3, offset: 3}}>
                                                    {team.score}
                                                </Col>
                                            </Row>
                                        )
                                    })
                                }
                            </Col>
                        </Row>
                        {
                            _this.game.status !== "FINISHED" ?
                                <Row>
                                    <Col sm={{span: 4, offset: 4}}>
                                        <div className="cursor-pointer mt-20 mb-40" onClick={function () {
                                            _this.refresh()
                                        }}>
                                            <Button>
                                                Refresh scoreboard
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            : null
                        }
                    </Container>
                </div>
                <NotificationContainer/>
            </div>
        );
    }
}
