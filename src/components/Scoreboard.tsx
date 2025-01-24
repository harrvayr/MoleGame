import { useState, useEffect, CSSProperties } from "react"
import { supabase } from "../supabase"
import { Layout, MenuButton } from "./common"
import { useNavigate, useLocation } from "react-router-dom"
import { MenuBackground } from "./MainMenu"


interface ScoreboardItem {
    id: number
    created_at: string
    nickname: string
    points: number
}

// Kymmenen parasta tulosta joista jokainen oma div
function ScoreBoardItems() {
    const scoreboardItemStyle: CSSProperties = {
        width: "70%",
        height: "20px",
        display: "flex",
        margin: "30px",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        padding: "25px",
        fontSize: "30px",
        fontWeight: "bold",
        color: "white",
        backgroundColor: "green",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgb(0,0,0)",
    }


    const [list, setList] = useState<ScoreboardItem[]>([])

    // Haetaan kymmenen parasta tulosta tietokannasta
    useEffect(()=>{
        supabase.from("ranking").select("*").order("points", {ascending: false}).limit(10).then(({data, error})=>{
            console.log(data, error)
            if(data){
                setList(data)
            }
        })

    },[])

    const scoreboardListItems = list.map((item, i)=>
        <div key={i} style={scoreboardItemStyle}>
            <div>{i+1}.</div>
            <div>{item.nickname}</div>
            <div>{item.points} p</div>
        </div>
    )

    return <>{scoreboardListItems}</>
}



// Näyttää 10 parhainta tulosta
export function Scoreboard() {
    const [hasPoints, setHasPoints] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const userScoreStyle: CSSProperties = {
        width: "10%",
        height: "20px",
        display: "flex",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "7%",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        padding: "25px",
        fontSize: "30px",
        fontWeight: "bold",
        color: "white",
        backgroundColor: "green",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgb(0,0,0)",
    }

    const scoreboardItemContainerStyle: CSSProperties = {
        marginRight: "60px",
        marginLeft: "60px",
        marginBottom: "30px",
        height: "100%",
        width: "90%",
        overflowY: "auto",
        overflowX: "hidden",
        scrollbarColor: "#006000 green",
    }

    const buttonStyle: CSSProperties = {
        marginBottom: "30px",
        width: "50%"
    }

    const hStyle: CSSProperties = {
        color: "white",
        fontFamily: "sans-serif",
        marginTop: "40px"
    }


    // Jos state tuli navigoinnin mukana, näytetään käyttäjän pisteet
    // pistetaulukon alapuolella
    useEffect(()=>{
        if(location.state) {
            setHasPoints(true)
        }
    }, [])

    return <>
        <Layout>
            <MenuBackground>
                <h1 style={hStyle}>Highscores</h1>
                <div style={scoreboardItemContainerStyle}>
                    <ScoreBoardItems></ScoreBoardItems>
                </div>
                <MenuButton style={buttonStyle} onClick={()=>{navigate("/")}}>Continue</MenuButton> 
            </MenuBackground>
            {hasPoints && <div style={userScoreStyle}>
            <p>Your score: </p>
            <p>{location.state.points}</p>
            </div>}
        </Layout>
    </>
}