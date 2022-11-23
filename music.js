const API_key = 'eb396e0cbdmshe638a9630b72f87p136c29jsn710173b09b44';


let toHtml = document.querySelector("section main section");
let player = document.querySelector("audio");
let userSearch = document.querySelector("input");
let trend = document.querySelectorAll("#trend article");
let songThumbnail = document.querySelector('#player img');
let duration = document.querySelector('#player li');
let pro_anim = document.getElementById('bubble');
let playButtons = document.querySelectorAll('#player ion-icon');
let playPrev = playButtons[0];
let play = playButtons[1];
let pause = playButtons[2];
let playNext = playButtons[3];

let trackName = document.querySelector('#player section h4')

let trackAlbum = document.querySelector('#player section span')


let data;

let songs;
trend.forEach((e, i) => {
  e.addEventListener("click", () => {
    let h4 = document.querySelectorAll("#trend h4");
    let keyword = h4[i].innerText.split(" ");
    if (keyword[0] == "SID") {
      searchSongs("sid%20sriram");

      return;
    }
    if (keyword[0] == "DEVI") {
      searchSongs("devi%20sri%20prasad");

      return;
    }
    searchSongs(keyword[0]);
  });
});
userSearch.addEventListener("search", () => {
  let keyword = userSearch.value.split(" ").join('%20');

  searchSongs(keyword);
});
searchSongs('justin%20bieber');
pause.addEventListener('click', () => {
  player.pause();
  pause.style.display = 'none';
  play.style.display = 'inline';
  pro_anim.style.animationPlayState = 'paused';

})

play.addEventListener('click', () => {
  player.play();
  play.style.display = 'none';
  pause.style.display = 'inline';
  pro_anim.style.animationPlayState = 'running';


});
let j = 0;
playNext.addEventListener('click', () => {
  j++;
  playSong(songs[j].id, songs[j].name, songs[j].thumbnail, songs[j].title, songs[j].duration);


})


playPrev.addEventListener('click', () => {
  j--;
  playSong(songs[j].id, songs[j].name, songs[j].thumbnail, songs[j].title, songs[j].duration);


})
function htmlData() {
  let check = songs.map((e, i) => {
    return `<article> <img src=${e.thumbnail} >
  <h5>${e.title.slice(0, 10)}</h5> <span>${e.album.name.slice(0, 17)}</span>
  </article>`;
  });
  toHtml.innerHTML = check.join("");

  let article = document.querySelectorAll("article");
  article.forEach((e, i) => {
    e.addEventListener("click", () => {
      playSong(songs[i].id, songs[i].name, songs[i].thumbnail, songs[i].title, songs[i].duration);
    });
  });
}

function toPlayer(song) {
  console.log(song);
  player.src = song;
  player.play();
  pro_anim.style.animationPlayState = 'running';


}

async function allSongs() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_key,
      "X-RapidAPI-Host": "youtube-music1.p.rapidapi.com",
    },
  };

  let temp = await fetch(
    "https://youtube-music1.p.rapidapi.com/v2/search?query=sid%20sriram",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      data = response;
    })
    .catch((err) => console.error(err));

  songs = data.result.songs;

  htmlData();
}
async function playSong(songId, name, thumb, title, timer) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_key,
      "X-RapidAPI-Host": "youtube-music1.p.rapidapi.com",
    },
  };

  let temp = fetch(
    `https://youtube-music1.p.rapidapi.com/get_download_url?id=${songId}&ext=mp3`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      toPlayer(response.result.download_url);
    });
  songThumbnail.src = thumb;
  duration.innerHTML = `${Math.trunc(timer / 60)}:${timer % 60} `;
  pro_anim.style.animationDuration = timer + 's';
  trackName.innerHTML = title;
  trackAlbum.innerHTML = name;


}

async function searchSongs(artist) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_key,
      "X-RapidAPI-Host": "youtube-music1.p.rapidapi.com",
    },
  };

  let temp = await fetch(
    `https://youtube-music1.p.rapidapi.com/v2/search?query=${artist}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      data = response;
    })
    .catch((err) => console.error(err));

  songs = data.result.songs;

  htmlData();
}
