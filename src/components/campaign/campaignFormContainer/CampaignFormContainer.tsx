import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import CampaignForm from "@components/campaign/campaignForm/CampaignForm";
import { formSchema } from "@/schema/CampaignForm.schema";
import { accountData, objectiveData, platformData } from "@/lib/data";
import { countries } from "@/lib/countries";
import { useToast } from "@/hooks/use-toast";

function CampaignFormContainer() {
	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			advertiser_id: "",
			name: "",
			objective: "",
			platforms: [],
			tracking_link: "",
			countries_iso: [],
			headline: "",
			details: "",
			call_to_action: "",
			instructions: "",
			bid: "",
			budget: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log("values1", values);
		form.reset();
		form.setFocus("advertiser_id");
		toast({
			variant: "default",
			title: "Successful",
			description:
				"Your campaign has been created successfully and is ready to go!",
		});
	}

	return (
		<div className="flex justify-center py-8">
			<CampaignForm
				form={form}
				onSubmit={onSubmit}
				accountData={accountData} //test
				objectiveData={objectiveData}
				countriesData={countries}
				platformData={platformData}
			/>
		</div>
	);
}

export default CampaignFormContainer;
