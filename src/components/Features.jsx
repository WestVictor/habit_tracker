import FeatureCard from "./FeatureCard.jsx"

export default function Features(){
    return(
        <div>
            <FeatureCard icon="✅" title="Log in one tap" description="Mark a habit done with a single click." />
            <FeatureCard icon="🔥" title="Watch streaks grow" description="See how many days in a row you have kept going." />
            <FeatureCard icon="🔒" title="Make streaks private" description="Your streaks belong to you. Make private" />
        </div>
    )
}