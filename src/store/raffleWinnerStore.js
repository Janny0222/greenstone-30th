import { create } from 'zustand';
import { getFirstRaffleWinners } from '../services/raffleWinnerServices';

export const useRaffleWinnerStore = create((set) => ({
    firstRaffleWinners: [],
    fetchFirstRaffleWinners: async () => {
        try {
            const firstRaffleWinners = await getFirstRaffleWinners();
            set({ firstRaffleWinners });
        } catch (error) {
            console.error("Error fetching first raffle winners:", error);
        }
    }
}))

