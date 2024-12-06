import React, { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import './card.css';

const Card = ({music}) => {
 

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // Volume from 0 to 1
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // Track current time of the song
  const [duration, setDuration] = useState(0); // Track total duration of the song

  // Reference to store Howler instance
  const howlRef = useRef(null);

  // Initialize the Howl object with the current song
  useEffect(() => {
    howlRef.current = new Howl({
      src: [music.src],
      html5: true,
      volume: volume,
      onplay: () => {
        setDuration(howlRef.current.duration()); // Set the song duration
      },
      onend: () => handleNext(), // Go to next song when the current one ends
      onseek: () => setCurrentTime(howlRef.current.seek()), // Update current time on seek
    });
  }, [currentSongIndex, volume]);

  // Handle play/pause toggle
  const togglePlayPause = () => {
    if (isPlaying) {
      howlRef.current.pause();
    } else {
      howlRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle volume change
  const handleVolumeChange = (event) => {
    const newVolume = event.target.value / 100;
    setVolume(newVolume);
    howlRef.current.volume(newVolume); // Update Howler volume
  };

  // Toggle volume slider visibility
  const toggleVolumeSlider = () => {
    setIsVolumeVisible(!isVolumeVisible);
  };

  // Loop functionality (toggle on/off)
  const toggleLoop = () => {
    setIsLooping(!isLooping);
    howlRef.current.loop(!isLooping); // Toggle loop
  };

  // Play the previous song
  const handlePrevious = () => {
    const prevIndex = currentSongIndex === 0 ? music.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevIndex);
  };

  // Play the next song
  const handleNext = () => {
    const nextIndex = currentSongIndex === music.length - 1 ? 0 : currentSongIndex + 1;
    setCurrentSongIndex(nextIndex);
  };

  // Handle user clicking on the progress bar to seek to a specific time
  const handleSeek = (event) => {
    const progressBar = event.target;
    const newSeek = (event.nativeEvent.offsetX / progressBar.offsetWidth) * duration;
    howlRef.current.seek(newSeek);
    setCurrentTime(newSeek);
  };

  // Update the progress bar as the song plays
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        if (howlRef.current) {
          setCurrentTime(howlRef.current.seek()); // Update current time
        }
      }, 1000); // Update every second
      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [isPlaying]);

  return (
    <div className="now-playing-container">
      <div className="now-playing-header">Now Playing</div>
      <div className="now-playing-content">
        <img src={music.musicImg} alt="Album Cover" className="song-image" />
        <div className="song-details">
          <h3 className="song-title">{music.musicName}</h3>
          <p className="song-artist">{music.album}</p>
          
          {/* Progress Bar */}
          <div className="progress-bar" onClick={handleSeek}>
            <div
              className="progress"
              style={{
                width: (currentTime / duration) * 100 + '%', // Dynamic width based on current time
              }}
            ></div>
          </div>

          {/* Time Display */}
          <div className="time">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="controls">
            <button className="control-btn" onClick={handlePrevious}>⏮</button>
            <button 
              className={`control-btn play ${isPlaying ? 'pause' : ''}`} 
              onClick={togglePlayPause}
            >
              {isPlaying ? '⏸' : '⏯'}
            </button>
            <button className="control-btn" onClick={handleNext}>⏭</button>
          </div>

          {/* Volume Control */}
          <div className="aditional-control">
          <div className="volume-control">
            <VolumeUpIcon 
              className="volume-icon" 
              onClick={toggleVolumeSlider} 
            />
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={handleVolumeChange}
              className={`volume-slider ${isVolumeVisible ? 'visible' : ''}`}
            />
          </div>

          {/* Loop Control */}
          <button 
            className={`loop-btn ${isLooping ? 'active' : ''}`}
            onClick={toggleLoop}
          >
            🔁
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Utility function to format time in MM:SS format
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default Card;
