import StoreHours from "../models/store.js"
import { emitStoreHours } from "../socket.js"

export const saveStoreHours = async (req, res) => {
    try {
        const { workingHours } = req.body

        let store = await StoreHours.findOne()
        if (store) {
            store.workingHours = workingHours
        } else {
            store = new StoreHours({ workingHours })
        }

        await store.save()

        
        emitStoreHours(store)

        res.status(200).json({ message: "Store hours saved successfully" })
    } catch (error) {
        res.status(500).json({ error: "Error saving store hours" })
    }
}

export const getStoreHours = async (req, res) => {
    try {
        let store = await StoreHours.findOne()
        if (!store) {
            store = new StoreHours({ workingHours: {} })
            await store.save()
        }

        res.json(store)
    } catch (error) {
        res.status(500).json({ error: "Error fetching store hours" })
    }
}