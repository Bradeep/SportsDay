import React from "react";
import { useNavigate } from "react-router-dom";

import IntroCards from "./cards";
import { IntroInterface } from "./interface";
import styles from './styles.module.scss'


const data: Array<IntroInterface> = [{
    id: 1,
    href: 'rentor',
    img: "../assets/images/athletics.jpg",
    event_name: "Rentor",
    description: "This is the place to dump all your unused things"
}, 
{
    id: 2,
    href: 'rentee',
    img: "../assets/images/athletics.jpg",
    event_name: "Rentee",
    description: "One stop to fulfill all your clothing needs"
}]

const IntroPage = () => {
    const navigate = useNavigate();

    const onClick = (href: string) => {
        navigate(href);
    }
    return (
        <div className={styles.eventCard_container}>
            {data.map((event, idx) => {
                return <IntroCards key={idx} event={event} onClick={onClick} />
            })}
        </div>
    )
}
export { IntroPage }