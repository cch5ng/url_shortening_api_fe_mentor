import {useState, useEffect} from 'react';
import { GiHamburgerMenu } from "react-icons/gi";

import logo from './images/logo.svg';
import './App.css';
import hero from './images/illustration-working.svg';
import UrlCard from './components/UrlCard';
import brandRecognition from './images/icon-brand-recognition.svg';
import detailedRecords from './images/icon-detailed-records.svg';
import fullyCustomizable from './images/icon-fully-customizable.svg';
import StatisticsCard from './components/StatisticsCard';
import FooterCard from './components/FooterCard';
import { ReactComponent as LogoSVG } from './images/logo.svg';
import {ReactComponent as FBIcon} from './images/icon-facebook.svg';
import {ReactComponent as IGIcon} from './images/icon-instagram.svg';
import {ReactComponent as PinterestIcon} from './images/icon-pinterest.svg';
import {ReactComponent as TwitterIcon} from './images/icon-twitter.svg';


const STATISTICS_CARDS = [
  { 'heading': 'Brand Recognition',
    'body': 'Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content.',
    'src': brandRecognition,
  },
  { 'heading': 'Detailed Records',
    'body': 'Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.',
    'src': detailedRecords,
  },
  { 'heading': 'Fully Customizable',
    'body': 'Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.',
    'src': fullyCustomizable,
  }
];

const FOOTER_CARDS = [
  { heading: 'Features',
    links: ['Link Shortening', 'Branded Links', 'Analytics'],  
  },
  { heading: 'Resources',
    links: ['Blog', 'Developers', 'Support'],  
  },
  { heading: 'Company',
    links: ['About', 'Our Team', 'Careers', 'Contact'],  
  },
]

