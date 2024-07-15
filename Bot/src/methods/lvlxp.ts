export function calculateLevelXP(totalXP: number): {
  level: number;
  xpOnLevel: number;
  totalXPForLevel: number;
} {
  let currentLevel: number = 1;
  let levelXP: number = 35; // Starting XP for level 1
  let accumulatedXP: number = 0;

  while (accumulatedXP + levelXP <= totalXP) {
    accumulatedXP += levelXP;
    currentLevel++;

    if (currentLevel === 2) {
      levelXP = 103; // XP for level 2
    } else {
      levelXP += 70; // Increment by 70 for subsequent levels
    }
  }

  const xpOnLevel = totalXP - accumulatedXP;
  const totalXPForLevel = levelXP;
  return { level: currentLevel - 1, xpOnLevel, totalXPForLevel };
}
