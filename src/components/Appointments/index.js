// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    title: '',
    dateValue: new Date(),
    appointmentsList: [],
    isStarredFilter: false,
  }

  setStarred = id => {
    this.setState(prevState => {
      const filteredAppointmentList = prevState.appointmentsList.map(
        appointment => {
          if (appointment.id === id) {
            return {...appointment, isStarred: !appointment.isStarred}
          }
          return appointment
        },
      )
      return {appointmentsList: filteredAppointmentList}
    })
  }

  onSubmitAdd = e => {
    e.preventDefault()
    const {title, dateValue} = this.state

    if (title !== '' && dateValue !== null) {
      const newAppointment = {
        id: uuidv4(),
        title,
        date: format(new Date(dateValue), 'dd MMMM yyyy, EEEE'),
        isStarred: false,
      }
      this.setState(prevState => {
        const newAppointmentsList = [
          ...prevState.appointmentsList,
          newAppointment,
        ]
        return {
          appointmentsList: newAppointmentsList,
          title: '',
          dateValue: new Date(),
        }
      })
    }
  }

  onChangeTitle = e => {
    this.setState({title: e.target.value})
  }

  onChangeDate = e => {
    this.setState({dateValue: e.target.value})
  }

  starredFilter = () => {
    this.setState(prevState => ({
      isStarredFilter: !prevState.isStarredFilter,
    }))
  }

  render() {
    const {title, dateValue, appointmentsList, isStarredFilter} = this.state

    let filteredAppointmentList = [...appointmentsList]

    if (isStarredFilter) {
      filteredAppointmentList = appointmentsList.filter(
        appointment => appointment.isStarred === true,
      )
    }

    return (
      <div className="container">
        <div className="appointments-container">
          <div className="first-container">
            <form className="form-container" onSubmit={this.onSubmitAdd}>
              <h1 className="heading">Add Appointment</h1>
              <div className="input-container">
                <label htmlFor="title">TITLE</label>
                <input
                  className="inputs"
                  id="title"
                  placeholder="Title"
                  type="text"
                  value={title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="input-container">
                <label htmlFor="date">DATE</label>
                <input
                  className="inputs"
                  id="date"
                  type="date"
                  value={dateValue}
                  onChange={this.onChangeDate}
                />
              </div>
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
            <div>
              <img
                className="img"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <div className="second-container">
            <h1 className="sub-heading">Appointments</h1>
            <button
              type="button"
              className={`starred-button ${
                isStarredFilter && 'highlight-starred-button'
              }`}
              onClick={this.starredFilter}
            >
              Starred
            </button>
          </div>
          <ul>
            {filteredAppointmentList.map(appointment => (
              <AppointmentItem
                key={appointment.id}
                appointmentDetails={appointment}
                starred={this.setStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
