import {ReactNode} from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';

type LayoutProps = {
  children: ReactNode;
}

function Layout({children}: LayoutProps): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
