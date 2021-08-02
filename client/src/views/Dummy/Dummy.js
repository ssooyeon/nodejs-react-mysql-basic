import React from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

export default function Dummy() {
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <div>Dummy page</div>
      </GridItem>
    </GridContainer>
  );
}
