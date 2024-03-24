import {
  renderHook,
  act,
  render,
  screen,
  fireEvent
} from "@testing-library/react";
import useLoginStates from "./LoginStates";
import Login from "./Login";
import * as router from "react-router";

describe("Login Test cases", () => {
  const LoginComponent = () => {
    return render(<Login />);
  }
  const handleOnSubmitMock = jest.fn();
  const navigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });




  test("Checking fields are available", () => {
    LoginComponent();
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
    LoginComponent();
    const { result } = renderHook(() => useLoginStates());

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
    LoginComponent();
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
    LoginComponent();
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
    LoginComponent();

    //setting username and password target values of input element
    screen.getByRole("login-button").onchange = handleOnSubmitMock;
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
});
