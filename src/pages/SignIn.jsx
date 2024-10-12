import Header from "../components/Header";
import Form from "../components/Form";
import Footer from "../components/Footer";
import '../styles/index.css';
import { Helmet } from "react-helmet";

function SignIn() {
  return (
    <div className="body">
      <Helmet>
        <title>ArgentBank - SignIn</title>
      </Helmet>
      <Header />
      <Form />
      <Footer />
    </div>
  );
}

export default SignIn;