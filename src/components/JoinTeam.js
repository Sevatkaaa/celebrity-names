import React, {Component} from "react";
import {Col, Row, Button, Container, Form, FormControl, FormGroup} from "react-bootstrap";
import {browserHistory} from "react-router";

import '../App.css';
import {NotificationContainer} from "react-notifications";
import {addPlayer} from "../api/addPlayer";

export default class JoinTeam extends Component {
    constructor(props) {
        super(props);
        this.game = JSON.parse(localStorage.getItem("game"));
        this.player = {};

        this.state = {
            isLoading: false,
            errors: {}
        }
    }

    redirect(path) {
        browserHistory.push(path);
    };

    setTeam(team) {
        this.setState({team: team});
        this.validateTeam(team);
    }

    joinGame() {
        if (this.validate()) {
            this.setState({isLoading: true});
            addPlayer(this.game.id, this.state.team, this.player.value)
                .then((response) => {
                    if (response.status === 200) {
                        localStorage.setItem("playerId", response.data.id)
                        localStorage.setItem("player", this.player.value);
                        this.redirect("/game-names")
                    }
                })
                .catch(error => {
                    this.setState({isLoading: false});
                    console.log("Error *** : " + error);
                });
        }
    }

    validate() {
        let errors = this.state.errors;

        let value = this.player.value;
        if (!value || !value.trim()) {
            errors.player = "Input your name";
        } else if (value.length > 20) {
            errors.player = "Name is too long";
        } else {
            errors.player = null;
        }

        if (!this.state.team) {
            errors.team = "Choose your team";
        } else {
            errors.team = null;
        }
        this.setState({errors: errors});

        return !errors.player && !errors.team;
    }

    validatePlayer() {
        let errors = this.state.errors;

        let value = this.player.value;
        if (!value || !value.trim()) {
            errors.player = "Input your name";
        } else {
            errors.player = null;
        }

        this.setState({errors: errors});
    }

    validateTeam(team) {
        let errors = this.state.errors;

        if (!team) {
            errors.team = "Choose your team";
        } else {
            errors.team = null;
        }

        this.setState({errors: errors});
    }

    render() {
        let _this = this;
        return (
            <div className="text-center">
                {this.state.isLoading ? <div className="application-loading"/> : null}
                <h2 className="mt-20">Game #{_this.game.id}</h2>
                <div className="main">
                    <Container className="text-center">
                        <div className={"mt-40"}>Share code '<b>{_this.game.id}</b>' with other players</div>
                        <Row>
                            <Col xs={{span: 12}}>
                                <div className="font-size-24 mt-40">Enter your name</div>
                                <Form className="mt-20">
                                    <Row>
                                        <Col xs={{span: 6, offset: 3}}>
                                            <FormGroup controlId="gameCode">
                                                <FormControl ref={ref => {
                                                    this.player = ref
                                                }} type="text" placeholder="Тарас Шевченко"
                                                onChange={_ => {
                                                    _this.validatePlayer();
                                                }}
                                                />
                                            </FormGroup>
                                            <span id="error-player"
                                                  style={{color: "red", fontSize: "12px"}}>{this.state.errors["player"]}</span>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{span: 12}}>
                                <div className="font-size-24 mt-40">Choose your team</div>
                                <Form className="mt-20">
                                    <Row>
                                        <Col xs={{span: 6, offset: 3}}>
                                            <FormGroup controlId="gameCode">
                                                <FormControl as="select"
                                                             onChange={e => {
                                                                 _this.setTeam(e.target.value);
                                                             }}
                                                >
                                                        <option value="">--</option>
                                                    {
                                                        this.game.teams.map((team) => {
                                                            return (
                                                                <option key={"team-option-" + team.name} value={team.id}>{team.name}</option>
                                                            )
                                                        })
                                                    }
                                                </FormControl>
                                                <span id="error-team"
                                                      style={{color: "red", fontSize: "12px"}}>{this.state.errors["team"]}</span>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                        <Row className={"mt-40"}>
                            <Button className="center" onClick={function () {
                                _this.joinGame()
                            }}>
                                Ready to play!
                            </Button>
                        </Row>
                    </Container>
                </div>
                <NotificationContainer/>
            </div>
        );
    }
}
