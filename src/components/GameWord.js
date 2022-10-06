import React, {Component} from "react";
import {Col, Row, Button, Container} from "react-bootstrap";
import {browserHistory} from "react-router";

import '../App.css';
import {NotificationContainer} from "react-notifications";
import Timer from "./Timer";

export default class GameWord extends Component {

    constructor(props) {
        super(props);
        this.game = JSON.parse(localStorage.getItem("game"));
        // setTimeout(() => {
        //     this.redirect("/")
        // }, 3000);
    }

    redirect(path) {
        browserHistory.push(path);
    };

    render() {
        let _this = this;
        return (
            <div className="text-center">
                <h2 className="mt-20">Game #{_this.game.id}</h2>
                <div className="main mt-40 font-size-24">
                    <Container className="text-center">
                        <Timer seconds={30}/>
                    </Container>
                </div>
                <NotificationContainer/>
            </div>
        );
    }
}
