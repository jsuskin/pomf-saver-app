import React from 'react';
import { selectModalFor } from "@/app/lib/redux/features/modal/modalSlice";
import { useAppSelector } from "@/app/lib/redux/hooks";
import Header from "../Header";
import Modal from "../Modal";
import Sidebar from "../Sidebar";
import UrlsList from "../UrlsList";
import ModalContent from '../Modal/Content';

export default function MainContent({ user }: any) {
  const modalFor = useAppSelector(selectModalFor);

  return (
    <>
      <Header user={user} />
      <Sidebar />
      <UrlsList />
      <Modal>
        <ModalContent modalFor={modalFor} />
      </Modal>
    </>
  );
}
