import PageLayout from "../layout/PageLayout"
import landingImage from '../assets/landingImage.jpg';
import videoSrc from '../assets/smoke.mp4';
import { Link } from "react-router-dom";
import HSlider from "../components/Home/HSlider";
import bunchOfPcs from '../assets/bunch-of-pcs.png';
import { SiBasicattentiontoken } from "react-icons/si";
import { MdWorkspacePremium } from "react-icons/md";
import { FaBolt } from "react-icons/fa";

const Home = () => {
    return (
        <PageLayout>
            <title>Nexus PCs - Custom Built Computers</title>
            <section className='home-intro'>
                <div className="video-container">
                    <img src={landingImage} alt="" className="video-bg" />
                    <video autoPlay loop muted playsInline className="video-overlay-video">
                        <source src={videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                {/* Content Overlay */}
                <div className="content-overlay">
                    <div className="text-container">
                    <h1 className="main-heading">Built for You. Built by Nexus PCs.</h1>
                    <p className="sub-text">
                        Build your dream PC with Nexus PCs. We create high-performance, custom-built computers for gamers, creators, and professionals, hand-selecting every component to bring your vision to life.      
                        We also sell bunch of periferals and accessories in our store.
                    </p>
                    <div className="home-buttons">
                        <Link to='/build'><button>Build Your PC</button> </Link>
                        <Link to='/store'><button id='visit-store'>Visit Store</button> </Link>
                    </div>
                    </div>
                </div>
            </section>
            <section className='home-slider'>
                <HSlider />
            </section>
            <section className='home-features'> 
                <div className="feature">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 8V15.619M10.8148 8V15.619M6 12H10.8148M19 16L17.0741 14.4762M16.1111 15.619C15.6637 15.619 15.4399 15.619 15.2539 15.5898C14.4899 15.4695 13.8927 14.997 13.7407 14.3925C13.7037 14.2453 13.7037 14.0683 13.7037 13.7143V9.90476C13.7037 9.55074 13.7037 9.37373 13.7407 9.22653C13.8927 8.62205 14.4899 8.14952 15.2539 8.02928C15.4399 8 15.6637 8 16.1111 8C16.5586 8 16.7823 8 16.9683 8.02928C17.7323 8.14952 18.3295 8.62205 18.4815 9.22653C18.5185 9.37373 18.5185 9.55074 18.5185 9.90476V13.7143C18.5185 14.0683 18.5185 14.2453 18.4815 14.3925C18.3295 14.997 17.7323 15.4695 16.9683 15.5898C16.7823 15.619 16.5586 15.619 16.1111 15.619Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>                    
                    <h2>Quality Components</h2>
                    <p>We use only the best components from top brands to ensure your PC performs at its peak.</p>
                </div>
                <div className="feature">
                    <svg fill="#ffffff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>repair</title> <path d="M27.472 25.67l3.511 2.664c0.764-1.983 0.2-4.311-1.579-5.661-1.368-1.038-3.108-1.248-4.61-0.713l-0.532-0.403-0.070-0.132c0.37-0.526 0.691-1.076 0.961-1.644l2.417-0.067 0.495-1.58-1.953-1.438c0.095-0.591 0.142-1.189 0.143-1.786l2.167-1.1-0.229-1.64-2.392-0.468c-0.2-0.688-0.466-1.362-0.798-2.011l1.426-1.973-0.954-1.354-2.347 0.682c-0.029-0.031-0.058-0.062-0.088-0.093-0.375-0.388-0.771-0.743-1.184-1.066l0.451-2.321-1.435-0.827-1.781 1.551c-0.577-0.232-1.169-0.415-1.769-0.549l-0.584-2.291-1.651-0.135-0.951 2.172c-0.492 0.030-0.982 0.091-1.468 0.185l-1.454-1.877-1.568 0.533-0.008 2.39c-0.664 0.342-1.303 0.753-1.904 1.236l-2.215-0.998-1.134 1.207 1.134 2.151c-0.366 0.521-0.683 1.067-0.951 1.63l-2.433 0.067-0.495 1.58 1.966 1.448c-0.094 0.586-0.142 1.179-0.144 1.772l-2.18 1.106 0.229 1.64 2.394 0.468c0.143 0.498 0.319 0.989 0.531 1.468l-1.58 1.959 0.881 1.402 2.453-0.573c0.154 0.181 0.315 0.359 0.482 0.532 0.353 0.365 0.723 0.701 1.107 1.008l-0.477 2.459 1.435 0.827 1.873-1.632c0.538 0.216 1.089 0.389 1.649 0.519l0.612 2.401 1.651 0.135 0.991-2.263c0.686-0.041 1.369-0.144 2.041-0.308l1.576 1.825 1.538-0.616-0.083-1.685 0.974 0.739c-0.115 1.597 0.543 3.233 1.909 4.271 1.778 1.349 4.172 1.266 5.877-0.004l-3.51-2.663c-0.619-0.469-0.762-1.358-0.312-1.952s1.328-0.672 1.946-0.202zM13.845 23.736c-1.985-0.224-3.892-1.12-5.388-2.669-3.421-3.538-3.323-9.167 0.216-12.587s9.17-3.36 12.59 0.178c3.012 3.115 3.293 7.878 0.903 11.308l-5.822-4.417c0.11-1.589-0.561-3.21-1.928-4.247-1.778-1.349-4.172-1.266-5.877 0.004l3.51 2.663c0.618 0.469 0.78 1.334 0.33 1.929s-1.346 0.696-1.964 0.226l-3.51-2.663c-0.763 1.983-0.2 4.311 1.579 5.661 1.367 1.036 3.121 1.229 4.628 0.688l4.617 3.503c-1.254 0.428-2.582 0.569-3.883 0.422z"></path> </g></svg>
                    <h2>Expert Assembly</h2>
                    <p>Our experienced technicians meticulously assemble and test each PC for optimal performance and reliability.</p>
                </div>
                <div className="feature">
                    <svg viewBox="0 0 800 800" enableBackground="new 0 0 800 800" id="GUIDE" version="1.1"  xmlns="http://www.w3.org/2000/svg"  fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M776.557,119.544c0.357-21.353-7.375-41.042-21.771-55.438c-7.812-7.81-20.475-7.81-28.285,0.001s-7.811,20.474,0,28.284 c6.663,6.662,10.236,16.067,10.063,26.484c-0.166,9.938-3.928,19.534-10.063,25.669c-12.725,12.725-139.57,124.086-238.635,210.734 L463.586,331c72.32-82.747,162.068-185.064,197.172-223.914l7.986,7.987c7.811,7.811,20.475,7.812,28.284,0.002 c7.812-7.81,7.813-20.473,0.003-28.284L674.35,64.108c-3.75-3.751-8.838-5.859-14.142-5.859h-0.001 c-5.305,0-10.391,2.107-14.142,5.857c-12.171,12.17-86.618,96.725-153.792,173.381c-18.065-27.343-42.194-50.865-70.895-68.921 c-41.949-26.391-90.855-39.772-145.362-39.772c-11.991,0-23.854,0.756-35.257,2.249c-10.953,1.434-18.669,11.474-17.236,22.427 c1.434,10.952,11.473,18.668,22.426,17.235c9.689-1.268,19.805-1.911,30.066-1.911c82.994,0,152.612,37.208,188.714,100.146 c-33.688,38.495-62.632,71.651-76.59,87.649c-24.918,3.395-43.511,13.592-56.621,31.078 c-12.189,16.257-17.532,35.673-23.188,56.229c-6.82,24.786-13.872,50.416-33.983,70.526c-5.721,5.72-7.432,14.322-4.336,21.796 s10.389,12.347,18.478,12.347c53.825,0,96.486-11.473,126.799-34.099c27.317-20.391,43.6-49.341,47.45-84.105 c51.533-45.007,273.565-239.051,292.047-257.533C768.281,159.333,776.217,139.911,776.557,119.544z M457.684,381.666 c-6.01,5.251-11.836,10.341-17.438,15.232l-18.261-18.26c4.887-5.601,9.976-11.432,15.226-17.444L457.684,381.666z M391.361,482.411c-15.732,11.744-36.668,19.57-62.509,23.403c8.793-17.681,13.726-35.608,18.045-51.307 c9.27-33.688,14.916-50.596,37.758-56.63l36.929,36.928C417.518,454.463,407.401,470.438,391.361,482.411z"></path> <path d="M178.311,189.959c2.913,0,5.872-0.64,8.671-1.989c1.795-0.866,3.639-1.717,5.479-2.528 c10.105-4.461,14.681-16.269,10.22-26.374c-4.461-10.104-16.268-14.68-26.374-10.22c-2.247,0.992-4.5,2.032-6.697,3.091 c-9.949,4.797-14.126,16.752-9.33,26.701C163.728,185.79,170.871,189.959,178.311,189.959z"></path> <path d="M322.839,570.789c-11.035-0.108-20.099,8.729-20.224,19.773c-0.863,76.887-12.47,111.188-78.964,111.188 c-37.276,0-76.396-27.269-107.328-74.813C82.216,574.51,63.432,506.443,63.432,435.274c0-92.393,27.9-169.269,78.561-216.465 c8.082-7.529,8.53-20.185,1.001-28.267s-20.185-8.53-28.267-1.001c-29.841,27.801-52.93,63.923-68.627,107.363 c-15.042,41.626-22.668,88.181-22.668,138.37c0,78.821,21.083,154.636,59.363,213.476c38.451,59.104,89.792,93.001,140.856,93.001 c48.841,0,82.882-17.187,101.175-51.082c15.706-29.104,17.416-66.701,17.786-99.657 C342.736,579.967,333.884,570.912,322.839,570.789z"></path> <path d="M421.257,274.597c0-36.74-29.891-66.631-66.631-66.631c-36.741,0-66.633,29.891-66.633,66.631 c0,36.741,29.892,66.633,66.633,66.633C391.366,341.229,421.257,311.338,421.257,274.597z M327.993,274.597 c0-14.685,11.947-26.631,26.633-26.631c14.685,0,26.631,11.946,26.631,26.631c0,14.686-11.946,26.633-26.631,26.633 C339.94,301.229,327.993,289.282,327.993,274.597z"></path> <path d="M195.826,365.177c36.741,0,66.632-29.891,66.632-66.631c0-36.741-29.891-66.632-66.632-66.632 s-66.632,29.891-66.632,66.632C129.194,335.286,159.085,365.177,195.826,365.177z M195.826,271.914 c14.685,0,26.632,11.947,26.632,26.632s-11.947,26.631-26.632,26.631s-26.632-11.946-26.632-26.631 S181.142,271.914,195.826,271.914z"></path> <path d="M211.417,451.638c0-36.741-29.891-66.633-66.632-66.633s-66.632,29.892-66.632,66.633c0,36.74,29.891,66.631,66.632,66.631 S211.417,488.378,211.417,451.638z M144.785,478.269c-14.685,0-26.632-11.946-26.632-26.631c0-14.686,11.947-26.633,26.632-26.633 s26.632,11.947,26.632,26.633C171.417,466.322,159.47,478.269,144.785,478.269z"></path> <path d="M214.792,674.175c36.741,0,66.633-29.891,66.633-66.631s-29.892-66.631-66.633-66.631 c-36.74,0-66.631,29.891-66.631,66.631S178.052,674.175,214.792,674.175z M214.792,580.913c14.686,0,26.633,11.946,26.633,26.631 s-11.947,26.631-26.633,26.631c-14.684,0-26.631-11.946-26.631-26.631S200.108,580.913,214.792,580.913z"></path> </g> </g></svg>                    <h2>Custom Designs</h2>
                    <p>Choose from a variety of cases, lighting options, and cooling solutions to make your PC truly yours.</p>
                </div>
            </section>
            <section className='home-tiers'>
                <div className='background-image'>
                    <img src={bunchOfPcs} alt="Bunch of custom built PCs" />
                </div>
                <div className="tiers-content">
                    <h2>Choose Your Perfect Build</h2>
                    <p>Select from our range of expertly crafted PC tiers, designed to meet your specific needs and budget.</p>
                    <div className="tiers-buttons">
                        <Link to='/build?tier=basic'><button className="basic-tier"><SiBasicattentiontoken />Basic Tier</button></Link>
                        <Link to='/build?tier=standard'><button className="standard-tier"><FaBolt /> Standard</button></Link>
                        <Link to='/build?tier=premium'><button className="premium-tier"><MdWorkspacePremium /> Premium Tier</button></Link>
                    </div>
                </div>
            </section>
            <section className='home-faq'>
                <h2>Frequently Asked Questions</h2>
                <div className="faq-item">
                    <h3>What is the turnaround time for a custom PC build?</h3>
                    <p>Our typical turnaround time is 7-14 business days, depending on the complexity of the build and component availability.</p>
                </div>
                <div className="faq-item">
                    <h3>Do you offer warranties on your custom PCs?</h3>
                    <p>Yes, all our custom PCs come with a standard 2-year warranty covering parts and labor. Extended warranty options are also available.</p>
                </div>
                <div className="faq-item">
                    <h3>Can I upgrade my PC in the future?</h3>
                    <p>Absolutely! Our PCs are built with future upgrades in mind. We can also assist with upgrade services when you're ready.</p>
                </div>
                <div className="faq-item">
                    <h3>What kind of support do you offer after purchase?</h3>
                    <p>We provide comprehensive customer support, including troubleshooting, maintenance advice, and assistance with any issues that may arise.</p>
                </div>
            </section>
        </PageLayout>
    )
}

export default Home