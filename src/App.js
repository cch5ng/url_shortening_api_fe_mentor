import {useState, useEffect} from 'react';
//import logo from './logo.svg';
import './App.css';
import hero from './images/illustration-working.svg';
import UrlCard from './components/UrlCard';

function App() {
  const [url, setUrl] = useState('');
  const [longUrls, setLongUrls] = useState([]);
  const [shortUrls, setShortUrls] = useState([]);
  const [inputError, setInputError] = useState('');

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
          console.log('json', json)
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

  // useEffect(() => {
  // }, [])

  return (
    <div className="App">
      <header> 
        <div>logo</div>
        <div>
          Features
          Pricing
          Resources          
        </div>
        <div>
          Login
          Sign Up
        </div>
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
            <button className="btn-round">Get Started</button>
          </div>
        </div>

        <div className="section-container form flex flex-col desktop:flex-row">
          <div className="form_element desktop:w-4/6">
            <input className={inputError.length > 0 ? "error": ""} type="text" name="url" placeholder="Shorten a link here..." value={url} 
              onChange={inputOnChangeHandler}
              />
            {inputError.length > 0 && (
              <div className="error_text">{inputError}</div>
            )}
          </div>
          <div className="form_element desktop:w-1/6">
            <button className="btn" onClick={buttonClickHandler}>Shorten It</button>
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

      </main>
    <div>
  
  Advanced Statistics

  Track how your links are performing across the web with our 
  advanced statistics dashboard.

  Brand Recognition

  Boost your brand recognition with each click. Generic links don’t 
  mean a thing. Branded links help instil confidence in your content.

  Detailed Records

  Gain insights into who is clicking your links. Knowing when and where 
  people engage with your content helps inform better decisions.

  Fully Customizable

  Improve brand awareness and content discoverability through customizable 
  links, supercharging audience engagement.

  Boost your links today

  Get Started

  Features

  Link Shortening
  Branded Links
  Analytics

  Resources

  Blog
  Developers
  Support

  Company

  About
  Our Team
  Careers
  Contact

      </div>

  <div className="attribution">
    Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
    Coded by <a href="#">Your Name Here</a>.
  </div>

    </div>
  );
}

/*
          <div>
            {error.length > 0 && (
              <div>{error}</div>
            )}
          </div>
          <div>
            {shortUrls.map(shortUrl => {
              return (
                <div>{shortUrl.short_link}</div>
              )
            })}
          </div>
*/

export default App;
