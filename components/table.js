import styled from "styled-components"

const StyledTable=styled.table`

width:100%;

th{
    text-transform:uppercase;
    text-align:center;
    color:#aaa;
    font-weight:600;
    font-size:1rem;
}
img{
    max-width:140px;
    max-height:140px;
}

td{
    margin:5px;
    max-height:160px;
    max-width:160px;
}
`;

export default function Table(props){

return <StyledTable {...props}/>;



}