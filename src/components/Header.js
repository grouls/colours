import React, { memo } from "react";
import styled from "@emotion/styled/macro";

const Em = styled.em`
  opacity: ${props => props.theme.opacity};
  span {
    display: inline-block;
    font-style: normal;
    font-size: 105%;
  }
`;

const Header = styled.header`
  height: 95px;
  box-sizing: border-box;
  margin: -1px;
  padding: 1px;
`;

const Small = styled.span`
  font-size: 80%;
  display: block;
`;

export default memo(({ children }) => (
  <Header>
    <h2>
      Colour Name (Demo) <Em>/ Css Name</Em>
      <Small>
        <Em>
          #Hex <span>/</span> <span>rgb(r, g, b)</span>
        </Em>{" "}
        {children}
      </Small>
    </h2>
  </Header>
));
