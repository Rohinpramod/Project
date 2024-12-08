import React from 'react'

const card = ({image, title }) => {
  return (
    <div className={`cardslider rounded-2xl overflow-hidden bg-base-100 w-60  shadow-xl`}>
      <figure>
        <img className='w-[100%] h-[15vh]'
          src={image}
          alt={title} />
      </figure>
      <div className="card-body flex justify-center">
        <h2 className="card-title ">{title}</h2>
        <div className="card-actions">
        </div>
      </div>
      </div>
  )
}

export default card