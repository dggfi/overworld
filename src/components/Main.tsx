import React from "react";
import { useSelector } from "react-redux";
import { getMessage } from "../store/example";

const Main: React.FC = () => {
    const message = useSelector(getMessage);

    return (
        <main>
            <div>{message}</div>
        </main>
    )
}

export default Main;