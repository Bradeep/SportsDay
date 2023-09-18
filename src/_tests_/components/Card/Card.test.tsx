import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CardWrapper from "../../../components/Card";

interface IProps {
  customClass?: string;
}

const MockCardChild = () => {
  return <div>{"card child"}</div>;
};

const MockCardWrapper = (props: IProps) => {
  return (
    <CardWrapper
      width="50px"
      height="50px"
      borderRadius="16px"
      children={<MockCardChild />}
      {...props}
    />
  );
};

describe("Card Wrapper", () => {
  test("Card Wrapper is rendered", () => {
    render(<MockCardWrapper customClass={"sample"} />);
    const cardElement = screen.getByTestId("card-wrapper");
    expect(cardElement).toBeInTheDocument();
  });
  test("Card child is rendered", () => {
    render(<MockCardWrapper />);
    const cardChildElement = screen.getByText("card child");
    expect(cardChildElement).toBeInTheDocument();
  });
});
