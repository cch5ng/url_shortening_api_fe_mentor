import {useState} from 'react';

function UrlCard({longUrl, shortUrl}) {
  const [isUrlCopied, setIsUrlCopied] = useState(false);
  const [cardError, setCardError] = useState('');

  const handleCopyClick = (ev) => {
    ev.preventDefault();
    navigator.permissions.query({name: "clipboard-write"}).then(result => {
      if (result.state == "granted" || result.state == "prompt") {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(shortUrl)
            .then(function() {
              setIsUrlCopied(true);
            }, function() {
              setIsUrlCopied(false);
              setCardError('Cannot copy url to the clipboard. Please copy it manually.');
            });  
        }
      }
    });
  }

  const btn_class = isUrlCopied ? "btn_activated btn desktop:btn_small hover:bg-cyan-light" : "btn desktop:btn_small hover:bg-cyan-light";

  return (
    <div className="card-container flex flex-col justify-center items-start w-full 
      desktop:flex-row desktop:items-center">
      <div className="long_url w-full">{longUrl}</div>
      <div className="flex flex-col w-full desktop:flex-row desktop:items-center">
        <div className="short_url w-full">{shortUrl}</div>
        <div className="w-full">
          <button className={btn_class} onClick={handleCopyClick}>{isUrlCopied ? 'Copied!': 'Copy'}</button>
        </div>
      </div>
    </div>
  )
}

export default UrlCard;