function App() {
  const [url, setUrl] = useState('');
  const [longUrls, setLongUrls] = useState([]);
  const [shortUrls, setShortUrls] = useState([]);
  const [inputError, setInputError] = useState('');
  const [navIsShown, setNavIsShown] = useState(false);

  const navClassName = navIsShown ? `nav-mobile-container desktop:hidden` : `nav-mobile-container hidden desktop:hidden`;

  const inputOnChangeHandler = (ev) => {
    const {name, value} = ev.target;
    if (name === 'url') {
      setUrl(value);
    }
  }

  const buttonClickHandler = (ev) => {
    setInputError('');
    ev.preventDefault();
    const apiUrl = `https://api-ssl.bitly.com/v4/shorten`;
    const body = {
      long_url: url,
      domain: "bit.ly",
    }
    if (url.length) {
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_BITLY_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      })
        .then(resp => resp.json())
        .then(json => {
          if (json && json.link) {
            const {long_url, link} = json;
            let newLongUrls = longUrls.concat([long_url]);
            let updatedUrls = shortUrls.concat([link]);
            setLongUrls(newLongUrls);
            setShortUrls(updatedUrls);
            setUrl('');
          } else {
            console.log('todo handle err')
            console.error('fetch short url issue', json.error)
          }
        })
    } else {
      setInputError('Please add a link');
    }
  }

  const toggleNavDisplay = (ev) => {
    setNavIsShown(!navIsShown);
  }

  return (
    <div className="App">
      <header className="header-container">
        <div className="header-top-container flex flex-row justify-between desktop:justify-end desktop:align-middle">
          <LogoSVG className="logo_header desktop:w-1/6 desktop:justify-end"/>
          <GiHamburgerMenu className="hamburger-icon desktop:hidden" onClick={toggleNavDisplay} />
          <div className="hidden desktop:flex desktop:flex-row desktop:w-2/6 desktop:justify-self-start desktop:-mt-2">
            <h4 className="header-nav-element hover:text-violet-dark">Features</h4>
            <h4 className="header-nav-element hover:text-violet-dark">Pricing</h4>
            <h4 className="header-nav-element hover:text-violet-dark">Resources</h4>    
          </div>
          <div className="hidden desktop:flex desktop:flex-row desktop:w-3/6 desktop:justify-end desktop:-mt-2">
            <h4 className="header-nav-element hover:text-violet-dark">Login</h4>
            <h4 className="header-nav-element hover:text-violet-dark">Sign Up</h4>
          </div>
        </div>
        <nav className={navClassName}>
          <h4>Features</h4>
          <h4>Pricing</h4>
          <h4>Resources</h4>    
          <h4>Login</h4>
          <div>
            <button className="btn-round hover:bg-cyan-light" >Sign Up</button>
          </div>
        </nav>
      </header>
      <main>
        <div className="section-container desktop:flex desktop:flex-row-reverse">
          <div className="hero-image desktop:w-1/2">
            <img src={hero} />
          </div>
          <div className="hero-text desktop:w-1/2 desktop:text-left">
            <h1 className="desktop:text-7xl">More than just shorter links</h1>
            <div className="desktop:text-2xl">
              Build your brand’s recognition and get detailed insights on how your links are performing.
            </div>
            <button className="btn-round hover:bg-cyan-light">Get Started</button>
          </div>
        </div>

        <div className="section-container form flex flex-col desktop:flex-row bg-shorten-background-mobile desktop:bg-shorten-background-desktop bg-no-repeat bg-cover">
          <div className="form_element desktop:w-4/6">
            <input className={inputError.length > 0 ? "error": ""} type="text" name="url" placeholder="Shorten a link here..." value={url} 
              onChange={inputOnChangeHandler}
              />
            {inputError.length > 0 && (
              <div className="error_text">{inputError}</div>
            )}
          </div>
          <div className="form_element desktop:w-1/6">
            <button className="btn hover:bg-cyan-light" onClick={buttonClickHandler}>Shorten It</button>
          </div>
        </div>

        {shortUrls.length > 0 && (
          <div className="section-container bg-grey">
            <>
              {shortUrls.map((shortUrl, idx) => {
                return (
                  <UrlCard shortUrl={shortUrl} longUrl={longUrls[idx]}/>
                )
              })}
            </>
          </div>
        )}

        <div className="section-container bg-grey">
          <div>
            <h2 className="text-violet-dark">Advanced Statistics</h2>
            <div>Track how your links are performing across the web with our advanced statistics dashboard.</div>
          </div>
          <div className="flex flex-col desktop:flex-row desktop:justify-between desktop:mt-8">
              {STATISTICS_CARDS.map(card => (
                <StatisticsCard heading={card.heading} body={card.body} src={card.src} />
              ))}
          </div>
        </div>

        <div className="section-container bg-violet-dark text-center h-300px flex flex-col 
          justify-center items-center bg-boost-background-mobile desktop:bg-boost-background-desktop bg-no-repeat bg-cover">
          <div>
            <h2 className="text-white text-center">Boost your links today</h2>
            <button className="btn-round hover:bg-cyan-light">Get Started</button>
          </div>
        </div>
      </main>
      <footer className="flex flex-col p-10 justify-center items-center 
        desktop:flex-row desktop:justify-between desktop:items-start">
        <LogoSVG className="logo_footer desktop:w-1/4 desktop:justify-self-center desktop:align-self-top" />
        <div className="flex flex-col desktop:flex-row desktop:w-1/2 desktop:justify-start
          desktop:items-start">
          {FOOTER_CARDS.map(section => (
            <FooterCard heading={section.heading} links={section.links} />
          ))}
        </div>
        <div className="flex flex-row desktop:w-1/4">
            <FBIcon className="mx-3 social_icon hover:text-cyan"/>
            <IGIcon className="mx-3 social_icon  hover:text-cyan"/>
            <PinterestIcon className="mx-3 social_icon  hover:text-cyan"/>
            <TwitterIcon className="mx-3 social_icon  hover:text-cyan"/>
        </div>
      </footer>

  <div className="attribution">
    Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
    Coded by <a href="#">Your Name Here</a>.
  </div>

    </div>
  );
}

export default App;
