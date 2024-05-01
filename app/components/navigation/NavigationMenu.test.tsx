import { NavigationMenu, NavigationAction } from "./NavigationMenu";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { navigationActions } from "./mocks/navActions";

const MockLogo = () => {
  return <div>Mock Logo</div>;
};

describe("<Layout />", () => {
  it("Should load without error", async () => {
    render(<NavigationMenu isAuthorized={false} />);
    expect(screen.getByLabelText("Base application")).toBeInTheDocument();
  });

  it("Select a navigation item", async () => {
    const mockNavigationClick = jest.fn();
    render(
      <NavigationMenu
        navigationActions={navigationActions}
        navigationClick={mockNavigationClick}
        isAuthorized={true}
      />
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Navigation drawer")).toHaveTextContent(
        "Reports"
      );
    });
    fireEvent.click(screen.getByText("Reports"));
    await waitFor(() => {
      expect(mockNavigationClick).toBeCalledWith(navigationActions[2]);
    });
  });

  it("Select popover top navigation item", async () => {
    // @ts-ignore
    const expectedNavAction = navigationActions.find(
      (m: any) => m?.label === "Avatar"
    ).popoverActions[0];

    const mockNavigationClick = jest.fn();
    render(
      <NavigationMenu
        navigationActions={navigationActions}
        navigationClick={mockNavigationClick}
        isAuthorized={true}
      />
    );

    fireEvent.click(screen.getByLabelText("Avatar"));

    const settings = await screen.findByText("Account Settings");
    expect(settings).toBeInTheDocument();

    fireEvent.click(settings);

    expect(mockNavigationClick).toBeCalledWith(expectedNavAction);
  });

  it("Select Modal top navigation item", async () => {
    render(
      <NavigationMenu
        navigationActions={navigationActions}
        //navigationClick={mockNavigationClick}
        isAuthorized={false}
      />
    );

    fireEvent.click(screen.getByLabelText("Login"));

    const modalBody = await screen.findByTestId("modalrb-body");
    expect(modalBody).toBeInTheDocument();
  });

  it("should override with component", () => {
    render(
      <NavigationMenu
        navigationActions={[
          ...navigationActions,
          {
            key: "component",
            Component: <MockLogo />,
            authFilter: "always",
            position: "left",
          },
        ]}
        isAuthorized={false}
      />
    );
    expect(screen.getByText("Mock Logo")).toBeInTheDocument();
  });

  it("Should expand and contract left navigation", () => {
    render(
      <NavigationMenu navigationActions={navigationActions} isAuthorized={false} />
    );

    // Expand
    fireEvent.click(screen.getByLabelText("Expand Left Navigation"));

    expect(screen.getByLabelText("Base application")).toHaveClass("expanded");

    // Contract
    fireEvent.click(screen.getByLabelText("Collapse Left Navigation"));

    expect(screen.getByLabelText("Base application")).toHaveClass("contracted");
  });

  it("Should filter non-authorized nav actions", () => {
    render(
      <NavigationMenu navigationActions={navigationActions} isAuthorized={false} />
    );

    expect(screen.getByLabelText("Login")).toBeInTheDocument();
  });

  it("Should display custom component in top nav bar", () => {
    render(
      <NavigationMenu navigationActions={navigationActions} isAuthorized={true} />
    );

    expect(screen.getByLabelText("search")).toBeInTheDocument();
  });
});
