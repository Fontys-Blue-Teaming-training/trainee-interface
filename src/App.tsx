import './App.css';
import AppView from './components/app-view/AppView';
import WebSocketClient from './service/WebSocketClient';

function App() {
  return (
    <>
      <AppView />
      <WebSocketClient />
    </>
  );
}

export default App;
