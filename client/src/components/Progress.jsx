import 'ldrs/dotPulse'

function Progress() {
     return (
      <>
      <div style={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
       <l-dot-pulse
        size="43"
        speed="1.3"
        color="#1a1b25" 
        ></l-dot-pulse>
        </div>
      </>
       
     )
}

export default Progress