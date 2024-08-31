const songs = [
  {
    path: "../musics/4VSsTvrmga.mp3",
    displayName: "beat",
    cover: "../imeages/beziley.JPG",
    artist: "leito",
    id: 1,
  },

  {
    path: "../musics/01.Az Tehran Motenaferan (BEAT).mp3",
    displayName: "Az Tehran Motenaferan",
    cover: "../imeages/az tehran motenaferan.JPG",
    artist: "Zedbazi",
    id: 2,
  },

  {
    path: "../musics/lam.mp3",
    displayName: "Look at me",
    cover:
      "../imeages/HD-wallpaper-xxxtentacion-paint-art-xxxtentacion-thumbnail.JPG",
    artist: "XXXTENTASION",
    id: 3,
  },

  {
    path: "../musics/Hiphopologist & Vinak - Belaad (128).mp3",
    displayName: "Hiphopologist & Vinak - Belaad",
    cover: "../imeages/belad.JPG",
    artist: "HIPHOPOLOGIST",
    id: 4,
  },

  {
    path: "../musics/دانلود آهنگ Butterfly از نازلی مکفیان کیفیت 320 - افق موزیک.mp3",
    displayName: "Butterfly",
    cover: "../imeages/nazli.JPG",
    artist: "Nazli Macfian",
    id: 5,
  },
  {
    path: "../musics/دانلود آهنگ جدید هیپ هاپولوژیست 1402 Hiphopologist - Hit Ava.mp3",
    displayName: "Noskhe",
    cover: "../imeages/hip.JPG",
    artist: "Hiphopologist",
    id: 6,
  },

  {
    path: "../musics/HgKyKgjOqS.mp3",
    displayName: "beat",
    cover: "../imeages/taakhar.JPG",
    artist: "Alireza JJ",
    id: 7,
  },
  {
    path: "../musics/O0n Mese Dadasham Bodmusic.mp3",
    displayName: "beat",
    cover: "../imeages/hichkas.JPG",
    artist: "mahdyr",
    id: 8,
  },
];

const playBtb = document.querySelector(".play");
const nextBtb = document.querySelector(".next");
const prevBtb = document.querySelector(".prev");
const musicTitleEl = document.querySelector(".side__header");
const musicTitleH3 = document.querySelector(".side__right-h3");
const musicArtistEl = document.querySelector(".side__p");
const imgCoverEl = document.querySelector(".container__img--thomb");
const playerProgressEl = document.querySelector(".player_progress");
const progressEl = document.querySelector(".progress");
const durationEl = document.querySelector("#duration");
const currentTimeEl = document.querySelector("#current_time");
const saveBox = document.querySelector("#content");
const RecordBtn = document.querySelectorAll(".check");
const playListItems = document.querySelectorAll(".side-bar__item");

const music = new Audio();
let musicIndex = 0;
let isPlaying = false;


const bars = document.querySelectorAll(".bar");

const timeMaker = function (time) {
  return String(Math.floor(time)).padStart(2, "0");
};

RecordBtn[0].addEventListener("click", function () {
  saveBox.innerHTML = "";
  if (!localStorage.getItem("musicRecords")) {
    const section = `
      
      <div class='content__text'>
    
      nothing recorded yet
      </div>
    
      `;
    saveBox.insertAdjacentHTML("afterbegin", section);
  } else {
    const musicRecordsArr = JSON.parse(localStorage.getItem("musicRecords"));
    
    musicRecordsArr.map(function (item, index) {
      let part = `
      
           <div class='content__text'> music starts at ${
             item.startTime
           } and pause at
            ${item.TimeOfPause ? item.TimeOfPause : "not pause"}
      
          and end at ${item.endTime ? item.endTime : "not ended"}
      
         </div>`;

      saveBox.insertAdjacentHTML("afterbegin", part);
    });
  }
  saveBox.style.display = "flex";
});
RecordBtn[1].addEventListener("click", function () {
  saveBox.style.display = "none";
});

const playMusicFunc = function () {
  const startTime = new Date().toLocaleTimeString();
  localStorage.setItem("startTime", startTime);
  isPlaying = true;
  music.play();
};

//pause music
const pauseMusicFunc = function () {
  const pauseTime = new Date().toLocaleTimeString();
  localStorage.setItem("pauseTime", pauseTime);
  playBtb.textContent = "▶";
  isPlaying = false;
  music.pause();
};

//paly song yes or not
const toggelMusic = () => (isPlaying ? pauseMusicFunc() : playMusicFunc());

//load music
function loadMusic(songs) {
  music.src = songs.path;
  musicTitleEl.textContent = songs.displayName;
  musicArtistEl.textContent = songs.artist;
  imgCoverEl.src = songs.cover;
  musicTitleH3.textContent = songs.displayName;
}

// change music
const changeMusic = function (direction) {
  playBtb.textContent = "❚❚";
  musicIndex = musicIndex + direction + (songs.length % songs.length);
  if (musicIndex < 0) {
    musicIndex = songs.length - 1;
  } else if (musicIndex >= songs.length) {
    musicIndex = songs.length - songs.length;
  } else {
    musicIndex = musicIndex;
  }
  isPlaying = false;
  loadMusic(songs[musicIndex]);
  isPlaying
    ? imgCoverEl.classList.remove("playing")
    : imgCoverEl.classList.add("weell", "playing");

  playMusicFunc();
};

