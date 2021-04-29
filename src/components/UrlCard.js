import {useState} from 'react';

function UrlCard({longUrl, shortUrl}) {
  const [isUrlCopied, setIsUrlCopied] = useState(false);

  return (
    <div className="flex flex-col justify-center items-start w-full">
      <div className="h-50px long_url w-full">{longUrl}</div>
      <div className="h-50px short_url w-full">{shortUrl}</div>
      <div className="w-full">
        <button className="btn">{isUrlCopied ? 'Copied!': 'Copy'}</button>
      </div>
    </div>
  )
}

export default UrlCard;