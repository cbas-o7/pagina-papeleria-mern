"use client"

import { useState } from "react"
import { useStoreHours } from "../../hooks/storehour/useStoreHours"

export default function StoreInformation() {

  const { workingHours, handleStatusChange, handleTimeChange, handleSubmit, loading, errorMessages } = useStoreHours()

  if (loading) return <p>Cargando horario de tienda...</p>

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h2 className="card-title mb-4">Horas de trabajo de la tienda</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(workingHours).map((day) => (
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
                    Abierto
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
                    Cerrado
                  </label>
                </div>
              </div>
              {workingHours[day].status === "open" && (
                <div className="row g-2">
                  <div className="col-6">
                    <label htmlFor={`${day}-open-time`} className="form-label">
                      Hora de apertura
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id={`${day}-open-time`}
                      value={workingHours[day].openTime}
                      onChange={(e) => handleTimeChange(day, "openTime", e.target.value)}
                    />

                    {errorMessages[day]?.openTime && (
                      <div className="text-danger">{errorMessages[day].openTime}</div>
                    )}

                  </div>
                  <div className="col-6">
                    <label htmlFor={`${day}-close-time`} className="form-label">
                      Hora de cierre
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id={`${day}-close-time`}
                      value={workingHours[day].closeTime}
                      onChange={(e) => handleTimeChange(day, "closeTime", e.target.value)}
                    />

                    {errorMessages[day]?.closeTime && (
                      <div className="text-danger">{errorMessages[day].closeTime}</div>
                    )}

                  </div>
                </div>
              )}
            </div>
          ))}

          <button type="submit" className="btn btn-primary">
            Guardar horas de trabajo
          </button>
        </form>
      </div>
    </div>
  )
}
