import { Link } from 'react-router-dom';
import AboutImg from '../assets/About/AboutImg.jpg';
import Global from '../assets/About/GlobalPlayer.jpg';
import Mission from '../assets/About/Mission.jpg';
import Fact from '../assets/About/Fact&Figure.jpg';
import Culture from '../assets/About/Culture.jpg';
import Management from '../assets/About/Management.jpg';
import Units from '../assets/About/Units.jpg';

const About = () => {
    return (
        <main id='about-main' className='py-10 relative'>
            <div id='about-presentation' className=''>
                <img src={AboutImg} alt="about" className='w-[100%] h-[500px]' />
                <div id='content-about' className='absolute top-25 xl:space-y-6 md:space-y-4 lg:space-y-8 xl:px-14 lg:px-6 md:px-6 sm:px-6 sm:space-y-4'>
                    <h1 className='text-white poppins-black w-[60%] uppercase font-bold lg:text-4xl md:text-4xl sm:text-3xl xl:text-5xl'>Tick Trove: A Legacy of Timekeeping</h1>
                    <p className='xl:text-2xl lg:text-xl md:text-xl sm:text-[17px] w-[45%] poppins-black text-white '>At Tick Trove, we bring together elegance, authenticity, and timeless design, ensuring that every watch tells a story of its own. Whether you're a collector or a first-time buyer, we’re here to help you find the perfect piece that resonates with you.</p>
                    <button className='text-white border border-white bg-transparent px-16 poppins-black uppercase hover:bg-white hover:text-slate-900 transition-colors duration-700 cursor-pointer py-4 text-2xl'>
                        <Link to={'/products'}>Our Models</Link>
                    </button>
                </div>
            </div>
            <div id='our-company' className='container mx-auto px-20 my-10 space-y-10'>
                <h1 className='text-center poppins-balck uppercase font-semibold xl:text-6xl lg:text-5xl md:text-4xl sm:text-4xl text-slate-900'>Company</h1>
                <p className='text-center xl:px-32 md:-px-10 euphoria-font xl:text-[22px] lg:text-[21px] md:text-[21px] sm:text-[18px]'>People who love luxury watches inspire us as much as precious timepieces. That’s why sellers and buyers of luxury watches have our undivided attention.</p>
                <span className='flex border-b-1 border-gray-300 xl:mx-44 lg:mx-28 md:mx-20 sm:mx-16'></span>
                <p className='text-center xl:px-32 lg:px-4 euphoria-font xl:text-xl lg:text-lg md:text-[19x] sm:text-[18px]'>We know that our company wouldn’t exist without valuable watches and enthusiastic watch lovers. But we are not only fond of high-quality timepieces and their admirers. The complexities of information technology and the challenges of global markets also motivate us to push ourselves further every day. Because web and mobile technologies are our core competencies.</p>
                <div id='our-charasteristics' className='xl:flex-row md:flex md:flex-col lg:flex-row lg:flex-wrap justify-center items-center w-full space-x-7 lg:space-y-8 md:space-y-10 sm:space-y-10 py-6'>
                    <div className='xl:w-[30%] lg:w-[45%] w-full lg:flex lg:flex-col lg:items-center md:flex md:flex-col md:items-center sm:flex sm:flex-col sm:items-center space-y-5'>
                        <img src={Global} alt="global" className='w-[350px] h-[220px]' />
                        <h1 className='text-slate-900 text-center poppins-black uppercase text-2xl'>Global Player</h1>
                        <p className='euphoria-font text-[15px] text-center'>The luxury watch market is global.TickTrove provides easy,safe,and reliable market access to all watch enthusiasts.</p>
                    </div>
                    <div className='xl:w-[30%] lg:w-[47%] w-full lg:flex lg:flex-col lg:items-center md:flex md:flex-col md:items-center sm:flex sm:flex-col sm:items-center space-y-5'>
                        <img src={Mission} alt="mission" className='w-[350px] h-[220px]' />
                        <h1 className='text-slate-900 text-center poppins-black uppercase text-2xl'>Mission</h1>
                        <p className='euphoria-font text-[15px] text-center'>There is something that propels us forward. An idea that we pursue in full stride. Our long-term goal for TickTrove.</p>
                    </div>
                    <div className='xl:w-[30%] w-full xl:-mt-8 lg:w-[47%] lg:flex lg:flex-col lg:items-center md:flex md:flex-col md:items-center sm:flex sm:flex-col sm:items-center space-y-5'>
                        <img src={Fact} alt="fact" className='w-[350px] h-[220px] md:-ml-6' />
                        <h1 className='text-slate-900 text-center poppins-black uppercase text-2xl'>Fact & Figure</h1>
                        <p className='euphoria-font text-[15px] text-center'>Watches and Internet – a fantastic combination of tradition and high-tech. Endless possibilities every day.</p>
                    </div>
                </div>
            </div>
            <div className='bg-gray-100'>
                <div id='team' className='container mx-auto px-20 py-10 space-y-10'>
                    <h1 className='text-center poppins-black uppercase text-5xl text-slate-900'>Team</h1>
                    <p className='text-center euphoria-font lg:px-4 xl:px-28 text-2xl'>What sets us apart? An inspiring corporate culture, an experienced management team, and the contagious team spirit in our units.</p>
                    <div id='our-team' className='grid justify-center xl:grid-cols-3 lg:grid-cols-2 gap-8 py-6'>
                        <div id='culture' className='lg:grid md:place-items-center space-y-4'>
                            <img src={Culture} alt="culture" className='lg:w-[350px] lg:h-[230px] md:w-full md:h-[300px]' />
                            <h1 className='text-slate-900 text-3xl poppins-black uppercase text-center'>Culture</h1>
                            <p className='text-slate-900 euphoria-font'>Our goal is to bring trust and transparency to the global luxury watch market. This is also reflected in our corporate culture.</p>
                            <p className='text-slate-900 euphoria-font'>Content employees create the best products. Openness and appreciation are key elements of our corporate culture.</p>
                        </div>
                        <div id='culture' className='lg:grid md:place-items-center space-y-4'>
                            <img src={Management} alt="culture" className='lg:w-[350px] lg:h-[230px] md:w-full md:h-[300px]' />
                            <h1 className='text-slate-900 text-3xl poppins-black uppercase text-center'>Management</h1>
                            <p className='text-slate-900 euphoria-font'>Aside from a love for watches, our management team brings years of experience in successfully operating online marketplaces to the table.</p>
                            <p className='text-slate-900 euphoria-font'>Valuable watches and enthusiastic watch lovers – a fascinating global market for our company.</p>
                        </div>
                        <div id='culture' className=' lg:grid md:place-items-center space-y-4'>
                            <img src={Units} alt="culture" className='lg:w-[350px] lg:h-[230px] md:w-full -mt-1 md:h-[300px]' />
                            <h1 className='text-slate-900 text-3xl poppins-black uppercase text-center'>Units</h1>
                            <p className='text-slate-900 euphoria-font'>Each of our units is unique, but all share one thing: people who are passionate about their work</p>
                            <p className='text-slate-900 euphoria-font'>TickTrove is a dynamic company. We scrutinize structures, dare to do things differently, and create our own future.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default About;