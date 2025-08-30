import React, { useContext, useEffect } from "react";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";

const Home = () => {
  const { isAuthorized } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized === false) {
      navigate("/login");
    }
  }, [isAuthorized, navigate]);

  if (isAuthorized === undefined) {
   
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <section className="homePage page">
      <HeroSection />
      <HowItWorks />
      <PopularCategories />
      <PopularCompanies />
    </section>
  );
};

export default Home;
