import { exec } from 'child_process';
import path from 'path';

const ffprobePath = path.resolve(__dirname, '..', '..', '..', 'ffmpeg-master-latest-win64-gpl-shared', 'bin', 'ffprobe');

function formatDuration(durationInSeconds: any) {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = Math.floor(durationInSeconds % 60);

  return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function getVideoDuration(filePath: string) {
  return new Promise((resolve, reject) => {
    exec(`${ffprobePath} -i ${filePath} -show_entries format=duration -v quiet -of csv="p=0"`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderr) {
        reject(stderr);
        return;
      }
      const duration = parseFloat(stdout);
      const formatted = formatDuration(duration);
      resolve(formatted);
    });
  });
}
