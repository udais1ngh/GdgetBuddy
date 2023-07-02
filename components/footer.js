import styled from "styled-components";



const FooterContainer = styled.footer`
background-color:#222;
  padding: 20px;
  margin-top:10px;
`;

const FooterText = styled.p`
  text-align: center;
  font-size: 14px;
  color:#fff;
`;
export default function Footer(){


return(
    <FooterContainer>
    <FooterText>© 2023 Your GadgetBuddy. All rights reserved.</FooterText>
    
  </FooterContainer>

)

}