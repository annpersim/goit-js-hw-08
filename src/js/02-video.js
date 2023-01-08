import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');
const CURRENT_TIME = 'videoplayer-current-time';

player.on(
  'timeupdate',
  throttle(data => {
    setCurrentTime(data);
  }, 1000)
);

player
  .setCurrentTime(getLocalStorage(CURRENT_TIME))
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        console.log(
          `${error}`,
          '\n',
          `Seconds value: ${getLocalStorage(CURRENT_TIME)}`
        );
        break;

      default:
        console.log(`${error}`);
        break;
    }
  });

function setCurrentTime(data) {
  setLocalStorage(CURRENT_TIME, data.seconds);
}

function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}
