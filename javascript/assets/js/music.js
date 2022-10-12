const allMusic = [
    {
        name: "Campfire",
        artist: "Telecasted",
        img: "music__img1",
        audio: "music_audio01"
    },
    {
        name: "Gunpowder Tea",
        artist: "Mini Vandals",
        img: "music__img2",
        audio: "music_audio02"
    },
    {
        name: "Immortal",
        artist: "NEFFEX",
        img: "music__img3",
        audio: "music_audio03"
    },
    {
        name: "No Filter",
        artist: "NEFFEX",
        img: "music__img4",
        audio: "music_audio04"
    },
    {
        name: "Read All Over",
        artist: "Nathan Moore",
        img: "music__img5",
        audio: "music_audio05"
    }, 
    {
        name: "Teasing the King",
        artist: "Nathan Moore",
        img: "music__img6",
        audio: "music_audio06"
    },
    {
        name: "Tell Me That I Can't (Clean)",
        artist: "NEFFEX",
        img: "music__img7",
        audio: "music_audio07"
    },
    {
        name: "The Goon's Loose",
        artist: "Nathan Moore",
        img: "music__img8",
        audio: "music_audio08"
    },
    {
        name: "Winning",
        artist: "NEFFEX",
        img: "music__img9",
        audio: "music_audio09"
    },    {
        name: "Sunshine",
        artist: "Telecasted",
        img: "music__img10",
        audio: "music_audio10"
    }
]

const musicWrap = document.querySelector(".music__wrap");
const musicView = document.querySelector(".music__view .img img");
const musicName = document.querySelector(".music__view .title h3");
const musicArtist = document.querySelector(".music__view .title p");
const musicAudio = document.querySelector("#main-audio");

const musicPlay = document.querySelector("#control-play");
const musicPrevBtn = document.querySelector("#control-prev");
const musicNextBtn = document.querySelector("#control-next");

let musicIndex = 3;

//음악 재생

function loadMusic(num){
    musicName.innerText = allMusic[num-1].name;
    musicArtist.innerText = allMusic[num-1].artist;
    musicView.src=`../assets/img/${allMusic[num-1] .img}.png`;
    musicView.art= allMusic[num-1].name;
    musicAudio.src=`../assets/audio/${allMusic[num-1] .audio}.mp3`
}

//재생버튼
function playMusic(){
    musicAudio.play();
}

//정지버튼
function pauseMusic(){

}

//이전 곡 듣기
function prevMusic(){

}

//다음 곡 듣기
function nextMusic(){

}


window.addEventListener("load",()=> {
    loadMusic(musicIndex);
})


//플레이 버튼

musicPlay.addEventListener("click", ()=>{
    playMusic();
})