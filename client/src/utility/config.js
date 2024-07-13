export const BASE_URL = "https://chat-app-mern-swart.vercel.app/api/v1"


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
