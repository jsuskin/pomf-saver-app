import React, {useState} from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import UrlsList from '../UrlsList';
import Modal from '../Modal';

export default function MainContent({ user }: any) {
  const [showModal, setShowModal] = useState(false);

  return (
  <>
    <Header user={user} />
    <Sidebar />
    <UrlsList setShowModal={setShowModal} />
    <Modal {...{showModal,setShowModal}} />
  </>
)};
