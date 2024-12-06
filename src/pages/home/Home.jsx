import React from 'react'
import "./home.css";
import Feed from '../../components/feed/Feed';
import RightSide from '../../components/rightSide/RightSide';
import LeftSideBar from '../../components/leftSide/LeftSideBar';
import Card from '../../components/card/Card';

const Home = () => {
  return (
    <div className='home'>
      <div className="leftSideBar">
        <LeftSideBar/>
        </div>
        <div className="centerFeed">
        <Feed/>
        </div>
        <div className="rightSideBar">
        <RightSide/>
        
        </div>
        
    </div>
  )
}

export default Home