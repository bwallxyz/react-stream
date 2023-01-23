import React from 'react'

import { useState, useEffect } from 'react'

function MediaList() {

    const [contents, setContents] = useState([]);


    useEffect(() => {
        fetch('http://localhost:3080')
          .then(response => response.json())
          .then(data => {
            setContents(data);
          })
          .catch(error => {
            console.log('Error fetching data:', error);
          });
      }, []);


    async function handlePlay(path) {
        fetch("http://localhost:3080/setvideo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                path: path,
            })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
    }
    

  return (
    <div>
        {contents.map(content => (
        <div key={content.name}>{content.name}  <button onClick={ () => handlePlay(content.path)}>PLAY</button></div>
        ))}
  </div>
  )
}

export default MediaList