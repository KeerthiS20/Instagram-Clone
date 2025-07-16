import React, {useState,useEffect} from 'react'
import axios from 'axios'

function Suggestions() {
  const [profile,setProfile]=useState(null);
  const [suggestions,setSuggestions]=useState([]);

  useEffect(()=>{

    fetch('http://localhost:3000/profile')
    .then(data=> data.json())
    .then(data=>setProfile(data))
    .catch(error=>console.log("error"))

    fetch('http://localhost:3000/suggestions')
    .then(data=> data.json())
    .then(data=>setSuggestions(data))
    .catch(error=>console.log("error"))


  },[]);

  const handleFollow = async(id,username) => {
    axios.post('http://localhost:3000/followers',{"id":id,"username":username})
    .then(alert('followed'))
    .catch(err => console.log(err))
  }

  return (
    <div>
      <div className='suggestions w-75 m-4'>
        { profile ? 
        <div className='d-flex'>
          <img className="dp rounded-circle"src={profile.profilePic} alt="Profile pic" />
          <h5>{profile.username}</h5>
          <small className='ms-auto text-primary'> Switch</small>
        </div>
        : <p>Loading</p> }


        <div className='d-flex'>
          <p>Suggested for you</p>
          <b className='ms-auto'>See All</b>
        </div>

        {suggestions.length > 0 ? (
        <div>
          {suggestions.map((suggestion)=>(
            <div key={suggestion.id}>
              <div className='d-flex'>
                <img className="dp rounded-circle"src={suggestion.profilePic} alt="Profile pic" />
                <h5>{suggestion.username}</h5>
                <a className='text-primary ms-auto' onClick={()=>{handleFollow(suggestion.id,suggestion.username)}}>Follow</a>
                </div>
                
            </div>

          ))}
        </div>
      ):(
        <div>
          Loading...
        </div>
      )}


      </div>
      
    </div>
  )
}

export default Suggestions