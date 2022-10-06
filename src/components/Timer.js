import React from "react";

export default function Timer({seconds}) {

    const [counter, setCounter] = React.useState(seconds);

    React.useEffect(() => {
        const timer =
            counter > 0 && setInterval(() =>
            {
                setCounter(counter - 1);
            }, 1000);
        return () => clearInterval(timer);
    }, [counter]);

    return (
        <div className="Timer">
            <div>{counter}</div>
        </div>
    );
}
