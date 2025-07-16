import React , { useEffect , useState } from 'react'
import { useParams , Link, useNavigate } from 'react-router-dom'

function ViewStory() {
  
  const {id,tot} = useParams();

  const[story, setStory] = useState(null);


  const navigate=useNavigate();

  useEffect(()=>{
    fetch(`http://localhost:3000/story/${id}`)
    .then(data =>data.json())
    .then(data=>setStory(data))
    .catch(err=>console.log(err))

  },[id]);

  useEffect(() => {
  fetch(`http://localhost:3000/stories/${id}`)
    .then(res => res.json())
    .then(data => {
      console.log("Fetched story: ", data); 
      setStory(data);
    })
    .catch(err => console.log(err));
}, [id]);

  if(id > tot || id<=0){
    navigate('/');

  }


  return (

    <div>
    
    {story ? (
  <div className='position-relative w-100 h-100 d-flex justify-content-center align-items-center bg-black'>

    {/* ✅ Profile Info (Top-Left) */}
    <div className="position-absolute" style={{
      top: '15px',
      left: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      zIndex: 10
    }}>
      <img
        src={story.profilePic}
        alt="dp"
        style={{
          height: '35px',
          width: '35px',
          borderRadius: '50%',
          border: '2px solid white'
        }}
      />
      <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>
        {story.username}
      </span>
    </div>

    {/* ✅ Left Arrow */}
    <Link
      to={`/story/${Number(id) - 1}/${tot}`}
      className="position-absolute"
      style={{ left: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
    >
      <i className="bi bi-arrow-left-circle-fill fs-1 text-white"></i>
    </Link>

    {/* ✅ Story Image */}
    <img
      className="vh-100"
      src={story.postImage}
      alt="story"
      style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }}
    />

    {/* ✅ Right Arrow */}
    <Link
      to={`/story/${Number(id) + 1}/${tot}`}
      className="position-absolute"
      style={{ right: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
    >
      <i className="bi bi-arrow-right-circle-fill fs-1 text-white"></i>
    </Link>
  </div>
) : (
  <div>Loading...</div>
)}

</div>

  )
}

export default ViewStory