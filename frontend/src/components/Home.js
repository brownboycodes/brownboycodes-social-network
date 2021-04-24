import AppIntro from "./AppIntro";
import PotentialUser from "./PotentialUser";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";

const Home = () => {
  
  return (
    <>
      <Jumbotron fluid style={{width:'100vw'}}>
        <AppIntro />
        <PotentialUser />
      </Jumbotron>
      <Container style={{maxWidth:'900px'}}>
        <Image src="/images/homepage_Illustration.png" fluid/>
      </Container>
    </>
  );
};

export default Home;
