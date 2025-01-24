import { useState, CSSProperties } from "react"
import { MenuButton } from "./common"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Kiitos stackoverflow
// Valikon background huolii komponentteja ja html sen sisälle
type MenuBackgroundProps = {
    children?: React.ReactNode
}

// Valikon tausta
export function MenuBackground({children}: MenuBackgroundProps) {

    const divStyle1: CSSProperties = {
        backgroundColor: "#006000",
        width: "400px",
        height: "570px",
        display: "flex",
        position: "relative",
        margin: "auto",
        marginTop: "auto",
        top: "10%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "70px",
        boxShadow: "0 0 5px rgb(0,0,0)"
    }
    const divStyle2: CSSProperties = {
        backgroundColor: "green",
        width: "90%",
        height: "90%",
        display: "flex",
        marginTop: "50%",
        marginBottom: "50%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "60px",
        boxShadow: "0 0 20px rgb(0, 0, 0)"
    }

    return <>
        <div style={divStyle1}>
            <div style={divStyle2}>
                {children}
            </div>
        </div>
    </>

}


type MainMenuProps = {
    setGameStarted: React.Dispatch<React.SetStateAction<boolean>>,
    setName: React.Dispatch<React.SetStateAction<string>>
}

// Päävalikko. Nimeä kirjoittaessa näytetään virheilmoitus
// React-toastifyllä, jos nimi on alle 0 merkkiä trimmattuna.
// https://github.com/fkhadra/react-toastify
export function MainMenu({setGameStarted, setName}: MainMenuProps) {
    const [isInputtingName, setIsInputtingName] = useState(false)
    const [viewHowToPlay, setViewHowToPlay] = useState(false)
    const [nickname, setNickname] = useState("")
    const navigate = useNavigate()

    const inputStyle: CSSProperties = {
        boxShadow: "inset 0 1px 7px 1px rgb(0, 0, 0)",
        width: "75%",
        height: "15%",
        borderRadius: "10px",
        textAlign: "center",
        fontSize: "30px",
        marginBottom: "20px"
    }


    const labelStyle: CSSProperties = {
        marginBottom: "20px",
        fontSize: "20px",
        fontWeight: "bold",
        color: "white"
    }

    const pStyle: CSSProperties = {
        margin: "20px",
        fontSize: "25px",
        textAlign: "center",
        color: "#F5F5F5"
    }

    const hStyle: CSSProperties = {
        fontFamily: "sans-serif",
        marginBottom: "20px",
        color: "#F5F5F5"
    }
    
    const buttonStyle: CSSProperties = {
        marginTop: "50px"
    }

    // Jos nimi on yli 0 merkkiä pitkä trimmattuna, aloitetaan peli kun nappia
    // painetaan. Jos alle 0 merkkiä niin näytetään errortoast
    // https://github.com/fkhadra/react-toastify
    const startGame = ()=> {
        if(nickname.trim().length > 0) {
            setName(nickname.trim())
            setGameStarted(true)
        } else {
            toast.error("Enter your nickname!", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "colored",
                });
        }
    }

    const instructions: string = "Click the mole to earn points. Try to get as many points as you can before the time runs out!"
    

    return <>
        <MenuBackground>
            {!isInputtingName && !viewHowToPlay && <>
                    <h1 style={hStyle}>MOLEGAME</h1>
                    <img src="myyra.svg"></img>
                    <MenuButton onClick={()=>{setIsInputtingName(true)}} style={buttonStyle}>Start Game</MenuButton>
                    <MenuButton onClick={()=>{navigate("/highscores")}}>Highscores</MenuButton>
                    <MenuButton onClick={()=>{setViewHowToPlay(true)}}>How to play</MenuButton>
                </>}
            {isInputtingName && <>
                <label style={labelStyle}>Enter your nickname</label>
                <input style={inputStyle} onChange={(i)=>{setNickname(i.target.value)}}></input>
                <MenuButton onClick={()=>{
                    startGame()
                    }}>Start game!</MenuButton>
            </>}
            {viewHowToPlay && <>
                <p style={pStyle}>{instructions}</p>
                <MenuButton onClick={()=>{setViewHowToPlay(false)}}>Back</MenuButton>
            </>}
        </MenuBackground>
        {/* React-toastifyn container https://github.com/fkhadra/react-toastify */}
        <ToastContainer/>
    </>
}