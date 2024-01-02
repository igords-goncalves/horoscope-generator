import { render, screen } from '@testing-library/react'
import Home from "."

describe('Page', () => {
  it('Should render without crashing', () => {
    render(<Home />)

    // const heading = screen.getByText('Home');

    // expect(heading).toBeInTheDocument();
  })
})