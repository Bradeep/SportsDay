import { filterSelectedCategoryEvents } from "views/rentee/helper";
import { dummyData } from "_tests_/dummyData";

describe("Helper function", () => {
  test("Filter Selected Category Events", () => {
    const selectedEvents = filterSelectedCategoryEvents(dummyData, "Cricket");

    expect(selectedEvents[0].event_name === "Cricket U19").toBeTruthy();
  });

  test("Filter All Category Events", () => {
    const selectedEvents = filterSelectedCategoryEvents(
      dummyData,
      "All Categories"
    );
    expect(selectedEvents === dummyData).toBeTruthy();
  });
});
