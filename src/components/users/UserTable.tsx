import React, { useState } from "react";
import { User } from "../../types";

interface Props {
  users: User[];
}

const UserTable: React.FC<Props> = ({ users }) => {
  const [selected, setSelected] = useState<User | null>(null);

  return (
    <div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f2f2f2" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Avatar</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr
              key={u.id}
              onClick={() => setSelected(u)}
              style={{
                cursor: "pointer",
                borderBottom: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              <td style={{ padding: "8px" }}>
                {u.avatar ? (
                  <img
                    src={u.avatar}
                    alt="avatar"
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%" }}
                  />
                ) : (
                  "—"
                )}
              </td>
              <td style={{ padding: "8px" }}>{u.name}</td>
              <td style={{ padding: "8px" }}>{u.email}</td>
              <td style={{ padding: "8px" }}>
                {new Date(u.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for user details */}
      {selected && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setSelected(null)}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "300px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selected.name}</h2>
            <p>{selected.email}</p>
            <p>
              Joined: {new Date(selected.createdAt).toLocaleDateString()} at{" "}
              {new Date(selected.createdAt).toLocaleTimeString()}
            </p>
            {selected.avatar && (
              <img
                src={selected.avatar}
                alt="avatar"
                width={100}
                style={{ borderRadius: "50%", marginTop: "10px" }}
              />
            )}
            <button
              onClick={() => setSelected(null)}
              style={{
                marginTop: "12px",
                padding: "8px 12px",
                border: "none",
                background: "#0070f3",
                color: "#fff",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
