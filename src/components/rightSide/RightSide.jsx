import React from 'react';
import Card from '../card/Card';
import music from '../../pages/lib/music'; // Assuming your music array is imported here
import "./rightSide.css";

const RightSide = () => {
  return (
    <div className='rightSide'>
      <div className="cardMargin">
        {music.map((song) => (
          <Card key={song.id} music={song} />
        ))}
      </div>
    </div>
  );
};

export default RightSide;
