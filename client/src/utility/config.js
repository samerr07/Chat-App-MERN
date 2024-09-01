
export const BASE_URL = "https://chat-app-mern-one-topaz.vercel.app/api/v1"

// export const BASE_URL = "https://chat-app-mern-lac.vercel.app/api/v1"



export const timeSince = (timestamp) => {
    const time = Date.parse(timestamp);
    const now = Date.now();
    const secondsPast = (now - time) / 1000;
    const suffix = 'ago';
  
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };
  
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      if (secondsPast >= secondsInUnit) {
        const count = Math.floor(secondsPast / secondsInUnit);
        return `${count} ${unit}${count > 1 ? 's' : ''} ${suffix}`;
      }
    }
  
    return 'Just Now';
  };


export function extractTime(dateString) {
    const date = new Date(dateString);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    return `${hours}:${minutes}`;
}
  
  // Helper function to pad single-digit numbers with a leading zero
  function padZero(number) {
    return number.toString().padStart(2, "0");
  }
