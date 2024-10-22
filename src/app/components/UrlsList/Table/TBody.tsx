import React, { Dispatch, SetStateAction } from "react";
import Row from "../Row";

type UrlDoc = {
  id: string;
  url: string;
  ownerDisplayName: string;
  createdAt: string;
  selected: boolean;
  name: string;
};

interface TBody {
  urls: UrlDoc[];
  setUrls: Dispatch<SetStateAction<UrlDoc[]>>;
}

export default function TBody({ urls, setUrls }: TBody) {
  const setSelected = () => {
    setUrls((urlsList) => urlsList.map((obj) => ({ ...obj, selected: true })));
  };

  return (
    <tbody>
      {urls.map((obj) => {
        return <Row key={obj.id} {...{ ...obj, setSelected }} />;
      })}
    </tbody>
  );
}
