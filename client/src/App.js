import './App.css';

import Header from './components/Header';
import MediaSearch from './components/MediaSearch';
import VideoStream from './components/VideoStream';

function App() {
  return (
    <div className="App">
     <header className="App-header">
            <Header />
            <MediaSearch />
            <VideoStream />
      </header>
    </div>
  );
}

export default App;
