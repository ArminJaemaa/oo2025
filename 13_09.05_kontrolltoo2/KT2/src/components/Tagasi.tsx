import {useNavigate} from 'react-router-dom'

function Tagasi(){
  const navigate = useNavigate();
    
  return(
    <>
      <button className='back-button' onClick={()=>{
          if (window.history.length > 1) {
            navigate(-1);
          } else {
            navigate('/'); // fallback route
          }
        }}>
        Tagasi
        </button>
    </>
  )
}

export default Tagasi