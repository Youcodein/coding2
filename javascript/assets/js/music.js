const allMusic = [
    {
        name: "1. Campfire",
        artist: "Telecasted",
        img: "music__img1",
        audio: "music_audio01"
    },
    {
        name: "2. Gunpowder Tea",
        artist: "Mini Vandals",
        img: "music__img2",
        audio: "music_audio02"
    },
    {
        name: "3. Immortal",
        artist: "NEFFEX",
        img: "music__img3",
        audio: "music_audio03"
    },
    {
        name: "4. No Filter",
        artist: "NEFFEX",
        img: "music__img4",
        audio: "music_audio04"
    },
    {
        name: "5. Read All Over",
        artist: "Nathan Moore",
        img: "music__img5",
        audio: "music_audio05"
    }, 
    {
        name: "6. Teasing the King",
        artist: "Nathan Moore",
        img: "music__img6",
        audio: "music_audio06"
    },
    {
        name: "7. Tell Me That I Can't (Clean)",
        artist: "NEFFEX",
        img: "music__img7",
        audio: "music_audio07"
    },
    {
        name: "8. The Goon's Loose",
        artist: "Nathan Moore",
        img: "music__img8",
        audio: "music_audio08"
    },
    {
        name: "9. Winning",
        artist: "NEFFEX",
        img: "music__img9",
        audio: "music_audio09"
    },    {
        name: "10. Sunshine",
        artist: "Telecasted",
        img: "music__img10",
        audio: "music_audio10"
    }
]

const musicWrap = document.querySelector(".music__wrap");
const musicView = musicWrap.querySelector(".music__view .img img");
const musicName = musicWrap.querySelector(".music__view .title h3");
const musicArtist = musicWrap.querySelector(".music__view .title p");
const musicAudio = musicWrap.querySelector("#main-audio");

const musicPlay = musicWrap.querySelector("#control-play");
// const musicPause = musicWrap.querySelector("#control-stop");
const musicPrevBtn = musicWrap.querySelector("#control-prev");
const musicNextBtn = musicWrap.querySelector("#control-next");
const musicProgress = musicWrap.querySelector(".progress");
const musicProgressBar = musicWrap.querySelector(".progress .bar");
const musicProgressCurrent = musicWrap.querySelector(".progress .timer .current");
const musicProgressDuration = musicWrap.querySelector(".progress .timer .duration");

const musicRepeat = musicWrap.querySelector("#control-repeat");

const musicListBtn = musicWrap.querySelector("#control-list");
const musicList = musicWrap.querySelector(".music__list");
const musicListUl = musicWrap.querySelector(".music__list ul");

let musicIndex = 3;

//음악 재생

function loadMusic(num){
    musicName.innerText = allMusic[num-1].name;
    musicArtist.innerText = allMusic[num-1].artist;
    musicView.src=`../assets/img/${allMusic[num-1] .img}.png`;
    musicView.art= allMusic[num-1].name;
    musicAudio.src=`../assets/audio/${allMusic[num-1] .audio}.mp3`
}

// 재생버튼
function playMusic(){
    musicWrap.classList.add("paused");
    musicPlay.setAttribute("title","정지");
    musicPlay.setAttribute("class","stop");
    musicAudio.play();
}
// 정지버튼
function pauseMusic(){
    musicWrap.classList.remove("paused");
    musicAudio.pause();
    musicPlay.setAttribute("title","재생");
    musicPlay.setAttribute("class","play");
}

//이전 곡 듣기
function prevMusic(){
    //musicIndex --
    musicIndex == 1 ? musicIndex = allMusic.length : musicIndex--;
    loadMusic(musicIndex);
    playMusic();
}

//다음 곡 듣기
function nextMusic(){
    //musicIndex ++
    musicIndex == allMusic.length ? musicIndex = 1 : musicIndex++;
    loadMusic(musicIndex);
    playMusic();
}

