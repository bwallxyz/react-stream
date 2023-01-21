import React from 'react'

function VideoStream() {
    return (
        <div>
            <video controls muted>
                <source src="http://localhost:3080/video" type="video/mp4"></source>
            </video>
        </div>
    )
}

export default VideoStream
