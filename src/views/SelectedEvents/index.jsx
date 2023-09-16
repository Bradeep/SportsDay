import React from "react";

import { formattedDate, toStandardTime } from "../../utilities/utils";
import { sportIcons } from "../../constants/imageMap";
import fallbackIcon from "../../assets/icons/athletics.svg";

import runningIcon from "../../assets/images/running.svg";
import ImgWithFallback from "../../components/ImgWithFallback";
import styles from "./styles.module.scss";

const SelectedEvents = ({ selectedEvents, onClickRemove }) => {
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
                    fallbackSrc={fallbackIcon}
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
        </>
      ) : (
        <div
          className={styles.selectedEvents_fallback}
          data-testid="selectedEvents-fallback"
        >
          <img
            src={runningIcon}
            className={styles.fallback_icon}
            alt="fallback_icon"
          />
          No Events Selected
        </div>
      )}
    </div>
  );
};

export default SelectedEvents;
