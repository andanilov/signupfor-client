import React, { FC } from 'react';
import { ILayoutComponent } from '../types';

const CenterLayout : FC<ILayoutComponent> = ({ children }) => (
  <section className="body">
    <header>
      Заголовок
    </header>
    <main>
      {children}
    </main>    
  </section>
);

export default CenterLayout;
