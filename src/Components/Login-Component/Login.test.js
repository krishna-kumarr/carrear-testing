import { renderHook, render, screen, fireEvent } from "@testing-library/react";
import useLoginStates from "./LoginStates";
import * as router from "react-router";
import App from "../../App";
import userEvent from "@testing-library/user-event";
import { BrowserRouter,Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom'
import Login from "./Login";
import {createMemoryHistory} from 'history'

describe("Login Test cases", () => {

  //global router
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route)

    return {
      user: userEvent,
      ...render(ui, { wrapper: BrowserRouter }),
    }
  }

  const handleOnSubmitMock = jest.fn();
  const navigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });



  test("Checking fields are available", () => {
    renderWithRouter(<App />, { route: '/' })
    expect(screen.getByText(/SignIn to Second carrears/i)).toBeInTheDocument();
    expect(screen.getByRole(/username/i)).toBeInTheDocument();
    expect(screen.getByRole(/password/i)).toBeInTheDocument();
    expect(screen.getByRole(/login-button/i)).toBeInTheDocument();
  });

  test("should set username and password to be empty", () => {
    const { result } = renderHook(() => useLoginStates());
    const initialLoginData = { username: "", password: "" };
    expect(result.current.LoginDetails).toEqual(initialLoginData);
  });

  test("checking fields as empty when clicking submit button", () => {
    const { result } = renderHook(() => useLoginStates());
    renderWithRouter(<App />, { route: '/' })

    screen.getByRole("login-button").onclick = handleOnSubmitMock;
    fireEvent.click(screen.getByRole("login-button"));
    expect(handleOnSubmitMock).toHaveBeenCalledTimes(1);

    //validating input is empty
    expect(result.current.LoginDetails.username).toEqual("");
    expect(result.current.LoginDetails.password).toEqual("");

    act(() => {
      result.current.setLoginErrors(true);
      result.current.setSubmitLoading(false);
    });
    expect(screen.getByText(/username required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password required/i)).toBeInTheDocument();
    expect(screen.getByRole(/login-button/i)).toBeInTheDocument();
  });

  test("username field is empty error message when clicking submit button", () => {
    renderWithRouter(<App />, { route: '/' })
    const { result } = renderHook(() => useLoginStates());

    screen.getByRole("login-button").onclick = handleOnSubmitMock;
    fireEvent.click(screen.getByRole("login-button"));
    expect(handleOnSubmitMock).toHaveBeenCalledTimes(1);

    //validating username field is empty
    expect(result.current.LoginDetails.username).toEqual("");

    act(() => {
      result.current.setLoginErrors(true);
      result.current.setSubmitLoading(false);
    });
    expect(screen.getByText(/username required/i)).toBeInTheDocument();
    expect(screen.getByRole(/login-button/i)).toBeInTheDocument();
  });

  test("password field is empty error message when clicking submit button", () => {
    renderWithRouter(<App />, { route: '/' })
    const { result } = renderHook(() => useLoginStates());

    screen.getByRole("login-button").onclick = handleOnSubmitMock;
    fireEvent.click(screen.getByRole("login-button"));
    expect(handleOnSubmitMock).toHaveBeenCalledTimes(1);

    //validating password field is empty
    expect(result.current.LoginDetails.password).toEqual("");

    act(() => {
      result.current.setLoginErrors(true);
      result.current.setSubmitLoading(false);
    });
    expect(screen.getByText(/Password required/i)).toBeInTheDocument();
    expect(screen.getByRole(/login-button/i)).toBeInTheDocument();
  });

  test("Entering username and password and clicking submit button", () => {
    const { result } = renderHook(() => useLoginStates());
    renderWithRouter(<App />, { route: '/' })

    //setting username and password target values of input element
    fireEvent.change(screen.getByRole("username"), {
      target: { value: "second-carrear" },
    });
    fireEvent.change(screen.getByRole("password"), {
      target: { value: "password@123" },
    });

    //handleChange username updation
    act(() => {
      const dynamicUsernameData = {
        target: { name: "username", value: "second-carrear" },
      };
      result.current.handleChange(dynamicUsernameData);
    });
    //handleChange password updation
    act(() => {
      const dynamicPasswordData = {
        target: { name: "password", value: "password@123" },
      };
      result.current.handleChange(dynamicPasswordData);
    });


    //Updated dynamically and submitted the formdata
    screen.getByRole("login-button").onclick = handleOnSubmitMock;
    fireEvent.click(screen.getByRole("login-button"));
    expect(handleOnSubmitMock).toHaveBeenCalledTimes(1);

    //after clicked changing the setSubmitLoading to true
    act(() => {
      result.current.setSubmitLoading(true);
      result.current.setLoginErrors(false);
    });

    //validating input
    expect(result.current.LoginDetails).toEqual({
      username: "second-carrear",
      password: "password@123",
    });

    expect(screen.getByRole(/disable-login-button/i)).toBeInTheDocument();
    expect(screen.getByRole(/disable-login-button/i)).toBeDisabled();

    expect(navigate).toHaveBeenCalledWith('/home');
  });



  test("clicking forgot password link", () => {
    const { user } = renderWithRouter(<Login />, { route: '/' })
    expect(screen.getByText(/SignIn to Second carrears/i)).toBeInTheDocument();

    act(() => {
      user.click(screen.getByTestId('forgot-password'))
    })
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
  })

  test("clicking google link", () => {
    renderWithRouter(<App />, { route: '/' })
    expect(screen.getByText(/SignIn to Second carrears/i)).toBeInTheDocument();

    screen.getByTestId("google").onclick = handleOnSubmitMock;
    fireEvent.click(screen.getByTestId("google"));
    expect(handleOnSubmitMock).toHaveBeenCalledTimes(1);
  })

  test("clicking linked link", () => {
    renderWithRouter(<App />, { route: '/' })
    expect(screen.getByText(/SignIn to Second carrears/i)).toBeInTheDocument();

    screen.getByTestId("linked-in").onclick = handleOnSubmitMock;
    fireEvent.click(screen.getByTestId("linked-in"));
    expect(handleOnSubmitMock).toHaveBeenCalledTimes(1);
  })

  test("clicking apple link", () => {
    renderWithRouter(<App />, { route: '/' })
    expect(screen.getByText(/SignIn to Second carrears/i)).toBeInTheDocument();

    screen.getByTestId("apple").onclick = handleOnSubmitMock;
    fireEvent.click(screen.getByTestId("apple"));
    expect(handleOnSubmitMock).toHaveBeenCalledTimes(1);
  })

  test("clicking apple link", async() => {
    const history = createMemoryHistory()
    render(
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>,
    )

    expect(screen.getByText(/SignIn to Second carrears/i)).toBeInTheDocument();
    
    await fireEvent.click(screen.getByTestId("sign-up"));

    expect(screen.getByText(/SignIn to Second carrears/i)).toBeInTheDocument();
  })
});