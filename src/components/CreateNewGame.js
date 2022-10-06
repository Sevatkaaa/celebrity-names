import React, {Component} from "react";
import {Col, Row, Button, Container, Form, FormControl, FormGroup} from "react-bootstrap";
import {browserHistory} from "react-router";

import '../App.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus, faMinusCircle} from "@fortawesome/free-solid-svg-icons";
import {NotificationContainer} from "react-notifications";

export default class CreateNewGame extends Component {
    constructor(props) {
        super(props);
        this.teams = [];
        this.teamErrorPairs = [null, null];
        this.state = {
            isLoading: false,
            teamAmount: 2,
            errors: {
                teams: [null, null]
            }
        }
    }

    redirect(path) {
        browserHistory.push(path);
    };

    incrementTeams() {
        this.setState({teamAmount: this.state.teamAmount + 1});
        this.teamErrorPairs.push(null);
    }

    decrementTeams(teamNumber) {
        let teamPair = -1;
        if (this.teamErrorPairs[teamNumber] != null) {
            if (this.teamErrorPairs[teamNumber] > teamNumber) {
                teamPair = this.teamErrorPairs[teamNumber] - 1;
            } else {
                teamPair = this.teamErrorPairs[teamNumber];
            }
        }
        let errors = this.state.errors;
        for (let i = teamNumber; i < this.state.teamAmount - 1; i++) {
            this.teams[i].value = this.teams[i + 1].value;
            errors.teams[i] = errors.teams[i + 1];
            this.teamErrorPairs[i] = this.teamErrorPairs[i + 1];
        }
        this.teams.pop();
        errors.teams.pop();
        this.teamErrorPairs.pop();

        this.setState({teamAmount: this.state.teamAmount - 1, errors: errors});
        if (teamPair !== -1) {
            this.teamErrorPairs[teamPair] = null;
            this.state.errors.teams[teamPair] = null;
        }
    }

    setTimeInterval(timeInterval) {
        this.timeInterval = timeInterval;
        this.validateTimeInterval();
    }

    setNameAmount(nameAmount) {
        this.nameAmount = nameAmount;
        this.validateNameAmount();
    }

    createNewGame() {
        if (this.validate()) {
            console.log("create new game");
            this.setState({isLoading: true});
            this.redirect("/join-team")
        }
    }

