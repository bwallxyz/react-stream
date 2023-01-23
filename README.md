## react-stream

A React client for a NodeJS media streaming service

## Concept & Features

    Ability to store and distribute media from a server to connected clients.

    Search the media archive for existing content (songs, videos, ebooks, ..etc)
    Add content to archive from 3rd party sites (YouTube, Soundcloud, ..etc) or manually upload
    Shared media rooms - queue up songs or videos for multiple clients in real time

## Completed & Todo

    Completed
        - Find YouTube videos with search bar on React client (youtube-search-without-api-key)
        - Download first result from search onto backend server as 'video-title'.mp4 (ytdl-core)
        - List the contents of the media directory on the client
        - Allow client to set the current video from the list of media
    
    Todo
        - Connect backend to MongoDB and associate media to database entries
        - Display the results of the YouTube search on the client and add download buttons
    