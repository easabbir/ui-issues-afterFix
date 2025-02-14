import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formSchema } from "@/schema/CampaignForm.schema";
import { TypographyH2 } from "@/components/ui/typography";
import { CountryMultiSelect } from "@/components/ui/country-multiselect";

import type {
	AccountType,
	ObjectiveType,
	CountryType,
	PlatformType,
} from "./CampaignForm.type";
import { CircleHelp } from "lucide-react";

type CampaignFormProptypes = {
	form: UseFormReturn<z.infer<typeof formSchema>>;
	onSubmit: (values: z.infer<typeof formSchema>) => void;
	accountData?: AccountType[];
	objectiveData?: ObjectiveType[];
	countriesData?: CountryType[];
	platformData?: PlatformType[];
};

function CampaignForm({
	form,
	onSubmit,
	accountData = [],
	objectiveData = [],
	countriesData,
	platformData = [],
}: CampaignFormProptypes) {
	return (
		<div className="w-full md:w-[800px] px-2 py-4">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
					<TypographyH2>Create Campaign</TypographyH2>
					<FormField
						control={form.control}
						name="advertiser_id"
						render={({ field, formState }) => (
							<FormItem className="flex flex-col md:flex-row gap-2 md:gap-0 items-start">
								<FormLabel className="w-full md:w-1/4 mt-4">
									Account{" "}
									<span
										className={
											formState.errors.advertiser_id && "text-destructive"
										}
									>
										*
									</span>
								</FormLabel>
								<div className="w-full md:w-3/4 flex flex-col space-y-2">
									<Select onValueChange={field.onChange} value={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select an Account" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{accountData.map((item) => {
												return (
													<SelectItem key={item.value} value={item.value}>
														{item.label}
													</SelectItem>
												);
											})}
										</SelectContent>
									</Select>
									<div className="min-h-5">
										<FormMessage />
									</div>
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="name"
						render={({ field, formState }) => (
							<FormItem className="flex flex-col md:flex-row gap-2 md:gap-0 items-start">
								<FormLabel className="w-full md:w-1/4 mt-4">
									Campaign Name{" "}
									<span className={formState.errors.name && "text-destructive"}>
										*
									</span>
								</FormLabel>
								<div className="w-full md:w-3/4 flex flex-col space-y-2">
									<FormControl>
										<Input
											placeholder="Enter Campaign Name"
											{...field}
											maxLength={70}
										/>
									</FormControl>
									<div className="min-h-5">
										<FormMessage />
									</div>
								</div>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="objective"
						render={({ field, formState }) => (
							<FormItem className="flex flex-col md:flex-row gap-2 md:gap-0 items-start">
								<FormLabel className="w-full md:w-1/4 mt-4">
									Objective{" "}
									<span
										className={formState.errors.objective && "text-destructive"}
									>
										*
									</span>
								</FormLabel>
								<div className="w-full md:w-3/4 flex flex-col space-y-2">
									<Select onValueChange={field.onChange} value={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Choose an Objective" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{objectiveData.map((item) => {
												return (
													<SelectItem key={item.value} value={item.value}>
														{item.label}
													</SelectItem>
												);
											})}
										</SelectContent>
									</Select>
									<div className="min-h-5">
										<FormMessage />
									</div>
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="platforms"
						render={({ formState }) => (
							<FormItem className="flex flex-col md:flex-row gap-2 md:gap-0 items-start">
								<FormLabel className="w-full md:w-1/4 mt-4">
									Platform{" "}
									<span
										className={formState.errors.platforms && "text-destructive"}
									>
										*
									</span>
								</FormLabel>
								<div className="w-full md:w-3/4 flex flex-col space-y-2">
									<div className="flex items-center space-x-8 px-1">
										{platformData.map((item) => (
											<FormField
												key={item.value}
												control={form.control}
												name="platforms"
												render={({ field }) => {
													return (
														<FormItem
															key={item.value}
															className="flex flex-row items-start space-x-1 space-y-0"
														>
															<FormControl>
																<Checkbox
																	checked={field.value?.includes(item.value)}
																	onCheckedChange={(checked) => {
																		return checked
																			? field.onChange([
																					...field.value,
																					item.value,
																				])
																			: field.onChange(
																					field.value?.filter(
																						(value) => value !== item.value,
																					),
																				);
																	}}
																/>
															</FormControl>
															<FormLabel className="text-sm font-normal">
																{item.label}
															</FormLabel>
														</FormItem>
													);
												}}
											/>
										))}
									</div>
									<div className="min-h-5">
										<FormMessage />
									</div>
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="bid"
						render={({ field, formState }) => (
							<FormItem className="flex flex-col md:flex-row gap-2 md:gap-0 items-start">
								<FormLabel className="w-full md:w-1/4 mt-4">
									Bid{" "}
									<span className={formState.errors.bid && "text-destructive"}>
										*
									</span>
								</FormLabel>
								<div className="w-full md:w-3/4 flex flex-col space-y-2">
									<div className="flex gap-2 overflow-hidden">
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="[&_svg]:size-9"
										>
											<CircleHelp className="stroke-1" />
										</Button>
										<FormControl>
											<NumberInput
												placeholder="$0.00"
												thousandSeparator=","
												prefix="$"
												decimalScale={2}
												maxLength={16}
												min={0}
												onValueChange={(values) => {
													form.setValue("bid", values ? values : "", {
														shouldValidate: Boolean(values),
													});
												}}
												{...field}
											/>
										</FormControl>
									</div>

									<div className="min-h-5">
										<FormMessage />
									</div>
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="budget"
						render={({ field, formState }) => (
							<FormItem className="flex flex-col md:flex-row gap-2 md:gap-0 items-start">
								<FormLabel className="w-full md:w-1/4 mt-4">
									Lifetime Budget{" "}
									<span
										className={formState.errors.budget && "text-destructive"}
									>
										*
									</span>
								</FormLabel>
								<div className="w-full md:w-3/4 flex flex-col space-y-2">
									<div className="flex gap-2 overflow-hidden">
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="[&_svg]:size-9"
										>
											<CircleHelp className="stroke-1" />
										</Button>
										<FormControl>
											<NumberInput
												placeholder="$0.00"
												thousandSeparator=","
												prefix="$"
												decimalScale={2}
												maxLength={16}
												min={0}
												onValueChange={(values) => {
													form.setValue("budget", values ? values : "", {
														shouldValidate: Boolean(values),
													});
												}}
												{...field}
											/>
										</FormControl>
									</div>
									<div className="min-h-5">
										<FormMessage />
									</div>
								</div>
							</FormItem>
						)}
					/>

					<TypographyH2>Tracking and Targeting</TypographyH2>
					<FormField
						control={form.control}
						name="tracking_link"
						render={({ field }) => (
							<FormItem className="flex flex-col md:flex-row gap-2 md:gap-0 items-start">
								<FormLabel className="w-full md:w-1/4 mt-4">
									Tracking Link
								</FormLabel>
								<div className="w-full md:w-3/4 flex flex-col space-y-2">
									<FormControl>
										<Textarea
											className="resize-none"
											rows={6}
											readOnly
											{...field}
										/>
									</FormControl>
									<div className="min-h-5">
										<FormMessage />
									</div>
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="countries_iso"
						render={({ field, formState }) => (
							<FormItem className="flex flex-col md:flex-row gap-2 md:gap-0 items-start">
								<FormLabel className="w-full md:w-1/4 mt-4">
									Countries{" "}
									<span
										className={
											formState.errors.countries_iso && "text-destructive"
										}
									>
										*
									</span>
								</FormLabel>
								<div className="w-full md:w-3/4 flex flex-col space-y-2">
									<FormControl>
										<CountryMultiSelect
											placeholder="Select Countries"
											{...field}
											countriesData={countriesData}
										/>
									</FormControl>
									<div className="min-h-5">
										<FormMessage />
									</div>
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="headline"
						render={({ field, formState }) => (
							<FormItem className="flex flex-col md:flex-row gap-2 md:gap-0 items-start">
								<FormLabel className="w-full md:w-1/4 mt-4">
									Headline{" "}
									<span
										className={formState.errors.headline && "text-destructive"}
									>
										*
									</span>
								</FormLabel>
								<div className="w-full md:w-3/4 flex flex-col space-y-2">
									<FormControl>
										<Input
											placeholder="Enter Headline"
											{...field}
											maxLength={50}
										/>
									</FormControl>
									<div className="min-h-5">
										<FormMessage />
									</div>
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="details"
						render={({ field, formState }) => (
							<FormItem className="flex flex-col md:flex-row gap-2 md:gap-0 items-start">
								<FormLabel className="w-full md:w-1/4 mt-4">
									Details{" "}
									<span
										className={formState.errors.details && "text-destructive"}
									>
										*
									</span>
								</FormLabel>
								<div className="w-full md:w-3/4 flex flex-col space-y-2">
									<FormControl>
										<Textarea
											placeholder="Enter Details"
											className="resize-none"
											rows={4}
											{...field}
											maxLength={250}
										/>
									</FormControl>
									<div className="min-h-5">
										<FormMessage />
									</div>
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="call_to_action"
						render={({ field, formState }) => (
							<FormItem className="flex flex-col md:flex-row gap-2 md:gap-0 items-start">
								<FormLabel className="w-full md:w-1/4 mt-4">
									Call to Action{" "}
									<span
										className={
											formState.errors.call_to_action && "text-destructive"
										}
									>
										*
									</span>
								</FormLabel>
								<div className="w-full md:w-3/4 flex flex-col space-y-2">
									<FormControl>
										<Input
											placeholder="Enter Call to Action"
											{...field}
											maxLength={50}
										/>
									</FormControl>
									<div className="min-h-5">
										<FormMessage />
									</div>
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="instructions"
						render={({ field, formState }) => (
							<FormItem className="flex flex-col md:flex-row gap-2 md:gap-0 items-start">
								<FormLabel className="w-full md:w-1/4 mt-4">
									Instructions{" "}
									<span
										className={
											formState.errors.instructions && "text-destructive"
										}
									>
										*
									</span>
								</FormLabel>
								<div className="w-full md:w-3/4 flex flex-col space-y-2">
									<FormControl>
										<Textarea
											placeholder="Enter Instructions"
											className="resize-none"
											rows={9}
											{...field}
											maxLength={550}
										/>
									</FormControl>
									<div className="min-h-5">
										<FormMessage />
									</div>
								</div>
							</FormItem>
						)}
					/>
					<Button type="submit" size="lg" className="text-lg mt-2">
						Save Changes
					</Button>
				</form>
			</Form>
		</div>
	);
}

export default CampaignForm;
