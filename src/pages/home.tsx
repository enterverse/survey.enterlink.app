import { Link } from "react-router-dom";

import { useFetch } from "../use-fetch";
import { Card } from "../components/card";
import { Skeleton } from "../components/skeleton";
import { ShareButton } from "../components/copy";

import type { Personality } from "../personality";

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
	return (
		<section className="flex size-full flex-col items-center p-6">
			<div className="flex w-full max-w-4xl flex-col gap-8">
				<div className="flex flex-col gap-2">
					<h1 className="text-4xl font-semibold">
						VR Consumer Research Survey
					</h1>
					<h2 className="font-semibold text-pink-400 sm:text-xl">
						Bonus: Metaverse Personality Types
					</h2>
					<p className="mt-4 text-balance text-neutral-400">
						Enterlink is on a mission to enhance your personal connection to VR.
						Share your insights and help us perfect our soon-to-launch service.
					</p>
					{/* <p className="text-balance text-neutral-400">
						Thanks for helping us revolutionize your virtual world experience by
						taking this survey.
					</p> */}
				</div>
				<div className="flex flex-col gap-2">
					<h2 className="text-balance text-lg font-semibold text-neutral-200 sm:text-xl">
						Your privacy is paramount to us.
					</h2>
					{/* <p className="text-balance text-neutral-400">
						We do not sell your information. All data collected is strictly for
						enhancing Enterlink and enriching your virtual interactions.
					</p> */}
					<p className="text-balance text-neutral-400">
						We do not sell your personal information.
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
						<ShareButton
							href="https://survey.enterlink.app"
							shareText="Share survey"
						/>
					</div>
					<p className="text-xs text-neutral-500">
						By taking the survey you agree to the{" "}
						<Link
							className="rounded underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-50"
							to="/terms"
						>
							Terms and Conditions.
						</Link>
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
	const { data, error, loading } = useFetch<Array<Personality>>(
		"https://admin.enterlink.app/api/personas"
	);

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
				{/* <p className="text-balance text-neutral-400">
					We&apos;ll send you a follow-up email with your personality at a later
					date after completion of this survey. Each personality type offers a
					distinct way to engage with and experience the virtual world.
				</p> */}
			</div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(26rem,1fr))]">
				{error && <p className="text-xs text-red-500">{error.message}</p>}
				{loading &&
					Array.from({ length: 16 })
						.fill(null)
						.map((_, index) => (
							<Skeleton className="h-32 w-full rounded-xl" key={index} />
						))}
				{data &&
					data.map((personality) => (
						<Card
							description={personality.shortDescription}
							key={personality.key}
							title={personality.name}
							traits={personality.traits.map((trait) => trait.name).join(", ")}
						>
							<h3>Metaverse Role</h3>
							<p>{personality.description}</p>
							<h3>Key Traits</h3>
							<ul>
								{personality.traits.map((trait) => (
									<li key={trait.key}>
										<p>
											<b className="font-medium">{trait.name}</b>
										</p>
										<p className="-mt-2">{trait.description}</p>
									</li>
								))}
							</ul>
							<h3>Typical Activities in the Metaverse</h3>
							<ul>
								{personality.activities.map((activity, index) => (
									<li key={index}>{activity}</li>
								))}
							</ul>
							<h3>Value to Virtual Environments</h3>
							<ul>
								{personality.values.map((value, index) => (
									<li key={index}>{value}</li>
								))}
							</ul>
							<br />
							<p>{personality.summary}</p>
							<br />
						</Card>
					))}
			</div>
		</>
	);
}
