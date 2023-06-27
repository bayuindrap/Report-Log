import React from "react";
import { CardFooter } from "reactstrap";

class FooterComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div >
                {/* <div style={{ position: "fixed", left: "0", bottom: "0", width: "100%", textAlign: "center", height: "40px" }}> */}
                 <div style={{textAlign: "center", height: "40px", fixed: "bottom"}}>
                    <CardFooter style={{ color: "AAC8A7" }}>
                        © 2023 PT. Lotte Indonesia. All rights reserved
                    </CardFooter>
                </div>
            </div>

            // <div>
            //     <div style={{ padding: "3%", background: '#F8F9FA', marginTop: '4%' }}>
            //         <div style={{ margin: 'auto' }}>
            //             <p> © 2023 PT. Lotte Indonesia. All rights reserved</p>
            //         </div>

            //     </div>

            // </div>

        );

    }
}

export default FooterComp;