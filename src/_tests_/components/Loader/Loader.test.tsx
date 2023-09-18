import React from "react";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import Loader from "components/Loader";

const MockLoader = () => {
  return <Loader />;
};

describe("Laoder Component", () => {
  test("Rendering of Loader component", () => {
    render(<MockLoader />);

    expect(screen.getByTestId("Loader-wrapper")).toBeInTheDocument();
  });
});
