import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Game } from './pages/Game.tsx'
import { Scoreboard } from './components/Scoreboard.tsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Game></Game>
    },
    {
        path: "/highscores",
        element: <Scoreboard></Scoreboard>
    }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
