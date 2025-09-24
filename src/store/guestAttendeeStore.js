import { create } from 'zustand';
import { getAllAttendees } from '../services/guestAttendeeServices';

export const useGuestAttendeeStore = create((set) => ({
    attendees: [],
    fetchGuestAttendees: async () => {
        try {
            const attendees = await getAllAttendees();
            set({ attendees });
        } catch (error) {
            console.error("Error fetching guest attendees:", error);
        }
    },
}))
