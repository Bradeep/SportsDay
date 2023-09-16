import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dropdown from "../../../components/Dropdown";

const mockOnItemSelect = jest.fn();

const mockOnClickOutside = jest.fn();

const MockDropdown = (props) => {
  return (
    <Dropdown
      onItemSelect={mockOnItemSelect}
      dataPoints={["All", "Athletics", "Swimming"]}
      className={"testClass"}
      {...props}
    />
  );
};

describe("Dropdown Wrapper", () => {
  test("Dropdown Wrapper is rendered", () => {
    render(<MockDropdown />);
    const dropdownWrapperElement = screen.getByTestId("dropdown-wrapper");
    expect(dropdownWrapperElement).toBeInTheDocument();
  });
  test("Dropdown without any dataPoints", () => {
    render(<Dropdown onItemSelect={mockOnItemSelect} />);
    const dropdownWrapperElement = screen.queryByText("All");
    expect(dropdownWrapperElement).not.toBeInTheDocument();
  });
  test("Dropdown opens on click", () => {
    render(<MockDropdown />);
    const dropdownSelectedElement = screen.getByTestId("dropdown-wrapper");
    fireEvent.click(dropdownSelectedElement);
    const dropdownOption1 = screen.getByText("Swimming");
    expect(dropdownOption1).toBeInTheDocument();
  });
  test("Dropdown closes on outside click", () => {
    render(<MockDropdown />);
    document.addEventListener("mousedown", mockOnClickOutside);
    const dropdownSelectedElement = screen.getByTestId("dropdown-wrapper");
    fireEvent.click(dropdownSelectedElement);
    const containerElement = document.body;
    fireEvent.mouseDown(containerElement);
    const dropdownOption1 = screen.queryByText("Swimming");
    expect(dropdownOption1).not.toBeInTheDocument();
  });

  test("Dropdown handleOutsideClick fuhnction should not be called on inside click", () => {
    render(<MockDropdown />);
    document.addEventListener("mousedown", mockOnClickOutside);
    const dropdownSelectedElement = screen.getByTestId("dropdown-wrapper");
    fireEvent.click(dropdownSelectedElement);
    const containerElement = screen.queryByText("Swimming");
    fireEvent.mouseDown(containerElement);
    const dropdownOption1 = screen.queryByText("Swimming");
    expect(dropdownOption1).toBeInTheDocument();
  });

  test("Clicking option from dropdown selects it and closes menu", () => {
    render(<MockDropdown />);
    const dropdownSelectedElement = screen.getByText("All");
    fireEvent.click(dropdownSelectedElement);
    const dropdownOptions = screen.getAllByTestId("dropdown__singleOption");
    fireEvent.click(dropdownOptions[2]);
    const dropdownDefaultElement = screen.getByText("Swimming");
    expect(dropdownDefaultElement).toBeInTheDocument();
  });
});
