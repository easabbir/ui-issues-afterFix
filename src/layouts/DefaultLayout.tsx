import React from "react";
import { Outlet } from "react-router-dom";
// import { I18nProvider } from '@/i18n';

import { Toaster } from "@/components/ui/toaster";

const DefaultLayout = () => {
	return (
		// <I18nProvider>
		<div>
			<main className="container mx-auto">
				<Outlet />
				<Toaster />
			</main>
		</div>
		// </I18nProvider>
	);
};

export default DefaultLayout;
