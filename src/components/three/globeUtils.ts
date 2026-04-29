export const stableNoise = (seed: number) => {
  const wave = Math.sin(seed * 12.9898) * 43758.5453;
  return wave - Math.floor(wave);
};
