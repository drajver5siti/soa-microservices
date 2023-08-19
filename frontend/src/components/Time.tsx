import React, { useEffect, useState } from "react";
import { formatDistance, parseISO } from "date-fns";

type Props = {
    timestamp: string,
    className?: string,
    updateAtInterval?: number
}

const calculateFormat = (timestamp) => {
    return formatDistance(parseISO(timestamp), new Date(), { addSuffix: true });
}

const Time = ({ 
    timestamp, 
    className = "", 
    updateAtInterval = 10_000 
}: Props) => {

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, updateAtInterval);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <span 
            className={className}
        >
            {calculateFormat(timestamp)}
        </span>
    )
}

export { Time };
export default Time;