import { create } from 'zustand';

import { getGuestList } from '../services/guestListServices';


export const useGuestListStore = create((set) => ({
    guests: [],
    fetchGuests: async () => {
        try {
            const guests = await getGuestList();
            set({ guests });
        } catch (error) {
            console.error("Error fetching guest list:", error);
        }
    },
     updateGuestStatus: (updatedGuest) =>
        set((state) => ({
        guests: state.guests.map((guest) =>
            guest.id === updatedGuest.id ? updatedGuest : guest
        ),
    })),
    fetchGuestsByType: async (userType) => {
        try {
            const guests = await getGuestList(userType);
            set({ guests });
        } catch (error) {
            console.error("Error fetching guest list by type:", error);
        }
    },
}))

