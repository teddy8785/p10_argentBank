import Header from "../components/Header";
import Banner from "../components/Banner";
import Features from "../components/Features";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

function Index() {
  return (
    <div>
      <Helmet>
        <title>ArgentBank - Accueil</title>
      </Helmet>
      <Header />
      <Banner />
      <Features />
      <Footer />
    </div>
  );
}

export default Index;