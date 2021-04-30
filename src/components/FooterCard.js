function FooterCard({heading, links}) {

  return (
    <div className="text-center my-10 desktop:text-left desktop:mx-8 desktop:my-0">
      <h4 className="text-white">{heading}</h4>
      <>
        {links.map(link => (
          <div><a className="footer_link" href="">{link}</a></div>
        ))}
      </>
    </div>
  )
}

export default FooterCard;