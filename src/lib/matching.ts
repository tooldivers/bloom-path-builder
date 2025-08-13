import type { Creator } from "@shared/schema";

export interface MatchScore {
  creator: Creator;
  score: number;
  reasons: string[];
}

export function calculateMatchScore(
  currentCreator: Creator,
  otherCreator: Creator
): MatchScore {
  let score = 0;
  const reasons: string[] = [];

  // Same niche bonus (high weight)
  if (currentCreator.niche === otherCreator.niche) {
    score += 70;
    reasons.push("Same niche");
  }

  // Audience size compatibility
  if (currentCreator.audienceSizeRange === otherCreator.audienceSizeRange) {
    score += 20;
    reasons.push("Similar audience size");
  } else if (isCompatibleAudienceSize(currentCreator.audienceSizeRange, otherCreator.audienceSizeRange)) {
    score += 10;
    reasons.push("Compatible audience size");
  }

  // Platform diversity bonus
  if (currentCreator.platform !== otherCreator.platform) {
    score += 5;
    reasons.push("Cross-platform reach");
  }

  // Goal alignment
  if (currentCreator.goal === otherCreator.goal) {
    score += 5;
    reasons.push("Aligned goals");
  }

  // Active status bonus
  if (otherCreator.isActive) {
    score += 5;
    reasons.push("Recently active");
  }

  return {
    creator: otherCreator,
    score: Math.min(score, 100), // Cap at 100
    reasons,
  };
}

function isCompatibleAudienceSize(range1: string, range2: string): boolean {
  const compatiblePairs = [
    ["micro", "1k"],
    ["1k", "5k+"],
    ["none", "micro"],
  ];

  return compatiblePairs.some(([a, b]) => 
    (range1 === a && range2 === b) || (range1 === b && range2 === a)
  );
}

export function findBestMatches(
  currentCreator: Creator,
  allCreators: Creator[],
  limit: number = 10
): MatchScore[] {
  const matches = allCreators
    .filter(creator => 
      creator.id !== currentCreator.id && 
      creator.isActive
    )
    .map(creator => calculateMatchScore(currentCreator, creator))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return matches;
}
