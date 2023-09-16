import React, { useState, useEffect } from "react";

import { CardWrapper } from "../../components/Card/index";
import ImgWithFallback from "../../components/ImgWithFallback/index";
import { Button } from "../../components/Button/index";
import Tooltip from "../../components/Tooltip/index";

import img from "../../assets/images/athletics.jpg";
import runningIcon from "../../assets/images/running.svg";

import { sportImages } from "../../constants/imageMap";

import {
  toStandardTime,
  isOverLapping,
  formattedDate,
} from "../../utilities/utils";

import { EventsInterface } from "views";

import styles from "./styles.module.scss";

interface IProps {
  events: Array<EventsInterface>;
  selectedCategory: string;
  selectedEvents: Array<EventsInterface>;
  onClick: (
    idx: number,
    id: number,
    isSelectedEvent: boolean,
    overlapping: boolean
  ) => void;
}

const Events = ({
  events,
  onClick,
  selectedCategory,
  selectedEvents,
}: IProps) => {
  const [areEventsAvailable, setAreEventsAvailable] = useState<boolean>(false);
  const [doAnimation, setDoAnimation] = useState<boolean>(false);

  useEffect(() => {
    setDoAnimation(true);
    if (selectedCategory === "All Categories")
      setAreEventsAvailable(events?.length > 0);
    else {
      setAreEventsAvailable(false);
    }
  }, [events, selectedCategory]);

  const onClickButton = (
    idx: number,
    eventId: number,
    isSelectedEvent: boolean,
    overlapping: boolean
  ) => {
    onClick && onClick(idx, eventId, isSelectedEvent, overlapping);
  };

  return (
    <div className={styles.eventCard_container}>
      {events.map((event, idx) => {
        if (
          selectedCategory !== "All Categories" &&
          selectedCategory !== event.event_category
        )
          return null;

        if (!areEventsAvailable) setAreEventsAvailable(true);

        const overlapping =
          selectedEvents.length === 3 || isOverLapping(selectedEvents, event);

        const isSelectedEvent = selectedEvents.some((el) => el.id === event.id);

        return (
          <div
            className={`${styles.cardWrapper_container} ${
              doAnimation ? styles.animate : ""
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
                <div className={styles.eventCard_title}>{event.event_name}</div>
                <ImgWithFallback
                  className={styles.event_image}
                  height={230}
                  width={298}
                  src={sportImages[event.event_category.toLowerCase()] || ""}
                  fallbackSrc={img}
                />
                <div className={styles.event_descriptions}>
                  <div className={styles.event_date_wrapper}>
                    <span>Date:</span>
                    <span className={styles.event_date}>
                      {" "}
                      {formattedDate(event.start_time)}
                    </span>
                  </div>
                  <div className={styles.event_time_wrapper}>
                    <span>Time: </span>
                    <span className={styles.event_time}>
                      {" "}
                      {toStandardTime(event.start_time)} -{" "}
                      {toStandardTime(event.end_time)}
                    </span>
                  </div>
                  <Button
                    buttonColor="#ffc63d"
                    onClick={() =>
                      onClickButton(idx, event.id, isSelectedEvent, overlapping)
                    }
                    disabled={overlapping && !isSelectedEvent}
                    customClass={styles.select_button}
                  >
                    {isSelectedEvent ? "UNSELECT" : "SELECT"}
                    {overlapping && !isSelectedEvent && (
                      <div className={styles.tooltip}>
                        <Tooltip>
                          {selectedEvents.length === 3
                            ? "Can select only upto 3 events"
                            : "Another event has been chosen on this timeslot"}
                        </Tooltip>
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </CardWrapper>
          </div>
        );
      })}
      {!areEventsAvailable && (
        <div
          className={styles.events_fallback}
          data-testid="selectedEvents-fallback"
        >
          <img
            src={runningIcon}
            className={styles.fallback_icon}
            alt="fallback_icon"
          />
          No Events to be displayed
        </div>
      )}
    </div>
  );
};

export default Events;
