import Input from "@/components/common/Input";
import { render, screen } from "@testing-library/react";

describe("Testing component Input", () => {
  //TIP: Isso testa implementação não comportamento.
  it("should render a input element with register property", () => {

    render(<Input register={jest.fn()}/>);

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  it("should render a label element", () => {
    render(<Input register={jest.fn()} label="labelName" />);
    
    const labelElement = screen.getByLabelText("labelName");
    expect(labelElement).toBeInTheDocument();
  });

  // [x]: Isso testa comportamento.
  it("should render a error message when user don't enter a value", () => {
    // TODO: Testar se a mensagem de erro é exibida quando usuário não preenche o campo
    render(<Input register={jest.fn()} label="Error Message" />)

    // Teria que simular um estado de onChange para verificar se value é vazio.

    const errorMessage = screen.getByLabelText("Error Message");
    expect(errorMessage).toBeInTheDocument();
  });
});
