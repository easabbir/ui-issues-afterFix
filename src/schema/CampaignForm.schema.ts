import { z } from "zod";

export const formSchema = z.object({
	advertiser_id: z.string().min(1, {
		message: "Account name is required.",
	}),
	name: z.string().trim().min(1, {
		message: "Campaign name is required.",
	}),
	objective: z.string().min(1, {
		message: "Objective is required.",
	}),
	platforms: z.array(z.string()).refine((value) => value.some((item) => item), {
		message: "You have to select at least one platform.",
	}),
	bid: z.string().trim().min(1, {
		message: "Bid is required.",
	}),
	budget: z.string().trim().min(1, {
		message: "Lifetime budget is required.",
	}),
	tracking_link: z.string().trim(),
	countries_iso: z
		.array(z.string())
		.min(1, { message: "At least one country is required." }),
	headline: z.string().trim().min(1, {
		message: "Headline is required.",
	}),
	details: z.string().trim().min(1, {
		message: "Details is required.",
	}),
	call_to_action: z.string().trim().min(1, {
		message: "Call to action is required.",
	}),
	instructions: z.string().trim().min(1, {
		message: "Instructions is required.",
	}),
});
