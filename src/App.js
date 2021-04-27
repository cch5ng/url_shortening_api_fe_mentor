import {useState, useEffect} from 'react';
//import logo from './logo.svg';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrls, setShortUrls] = useState([]);
  const [error, setError] = useState('');

  const inputOnChangeHandler = (ev) => {
    const {name, value} = ev.target;
    if (name === 'url') {
      setUrl(value);
    }
  }

  const buttonClickHandler = (ev) => {
    setError('');
    ev.preventDefault();
    const apiUrl = `https://api.shrtco.de/v2/shorten?url=`;
    if (url.length) {
      fetch(`${apiUrl}${url}`)
        .then(resp => resp.json())
        .then(json => {
          console.log('json', json)
          if (json.ok) {
            let updatedUrls = shortUrls.concat([json.result]);
            setShortUrls(updatedUrls);
            setUrl('');
          } else {
            console.log('todo handle err')
            setError(json.error)
          }
        })
    }
  }

  // useEffect(() => {
  // }, [])

  return (
    <div className="App">

    <div>
      <form>
        <input type="text" name="url" placeholder="Shorten a link here..." value={url} 
          onChange={inputOnChangeHandler}
          />
        <button onClick={buttonClickHandler}>Shorten It</button>
      </form>
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
    </div>



    <div>
      <h1 className="text-grey">TODO</h1>


  Features
  Pricing
  Resources

  Login
  Sign Up

  More than just shorter links

  Build your brand’s recognition and get detailed insights 
  on how your links are performing.

  Get Started
  
  Shorten a link here...

  Shorten It!

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

export default App;
