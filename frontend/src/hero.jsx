export default function Hero() {
    return (
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold pb-10">Make a commit.</h1>
                        <img src="./src/assets/fractal.png" alt="tree" className='h-64 mx-auto '/>
                        <p className="py-6 text-lg">If you push a commit to yourself everyday, over time, you'll be able to reach whatever goal you set. 
                        <br />
                        <br />
                        No more delay. Start today!</p>
                        <button className="btn btn-primary mr-3">Get Started</button>
                        <button className="btn btn-secondary-content">About</button>
                    </div>
                </div>
    )
}