import { render, screen } from "@testing-library/react"
import Button from "./Button"

test("testing button by passing data as props", () => {
    render(<Button type={'button'} classname={'btn'} testId={'id-1'} title={'Click me'} />)

    expect(screen.getByTestId(/id-1/i)).toBeInTheDocument();

    expect(screen.getByTestId(/id-1/i).getAttribute('class')).toEqual('btn');
    expect(screen.getByTestId(/id-1/i).getAttribute('type')).toEqual('button');
    expect(screen.getByTestId(/id-1/i).getAttribute('data-testid')).toEqual('id-1');

    expect(screen.getByText(/Click me/i)).toBeInTheDocument();
})