// Assuming $0.006 per minute for Whisper API
const COST_PER_MINUTE = 0.006;

export const calculateTranscriptionCost = (durationInSeconds) => {
  const durationInMinutes = durationInSeconds / 60;
  return (durationInMinutes * COST_PER_MINUTE).toFixed(4);
};