import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { PopoverRB } from "./PopoverRB";

// Shamelessly squelch MUI errors
console.error = jest.fn();

describe("<PopoverRB/>", () => {
  it("Should open/close default popover", async () => {
    const mockLabel = "I am popover";
    const mockClose = jest.fn();
    const MockBody = ({ closePopover }: any) => (
      <div onClick={closePopover}>{mockLabel}</div>
    );

    render(
      <PopoverRB onClosePopover={mockClose}>
        <MockBody />
      </PopoverRB>
    );

    fireEvent.click(await screen.findByText("Open Popover"));

    expect(await screen.findByText(mockLabel)).toBeInTheDocument();

    fireEvent.click(await screen.findByText(mockLabel));

    expect(mockClose).toBeCalled();
  });
});
