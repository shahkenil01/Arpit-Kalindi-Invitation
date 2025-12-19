import React, { useEffect, useState } from 'react';
import { GuestRSVP } from '../types';

const AdminPage: React.FC = () => {
  const [rsvps, setRsvps] = useState<GuestRSVP[]>([]);
  const [editing, setEditing] = useState<GuestRSVP | null>(null);
  const [editType, setEditType] = useState<'small' | 'family'>('small');
  const [editGuests, setEditGuests] = useState<number>(1);

  // FETCH RSVPS
  useEffect(() => {
    fetch('/.netlify/functions/getRSVPs')
      .then(res => res.json())
      .then(setRsvps)
      .catch(console.error);
  }, []);

  // STATS
  const responses = rsvps.length;
  const accepted = rsvps.filter(r => r.attending === 'accept').length;
  const totalGuests = rsvps.reduce((sum, r) => sum + r.guestCount, 0);

  // DELETE
  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this RSVP?')) return;

    await fetch('/.netlify/functions/deleteRSVP', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    setRsvps(prev => prev.filter(r => r._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* ===== HEADER ===== */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Wedding Dashboard
          </h1>

          <div className="bg-white rounded shadow px-6 py-4 flex gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-wedding-gold">
                {responses}
              </div>
              <div className="text-xs text-gray-500 uppercase">
                Responses
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {accepted}
              </div>
              <div className="text-xs text-gray-500 uppercase">
                Accepted
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {totalGuests}
              </div>
              <div className="text-xs text-gray-500 uppercase">
                Total Guests
              </div>
            </div>
          </div>
        </div>

        {/* ===== TABLE ===== */}
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase">Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase">Guests</th>
                <th className="px-6 py-4 text-xs font-bold uppercase">Type</th>
                <th className="px-6 py-4 text-xs font-bold uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase">Actions</th>
              </tr>
            </thead>

            <tbody>
              {rsvps.map(rsvp => (
                <tr key={rsvp._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">
                    {rsvp.fullName}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      ACCEPT
                    </span>
                  </td>
                  <td className="px-6 py-4">{rsvp.guestCount}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs bg-gray-100 rounded uppercase">
                      {rsvp.inviteType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(rsvp.timestamp).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      className="text-blue-600 text-sm"
                      onClick={() => {
                        setEditing(rsvp);
                        setEditType(rsvp.inviteType);
                        setEditGuests(rsvp.guestCount);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 text-sm"
                      onClick={() => handleDelete(rsvp._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {rsvps.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                    No RSVPs yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== EDIT MODAL ===== */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">
              Edit RSVP – {editing.fullName}
            </h3>

            {/* TYPE */}
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">Invite Type</p>
              <div className="flex gap-4">
                {['small', 'family'].map(type => (
                  <label key={type} className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={editType === type}
                      onChange={() => {
                        setEditType(type as any);
                        setEditGuests(1);
                      }}
                    />
                    <span className="capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* GUESTS */}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-2">Number of Guests</p>
              <div className="flex gap-3 flex-wrap">
                {Array.from(
                  { length: editType === 'family' ? 6 : 2 },
                  (_, i) => i + 1
                ).map(n => (
                  <label key={n} className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={editGuests === n}
                      onChange={() => setEditGuests(n)}
                    />
                    <span>{n}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 border rounded text-sm"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  const res = await fetch('/.netlify/functions/updateRSVP', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      id: editing._id,
                      inviteType: editType,
                      guestCount: editGuests,
                    }),
                  });

                  if (!res.ok) {
                    const data = await res.json();
                    alert(data.message || 'Update failed');
                    return;
                  }

                  setRsvps(prev =>
                    prev.map(r =>
                      r._id === editing._id
                        ? { ...r, inviteType: editType, guestCount: editGuests }
                        : r
                    )
                  );

                  setEditing(null);
                }}
                className="px-4 py-2 bg-black text-white rounded text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;