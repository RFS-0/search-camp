import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function parse(results) {
  const notifications = [];
  for (const result of results) {
    notifications.push({
      title: `Campsite "${result.site}" Available!`,
      message: `Campsite "${result.site}" is available at ${result.loop}!`,
      open: `https://www.recreation.gov/camping/campsites/${result.campsite_id}`,
      contentImage: path.join(__dirname, '/nature.jpg'),
      sound: 'Purr',
      wait: true,
      timeout: 30,
    })
  }
  return notifications;
}
