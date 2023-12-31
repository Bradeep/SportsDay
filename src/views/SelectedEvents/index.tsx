import React from "react";

import Button from "components/Button";
import Fallback from "components/Fallback";
import ImgWithFallback from "../../components/ImgWithFallback/index";

import fallbackIcon from "../../assets/icons/athletics.svg";

import { formattedDate, toStandardTime } from "../../utilities/utils";
import { sportIcons } from "../../constants/imageMap";

import { EventsInterface } from "views";

import styles from "./styles.module.scss";

interface IProps {
  selectedEvents: Array<EventsInterface>;
  onClickRemove: (idx: number, id: number, isSelectedEvent: boolean) => void;
}

const SelectedEvents = ({ selectedEvents, onClickRemove }: IProps) => {
  return (
    <div className={styles.selectedEvents_container}>
      {selectedEvents.length > 0 ? (
        <>
          <div className={styles.selectedEvents_title}>Selected Events</div>

          <div>
            {selectedEvents.map((event, idx) => {
              return (
                <div
                  className={styles.selectedEvents_cardWrapper}
                  key={`selectedEvents-${event.id}`}
                  data-testid={`selectedEvents-${event.id}`}
                >
                  <div
                    className={styles.selectedEvents_remove}
                    onClick={() => onClickRemove(idx, event.id, true)}
                    data-testid={`selectedEvents_close-${event.id}`}
                  >
                    X
                  </div>

                  <ImgWithFallback
                    className={styles.selectedEvents_icon}
                    height={20}
                    width={20}
                    src={sportIcons[event.event_category.toLowerCase()] || ""}
                    fallbackSrc={fallbackIcon as string}
                  />

                  <div className={styles.selectedEvents_description}>
                    <div className={styles.selectedEvents_name}>
                      {event.event_name}
                    </div>
                    <div className={styles.selectedEvents_category}>
                      {`(${event.event_category})`}
                    </div>
                    <div>{formattedDate(event.start_time)}</div>
                    <div className={styles.selectedEvents_time}>
                      {toStandardTime(event.start_time)} -{" "}
                      {toStandardTime(event.end_time)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Button
            buttonColor="#ffc63d"
            onClick={() => window.alert("Events are registered")}
          >
            {"SUBMIT"}
          </Button>
        </>
      ) : (
        <Fallback message="No Events Selected" />
      )}
    </div>
  );
};

export default SelectedEvents;
