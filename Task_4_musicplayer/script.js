document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const audio = document.getElementById('audio');
    const albumArt = document.getElementById('albumArt');
    const songTitle = document.getElementById('songTitle');
    const artistName = document.getElementById('artistName');
    const progressBar = document.getElementById('progressBar');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const playBtn = document.getElementById('playBtn');
    const playIcon = document.getElementById('playIcon');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const repeatBtn = document.getElementById('repeatBtn');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const volumeIcon = document.getElementById('volumeIcon');
    const volumeSlider = document.getElementById('volumeSlider');
    const playlistEl = document.getElementById('playlist');

    // Music playlist
    const songs = [
        {
            title: 'Blinding Lights',
            artist: 'The Weeknd',
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            cover: './assets/Blinding Lights.jpg'
        },
        {
            title: 'Save Your Tears',
            artist: 'The Weeknd',
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
            cover: './assets/Save Your Tears.jpg'
        },
        {
            title: 'Levitating',
            artist: 'Dua Lipa',
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
            cover: './assets/Levitating.jpg'
        },
        {
            title: 'Stay',
            artist: 'The Kid LAROI, Justin Bieber',
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
            cover: './assets/Stay.jpg'
        },
        {
            title: 'Good 4 U',
            artist: 'Olivia Rodrigo',
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
            cover: './assets/Good 4 U.jpg'
        }
    ];

    // Player state
    let currentSongIndex = 0;
    let isPlaying = false;
    let isShuffled = false;
    let isRepeated = false;

    // Initialize player
    function initPlayer() {
        loadSong(currentSongIndex);
        renderPlaylist();
    }

    // Load song
    function loadSong(index) {
        const song = songs[index];
        audio.src = song.src;
        albumArt.src = song.cover;
        songTitle.textContent = song.title;
        artistName.textContent = song.artist;
        
        // Highlight active song in playlist
        const playlistItems = playlistEl.querySelectorAll('li');
        playlistItems.forEach(item => item.classList.remove('active'));
        playlistItems[index].classList.add('active');
    }

    // Render playlist
    function renderPlaylist() {
        playlistEl.innerHTML = '';
        
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${song.title} - ${song.artist}</span>
                <span class="song-duration">3:45</span>
            `;
            li.addEventListener('click', () => playSong(index));
            playlistEl.appendChild(li);
        });
    }

    // Play song
    function playSong(index) {
        if (index === currentSongIndex && isPlaying) {
            pauseSong();
            return;
        }
        
        currentSongIndex = index;
        loadSong(currentSongIndex);
        playAudio();
    }

    // Play audio
    function playAudio() {
        audio.play();
        isPlaying = true;
        playIcon.classList.replace('fa-play', 'fa-pause');
    }

    // Pause audio
    function pauseSong() {
        audio.pause();
        isPlaying = false;
        playIcon.classList.replace('fa-pause', 'fa-play');
    }

    // Next song
    function nextSong() {
        if (isShuffled) {
            currentSongIndex = Math.floor(Math.random() * songs.length);
        } else {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
        }
        loadSong(currentSongIndex);
        if (isPlaying) playAudio();
    }

    // Previous song
    function prevSong() {
        if (audio.currentTime > 3) {
            // If song is more than 3 seconds in, restart it
            audio.currentTime = 0;
            return;
        }
        
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
        if (isPlaying) playAudio();
    }

    // Update progress bar
    function updateProgress() {
        const { currentTime, duration } = audio;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.setProperty('--progress', `${progressPercent}%`);
        
        // Update time displays
        currentTimeEl.textContent = formatTime(currentTime);
        
        if (duration) {
            durationEl.textContent = formatTime(duration);
        }
    }

    // Set progress when clicked on progress bar
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }

    // Format time in mm:ss
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Toggle shuffle
    function toggleShuffle() {
        isShuffled = !isShuffled;
        shuffleBtn.classList.toggle('active', isShuffled);
    }

    // Toggle repeat
    function toggleRepeat() {
        isRepeated = !isRepeated;
        repeatBtn.classList.toggle('active', isRepeated);
        audio.loop = isRepeated;
    }

    // Set volume
    function setVolume() {
        const volume = this.value;
        audio.volume = volume;
        
        // Update volume icon
        if (volume == 0) {
            volumeIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
        } else if (volume < 0.5) {
            volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-down');
            volumeIcon.classList.replace('fa-volume-up', 'fa-volume-down');
        } else {
            volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
            volumeIcon.classList.replace('fa-volume-down', 'fa-volume-up');
        }
    }

    // Event listeners
    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseSong();
        } else {
            playAudio();
        }
    });

    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    repeatBtn.addEventListener('click', toggleRepeat);
    shuffleBtn.addEventListener('click', toggleShuffle);
    volumeSlider.addEventListener('input', setVolume);

    progressBar.addEventListener('click', setProgress);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => {
        if (!isRepeated) {
            nextSong();
        }
    });
    audio.addEventListener('loadedmetadata', updateProgress);

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        switch (e.code) {
            case 'Space':
                e.preventDefault();
                if (isPlaying) {
                    pauseSong();
                } else {
                    playAudio();
                }
                break;
            case 'ArrowRight':
                audio.currentTime += 5;
                break;
            case 'ArrowLeft':
                audio.currentTime -= 5;
                break;
            case 'ArrowUp':
                volumeSlider.value = Math.min(1, parseFloat(volumeSlider.value) + 0.1);
                volumeSlider.dispatchEvent(new Event('input'));
                break;
            case 'ArrowDown':
                volumeSlider.value = Math.max(0, parseFloat(volumeSlider.value) - 0.1);
                volumeSlider.dispatchEvent(new Event('input'));
                break;
            case 'KeyN':
                nextSong();
                break;
            case 'KeyP':
                prevSong();
                break;
        }
    });

    // Initialize the player
    initPlayer();
});