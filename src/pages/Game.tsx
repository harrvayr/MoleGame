import { useEffect, useState } from "react"
import { Mole } from "../components/Mole"
import { Layout, Navigation, HomeButton, Points } from "../components/common"
import { randomInteger } from "../tools/common"
import { MainMenu } from "../components/MainMenu"
import { useResize } from "../hooks/use_resize"
import { RoundCountdownTimer } from "../components/RoundCountdownTimer"
import { supabase } from "../supabase"
import { useNavigate } from "react-router-dom"


export function Game() {
    const [nickname, setNickname] = useState("")
    const {width, height} = useResize()
    const [count, setCount] = useState(0)
    const [started, setStarted] = useState(false)
    const [finished, setFinished] = useState(false)
    const navigate = useNavigate()

    // Myyrän spawnipisteen koordinaatit
    const x = randomInteger(0, width - 140)
    const y = randomInteger(0, height - 208)


    // Lähettää tiedot supabaseen
    const gameFinished = async ()=> {
        const {data, error} = await supabase.from("ranking").insert([
            {
                nickname: nickname,
                points: count
            }
        ]).select()

        console.log("data: ", data, "error: ", error)
    }


    // Palautellaan statet alkuperäisiksi jos pelaaja palaa päävalikkoon kesken pelin
    function gameStopped() {
        setCount(0)
        setNickname("")
        setStarted(false)
        setFinished(false)      
    }

    // Ajan loppuessa lähetetään pelaajan nimi ja pisteet supabaseen
    // ja siirrytään highscores sivulle.
    // Viedään mukana saatu pistemäärä statessa 
    useEffect(()=>{
        if(finished == true) {
            gameFinished()
            navigate("/highscores", {state: {points: count}})
        }
    }, [finished])
    
    return <Layout>
        {started && !finished && <Navigation>
        <HomeButton onClick={()=>{gameStopped()}}>Home</HomeButton>
        <RoundCountdownTimer roundTime={60} setFinished={setFinished}></RoundCountdownTimer>
        <Points>{count}</Points>
        </Navigation>}
        {started && !finished && <Mole x={x} y={y} count={count} setCount={setCount}></Mole>}
        {!started && !finished && <MainMenu setGameStarted={setStarted} setName={setNickname}></MainMenu>}
    </Layout>
}