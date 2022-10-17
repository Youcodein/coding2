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

const musicCloseBtn = musicWrap.querySelector(".music__list .close");

let musicIndex = 1;                                                 //현재 음악 인덱스

//음악 재생

function loadMusic(num){
    musicName.innerText = allMusic[num-1].name;                     //뮤직 이름 로드
    musicArtist.innerText = allMusic[num-1].artist;                 //뮤직 아티스트 로드
    musicView.src=`../assets/img/${allMusic[num-1] .img}.png`;      //뮤직 이미지 로드
    musicView.art= allMusic[num-1].name;                            //뮤직 이미지 alt태그 로드
    musicAudio.src=`../assets/audio/${allMusic[num-1] .audio}.mp3`  //뮤직 로드
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
    playListMusic();
}

//다음 곡 듣기
function nextMusic(){
    //musicIndex ++
    musicIndex == allMusic.length ? musicIndex = 1 : musicIndex++;
    loadMusic(musicIndex);
    playMusic();
    playListMusic();
}

// 뮤직 진행바
musicAudio.addEventListener("timeupdate", e => {
    // console.log(e);
    const currentTime = e.target.currentTime;                           //오디오의 현재 재생되는 시간
    const duration = e.target.duration;                                 //오디오의 총 길이
    let progressWidth = (currentTime/duration) * 100;                   //전체 깅이에서 현재 진행되는 시간을 백분위로 나눠줌

    musicProgressBar.style.width = `${progressWidth}%`;

    //전체 시간
    musicAudio.addEventListener("loadeddata", ()=>{
        let audioDuration = musicAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);                  //전체 시간(초)을 분단위로 쪼갬
        let totalSec = Math.floor(audioDuration % 60);                  //남은 초를 저장

        if(totalSec < 10) totalSec = `0${totalSec}`;                    //초가 한 자리 수 일때 10의 자리에 0을 붙임
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
    let progressWidth =musicProgress.clientWidth;                                   //진행바 전체 길이
    let clickedOffsetX = e.offsetX;                                                 //진행바 기준으로 측정되는 X좌표값
    let songDuration = musicAudio.duration;                                         //오디오 전체 길이

    musicAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration        //백분위로 나눈 숫자에 다시 전체 길이를 곱해서 현재 재생값으로 바꿈
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
    playListMusic();    //재생목록 업데이트
})


//플레이 버튼 클릭
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




//뮤직 리스트 버튼 클릭

musicListBtn.addEventListener("click", () => {
    musicList.classList.add("show");
});

//뮤직 리스트 구현

for(let i=0; i<allMusic.length; i++){
    let li =`           
        <li data-index="${i+1}">
            <strong>${allMusic[i].name}</strong>
            <em>${allMusic[i].artist}</em>
            <audio class="${allMusic[i].audio}" src="../assets/audio/${allMusic[i].audio}.mp3"></audio>
            <span class="audio-duration" id="${allMusic[i].audio}">재생시간</span>
        </li>
    `;

    // musicListUl.innerHTML += li;
    musicListUl.insertAdjacentHTML("beforeend", li);


    //리스트에 음악 시간 불러오기

    let liAudioDuration = musicListUl.querySelector(`#${allMusic[i].audio}`);   //리스트에서 시간을 표시할 선택자를 가져옴
    let liAudio = musicListUl.querySelector(`.${allMusic[i].audio}`);           //리스트에서 오디오를 가져옴
    liAudio.addEventListener("loadeddata",()=>{
        let audioDuration = liAudio.duration        //오디오 전체 길이
        let totalMin = Math.floor(audioDuration / 60);  //오디오 전체 길이를 분 단위로 쪼갬
        let totalSec = Math.floor(audioDuration % 60);  //초 계산

        if(totalSec < 10) totalSec = `0${totalSec}`;    //앞자리에0
        liAudioDuration.innerText = `${totalMin}:${totalSec}`;  //문자열 출력
        liAudioDuration.setAttribute("data-duration", `${totalMin}:${totalSec}`);   //속성에 오디오 길이 기록
        
    });


}

//뮤직 리스트를 클릭하면 재생
function playListMusic(){
    const musicListAll = musicListUl.querySelectorAll("li");    //뮤직 리스트 목록 가져옴
    for(let i=0; i<musicListAll.length; i++){
        let audioTag = musicListAll[i].querySelector(".audio-duration");

        if(musicListAll[i].classList.contains("playing")){
            musicListAll[i].classList.remove("playing");        //클래스가 존재하면 삭제
            let addDuration = audioTag.getAttribute("data-duration");   //오디오 길이 값 가져오기

            audioTag.innerText = addDuration;       //오디오 길이 값 출력

        }

        if(musicListAll[i].getAttribute("data-index") == musicIndex){       //현재 무직인덱스랑 리스트 인덱스 값이 같으면
            musicListAll[i].classList.add("playing");   //클래스 playing추가
            audioTag.innerText = "재생중";              //재생중일 경우 재생중 멘트 추가
        }

        musicListAll[i].setAttribute("onclick", "clicked(this)");
    }
}

//뮤직 리스트를 클릭하면..
function clicked(el){
    let getLiIndex = el.getAttribute("data-index"); //클릭한 리스트의 인덱스값을 저장
    musicIndex = getLiIndex;                        //클릭한 인덱스 값을 뮤직 인덱스에 저장
    loadMusic(musicIndex);                          //해당 인덱스 뮤직으로 로드
    playMusic();                                    //음악 재생
    playListMusic();                                //음악 리스트 업데이트
}

//뮤직 리스트 클로즈 버튼 클릭

musicCloseBtn.addEventListener("click",()=>{
    musicList.classList.remove("show");
})

// 볼륨 버튼 클릭
const volumeBtn = document.querySelector(".music_control .control #control-volume");
const volumeBar= document.querySelector(".music_control .control .volumeBar");
const volumeBarSize= document.querySelector(".music_control .control .volumeBar .volumeSize");
volumeBtn.addEventListener("click", ()=>{
    volumeBar.classList.toggle("show");
});
// 볼륨 조절 (클릭한 만큼의 볼륨)
musicAudio.volume = 0.5;
volumeBar.addEventListener("click", (e)=>{
    let volumeBarWidth = volumeBar.clientWidth; // 진행바의 전체 길이
    let clickedOffsetX = e.offsetX; // 진행바를 기준으로 측정되는 클릭한 부분의 X좌표
    let volume = musicAudio.volume;

    musicAudio.volume = (clickedOffsetX / volumeBarWidth); //클릭 부분이 전체에서 차지하는 비율을 백분율로 표시
    // alert(volume);
    if(musicAudio.volume == 0){
        volumeBtn.classList.add("mute");
        volumeBtn.setAttribute("title", "음소거 됨");
    } else {
        volumeBtn.classList.remove("mute");
        volumeBtn.setAttribute("title", "음량 조절");
    }
});
// 볼륨이 바뀌면 볼륨바의 너비를 바꾸기
musicAudio.addEventListener("volumechange", e =>{
    const currentVolume = e.target.volume;
    let volumeBarWidth = currentVolume * 100;

    volumeBarSize.style.width = `${volumeBarWidth}%`;
});

//로드 버튼
window.addEventListener("load",()=> {
    loadMusic(musicIndex);      //음악 재생
    playListMusic();            //리스트 초기화
})

