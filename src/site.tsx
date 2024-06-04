// import Adventurer from "../public/adventurers.512x512.min.webp";
// import Analyst from "../public/analyst.512x512.min.webp";
// import Architect from "../public/architect.512x512.min.webp";
// import Connector from "../public/connector.512x512.min.webp";
// import Dreamer from "../public/dreamer.512x512.min.webp";
// import Dynamo from "../public/dynamo.512x512.min.webp";
// import Explorer from "../public/explorer.512x512.min.webp";
// import Guardian from "../public/guardian.512x512.min.webp";
// import Innovator from "../public/innovator.512x512.min.webp";
// import Pioneer from "../public/pioneer.512x512.min.webp";
// import Producer from "../public/producer.512x512.min.webp";
// import Scholar from "../public/scholar.512x512.min.webp";
// import Sentinal from "../public/sentinal.512x512.min.webp";
// import Socialite from "../public/socialite.512x512.min.webp";
// import Visionary from "../public/visionary.512x512.min.webp";
// import Wanderer from "../public/wanderer.512x512.min.webp";
// import Logo from "../public/logo.webp";

import { Share2 } from "lucide-react";
import { useEffect, useState } from "react";

export function Main() {
	return (
		<main className="flex min-h-screen w-full select-none flex-col bg-neutral-950">
			<NavArea />
			<InfoArea />
		</main>
	);
}

export function NavArea() {
	return (
		<nav className="fixed left-0 top-0 flex w-full flex-row items-center gap-2 bg-neutral-950 p-4">
			<img alt="enterlink" className="size-10" src="/logo.webp" />
			<h1 className="text-lg font-semibold">enterlink</h1>
		</nav>
	);
}

const copyToClipboard = async (text: string) => {
	if (navigator.clipboard) {
		try {
			await navigator.clipboard.writeText(text);
			console.debug("Copied using navigator.clipboard");
			return;
		} catch (reason) {
			console.error(
				"Failed with navigator.clipboard, trying fallback...",
				reason
			);
		}
	}

	// Fallback
	const textarea = document.createElement("textarea");
	textarea.value = text;
	document.body.append(textarea);
	textarea.select();
	try {
		document.execCommand("copy");
		console.debug("Copied using document.execCommand");
	} catch (reason) {
		console.error("Failed to copy text:", reason);
	}
	textarea.remove();
};

