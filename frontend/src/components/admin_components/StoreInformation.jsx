"use client"

import { useState } from "react"

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function StoreInformation() {
  const [workingHours, setWorkingHours] = useState({
    Monday: { status: "open", openTime: "09:00", closeTime: "18:00" },
    Tuesday: { status: "open", openTime: "09:00", closeTime: "18:00" },
    Wednesday: { status: "open", openTime: "09:00", closeTime: "18:00" },
    Thursday: { status: "open", openTime: "09:00", closeTime: "18:00" },
    Friday: { status: "open", openTime: "09:00", closeTime: "18:00" },
    Saturday: { status: "open", openTime: "10:00", closeTime: "16:00" },
    Sunday: { status: "closed", openTime: "", closeTime: "" },
  })

  const handleStatusChange = (day, status) => {
    setWorkingHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], status },
    }))
  }

  const handleTimeChange = (day, field, value) => {
    setWorkingHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Store working hours:", workingHours)
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-4">Store Working Hours</h2>
        <form onSubmit={handleSubmit}>
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className="mb-4">
              <h3 className="h5 mb-3">{day}</h3>
              <div className="d-flex align-items-center mb-2">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id={`${day}-open`}
                    checked={workingHours[day].status === "open"}
                    onChange={() => handleStatusChange(day, "open")}
                  />
                  <label className="form-check-label" htmlFor={`${day}-open`}>
                    Open
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id={`${day}-closed`}
                    checked={workingHours[day].status === "closed"}
                    onChange={() => handleStatusChange(day, "closed")}
                  />
                  <label className="form-check-label" htmlFor={`${day}-closed`}>
                    Closed
                  </label>
                </div>
              </div>
              {workingHours[day].status === "open" && (
                <div className="row g-2">
                  <div className="col-6">
                    <label htmlFor={`${day}-open-time`} className="form-label">
                      Opening Time
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id={`${day}-open-time`}
                      value={workingHours[day].openTime}
                      onChange={(e) => handleTimeChange(day, "openTime", e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor={`${day}-close-time`} className="form-label">
                      Closing Time
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id={`${day}-close-time`}
                      value={workingHours[day].closeTime}
                      onChange={(e) => handleTimeChange(day, "closeTime", e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
          <button type="submit" className="btn btn-primary">
            Save Working Hours
          </button>
        </form>
      </div>
    </div>
  )
}
