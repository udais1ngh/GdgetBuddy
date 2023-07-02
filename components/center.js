import styled from "styled-components";
const Centered=styled.div`
max-width: 800px;
    margin:  0 auto;
    padding:  5px 20px;
`;
export default function Center({children}){

return(

<Centered>
    {children}
</Centered>

)


}