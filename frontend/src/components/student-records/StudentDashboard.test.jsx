import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import StudentDashboard from "./StudentDashboard";
import "@testing-library/jest-dom"; // for the "toBeInTheDocument" matcher

describe("StudentDashboard", () => {
  test("renders without crashing", () => {
    render(
      <Router>
        <StudentDashboard />
      </Router>
    );
    // Check if the "Explore Student Data by Year" title is present
    expect(
      screen.getByText(/Explore Student Data by Year/i)
    ).toBeInTheDocument();
  });

  test("displays year buttons", () => {
    render(
      <Router>
        <StudentDashboard />
      </Router>
    );
    // Check if the year buttons are present
    expect(screen.getByText(/1st Year/i)).toBeInTheDocument();
    expect(screen.getByText(/2nd Year/i)).toBeInTheDocument();
    expect(screen.getByText(/3rd Year/i)).toBeInTheDocument();
  });

  test("button click navigates to student detail page", () => {
    render(
      <Router>
        <StudentDashboard />
      </Router>
    );

    // Find the "View Students" button for the 1st Year
    const firstYearButton = screen.getByText(/View Students/i);
    expect(firstYearButton).toBeInTheDocument();

    // Mock the navigate function and simulate the click
    const navigateMock = jest.fn();
    fireEvent.click(firstYearButton);

    // Ensure the navigate function was called with the expected URL
    expect(navigateMock).toHaveBeenCalledWith(
      "/student-detail-table?year=1st Year"
    );
  });

  test("button has the correct aria-label for accessibility", () => {
    render(
      <Router>
        <StudentDashboard />
      </Router>
    );

    // Ensure the button has the correct aria-label
    const firstYearButton = screen.getByText(/View Students/i);
    expect(firstYearButton).toHaveAttribute(
      "aria-label",
      "View 1st Year Students"
    );
  });
});

