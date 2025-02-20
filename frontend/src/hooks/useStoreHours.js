import { useState, useEffect } from "react"
import { saveStoreHours, getStoreHours } from "../services/api"

const DAYS_OF_WEEK = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]

export function useStoreHours() {
    const [workingHours, setWorkingHours] = useState({})
    const [errorMessages, setErrorMessages] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStoreHours = async () => {
            try {
                const data = await getStoreHours()
                const sortedWorkingHours = sortWorkingHours(data.workingHours )

                setWorkingHours(sortedWorkingHours)
                //console.log(data.workingHours)
            } catch (error) {
                console.error("Error al obtener el horario de la tienda:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchStoreHours()
    }, [])
/* 
    const initializeWorkingHours = () => {
        DAYS_OF_WEEK.reduce((acc, day) => {
            acc[day] = { status: "open", openTime: "09:00", closeTime: "18:00" }
            return acc
        }, {})
    } */

    // Función para ordenar los horarios según el orden de la semana
    const sortWorkingHours = (workingHours) => {
        const sortedHours = {}
        DAYS_OF_WEEK.forEach((day) => {
            sortedHours[day] = workingHours[day] || { status: "open", openTime: "09:00", closeTime: "18:00" }
        })
        return sortedHours
    }

    //const [error, setError] = useState("")

    const handleStatusChange = (day, status) => {
        setWorkingHours((prev) => ({
            ...prev,
            [day]: { status, openTime: "09:00", closeTime: "18:00" },
        }))
        setErrorMessages((prev) => ({ ...prev, [day]: {} }))
    }

    const handleTimeChange = (day, field, value) => {
        setWorkingHours((prev) => ({
            ...prev,
            [day]: { ...prev[day], [field]: value },
        }))
    }

    const validateTimes = () => {
        let errors = {}

        for (const day of DAYS_OF_WEEK) {
            const { status, openTime, closeTime } = workingHours[day]
            if (status === "open" && openTime >= closeTime) {
                errors[day] = {
                    openTime: "La hora de apertura debe ser anterior a la hora de cierre.",
                    closeTime: "La hora de cierre debe ser posterior a la hora de apertura.",
                }
            }
        }

        setErrorMessages(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateTimes()) return

        try {
            await saveStoreHours(workingHours)
            alert("¡Las horas de la tienda se guardaron correctamente!")
        } catch (error) {
            console.error("Error al guardar el horario de la tienda:", error)
        }
    }

    return { workingHours, handleStatusChange, handleTimeChange, handleSubmit, errorMessages, loading }
}