// 뮤직 진행바
musicAudio.addEventListener("timeupdate", e => {
    // console.log(e);
    const currentTime = e.target.currentTime;           //오디오의 현재 재생되는 시간
    const duration = e.target.duration;                 //오디오의 총 길이
    let progressWidth = (currentTime/duration) * 100;   //전체 깅이에서 현재 진행되는 시간을 백분위로 나눠줌

    musicProgressBar.style.width = `${progressWidth}%`;

    //전체 시간
    musicAudio.addEventListener("loadeddata", ()=>{
        let audioDuration = musicAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);  //전체 시간(초)을 분단위로 쪼갬
        let totalSec = Math.floor(audioDuration % 60);  //남은 초를 저장

        if(totalSec < 10) totalSec = `0${totalSec}`;    //초가 한 자리 수 일때 10의 자리에 0을 붙임
        musicProgressDuration.innerText = `${totalMin}:${totalSec}`;    //완성된 시간 문자열
    })

    //진행 시간
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec<10) currentSec = `0${currentSec}`;
    musicProgressCurrent.innerText = `${currentMin}:${currentSec}`;

});

//진행 버튼 클릭
musicProgress.addEventListener("click", (e) => {
    let progressWidth =musicProgress.clientWidth;   //진행바 전체 길이
    let clickedOffsetX = e.offsetX;                 //진행바 기준으로 측정되는 X좌표값
    let songDuration = musicAudio.duration;         //오디오 전체 길이

    musicAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration    //백분위로 나눈 숫자에 다시 전체 길이를 곱해서 현재 재생값으로 바꿈
})

//반복 버튼 클릭
musicRepeat.addEventListener("click", () => {
    let getAttr = musicRepeat.getAttribute("class");
    
    switch(getAttr){
        case "repeat" :
            musicRepeat.setAttribute("class", "repeat_one");
            musicRepeat.setAttribute("title", "한곡 반복");
        break;

        case "repeat_one" :
            musicRepeat.setAttribute("class", "shuffle");
            musicRepeat.setAttribute("title", "랜덤 반복");
        break;

        case "shuffle" :
            musicRepeat.setAttribute("class", "repeat");
            musicRepeat.setAttribute("title", "전체 반복");
        break;
    }
});

//오디오가 끝나면
musicAudio.addEventListener("ended", ()=>{
    let getAttr = musicRepeat.getAttribute("class");
    
    switch(getAttr){
        case "repeat" : 
            nextMusic();
        break;

        case "repeat_one" :
            playMusic();
        break;

        case "shuffle" : 
            let randomIndex = Math.floor(Math.random() * allMusic.length + 1);  //랜덤 인덱스 생성

            do {
                randomIndex = Math.floor(Math.random() * allMusic.length + 1);
            } while ( musicIndex == randomIndex)
            musicIndex = randomIndex;   //현재 인덱스를 랜덤 인덱스로 변경
            loadMusic(musicIndex);      //랜덤 인덱스가 반영된 현재 인덱스 값으로 음악을 다시 로드
            playMusic();                //로드한 음악을 재생
        break;
        

    }
})


//뮤직 리스트 버튼 클릭

musicListBtn.addEventListener("click", () => {
    musicList.classList.add("show");
});

//뮤직 리스트 구현

for(let i=0; i<allMusic.length; i++){
    let li =`           
        <li>
            <strong>${allMusic[i].name}</strong>
            <em>${allMusic[i].artist}</em>
            <span>재생시간</span>
        </li>
    `;

    musicListUl.innerHTML += li;
}



//플레이 버튼

// musicPlay.addEventListener("click", ()=>{
//     playMusic();

// })

// 정지 버튼
musicPlay.addEventListener("click", ()=>{
    const isMusicPaused = musicWrap.classList.contains("paused");   //음악이 재생되고 있다는 뜻
    isMusicPaused ? pauseMusic() : playMusic();

})


//이전곡 버튼 클릭

musicPrevBtn.addEventListener("click", ()=>{
    prevMusic();
})

//다음곡 클릭
musicNextBtn.addEventListener("click", ()=>{
    nextMusic();
})


//로드 버튼
window.addEventListener("load",()=> {
    loadMusic(musicIndex);
})
