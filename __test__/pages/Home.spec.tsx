import { render, screen } from "@testing-library/react";
import Home from "@/pages";
import { Inter } from "next/font/google";


describe("Testing component Home", () => {
  //[ ]: Isso testa implementação não comportamento.
  it("should contain a <main> element", () => {
    render(<Home />);
    
    const bodyElement = screen.getByTestId("main-testid");
    expect(bodyElement).toBeInTheDocument();
  });
  
  //[ ]: Isso testa implementação ou comportamento?
  it("should contain a property class name with a valid font", () => {
    const inter = Inter({ subsets: ["latin"] });
    
    render(<Home />);

    const bodyElement = screen.getByTestId("main-testid");
    expect(bodyElement).toHaveClass("className", `${inter.className}`)
  });
});
