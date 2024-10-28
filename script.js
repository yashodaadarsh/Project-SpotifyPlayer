console.log("Welcome to spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let songs = [
    { songName: "Love me again", filepath: "songs/1.mp3", coverpath: "covers/1.jpg" },
    { songName: "Love me again", filepath: "songs/2.mp3", coverpath: "covers/2.jpg" },
    { songName: "Love me again", filepath: "songs/3.mp3", coverpath: "covers/3.jpg" },
    { songName: "Love me again", filepath: "songs/4.mp3", coverpath: "covers/4.jpg" },
    { songName: "Love ain", filepath: "songs/5.mp3", coverpath: "covers/5.jpg" },
    { songName: "Love me again", filepath: "songs/6.mp3", coverpath: "covers/6.jpg" },
    { songName: "Love me again", filepath: "songs/7.mp3", coverpath: "covers/7.jpg" },
    { songName: "Love me again", filepath: "songs/8.mp3", coverpath: "covers/8.jpg" },
    { songName: "Love me again", filepath: "songs/9.mp3", coverpath: "covers/9.jpg" },
    { songName: "Love me again", filepath: "songs/10.mp3", coverpath: "covers/10.jpg" },

];
let playButton = document.getElementById("playLogo");
let progressBar = document.querySelector(".progressBar");
let gif = document.getElementById("gif");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let songInfo = document.querySelector(".songInfo");
// console.log(progressBar);
// console.log(playButton);
// audioElement.play();
// audioElement.pause();


songItem.forEach((element , i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByTagName("span")[0].innerText = songs[i].songName;
    let audioFile = new Audio(`${songs[i].filepath}`);
    audioFile.addEventListener("loadedmetadata", () => {
        let duration = audioFile.duration;
        let minutes = Math.floor(duration / 60);
        let seconds = Math.floor(duration % 60);
        let formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        element.getElementsByTagName("span")[3].innerText = formattedDuration;
    });
})

playButton.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playButton.classList.remove("fa-circle-play");
        playButton.classList.add("fa-circle-pause");
        audioElement.play();
        gif.style.opacity = 1;
    }
    else{
        playButton.classList.remove("fa-circle-pause");
    playButton.classList.add("fa-circle-play");
    audioElement.pause();
    gif.style.opacity = 0;
    }
    songInfo.innerText = songs[songIndex].songName;
});

audioElement.addEventListener("timeupdate", () => {
    // console.log(audioElement.currentTime);

    //Update SeekBar
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    progressBar.value = progress;
})

progressBar.addEventListener("change" , () => {
    audioElement.currentTime = (progressBar.value*audioElement.duration)/100;
});


const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("hover")).forEach((element) => {
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}
Array.from(document.getElementsByClassName("play")).forEach((element) => {
    element.addEventListener('click',(e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElement.currentTime = 0;
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.play();
        gif.style.opacity = 1;
        songInfo.innerText = songs[songIndex].songName;
        playButton.classList.remove("fa-circle-play");
        playButton.classList.add("fa-circle-pause");
    })
})
document.getElementById("next").addEventListener("click",() => {
    if( songIndex >= 9 ){
        songIndex = 1 ;
    }
    else{
        songIndex++;
    }
        audioElement.currentTime = 0;
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.play();
        gif.style.opacity = 1;
        songInfo.innerText = songs[songIndex].songName;
        playButton.classList.remove("fa-circle-play");
        playButton.classList.add("fa-circle-pause");
})
document.getElementById("previous").addEventListener("click",() => {
    if( songIndex <= 1 ){
        songIndex = 10 ;
    }
    else{
        songIndex--;
    }
        audioElement.currentTime = 0;
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.play();
        gif.style.opacity = 1;
        songInfo.innerText = songs[songIndex].songName;
        playButton.classList.remove("fa-circle-play");
        playButton.classList.add("fa-circle-pause");
})