function StatisticsCard({heading, body, src}) {
  return (
    <div className="statistics_card_container text-center desktop:min-w-min	">
      <div className="icon">
        <img className="icon_img" src={src}/>
      </div>
      <div>
        <h3>{heading}</h3>
      </div>
      <div>
        {body}
      </div>

    </div>
  )
}

export default StatisticsCard;