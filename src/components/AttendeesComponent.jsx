import React, { useEffect, useRef } from 'react'
import Layout from './ui/Layout'
import Table from './ui/Table'
import { useGuestAttendeeStore } from '../store/guestAttendeeStore'
import { useGuestListStore } from '../store/guestListStore'
import { socket } from "../socket";
import { toast } from 'react-toastify';

const attendeeTableHead = [
  {key: 'name', label: 'Name'},
  {key: 'department', label: 'Department'},
  {key: 'timeArrival', label: 'Time Arrival'}
]

const employeeTableHead = [
  {key: 'name', label: 'Name'},
  {key: 'department', label: 'Department'},
]

const Text = "text-md text-left font-semibold whitespace-nowrap px-5 py-3";

const AttendeesComponent = () => {
  const { fetchGuestAttendees, attendees } = useGuestAttendeeStore()
  const { fetchGuests, guests } = useGuestListStore();

  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/preview.mp3");
    return () => {
      audioRef.current = null;
    };
  }, [])
  useEffect(() => {
      fetchGuestAttendees();
      fetchGuests();
  }, [fetchGuestAttendees, fetchGuests]);

  useEffect(() => {
    socket.on("guest-verified", (guest) => {
      fetchGuestAttendees();
      fetchGuests();
      toast.success(`Guest has been verified ${guest.name}`, 
        {
          autoClose: 2000,
          onOpen: () => {
            audioRef.current.play().catch(error => {
              console.warn("Audio play was blocked:", error)
            })
          }
        });
    });
    return () => {
      socket.off("guest-verified");
    };
  }, [fetchGuestAttendees, fetchGuests]);

  useEffect(() => {
      socket.on("new-guest", () => {
        fetchGuests();
      });
      return () => {
        socket.off("new-guest");
      };
    }, [fetchGuests]);

  const rowRenderer = (attendee) => (
    <>
      <td className={`px-6 ${Text} py-4`}>{attendee.name}</td>
      <td className={`px-6 ${Text} py-4`}>{attendee.department}</td>
      <td className={`px-6 ${Text} py-4`}>{new Date(attendee.time_arrival).toLocaleString().split(",")[1]}</td>
    </>
  )
  
  const employeeRowRenderer = (employee) => (
    <>
      <td className={`px-6 ${Text} py-4`}>{employee.name}</td>
      <td className={`px-6 ${Text} py-4`}>{employee.department}</td>
    </>
  )
  return (
    <Layout>
      <div className='container mx-auto flex flex-col p-5 lg:p-10'>
        <div className='grid grid-cols-9 gap-4 md:gap-6 mb-5'>
          <div className='col-span-6 border rounded-sm border-black shadow-md '>
            <h1 className='text-xl font-bold text-center p-2'>Balintawak Office</h1>
            <hr  className='border-black'/>
            {attendees.length > 0 ? 
            (
              <Table tableHead={attendeeTableHead} data={attendees.filter((guest) => guest.group === "Balintawak-Office")} rowRender={rowRenderer}  />
            ) : (
              <div className='flex justify-center items-center h-48'>
                <h1 className='text-2xl font-bold text-center'>No Employee has arrived yet.</h1>
              </div>
            )}
          </div>
          <div className='col-span-3 border rounded-sm border-black shadow-md'>
            <h1 className='text-xl font-bold text-center p-2'>Expected Employees</h1>
            <hr  className='border-black'/>
            {guests.filter((guest) => guest.group === "Balintawak-Office" && !guest.isAttending).length > 0 ? 
            (
              <Table tableHead={employeeTableHead} data={guests.filter((guest) => guest.group === "Balintawak-Office" && !guest.isAttending)} rowRender={employeeRowRenderer}  /> 
            ) : guests.filter((guest) => guest.group === "Balintawak-Office" && !guest.isAttending).length === 0 ? (
              <div className='flex justify-center items-center h-48'>
                <h1 className='text-2xl font-bold text-center'>No Employees Avaialble yet</h1>
              </div>
            ) : ( 
              <div className='flex justify-center items-center h-48'>
                <h1 className='text-2xl font-bold text-center'>All Employees have arrived.</h1>
              </div>
              ) }
          </div>
        </div>
        <div className='grid grid-cols-9 gap-4 md:gap-6 mb-5'>
          <div className='col-span-6 border rounded-sm border-black shadow-md '>
            <h1 className='text-xl font-bold text-center p-2'>SQ Office</h1>
            <hr  className='border-black'/>
            {attendees.length > 0 ? 
            (
              <Table tableHead={attendeeTableHead} data={attendees.filter((guest) => guest.group === "SQ-Office")} rowRender={rowRenderer}  />
            ) :  (
              <div className='flex justify-center items-center h-48'>
                <h1 className='text-2xl font-bold text-center'>No Employee has arrived yet.</h1>
              </div>
            )}
          </div>
          <div className='col-span-3 border rounded-sm border-black shadow-md'>
            <h1 className='text-xl font-bold text-center p-2'>Expected Employees</h1>
            <hr  className='border-black'/>
            {guests.filter((guest) => guest.group === "SQ-Office" && !guest.isAttending).length > 0 ?  
            (
              <Table tableHead={employeeTableHead} data={guests.filter((guest) => guest.group === "SQ-Office" && !guest.isAttending)} rowRender={employeeRowRenderer}  />
            ) : guests.filter((guest) => guest.group === "SQ-Office" && !guest.isAttending).length === 0 ? (
              <div className='flex justify-center items-center h-48'>
                <h1 className='text-2xl font-bold text-center'>No Employees Avaialble yet</h1>
              </div>
            ) : (
              <div className='flex justify-center items-center h-48'>
                <h1 className='text-2xl font-bold text-center'>All Employees have arrived.</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AttendeesComponent