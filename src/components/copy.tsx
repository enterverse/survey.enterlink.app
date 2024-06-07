import { cn } from "@udecode/cn";
import { Share2 } from "lucide-react";
import { type HTMLAttributes, forwardRef, useEffect, useState } from "react";

import { copyToClipboard } from "../clipboard";

const ShareButton = forwardRef<
	HTMLButtonElement,
	HTMLAttributes<HTMLButtonElement> & {
		href: string;
		shareText?: string;
	}
>(({ className, href, shareText = "Share", onClick, ...props }, reference) => {
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
		<button
			ref={reference}
			type="button"
			className={cn(
				"flex w-52 flex-row items-center justify-center gap-2 rounded-full border border-neutral-800 py-2 transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-50",
				className
			)}
			onClick={() =>
				// @ts-expect-error this is fine!
				copyToClipboard(href) && setCopyText("Copied!") && onClick?.()
			}
			{...props}
		>
			<Share2 className="size-4" />
			<p>{copyText || shareText}</p>
		</button>
	);
});

ShareButton.displayName = "ShareButton";

export { ShareButton };
