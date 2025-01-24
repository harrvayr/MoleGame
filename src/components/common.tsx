import styled from "styled-components"

export const Layout = styled.div`
background-color: #41cd72;
width: 100%;
height: 100vh;
position: absolute;
background-image:url('grass1.svg');
background-repeat:repeat;
`

export const Navigation = styled.nav`
    width: 100%;
    height: 80px;
    background-color: #006000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 10px black;
`

export const HomeButton = styled.button`
    margin-left: 20px;
    font-size: 28px;
    border-radius: 13px;
    box-shadow: 0 0 6px rgb(0,0,0);
    font-family : sans-serif ;
`

export const Points = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    color: white;
    background-color: green;
    margin-right: 20px;
    align-items: center;
    box-shadow: 0 0 10px black;
`

export const MenuButton = styled.button`  
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 28px;
    border-radius: 13px;
    box-shadow: 2px 3px 6px rgb(0,0,0);
    font-family : sans-serif ;
`