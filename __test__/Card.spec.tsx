import Card from "@/components/card"
import { render, screen } from "@testing-library/react"

describe('Card', () => {
  it('should render a Card component', () => {
    render(<Card />);

    const cardComponent = screen.getByTestId('card-testid')
    expect(cardComponent).toBeInTheDocument()
  })
})