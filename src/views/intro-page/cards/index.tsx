import React, { useState, useEffect, useCallback } from "react";

import CardWrapper from "../../../components/Card/index";
import ImgWithFallback from "../../../components/ImgWithFallback/index";
import Button from "../../../components/Button/index";

import img from "../../../assets/images/athletics.jpg";


import { IntroInterface } from "../interface";

import styles from "./styles.module.scss";

interface IProps {
    event: IntroInterface;
    onClick: (
        href: string,
    ) => void;
}


const IntroCards = ({
    event,
    onClick
}: IProps) => {
    const [doAnimation, setDoAnimation] = useState<boolean>(false);

    useEffect(() => {
        setDoAnimation(true);
    }, []);

    const onClickButton = useCallback(
        (
            href: string,
        ) => {
            onClick && onClick(href);
        },
        [onClick]
    );

    return (
        <div
            className={`${styles.cardWrapper_container} ${doAnimation ? styles.animate : ""
                }`}
            onAnimationEnd={() => setDoAnimation(false)}
            key={`events_${event.id}`}
        >
            <CardWrapper
                backgroundColor={"white"}
                borderRadius={4}
                customClass={styles.cardWrapper}
            >
                <div
                    className={styles.eventCard_wrapper}
                    data-testid={`events_${event.id}`}
                >
                    <div className={styles.eventCard_title}>
                        {event.event_name}
                    </div>
                    <ImgWithFallback
                        className={styles.event_image}
                        height={230}
                        width={298}
                        src={event.img}
                        // src={sportImages[event.event_category.toLowerCase()] || ""}
                        fallbackSrc={img}
                    />
                    <div className={styles.event_descriptions}>
                        <div className={styles.event_date_wrapper}>
                            <span>Description:</span>
                            <span className={styles.event_date}>
                                {" "}
                                {event.description}
                            </span>
                        </div>
                        {/* <div className={styles.event_time_wrapper}>
                            <span>Price: </span>
                            <span className={styles.event_time}>
                                {`$ ${event.price}`}
                            </span>
                        </div> */}
                        <Button
                            buttonColor="#ffc63d"
                            onClick={() =>
                                onClickButton(
                                    event.href,
                                )
                            }
                            customClass={styles.select_button}
                        >
                            {"Click Me!"}
                        </Button>
                    </div>
                </div>
            </CardWrapper>
        </div>
    );

};

export default IntroCards;
