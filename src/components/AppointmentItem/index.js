// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, starred} = props
  const {title, date, id, isStarred} = appointmentDetails

  const onClickStarred = () => {
    starred(id)
  }

  const imgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li>
      <div className="appointment-card">
        <p className="appointment-heading">{title}</p>
        <button
          type="button"
          className="star-button"
          onClick={onClickStarred}
          data-testid="star"
        >
          <img src={imgUrl} alt="star" />
        </button>
      </div>
      <p className="appointment-date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
