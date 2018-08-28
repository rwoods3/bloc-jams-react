import React from 'react';


const Landing = () => (
  <section className="landing">
    <h1 className="hero-title">Turn the music up!</h1>

    <section className="selling-points">
      <div className="point mdl-card mdl-shadow--6dp">
       <h2 className="point-title mdl-card__title">Choose your music</h2>
       <p className="point-description mdl-card__supporting-text">The world is full of music; why should you have to listen to music that someone else chose?</p>
      </div>
      <div className="point mdl-card mdl-shadow--6dp">
       <h2 className="point-title mdl-card__title">Unlimited, streaming, ad-free</h2>
       <p className="point-description mdl-card__supporting-text">No arbitrary limits. No distractions.</p>
      </div>
      <div className="point mdl-card mdl-shadow--6dp">
       <h2 className="point-title mdl-card__title">Mobile enabled</h2>
       <p className="point-description mdl-card__supporting-text">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
      </div>
    </section>
  </section>
);

export default Landing;
