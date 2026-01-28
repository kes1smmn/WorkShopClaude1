import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core'
import { BrowserRouter } from 'react-router'
import App from './App.tsx'

// Import Mantine styles
import '@mantine/core/styles.css'
import '@mantine/dropzone/styles.css'

// Create custom theme
const theme = createTheme({
  primaryColor: 'blue',
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
)
