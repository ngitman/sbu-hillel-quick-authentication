import Body from './components/Body';
import Layout from './components/Layout.js';
import { createTheme, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Authentication from './components/Authentication';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#000000',
        primary: '#000000'
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Routes>
          <Route path="/signin" element={<Authentication />} />
          <Route path="/" element={<Body />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
