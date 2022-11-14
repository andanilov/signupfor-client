import React, { FC } from 'react';
import EventAdd from '../components/EventAdd';
import MainLayout from '../layouts/MainLayout';

const Appointments : FC = () => (
  <MainLayout>
    <EventAdd />
  </MainLayout>
);

export default Appointments;
