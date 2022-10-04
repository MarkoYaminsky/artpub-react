import React from "react";
import "./Home.scss";

interface HomeSectionProps {
  h2: string;
  h3: string;
  className: string;
}

const HomePageSection: React.FC<HomeSectionProps> = (props) => {
  return (
    <section className={props.className}>
      <h2>{props.h2}</h2>
      <h3>{props.h3}</h3>
    </section>
  );
};

export const Home: React.FC = () => {
  return (
    <div className="home">
      <HomePageSection
        className="intro"
        h2="Artpub"
        h3="Articles to all your needs. Find everything you could ever want."
      />
      <HomePageSection
        className="publish"
        h2="Publish"
        h3="Create your own articles and publish them."
      />
      <HomePageSection 
      className="acquire"
      h2="Acquire"
      h3="Get an article to your desire quickly and easily."
      />
    </div>
  );
};
