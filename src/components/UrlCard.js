import {useState} from 'react';

function UrlCard({longUrl, shortUrl}) {
  const [isUrlCopied, setIsUrlCopied] = useState(false);

  return (
    <div className="card-container flex flex-col justify-center items-start w-full 
      desktop:flex-row desktop:items-center">
      <div className="long_url w-full">{longUrl}</div>
      <div className="flex flex-col desktop:flex-row desktop:items-center">
        <div className="short_url w-full">{shortUrl}</div>
        <div className="w-full">
          <button className="btn btn_small">{isUrlCopied ? 'Copied!': 'Copy'}</button>
        </div>
      </div>
    </div>
  )
}

export default UrlCard;