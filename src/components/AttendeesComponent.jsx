import React, { useEffect, useRef } from 'react';
import Layout from './ui/Layout';
import Table from './ui/Table';
import { useGuestAttendeeStore } from '../store/guestAttendeeStore';
import { useGuestListStore } from '../store/guestListStore';
import { socket } from "../socket";
import { toast } from 'react-toastify';
import { chunkArray } from '../utils/chunkArray'; // 👈 helper function

const attendeeTableHead = [
  { key: 'name', label: 'Name' },
  { key: 'timeArrival', label: 'Time Arrival' }
];

const employeeTableHead = [
  { key: 'name', label: 'Name' },
  { key: 'department', label: 'Department' }
];

const Text = "text-md text-left font-semibold whitespace-nowrap px-5 py-3";

const AttendeesComponent = () => {
  const { fetchGuestAttendees, attendees } = useGuestAttendeeStore();
  const { fetchGuests, guests } = useGuestListStore();
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/preview.mp3");
    return () => (audioRef.current = null);
  }, []);

  useEffect(() => {
    fetchGuestAttendees();
    fetchGuests();
  }, [fetchGuestAttendees, fetchGuests]);

  useEffect(() => {
    socket.on("guest-verified", (guest) => {
      fetchGuestAttendees();
      fetchGuests();
      toast.success(`Guest has been verified ${guest.name}`, {
        autoClose: 2000,
        onOpen: () => {
          audioRef.current.play().catch(error => {
            console.warn("Audio play was blocked:", error);
          });
        }
      });
    });
    return () => socket.off("guest-verified");
  }, [fetchGuestAttendees, fetchGuests]);

  useEffect(() => {
    socket.on("new-guest", () => fetchGuests());
    return () => socket.off("new-guest");
  }, [fetchGuests]);

  const rowRenderer = (attendee) => (
    <>
      <td className={`px-6 ${Text} py-4`}>{attendee.name}</td>
      <td className={`px-6 ${Text} py-4`}>
        {new Date(attendee.time_arrival).toLocaleString().split(",")[1]}
      </td>
    </>
  );

  const employeeRowRenderer = (employee) => (
    <>
      <td className={`px-6 ${Text} py-4`}>{employee.name}</td>
      <td className={`px-6 ${Text} py-4`}>{employee.department}</td>
    </>
  );

  const balintawakAttendees = attendees.filter(a => a.group === "Balintawak-Office");
  const balintawakChunks = chunkArray(balintawakAttendees, 11);

  const sqAttendees = attendees.filter(a => a.group === "SQ-Office");
  const sqChunks = chunkArray(sqAttendees, 11);

  const balintawakExpected = guests.filter(g => g.group === "Balintawak-Office" && !g.isAttending);
  const sqExpected = guests.filter(g => g.group === "SQ-Office" && !g.isAttending);

  return (
    <Layout>
      <div className='container-fluid mx-auto flex flex-col p-5 lg:p-10'>

        {/* BALINTAWAK OFFICE */}
        <div className='grid grid-cols-10 gap-4 mb-5'>
          <div className='col-span-10 border rounded-sm border-black shadow-md'>
            <h1 className='text-xl font-bold text-center p-2'>Balintawak Office</h1>
            <hr className='border-black' />
              <>
                {balintawakChunks.length > 0 ? (
                  <div className='grid grid-cols-8 gap-2'>
                    {balintawakChunks.map((chunk, idx) => (
                      <div className="flex col-span-4 md:col-span-4 lg:col-span-2 mt-1 gap-4 overflow-x-auto">
                        <Table
                          key={idx}
                          tableHead={attendeeTableHead}
                          data={chunk}
                          rowRender={rowRenderer}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='flex justify-center items-center h-48'>
                    <h1 className='text-2xl font-bold text-center'>No Employee has arrived yet.</h1>
                  </div>
                )}
              </>
          </div>

          {/* <div className='col-span-2 border rounded-sm border-black shadow-md'>
            <h1 className='text-xl font-bold text-center p-2'>Expected Employees</h1>
            <hr className='border-black' />
            {balintawakExpected.length > 0 ? (
              <Table
                tableHead={employeeTableHead}
                data={balintawakExpected}
                rowRender={employeeRowRenderer}
              />
            ) : (
              <div className='flex justify-center items-center h-48'>
                <h1 className='text-2xl font-bold text-center'>
                  All Employees have arrived.
                </h1>
              </div>
            )}
          </div> */}
        </div>

        {/* SQ OFFICE */}
        <div className='grid grid-cols-10 gap-4 mb-5'>
          <div className='col-span-10 border rounded-sm border-black shadow-md'>
            <h1 className='text-xl font-bold text-center p-2'>SQ Office</h1>
            <hr className='border-black' />
            <>
                {sqChunks.length > 0 ? (
                  <div className='grid grid-cols-8 gap-2'>
                    {sqChunks.map((chunk, idx) => (
                      <div className="flex col-span-4 md:col-span-4 lg:col-span-2 mt-1 gap-4 overflow-x-auto">
                        <Table
                          key={idx}
                          tableHead={attendeeTableHead}
                          data={chunk}
                          rowRender={rowRenderer}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='flex justify-center items-center h-48'>
                    <h1 className='text-2xl font-bold text-center'>No Employee has arrived yet.</h1>
                  </div>
                )}
              </>
          </div>

          {/* <div className='col-span-3 border rounded-sm border-black shadow-md'>
            <h1 className='text-xl font-bold text-center p-2'>Expected Employees</h1>
            <hr className='border-black' />
            {sqExpected.length > 0 ? (
              <Table
                tableHead={employeeTableHead}
                data={sqExpected}
                rowRender={employeeRowRenderer}
              />
            ) : (
              <div className='flex justify-center items-center h-48'>
                <h1 className='text-2xl font-bold text-center'>
                  All Employees have arrived.
                </h1>
              </div>
            )}
          </div> */}
        </div>

      </div>
    </Layout>
  );
};

export default AttendeesComponent;
