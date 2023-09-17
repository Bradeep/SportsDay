import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ErrorBoundary from "../../../components/ErrorBoundary/index";

describe("Error Boundary", () => {
  test("Error Boundary", () => {
    const ThrowError = () => {
      throw new Error("Test");
    };
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText("Something went wrong")).toBeVisible();
  });
});
