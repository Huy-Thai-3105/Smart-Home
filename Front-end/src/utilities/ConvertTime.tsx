export function convertToMinutesAndSeconds(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds - hours * 3600) / 60)
  const remainingSeconds = seconds % 60
  return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds
    .toString()
    .padStart(2, '0')}`
}
