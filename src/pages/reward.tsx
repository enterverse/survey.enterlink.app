import { type PropsWithChildren, useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@udecode/cn";

import { useFetch } from "../use-fetch";
import { Skeleton } from "../components/skeleton";
import { ShareButton } from "../components/copy";
import { Card } from "../components/card";

import type { Personality } from "../personality";

export function Reward() {
	return (
		<main
			className="flex min-h-screen w-full select-none flex-col bg-neutral-950"
			vaul-drawer-wrapper=""
		>
			<nav className="flex w-full flex-row items-center justify-between gap-2 bg-neutral-950 p-4">
				<Link className="flex flex-row items-center gap-2" to="/">
					<img alt="enterlink" className="size-10" src="/logo.webp" />
					<h1 className="text-lg font-semibold">enterlink</h1>
				</Link>
				<Link
					className="rounded-full bg-pink-600 px-6 py-2 text-center transition-colors hover:bg-pink-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-50"
					to="/"
				>
					Take Survey
				</Link>
			</nav>
			<RewardPage />
		</main>
	);
}

interface RewardData {
	personalityKey: string;
	creativeScore: number;
	consumptiveScore: number;
	interactiveScore: number;
	observationalScore: number;
	riskTakingScore: number;
	safetySeekingScore: number;
	strategicScore: number;
	spontaneousScore: number;
	genLore: string;
}

function Loading() {
	return (
		<div className="flex w-full max-w-4xl flex-col gap-12">
			<Skeleton className="mx-auto size-52 shrink-0 rounded-full" />

			<div className="flex animate-pulse flex-col gap-2 text-pink-400">
				<h1 className="text-center text-3xl font-semibold">Loading</h1>
				<Skeleton className="mx-auto h-4 w-1/2 rounded-full" />
			</div>
		</div>
	);
}

function RewardPage() {
	const { id: idStringUndefined } = useParams<{ id: string }>();
	const id = useMemo(() => idStringUndefined!, [idStringUndefined]);

	const {
		data: personalities,
		error: personalitiesError,
		loading: personalitiesLoading
	} = useFetch<Array<Personality>>("https://admin.enterlink.app/api/personas");

	const {
		data: reward,
		error: rewardError,
		loading: rewardLoading
	} = useFetch<RewardData>(
		id === "test01"
			? "/test_result.json"
			: `https://admin.enterlink.app/api/reward/${id}`
	);

	const loading = personalitiesLoading || rewardLoading;
	const error = personalitiesError || rewardError;

	const personality = useMemo(() => {
		if (!personalities || !reward) {
			return null;
		}

		const personality = personalities.find(
			(personality) => personality.key === reward.personalityKey
		);

		if (!personality) {
			throw new Error("Invalid personality key");
		}

		return personality;
	}, [personalities, reward]);

	const goldenPair = useMemo(() => {
		if (!personality || !personalities) {
			return null;
		}

		const golden = personalities.find(
			(_personality) => _personality.key === personality.goldenPair
		);

		if (!golden) {
			throw new Error("Invalid golden pair key");
		}

		return golden;
	}, [personality, personalities]);

	const similarTypes = useMemo(() => {
		if (!personality || !personalities) {
			return null;
		}

		const similar = personality.similarTypes.map((key) => {
			const similar = personalities.find(
				(_personality) => _personality.key === key
			);

			if (!similar) {
				throw new Error("Invalid similar type key");
			}

			return similar;
		});

		return similar;
	}, [personality, personalities]);

	return (
		<section className="flex size-full flex-col items-center p-6">
			<div className="flex w-full max-w-4xl flex-col gap-8">
				<div className="flex flex-col gap-2">
					<h1 className="text-3xl font-semibold">Metaverse Personality</h1>
					<h2 className="text-xl font-semibold text-pink-400">
						Your personalized profile:
					</h2>
				</div>
				{loading && <Loading />}
				{error && (
					<p className="text-xl text-red-400">Invalid Reward ID :{"<"}</p>
				)}
				{reward && personality && goldenPair && similarTypes && (
					<RewardArea
						goldenPair={goldenPair}
						personality={personality}
						reward={reward}
						similarTypes={similarTypes}
					/>
				)}
			</div>
		</section>
	);
	// return <div className="whitespace-pre">{JSON.stringify(data, null, 2)}</div>;
}

function NavLink({
	to,
	children,
	default: defaultOption
}: PropsWithChildren<{ to?: string; default?: boolean }>) {
	const [parameters] = useSearchParams();
	const page = parameters.get("p");
	const isActive = page ? page === to : defaultOption;

	return (
		<Link
			to={to ? `?p=${to}` : ""}
			className={cn(
				"text-2xl font-semibold text-neutral-500 focus-visible:outline-none hover:text-neutral-400 transition-colors pb-1 focus-visible:ring-4 focus-visible:ring-neutral-50",
				isActive && "!text-neutral-50 border-b border-b-neutral-50"
			)}
		>
			{children}
		</Link>
	);
}

function replaceEscapedNewlines(string_: string) {
	// eslint-disable-next-line unicorn/prefer-string-replace-all
	return string_.replace(/\\n/g, "\n");
}

function RewardArea({
	personality,
	goldenPair,
	similarTypes,
	reward
}: {
	personality: Personality;
	goldenPair: Personality;
	similarTypes: Array<Personality>;
	reward: RewardData;
}) {
	// This could have been done more elegantly with context components
	// but a bit too lazy, its friday and this is on a crunch :3
	const [parameters] = useSearchParams();
	const page = parameters.get("p");

	const InjectMeOwO = {
		default: <AboutYou lore={replaceEscapedNewlines(reward.genLore)} />,
		stats: (
			<Stats
				cvc={[reward.creativeScore, reward.consumptiveScore]}
				ivo={[reward.interactiveScore, reward.observationalScore]}
				rvs={[reward.riskTakingScore, reward.safetySeekingScore]}
				svs={[reward.strategicScore, reward.spontaneousScore]}
			/>
		),
		arche: <Characteristics personality={personality} />,
		compt: (
			<CompatibleTypes goldenPair={goldenPair} similarTypes={similarTypes} />
		)
	};

	return (
		<div className="flex w-full max-w-4xl flex-col gap-12">
			<img
				// alt={personality.name}
				className="mx-auto size-52 shrink-0"
				src={personality.iconUrl}
			/>
			<div>
				<h1 className="text-center text-3xl font-semibold">
					{personality.name}
				</h1>
				<h2 className="mt-1 text-center text-lg leading-tight text-neutral-400">
					{personality.traits.map(({ name }) => name).join(", ")}
				</h2>
			</div>
			<ShareButton
				className="mx-auto"
				href={window.location.origin + window.location.pathname}
				shareText="Share your results"
			/>
			<div className="h-px w-full bg-neutral-800" />
			<nav className="flex w-full flex-row gap-6 overflow-x-auto text-2xl font-semibold text-neutral-400 scrollbar-none *:shrink-0">
				<NavLink default>Lore</NavLink>
				<NavLink to="stats">Stats</NavLink>
				<NavLink to="arche">Archetype</NavLink>
				<NavLink to="compt">Compatible Types</NavLink>
			</nav>
			{/* @ts-expect-error i dont care its friday */}
			{InjectMeOwO[page || "default"]}
			<footer className="mt-auto pt-12">
				<p className="text-sm text-neutral-400">
					© VEU Inc. {new Date().getFullYear()} - All Rights Reserved
				</p>
				<Link
					className="rounded text-xs text-pink-400 transition-all hover:text-pink-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-50"
					to="/terms"
				>
					Terms and Conditions
				</Link>
			</footer>
		</div>
	);
}

function NextButton({ to, children }: PropsWithChildren<{ to: string }>) {
	return (
		<Link
			className="flex flex-col items-end rounded transition-all hover:brightness-90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-50"
			to={to}
			onClick={() => {
				setTimeout(() => {
					window.scrollTo({ top: 0, behavior: "smooth" });
				}, 10);
			}}
		>
			<div className="flex flex-row items-center gap-1 text-pink">
				<p>Next</p>
				<ArrowRight className="size-3.5" />
			</div>
			<p className="text-2xl font-semibold">{children}</p>
		</Link>
	);
}

function BackButton({ to, children }: PropsWithChildren<{ to: string }>) {
	return (
		<Link
			className="flex flex-col items-start rounded transition-all hover:brightness-90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-50"
			to={to}
			onClick={() => {
				setTimeout(() => {
					window.scrollTo({ top: 0, behavior: "smooth" });
				}, 1);
			}}
		>
			<div className="flex flex-row items-center gap-1 text-pink">
				<ArrowLeft className="size-3.5" />
				<p>Prev</p>
			</div>
			<p className="text-2xl font-semibold">{children}</p>
		</Link>
	);
}

function AboutYou({ lore }: { lore: string }) {
	return (
		<div className="flex flex-col gap-8">
			<article className="prose prose-neutral prose-invert w-full max-w-4xl">
				<p className="whitespace-pre-wrap break-words">{lore}</p>
			</article>
			<div className="flex animate-pulse flex-row items-center gap-2 text-xs text-pink-400">
				<Sparkles className="size-3.5" />
				<p>Powered By VEA AI</p>
			</div>
			{/* Next */}
			<div className="flex w-full flex-row items-center justify-end">
				<NextButton to="?p=stats">Stats</NextButton>
			</div>
		</div>
	);
}

function StatBar({
	left,
	right
}: {
	left: { percent: number; label: string };
	right: { percent: number; label: string };
}) {
	const leftHigher = left.percent > right.percent;
	const higherNumber = leftHigher ? left.percent : right.percent;

	return (
		<div className="flex flex-col gap-1">
			<div className="flex flex-row items-center gap-2 text-neutral-400">
				<p
					className={cn(
						"w-10 shrink-0 text-left",
						leftHigher && "text-pink-400 font-medium"
					)}
				>
					{left.percent}%
				</p>
				<div className="relative h-5 w-full overflow-hidden rounded-full bg-neutral-800">
					<div
						className={cn(
							"absolute top-0 h-5 rounded-full bg-pink-500",
							leftHigher
								? "left-0 transition-all animate-in duration-700 slide-in-from-left-full"
								: "right-0 transition-all animate-in duration-700 slide-in-from-right-full"
						)}
						style={{
							width: `${higherNumber}%`
						}}
					/>
				</div>
				<p
					className={cn(
						"w-10 shrink-0 text-right",
						!leftHigher && "text-pink-400 font-medium"
					)}
				>
					{right.percent}%
				</p>
			</div>
			<div className="flex flex-row justify-between text-neutral-400">
				<p
					className={cn("text-left", leftHigher && "text-pink-400 font-medium")}
				>
					{left.label}
				</p>
				<p
					className={cn(
						"text-right",
						!leftHigher && "text-pink-400 font-medium"
					)}
				>
					{right.label}
				</p>
			</div>
		</div>
	);
}

function Stats({
	cvc,
	ivo,
	rvs,
	svs
}: {
	cvc: [number, number];
	ivo: [number, number];
	rvs: [number, number];
	svs: [number, number];
}) {
	return (
		<div className="flex flex-col gap-12">
			<StatBar
				left={{ percent: cvc[0], label: "Creative" }}
				right={{ percent: cvc[1], label: "Consumptive" }}
			/>
			<StatBar
				left={{ percent: ivo[0], label: "Interactive" }}
				right={{ percent: ivo[1], label: "Observational" }}
			/>
			<StatBar
				left={{ percent: rvs[0], label: "Risk-Taking" }}
				right={{ percent: rvs[1], label: "Safety-Seeking" }}
			/>
			<StatBar
				left={{ percent: svs[0], label: "Strategic" }}
				right={{ percent: svs[1], label: "Spontaneous" }}
			/>
			<article className="prose prose-neutral prose-invert w-full max-w-4xl">
				<h3 className="font-medium">Creative vs. Consumptive</h3>
				<h4 className="font-medium text-neutral-300">Creative</h4>
				<p>
					Individuals who fall on the creative side of this axis are typically
					those who generate original ideas, innovate, and prefer to create
					content or add something new to the virtual environment. They are
					often involved in developing new projects, artistic endeavors, or
					pioneering solutions.
				</p>
				<h4 className="font-medium text-neutral-300">Consumptive</h4>
				<p>
					Those on the consumptive side tend to engage more with content that
					others have created. They prefer consuming, learning from, and
					interacting with existing materials, environments, or systems rather
					than creating from scratch.
				</p>
				<h3 className="font-medium">Interactive vs. Observational</h3>
				<h4 className="font-medium text-neutral-300">Interactive</h4>
				<p>
					Interactive personalities thrive on direct engagement with others and
					the environment. They are socially active, prefer hands-on
					experiences, and often seek out collaborative opportunities in both
					social and professional aspects of the virtual world.
				</p>
				<h4 className="font-medium text-neutral-300">Observational</h4>
				<p>
					Observational individuals are more reserved in their approach; they
					prefer to watch, listen, and analyze before jumping in. They enjoy
					understanding the environment or situation from a distance and are
					more reflective about their engagement with the virtual world.
				</p>
				<h3 className="font-medium">Risk-Taking vs. Safety-Seeking</h3>
				<h4 className="font-medium text-neutral-300">Risk-Taking</h4>
				<p>
					Risk-takers are willing to take chances and experiment with new ideas
					or behaviors. They are not afraid of potential failures and often
					venture into unknown or less explored areas of the virtual world,
					seeking excitement and innovation.
				</p>
				<h4 className="font-medium text-neutral-300">Safety-Seeking</h4>
				<p>
					Those who are safety-seeking prioritize stability, security, and
					predictability. They prefer environments where risks are minimized and
					where there are clear guidelines and safety nets. They tend to
					approach the virtual world with caution, emphasizing personal and
					communal safety.
				</p>
				<h3 className="font-medium ">Strategic vs. Spontaneous</h3>
				<h4 className="font-medium text-neutral-300">Strategic</h4>
				<p>
					Strategic personalities plan their actions carefully and consider
					long-term goals and implications. They are methodical and calculated,
					preferring to think several steps ahead. They excel in roles that
					require careful planning and foresight.
				</p>
				<h4 className="font-medium text-neutral-300">Spontaneous</h4>
				<p>
					Spontaneous individuals prefer to act on impulse and are driven by
					their immediate reactions to situations. They are adaptable and
					flexible, often thriving in environments that require quick thinking
					and responsiveness without a preset plan.
				</p>
			</article>
			<div className="flex w-full flex-row items-center justify-between">
				<BackButton to="">Lore</BackButton>
				<NextButton to="?p=arche">Archetype</NextButton>
			</div>
		</div>
	);
}

function Characteristics({ personality }: { personality: Personality }) {
	return (
		<div className="flex flex-col gap-12">
			<article className="prose prose-neutral prose-invert w-full max-w-4xl prose-headings:font-medium">
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
			</article>
			<div className="flex w-full flex-row items-center justify-between">
				<BackButton to="?p=stats">Stats</BackButton>
				<NextButton to="?p=compt">Compatible Types</NextButton>
			</div>
		</div>
	);
}

function CompatibleTypes({
	goldenPair,
	similarTypes
}: {
	goldenPair: Personality;
	similarTypes: Array<Personality>;
}) {
	return (
		<div className="flex flex-col gap-12">
			<div className="flex flex-col gap-5">
				<article className="prose prose-neutral prose-invert w-full max-w-4xl prose-headings:font-medium">
					<h3>Your Complementary Counterpart</h3>
					<p>
						Your &quot;Golden Pairing&quot; is a complementary match between two
						personality type profiles, where each type&apos;s contrasting traits
						ideally balance and enhance the other, fostering mutual growth and
						harmony.
					</p>
				</article>
				<Card
					description={goldenPair.shortDescription}
					key={goldenPair.key}
					title={goldenPair.name}
					traits={goldenPair.traits.map((trait) => trait.name).join(", ")}
				>
					<h3>Metaverse Role</h3>
					<p>{goldenPair.description}</p>
					<h3>Key Traits</h3>
					<ul>
						{goldenPair.traits.map((trait) => (
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
						{goldenPair.activities.map((activity, index) => (
							<li key={index}>{activity}</li>
						))}
					</ul>
					<h3>Value to Virtual Environments</h3>
					<ul>
						{goldenPair.values.map((value, index) => (
							<li key={index}>{value}</li>
						))}
					</ul>
					<br />
					<p>{goldenPair.summary}</p>
					<br />
				</Card>
			</div>
			<div className="flex flex-col gap-5">
				<article className="prose prose-neutral prose-invert w-full max-w-4xl prose-headings:font-medium">
					<h3>Harmonious Types</h3>
					<p>
						Your Harmonious types are the four personality types most closely
						aligned with a particular profile, differing by just one trait,
						which offers a strong foundation for understanding, collaboration,
						and affinity.
					</p>
				</article>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(26rem,1fr))]">
					{similarTypes.map((personality) => (
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
				<Link className="text-pink-400 hover:text-pink-500" to="/">
					see all types
				</Link>
			</div>

			<div className="flex w-full flex-row items-center justify-start">
				<BackButton to="?p=arche">Archetype</BackButton>
			</div>
		</div>
	);
}
