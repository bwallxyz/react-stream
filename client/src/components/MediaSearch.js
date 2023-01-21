import React from 'react'

import { useState } from 'react'

function MediaSearch() {

    const [textInput, setTextInput] = useState('')

    const handleSubmit = () => {

        console.log(textInput)

        fetch("http://localhost:3080/search", {
            method: "POST",
            body: JSON.stringify({input: textInput}),
            headers: {
                "Content-Type": "application/json"
            }
        })

        setTextInput('')
    }

    return (
        <div>
            <input value={textInput} onChange={(event) =>{setTextInput(event.target.value)}}></input>
           <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default MediaSearch
