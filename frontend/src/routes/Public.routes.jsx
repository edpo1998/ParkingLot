import { Component } from "react";

class PublicRoute extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        return (
            <>
                {
                    this.props.element
                }
            </>
        );
    }
}

export default PublicRoute;