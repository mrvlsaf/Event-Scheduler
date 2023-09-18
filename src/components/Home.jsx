
import "../styles.css"
import React from 'react'
import ListView from '../views/ListView';
import CalenderView from '../views/CalenderView'

const Home = () => {
    return (
        <div className='calender-list-container'>
            <CalenderView />
            <ListView />
        </div>
    )
}

export default Home