export function InfoArea() {
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
		<section className="flex size-full flex-col items-center p-6 pt-28">
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
						<a className="underline" href="/terms">
							Terms and Conditions.
						</a>
					</p>
				</div>
				<div className="h-px w-full bg-neutral-800" />
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
						We&apos;ll send you a follow-up email with your personality at a
						later date after completion of this survey. Each personality type
						offers a distinct way to engage with and experience the virtual
						world.
					</p>
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(26rem,1fr))]">
					<div className="flex size-full flex-row items-center gap-4 rounded-xl bg-neutral-900 p-6">
						<img
							alt="Adventurer"
							className="size-20 shrink-0"
							src="/adventurer.512x512.min.webp"
						/>
						<div>
							<p className="font-semibold">Adventurer</p>
							<p className="text-sm text-neutral-400">
								Adventurers thrive on the thrill of exploration and discovery
								within virtual environments.
							</p>
						</div>
					</div>
					<div className="flex size-full flex-row items-center gap-4 rounded-xl bg-neutral-900 p-6">
						<img
							alt="Analyst"
							className="size-20 shrink-0"
							src="/analyst.512x512.min.webp"
						/>
						<div>
							<p className="font-semibold">Analyst</p>
							<p className="text-sm text-neutral-400">
								Analysts are the data-driven thinkers of the virtual world.
							</p>
						</div>
					</div>
					<div className="flex size-full flex-row items-center gap-4 rounded-xl bg-neutral-900 p-6">
						<img
							alt="Architect"
							className="size-20 shrink-0"
							src="/architect.512x512.min.webp"
						/>
						<div>
							<p className="font-semibold">Architect</p>
							<p className="text-sm text-neutral-400">
								Architects are the master planners and builders of virtual
								worlds.
							</p>
						</div>
					</div>
					<div className="flex size-full flex-row items-center gap-4 rounded-xl bg-neutral-900 p-6">
						<img
							alt="Connector"
							className="size-20 shrink-0"
							src="/connector.512x512.min.webp"
						/>
						<div>
							<p className="font-semibold">Connector</p>
							<p className="text-sm text-neutral-400">
								Connectors are key players in building and maintaining vibrant
								communities within the metaverse.
							</p>
						</div>
					</div>
					<div className="flex size-full flex-row items-center gap-4 rounded-xl bg-neutral-900 p-6">
						<img
							alt="Dreamer"
							className="size-20 shrink-0"
							src="/dreamer.512x512.min.webp"
						/>
						<div>
							<p className="font-semibold">Dreamer</p>
							<p className="text-sm text-neutral-400">
								Dreamers are the idealists and visionaries who imagine what
								could be possible in virtual worlds.
							</p>
						</div>
					</div>
					<div className="flex size-full flex-row items-center gap-4 rounded-xl bg-neutral-900 p-6">
						<img
							alt="Dynamo"
							className="size-20 shrink-0"
							src="/dynamo.512x512.min.webp"
						/>
						<div>
							<p className="font-semibold">Dynamo</p>
							<p className="text-sm text-neutral-400">
								Dynamos are energetic and charismatic innovators who bring a
								burst of creativity and spontaneity to everything they do.
							</p>
						</div>
					</div>
					<div className="flex size-full flex-row items-center gap-4 rounded-xl bg-neutral-900 p-6">
						<img
							alt="Explorer"
							className="size-20 shrink-0"
							src="/explorer.512x512.min.webp"
						/>
						<div>
							<p className="font-semibold">Explorer</p>
							<p className="text-sm text-neutral-400">
								Explorers are the adventurers of the virtual world, always on
								the lookout for new experiences and discoveries.
							</p>
						</div>
					</div>
					<div className="flex size-full flex-row items-center gap-4 rounded-xl bg-neutral-900 p-6">
						<img
							alt="Guardian"
							className="size-20 shrink-0"
							src="/guardian.512x512.min.webp"
						/>
						<div>
							<p className="font-semibold">Guardian</p>
							<p className="text-sm text-neutral-400">
								Guardians are the protectors and stabilizers of virtual
								communities.
							</p>
						</div>
					</div>
					<div className="flex size-full flex-row items-center gap-4 rounded-xl bg-neutral-900 p-6">
						<img
							alt="Innovator"
							className="size-20 shrink-0"
							src="/innovator.512x512.min.webp"
						/>
						<div>
							<p className="font-semibold">Innovator</p>
							<p className="text-sm text-neutral-400">
								Innovators are the visionaries and trailblazers in the virtual
								world.
							</p>
						</div>
					</div>
					<div className="flex size-full flex-row items-center gap-4 rounded-xl bg-neutral-900 p-6">
						<img
							alt="Pioneer"
							className="size-20 shrink-0"
							src="/pioneer.512x512.min.webp"
						/>
						<div>
							<p className="font-semibold">Pioneer</p>
							<p className="text-sm text-neutral-400">
								Pioneers are the trailblazers who explore and establish new
								frontiers within the virtual world.
							</p>
						</div>
					</div>
					<div className="flex size-full flex-row items-center gap-4 rounded-xl bg-neutral-900 p-6">
						<img
							alt="Producer"
							className="size-20 shrink-0"
							src="/producer.512x512.min.webp"
						/>
						<div>
							<p className="font-semibold">Producer</p>
							<p className="text-sm text-neutral-400">
								The Producer plays a central role in orchestrating and managing
								large-scale virtual projects and events.
							</p>
						</div>
					</div>
					<div className="flex size-full flex-row items-center gap-4 rounded-xl bg-neutral-900 p-6">
						<img
							alt="Scholar"
							className="size-20 shrink-0"
							src="/scholar.512x512.min.webp"
						/>
						<div>
							<p className="font-semibold">Scholar</p>
							<p className="text-sm text-neutral-400">
								Scholars are the knowledge seekers and educators within the
								virtual community.
							</p>
						</div>
					</div>
					<div className="flex size-full flex-row items-center gap-4 rounded-xl bg-neutral-900 p-6">
						<img
							alt="Sentinel"
							className="size-20 shrink-0"
							src="/sentinel.512x512.min.webp"
						/>
						<div>
							<p className="font-semibold">Sentinel</p>
							<p className="text-sm text-neutral-400">
								Sentinels are the vigilant overseers of virtual environments,
								constantly monitoring for changes and potential threats.
							</p>
						</div>
					</div>
					<div className="flex size-full flex-row items-center gap-4 rounded-xl bg-neutral-900 p-6">
						<img
							alt="Socialite"
							className="size-20 shrink-0"
							src="/socialite.512x512.min.webp"
						/>
						<div>
							<p className="font-semibold">Socialite</p>
							<p className="text-sm text-neutral-400">
								Socialites are the vibrant connectors and charismatic
								influencers within the virtual community.
							</p>
						</div>
					</div>
					<div className="flex size-full flex-row items-center gap-4 rounded-xl bg-neutral-900 p-6">
						<img
							alt="Visionary"
							className="size-20 shrink-0"
							src="/visionary.512x512.min.webp"
						/>
						<div>
							<p className="font-semibold">Visionary</p>
							<p className="text-sm text-neutral-400">
								Visionaries are the forward-thinkers and dreamers of the virtual
								world.
							</p>
						</div>
					</div>
					<div className="flex size-full flex-row items-center gap-4 rounded-xl bg-neutral-900 p-6">
						<img
							alt="Wanderer"
							className="size-20 shrink-0"
							src="/wanderer.512x512.min.webp"
						/>
						<div>
							<p className="font-semibold">Wanderer</p>
							<p className="text-sm text-neutral-400">
								Wanderers are the introspective explorers of the virtual world.
							</p>
						</div>
					</div>
				</div>
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
