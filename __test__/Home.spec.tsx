import { render, screen } from "@testing-library/react";
import Home from "@/pages";

describe("Page", () => {
  it("should render Home component without crashing", () => {
    render(<Home />);
  });

  it("should contains a main HTMLElement", () => {
    render(<Home />);

    const bodyElement = screen.getByRole('main')
    expect(bodyElement).toBeInTheDocument();
  });

  it("should render a component Card", () => {
    render(<Home />);

    const cardComponent = screen.getByTestId('card-testid')
    expect(cardComponent).toBeInTheDocument();
  })
});
