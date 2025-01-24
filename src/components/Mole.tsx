import { CSSProperties, useState, useEffect } from "react"

type BallProps = {
    x: number
    y: number
    count: number
    setCount: React.Dispatch<React.SetStateAction<number>>
}

// Myyrä, joka spawnataan näkyville x ja y koordinaattiin
export function Mole({x,y,count,setCount}: BallProps) {
    const style: CSSProperties = {     
        width: "11vh",
        height: "12vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        transform: `translate(${x}px,${y}px)`,
        filter: "drop-shadow(0 -1.5vh 2px #206539)"
    }

    const [clicked, setClicked] = useState(false)
    const [destroyed, setDestroyed] = useState(false)

    // Jos myyrää klikataan, lisätään +1 count muuttujaan ja
    // piilotetaan myyrä. Timeout palauttaa myyrän näkyväksi
    useEffect(()=>{
        if(clicked) {
            setCount(count + 1)
            setDestroyed(true)
            setTimeout(()=>{
                setDestroyed(false)
                setClicked(false)
            }, 100)
        }

    }, [clicked])
  
    return <>
        {!destroyed && <img style={style} onClick={()=>{setClicked(true)}} src={"myyra.svg"} alt="myyra" />}
    </>
}