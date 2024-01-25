import Body from "../components/Body";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
export default function Home(){
    return (
        <>
        <Header />
        <Body>
        <Outlet />
        </Body>
        </>
    );
}