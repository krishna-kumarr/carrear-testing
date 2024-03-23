import { renderHook, act, render, screen, fireEvent, waitFor } from "@testing-library/react";
import useLoginStates from './LoginStates';
import Login from "./Login";
import Button from "../Reusable-comp/Button";

describe("Login Test cases", () => {
    test("Checking fields are avilable", () => {
        render(<Login />)
        expect(screen.getByText(/SignIn to Second carrears/i)).toBeInTheDocument();
        expect(screen.getByRole(/username/i)).toBeInTheDocument();
        expect(screen.getByRole(/password/i)).toBeInTheDocument();
        expect(screen.getByRole(/login-button/i)).toBeInTheDocument();
    });

    test("should set username and password to be empty", () => {
        const { result } = renderHook(() => useLoginStates());
        const initialLoginData = { username: '', password: '' };
        expect(result.current.LoginDetails).toEqual(initialLoginData);
    });

    test("Entering username and password", async() => {
        const { result } = renderHook(() => useLoginStates());
        //for username
        act(() => {
            const dynamicUsernameData = { target: { name: 'username', value: 'second-carrear' } }
            result.current.handleChange(dynamicUsernameData);
        })

        //for password
        act(() => {
            const dynamicPasswordData = { target: { name: 'password', value: 'password@123' } }
            result.current.handleChange(dynamicPasswordData);
        })

        //Updated dynamically and submitted the formdata
        act(() => {
            const event = { preventDefault: jest.fn() };
            result.current.handleSubmit(event);
        })
        expect(result.current.LoginDetails).toEqual(
            expect.objectContaining({
                username: 'second-carrear',
                password: 'password@123'
            })
        )
    });


    test("calling function",()=>{
        // const { result } = renderHook(() => useLoginStates());
        const handleSubmit = (e) => {
            e.preventDefault()
        }

        //calling function
        const handleClick = jest.fn()
        render(<Button onClick={handleSubmit} children={"Login"}/>)

        const user = fireEvent.setup()

        fireEvent.click(screen.getByRole(/login-button/i))
        expect(handleClick).toHaveBeenCalledTimes(1)
    })
});