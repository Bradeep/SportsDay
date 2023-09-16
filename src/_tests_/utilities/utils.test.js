import {
  toStandardTime,
  formattedDate,
  isOverLapping,
} from "../../utilities/utils";

describe("Util functions", () => {
  test("To standard time util function", () => {
    const dateTime = "2022-12-17 22:00:00";
    const standardTime = toStandardTime(dateTime);
    expect(standardTime).toBe("10:00 PM");
  });

  test("Util for formatted date", () => {
    let dateTime = "2022-12-17 22:00:00";
    let date = formattedDate(dateTime);
    expect(date).toBe("17/12/2022");

    dateTime = "2022-02-07 22:00:00";
    date = formattedDate(dateTime);
    expect(date).toBe("07/02/2022");
  });

  describe("Overlapping events", () => {
    const selectedEvents = [
      {
        id: 1,
        event_name: "Butterfly 100M",
        event_category: "Swimming",
        start_time: "2022-12-17 13:00:00",
        end_time: "2022-12-17 14:00:00",
      },
      {
        id: 5,
        event_name: "Triple Jump",
        event_category: "Athletics",
        start_time: "2022-12-17 16:00:00",
        end_time: "2022-12-17 17:00:00",
      },
    ];
    test("For non-overlapping events", () => {
      const currentEvent = {
        id: 6,
        event_name: "Long Jump",
        event_category: "Athletics",
        start_time: "2022-12-17 17:00:00",
        end_time: "2022-12-17 18:00:00",
      };

      const overLapping = isOverLapping(selectedEvents, currentEvent);
      expect(overLapping).toBeFalsy();
    });

    test("For overlapping events", () => {
      let currentEvent = {
        id: 2,
        event_name: "Backstroke 100M",
        event_category: "Swimming",
        start_time: "2022-12-17 13:30:00",
        end_time: "2022-12-17 14:30:00",
      };

      let overLapping = isOverLapping(selectedEvents, currentEvent);
      expect(overLapping).toBeTruthy();

      currentEvent = {
        id: 4,
        event_name: "High Jump",
        event_category: "Athletics",
        start_time: "2022-12-17 15:00:00",
        end_time: "2022-12-17 16:30:00",
      };
      overLapping = isOverLapping(selectedEvents, currentEvent);
      expect(overLapping).toBeTruthy();

      currentEvent = {
        id: 4,
        event_name: "High Jump",
        event_category: "Athletics",
        start_time: "2022-12-17 10:00:00",
        end_time: "2022-12-17 18:30:00",
      };
      overLapping = isOverLapping(selectedEvents, currentEvent);
      expect(overLapping).toBeTruthy();
    });
  });
});
