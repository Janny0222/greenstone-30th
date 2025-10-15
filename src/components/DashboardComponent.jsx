import React, { useEffect, useState } from "react";
import AddGuestModal from "./modals/AddGuestModal";
import { useGuestListStore } from "../store/guestListStore";
import { socket } from "../socket";
import Layout from "./ui/Layout";

export default function DashboardComponent() {
  const [addGuestModalOpen, setAddGuestModalOpen] = useState(false);
  const { fetchGuests, guests } = useGuestListStore();

  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  useEffect(() => {
    socket.on("scan-guest-updated", () => {
      fetchGuests();
    });
    return () => {
      socket.off("scan-guest-updated");
    };
  }, [fetchGuests]);

  useEffect(() => {
    socket.on("new-guest", () => {
      fetchGuests();
    });
    return () => {
      socket.off("new-guest");
    };
  }, [fetchGuests]);


  return (
    <Layout>
      <AddGuestModal
        modalOpen={addGuestModalOpen}
        setModalOpen={setAddGuestModalOpen}
      />

          <div className='container mx-auto flex-1 lg:p-10'>
            <div className="mb-6">
              <p className="text-gray-600">
                Manage guests for the 30th Anniversary of Greenstone
              </p>
            </div>
            {/* Guest List */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="overflow-y-scroll h-[600px]">
                <table className="w-full table-auto ">
                  <thead className="bg-green-200">
                    <tr className="bg-green-100 text-green-900 text-sm uppercase tracking-wide">
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-left">Group</th>
                      <th className="px-4 py-3 text-left">Present</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-200">
                    {guests.length > 0 ? (
                      guests.map((guest) => (
                        <tr key={guest.id} className="hover:bg-gray-50 transition">
                          <td className="px-4 py-3 font-medium text-gray-800">
                            {guest.name}
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {guest.group}
                          </td>
                          <td className="px-4 py-3">
                            {guest.isAttending ? (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                Yes
                              </span>
                            ) : (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">
                                No
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-6 text-center text-gray-500"
                        >
                          No guests found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
    </Layout>
  );
}
