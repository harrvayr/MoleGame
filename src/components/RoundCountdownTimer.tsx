import { CSSProperties, useEffect, useState } from "react"

type RoundCountdownTimerProps = {
    roundTime: number,
    setFinished: React.Dispatch<React.SetStateAction<boolean>>
}

// Kello ottaa propseina erän pituuden ja setFinished funktion
// johon true, kun aika kuluu nollaan
export function RoundCountdownTimer({roundTime, setFinished}: RoundCountdownTimerProps ) {

    const style: CSSProperties = {
        color: "white",
        fontSize: "30px",
        backgroundColor: "green",
        padding: "15px",
        borderRadius: "20px",
        boxShadow: "0 0 10px black"
    }
    
    const [timeLeft, setTimeLeft] = useState(roundTime)

    function timer() {        
        setTimeLeft(timeLeft - 1)
    }

    useEffect(()=>{
        if(timeLeft == 0){
            setFinished(true)
        } else {
            setTimeout(timer, 1000)
        }
    }, [timer])

    return <>
        <div style={style}>{timeLeft}</div>
    </>
}