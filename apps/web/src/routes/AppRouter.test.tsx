import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppRouter from "./AppRouter";

// Helper to render AppRouter with both React Query and a MemoryRouter
function renderApp(initialEntries: string[] = ["/"]) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>
        <AppRouter />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe("AppRouter (inline setup)", () => {
  it("shows Home on `/`", () => {
    renderApp(["/"]);
    // replace with something your Home component actually renders:
    expect(screen.getByText(/welcome to home/i)).toBeInTheDocument();
  });

  it("shows Login on `/login`", () => {
    renderApp(["/login"]);
    // replace with something your Login component actually renders:
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it("navigates via in-app link", async () => {
    const user = userEvent.setup();
    renderApp(["/"]);
    // assuming MainLayout has a <Link to="/login">Login</Link>
    await user.click(screen.getByRole("link", { name: /login/i }));
    expect(
      screen.getByRole("heading", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it("renders 404 for unknown routes", () => {
    renderApp(["/no-such-page"]);
    // if you show “Page Not Found” or similar in your 404 component:
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