    validate() {
        let errors = this.state.errors;

        for (let i = 0; i < this.state.teamAmount; i++) {
            let team = this.teams[i].value;
            if (!team || !team.trim()) {
                errors.teams[i] = "Team name should not be empty"
            } else {
                let found = false;
                for (let j = 0; j < this.teams.length && j !== i; j++) {
                    let anotherTeam = this.teams[j].value;
                    if (anotherTeam === team) {
                        errors.teams[i] = "Team '" + team + "' already exists";
                        errors.teams[j] = "Team '" + team + "' already exists";
                        this.teamErrorPairs[i] = j;
                        this.teamErrorPairs[j] = i;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    errors.teams[i] = null;
                }
            }
        }
        if (this.timeInterval === undefined || this.timeInterval === "0") {
            errors.timeInterval = "Choose time interval";
        }
        if (this.nameAmount === undefined || this.nameAmount === "0") {
            errors.nameAmount = "Choose name amount";
        }
        this.setState({"errors": errors});
        let found = false;
        for (let i = 0; i < this.state.teamAmount; i++) {
            if (errors.teams[i]) {
                found = true;
            }
        }
        return errors.nameAmount === null && errors.timeInterval == null && !found;
    }

    validateTeam(i) {
        let errors = this.state.errors;

        let team = this.teams[i].value;
        if (!team || !team.trim()) {
            errors.teams[i] = "Team name should not be empty"
        } else {
            let foundIndex = -1;
            for (let j = 0; j < this.state.teamAmount; j++) {
                let anotherTeam = this.teams[j].value;
                if (anotherTeam === team && j !== i) {
                    foundIndex = j;
                    break;
                }
            }
            if (foundIndex === -1) {
                errors.teams[i] = null;
                if (this.teamErrorPairs[i] !== null) {
                    errors.teams[this.teamErrorPairs[i]] = null;
                    this.teamErrorPairs[this.teamErrorPairs[i]] = null;
                    this.teamErrorPairs[i] = null;
                }
            } else {
                if (this.teamErrorPairs[i] !== null) {
                    this.teamErrorPairs[this.teamErrorPairs[i]] = null;
                    errors.teams[this.teamErrorPairs[i]] = null;
                }
                this.teamErrorPairs[i] = foundIndex;
                this.teamErrorPairs[foundIndex] = i;
                errors.teams[i] = "Team '" + team + "' already exists";
                errors.teams[foundIndex] = "Team '" + team + "' already exists";
            }
        }

        this.setState({errors: errors});
    }

    validateTeams() {
        let errors = this.state.errors;
        for (let i = 0; i < this.state.teamAmount; i++) {
            let team = this.teams[i].value;
            if (!team || !team.trim()) {
                errors.teams[i] = "Team name should not be empty"
            } else {
                let found = false;
                for (let j = 0; j < this.teams.length && j !== i; j++) {
                    let anotherTeam = this.teams[j].value;
                    if (anotherTeam === team) {
                        errors.teams[i] = "Team '" + team + "' already exists";
                        errors.teams[j] = "Team '" + team + "' already exists";
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    errors.teams[i] = null;
                }
            }
        }
        this.setState({"errors": errors});
    }

    validateTimeInterval() {
        let errors = this.state.errors;
        if (this.timeInterval === undefined || this.timeInterval === "0") {
            errors.timeInterval = "Choose time interval";
        } else {
            errors.timeInterval = null;
        }
        this.setState({errors: errors});
    }

    validateNameAmount() {
        let errors = this.state.errors;
        if (this.nameAmount === undefined || this.nameAmount === "0") {
            errors.nameAmount = "Choose name amount";
        } else {
            errors.nameAmount = null;
        }
        this.setState({errors: errors});
    }

    render() {
        let _this = this;
        return (
            <div className="text-center">
                {this.state.isLoading ? <div className="application-loading"/> : null}
                <h2 className="mt-20">Enter game details</h2>
                <div className="main">
                    <Container className="text-center">
                        <Row>
                            <Col xs={{span: 12}}>
                                <div className="font-size-24 mt-20">Teams</div>
                                <Form className="mt-20">
                                        {
                                            [...Array(this.state.teamAmount)].map((e, i) => {
                                                return (
                                                    <Row key={"teams-" + i} xs={{span: 12}}>
                                                        <Col xs={{span: 10, offset: 1}}>
                                                            <FormGroup controlId={"teams-input-" + i}>
                                                                <FormControl ref={ref => {
                                                                    this.teams[i] = ref
                                                                }} type="text" placeholder="Enter team name"
                                                                onChange={_ => {
                                                                    _this.validateTeam(i);
                                                                }}
                                                                />
                                                                <span id={"error-teams-" + i}
                                                                      style={{color: "red", fontSize: "12px"}}>{this.state.errors.teams[i]}</span>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col key={"decrement-teams-" + i} xs={{span: 1}} className={"ml-minus-20"} onClick={function() {
                                                            _this.decrementTeams(i)
                                                        }}>
                                                            <FontAwesomeIcon icon={faMinusCircle}/>
                                                        </Col>
                                                    </Row>
                                                )
                                            })
                                        }
                                    <Col>
                                        <Button className="center" onClick={function () {
                                            _this.incrementTeams()
                                        }}>
                                            <FontAwesomeIcon icon={faUserPlus}/> Add Team
                                        </Button>
                                    </Col>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{span: 6, offset: 3}}>
                                <div className="font-size-24 mt-40">Time Interval</div>
                                <Form className="font-size-24 mt-20">
                                        <FormGroup controlId="time">
                                            <FormControl as="select"
                                                         onChange={e => {
                                                             _this.setTimeInterval(e.target.value);
                                                         }}
                                            >
                                                <option value="0">--</option>
                                                <option value="10">10s</option>
                                                <option value="15">15s</option>
                                                <option value="20">20s</option>
                                                <option value="30">30s</option>
                                                <option value="45">45s</option>
                                                <option value="60">1m</option>
                                            </FormControl>
                                            <span id="error-time"
                                                  style={{color: "red", fontSize: "12px"}}>{this.state.errors["timeInterval"]}</span>
                                        </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{span: 6, offset: 3}}>
                                <div className="font-size-24 mt-40">Name amount</div>
                                <Form className="font-size-24 mt-20">
                                    <FormGroup controlId="time">
                                        <FormControl as="select"
                                                     onChange={e => {
                                                         _this.setNameAmount(e.target.value);
                                                     }}
                                        >
                                            <option value="0">--</option>
                                            <option value="5">5</option>
                                            <option value="7">7</option>
                                            <option value="10">10</option>
                                            <option value="12">12</option>
                                            <option value="15">15</option>
                                            <option value="18">18</option>
                                            <option value="20">20</option>
                                        </FormControl>
                                        <span id="error-time"
                                              style={{color: "red", fontSize: "12px"}}>{this.state.errors["nameAmount"]}</span>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={{span: 4, offset: 4}}>
                                <div className="cursor-pointer mt-40 mb-40" onClick={function () {
                                    _this.createNewGame()
                                }}>
                                    <Button>
                                        Create new game
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
