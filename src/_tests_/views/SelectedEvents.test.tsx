import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import SelectedEvents from "../../views/rentee/SelectedEvents";
import { EventsInterface } from "views/rentee";

interface IProps {
  selectedEvents?: Array<EventsInterface>;
}

const mockButtonClick = jest.fn();

const selectedEvents = [
  {
    id: 4,
    event_name: "High Jump",
    event_category: "Athletics",
    "is_available": true,
    price: 500,
    size: 'M',
    image: 'dummy_file.jpg'
  },
  {
    id: 5,
    event_name: "Triple Jump",
    event_category: "Athletic",
    "is_available": true,
    price: 500,
    size: 'M',
    image: 'dummy_file.jpg'
  },
];

const MockEvents = (props: IProps) => {
  return (
    <SelectedEvents
      onClickRemove={mockButtonClick}
      selectedEvents={selectedEvents}
      {...props}
    />
  );
};

describe("Selected Events card Wrapper", () => {
  describe("Rendered with data", () => {
    test("Selected events title", () => {
      render(<MockEvents />);
      const el = screen.queryByText("Selected Events");
      expect(el).toBeInTheDocument();
    });
    test("All contents are present in the card", () => {
      render(<MockEvents />);
      const el = screen.queryByTestId("selectedEvents-4");
      expect(el).toHaveTextContent("High Jump");
      expect(el).toHaveTextContent("Athletics");
      expect(el).toHaveTextContent("17/12/2022");
      expect(el).toHaveTextContent("1:00 PM - 2:00 PM");
    });

    test("onClear function", () => {
      render(<MockEvents />);
      const el = screen.getByTestId("selectedEvents_close-4");
      fireEvent.click(el);
      expect(mockButtonClick).toBeCalled();
    });

    test("Fallback should not be rendered", () => {
      render(<MockEvents />);
      const el = screen.queryByTestId("No Events Selected");
      expect(el).not.toBeInTheDocument();
    });

    describe("Submit button", () => {
      test("render submit button", () => {
        render(<MockEvents />);
        const el = screen.getByText("SUBMIT");
        expect(el).toBeInTheDocument();
      });
      test("on click of submit button", () => {
        window.alert = jest.fn();
        render(<MockEvents />);
        const el = screen.getByText("SUBMIT");
        fireEvent.click(el);
        expect(window.alert).toHaveBeenCalledWith("Events are registered");
      });
    });
  });

  describe("if there is no data", () => {
    test("Selected events title should not be rendered", () => {
      render(<MockEvents selectedEvents={[]} />);
      const el = screen.queryByText("Selected Events");
      expect(el).not.toBeInTheDocument();
    });
    test("rendering of fallback", () => {
      render(<MockEvents selectedEvents={[]} />);
      const el = screen.getByText("No Events Selected");
      expect(el).toBeInTheDocument();
    });
  });
});
