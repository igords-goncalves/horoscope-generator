import { render, screen } from "@testing-library/react";
import Card from "@/components/Card";

it("component should displays a card correctly", () => {
  render(<Card />);

  const card = screen.getByTestId("card-testid");
  expect(card).toBeInTheDocument();
});
