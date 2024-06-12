import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import CardTemplate from "./CardTemplate";

export default function RenderCards({data, year}){
    const [or1Num, setOr1Num] = useState(0);
    const [or2Num, setOr2Num] = useState(0);
    const [or3Num, setOr3Num] = useState(0);
    const [or1PeopleNum, setOr1PeopleNum] = useState(0);
    const [or2PeopleNum, setOr2PeopleNum] = useState(0);
    const [or3PeopleNum, setOr3PeopleNum] = useState(0);

    useEffect(()=>{
      const cruisecount1 = countCruisesByShipName(data, year < 2020 ? "OR1" : "NOR1");
      const cruisecount2 = countCruisesByShipName(data, year < 2020 ? "OR2" : "NOR2");
      const cruisecount3 = countCruisesByShipName(data, year < 2020 ? "OR3" : "NOR3");
      setOr1Num(cruisecount1);
      setOr2Num(cruisecount2);
      setOr3Num(cruisecount3);
      
      const calOr1PeopleNum = countPeople(data, year < 2020 ? "OR1" : "NOR1");
      const calOr2PeopleNum = countPeople(data, year < 2020 ? "OR2" : "NOR2");
      const calOr3PeopleNum = countPeople(data, year < 2020 ? "OR3" : "NOR3");
      setOr1PeopleNum(calOr1PeopleNum);
      setOr2PeopleNum(calOr2PeopleNum);
      setOr3PeopleNum(calOr3PeopleNum);
    },[data,year])
    return(
      <>
       <Grid item xs={12} md={4}>
          <CardTemplate ship={ year < 2020 ? "OR1" : "NOR1"} number={or1Num.toString()} color="#2789E3" loading={false } people={or1PeopleNum}/>
        </Grid>
        <Grid item xs={12} md={4}>
          <CardTemplate ship={ year < 2020 ? "OR2" : "NOR2"} number={or2Num.toString()} color='#fd9602' loading={false} people={or2PeopleNum}/>
        </Grid>
        <Grid item xs={12} md={4}>
          <CardTemplate ship={ year < 2020 ? "OR3" : "NOR3"} number={or3Num.toString()} color="#EF6C8F" loading={false} people={or3PeopleNum}/>
        </Grid>
      </>
    );
}
const countCruisesByShipName = (data, shipName) => {
    return data.reduce((acc, current) => {
      if (current.CruiseBasicData.ShipName === shipName) {
        return acc + 1;
      }
      return acc;
    }, 0);
};

const countPeople = (data,shipName) =>{
    const entry = data.filter(entry => entry.CruiseBasicData.ShipName === shipName);
    return  entry.reduce((acc,current)=>{
        const peopleCounts = current.Participants.Name.map(nameString => nameString.split('、').length);
            return acc + peopleCounts.reduce((sum, count) => sum + count, 0);
       
    },0)
}