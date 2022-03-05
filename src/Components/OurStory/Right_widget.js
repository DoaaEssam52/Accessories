import React from 'react'

function Right_widget(props) {
  return (
    <div className='row'>
       <div  className="col-6 left-img "  style={{backgroundImage:`url(${props.imgurl})`}}>
       </div>
       <div className="col-6 right-paragraph">
       <h2 class="font_5" style={{lineHeight:"1.2em",textAlign:"center",fontSize:"24px"}}>
      <span  style={{letterSpacing:"0.25em"}}>{props.title}</span>
      </h2>
      <div className="font_8">
        <p  style={{lineHeight:"1.7em", textAlign:"center",fontSize:"16px"}}>
          <span style={{letterSpacing:"0.01em"}}>
            I'm a paragraph. Click here to add your own text and edit me. It’s easy. click “Edit Text” or double click me to
          </span>
        </p>
      </div>
      
    </div>

    </div>
  )
}

export default Right_widget