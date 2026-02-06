import { DestinationGuide, VillaLocalTips } from './types';

// Static imports for Vite reliability
import costaDelSolGuide from './destinations/costa-del-sol.json';
import saraSolTips from './villas/sara-sol.json';

const destinationGuides: Record<string, DestinationGuide> = {
    'costa-del-sol': costaDelSolGuide as DestinationGuide,
};

const villaTips: Record<string, VillaLocalTips> = {
    'sara-sol': saraSolTips as VillaLocalTips,
};

/**
 * Returns the destination guide for a given slug.
 * Returns null if not found.
 */
export function getDestinationGuide(slug: string): DestinationGuide | null {
    return destinationGuides[slug] || null;
}

/**
 * Returns the local tips for a given villa slug.
 * Returns null if not found.
 */
export function getVillaTips(slug: string): VillaLocalTips | null {
    return villaTips[slug] || null;
}
