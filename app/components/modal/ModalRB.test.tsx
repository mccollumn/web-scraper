import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { ModalRB } from './ModalRB';

// Shamelessly squelch MUI errors
console.error = jest.fn();

describe('<ModalRB/>', () => {

  it('Should open an close default modal', () => {
    render(<ModalRB />);

    fireEvent.click(screen.getByText('Open Modal'));

    fireEvent.click(screen.getByText('Close Modal'));

    expect(
      screen.getByText('Open Modal')
    ).toBeInTheDocument();
  });

  it('Should set open status and override internal open', async () => {
    const { rerender } = render(
      <ModalRB
        open={false}
      />
    );

    rerender(
      <ModalRB
        open={true}
      />
    )

    fireEvent.click(screen.getByText('Close Modal'));

    expect(
      screen.getByText('Open Modal')
    ).toBeInTheDocument();
  });
}
);
