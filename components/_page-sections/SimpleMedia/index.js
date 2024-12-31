import ReactPlayer from 'react-player'
import { useState } from 'react'

const SimpleMedia = ({ media }) => {
  const [ playCount, setPlayCount ] = useState(0)
  return (
    <div>
      <ReactPlayer
        onPlay={() => setPlayCount(playCount + 1)}
        url={media}
        controls
        width='100%'
        height='100%'
      />
    </div>
  )
}

 export default SimpleMedia