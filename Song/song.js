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
 // set time like digital clock
const timeMaker = function (time) {
  return String(Math.floor(time)).padStart(2, "0");
};

// show result in savebox
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
             item.startTime ? item.startTime: "not start"
           } and pause at
            ${item.TimeOfPause ? item.TimeOfPause : "not pause"}
      
          and end at ${item.endTime ? item.endTime : "not ended"}
      
         </div>`;

      saveBox.insertAdjacentHTML("afterbegin", part);
    });
  }
  saveBox.style.display = "flex";
});

// hide records of save box
RecordBtn[1].addEventListener("click", function () {
  saveBox.style.display = "none";
});

// play music func
 async function playMusicFunc () {
  const startTime = new Date().toLocaleTimeString();
  localStorage.setItem("startTime", startTime);
  isPlaying = true;
  await music.play();
};

//pause func music
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
function loadMusic(song) {
  music.src = song.path;
  musicTitleEl.textContent = song.displayName;
  musicArtistEl.textContent = song.artist;
  imgCoverEl.src = song.cover;
  musicTitleH3.textContent = song.displayName;
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
  durationEl.textContent = `${formattime(duration / 60) } : ${formattime(duration % 60)} ` ;
  currentTimeEl.textContent = `${formattime(currentTime / 60)} : ${formattime(currentTime % 60)}`;
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

// browser supported or not
// if ('mediaSession' in navigator) {
  
//   // تنظیم اطلاعات موزیک برای نوتیفیکیشن
//   navigator.mediaSession.metadata = new MediaMetadata({
//     title: songs[musicIndex].displayName,
//     artist: songs[musicIndex].artist,
//     album: 'HipHop', 
//     artwork: [
//       { src: songs[musicIndex].cover, sizes: '96x96', type: 'image/jpeg' },
//       { src: songs[musicIndex].cover, sizes: '128x128', type: 'image/jpeg' },
//       { src: songs[musicIndex].cover, sizes: '192x192', type: 'image/jpeg' },
//       { src: songs[musicIndex].cover, sizes: '256x256', type: 'image/jpeg' },
//       { src: songs[musicIndex].cover, sizes: '384x384', type: 'image/jpeg' },
//       { src: songs[musicIndex].cover, sizes: '512x512', type: 'image/jpeg' }
//     ]
//   });

//   // کنترل‌های پخش موزیک (Play, Pause, Next, Previous)
//   navigator.mediaSession.setActionHandler('play', async function() {
//     await playMusicFunc();  // اجرای تابع پخش موزیک
//     navigator.mediaSession.playbackState = "playing";  // به‌روزرسانی وضعیت پخش
//     updateMediaSession();
//   });

//   navigator.mediaSession.setActionHandler('pause', function() {
//     pauseMusicFunc();  // اجرای تابع توقف موزیک
//     navigator.mediaSession.playbackState = "paused";  // به‌روزرسانی وضعیت پخش
//     updateMediaSession();
//   });

//   navigator.mediaSession.setActionHandler('stop', function() {
//     pauseMusicFunc();  // اجرای تابع توقف موزیک
//     navigator.mediaSession.playbackState = "paused";  // به‌روزرسانی وضعیت پخش
//     updateMediaSession();
//   });

//   navigator.mediaSession.setActionHandler('previoustrack', function() {
//     changeMusic(-1);  // اجرای تابع تغییر موزیک به قبلی
//     navigator.mediaSession.playbackState = "playing";  // به‌روزرسانی وضعیت پخش
//     updateMediaSession();
//   });

//   navigator.mediaSession.setActionHandler('nexttrack', function() {
//     changeMusic(1);  // اجرای تابع تغییر موزیک به بعدی
//     navigator.mediaSession.playbackState = "playing";  // به‌روزرسانی وضعیت پخش
//     updateMediaSession();
//   });

//   // وقتی موزیک تغییر می‌کند یا پخش می‌شود، اطلاعات نوتیفیکیشن باید به‌روزرسانی شوند
//   function updateMediaSession() {
//     navigator.mediaSession.metadata = new MediaMetadata({
//       title: songs[musicIndex].displayName,
//       artist: songs[musicIndex].artist,
//       album: 'HipHop new release',
//       artwork: [
//         { src: songs[musicIndex].cover, sizes: '96x96', type: 'image/jpeg' },
//         { src: songs[musicIndex].cover, sizes: '128x128', type: 'image/jpeg' },
//         { src: songs[musicIndex].cover, sizes: '192x192', type: 'image/jpeg' },
//         { src: songs[musicIndex].cover, sizes: '256x256', type: 'image/jpeg' },
//         { src: songs[musicIndex].cover, sizes: '384x384', type: 'image/jpeg' },
//         { src: songs[musicIndex].cover, sizes: '512x512', type: 'image/jpeg' }
//       ]
//     });
//   }

//   // وقتی موزیک جدید لود می‌شود، نوتیفیکیشن را به‌روزرسانی می‌کنیم
//   loadMusic = function(songs) {
//     music.src = songs.path;
//     musicTitleEl.textContent = songs.displayName;
//     musicArtistEl.textContent = songs.artist;
//     imgCoverEl.src = songs.cover;
//     musicTitleH3.textContent = songs.displayName;
//     updateMediaSession();  // به‌روزرسانی Media Session
//   };

//   loadMusic(songs[musicIndex]);

// } else {
//   console.log('browser not supported');
// }




if ('mediaSession' in navigator) {
  // تنظیم metadata
  function updateMediaSession() {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: songs[musicIndex].displayName,
      artist: songs[musicIndex].artist,
      album: 'HipHop new release',
      artwork: [
        { src: songs[musicIndex].cover, sizes: '96x96', type: 'image/jpeg' },
        { src: songs[musicIndex].cover, sizes: '128x128', type: 'image/jpeg' },
        { src: songs[musicIndex].cover, sizes: '192x192', type: 'image/jpeg' },
        { src: songs[musicIndex].cover, sizes: '256x256', type: 'image/jpeg' },
        { src: songs[musicIndex].cover, sizes: '384x384', type: 'image/jpeg' },
        { src: songs[musicIndex].cover, sizes: '512x512', type: 'image/jpeg' }
      ]
    });
  }

  // هندلرهای مدیا کنترل
  navigator.mediaSession.setActionHandler('play', async function() {
    await playMusicFunc();  // اجرای تابع پخش موزیک
    navigator.mediaSession.playbackState = "playing";  // به‌روزرسانی وضعیت پخش
    updateMediaSession();  // به‌روزرسانی metadata
  });

  navigator.mediaSession.setActionHandler('pause', function() {
    pauseMusicFunc();  // اجرای تابع توقف موزیک
    navigator.mediaSession.playbackState = "paused";  // به‌روزرسانی وضعیت پخش
    updateMediaSession();  // به‌روزرسانی metadata
  });

  navigator.mediaSession.setActionHandler('stop', function() {
    pauseMusicFunc();  // اجرای تابع توقف موزیک
    navigator.mediaSession.playbackState = "paused";  // به‌روزرسانی وضعیت پخش
    updateMediaSession();  // به‌روزرسانی metadata
  });

  navigator.mediaSession.setActionHandler('previoustrack', function() {
    changeMusic(-1);  // اجرای تابع تغییر موزیک به قبلی
    navigator.mediaSession.playbackState = "playing";  // به‌روزرسانی وضعیت پخش
    updateMediaSession();  // به‌روزرسانی metadata
  });

  navigator.mediaSession.setActionHandler('nexttrack', function() {
    changeMusic(1);  // اجرای تابع تغییر موزیک به بعدی
    navigator.mediaSession.playbackState = "playing";  // به‌روزرسانی وضعیت پخش
    updateMediaSession();  // به‌روزرسانی metadata
  });

  // وقتی موزیک جدید لود می‌شود
    function loadMusic(songs) {
    music.src = songs.path;
    musicTitleEl.textContent = songs.displayName;
    musicArtistEl.textContent = songs.artist;
    imgCoverEl.src = songs.cover;
    musicTitleH3.textContent = songs.displayName;
    updateMediaSession();  // به‌روزرسانی Media Session
  };

  // لود موزیک اولیه
  loadMusic(songs[musicIndex]);
} else {
  console.log('browser not supported');
}

//notification
