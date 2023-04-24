import { fireEvent, render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Autocomplete, useAutocomplete } from "./Autocomplete";

function TestComponent() {
  const props = useAutocomplete(["abc", "def1", "def2"]);
  return <Autocomplete {...props} />;
}

describe("autocomplete", () => {
  test("should show empty text and no dropdown", () => {
    render(<TestComponent />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("when user type in matching characters, dropdown should show up", async () => {
    render(<TestComponent />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "de" } });
    expect(await screen.findByText("def1")).toBeInTheDocument();
    expect(await screen.findByText("def2")).toBeInTheDocument();
    expect(screen.queryByText("abc")).not.toBeInTheDocument();
  });

  test("when user select an option, input should be updated, and no option should be shown", async () => {
    render(<TestComponent />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "de" } });

    const option = await screen.findByText("def2");
    fireEvent.click(option);

    expect(screen.queryByText("def1")).not.toBeInTheDocument();
    expect(screen.queryByText("def2")).not.toBeInTheDocument();
    expect(screen.queryByText("abc")).not.toBeInTheDocument();

    expect(input).toHaveValue("def2");

    fireEvent.change(input, { target: { value: "de" } });
    expect(await screen.findByText("def1")).toBeInTheDocument();
    expect(await screen.findByText("def2")).toBeInTheDocument();
    expect(screen.queryByText("abc")).not.toBeInTheDocument();
  });

  test("when user type in non-matching characters, dropdown should not show up", async () => {
    render(<TestComponent />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "9080" } });
    expect(screen.queryByText("def1")).not.toBeInTheDocument();
    expect(screen.queryByText("def2")).not.toBeInTheDocument();
    expect(screen.queryByText("abc")).not.toBeInTheDocument();
  });
});
