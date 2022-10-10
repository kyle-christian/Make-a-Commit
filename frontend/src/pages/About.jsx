import TreeImg from "../assets/makeacommit.gif";
import Footer from "../components/footer"

export default function About() {
  return (
    <div className="page prose flex">
      <div className="hero-content flex-col lg:flex-row-reverse p-0">
        <img src={TreeImg} className="max-w-sm rounded-lg shadow-lg ml-5" />
        <div>
          <h1 className="text-5xl font-bold">What is Make a Commit?</h1>
          <p className="py-6">
            Make a Commit draws inspiration from a portion of the development
            experience and utilizes it as a tool for self-improvement. In short,
            this is an online application to keep track of your goals through
            consistency and visual feedback.
          </p>
          <p>
            This feedback is a <strong className="text-primary-focus">beautiful fractal tree</strong> that grows every time a user "pushes" their "commit".
          </p>
          <button className="btn btn-primary">Learn More</button>
        </div>
      </div>
      <h2>But what is this "development experience" you're talking about?</h2>
      <p>
        If you are not already familiar with git, I urge you to do a little bit
        of research. But in broad terms, git is a free and open source software
        used for version control. I'm sure you've seen games or programs that
        have version numbers, and through updates, they increase.
      </p>
      <p>
        So when a developer wants to fix bugs or add features to a program, they
        use git to "push" changes and keep track of versions.
      </p>
      <p>
        How does this relate to self improvement? Think of yourself as a
        program. Every day we think of new "features" we'd like to implement or
        "bugs" we'd like to fix within our codebase. These things take time and consistency. 
        <strong className="text-primary-focus"> Make a Commit aims to track that time for you while giving a sense of accomplishment through its digital trees
        </strong> 🌲
      </p>
    </div>
  );
}
