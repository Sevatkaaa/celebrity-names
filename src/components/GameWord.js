import React, {Component} from "react";
import {Col, Row, Button, Container} from "react-bootstrap";
import {browserHistory} from "react-router";

import '../App.css';
import {NotificationContainer} from "react-notifications";
import Timer from "./Timer";
import {removeNames} from "../api/removeNames";

export default class GameWord extends Component {

    constructor(props) {
        super(props);
        this.game = JSON.parse(localStorage.getItem("game"));
        this.names = [];
        this.teamId = this.game.teams.filter((team) => team.players.map(p => p.id).includes(Number(localStorage.getItem("playerId"))))[0].id;
        this.state = {
            nameIndex: 0,
            finished: false,
            wordsEnded: false
        }
        this.setTimeoutForGame();
    }

    redirect(path) {
        browserHistory.push(path);
    };

    setTimeoutForGame() {
        setTimeout(() => {
            this.setState({finished: true})
            // this.redirect("/")
        }, this.game.timeInterval * 1000);
    }

    next() {
        if (this.state.nameIndex >= this.game.names.length - 1) {
            this.names.push(this.game.names[this.state.nameIndex].id);
            this.setState({wordsEnded: true, isLoading: true});
            this.removeNames();
        } else if (this.state.finished) {
            this.removeNames()
        } else {
            this.names.push(this.game.names[this.state.nameIndex].id);
            this.setState({nameIndex: this.state.nameIndex + 1});
        }
    }

    skip() {
        if (this.state.nameIndex >= this.game.names.length - 1) {
            this.setState({wordsEnded: true, isLoading: true});
            this.removeNames();
        } else if (this.state.finished) {
            this.removeNames()
        } else {
            this.setState({nameIndex: this.state.nameIndex + 1});
        }
    }

    removeNames() {
        console.log(this.names);
        removeNames(this.game.id, this.names, this.teamId)
            .then((response) => {
                if (response.status === 200) {
                    this.redirect("/game");
                    this.setState({isLoading: false});
                }
            })
    }

    render() {
        let _this = this;
        return (
            <div className="text-center">
                <h2 className="mt-20">Game #{_this.game.id}</h2>
                <div className="main mt-40 font-size-24">
                    <Container className="text-center">
                        {
                            this.state.finished ?
                                <div>Time is up! Last word</div>
                                :
                                <div>Time left: <Timer seconds={this.game.timeInterval}/></div>
                        }
                        <Row>
                            {
                                this.state.wordsEnded ? null
                                    :
                                    <Col xs={{span: 10, offset: 1}} className={"mt-100 main-action"}>
                                        {_this.game.names[_this.state.nameIndex].value}
                                    </Col>
                            }
                        </Row>
                        <Row className={"mt-100"}>
                            <Col xs={{span: 6}} onClick={function () {
                                _this.skip()
                            }}>
                                <Button className={"big-button btn btn-secondary"}>
                                    Skip
                                </Button>
                            </Col>
                            <Col xs={{span: 6}} onClick={function () {
                                _this.next()
                            }}>
                                <Button className={"big-button"}>
                                    Next
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
