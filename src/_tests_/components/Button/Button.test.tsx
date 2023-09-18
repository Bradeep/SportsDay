import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../../../components/Button/index";

const mockButtonClick = jest.fn();

const MockButton = () => {
  return <Button onClick={mockButtonClick}>label text</Button>;
};

describe("Button", () => {
  test("Button is rendered", () => {
    render(<MockButton />);
    const buttonElement = screen.getByText("label text");
    expect(buttonElement).toBeInTheDocument();
  });
  test("Button click triggered onClick function passed in props", () => {
    render(<MockButton />);
    const buttonElement = screen.getByText("label text");
    fireEvent.click(buttonElement);
    expect(mockButtonClick).toHaveBeenCalled();
  });
});