// set progress

const setProgresBar = function (e) {
  const width = playerProgressEl.clientWidth;
  const xValue = e.offsetX;
  const maxOffset = width - 1;
  const clampedXValue = Math.min(xValue, maxOffset);
  const progressPercent = clampedXValue / width;
  music.currentTime = progressPercent * music.duration;
};

//set progress
function updateProgressBar() {
  const { duration, currentTime } = music;
  const ProgressPercent = (currentTime / duration) * 100;
  progressEl.style.width = `${ProgressPercent}%`;
  const formattime = (timeRanges) =>
    String(Math.floor(timeRanges)).padStart(2, "0");
  durationEl.textContent = `${formattime(duration / 60)} : ${formattime(
    duration % 60
  )}`;
  currentTimeEl.textContent = `${formattime(currentTime / 60)} : ${formattime(
    currentTime % 60
  )}`;
}

// rotate
playBtb.addEventListener("click", function () {
  playBtb.textContent = "❚❚";
  isPlaying
    ? imgCoverEl.classList.remove("playing")
    : imgCoverEl.classList.add("weell", "playing");
});
// rotate
const btnEvents = () => {
  playBtb.addEventListener("click", toggelMusic);
  nextBtb.addEventListener("click", () => changeMusic(1));
  prevBtb.addEventListener("click", () => changeMusic(-1));
  //========= Progressbar===========================
 // null update the pause time
  music.addEventListener("play", () => {
    const startTime = new Date().toLocaleTimeString();
    const TimeOfPause = null;
    const endTime = localStorage.getItem("endTime");
    const records = JSON.parse(localStorage.getItem("musicRecords")) || [];
    records.push({ startTime, endTime, TimeOfPause });
    localStorage.setItem("musicRecords", JSON.stringify(records));

    const musicRecordsStr = localStorage.getItem("musicRecords");
    
    saveBox.innerHTML = "";

    if (musicRecordsStr) {
     
      
        let part = `
      
           <div class='content__text'> play   music starts  at ${ startTime ? startTime : "not start" } 
    
         </div>`;

        saveBox.insertAdjacentHTML("afterbegin", part);
  
    } else {
      let part = `
      
      <div class='content__text'> 
      
      you have not record music yet
      </div>`;
      saveBox.insertAdjacentHTML("afterbegin", part);
    }
  });

  music.addEventListener("pause", () => {
    const endTime = localStorage.getItem("endTime");
    const startTime = localStorage.getItem("startTime");
    const TimeOfPause = new Date().toLocaleTimeString();

    const records = JSON.parse(localStorage.getItem("musicRecords")) || [];
    records.push({ startTime, endTime, TimeOfPause });
    localStorage.setItem("musicRecords", JSON.stringify(records));

    const musicRecordsStr = localStorage.getItem("musicRecords");

    saveBox.innerHTML = "";

    if (musicRecordsStr) {
    
      
        let part = `
      
           <div class='content__text'> 
            music Pause  at ${TimeOfPause ? TimeOfPause : "not pause"}
         </div>`;

        saveBox.insertAdjacentHTML("afterbegin", part);

    } else {
      let part = `
      
      <div class='content__text'> 
      
      you have not record music yet
      </div>`;
      saveBox.insertAdjacentHTML("afterbegin", part);
    }
  });

  music.addEventListener("ended", () => {
    const endTime = new Date().toLocaleTimeString();
    const startTime = localStorage.getItem("startTime");
    const TimeOfPause = localStorage.getItem("pauseTime");

    const records = JSON.parse(localStorage.getItem("musicRecords")) || [];
    records.push({ startTime, endTime, TimeOfPause });
    localStorage.setItem("musicRecords", JSON.stringify(records));

    const musicRecordsStr = localStorage.getItem("musicRecords");

    saveBox.innerHTML = "";

    if (musicRecordsStr) {
      
      
        let part = `
      
           <div class='content__text'> 
             music end   at ${endTime ? endTime : "not end"}
      
         </div>`;

        saveBox.insertAdjacentHTML("afterbegin", part);
      
    } else {
      let part = `
      
      <div class='content__text'> 
      
      you have not record music yet
      </div>`;
      saveBox.insertAdjacentHTML("afterbegin", part);
    }
  });

  music.addEventListener("ended", () => changeMusic(1));
  music.addEventListener("timeupdate", updateProgressBar);
  playerProgressEl.addEventListener("click", setProgresBar);
};
document.addEventListener("DOMContentLoaded", btnEvents);

loadMusic(songs[musicIndex]);

// playlist
const sideBarItems = document.querySelectorAll(".side-bar__item");
sideBarItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    musicIndex = index;
    isPlaying = false;
    isPlaying
      ? imgCoverEl.classList.remove("playing")
      : imgCoverEl.classList.add("weell", "playing");
    loadMusic(songs[musicIndex]);
    playBtb.textContent = "❚❚";
    playMusicFunc();
  });
});
//playlist

//notification


// ابتدا بررسی می‌کنیم که مرورگر Media Session API را پشتیبانی می‌کند یا خیر


//notification
