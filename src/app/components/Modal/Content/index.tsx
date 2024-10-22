import React from "react";
import AssetOptions from "./AssetOptions";
import AddToGroup from "./AddToGroup";

export default function ModalContent({ modalFor }: { modalFor: string | null }) {
  

  switch (modalFor) {
    case "ASSET_OPTIONS":
      return <AssetOptions />;
    case "ADD_TO_GROUP":
      return <AddToGroup />;
    default:
      return <></>;
  }
}
