import CalendarMonth from "./CalendarMonth";
import { render, screen } from "@testing-library/react";
import reducer from '../reducers/dateSlice';
import { Provider } from 'react-redux';
import store from "../store/store";

test('should return the initial state', () => {
  let date = new Date();
  let month = date.getMonth();

  expect(reducer(undefined, {}).month).toEqual(month);
})

test("CalendarMonth component render with the days of the week", () => {

  render(<Provider store={store}>
      <CalendarMonth />
    </Provider>);

  expect(screen.getByText("Sunday")).toBeTruthy();
  expect(screen.getByText("Monday")).toBeTruthy();
  expect(screen.getByText("Tuesday")).toBeTruthy();
  expect(screen.getByText("Wednesday")).toBeTruthy();
  expect(screen.getByText("Thursday")).toBeTruthy();
  expect(screen.getByText("Saturday")).toBeTruthy();
});
