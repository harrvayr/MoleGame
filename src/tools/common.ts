

export function randomInteger(min: number, max: number){
    const random = (Math.random() * max - min) + min
    return Math.floor(random)
}