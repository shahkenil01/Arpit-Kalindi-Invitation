import React, { useEffect, useState } from 'react';
import { GuestRSVP } from '../types';

const AdminPage: React.FC = () => {
  const [rsvps, setRsvps] = useState<GuestRSVP[]>([]);
  const [editing, setEditing] = useState<GuestRSVP | null>(null);
  const [editType, setEditType] = useState<'small' | 'family'>('small');
  const [editGuests, setEditGuests] = useState<number>(1);

  useEffect(() => {
    fetch('/.netlify/functions/getRSVPs')
      .then(res => res.json())
      .then(setRsvps)
      .catch(console.error);
  }, []);

  const responses = rsvps.length;
  const accepted = rsvps.filter(r => r.attending === 'accept').length;
  const totalGuests = rsvps.reduce((sum, r) => sum + r.guestCount, 0);

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
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Wedding Dashboard
          </h1>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-3">
            <Stat label="Responses" value={responses} color="text-wedding-gold" />
            <Stat label="Accepted" value={accepted} color="text-green-600" />
            <Stat label="Guests" value={totalGuests} color="text-blue-600" />
          </div>
        </div>

        {/* MOBILE VIEW */}
        <div className="space-y-4 md:hidden">
          {rsvps.map(rsvp => (
            <div key={rsvp._id} className="bg-white rounded-lg p-4 shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{rsvp.fullName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(rsvp.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  ACCEPT
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
                <div>
                  <span className="text-gray-500">Guests</span>
                  <p className="font-medium">{rsvp.guestCount}</p>
                </div>
                <div>
                  <span className="text-gray-500">Type</span>
                  <p className="font-medium uppercase">{rsvp.inviteType}</p>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  className="flex-1 py-2 border rounded text-sm"
                  onClick={() => {
                    setEditing(rsvp);
                    setEditType(rsvp.inviteType);
                    setEditGuests(rsvp.guestCount);
                  }}
                >
                  Edit
                </button>
                <button
                  className="flex-1 py-2 border border-red-500 text-red-600 rounded text-sm"
                  onClick={() => handleDelete(rsvp._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden md:block bg-white rounded shadow overflow-hidden mt-6">
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
                  <td className="px-6 py-4 font-medium">{rsvp.fullName}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                      ACCEPT
                    </span>
                  </td>
                  <td className="px-6 py-4">{rsvp.guestCount}</td>
                  <td className="px-6 py-4 uppercase text-sm">{rsvp.inviteType}</td>
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
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL (same as before, already responsive) */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">
              Edit RSVP – {editing.fullName}
            </h3>

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

            <div className="mb-6">
              <p className="text-sm font-semibold mb-2">Guests</p>
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

const Stat = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) => (
  <div className="bg-white rounded shadow p-3 text-center">
    <div className={`text-xl font-bold ${color}`}>{value}</div>
    <div className="text-xs text-gray-500 uppercase">{label}</div>
  </div>
);

export default AdminPage;