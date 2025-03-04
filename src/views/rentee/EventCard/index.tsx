import React, { useState, useEffect, useCallback } from "react";

import CardWrapper from "../../../components/Card/index";
import ImgWithFallback from "../../../components/ImgWithFallback/index";
import Button from "../../../components/Button/index";
import Fallback from "components/Fallback";
import Tooltip from "../../../components/Tooltip/index";

import img from "../../../assets/images/athletics.jpg";

import { EventsInterface } from "views/rentee";

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

const EVENTS_PER_PAGE = 10;
// const TOTAL_SELECTED_EVENTS = 3;

const Events = ({
  events,
  onClick,
  selectedCategory,
  selectedEvents,
}: IProps) => {
  const [areEventsAvailable, setAreEventsAvailable] = useState<boolean>(false);
  const [doAnimation, setDoAnimation] = useState<boolean>(false);
  const [currIndex, setCurrIndex] = useState<number>(0);

  useEffect(() => {
    setDoAnimation(true);
    setAreEventsAvailable(false);
    setCurrIndex(0);
  }, [events, selectedCategory]);

  const onClickButton = useCallback(
    (
      idx: number,
      eventId: number,
      isSelectedEvent: boolean,
      overlapping: boolean
    ) => {
      onClick && onClick(idx, eventId, isSelectedEvent, overlapping);
    },
    [onClick]
  );

  const onClickPrevButton = useCallback(() => {
    setCurrIndex((curr) => curr - EVENTS_PER_PAGE);
  }, []);

  const onClickNextButton = useCallback(() => {
    setCurrIndex((curr) => curr + EVENTS_PER_PAGE);
  }, []);

  const eventsToDisplay = events.slice(currIndex, currIndex + EVENTS_PER_PAGE);

  return (
    <>
      <div className={styles.eventCard_container}>
        {eventsToDisplay.map((event, idx) => {
          if (!areEventsAvailable) setAreEventsAvailable(true);

          const overlapping =
            !event.is_available

          const isSelectedEvent = selectedEvents.some(
            (el) => el.id === event.id
          );

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
                  <div className={styles.eventCard_title}>
                    {event.event_name}
                  </div>
                  <ImgWithFallback
                    className={styles.event_image}
                    height={230}
                    width={298}
                    src={`${event.image}`}
                    fallbackSrc={img}
                  />
                  <div className={styles.event_descriptions}>
                    <div className={styles.event_date_wrapper}>
                      <span>Size:</span>
                      <span className={styles.event_date}>
                        {" "}
                        {event.size}
                      </span>
                    </div>
                    <div className={styles.event_time_wrapper}>
                      <span>Price: </span>
                      <span className={styles.event_time}>
                        &#8377; {`${event.price}`}
                      </span>
                    </div>
                    <Button
                      buttonColor="#ffc63d"
                      onClick={() =>
                        onClickButton(
                          currIndex + idx,
                          event.id,
                          isSelectedEvent,
                          overlapping
                        )
                      }
                      disabled={overlapping && !isSelectedEvent}
                      customClass={styles.select_button}
                    >
                      {isSelectedEvent ? "UNSELECT" : "SELECT"}
                      {overlapping && !isSelectedEvent && (
                        <div className={styles.tooltip}>
                          <Tooltip>
                            {'Stock not available'}
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
      </div>
      {areEventsAvailable && (
        <div className={styles.eventsCard_footer}>
          <Button
            buttonColor="#ffc63d"
            customClass={styles.footer_button}
            disabled={currIndex === 0}
            onClick={() => {
              onClickPrevButton();
            }}
          >
            {"< PREV"}
          </Button>
          <Button
            buttonColor="#ffc63d"
            customClass={styles.footer_button}
            disabled={currIndex + EVENTS_PER_PAGE >= events.length}
            onClick={() => {
              onClickNextButton();
            }}
          >
            {"NEXT >"}
          </Button>
        </div>
      )}
      {!areEventsAvailable && <Fallback message="No Events to be displayed" />}
    </>
  );
};

export default Events;
