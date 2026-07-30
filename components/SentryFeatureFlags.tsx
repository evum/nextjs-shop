'use client';

import { useEffect } from 'react';
import type { FeatureFlag } from '@/lib/feature-flags';
import { trackFeatureFlag } from '@/lib/feature-flags';

type SentryFeatureFlagsProps = {
	flags: Record<FeatureFlag, boolean>;
};

/**
 * Mirrors server-evaluated flags into the browser Sentry scope so client
 * errors and replays include the same feature-flag context.
 */
export default function SentryFeatureFlags({ flags }: SentryFeatureFlagsProps) {
	useEffect(() => {
		for (const [name, value] of Object.entries(flags)) {
			trackFeatureFlag(name, value);
		}
	}, [flags]);

	return null;
}
