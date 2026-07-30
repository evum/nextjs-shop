import * as Sentry from '@sentry/nextjs';

/**
 * Declared feature flags. Defaults can be overridden via env:
 * - NEXT_PUBLIC_FEATURE_FLAGS='{"promo-banner":true,"express-checkout":false}'
 * - or NEXT_PUBLIC_FF_<NAME>=true|false (e.g. NEXT_PUBLIC_FF_PROMO_BANNER=true)
 */
export const FEATURE_FLAG_DEFAULTS = {
	'promo-banner': false,
	'express-checkout': false
} as const;

export type FeatureFlag = keyof typeof FEATURE_FLAG_DEFAULTS;

type FeatureFlagsIntegration = {
	addFeatureFlag: (name: string, value: unknown) => void;
};

function envKeyForFlag(flag: FeatureFlag): string {
	return `NEXT_PUBLIC_FF_${flag.replace(/-/g, '_').toUpperCase()}`;
}

function parseJsonOverrides(): Partial<Record<FeatureFlag, boolean>> {
	const raw = process.env.NEXT_PUBLIC_FEATURE_FLAGS;
	if (!raw) return {};

	try {
		const parsed = JSON.parse(raw) as Record<string, unknown>;
		const overrides: Partial<Record<FeatureFlag, boolean>> = {};

		for (const key of Object.keys(FEATURE_FLAG_DEFAULTS) as FeatureFlag[]) {
			if (typeof parsed[key] === 'boolean') {
				overrides[key] = parsed[key];
			}
		}

		return overrides;
	} catch {
		return {};
	}
}

function resolveFlag(flag: FeatureFlag): boolean {
	const fromJson = parseJsonOverrides()[flag];
	if (typeof fromJson === 'boolean') return fromJson;

	const fromEnv = process.env[envKeyForFlag(flag)];
	if (fromEnv === 'true') return true;
	if (fromEnv === 'false') return false;

	return FEATURE_FLAG_DEFAULTS[flag];
}

/** Attach a flag evaluation to the current Sentry scope (errors + transactions). */
export function trackFeatureFlag(flag: string, value: boolean): void {
	const integration = Sentry.getClient()?.getIntegrationByName(
		'FeatureFlags'
	) as FeatureFlagsIntegration | undefined;

	if (integration?.addFeatureFlag) {
		integration.addFeatureFlag(flag, value);
	}
}

/** Evaluate a flag and report the evaluation to Sentry. */
export function isFeatureEnabled(flag: FeatureFlag): boolean {
	const value = resolveFlag(flag);
	trackFeatureFlag(flag, value);
	return value;
}

/** Snapshot of all declared flags (each evaluation is tracked in Sentry). */
export function getFeatureFlags(): Record<FeatureFlag, boolean> {
	const flags = {} as Record<FeatureFlag, boolean>;

	for (const flag of Object.keys(FEATURE_FLAG_DEFAULTS) as FeatureFlag[]) {
		flags[flag] = isFeatureEnabled(flag);
	}

	return flags;
}
