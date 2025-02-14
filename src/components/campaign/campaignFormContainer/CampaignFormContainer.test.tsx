import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CampaignFormContainer from "./CampaignFormContainer";
import { useToast } from "@/hooks/use-toast";
// import { accountData, objectiveData, platformData, countries } from "@/lib/data";

// Mock the useToast hook to verify toast notifications
jest.mock("@/hooks/use-toast");

describe("CampaignFormContainer", () => {
	const mockToast = jest.fn();

	beforeEach(() => {
		// Reset mocks before each test
		mockToast.mockClear();
		(useToast as jest.Mock).mockReturnValue({ toast: mockToast });
	});

	//   test("renders CampaignForm and submits form successfully", async () => {
	//     render(<CampaignFormContainer />);

	//     // Check if the form elements are present
	//     expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
	//     expect(screen.getByLabelText(/headline/i)).toBeInTheDocument();
	//     expect(screen.getByLabelText(/details/i)).toBeInTheDocument();
	//     expect(screen.getByLabelText(/call to action/i)).toBeInTheDocument();
	//     expect(screen.getByLabelText(/instructions/i)).toBeInTheDocument();

	//     // Simulate user filling the form
	//     fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Campaign 1" } });
	//     fireEvent.change(screen.getByLabelText(/headline/i), { target: { value: "Headline 1" } });
	//     fireEvent.change(screen.getByLabelText(/details/i), { target: { value: "Details of the campaign" } });
	//     fireEvent.change(screen.getByLabelText(/call to action/i), { target: { value: "Learn more" } });
	//     fireEvent.change(screen.getByLabelText(/instructions/i), { target: { value: "Follow the instructions" } });

	//     // You can simulate other necessary fields like platforms, countries, etc.
	//     fireEvent.change(screen.getByLabelText(/platform/i), { target: { value: "Facebook" } });

	//     // Submit the form
	//     fireEvent.submit(screen.getByTestId("campaign-form"));

	//     // Wait for the toast notification
	//     await waitFor(() => expect(mockToast).toHaveBeenCalledWith({
	//       variant: "default",
	//       title: "Successful",
	//       description: "Your campaign has been created successfully and is ready to go!",
	//     }));

	//     // Verify that the form reset is triggered
	//     // expect(screen.getByLabelText(/name/i).value).toBe(""); // Form reset check
	//   });

	test("shows validation errors when form is incomplete", async () => {
		render(<CampaignFormContainer />);

		// Submit the form without filling any input
		fireEvent.submit(screen.getByTestId("campaign-form"));

		// Wait for validation errors (Assuming there is validation on the form)
		await waitFor(() => {
			expect(screen.getByText(/is required/i)).toBeInTheDocument();
		});
	});
});
