import { Share2 } from "lucide-react";
import { useEffect, useState } from "react";

import { copyToClipboard } from "../clipboard";
import { Adventurer } from "../cards/adventurer";
import { Analyst } from "../cards/analyst";
import { Architect } from "../cards/architect";
import { Connector } from "../cards/connector";
import { Dreamer } from "../cards/dreamer";
import { Dynamo } from "../cards/dynamo";
import { Explorer } from "../cards/explorer";
import { Guardian } from "../cards/guardian";
import { Innovator } from "../cards/innovator";
import { Pioneer } from "../cards/pioneer";
import { Producer } from "../cards/producer";
import { Scholar } from "../cards/scholar";
import { Sentinel } from "../cards/sentinel";
import { Socialite } from "../cards/socialite";
import { Visionary } from "../cards/visionary";
import { Wanderer } from "../cards/wanderer";

export function Home() {
	return (
		<main
			className="flex min-h-screen w-full select-none flex-col bg-neutral-950"
			vaul-drawer-wrapper=""
		>
			<nav className="flex w-full flex-row items-center gap-2 bg-neutral-950 p-4">
				<img alt="enterlink" className="size-10" src="/logo.webp" />
				<h1 className="text-lg font-semibold">enterlink</h1>
			</nav>
			<SurveyInfo />
		</main>
	);
}

export function SurveyInfo() {
	const [copyText, setCopyText] = useState<string | null>(null);

	useEffect(() => {
		let timeout: number | null = null;

		if (copyText) {
			timeout = setTimeout(() => setCopyText(null), 3000);
		}

		return () => {
			if (timeout) {
				clearTimeout(timeout);
			}
		};
	}, [copyText]);

	return (
		<section className="flex size-full flex-col items-center p-6">
			<div className="flex w-full max-w-4xl flex-col gap-12">
				<div className="flex flex-col gap-2">
					<h1 className="text-4xl font-semibold">
						VR Consumer Research Survey
					</h1>
					<p className="mt-4 text-balance text-neutral-400">
						Enterlink aims to streamline your navigation in virtual
						environments, connecting you seamlessly with events, worlds, and
						communities that match your interests.
					</p>
					<p className="text-balance text-neutral-400">
						Thanks for helping us revolutionize your virtual world experience by
						taking this survey.
					</p>
				</div>
				<div className="flex flex-col gap-2">
					<h2 className="text-balance text-xl font-semibold text-neutral-200 sm:text-xl">
						Your privacy is paramount to us.
					</h2>
					<p className="text-balance text-neutral-400">
						We do not sell your information. All data collected is strictly for
						enhancing Enterlink and enriching your virtual interactions.
					</p>
				</div>
				<div className="flex flex-col gap-4">
					<div className="flex flex-row gap-4">
						<a
							className="w-52 rounded-full bg-pink-600 py-2 text-center transition-colors hover:bg-pink-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-50"
							href="https://bca3h7pq3ya.typeform.com/to/dI1G7Kwe"
						>
							Start Survey
						</a>
						<button
							className="flex w-52 flex-row items-center justify-center gap-2 rounded-full border border-neutral-800 py-2 transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-50"
							type="button"
							onClick={() =>
								// @ts-expect-error this is fine!
								copyToClipboard("https://survey.enterlink.app") &&
								setCopyText("Copied!")
							}
						>
							<Share2 className="size-4" />
							<p>{copyText || "Share"}</p>
						</button>
					</div>
					<p className="text-xs text-neutral-500">
						By taking the survey you agree to the{" "}
						<a
							className="rounded underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-50"
							href="/terms"
						>
							Terms and Conditions.
						</a>
					</p>
				</div>
				<div className="h-px w-full bg-neutral-800" />
				<Personalities />
				<div className="h-px w-full" />
				<footer className="mt-auto">
					<p className="text-sm text-neutral-400">
						© VEU Inc. {new Date().getFullYear()} - All Rights Reserved
					</p>
				</footer>
			</div>
		</section>
	);
}

function Personalities() {
	return (
		<>
			<div className="flex flex-col gap-2">
				<h1 className="-mb-2 font-semibold text-pink-400">Survey Bonus</h1>
				<h2 className="text-balance text-xl font-semibold text-neutral-200 sm:text-xl">
					Metaverse Personality Types
				</h2>
				<p className="text-balance text-neutral-400">
					Discover which of the 16 unique virtual personalities you embody by
					taking our survey!
				</p>
				<p className="text-balance text-neutral-400">
					We&apos;ll send you a follow-up email with your personality at a later
					date after completion of this survey. Each personality type offers a
					distinct way to engage with and experience the virtual world.
				</p>
			</div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(26rem,1fr))]">
				<Adventurer />
				<Analyst />
				<Architect />
				<Connector />
				<Dreamer />
				<Dynamo />
				<Explorer />
				<Guardian />
				<Innovator />
				<Pioneer />
				<Producer />
				<Scholar />
				<Sentinel />
				<Socialite />
				<Visionary />
				<Wanderer />
			</div>
		</>
	);
}
