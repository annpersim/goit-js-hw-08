import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');
const CURRENT_TIME = 'videoplayer-current-time';

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate(data) {
  localStorage.setItem(CURRENT_TIME, JSON.stringify(data.seconds));
}

const currentTime = localStorage.getItem(CURRENT_TIME);
player.setCurrentTime(currentTime);
