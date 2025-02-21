import React, { Fragment, memo } from "react";

import {
  ColorSquare,
  ColorTitle,
  ColorHex,
  ColorDetails
} from "./ColorElmParts";

const Details = ({ color }) => (
  <ColorDetails>
    {color.name ? (
      <>
        {color.name}{" "}
        {color.cssName && <ColorTitle>/ {color.cssName} </ColorTitle>}
        <ColorHex>
          {color.hex} <span>/</span> <span>{color.rgb}</span>
        </ColorHex>
      </>
    ) : (
      <ColorTitle>{color.hex}</ColorTitle>
    )}
  </ColorDetails>
);

export default memo(({ color, onClick, forceBorder }) => (
  <>
    <ColorSquare
      style={{
        background: color.hex
      }}
      forceBorder={forceBorder}
      hex={color.hex}
      onClick={() => onClick(color.hex, color.name)}
    />
    <Details color={color} />
  </>
));
