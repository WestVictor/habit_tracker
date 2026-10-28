import { Link } from "react-router-dom"

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-inner">
        <div className="hero-text">
          <h1>Build habits that stick, one day at a time.</h1>
          <p>
            Streaks tracks your daily habits and shows how many days in a row
            you have kept them up. Simple, honest, motivating.
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="btn btn-primary">Start your streak</Link>
            <a href="#how-it-works" className="btn btn-outline">See how it works</a>
          </div>
        </div>
        <div className="hero-card">
          <p className="hero-card-label">Drink water</p>
          <p className="hero-card-streak">🔥 12 day streak</p>
        </div>
      </div>
    </section>
  )
}

export default Hero
