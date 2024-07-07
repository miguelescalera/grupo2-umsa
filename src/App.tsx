import './App.css';
import { AuthProvider } from './Context/Context';
import RouterPages from './routes/RouterPages';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <RouterPages/>
      </AuthProvider>
    </div>
  );
}

export default App;
