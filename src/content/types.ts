export interface ItineraryDay {
    title: string;
    days: number;
    bullets: string[];
}

export interface DestinationGuide {
    slug: string;
    title: string;
    summary: string;
    highlights?: string[];
    whoItSuits: string[];
    gettingThere: string;
    gettingAround: string;
    bestTimeToVisit: string;
    goodToKnow: string;
    itineraries: ItineraryDay[];
}

export interface VillaLocalTips {
    slug: string; // The villa's slug
    aroundYourVilla: string;
    needACar: {
        level: "recommended" | "optional" | "notNeeded";
        text: string;
    };
    idealFor: string[];
    nearby?: Array<{
        label: string;
        note: string;
    }>;
}
