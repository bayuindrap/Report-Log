import React from "react";
import { CardFooter } from "reactstrap";

class FooterComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div style={{textAlign: "center", height: "40px"}}>
                <CardFooter style={{color: "AAC8A7"}}>
                © 2023  PT. Lotte Indonesia. All rights reserved
                </CardFooter>
            </div>
        );
    }
}

export default FooterComp;