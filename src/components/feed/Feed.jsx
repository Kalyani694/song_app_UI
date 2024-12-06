import React, { useState } from "react";
import "./feed.css";
import VerifiedIcon from "@mui/icons-material/Verified";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import music from "../../pages/lib/music"; // Import the dummy music data
import Card from "../card/Card"; // Import the Card component

const Feed = () => {
  const [songs, setSongs] = useState(music);
  const [draggedSongIndex, setDraggedSongIndex] = useState(null);
  const [playingSongId, setPlayingSongId] = useState(null);

  const handleDragStart = (index) => {
    setDraggedSongIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default to allow dropping
  };

  const handleDrop = (index) => {
    if (draggedSongIndex === null || draggedSongIndex === index) return;

    const updatedSongs = [...songs];
    const [draggedSong] = updatedSongs.splice(draggedSongIndex, 1);
    updatedSongs.splice(index, 0, draggedSong);

    setSongs(updatedSongs);
    setDraggedSongIndex(null);
  };

  const handleSongClick = (id) => {
    setPlayingSongId(id);
  };

  // Find the currently playing song based on the playingSongId
  const playingSong = songs.find((song) => song.id === playingSongId);

  return (
    <div className="centerFeed">
      <div
        className="center-banner"
        style={{ backgroundImage: `url('/poster.png')` }}
      >
        <div className="banner-content">
          <p>
            <VerifiedIcon style={{ color: "#87CEEB" }} /> Verified Artist
          </p>
          <h1>Michael Jackson</h1>
          <p>27,852,501 monthly listeners</p>
        </div>
        <div className="banner-image">
          <img src="/singer.png" alt="Michael Jackson" />
        </div>
      </div>

      <div className="song-list">
        <div className="list-header">
          <h2>Popular</h2>
          <a href="#">See All</a>
        </div>

        <table className="song-table">
          <thead>
            <tr>
              <th>#</th>
              <th></th>
              <th>TITLE</th>
              <th>PLAYS</th>
              <th>TIME</th>
              <th>ALBUM</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) => (
              <tr
                key={song.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                onClick={() => handleSongClick(song.id)}
                className={`draggable-row ${
                  song.id === playingSongId ? "playing-row" : ""
                }`}
              >
                <td>
                  {song.id === playingSongId ? (
                    <MusicNoteIcon className="music-icon" />
                  ) : (
                    index + 1
                  )}
                </td>
                <td>
                  <img
                    src={song.musicImg}
                    width={50}
                    alt={song.musicName}
                    style={{ borderRadius: "8px" }}
                  />
                </td>
                <td>{song.musicName}</td>
                <td>{song.views}</td>
                <td>{song.duration}</td>
                <td>{song.albumName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* The card is displayed only on mobile devices */}
      <div className="cardContainer">
        {playingSong && <Card key={playingSong.id} music={playingSong} />}
      </div>
    </div>
  );
};

export default Feed;
