import React from 'react';
import { selectModalFor } from "@/app/lib/redux/features/modal/modalSlice";
import { selectUser } from '@/app/lib/redux/features/user/userSlice';
import { useAppSelector } from "@/app/lib/redux/hooks";
import Header from "../Header";
import Modal from "../Modal";
import Sidebar from "../Sidebar";
import UrlsList from "../UrlsList";
import ModalContent from '../Modal/Content';
import Toast from '../Toast';

export default function MainContent() {
  const modalFor = useAppSelector(selectModalFor);

  return (
    <>
      <Header />
      <Sidebar />
      <UrlsList />
      <Modal>
        <ModalContent modalFor={modalFor} />
      </Modal>
      <Toast />
    </>
  );
}
