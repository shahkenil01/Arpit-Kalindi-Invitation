import React, { useEffect, useState } from 'react';
import { getRSVPs } from '../services/storage';
import { GuestRSVP } from '../types';

const AdminPage: React.FC = () => {
  const [rsvps, setRsvps] = useState<GuestRSVP[]>([]);

  useEffect(() => {
    getRSVPs().then(setRsvps);
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this RSVP?')) return;

    await fetch('/.netlify/functions/deleteRSVP', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    setRsvps(prev => prev.filter(r => r._id !== id));
  };

  const handleEdit = async (rsvp: any) => {
    const inviteType = prompt(
      'Invite Type (small / family)',
      rsvp.inviteType
    )?.toLowerCase();

    if (inviteType !== 'small' && inviteType !== 'family') {
      alert('Invite type must be small or family');
      return;
    }

    const maxGuests = inviteType === 'family' ? 6 : 2;
    const guestCount = Number(
      prompt(`Guest Count (max ${maxGuests})`, rsvp.guestCount)
    );

    if (!guestCount || guestCount < 1 || guestCount > maxGuests) {
      alert(`Guest count must be between 1 and ${maxGuests}`);
      return;
    }

    const res = await fetch('/.netlify/functions/updateRSVP', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: rsvp._id,
        guestCount,
        inviteType,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.message || 'Update failed');
      return;
    }

    setRsvps(prev =>
      prev.map(r =>
        r._id === rsvp._id ? { ...r, guestCount, inviteType } : r
      )
    );
  };

  const acceptedCount = rsvps.filter(r => r.attending === 'accept').length;
  const totalGuests = rsvps.reduce((acc, curr) => acc + (curr.guestCount || 0), 0);

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Wedding Dashboard</h1>
          <div className="bg-white px-6 py-3 rounded shadow flex gap-6">
             <div className="text-center">
                <span className="block text-2xl font-bold text-wedding-gold">{rsvps.length}</span>
                <span className="text-xs text-gray-500 uppercase">Responses</span>
             </div>
             <div className="text-center">
                <span className="block text-2xl font-bold text-green-600">{acceptedCount}</span>
                <span className="text-xs text-gray-500 uppercase">Accepted</span>
             </div>
             <div className="text-center">
                <span className="block text-2xl font-bold text-blue-600">{totalGuests}</span>
                <span className="text-xs text-gray-500 uppercase">Total Guests</span>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Guests</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rsvps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400">No RSVPs yet.</td>
                </tr>
              ) : (
                rsvps.map((rsvp) => (
                  <tr key={rsvp.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{rsvp.fullName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        rsvp.attending === 'accept' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {rsvp.attending.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {rsvp.attending === 'accept' ? rsvp.guestCount : '-'}
                    </td>
                    <td className="px-6 py-4">
                       <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {rsvp.inviteType.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {new Date(rsvp.timestamp).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(rsvp)}
                        className="text-blue-600 text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(rsvp._id)}
                        className="text-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;